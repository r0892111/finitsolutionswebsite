"use client";

import { useEffect, useState, useMemo, useCallback } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
  type ColumnDef,
  type SortingState,
  type ColumnFiltersState,
} from '@tanstack/react-table';
import { createClient } from '@/lib/supabase/client';
import { useLanguage } from '@/contexts/language-context';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from 'recharts';
import { Loader2, Search, Filter, Eye, X, ChevronUp, ChevronDown, Table2, BarChart3 } from 'lucide-react';
import type { DashboardConfig, DashboardField } from '@/lib/dashboard-configs';
import { format } from 'date-fns';
import { DataAnalysisBuilder } from '@/components/data-analysis-builder';

interface DataDashboardProps {
  config: DashboardConfig;
  userId: string;
}

interface FilterState {
  field: string;
  operator: 'equals' | 'notEquals' | 'contains' | 'gt' | 'lt' | 'gte' | 'lte';
  value: string;
}

const COLORS = ['hsl(var(--primary))', '#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#00ff00'];

export function DataDashboard({ config, userId }: DataDashboardProps) {
  const { t } = useLanguage();
  const { toast } = useToast();
  const supabase = createClient();
  
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedRow, setSelectedRow] = useState<any | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<FilterState[]>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [activeTab, setActiveTab] = useState('table');
  // Chart-specific filters: key is chart identifier, value is array of filters
  const [chartFilters, setChartFilters] = useState<Record<string, FilterState[]>>({});
  const [showChartFilters, setShowChartFilters] = useState<Record<string, boolean>>({});
  // Column insight-specific filters: key is field key, value is array of filters
  const [insightFilters, setInsightFilters] = useState<Record<string, FilterState[]>>({});
  const [showInsightFilters, setShowInsightFilters] = useState<Record<string, boolean>>({});

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        throw new Error('No session found');
      }

      console.log(`Fetching data from table: ${config.tableName}`);
      
      const { data: fetchedData, error } = await supabase
        .from(config.tableName)
        .select('*')
        .order(config.defaultSort?.field || 'created_at', { 
          ascending: config.defaultSort?.direction === 'asc' 
        });

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }

      console.log(`Fetched ${fetchedData?.length || 0} records from ${config.tableName}`);
      setData(fetchedData || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      const errorMessage = error instanceof Error 
        ? error.message 
        : t('dashboard.error.fetchFailed') || 'Failed to fetch data';
      
      toast({
        title: t('dashboard.error.title') || 'Error',
        description: `Failed to fetch from ${config.tableName}: ${errorMessage}`,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }, [userId, supabase, config.tableName, config.defaultSort?.field, config.defaultSort?.direction, t, toast]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Helper function to apply filters to data
  const applyFiltersToData = useCallback((dataToFilter: any[], filtersToApply: FilterState[]): any[] => {
    let result = [...dataToFilter];

    filtersToApply.forEach((filter) => {
      const field = config.fields.find((f) => f.key === filter.field);
      if (!field) return;
      
      // Skip filters that don't have a field selected or don't have a value (except equals with empty string for null checking)
      if (!filter.field || (filter.value === '' && filter.operator !== 'equals')) {
        return;
      }

      result = result.filter((row) => {
        const value = row[filter.field];
        
        if (value === null || value === undefined) {
          return filter.operator === 'equals' && filter.value === '';
        }

        switch (filter.operator) {
          case 'equals':
            return String(value) === filter.value;
          case 'notEquals':
            return String(value) !== filter.value;
          case 'contains':
            return String(value).toLowerCase().includes(filter.value.toLowerCase());
          case 'gt':
            return Number(value) > Number(filter.value);
          case 'lt':
            return Number(value) < Number(filter.value);
          case 'gte':
            return Number(value) >= Number(filter.value);
          case 'lte':
            return Number(value) <= Number(filter.value);
          default:
            return true;
        }
      });
    });

    return result;
  }, [config.fields]);

  // Filter and search data
  const filteredData = useMemo(() => {
    let result = [...data];

    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter((row) => {
        return config.fields.some((field) => {
          const value = row[field.key];
          if (value === null || value === undefined) return false;
          return String(value).toLowerCase().includes(query);
        });
      });
    }

    // Apply global filters
    result = applyFiltersToData(result, filters);

    return result;
  }, [data, searchQuery, filters, config.fields, applyFiltersToData]);

  // Get filtered data for a specific chart
  const getChartFilteredData = (chartId: string): any[] => {
    const chartSpecificFilters = chartFilters[chartId] || [];
    return applyFiltersToData(filteredData, chartSpecificFilters);
  };

  const getInsightFilteredData = (fieldKey: string): any[] => {
    // Use the main filteredData which already has global filters applied
    return filteredData;
  };

  const addInsightFilter = (fieldKey: string) => {
    setInsightFilters(prev => ({
      ...prev,
      [fieldKey]: [...(prev[fieldKey] || []), { field: '', operator: 'equals', value: '' }],
    }));
  };

  const removeInsightFilter = (fieldKey: string, index: number) => {
    setInsightFilters(prev => ({
      ...prev,
      [fieldKey]: (prev[fieldKey] || []).filter((_, i) => i !== index),
    }));
  };

  const updateInsightFilter = (fieldKey: string, index: number, updates: Partial<FilterState>) => {
    setInsightFilters(prev => ({
      ...prev,
      [fieldKey]: (prev[fieldKey] || []).map((filter, i) =>
        i === index ? { ...filter, ...updates } : filter
      ),
    }));
  };

  // Calculate chart data for a specific chart
  const calculateChartData = (chartId: string, dataToUse: any[]): any => {
    switch (chartId) {
      case 'category': {
        const categoryData = dataToUse.reduce((acc, row) => {
          const cat = row.category || 'Unknown';
          acc[cat] = (acc[cat] || 0) + 1;
          return acc;
        }, {} as Record<string, number>);
        return Object.entries(categoryData).map(([name, value]) => ({ name, value }));
      }
      case 'sentiment': {
        const sentimentData = dataToUse.reduce((acc, row) => {
          const sent = row.sentiment || 'Unknown';
          acc[sent] = (acc[sent] || 0) + 1;
          return acc;
        }, {} as Record<string, number>);
        return Object.entries(sentimentData).map(([name, value]) => ({ name, value }));
      }
      case 'automation': {
        const automationData = dataToUse.reduce((acc, row) => {
          const auto = row.automation_potential || 'Unknown';
          acc[auto] = (acc[auto] || 0) + 1;
          return acc;
        }, {} as Record<string, number>);
        return Object.entries(automationData).map(([name, value]) => ({ name, value }));
      }
      case 'emailType': {
        const emailTypeDataRaw = dataToUse.reduce((acc, row) => {
          const type = row.email_type || 'Unknown';
          acc[type] = (acc[type] || 0) + 1;
          return acc;
        }, {} as Record<string, number>);
        const emailTypeData: Record<string, number> = {};
        let otherCount = 0;
        for (const [type, count] of Object.entries(emailTypeDataRaw) as [string, number][]) {
          if (count <= 2) {
            otherCount += count;
          } else {
            emailTypeData[type] = count;
          }
        }
        if (otherCount > 0) {
          emailTypeData['Other'] = otherCount;
        }
        return Object.entries(emailTypeData).map(([name, value]) => ({ name, value }));
      }
      case 'timeSeries': {
        const timeSeriesData = dataToUse.reduce((acc, row) => {
          const dateValue = row.date || row.created_at;
          if (!dateValue) return acc;
          const date = format(new Date(dateValue), 'yyyy-MM-dd');
          acc[date] = (acc[date] || 0) + 1;
          return acc;
        }, {} as Record<string, number>);
        return (Object.entries(timeSeriesData) as [string, number][])
          .sort(([a], [b]) => a.localeCompare(b))
          .map(([date, count]) => ({ date, count }));
      }
      case 'booleans': {
        const canAutoInvoice = dataToUse.filter(r => r.can_auto_invoice === true).length;
        const canAutoAnswer = dataToUse.filter(r => r.can_auto_answer === true).length;
        const isCustomerEmail = dataToUse.filter(r => r.is_customer_email === true).length;
        return {
          canAutoInvoice: { yes: canAutoInvoice, no: dataToUse.length - canAutoInvoice },
          canAutoAnswer: { yes: canAutoAnswer, no: dataToUse.length - canAutoAnswer },
          isCustomerEmail: { yes: isCustomerEmail, no: dataToUse.length - isCustomerEmail },
        };
      }
      default:
        return [];
    }
  };

  // Chart data calculations
  const chartData = useMemo(() => {
    if (!filteredData.length) {
      console.log('No filtered data for charts');
      return null;
    }

    console.log(`Calculating charts for ${filteredData.length} records`);

    // Category distribution
    const categoryData = filteredData.reduce((acc, row) => {
      const cat = row.category || 'Unknown';
      acc[cat] = (acc[cat] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Sentiment distribution
    const sentimentData = filteredData.reduce((acc, row) => {
      const sent = row.sentiment || 'Unknown';
      acc[sent] = (acc[sent] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Automation potential
    const automationData = filteredData.reduce((acc, row) => {
      const auto = row.automation_potential || 'Unknown';
      acc[auto] = (acc[auto] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Email type - group low frequency items (1-2 occurrences) as "Other"
    const emailTypeDataRaw = filteredData.reduce((acc, row) => {
      const type = row.email_type || 'Unknown';
      acc[type] = (acc[type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    const emailTypeData: Record<string, number> = {};
    let otherCount = 0;
    
    for (const [type, count] of Object.entries(emailTypeDataRaw) as [string, number][]) {
      if (count <= 2) {
        otherCount += count;
      } else {
        emailTypeData[type] = count;
      }
    }
    
    if (otherCount > 0) {
      emailTypeData['Other'] = otherCount;
    }

    // Boolean fields
    const canAutoInvoice = filteredData.filter(r => r.can_auto_invoice === true).length;
    const canAutoAnswer = filteredData.filter(r => r.can_auto_answer === true).length;
    const isCustomerEmail = filteredData.filter(r => r.is_customer_email === true).length;

    // Time series (group by date) - use date field if available, otherwise created_at
    const timeSeriesData = filteredData.reduce((acc, row) => {
      const dateValue = row.date || row.created_at;
      if (!dateValue) return acc;
      const date = format(new Date(dateValue), 'yyyy-MM-dd');
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Email volume by sender
    const senderData = filteredData.reduce((acc, row) => {
      const sender = row.from_email || 'Unknown';
      acc[sender] = (acc[sender] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Email volume by recipient
    const recipientData = filteredData.reduce((acc, row) => {
      const recipient = row.to_email || 'Unknown';
      acc[recipient] = (acc[recipient] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Thread analysis (if x_gm_thrid exists)
    const threadData = filteredData.reduce((acc, row) => {
      const threadId = row.x_gm_thrid || 'No Thread';
      acc[threadId] = (acc[threadId] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const result: any = {
      category: Object.entries(categoryData).map(([name, value]) => ({ name, value })),
      sentiment: Object.entries(sentimentData).map(([name, value]) => ({ name, value })),
      automation: Object.entries(automationData).map(([name, value]) => ({ name, value })),
      emailType: Object.entries(emailTypeData).map(([name, value]) => ({ name, value })),
      booleans: {
        canAutoInvoice: { yes: canAutoInvoice, no: filteredData.length - canAutoInvoice },
        canAutoAnswer: { yes: canAutoAnswer, no: filteredData.length - canAutoAnswer },
        isCustomerEmail: { yes: isCustomerEmail, no: filteredData.length - isCustomerEmail },
      },
      timeSeries: (Object.entries(timeSeriesData) as [string, number][])
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([date, count]) => ({ date, count })),
    };

    // Add optional charts if data exists
    if (Object.keys(senderData).length > 0) {
      result.senders = (Object.entries(senderData) as [string, number][])
        .sort(([, a], [, b]) => b - a)
        .slice(0, 10)
        .map(([name, value]) => ({ name, value }));
    }

    if (Object.keys(recipientData).length > 0) {
      result.recipients = (Object.entries(recipientData) as [string, number][])
        .sort(([, a], [, b]) => b - a)
        .slice(0, 10)
        .map(([name, value]) => ({ name, value }));
    }

    if (Object.keys(threadData).length > 0) {
      result.threads = (Object.entries(threadData) as [string, number][])
        .sort(([, a], [, b]) => b - a)
        .slice(0, 10)
        .map(([name, value]) => ({ name, value }));
    }

    console.log('Chart data calculated:', {
      category: result.category.length,
      sentiment: result.sentiment.length,
      automation: result.automation.length,
      emailType: result.emailType.length,
      timeSeries: result.timeSeries.length,
    });

    return result;
  }, [filteredData]);

  // TanStack Table columns
  const columns = useMemo<ColumnDef<any>[]>(() => {
    const cols: ColumnDef<any>[] = config.fields.map((field) => ({
      accessorKey: field.key,
      header: field.label,
      cell: ({ row }) => {
        const value = row.getValue(field.key);
        if (field.render) {
          return field.render(value);
        }
        if (value === null || value === undefined) {
          return <span className="text-muted-foreground">-</span>;
        }
        switch (field.type) {
          case 'boolean':
            return value ? 'Yes' : 'No';
          case 'date':
            return value ? format(new Date(value as string | number), 'PPpp') : '-';
          case 'json':
            return <pre className="text-xs bg-muted p-2 rounded max-w-xs overflow-auto">{JSON.stringify(value, null, 2)}</pre>;
          default:
            return String(value);
        }
      },
      enableSorting: field.sortable ?? false,
    }));

    // Add actions column
    cols.push({
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => (
        <Button
          variant="ghost"
          size="icon"
          onClick={() => {
            setSelectedRow(row.original);
            setIsDetailOpen(true);
          }}
        >
          <Eye className="h-4 w-4" />
        </Button>
      ),
    });

    return cols;
  }, [config.fields]);

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getRowId: (row) => row.thread_id || row.id || String(Math.random()),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    state: {
      sorting,
      columnFilters,
    },
    initialState: {
      pagination: {
        pageSize: config.pageSize || 50,
      },
      sorting: config.defaultSort ? [{
        id: config.defaultSort.field,
        desc: config.defaultSort.direction === 'desc',
      }] : [],
    },
  });

  const addFilter = () => {
    setFilters([...filters, { field: config.fields[0]?.key || '', operator: 'equals', value: '' }]);
    setShowFilters(true);
  };

  const removeFilter = (index: number) => {
    setFilters(filters.filter((_, i) => i !== index));
  };

  const updateFilter = (index: number, updates: Partial<FilterState>) => {
    const newFilters = [...filters];
    newFilters[index] = { ...newFilters[index], ...updates };
    setFilters(newFilters);
  };

  const getUniqueValues = (fieldKey: string): string[] => {
    const values = new Set<string>();
    data.forEach((row) => {
      const value = row[fieldKey];
      if (value !== null && value !== undefined) {
        values.add(String(value));
      }
    });
    return Array.from(values).sort();
  };

  // Chart filter management
  const addChartFilter = (chartId: string) => {
    const currentFilters = chartFilters[chartId] || [];
    setChartFilters({
      ...chartFilters,
      [chartId]: [...currentFilters, { field: config.fields[0]?.key || '', operator: 'equals', value: '' }],
    });
    setShowChartFilters({ ...showChartFilters, [chartId]: true });
  };

  const removeChartFilter = (chartId: string, index: number) => {
    const currentFilters = chartFilters[chartId] || [];
    setChartFilters({
      ...chartFilters,
      [chartId]: currentFilters.filter((_, i) => i !== index),
    });
  };

  const updateChartFilter = (chartId: string, index: number, updates: Partial<FilterState>) => {
    const currentFilters = chartFilters[chartId] || [];
    const newFilters = [...currentFilters];
    newFilters[index] = { ...newFilters[index], ...updates };
    setChartFilters({
      ...chartFilters,
      [chartId]: newFilters,
    });
  };

  // Render chart filter UI
  const renderChartFilters = (chartId: string) => {
    const chartSpecificFilters = chartFilters[chartId] || [];
    const isShowing = showChartFilters[chartId] || false;

    return (
      <div className="mb-4 space-y-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            setShowChartFilters({ ...showChartFilters, [chartId]: !isShowing });
            if (!isShowing && chartSpecificFilters.length === 0) {
              addChartFilter(chartId);
            }
          }}
          className="w-full"
        >
          <Filter className="h-4 w-4 mr-2" />
          {t('dashboard.filters.title') || 'Filters'}
          {chartSpecificFilters.length > 0 && (
            <Badge variant="secondary" className="ml-2">
              {chartSpecificFilters.length}
            </Badge>
          )}
        </Button>

        {isShowing && (
          <div className="border rounded-lg p-3 space-y-2 bg-muted/50">
            {chartSpecificFilters.map((filter, index) => {
              const field = config.fields.find((f) => f.key === filter.field);
              const filterableFields = config.fields.filter((f) => f.filterable);

              return (
                <div key={index} className="flex gap-2 items-end">
                  <div className="flex-1">
                    <Select
                      value={filter.field}
                      onValueChange={(value) => updateChartFilter(chartId, index, { field: value, value: '' })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {filterableFields.map((f) => (
                          <SelectItem key={f.key} value={f.key}>
                            {f.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="w-32">
                    <Select
                      value={filter.operator}
                      onValueChange={(value: FilterState['operator']) => updateChartFilter(chartId, index, { operator: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="equals">Equals</SelectItem>
                        <SelectItem value="contains">Contains</SelectItem>
                        {field?.type === 'number' || field?.type === 'date' ? (
                          <>
                            <SelectItem value="gt">Greater than</SelectItem>
                            <SelectItem value="lt">Less than</SelectItem>
                            <SelectItem value="gte">Greater or equal</SelectItem>
                            <SelectItem value="lte">Less or equal</SelectItem>
                          </>
                        ) : null}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex-1">
                    {field?.type === 'select' ? (
                      <Select
                        value={filter.value}
                        onValueChange={(value) => updateChartFilter(chartId, index, { value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select value" />
                        </SelectTrigger>
                        <SelectContent>
                          {getUniqueValues(filter.field).map((val) => (
                            <SelectItem key={val} value={val}>
                              {val}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : (
                      <Input
                        type={field?.type === 'number' ? 'number' : field?.type === 'date' ? 'date' : 'text'}
                        value={filter.value}
                        onChange={(e) => updateChartFilter(chartId, index, { value: e.target.value })}
                        placeholder={t('dashboard.filters.valuePlaceholder') || 'Enter value'}
                      />
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeChartFilter(chartId, index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              );
            })}
            <Button
              variant="outline"
              size="sm"
              onClick={() => addChartFilter(chartId)}
              className="w-full"
            >
              <Filter className="h-4 w-4 mr-2" />
              {t('dashboard.filters.add') || '+ Add Filter'}
            </Button>
          </div>
        )}
      </div>
    );
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="finit-h2">{config.title}</CardTitle>
            {config.description && (
              <CardDescription>{config.description}</CardDescription>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* Search and Filters */}
        <div className="mb-4 space-y-4">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={t('dashboard.search.placeholder') || 'Search...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button
              variant="outline"
              onClick={() => {
                setShowFilters(!showFilters);
                if (!showFilters && filters.length === 0) {
                  addFilter();
                }
              }}
            >
              <Filter className="h-4 w-4 mr-2" />
              {t('dashboard.filters.title') || 'Filters'}
              {filters.length > 0 && (
                <Badge variant="secondary" className="ml-2">
                  {filters.length}
                </Badge>
              )}
            </Button>
          </div>

          {/* Filter Controls */}
          {showFilters && (
            <div className="border rounded-lg p-4 space-y-2 bg-muted/50">
              {filters.map((filter, index) => {
                const field = config.fields.find((f) => f.key === filter.field);
                const filterableFields = config.fields.filter((f) => f.filterable);
                
                return (
                  <div key={index} className="flex gap-2 items-end">
                    <div className="flex-1">
                      <label className="text-sm font-medium mb-1 block">
                        {t('dashboard.filters.field') || 'Field'}
                      </label>
                      <Select
                        value={filter.field}
                        onValueChange={(value) => updateFilter(index, { field: value, value: '' })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {filterableFields.map((f) => (
                            <SelectItem key={f.key} value={f.key}>
                              {f.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="w-32">
                      <label className="text-sm font-medium mb-1 block">
                        {t('dashboard.filters.operator') || 'Operator'}
                      </label>
                      <Select
                        value={filter.operator}
                        onValueChange={(value: FilterState['operator']) => updateFilter(index, { operator: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="equals">Equals</SelectItem>
                          <SelectItem value="notEquals">Not equals</SelectItem>
                          <SelectItem value="contains">Contains</SelectItem>
                          {field?.type === 'number' || field?.type === 'date' ? (
                            <>
                              <SelectItem value="gt">Greater than</SelectItem>
                              <SelectItem value="lt">Less than</SelectItem>
                              <SelectItem value="gte">Greater or equal</SelectItem>
                              <SelectItem value="lte">Less or equal</SelectItem>
                            </>
                          ) : null}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex-1">
                      <label className="text-sm font-medium mb-1 block">
                        {t('dashboard.filters.value') || 'Value'}
                      </label>
                      {field?.type === 'select' ? (
                        <Select
                          value={filter.value}
                          onValueChange={(value) => updateFilter(index, { value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select value" />
                          </SelectTrigger>
                          <SelectContent>
                            {getUniqueValues(filter.field).map((val) => (
                              <SelectItem key={val} value={val}>
                                {val}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ) : (
                        <Input
                          type={field?.type === 'number' ? 'number' : 'text'}
                          value={filter.value}
                          onChange={(e) => updateFilter(index, { value: e.target.value })}
                          placeholder={t('dashboard.filters.valuePlaceholder') || 'Enter value'}
                        />
                      )}
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeFilter(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                );
              })}
              <Button variant="outline" onClick={addFilter} className="w-full">
                {t('dashboard.filters.add') || '+ Add Filter'}
              </Button>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-4 text-sm text-muted-foreground">
          {t('dashboard.results') || 'Results'}: {filteredData.length} {t('dashboard.of') || 'of'} {data.length}
        </div>

        {/* Tabs for Table, Charts, Insights, and Analysis */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="table" className="gap-2">
              <Table2 className="h-4 w-4" />
              Table
            </TabsTrigger>
            <TabsTrigger value="charts" className="gap-2">
              <BarChart3 className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="insights" className="gap-2">
              <BarChart3 className="h-4 w-4" />
              Column Insights
            </TabsTrigger>
            <TabsTrigger value="analysis" className="gap-2">
              <BarChart3 className="h-4 w-4" />
              Custom Analysis
            </TabsTrigger>
          </TabsList>

          {/* Table View */}
          <TabsContent value="table" className="space-y-4">
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
              </div>
            ) : filteredData.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                {t('dashboard.noData') || 'No data found'}
              </div>
            ) : (
              <>
                <div className="border rounded-lg overflow-hidden">
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                          <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                              <TableHead
                                key={header.id}
                                className={header.column.getCanSort() ? 'cursor-pointer hover:bg-muted/50' : ''}
                                onClick={header.column.getToggleSortingHandler()}
                              >
                                <div className="flex items-center gap-2">
                                  {header.isPlaceholder
                                    ? null
                                    : flexRender(
                                        header.column.columnDef.header,
                                        header.getContext()
                                      )}
                                  {header.column.getIsSorted() && (
                                    header.column.getIsSorted() === 'asc' ? (
                                      <ChevronUp className="h-4 w-4" />
                                    ) : (
                                      <ChevronDown className="h-4 w-4" />
                                    )
                                  )}
                                </div>
                              </TableHead>
                            ))}
                          </TableRow>
                        ))}
                      </TableHeader>
                      <TableBody>
                        {table.getRowModel().rows?.length ? (
                          table.getRowModel().rows.map((row) => (
                            <TableRow
                              key={row.id}
                              data-state={row.getIsSelected() && 'selected'}
                            >
                              {row.getVisibleCells().map((cell) => (
                                <TableCell key={cell.id} className="max-w-xs truncate">
                                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </TableCell>
                              ))}
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={columns.length} className="h-24 text-center">
                              No results.
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">
                    {t('dashboard.page') || 'Page'} {table.getState().pagination.pageIndex + 1} {t('dashboard.of') || 'of'} {table.getPageCount()}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => table.previousPage()}
                      disabled={!table.getCanPreviousPage()}
                    >
                      Previous
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => table.nextPage()}
                      disabled={!table.getCanNextPage()}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              </>
            )}
          </TabsContent>

          {/* Charts View */}
          <TabsContent value="charts" className="space-y-4">
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
              </div>
            ) : !chartData || filteredData.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                {t('dashboard.noData') || 'No data found'}
              </div>
            ) : (
              <div className="space-y-6">
                {/* Key Metrics Summary */}
                {(() => {
                  const chartFilteredData = getChartFilteredData('booleans');
                  const booleansData = calculateChartData('booleans', chartFilteredData) as {
                    canAutoInvoice: { yes: number; no: number };
                    canAutoAnswer: { yes: number; no: number };
                    isCustomerEmail: { yes: number; no: number };
                  };
                  const totalRecords = chartFilteredData.length;
                  const automationOpportunity = booleansData.canAutoInvoice.yes + booleansData.canAutoAnswer.yes;
                  const automationPercentage = totalRecords > 0 ? ((automationOpportunity / totalRecords) * 100).toFixed(1) : '0';
                  const customerEmails = booleansData.isCustomerEmail.yes;
                  const customerPercentage = totalRecords > 0 ? ((customerEmails / totalRecords) * 100).toFixed(1) : '0';
                  
                  // Calculate category-specific metrics
                  const categoryData = calculateChartData('category', chartFilteredData) as { name: string; value: number }[];
                  const categoryMetrics = categoryData.map(cat => {
                    const categoryFiltered = chartFilteredData.filter(row => (row.category || 'Unknown') === cat.name);
                    const catBooleans = calculateChartData('booleans', categoryFiltered) as {
                      canAutoInvoice: { yes: number; no: number };
                      canAutoAnswer: { yes: number; no: number };
                      isCustomerEmail: { yes: number; no: number };
                    };
                    const catTotal = categoryFiltered.length;
                    const catAutoInvoice = catBooleans.canAutoInvoice.yes;
                    const catAutoAnswer = catBooleans.canAutoAnswer.yes;
                    const catAutomationTotal = catAutoInvoice + catAutoAnswer;
                    return {
                      category: cat.name,
                      total: catTotal,
                      autoInvoice: catAutoInvoice,
                      autoAnswer: catAutoAnswer,
                      automationTotal: catAutomationTotal,
                      automationPercentage: catTotal > 0 ? ((catAutomationTotal / catTotal) * 100).toFixed(1) : '0',
                      autoInvoicePercentage: catTotal > 0 ? ((catAutoInvoice / catTotal) * 100).toFixed(1) : '0',
                      autoAnswerPercentage: catTotal > 0 ? ((catAutoAnswer / catTotal) * 100).toFixed(1) : '0',
                    };
                  }).filter(cat => cat.total > 0).sort((a, b) => b.total - a.total);
                  
                  return (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <Card>
                          <CardHeader className="pb-3">
                            <CardTitle className="text-sm font-medium text-muted-foreground">Total Threads</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="text-3xl font-bold">{totalRecords.toLocaleString()}</div>
                            <p className="text-xs text-muted-foreground mt-1">Email threads analyzed</p>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardHeader className="pb-3">
                            <CardTitle className="text-sm font-medium text-muted-foreground">Automation Ready</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="text-3xl font-bold text-green-600">{automationOpportunity.toLocaleString()}</div>
                            <p className="text-xs text-muted-foreground mt-1">{automationPercentage}% can be automated</p>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardHeader className="pb-3">
                            <CardTitle className="text-sm font-medium text-muted-foreground">Customer Emails</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="text-3xl font-bold text-blue-600">{customerEmails.toLocaleString()}</div>
                            <p className="text-xs text-muted-foreground mt-1">{customerPercentage}% of total</p>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardHeader className="pb-3">
                            <CardTitle className="text-sm font-medium text-muted-foreground">Auto Invoice Ready</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="text-3xl font-bold text-purple-600">{booleansData.canAutoInvoice.yes.toLocaleString()}</div>
                            <p className="text-xs text-muted-foreground mt-1">
                              {totalRecords > 0 ? ((booleansData.canAutoInvoice.yes / totalRecords) * 100).toFixed(1) : '0'}% automation potential
                            </p>
                          </CardContent>
                        </Card>
                      </div>

                      {/* Category-Specific Automation Metrics */}
                      {categoryMetrics.length > 0 && (
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-lg">Automation Potential by Category</CardTitle>
                            <CardDescription>Breakdown of automation opportunities by email category</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-4">
                              {categoryMetrics.map((cat) => (
                                <div key={cat.category} className="border rounded-lg p-4 space-y-2">
                                  <div className="flex items-center justify-between">
                                    <h4 className="font-semibold text-lg">{cat.category}</h4>
                                    <span className="text-sm text-muted-foreground">{cat.total.toLocaleString()} threads</span>
                                  </div>
                                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
                                    <div className="space-y-1">
                                      <div className="flex items-center justify-between">
                                        <span className="text-sm text-muted-foreground">Total Automation</span>
                                        <span className="text-sm font-semibold">{cat.automationTotal.toLocaleString()}</span>
                                      </div>
                                      <div className="w-full bg-muted rounded-full h-2">
                                        <div 
                                          className="bg-green-600 h-2 rounded-full transition-all" 
                                          style={{ width: `${cat.automationPercentage}%` }}
                                        />
                                      </div>
                                      <p className="text-xs text-muted-foreground">{cat.automationPercentage}% automation ready</p>
                                    </div>
                                    <div className="space-y-1">
                                      <div className="flex items-center justify-between">
                                        <span className="text-sm text-muted-foreground">Auto Invoice</span>
                                        <span className="text-sm font-semibold">{cat.autoInvoice.toLocaleString()}</span>
                                      </div>
                                      <div className="w-full bg-muted rounded-full h-2">
                                        <div 
                                          className="bg-purple-600 h-2 rounded-full transition-all" 
                                          style={{ width: `${cat.autoInvoicePercentage}%` }}
                                        />
                                      </div>
                                      <p className="text-xs text-muted-foreground">{cat.autoInvoicePercentage}% can auto invoice</p>
                                    </div>
                                    <div className="space-y-1">
                                      <div className="flex items-center justify-between">
                                        <span className="text-sm text-muted-foreground">Auto Answer</span>
                                        <span className="text-sm font-semibold">{cat.autoAnswer.toLocaleString()}</span>
                                      </div>
                                      <div className="w-full bg-muted rounded-full h-2">
                                        <div 
                                          className="bg-blue-600 h-2 rounded-full transition-all" 
                                          style={{ width: `${cat.autoAnswerPercentage}%` }}
                                        />
                                      </div>
                                      <p className="text-xs text-muted-foreground">{cat.autoAnswerPercentage}% can auto answer</p>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      )}
                    </>
                  );
                })()}
                {/* Category Distribution */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Category Distribution</CardTitle>
                    <CardDescription>{(() => {
                      const chartFilteredData = getChartFilteredData('category');
                      const totalCount = chartFilteredData.length;
                      const uniqueCategories = calculateChartData('category', chartFilteredData).length;
                      return `${totalCount} records across ${uniqueCategories} categories`;
                    })()}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {renderChartFilters('category')}
                    {(() => {
                      const chartFilteredData = getChartFilteredData('category');
                      const categoryChartData = calculateChartData('category', chartFilteredData);
                      return categoryChartData.length > 0 ? (
                        <ChartContainer
                          config={categoryChartData.reduce((acc: Record<string, { label: string }>, item: { name: string; value: number }) => {
                            acc[item.name] = { label: item.name };
                            return acc;
                          }, {} as Record<string, { label: string }>)}
                          className="h-[400px] w-full"
                        >
                          <PieChart>
                            <Pie
                              data={categoryChartData}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              label={({ name, value, percent }) => `${name}\n${value.toLocaleString()} (${(percent * 100).toFixed(1)}%)`}
                              outerRadius={120}
                              fill="#8884d8"
                              dataKey="value"
                            >
                              {categoryChartData.map((entry: { name: string; value: number }, index: number) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Pie>
                            <ChartTooltip 
                              content={({ active, payload }) => {
                                if (active && payload && payload.length) {
                                  const data = payload[0].payload;
                                  return (
                                    <div className="bg-background border rounded-lg p-3 shadow-lg">
                                      <p className="font-semibold">{data.name}</p>
                                      <p className="text-lg font-bold">{data.value.toLocaleString()} threads</p>
                                      <p className="text-xs text-muted-foreground">
                                        {((data.value / categoryChartData.reduce((sum: number, item: { name: string; value: number }) => sum + item.value, 0)) * 100).toFixed(1)}% of total
                                      </p>
                                    </div>
                                  );
                                }
                                return null;
                              }}
                            />
                            <Legend />
                          </PieChart>
                      </ChartContainer>
                      ) : (
                        <div className="h-[400px] flex items-center justify-center text-muted-foreground">
                          No category data available
                        </div>
                      );
                    })()}
                  </CardContent>
                </Card>

                {/* Sentiment Distribution */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Sentiment Distribution</CardTitle>
                    <CardDescription>{(() => {
                      const chartFilteredData = getChartFilteredData('sentiment');
                      const totalCount = chartFilteredData.length;
                      const uniqueSentiments = calculateChartData('sentiment', chartFilteredData).length;
                      return `${totalCount} records across ${uniqueSentiments} sentiment types`;
                    })()}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {renderChartFilters('sentiment')}
                    {(() => {
                      const chartFilteredData = getChartFilteredData('sentiment');
                      const sentimentChartData = calculateChartData('sentiment', chartFilteredData);
                      return sentimentChartData.length > 0 ? (
                        <ChartContainer
                          config={sentimentChartData.reduce((acc: Record<string, { label: string }>, item: { name: string; value: number }) => {
                            acc[item.name] = { label: item.name };
                            return acc;
                          }, {} as Record<string, { label: string }>)}
                          className="h-[400px] w-full"
                        >
                          <PieChart>
                            <Pie
                              data={sentimentChartData}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              label={({ name, value, percent }) => `${name}\n${value.toLocaleString()} (${(percent * 100).toFixed(1)}%)`}
                              outerRadius={120}
                              fill="#8884d8"
                              dataKey="value"
                            >
                              {sentimentChartData.map((entry: { name: string; value: number }, index: number) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Pie>
                            <ChartTooltip 
                              content={({ active, payload }) => {
                                if (active && payload && payload.length) {
                                  const data = payload[0].payload;
                                  return (
                                    <div className="bg-background border rounded-lg p-3 shadow-lg">
                                      <p className="font-semibold">{data.name}</p>
                                      <p className="text-lg font-bold">{data.value.toLocaleString()} threads</p>
                                      <p className="text-xs text-muted-foreground">
                                        {((data.value / sentimentChartData.reduce((sum: number, item: { name: string; value: number }) => sum + item.value, 0)) * 100).toFixed(1)}% of total
                                      </p>
                                    </div>
                                  );
                                }
                                return null;
                              }}
                            />
                            <Legend />
                          </PieChart>
                        </ChartContainer>
                      ) : (
                        <div className="h-[400px] flex items-center justify-center text-muted-foreground">
                          No sentiment data available
                        </div>
                      );
                    })()}
                  </CardContent>
                </Card>

                {/* Automation Potential */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Automation Potential</CardTitle>
                    <CardDescription>{(() => {
                      const chartFilteredData = getChartFilteredData('automation');
                      const totalCount = chartFilteredData.length;
                      const uniqueLevels = calculateChartData('automation', chartFilteredData).length;
                      return `${totalCount} records across ${uniqueLevels} automation levels`;
                    })()}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {renderChartFilters('automation')}
                    {(() => {
                      const chartFilteredData = getChartFilteredData('automation');
                      const automationChartData = calculateChartData('automation', chartFilteredData);
                      return automationChartData.length > 0 ? (
                        <ChartContainer
                          config={automationChartData.reduce((acc: Record<string, { label: string }>, item: { name: string; value: number }) => {
                            acc[item.name] = { label: item.name };
                            return acc;
                          }, {} as Record<string, { label: string }>)}
                          className="h-[400px] w-full"
                        >
                          <BarChart data={automationChartData.sort((a: { name: string; value: number }, b: { name: string; value: number }) => b.value - a.value)}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis 
                              dataKey="name" 
                              angle={-45}
                              textAnchor="end"
                              height={80}
                            />
                            <YAxis />
                            <ChartTooltip 
                              content={({ active, payload }) => {
                                if (active && payload && payload.length) {
                                  const data = payload[0].payload;
                                  const total = automationChartData.reduce((sum: number, item: { name: string; value: number }) => sum + item.value, 0);
                                  return (
                                    <div className="bg-background border rounded-lg p-3 shadow-lg">
                                      <p className="font-semibold">{data.name}</p>
                                      <p className="text-lg font-bold">{data.value.toLocaleString()} threads</p>
                                      <p className="text-xs text-muted-foreground">
                                        {total > 0 ? ((data.value / total) * 100).toFixed(1) : '0'}% of total
                                      </p>
                                    </div>
                                  );
                                }
                                return null;
                              }}
                            />
                            <Legend />
                            <Bar dataKey="value" fill="hsl(var(--primary))" />
                          </BarChart>
                        </ChartContainer>
                      ) : (
                        <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                          No automation data available
                        </div>
                      );
                    })()}
                  </CardContent>
                </Card>

                {/* Email Type - Pie Chart without "Other" */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Email Type Distribution</CardTitle>
                    <CardDescription>
                      {(() => {
                        const chartFilteredData = getChartFilteredData('emailType');
                        const totalCount = chartFilteredData.length;
                        const emailTypeChartData = calculateChartData('emailType', chartFilteredData);
                        const filteredEmailTypes = emailTypeChartData.filter((e: { name: string; value: number }) => e.name !== 'Other');
                        const otherEntry = emailTypeChartData.find((e: { name: string; value: number }) => e.name === 'Other');
                        const shownCount = filteredEmailTypes.reduce((sum: number, e: { name: string; value: number }) => sum + e.value, 0);
                        return (
                          <>
                            {totalCount} records, {filteredEmailTypes.length} email types shown ({shownCount} records)
                            {otherEntry && (
                              <span className="text-muted-foreground ml-2">
                                ({otherEntry.value} records in &quot;Other&quot;)
                              </span>
                            )}
                          </>
                        );
                      })()}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {renderChartFilters('emailType')}
                    {(() => {
                      const chartFilteredData = getChartFilteredData('emailType');
                      const emailTypeChartData = calculateChartData('emailType', chartFilteredData);
                      const filteredEmailTypes = emailTypeChartData.filter((e: { name: string; value: number }) => e.name !== 'Other');
                      return filteredEmailTypes.length > 0 ? (
                        <ChartContainer
                          config={filteredEmailTypes
                            .reduce((acc: Record<string, { label: string }>, item: { name: string; value: number }) => {
                              acc[item.name] = { label: item.name };
                              return acc;
                            }, {} as Record<string, { label: string }>)}
                          className="h-[400px] w-full"
                        >
                          <PieChart>
                            <Pie
                              data={filteredEmailTypes}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                              outerRadius={100}
                              fill="#8884d8"
                              dataKey="value"
                            >
                              {filteredEmailTypes.map((entry: { name: string; value: number }, index: number) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Pie>
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Legend />
                          </PieChart>
                        </ChartContainer>
                      ) : (
                        <div className="h-[400px] flex items-center justify-center text-muted-foreground">
                          No email type data available
                        </div>
                      );
                    })()}
                  </CardContent>
                </Card>

                {/* Automation Opportunities */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Automation Opportunities</CardTitle>
                    <CardDescription>Breakdown of automation potential and capabilities</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {renderChartFilters('booleans')}
                    {(() => {
                      const chartFilteredData = getChartFilteredData('booleans');
                      const booleansChartData = calculateChartData('booleans', chartFilteredData) as {
                        canAutoInvoice: { yes: number; no: number };
                        canAutoAnswer: { yes: number; no: number };
                        isCustomerEmail: { yes: number; no: number };
                      };
                      const total = chartFilteredData.length;
                      const chartData = [
                        { 
                          name: 'Can Auto Invoice', 
                          yes: booleansChartData.canAutoInvoice.yes, 
                          no: booleansChartData.canAutoInvoice.no,
                          percentage: total > 0 ? ((booleansChartData.canAutoInvoice.yes / total) * 100).toFixed(1) : '0'
                        },
                        { 
                          name: 'Can Auto Answer', 
                          yes: booleansChartData.canAutoAnswer.yes, 
                          no: booleansChartData.canAutoAnswer.no,
                          percentage: total > 0 ? ((booleansChartData.canAutoAnswer.yes / total) * 100).toFixed(1) : '0'
                        },
                        { 
                          name: 'Is Customer Email', 
                          yes: booleansChartData.isCustomerEmail.yes, 
                          no: booleansChartData.isCustomerEmail.no,
                          percentage: total > 0 ? ((booleansChartData.isCustomerEmail.yes / total) * 100).toFixed(1) : '0'
                        },
                      ];
                      return (
                        <ChartContainer
                          config={{
                            yes: { label: 'Yes' },
                            no: { label: 'No' },
                          }}
                          className="h-[400px] w-full"
                        >
                          <BarChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis 
                              dataKey="name" 
                              angle={-45}
                              textAnchor="end"
                              height={80}
                            />
                            <YAxis />
                            <ChartTooltip 
                              content={({ active, payload }) => {
                                if (active && payload && payload.length) {
                                  const data = payload[0].payload;
                                  return (
                                    <div className="bg-background border rounded-lg p-3 shadow-lg">
                                      <p className="font-semibold">{data.name}</p>
                                      <p className="text-green-600">Yes: {data.yes.toLocaleString()} ({data.percentage}%)</p>
                                      <p className="text-orange-500">No: {data.no.toLocaleString()}</p>
                                      <p className="text-xs text-muted-foreground mt-1">Total: {(data.yes + data.no).toLocaleString()}</p>
                                    </div>
                                  );
                                }
                                return null;
                              }}
                            />
                            <Legend />
                            <Bar dataKey="yes" stackId="a" fill="#82ca9d" name="Yes" />
                            <Bar dataKey="no" stackId="a" fill="#ffc658" name="No" />
                          </BarChart>
                        </ChartContainer>
                      );
                    })()}
                  </CardContent>
                </Card>

                {/* Time Series */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Email Volume Over Time</CardTitle>
                    <CardDescription>{(() => {
                      const chartFilteredData = getChartFilteredData('timeSeries');
                      const totalCount = chartFilteredData.length;
                      const timeSeriesData = calculateChartData('timeSeries', chartFilteredData);
                      return `${totalCount} records across ${timeSeriesData.length} time periods`;
                    })()}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {renderChartFilters('timeSeries')}
                    {(() => {
                      const chartFilteredData = getChartFilteredData('timeSeries');
                      const timeSeriesChartData = calculateChartData('timeSeries', chartFilteredData);
                      return timeSeriesChartData.length > 0 ? (
                        <ChartContainer
                          config={{
                            count: { label: 'Email Count' },
                          }}
                          className="h-[400px] w-full"
                        >
                          <LineChart data={timeSeriesChartData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Legend />
                            <Line type="monotone" dataKey="count" stroke="hsl(var(--primary))" strokeWidth={2} name="Email Count" />
                          </LineChart>
                        </ChartContainer>
                      ) : (
                        <div className="h-[400px] flex items-center justify-center text-muted-foreground">
                          No time series data available
                        </div>
                      );
                    })()}
                  </CardContent>
                </Card>
              </div>
            )}
          </TabsContent>

          {/* Analysis Builder Tab */}
          <TabsContent value="analysis" className="space-y-4">
            <DataAnalysisBuilder data={filteredData} fields={config.fields} />
          </TabsContent>

          {/* Column Insights Tab */}
          <TabsContent value="insights" className="space-y-4">
            {(() => {
              const insightFields = config.fields.filter(f => 
                f.key !== 'thread_id' && 
                f.key !== 'created_at' && 
                f.key !== 'updated_at'
              );
              if (insightFields.length === 0) {
                return (
                  <div className="text-center py-8 text-muted-foreground">
                    No columns available for insights
                  </div>
                );
              }
              return (
                <Tabs defaultValue={insightFields[0]?.key || ''} className="w-full">
                  <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:grid-cols-6 mb-4 h-auto">
                    {insightFields.map((field) => (
                      <TabsTrigger key={field.key} value={field.key} className="text-xs">
                        {field.label}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                  {insightFields.map((field) => {
                    // Apply filters to the entire dataset, not just the column being viewed
                    const insightFilteredData = getInsightFilteredData(field.key);
                    const fieldData = insightFilteredData.map(row => row[field.key]).filter(val => val !== null && val !== undefined);
                    const totalCount = insightFilteredData.length;
                    const nonNullCount = fieldData.length;
                    const nullPercentage = totalCount > 0 ? ((totalCount - nonNullCount) / totalCount * 100).toFixed(1) : '0';
                    
                    return (
                      <TabsContent key={field.key} value={field.key} className="space-y-4">
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-xl">{field.label} Insights</CardTitle>
                            <CardDescription>Comprehensive analysis of {field.label.toLowerCase()} data</CardDescription>
                          </CardHeader>
                          <CardContent className="space-y-6">
                            {/* Summary Stats */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                              <div className="border rounded-lg p-4">
                                <div className="text-sm text-muted-foreground">Total Records</div>
                                <div className="text-2xl font-bold">{totalCount.toLocaleString()}</div>
                              </div>
                              <div className="border rounded-lg p-4">
                                <div className="text-sm text-muted-foreground">Non-Null Values</div>
                                <div className="text-2xl font-bold">{nonNullCount.toLocaleString()}</div>
                                <div className="text-xs text-muted-foreground">{totalCount > 0 ? ((nonNullCount / totalCount) * 100).toFixed(1) : '0'}% populated</div>
                              </div>
                              <div className="border rounded-lg p-4">
                                <div className="text-sm text-muted-foreground">Null Values</div>
                                <div className="text-2xl font-bold">{(totalCount - nonNullCount).toLocaleString()}</div>
                                <div className="text-xs text-muted-foreground">{nullPercentage}% missing</div>
                              </div>
                              <div className="border rounded-lg p-4">
                                <div className="text-sm text-muted-foreground">Unique Values</div>
                                <div className="text-2xl font-bold">{new Set(fieldData.map(String)).size.toLocaleString()}</div>
                                <div className="text-xs text-muted-foreground">distinct {field.label.toLowerCase()}</div>
                              </div>
                            </div>

                            {/* Field Type Specific Insights */}
                        {field.type === 'boolean' && (() => {
                          const trueCount = fieldData.filter(v => v === true).length;
                          const falseCount = fieldData.filter(v => v === false).length;
                          const truePercentage = nonNullCount > 0 ? ((trueCount / nonNullCount) * 100).toFixed(1) : '0';
                          const falsePercentage = nonNullCount > 0 ? ((falseCount / nonNullCount) * 100).toFixed(1) : '0';
                          
                          return (
                            <Card>
                              <CardHeader>
                                <CardTitle className="text-lg">Boolean Distribution</CardTitle>
                              </CardHeader>
                              <CardContent>
                                <div className="grid grid-cols-2 gap-4 mb-4">
                                  <div className="border rounded-lg p-4 bg-green-50 dark:bg-green-950">
                                    <div className="text-sm text-muted-foreground">True</div>
                                    <div className="text-3xl font-bold text-green-600">{trueCount.toLocaleString()}</div>
                                    <div className="text-sm text-muted-foreground">{truePercentage}%</div>
                                  </div>
                                  <div className="border rounded-lg p-4 bg-red-50 dark:bg-red-950">
                                    <div className="text-sm text-muted-foreground">False</div>
                                    <div className="text-3xl font-bold text-red-600">{falseCount.toLocaleString()}</div>
                                    <div className="text-sm text-muted-foreground">{falsePercentage}%</div>
                                  </div>
                                </div>
                                <ChartContainer
                                  config={{
                                    true: { label: 'True' },
                                    false: { label: 'False' },
                                  }}
                                  className="h-[300px] w-full"
                                >
                                  <PieChart>
                                    <Pie
                                      data={[
                                        { name: 'True', value: trueCount },
                                        { name: 'False', value: falseCount },
                                      ]}
                                      cx="50%"
                                      cy="50%"
                                      labelLine={false}
                                      label={({ name, value, percent }) => `${name}\n${value.toLocaleString()} (${(percent * 100).toFixed(1)}%)`}
                                      outerRadius={100}
                                      fill="#8884d8"
                                      dataKey="value"
                                    >
                                      <Cell fill="#82ca9d" />
                                      <Cell fill="#ffc658" />
                                    </Pie>
                                    <ChartTooltip content={<ChartTooltipContent />} />
                                    <Legend />
                                  </PieChart>
                                </ChartContainer>
                              </CardContent>
                            </Card>
                          );
                        })()}

                        {(field.type === 'select' || field.type === 'text') && (() => {
                          const valueCounts: Record<string, number> = {};
                          fieldData.forEach(val => {
                            const strVal = String(val);
                            valueCounts[strVal] = (valueCounts[strVal] || 0) + 1;
                          });
                          
                          const sortedValues = Object.entries(valueCounts)
                            .map(([name, value]) => ({ name, value }))
                            .sort((a, b) => b.value - a.value)
                            .slice(0, 20); // Top 20 values
                          
                          const otherCount = Object.entries(valueCounts)
                            .slice(20)
                            .reduce((sum, [, count]) => sum + count, 0);
                          
                          return (
                            <Card>
                              <CardHeader>
                                <CardTitle className="text-lg">Value Distribution</CardTitle>
                                <CardDescription>Top {sortedValues.length} most common values</CardDescription>
                              </CardHeader>
                              <CardContent>
                                <ChartContainer
                                  config={sortedValues.reduce((acc, item) => {
                                    acc[item.name] = { label: item.name };
                                    return acc;
                                  }, {} as Record<string, { label: string }>)}
                                  className="h-[400px] w-full"
                                >
                                  <BarChart data={[...sortedValues, ...(otherCount > 0 ? [{ name: 'Other', value: otherCount }] : [])]}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis 
                                      dataKey="name" 
                                      angle={-45}
                                      textAnchor="end"
                                      height={100}
                                    />
                                    <YAxis />
                                    <ChartTooltip 
                                      content={({ active, payload }) => {
                                        if (active && payload && payload.length) {
                                          const data = payload[0].payload;
                                          return (
                                            <div className="bg-background border rounded-lg p-3 shadow-lg">
                                              <p className="font-semibold">{data.name}</p>
                                              <p className="text-lg font-bold">{data.value.toLocaleString()} occurrences</p>
                                              <p className="text-xs text-muted-foreground">
                                                {nonNullCount > 0 ? ((data.value / nonNullCount) * 100).toFixed(1) : '0'}% of non-null values
                                              </p>
                                            </div>
                                          );
                                        }
                                        return null;
                                      }}
                                    />
                                    <Legend />
                                    <Bar dataKey="value" fill="hsl(var(--primary))" />
                                  </BarChart>
                                </ChartContainer>
                                
                                {/* Top Values Table */}
                                <div className="mt-6 border rounded-lg overflow-hidden">
                                  <div className="max-h-64 overflow-y-auto">
                                    <table className="w-full text-sm">
                                      <thead className="bg-muted sticky top-0">
                                        <tr>
                                          <th className="p-2 text-left">Value</th>
                                          <th className="p-2 text-right">Count</th>
                                          <th className="p-2 text-right">Percentage</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {sortedValues.map((item, index) => (
                                          <tr key={item.name} className="border-t">
                                            <td className="p-2 font-medium">{item.name || '(empty)'}</td>
                                            <td className="p-2 text-right">{item.value.toLocaleString()}</td>
                                            <td className="p-2 text-right">
                                              {nonNullCount > 0 ? ((item.value / nonNullCount) * 100).toFixed(1) : '0'}%
                                            </td>
                                          </tr>
                                        ))}
                                        {otherCount > 0 && (
                                          <tr className="border-t bg-muted/50">
                                            <td className="p-2 font-medium">Other ({Object.keys(valueCounts).length - 20} more values)</td>
                                            <td className="p-2 text-right">{otherCount.toLocaleString()}</td>
                                            <td className="p-2 text-right">
                                              {nonNullCount > 0 ? ((otherCount / nonNullCount) * 100).toFixed(1) : '0'}%
                                            </td>
                                          </tr>
                                        )}
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          );
                        })()}

                        {field.type === 'number' && (() => {
                          const numbers = fieldData.map(v => Number(v)).filter(n => !isNaN(n));
                          if (numbers.length === 0) {
                            return (
                              <Card>
                                <CardContent className="py-8 text-center text-muted-foreground">
                                  No numeric values available for analysis
                                </CardContent>
                              </Card>
                            );
                          }
                          
                          const sorted = [...numbers].sort((a, b) => a - b);
                          const min = sorted[0];
                          const max = sorted[sorted.length - 1];
                          const sum = numbers.reduce((a, b) => a + b, 0);
                          const avg = sum / numbers.length;
                          const median = sorted.length % 2 === 0
                            ? (sorted[sorted.length / 2 - 1] + sorted[sorted.length / 2]) / 2
                            : sorted[Math.floor(sorted.length / 2)];
                          
                          // Create bins for histogram
                          const binCount = 20;
                          const binSize = (max - min) / binCount;
                          const bins: Record<number, number> = {};
                          numbers.forEach(num => {
                            const bin = Math.floor((num - min) / binSize);
                            const binKey = Math.min(bin, binCount - 1);
                            bins[binKey] = (bins[binKey] || 0) + 1;
                          });
                          
                          const histogramData = Array.from({ length: binCount }, (_, i) => ({
                            range: `${(min + i * binSize).toFixed(0)}-${(min + (i + 1) * binSize).toFixed(0)}`,
                            count: bins[i] || 0,
                          }));
                          
                          return (
                            <>
                              <Card>
                                <CardHeader>
                                  <CardTitle className="text-lg">Statistical Summary</CardTitle>
                                </CardHeader>
                                <CardContent>
                                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                                    <div className="border rounded-lg p-4">
                                      <div className="text-sm text-muted-foreground">Minimum</div>
                                      <div className="text-2xl font-bold">{min.toLocaleString()}</div>
                                    </div>
                                    <div className="border rounded-lg p-4">
                                      <div className="text-sm text-muted-foreground">Maximum</div>
                                      <div className="text-2xl font-bold">{max.toLocaleString()}</div>
                                    </div>
                                    <div className="border rounded-lg p-4">
                                      <div className="text-sm text-muted-foreground">Average</div>
                                      <div className="text-2xl font-bold">{avg.toFixed(2)}</div>
                                    </div>
                                    <div className="border rounded-lg p-4">
                                      <div className="text-sm text-muted-foreground">Median</div>
                                      <div className="text-2xl font-bold">{median.toFixed(2)}</div>
                                    </div>
                                    <div className="border rounded-lg p-4">
                                      <div className="text-sm text-muted-foreground">Total Sum</div>
                                      <div className="text-2xl font-bold">{sum.toLocaleString()}</div>
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                              
                              <Card>
                                <CardHeader>
                                  <CardTitle className="text-lg">Distribution</CardTitle>
                                  <CardDescription>Histogram showing value distribution</CardDescription>
                                </CardHeader>
                                <CardContent>
                                  <ChartContainer
                                    config={{
                                      count: { label: 'Frequency' },
                                    }}
                                    className="h-[400px] w-full"
                                  >
                                    <BarChart data={histogramData}>
                                      <CartesianGrid strokeDasharray="3 3" />
                                      <XAxis 
                                        dataKey="range" 
                                        angle={-45}
                                        textAnchor="end"
                                        height={100}
                                      />
                                      <YAxis />
                                      <ChartTooltip content={<ChartTooltipContent />} />
                                      <Legend />
                                      <Bar dataKey="count" fill="hsl(var(--primary))" />
                                    </BarChart>
                                  </ChartContainer>
                                </CardContent>
                              </Card>
                            </>
                          );
                        })()}

                        {field.type === 'date' && (() => {
                          const dates = fieldData.map(v => new Date(v as string | number)).filter(d => !isNaN(d.getTime()));
                          if (dates.length === 0) {
                            return (
                              <Card>
                                <CardContent className="py-8 text-center text-muted-foreground">
                                  No valid date values available for analysis
                                </CardContent>
                              </Card>
                            );
                          }
                          
                          const sorted = [...dates].sort((a, b) => a.getTime() - b.getTime());
                          const earliest = sorted[0];
                          const latest = sorted[sorted.length - 1];
                          
                          // Group by date
                          const dateGroups: Record<string, number> = {};
                          dates.forEach(date => {
                            const dateStr = format(date, 'yyyy-MM-dd');
                            dateGroups[dateStr] = (dateGroups[dateStr] || 0) + 1;
                          });
                          
                          const timeSeriesData = Object.entries(dateGroups)
                            .sort(([a], [b]) => a.localeCompare(b))
                            .map(([date, count]) => ({ date, count }));
                          
                          return (
                            <>
                              <Card>
                                <CardHeader>
                                  <CardTitle className="text-lg">Date Range</CardTitle>
                                </CardHeader>
                                <CardContent>
                                  <div className="grid grid-cols-2 gap-4">
                                    <div className="border rounded-lg p-4">
                                      <div className="text-sm text-muted-foreground">Earliest Date</div>
                                      <div className="text-xl font-bold">{format(earliest, 'PPpp')}</div>
                                    </div>
                                    <div className="border rounded-lg p-4">
                                      <div className="text-sm text-muted-foreground">Latest Date</div>
                                      <div className="text-xl font-bold">{format(latest, 'PPpp')}</div>
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                              
                              <Card>
                                <CardHeader>
                                  <CardTitle className="text-lg">Timeline Distribution</CardTitle>
                                  <CardDescription>Count of records over time</CardDescription>
                                </CardHeader>
                                <CardContent>
                                  <ChartContainer
                                    config={{
                                      count: { label: 'Count' },
                                    }}
                                    className="h-[400px] w-full"
                                  >
                                    <LineChart data={timeSeriesData}>
                                      <CartesianGrid strokeDasharray="3 3" />
                                      <XAxis dataKey="date" angle={-45} textAnchor="end" height={100} />
                                      <YAxis />
                                      <ChartTooltip content={<ChartTooltipContent />} />
                                      <Legend />
                                      <Line type="monotone" dataKey="count" stroke="hsl(var(--primary))" strokeWidth={2} />
                                    </LineChart>
                                  </ChartContainer>
                                </CardContent>
                              </Card>
                            </>
                          );
                        })()}

                        {field.type === 'json' && (() => {
                          const jsonData = insightFilteredData.map(row => row[field.key]).filter(val => val !== null && val !== undefined);
                          const jsonKeys: Record<string, number> = {};
                          const jsonStructures: Record<string, number> = {};
                          
                          jsonData.forEach((jsonValue: any) => {
                            try {
                              const parsed = typeof jsonValue === 'string' ? JSON.parse(jsonValue) : jsonValue;
                              if (parsed && typeof parsed === 'object') {
                                // Track which keys exist
                                Object.keys(parsed).forEach(key => {
                                  jsonKeys[key] = (jsonKeys[key] || 0) + 1;
                                });
                                
                                // Track structure (sorted keys as string)
                                const structure = Object.keys(parsed).sort().join(', ');
                                jsonStructures[structure] = (jsonStructures[structure] || 0) + 1;
                              }
                            } catch (e) {
                              // Invalid JSON, skip
                            }
                          });
                          
                          const sortedKeys = Object.entries(jsonKeys)
                            .map(([key, count]) => ({ key, count }))
                            .sort((a, b) => b.count - a.count);
                          
                          const sortedStructures = Object.entries(jsonStructures)
                            .map(([structure, count]) => ({ structure, count }))
                            .sort((a, b) => b.count - a.count)
                            .slice(0, 10);
                          
                          return (
                            <>
                              <Card>
                                <CardHeader>
                                  <CardTitle className="text-lg">JSON Key Frequency</CardTitle>
                                  <CardDescription>Frequency of keys appearing in JSON objects</CardDescription>
                                </CardHeader>
                                <CardContent>
                                  {sortedKeys.length > 0 ? (
                                    <>
                                      <ChartContainer
                                        config={sortedKeys.reduce((acc, item) => {
                                          acc[item.key] = { label: item.key };
                                          return acc;
                                        }, {} as Record<string, { label: string }>)}
                                        className="h-[400px] w-full"
                                      >
                                        <BarChart data={sortedKeys}>
                                          <CartesianGrid strokeDasharray="3 3" />
                                          <XAxis 
                                            dataKey="key" 
                                            angle={-45}
                                            textAnchor="end"
                                            height={100}
                                          />
                                          <YAxis />
                                          <ChartTooltip 
                                            content={({ active, payload }) => {
                                              if (active && payload && payload.length) {
                                                const data = payload[0].payload;
                                                return (
                                                  <div className="bg-background border rounded-lg p-3 shadow-lg">
                                                    <p className="font-semibold">{data.key}</p>
                                                    <p className="text-lg font-bold">{data.count.toLocaleString()} occurrences</p>
                                                    <p className="text-xs text-muted-foreground">
                                                      {nonNullCount > 0 ? ((data.count / nonNullCount) * 100).toFixed(1) : '0'}% of JSON objects
                                                    </p>
                                                  </div>
                                                );
                                              }
                                              return null;
                                            }}
                                          />
                                          <Legend />
                                          <Bar dataKey="count" fill="hsl(var(--primary))" />
                                        </BarChart>
                                      </ChartContainer>
                                      
                                      {/* Key Frequency Table */}
                                      <div className="mt-6 border rounded-lg overflow-hidden">
                                        <div className="max-h-64 overflow-y-auto">
                                          <table className="w-full text-sm">
                                            <thead className="bg-muted sticky top-0">
                                              <tr>
                                                <th className="p-2 text-left">Key</th>
                                                <th className="p-2 text-right">Occurrences</th>
                                                <th className="p-2 text-right">Percentage</th>
                                              </tr>
                                            </thead>
                                            <tbody>
                                              {sortedKeys.map((item) => (
                                                <tr key={item.key} className="border-t">
                                                  <td className="p-2 font-medium">{item.key}</td>
                                                  <td className="p-2 text-right">{item.count.toLocaleString()}</td>
                                                  <td className="p-2 text-right">
                                                    {nonNullCount > 0 ? ((item.count / nonNullCount) * 100).toFixed(1) : '0'}%
                                                  </td>
                                                </tr>
                                              ))}
                                            </tbody>
                                          </table>
                                        </div>
                                      </div>
                                    </>
                                  ) : (
                                    <div className="text-center py-8 text-muted-foreground">
                                      No JSON keys found in the data
                                    </div>
                                  )}
                                </CardContent>
                              </Card>
                              
                              {sortedStructures.length > 0 && (
                                <Card>
                                  <CardHeader>
                                    <CardTitle className="text-lg">Common JSON Structures</CardTitle>
                                    <CardDescription>Top 10 most common key combinations</CardDescription>
                                  </CardHeader>
                                  <CardContent>
                                    <div className="space-y-2">
                                      {sortedStructures.map((item) => (
                                        <div key={item.structure} className="border rounded-lg p-3 flex items-center justify-between">
                                          <code className="text-sm bg-muted px-2 py-1 rounded">{item.structure || '(empty object)'}</code>
                                          <div className="text-right">
                                            <div className="font-semibold">{item.count.toLocaleString()}</div>
                                            <div className="text-xs text-muted-foreground">
                                              {nonNullCount > 0 ? ((item.count / nonNullCount) * 100).toFixed(1) : '0'}%
                                            </div>
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  </CardContent>
                                </Card>
                              )}
                            </>
                          );
                        })()}

                        {/* Cross-Column Insights: Automation Potential by this field's values */}
                        {(field.type === 'select' || field.type === 'text') && (() => {
                          // Get unique values for this field
                          const uniqueValues = Array.from(new Set(fieldData.map(String))).filter(v => v && v !== 'null' && v !== 'undefined');
                          
                          // Calculate automation metrics for each value
                          const automationByValue = uniqueValues.map(value => {
                            const valueFiltered = insightFilteredData.filter((row: any) => String(row[field.key] || '') === value);
                            if (valueFiltered.length === 0) return null;
                            
                            const booleans = calculateChartData('booleans', valueFiltered) as {
                              canAutoInvoice: { yes: number; no: number };
                              canAutoAnswer: { yes: number; no: number };
                              isCustomerEmail: { yes: number; no: number };
                            };
                            
                            const total = valueFiltered.length;
                            const autoInvoice = booleans.canAutoInvoice.yes;
                            const autoAnswer = booleans.canAutoAnswer.yes;
                            const automationTotal = autoInvoice + autoAnswer;
                            
                            return {
                              value,
                              total,
                              autoInvoice,
                              autoAnswer,
                              automationTotal,
                              automationPercentage: total > 0 ? ((automationTotal / total) * 100).toFixed(1) : '0',
                              autoInvoicePercentage: total > 0 ? ((autoInvoice / total) * 100).toFixed(1) : '0',
                              autoAnswerPercentage: total > 0 ? ((autoAnswer / total) * 100).toFixed(1) : '0',
                            };
                          }).filter(item => item !== null && item.total > 0).sort((a, b) => b!.total - a!.total).slice(0, 10);
                          
                          if (automationByValue.length === 0) return null;
                          
                          return (
                            <Card>
                              <CardHeader>
                                <CardTitle className="text-lg">Automation Potential by {field.label}</CardTitle>
                                <CardDescription>Automation opportunities broken down by {field.label.toLowerCase()} values</CardDescription>
                              </CardHeader>
                              <CardContent>
                                <div className="space-y-4">
                                  {automationByValue.map((item) => (
                                    <div key={item!.value} className="border rounded-lg p-4 space-y-2">
                                      <div className="flex items-center justify-between">
                                        <h4 className="font-semibold text-lg">{item!.value || '(empty)'}</h4>
                                        <span className="text-sm text-muted-foreground">{item!.total.toLocaleString()} threads</span>
                                      </div>
                                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
                                        <div className="space-y-1">
                                          <div className="flex items-center justify-between">
                                            <span className="text-sm text-muted-foreground">Total Automation</span>
                                            <span className="text-sm font-semibold">{item!.automationTotal.toLocaleString()}</span>
                                          </div>
                                          <div className="w-full bg-muted rounded-full h-2">
                                            <div 
                                              className="bg-green-600 h-2 rounded-full transition-all" 
                                              style={{ width: `${item!.automationPercentage}%` }}
                                            />
                                          </div>
                                          <p className="text-xs text-muted-foreground">{item!.automationPercentage}% automation ready</p>
                                        </div>
                                        <div className="space-y-1">
                                          <div className="flex items-center justify-between">
                                            <span className="text-sm text-muted-foreground">Auto Invoice</span>
                                            <span className="text-sm font-semibold">{item!.autoInvoice.toLocaleString()}</span>
                                          </div>
                                          <div className="w-full bg-muted rounded-full h-2">
                                            <div 
                                              className="bg-purple-600 h-2 rounded-full transition-all" 
                                              style={{ width: `${item!.autoInvoicePercentage}%` }}
                                            />
                                          </div>
                                          <p className="text-xs text-muted-foreground">{item!.autoInvoicePercentage}% can auto invoice</p>
                                        </div>
                                        <div className="space-y-1">
                                          <div className="flex items-center justify-between">
                                            <span className="text-sm text-muted-foreground">Auto Answer</span>
                                            <span className="text-sm font-semibold">{item!.autoAnswer.toLocaleString()}</span>
                                          </div>
                                          <div className="w-full bg-muted rounded-full h-2">
                                            <div 
                                              className="bg-blue-600 h-2 rounded-full transition-all" 
                                              style={{ width: `${item!.autoAnswerPercentage}%` }}
                                            />
                                          </div>
                                          <p className="text-xs text-muted-foreground">{item!.autoAnswerPercentage}% can auto answer</p>
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </CardContent>
                            </Card>
                          );
                        })()}
                          </CardContent>
                        </Card>
                      </TabsContent>
                    );
                  })}
                </Tabs>
              );
            })()}
          </TabsContent>
        </Tabs>
      </CardContent>

      {/* Detail Dialog */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{config.title} - {t('dashboard.detail.title') || 'Details'}</DialogTitle>
            <DialogDescription>
              {t('dashboard.detail.description') || 'View full details of this record'}
            </DialogDescription>
          </DialogHeader>
          {selectedRow && (
            <div className="space-y-4">
              {config.fields.map((field) => {
                const value = selectedRow[field.key];
                return (
                  <div key={field.key} className="border-b pb-2">
                    <div className="font-medium text-sm text-muted-foreground mb-1">
                      {field.label}
                    </div>
                    <div className="text-sm">
                      {field.render ? field.render(value) : (
                        value === null || value === undefined ? (
                          <span className="text-muted-foreground">-</span>
                        ) : field.type === 'json' ? (
                          <pre className="text-xs bg-muted p-3 rounded overflow-auto">
                            {JSON.stringify(value, null, 2)}
                          </pre>
                        ) : (
                          String(value)
                        )
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </Card>
  );
}
