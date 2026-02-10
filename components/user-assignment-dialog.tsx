"use client";

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { createClient } from '@/lib/supabase/client';
import { Loader2, User } from 'lucide-react';
import { useAuth } from '@/contexts/auth-context';

interface PortalUser {
  id: string;
  email: string;
  created_at: string;
  last_sign_in_at: string | null;
  is_admin: boolean;
}

interface UserAssignmentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  recordIds: string[];
  tableName: string;
  onSuccess?: () => void;
}

export function UserAssignmentDialog({
  open,
  onOpenChange,
  recordIds,
  tableName,
  onSuccess,
}: UserAssignmentDialogProps) {
  const { toast } = useToast();
  const { user: currentUser, isAdmin } = useAuth();
  const supabase = createClient();
  const [users, setUsers] = useState<PortalUser[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);

  useEffect(() => {
    if (open && isAdmin) {
      fetchUsers();
    }
  }, [open, isAdmin]);

  const fetchUsers = async () => {
    try {
      setIsLoadingUsers(true);
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        throw new Error('No session found');
      }

      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const response = await fetch(`${supabaseUrl}/functions/v1/list-users`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }

      const data = await response.json();
      setUsers(data.users || []);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch users',
        variant: 'destructive',
      });
    } finally {
      setIsLoadingUsers(false);
    }
  };

  const handleAssign = async () => {
    if (!selectedUserId) {
      toast({
        title: 'Error',
        description: 'Please select a user',
        variant: 'destructive',
      });
      return;
    }

    if (!currentUser?.id) {
      toast({
        title: 'Error',
        description: 'No current user found',
        variant: 'destructive',
      });
      return;
    }

    try {
      setIsLoading(true);

      // Determine the primary key column name
      const primaryKey = tableName === 'email_thread_edits' ? 'thread_id' : 'id';

      // Convert recordIds to appropriate types (thread_id is string, id might be number)
      const convertedIds = recordIds.map((id) => {
        if (primaryKey === 'id') {
          const numId = Number(id);
          return isNaN(numId) ? id : numId;
        }
        return id;
      });

      // Update records
      const { error } = await supabase
        .from(tableName)
        .update({
          user_id: selectedUserId === 'unassign' ? null : selectedUserId,
          assigned_by: selectedUserId === 'unassign' ? null : currentUser.id,
          assigned_at: selectedUserId === 'unassign' ? null : new Date().toISOString(),
        })
        .in(primaryKey, convertedIds);

      if (error) {
        throw error;
      }

      toast({
        title: 'Success',
        description: `Assigned ${recordIds.length} record(s) successfully`,
      });

      onOpenChange(false);
      setSelectedUserId('');
      onSuccess?.();
    } catch (error) {
      console.error('Error assigning records:', error);
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to assign records',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!isAdmin) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Assign Records to User</DialogTitle>
          <DialogDescription>
            Assign {recordIds.length} record(s) to a user. This will update the user_id field.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Select User</label>
            {isLoadingUsers ? (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                Loading users...
              </div>
            ) : (
              <Select value={selectedUserId} onValueChange={setSelectedUserId}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a user or unassign" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="unassign">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      <span>Unassign (Remove assignment)</span>
                    </div>
                  </SelectItem>
                  {users.map((user) => (
                    <SelectItem key={user.id} value={user.id}>
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        <span>{user.email}</span>
                        {user.is_admin && (
                          <span className="text-xs text-muted-foreground">(Admin)</span>
                        )}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>

          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => {
                onOpenChange(false);
                setSelectedUserId('');
              }}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button onClick={handleAssign} disabled={isLoading || !selectedUserId}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Assigning...
                </>
              ) : (
                'Assign'
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
