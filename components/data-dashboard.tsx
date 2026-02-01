"use client";

import { useEffect, useState, useMemo } from 'react';
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
  operator: 'equals' | 'contains' | 'gt' | 'lt' | 'gte' | 'lte';
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

  useEffect(() => {
    fetchData();
  }, [userId]);

  const fetchData = async () => {
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
  };

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

    // Apply filters
    filters.forEach((filter) => {
      const field = config.fields.find((f) => f.key === filter.field);
      if (!field) return;

      result = result.filter((row) => {
        const value = row[filter.field];
        
        if (value === null || value === undefined) {
          return filter.operator === 'equals' && filter.value === '';
        }

        switch (filter.operator) {
          case 'equals':
            return String(value) === filter.value;
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
  }, [data, searchQuery, filters, config.fields]);

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
    
    Object.entries(emailTypeDataRaw).forEach(([type, count]) => {
      if (count <= 2) {
        otherCount += count;
      } else {
        emailTypeData[type] = count;
      }
    });
    
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
      timeSeries: Object.entries(timeSeriesData)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([date, count]) => ({ date, count })),
    };

    // Add optional charts if data exists
    if (Object.keys(senderData).length > 0) {
      result.senders = Object.entries(senderData)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 10)
        .map(([name, value]) => ({ name, value }));
    }

    if (Object.keys(recipientData).length > 0) {
      result.recipients = Object.entries(recipientData)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 10)
        .map(([name, value]) => ({ name, value }));
    }

    if (Object.keys(threadData).length > 0) {
      result.threads = Object.entries(threadData)
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
            return value ? format(new Date(value), 'PPpp') : '-';
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

        {/* Tabs for Table, Charts, and Analysis */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="table" className="gap-2">
              <Table2 className="h-4 w-4" />
              Table
            </TabsTrigger>
            <TabsTrigger value="charts" className="gap-2">
              <BarChart3 className="h-4 w-4" />
              Overview
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
                {/* Category Distribution */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Category Distribution</CardTitle>
                    <CardDescription>{chartData.category.length} categories</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {chartData.category.length > 0 ? (
                      <ChartContainer
                        config={chartData.category.reduce((acc, item) => {
                          acc[item.name] = { label: item.name };
                          return acc;
                        }, {} as Record<string, { label: string }>)}
                        className="h-[400px] w-full"
                      >
                        <PieChart>
                          <Pie
                            data={chartData.category}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                            outerRadius={100}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {chartData.category.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <Legend />
                        </PieChart>
                      </ChartContainer>
                    ) : (
                      <div className="h-[400px] flex items-center justify-center text-muted-foreground">
                        No category data available
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Sentiment Distribution */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Sentiment Distribution</CardTitle>
                    <CardDescription>{chartData.sentiment.length} sentiment types</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {chartData.sentiment.length > 0 ? (
                      <ChartContainer
                        config={chartData.sentiment.reduce((acc, item) => {
                          acc[item.name] = { label: item.name };
                          return acc;
                        }, {} as Record<string, { label: string }>)}
                        className="h-[400px] w-full"
                      >
                        <PieChart>
                          <Pie
                            data={chartData.sentiment}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                            outerRadius={100}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {chartData.sentiment.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <Legend />
                        </PieChart>
                      </ChartContainer>
                    ) : (
                      <div className="h-[400px] flex items-center justify-center text-muted-foreground">
                        No sentiment data available
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Automation Potential */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Automation Potential</CardTitle>
                    <CardDescription>{chartData.automation.length} automation levels</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {chartData.automation.length > 0 ? (
                      <ChartContainer
                        config={chartData.automation.reduce((acc, item) => {
                          acc[item.name] = { label: item.name };
                          return acc;
                        }, {} as Record<string, { label: string }>)}
                        className="h-[400px] w-full"
                      >
                        <BarChart data={chartData.automation}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <Legend />
                          <Bar dataKey="value" fill="hsl(var(--primary))" />
                        </BarChart>
                      </ChartContainer>
                    ) : (
                      <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                        No automation data available
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Email Type - Pie Chart without "Other" */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Email Type Distribution</CardTitle>
                    <CardDescription>
                      {chartData.emailType.filter(e => e.name !== 'Other').length} email types shown
                      {chartData.emailType.find(e => e.name === 'Other') && (
                        <span className="text-muted-foreground ml-2">
                          ({chartData.emailType.find(e => e.name === 'Other')?.value} other types grouped)
                        </span>
                      )}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {chartData.emailType.filter(e => e.name !== 'Other').length > 0 ? (
                      <ChartContainer
                        config={chartData.emailType
                          .filter(e => e.name !== 'Other')
                          .reduce((acc, item) => {
                            acc[item.name] = { label: item.name };
                            return acc;
                          }, {} as Record<string, { label: string }>)}
                        className="h-[400px] w-full"
                      >
                        <PieChart>
                          <Pie
                            data={chartData.emailType.filter(e => e.name !== 'Other')}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                            outerRadius={100}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {chartData.emailType
                              .filter(e => e.name !== 'Other')
                              .map((entry, index) => (
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
                    )}
                  </CardContent>
                </Card>

                {/* Boolean Fields */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Boolean Fields</CardTitle>
                    <CardDescription>Automation capabilities</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer
                      config={{
                        yes: { label: 'Yes' },
                        no: { label: 'No' },
                      }}
                      className="h-[400px] w-full"
                    >
                      <BarChart data={[
                        { name: 'Can Auto Invoice', yes: chartData.booleans.canAutoInvoice.yes, no: chartData.booleans.canAutoInvoice.no },
                        { name: 'Can Auto Answer', yes: chartData.booleans.canAutoAnswer.yes, no: chartData.booleans.canAutoAnswer.no },
                        { name: 'Is Customer Email', yes: chartData.booleans.isCustomerEmail.yes, no: chartData.booleans.isCustomerEmail.no },
                      ]}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Legend />
                        <Bar dataKey="yes" stackId="a" fill="#82ca9d" name="Yes" />
                        <Bar dataKey="no" stackId="a" fill="#ffc658" name="No" />
                      </BarChart>
                    </ChartContainer>
                  </CardContent>
                </Card>

                {/* Time Series */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Email Volume Over Time</CardTitle>
                    <CardDescription>{chartData.timeSeries.length} data points</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {chartData.timeSeries.length > 0 ? (
                      <ChartContainer
                        config={{
                          count: { label: 'Email Count' },
                        }}
                        className="h-[400px] w-full"
                      >
                        <LineChart data={chartData.timeSeries}>
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
                    )}
                  </CardContent>
                </Card>
              </div>
            )}
          </TabsContent>

          {/* Analysis Builder Tab */}
          <TabsContent value="analysis" className="space-y-4">
            <DataAnalysisBuilder data={filteredData} fields={config.fields} />
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
