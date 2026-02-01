"use client";

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/language-context';
import { createClient } from '@/lib/supabase/client';
import { Database, X, Loader2 } from 'lucide-react';

interface AvailableTable {
  id: string;
  name: string;
  display_name: string;
  description: string | null;
}

interface TableAssignment {
  id: string;
  table_id: string;
  assigned_at: string;
  available_tables: AvailableTable;
}

interface TableAssignmentsProps {
  userId: string;
}

export function TableAssignments({ userId }: TableAssignmentsProps) {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [assignments, setAssignments] = useState<TableAssignment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    fetchAssignments();
  }, [userId]);

  const fetchAssignments = async () => {
    try {
      setIsLoading(true);
      
      // Get JWT token
      let jwtToken: string | null = null;
      const legacyJwt = process.env.NEXT_PUBLIC_LEGACY_JWT;
      
      if (legacyJwt) {
        jwtToken = legacyJwt;
      } else {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
          throw new Error('No session found');
        }
        jwtToken = session.access_token;
      }

      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const response = await fetch(`${supabaseUrl}/functions/v1/manage-table-assignments?userId=${userId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${jwtToken}`,
          'apikey': process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch assignments');
      }

      const data = await response.json();
      setAssignments(data.assignments || []);
    } catch (error) {
      console.error('Error fetching assignments:', error);
      toast({
        title: t('portal.admin.tableAssignments.error.title'),
        description: error instanceof Error ? error.message : t('portal.admin.tableAssignments.error.fetchFailed'),
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };


  const handleUnassignTable = async (tableId: string) => {
    try {
      let jwtToken: string | null = null;
      const legacyJwt = process.env.NEXT_PUBLIC_LEGACY_JWT;
      
      if (legacyJwt) {
        jwtToken = legacyJwt;
      } else {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
          throw new Error('No session found');
        }
        jwtToken = session.access_token;
      }

      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const response = await fetch(`${supabaseUrl}/functions/v1/manage-table-assignments?userId=${userId}&tableId=${tableId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${jwtToken}`,
          'apikey': process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to unassign table');
      }

      toast({
        title: t('portal.admin.tableAssignments.success.title'),
        description: t('portal.admin.tableAssignments.success.unassigned'),
      });

      fetchAssignments();
    } catch (error) {
      console.error('Error unassigning table:', error);
      toast({
        title: t('portal.admin.tableAssignments.error.title'),
        description: error instanceof Error ? error.message : t('portal.admin.tableAssignments.error.unassignFailed'),
        variant: 'destructive',
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <div>
          <CardTitle className="finit-h2 flex items-center gap-2">
            <Database className="h-5 w-5" />
            {t('portal.admin.tableAssignments.title')}
          </CardTitle>
          <CardDescription>{t('portal.admin.tableAssignments.description')}</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
          </div>
        ) : assignments.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            {t('portal.admin.tableAssignments.noAssignments')}
          </div>
        ) : (
          <div className="space-y-2">
            {assignments.map((assignment) => (
              <div
                key={assignment.id}
                className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Database className="h-4 w-4 text-primary" />
                  <div>
                    <div className="font-medium">{assignment.available_tables.display_name}</div>
                    {assignment.available_tables.description && (
                      <div className="text-sm text-muted-foreground">
                        {assignment.available_tables.description}
                      </div>
                    )}
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleUnassignTable(assignment.table_id)}
                  className="text-destructive hover:text-destructive"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
