/**
 * Dashboard Configuration System
 * 
 * This file defines configurations for different data dashboards.
 * To add a new dashboard, create a new configuration object and add it to the configs.
 */

import React from 'react';

export type FieldType = 'text' | 'number' | 'boolean' | 'date' | 'json' | 'select';

export interface DashboardField {
  key: string;
  label: string;
  type: FieldType;
  filterable?: boolean;
  sortable?: boolean;
  options?: string[]; // For select type fields
  render?: (value: any) => React.ReactNode;
}

export interface DashboardConfig {
  id: string;
  tableName: string;
  title: string;
  description?: string;
  fields: DashboardField[];
  defaultSort?: {
    field: string;
    direction: 'asc' | 'desc';
  };
  pageSize?: number;
}

/**
 * Email Thread Edits Dashboard Configuration
 */
export const emailThreadEditsConfig: DashboardConfig = {
  id: 'email_thread_edits',
  tableName: 'email_thread_edits',
  title: 'Email Thread Edits',
  description: 'View and manage email thread analysis data',
  defaultSort: {
    field: 'created_at',
    direction: 'desc',
  },
  pageSize: 50,
  fields: [
    {
      key: 'thread_id',
      label: 'Thread ID',
      type: 'text',
      filterable: true,
      sortable: true,
    },
    {
      key: 'category',
      label: 'Category',
      type: 'select',
      filterable: true,
      sortable: true,
    },
    {
      key: 'automation_potential',
      label: 'Automation Potential',
      type: 'select',
      filterable: true,
      sortable: true,
    },
    {
      key: 'language',
      label: 'Language',
      type: 'select',
      filterable: true,
      sortable: true,
    },
    {
      key: 'sentiment',
      label: 'Sentiment',
      type: 'select',
      filterable: true,
      sortable: true,
    },
    {
      key: 'is_customer_email',
      label: 'Is Customer Email',
      type: 'boolean',
      filterable: true,
      sortable: true,
      render: (value: boolean) => (
        <span className={value ? 'text-green-600' : 'text-gray-500'}>
          {value ? 'Yes' : 'No'}
        </span>
      ),
    },
    {
      key: 'email_type',
      label: 'Email Type',
      type: 'select',
      filterable: true,
      sortable: true,
    },
    {
      key: 'shopify_order_id',
      label: 'Shopify Order ID',
      type: 'text',
      filterable: true,
      sortable: true,
    },
    {
      key: 'can_auto_invoice',
      label: 'Can Auto Invoice',
      type: 'boolean',
      filterable: true,
      sortable: true,
      render: (value: boolean) => (
        <span className={value ? 'text-green-600' : 'text-gray-500'}>
          {value ? 'Yes' : 'No'}
        </span>
      ),
    },
    {
      key: 'can_auto_answer',
      label: 'Can Auto Answer',
      type: 'boolean',
      filterable: true,
      sortable: true,
      render: (value: boolean) => (
        <span className={value ? 'text-green-600' : 'text-gray-500'}>
          {value ? 'Yes' : 'No'}
        </span>
      ),
    },
    {
      key: 'blocker_reason',
      label: 'Blocker Reason',
      type: 'text',
      filterable: true,
      sortable: true,
    },
    {
      key: 'missing_fields',
      label: 'Missing Fields',
      type: 'json',
      filterable: false,
      sortable: false,
      render: (value: any) => {
        if (!value) return <span className="text-muted-foreground">-</span>;
        return (
          <pre className="text-xs bg-muted p-2 rounded max-w-xs overflow-auto">
            {JSON.stringify(value, null, 2)}
          </pre>
        );
      },
    },
    {
      key: 'customer_id',
      label: 'Customer ID',
      type: 'text',
      filterable: true,
      sortable: true,
    },
    {
      key: 'sent_at',
      label: 'Sent At',
      type: 'date',
      filterable: true,
      sortable: true,
      render: (value: string) => {
        if (!value) return '-';
        return new Date(value).toLocaleString();
      },
    },
    {
      key: 'created_at',
      label: 'Created At',
      type: 'date',
      filterable: true,
      sortable: true,
      render: (value: string) => {
        if (!value) return '-';
        return new Date(value).toLocaleString();
      },
    },
    {
      key: 'updated_at',
      label: 'Updated At',
      type: 'date',
      filterable: true,
      sortable: true,
      render: (value: string) => {
        if (!value) return '-';
        return new Date(value).toLocaleString();
      },
    },
  ],
};

/**
 * Emails Dashboard Configuration
 */
