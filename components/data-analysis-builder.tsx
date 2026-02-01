"use client";

import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ScatterChart,
  Scatter,
  AreaChart,
  Area,
} from 'recharts';
import { X, Plus, Trash2 } from 'lucide-react';
import type { DashboardField } from '@/lib/dashboard-configs';

interface DataAnalysisBuilderProps {
  data: any[];
  fields: DashboardField[];
}

type ChartType = 'bar' | 'line' | 'pie' | 'scatter' | 'area' | 'stacked-bar';
type AggregationType = 'count' | 'sum' | 'avg' | 'min' | 'max';

interface AnalysisConfig {
  xAxis: string;
  yAxis: string[];
  chartType: ChartType;
  aggregation: AggregationType;
  groupBy?: string;
  filters: Array<{
    field: string;
    operator: string;
    value: string;
  }>;
}

const COLORS = ['hsl(var(--primary))', '#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#00ff00', '#0088fe', '#00c49f'];

export function DataAnalysisBuilder({ data, fields }: DataAnalysisBuilderProps) {
  const [config, setConfig] = useState<AnalysisConfig>({
    xAxis: '',
    yAxis: [],
    chartType: 'bar',
    aggregation: 'count',
    filters: [],
  });

  const [showBuilder, setShowBuilder] = useState(false);

  // Get available fields for selection
  const numericFields = useMemo(() => {
    // Only actual number fields for sum/avg/min/max operations
    return fields.filter(f => f.type === 'number');
  }, [fields]);

  const categoricalFields = useMemo(() => {
    return fields.filter(f => f.type === 'text' || f.type === 'select' || f.type === 'boolean' || f.type === 'date');
  }, [fields]);

  // Fields available for Y-axis based on aggregation type
  const yAxisFields = useMemo(() => {
    if (config.aggregation === 'count') {
      // For count, we can use any field
      return fields;
    } else {
      // For sum/avg/min/max, only numeric fields
      return numericFields;
    }
  }, [fields, numericFields, config.aggregation]);

  // Process data based on configuration
  const processedData = useMemo(() => {
    if (!config.xAxis || config.yAxis.length === 0) return [];

    let filtered = [...data];

    // Apply filters
    config.filters.forEach(filter => {
      filtered = filtered.filter(row => {
        const value = row[filter.field];
        if (value === null || value === undefined) return false;
        
        switch (filter.operator) {
          case 'equals':
            return String(value) === filter.value;
          case 'contains':
            return String(value).toLowerCase().includes(filter.value.toLowerCase());
          case 'gt':
            return Number(value) > Number(filter.value);
          case 'lt':
            return Number(value) < Number(filter.value);
          default:
            return true;
        }
      });
    });

    // Group and aggregate
    const grouped = new Map<string, any>();

    filtered.forEach(row => {
      const xValue = row[config.xAxis] || 'Unknown';
      const key = String(xValue);

      if (!grouped.has(key)) {
        grouped.set(key, {
          name: key,
          ...config.yAxis.reduce((acc, field) => {
            acc[field] = [];
            return acc;
          }, {} as Record<string, any[]>),
        });
      }

      const group = grouped.get(key);
      config.yAxis.forEach(field => {
        const value = row[field];
        if (value !== null && value !== undefined) {
          group[field].push(value);
        }
      });
    });

    // Aggregate values
    return Array.from(grouped.values()).map(group => {
      const result: any = { name: group.name };
      
      config.yAxis.forEach(field => {
        const values = group[field] || [];
        if (values.length === 0) {
          result[field] = 0;
          return;
        }

        switch (config.aggregation) {
          case 'count':
            result[field] = values.length;
            break;
          case 'sum':
            result[field] = values.reduce((sum: number, v: any) => sum + (Number(v) || 0), 0);
            break;
          case 'avg':
            const sum = values.reduce((s: number, v: any) => s + (Number(v) || 0), 0);
            result[field] = sum / values.length;
            break;
          case 'min':
            result[field] = Math.min(...values.map((v: any) => Number(v) || 0));
            break;
          case 'max':
            result[field] = Math.max(...values.map((v: any) => Number(v) || 0));
            break;
          default:
            result[field] = values.length;
        }
      });

      return result;
    }).sort((a, b) => {
      // Sort by name alphabetically
      return a.name.localeCompare(b.name);
    });
  }, [data, config]);

  const addYAxis = () => {
    if (yAxisFields.length > 0 && !config.yAxis.includes(yAxisFields[0].key)) {
      setConfig({
        ...config,
        yAxis: [...config.yAxis, yAxisFields[0].key],
      });
    }
  };

  const removeYAxis = (field: string) => {
    setConfig({
      ...config,
      yAxis: config.yAxis.filter(f => f !== field),
    });
  };

  const addFilter = () => {
    setConfig({
      ...config,
      filters: [...config.filters, { field: fields[0]?.key || '', operator: 'equals', value: '' }],
    });
  };

  const removeFilter = (index: number) => {
    setConfig({
      ...config,
      filters: config.filters.filter((_, i) => i !== index),
    });
  };

  const updateFilter = (index: number, updates: Partial<AnalysisConfig['filters'][0]>) => {
    const newFilters = [...config.filters];
    newFilters[index] = { ...newFilters[index], ...updates };
    setConfig({ ...config, filters: newFilters });
  };

  const renderChart = () => {
    if (processedData.length === 0) {
      return (
        <div className="h-[400px] flex items-center justify-center text-muted-foreground">
          No data to display. Configure X-axis and Y-axis fields.
        </div>
      );
    }

    const chartConfig = config.yAxis.reduce((acc, field) => {
      const fieldLabel = fields.find(f => f.key === field)?.label || field;
      acc[field] = { label: fieldLabel };
      return acc;
    }, {} as Record<string, { label: string }>);

    switch (config.chartType) {
      case 'bar':
        return (
          <ChartContainer config={chartConfig} className="h-[400px] w-full">
            <BarChart data={processedData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Legend />
              {config.yAxis.map((field, index) => {
                const fieldLabel = fields.find(f => f.key === field)?.label || field;
                return (
                  <Bar
                    key={field}
                    dataKey={field}
                    fill={COLORS[index % COLORS.length]}
                    name={fieldLabel}
                  />
                );
              })}
            </BarChart>
          </ChartContainer>
        );

      case 'stacked-bar':
        return (
          <ChartContainer config={chartConfig} className="h-[400px] w-full">
            <BarChart data={processedData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Legend />
              {config.yAxis.map((field, index) => {
                const fieldLabel = fields.find(f => f.key === field)?.label || field;
                return (
                  <Bar
                    key={field}
                    dataKey={field}
                    stackId="a"
                    fill={COLORS[index % COLORS.length]}
                    name={fieldLabel}
                  />
                );
              })}
            </BarChart>
          </ChartContainer>
        );

      case 'line':
        return (
          <ChartContainer config={chartConfig} className="h-[400px] w-full">
            <LineChart data={processedData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Legend />
              {config.yAxis.map((field, index) => {
                const fieldLabel = fields.find(f => f.key === field)?.label || field;
                return (
                  <Line
                    key={field}
                    type="monotone"
                    dataKey={field}
                    stroke={COLORS[index % COLORS.length]}
                    strokeWidth={2}
                    name={fieldLabel}
                  />
                );
              })}
            </LineChart>
          </ChartContainer>
        );

      case 'area':
        return (
          <ChartContainer config={chartConfig} className="h-[400px] w-full">
            <AreaChart data={processedData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Legend />
              {config.yAxis.map((field, index) => {
                const fieldLabel = fields.find(f => f.key === field)?.label || field;
                return (
                  <Area
                    key={field}
                    type="monotone"
                    dataKey={field}
                    stackId="1"
                    stroke={COLORS[index % COLORS.length]}
                    fill={COLORS[index % COLORS.length]}
                    name={fieldLabel}
                  />
                );
              })}
            </AreaChart>
          </ChartContainer>
        );

      case 'pie':
        // Pie chart only uses first Y-axis
        if (config.yAxis.length === 0) return null;
        const pieData = processedData.map(item => ({
          name: item.name,
          value: item[config.yAxis[0]],
        }));
        return (
          <ChartContainer config={chartConfig} className="h-[400px] w-full">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <ChartTooltip content={<ChartTooltipContent />} />
            </PieChart>
          </ChartContainer>
        );

      case 'scatter':
        // Scatter chart uses first two Y-axis fields
        if (config.yAxis.length < 2) return null;
        return (
          <ChartContainer config={chartConfig} className="h-[400px] w-full">
            <ScatterChart data={processedData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={config.yAxis[0]} />
              <YAxis dataKey={config.yAxis[1]} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Scatter dataKey={config.yAxis[1]} fill={COLORS[0]} />
            </ScatterChart>
          </ChartContainer>
        );

      default:
        return null;
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="finit-h2">Custom Data Analysis</CardTitle>
            <CardDescription>Combine columns and create custom visualizations</CardDescription>
          </div>
          <Button
            variant="outline"
            onClick={() => setShowBuilder(!showBuilder)}
          >
            {showBuilder ? 'Hide Builder' : 'Show Builder'}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {showBuilder && (
          <div className="space-y-4 mb-6 p-4 border rounded-lg bg-muted/50">
            {/* X-Axis Selection */}
            <div className="space-y-2">
              <Label>X-Axis (Group By)</Label>
              <Select
                value={config.xAxis}
                onValueChange={(value) => setConfig({ ...config, xAxis: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select field to group by" />
                </SelectTrigger>
                <SelectContent>
                  {categoricalFields.map((field) => (
                    <SelectItem key={field.key} value={field.key}>
                      {field.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Y-Axis Selection */}
            <div className="space-y-2">
              <Label>Y-Axis (Metrics)</Label>
              <div className="flex flex-wrap gap-2 mb-2">
                {config.yAxis.map((field) => {
                  const fieldLabel = fields.find(f => f.key === field)?.label || field;
                  return (
                    <Badge key={field} variant="secondary" className="gap-2">
                      {fieldLabel}
                      <button
                        onClick={() => removeYAxis(field)}
                        className="hover:bg-destructive/20 rounded-full p-0.5"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  );
                })}
              </div>
              <Select
                value=""
                onValueChange={(value) => {
                  if (value && !config.yAxis.includes(value)) {
                    setConfig({ ...config, yAxis: [...config.yAxis, value] });
                  }
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder={config.aggregation === 'count' ? 'Add field to count' : 'Add numeric field'} />
                </SelectTrigger>
                <SelectContent>
                  {yAxisFields.map((field) => (
                    <SelectItem key={field.key} value={field.key}>
                      {field.label} {field.type === 'number' ? '(numeric)' : ''}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Chart Type */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Chart Type</Label>
                <Select
                  value={config.chartType}
                  onValueChange={(value: ChartType) => setConfig({ ...config, chartType: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bar">Bar Chart</SelectItem>
                    <SelectItem value="stacked-bar">Stacked Bar</SelectItem>
                    <SelectItem value="line">Line Chart</SelectItem>
                    <SelectItem value="area">Area Chart</SelectItem>
                    <SelectItem value="pie">Pie Chart</SelectItem>
                    <SelectItem value="scatter">Scatter Plot</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Aggregation</Label>
                <Select
                  value={config.aggregation}
                  onValueChange={(value: AggregationType) => setConfig({ ...config, aggregation: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="count">Count</SelectItem>
                    <SelectItem value="sum">Sum</SelectItem>
                    <SelectItem value="avg">Average</SelectItem>
                    <SelectItem value="min">Minimum</SelectItem>
                    <SelectItem value="max">Maximum</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Filters */}
            <div className="space-y-2">
              <Label>Filters</Label>
              {config.filters.map((filter, index) => (
                <div key={index} className="flex gap-2 items-end">
                  <Select
                    value={filter.field}
                    onValueChange={(value) => updateFilter(index, { field: value })}
                  >
                    <SelectTrigger className="flex-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {fields.map((f) => (
                        <SelectItem key={f.key} value={f.key}>
                          {f.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select
                    value={filter.operator}
                    onValueChange={(value) => updateFilter(index, { operator: value })}
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="equals">Equals</SelectItem>
                      <SelectItem value="contains">Contains</SelectItem>
                      <SelectItem value="gt">Greater than</SelectItem>
                      <SelectItem value="lt">Less than</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input
                    value={filter.value}
                    onChange={(e) => updateFilter(index, { value: e.target.value })}
                    placeholder="Value"
                    className="flex-1"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeFilter(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button variant="outline" onClick={addFilter} className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Add Filter
              </Button>
            </div>
          </div>
        )}

        {/* Chart Display */}
        <div className="border rounded-lg p-4">
          {renderChart()}
        </div>

        {/* Data Summary */}
        {processedData.length > 0 && (
          <div className="mt-4 text-sm text-muted-foreground">
            Showing {processedData.length} data points
          </div>
        )}
      </CardContent>
    </Card>
  );
}
