"use client";

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/language-context';
import { createClient } from '@/lib/supabase/client';
import { Database, Users, Save, Loader2 } from 'lucide-react';

interface AvailableTable {
  id: string;
  name: string;
  display_name: string;
  description: string | null;
}

interface PortalUser {
  id: string;
  email: string;
  created_at: string;
  last_sign_in_at: string | null;
  email_confirmed_at: string | null;
  is_admin: boolean;
}

interface TableAssignment {
  user_id: string;
  table_id: string;
}

export function TableUserManager() {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [tables, setTables] = useState<AvailableTable[]>([]);
  const [users, setUsers] = useState<PortalUser[]>([]);
  const [assignments, setAssignments] = useState<TableAssignment[]>([]);
  const [selectedAssignments, setSelectedAssignments] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
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
      const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
      
      if (!supabaseUrl || !anonKey) {
        throw new Error('Supabase configuration missing');
      }

      // Fetch tables
      const tablesResponse = await fetch(`${supabaseUrl}/functions/v1/manage-table-assignments`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${jwtToken}`,
          'apikey': anonKey,
          'Content-Type': 'application/json',
        },
      });

      if (!tablesResponse.ok) {
        throw new Error('Failed to fetch tables');
      }

      const tablesData = await tablesResponse.json();
      setTables(tablesData.tables || []);

      // Fetch users
      const usersResponse = await fetch(`${supabaseUrl}/functions/v1/list-users`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${jwtToken}`,
          'apikey': anonKey,
          'Content-Type': 'application/json',
        },
      });

      if (!usersResponse.ok) {
        throw new Error('Failed to fetch users');
      }

      const usersData = await usersResponse.json();
      setUsers(usersData.users || []);

      // Fetch all assignments
      const assignmentsMap = new Set<string>();
      for (const user of usersData.users || []) {
        const assignmentsResponse = await fetch(`${supabaseUrl}/functions/v1/manage-table-assignments?userId=${user.id}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${jwtToken}`,
            'apikey': anonKey,
            'Content-Type': 'application/json',
          },
        });

        if (assignmentsResponse.ok) {
          const assignmentsData = await assignmentsResponse.json();
          for (const assignment of assignmentsData.assignments || []) {
            assignmentsMap.add(`${user.id}-${assignment.table_id}`);
          }
        }
      }

      setSelectedAssignments(assignmentsMap);
      setAssignments(Array.from(assignmentsMap).map(key => {
        const [userId, tableId] = key.split('-');
        return { user_id: userId, table_id: tableId };
      }));
    } catch (error) {
      console.error('Error fetching data:', error);
      toast({
        title: t('portal.admin.tableManager.error.title'),
        description: error instanceof Error ? error.message : t('portal.admin.tableManager.error.fetchFailed'),
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleAssignment = (userId: string, tableId: string) => {
    const key = `${userId}-${tableId}`;
    const newSelected = new Set(selectedAssignments);
    
    if (newSelected.has(key)) {
      newSelected.delete(key);
    } else {
      newSelected.add(key);
    }
    
    setSelectedAssignments(newSelected);
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      
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
      const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
      
      if (!supabaseUrl || !anonKey) {
        throw new Error('Supabase configuration missing');
      }

      // Get current assignments
      const currentAssignments = new Set<string>();
      for (const user of users) {
        const response = await fetch(`${supabaseUrl}/functions/v1/manage-table-assignments?userId=${user.id}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${jwtToken}`,
            'apikey': anonKey,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          for (const assignment of data.assignments || []) {
            currentAssignments.add(`${user.id}-${assignment.table_id}`);
          }
        }
      }

      // Add new assignments
      for (const key of selectedAssignments) {
        if (!currentAssignments.has(key)) {
          const [userId, tableId] = key.split('-');
          const response = await fetch(`${supabaseUrl}/functions/v1/manage-table-assignments`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${jwtToken}`,
              'apikey': anonKey,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId, tableId }),
          });

          if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Failed to assign table');
          }
        }
      }

      // Remove unselected assignments
      for (const key of currentAssignments) {
        if (!selectedAssignments.has(key)) {
          const [userId, tableId] = key.split('-');
          const response = await fetch(`${supabaseUrl}/functions/v1/manage-table-assignments?userId=${userId}&tableId=${tableId}`, {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${jwtToken}`,
              'apikey': anonKey,
              'Content-Type': 'application/json',
            },
          });

          if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Failed to unassign table');
          }
        }
      }

      toast({
        title: t('portal.admin.tableManager.success.title'),
        description: t('portal.admin.tableManager.success.saved'),
      });
    } catch (error) {
      console.error('Error saving assignments:', error);
      toast({
        title: t('portal.admin.tableManager.error.title'),
        description: error instanceof Error ? error.message : t('portal.admin.tableManager.error.saveFailed'),
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-12">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Save Button */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="finit-h2 flex items-center gap-2">
            <Database className="h-5 w-5" />
            {t('portal.admin.tableManager.title')}
          </h2>
          <p className="text-muted-foreground mt-1">
            {t('portal.admin.tableManager.description')}
          </p>
        </div>
        <Button onClick={handleSave} disabled={isSaving} className="gap-2">
          {isSaving ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              {t('portal.admin.tableManager.saving')}
            </>
          ) : (
            <>
              <Save className="h-4 w-4" />
              {t('portal.admin.tableManager.save')}
            </>
          )}
        </Button>
      </div>

      {/* Tables and Users Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Tables List */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              {t('portal.admin.tableManager.tables')}
            </CardTitle>
            <CardDescription>{t('portal.admin.tableManager.tablesDescription')}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {tables.map((table) => (
                <div
                  key={table.id}
                  className="p-3 border rounded-lg hover:bg-accent/50 transition-colors"
                >
                  <div className="font-medium">{table.display_name}</div>
                  {table.description && (
                    <div className="text-sm text-muted-foreground">{table.description}</div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Users List */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              {t('portal.admin.tableManager.users')}
            </CardTitle>
            <CardDescription>{t('portal.admin.tableManager.usersDescription')}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {users.map((user) => (
                <div
                  key={user.id}
                  className="p-3 border rounded-lg hover:bg-accent/50 transition-colors"
                >
                  <div className="font-medium">{user.email}</div>
                  <div className="text-sm text-muted-foreground">
                    {user.is_admin ? t('portal.admin.users.admin') : t('portal.admin.users.user')}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Assignment Matrix */}
      <Card>
        <CardHeader>
          <CardTitle>{t('portal.admin.tableManager.assignments')}</CardTitle>
          <CardDescription>{t('portal.admin.tableManager.assignmentsDescription')}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="border p-2 text-left">{t('portal.admin.tableManager.user')}</th>
                  {tables.map((table) => (
                    <th key={table.id} className="border p-2 text-center min-w-[120px]">
                      {table.display_name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td className="border p-2 font-medium">{user.email}</td>
                    {tables.map((table) => {
                      const key = `${user.id}-${table.id}`;
                      const isChecked = selectedAssignments.has(key);
                      return (
                        <td key={table.id} className="border p-2 text-center">
                          <Checkbox
                            checked={isChecked}
                            onCheckedChange={() => handleToggleAssignment(user.id, table.id)}
                          />
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