export const emailsConfig: DashboardConfig = {
  id: 'emails',
  tableName: 'emails',
  title: 'Email Analytics Dashboard',
  description: 'Comprehensive analysis of email data with advanced filtering and visualization',
  defaultSort: {
    field: 'date',
    direction: 'desc',
  },
  pageSize: 50,
  fields: [
    {
      key: 'id',
      label: 'ID',
      type: 'number',
      filterable: true,
      sortable: true,
    },
    {
      key: 'message_id',
      label: 'Message ID',
      type: 'text',
      filterable: true,
      sortable: true,
    },
    {
      key: 'date',
      label: 'Date',
      type: 'date',
      filterable: true,
      sortable: true,
      render: (value: string) => {
        if (!value) return '-';
        return new Date(value).toLocaleString();
      },
    },
    {
      key: 'from_email',
      label: 'From Email',
      type: 'text',
      filterable: true,
      sortable: true,
    },
    {
      key: 'to_email',
      label: 'To Email',
      type: 'text',
      filterable: true,
      sortable: true,
    },
    {
      key: 'subject',
      label: 'Subject',
      type: 'text',
      filterable: true,
      sortable: true,
    },
    {
      key: 'body',
      label: 'Body',
      type: 'text',
      filterable: true,
      sortable: false,
      render: (value: string) => {
        if (!value) return '-';
        return <span className="truncate max-w-xs">{value.substring(0, 100)}...</span>;
      },
    },
    {
      key: 'category',
      label: 'Category',
      type: 'select',
      filterable: true,
      sortable: true,
    },
    {
      key: 'automation_potential',
      label: 'Automation Potential',
      type: 'select',
      filterable: true,
      sortable: true,
    },
    {
      key: 'language',
      label: 'Language',
      type: 'select',
      filterable: true,
      sortable: true,
    },
    {
      key: 'sentiment',
      label: 'Sentiment',
      type: 'select',
      filterable: true,
      sortable: true,
    },
    {
      key: 'is_customer_email',
      label: 'Is Customer Email',
      type: 'boolean',
      filterable: true,
      sortable: true,
      render: (value: boolean) => (
        <span className={value ? 'text-green-600' : 'text-gray-500'}>
          {value ? 'Yes' : 'No'}
        </span>
      ),
    },
    {
      key: 'email_type',
      label: 'Email Type',
      type: 'select',
      filterable: true,
      sortable: true,
    },
    {
      key: 'shopify_order_id',
      label: 'Shopify Order ID',
      type: 'text',
      filterable: true,
      sortable: true,
    },
    {
      key: 'can_auto_invoice',
      label: 'Can Auto Invoice',
      type: 'boolean',
      filterable: true,
      sortable: true,
      render: (value: boolean) => (
        <span className={value ? 'text-green-600' : 'text-gray-500'}>
          {value ? 'Yes' : 'No'}
        </span>
      ),
    },
    {
      key: 'can_auto_answer',
      label: 'Can Auto Answer',
      type: 'boolean',
      filterable: true,
      sortable: true,
      render: (value: boolean) => (
        <span className={value ? 'text-green-600' : 'text-gray-500'}>
          {value ? 'Yes' : 'No'}
        </span>
      ),
    },
    {
      key: 'blocker_reason',
      label: 'Blocker Reason',
      type: 'text',
      filterable: true,
      sortable: true,
    },
    {
      key: 'missing_fields',
      label: 'Missing Fields',
      type: 'text',
      filterable: true,
      sortable: false,
    },
    {
      key: 'customer_id',
      label: 'Customer ID',
      type: 'text',
      filterable: true,
      sortable: true,
    },
    {
      key: 'size',
      label: 'Size (bytes)',
      type: 'number',
      filterable: true,
      sortable: true,
      render: (value: number) => {
        if (!value) return '-';
        const kb = value / 1024;
        const mb = kb / 1024;
        if (mb >= 1) return `${mb.toFixed(2)} MB`;
        return `${kb.toFixed(2)} KB`;
      },
    },
    {
      key: 'cc',
      label: 'CC',
      type: 'text',
      filterable: true,
      sortable: false,
    },
    {
      key: 'bcc',
      label: 'BCC',
      type: 'text',
      filterable: true,
      sortable: false,
    },
    {
      key: 'x_gmail_labels',
      label: 'Gmail Labels',
      type: 'text',
      filterable: true,
      sortable: true,
    },
    {
      key: 'x_gm_thrid',
      label: 'Gmail Thread ID',
      type: 'text',
      filterable: true,
      sortable: true,
    },
    {
      key: 'created_at',
      label: 'Created At',
      type: 'date',
      filterable: true,
      sortable: true,
      render: (value: string) => {
        if (!value) return '-';
        return new Date(value).toLocaleString();
      },
    },
  ],
};

/**
 * Registry of all dashboard configurations
 */
export const dashboardConfigs: Record<string, DashboardConfig> = {
  email_thread_edits: emailThreadEditsConfig,
  emails: emailsConfig,
};

/**
 * Get a dashboard configuration by ID
 */
export function getDashboardConfig(id: string): DashboardConfig | undefined {
  return dashboardConfigs[id];
}
