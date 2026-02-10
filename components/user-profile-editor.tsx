"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { createClient } from '@/lib/supabase/client';
import { Loader2, Save, Edit2, Plus } from 'lucide-react';
import { useAuth } from '@/contexts/auth-context';

interface UserProfile {
  id: string;
  account_id: string | null;
  display_name: string | null;
  notes: string | null;
  updated_at: string | null;
  updated_by: string | null;
}

interface UserProfileEditorProps {
  userId: string;
  onSuccess?: () => void;
}

export function UserProfileEditor({ userId, onSuccess }: UserProfileEditorProps) {
  const { toast } = useToast();
  const { user: currentUser, isAdmin } = useAuth();
  const supabase = createClient();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [existingAccountIds, setExistingAccountIds] = useState<string[]>([]);
  const [isLoadingAccountIds, setIsLoadingAccountIds] = useState(false);
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [formData, setFormData] = useState({
    account_id: '',
    display_name: '',
    notes: '',
  });

  useEffect(() => {
    if (isAdmin && userId) {
      fetchProfile();
      fetchExistingAccountIds();
    }
  }, [userId, isAdmin]);

  const fetchExistingAccountIds = async () => {
    try {
      setIsLoadingAccountIds(true);
      const { data, error } = await supabase
        .from('user_profiles')
        .select('account_id')
        .not('account_id', 'is', null)
        .order('account_id', { ascending: true });

      if (error) {
        console.error('Error fetching account IDs:', error);
        return;
      }

      const accountIds = (data || [])
        .map((p) => p.account_id)
        .filter((id): id is string => id !== null);
      setExistingAccountIds(accountIds);
    } catch (error) {
      console.error('Error fetching account IDs:', error);
    } finally {
      setIsLoadingAccountIds(false);
    }
  };

  const fetchProfile = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
        throw error;
      }

      if (data) {
        setProfile(data);
        setFormData({
          account_id: data.account_id || '',
          display_name: data.display_name || '',
          notes: data.notes || '',
        });
      } else {
        // Profile doesn't exist yet, initialize empty
        setProfile({
          id: userId,
          account_id: null,
          display_name: null,
          notes: null,
          updated_at: null,
          updated_by: null,
        });
        setFormData({
          account_id: '',
          display_name: '',
          notes: '',
        });
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      toast({
        title: 'Error',
        description: 'Failed to load user profile',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (!currentUser?.id) {
      toast({
        title: 'Error',
        description: 'No current user found',
        variant: 'destructive',
      });
      return;
    }

    try {
      setIsSaving(true);

      // Check if account_id is unique (if provided)
      if (formData.account_id) {
        const { data: existing } = await supabase
          .from('user_profiles')
          .select('id')
          .eq('account_id', formData.account_id)
          .neq('id', userId)
          .single();

        if (existing) {
          toast({
            title: 'Error',
            description: 'Account ID already exists. Please use a unique ID.',
            variant: 'destructive',
          });
          setIsSaving(false);
          return;
        }
      }

      const profileData = {
        id: userId,
        account_id: formData.account_id || null,
        display_name: formData.display_name || null,
        notes: formData.notes || null,
        updated_by: currentUser.id,
      };

      const { error } = await supabase
        .from('user_profiles')
        .upsert(profileData, { onConflict: 'id' });

      if (error) {
        throw error;
      }

      toast({
        title: 'Success',
        description: 'User profile updated successfully',
      });

      setIsEditing(false);
      setShowCustomInput(false);
      await fetchProfile();
      await fetchExistingAccountIds(); // Refresh the list
      onSuccess?.();
    } catch (error) {
      console.error('Error saving profile:', error);
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to save user profile',
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (!isAdmin) {
    return null;
  }

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Account ID & Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Account ID & Profile</CardTitle>
            <CardDescription>Assign and manage account identifier and profile information</CardDescription>
          </div>
          {!isEditing && (
            <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
              <Edit2 className="h-4 w-4 mr-2" />
              Edit
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {isEditing ? (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="account_id">Account ID *</Label>
              {showCustomInput ? (
                <div className="flex gap-2">
                  <Input
                    id="account_id"
                    placeholder="e.g., EMP001, CUST123"
                    value={formData.account_id}
                    onChange={(e) => setFormData({ ...formData, account_id: e.target.value })}
                    maxLength={50}
                    className="flex-1"
                  />
                  <Button
                    variant="outline"
                    onClick={() => {
                      setShowCustomInput(false);
                      setFormData({ ...formData, account_id: '' });
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <Select
                    value={formData.account_id || ''}
                    onValueChange={(value) => {
                      if (value === '__new__') {
                        setShowCustomInput(true);
                        setFormData({ ...formData, account_id: '' });
                      } else {
                        setFormData({ ...formData, account_id: value });
                      }
                    }}
                  >
                    <SelectTrigger className="flex-1">
                      <SelectValue placeholder="Select or create account ID" />
                    </SelectTrigger>
                    <SelectContent>
                      {isLoadingAccountIds ? (
                        <div className="flex items-center justify-center py-4">
                          <Loader2 className="h-4 w-4 animate-spin" />
                        </div>
                      ) : (
                        <>
                          {existingAccountIds.length > 0 ? (
                            existingAccountIds.map((id) => (
                              <SelectItem key={id} value={id}>
                                {id}
                              </SelectItem>
                            ))
                          ) : (
                            <SelectItem value="__empty__" disabled>
                              No account IDs available
                            </SelectItem>
                          )}
                          <SelectItem value="__new__" className="text-primary font-medium">
                            <div className="flex items-center gap-2">
                              <Plus className="h-4 w-4" />
                              Create new account ID
                            </div>
                          </SelectItem>
                        </>
                      )}
                    </SelectContent>
                  </Select>
                </div>
              )}
              <p className="text-xs text-muted-foreground">
                {showCustomInput
                  ? 'Enter a new unique identifier for this account (required, must be unique)'
                  : 'Select an existing account ID or create a new one (required, must be unique)'}
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="display_name">Display Name</Label>
              <Input
                id="display_name"
                placeholder="e.g., John Doe"
                value={formData.display_name}
                onChange={(e) => setFormData({ ...formData, display_name: e.target.value })}
                maxLength={100}
              />
              <p className="text-xs text-muted-foreground">
                Optional display name for this user
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                placeholder="Admin notes about this user..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                rows={4}
                maxLength={1000}
              />
              <p className="text-xs text-muted-foreground">
                Internal notes (only visible to admins)
              </p>
            </div>

            <div className="flex gap-2">
              <Button onClick={handleSave} disabled={isSaving || !formData.account_id.trim()}>
                {isSaving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save
                  </>
                )}
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setIsEditing(false);
                  setShowCustomInput(false);
                  // Reset form data
                  if (profile) {
                    setFormData({
                      account_id: profile.account_id || '',
                      display_name: profile.display_name || '',
                      notes: profile.notes || '',
                    });
                  }
                }}
                disabled={isSaving}
              >
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <Label className="text-sm text-muted-foreground">Account ID</Label>
              <p className="text-lg font-semibold mt-1">
                {profile?.account_id || <span className="text-muted-foreground italic">Not assigned</span>}
              </p>
            </div>

            {profile?.display_name && (
              <div>
                <Label className="text-sm text-muted-foreground">Display Name</Label>
                <p className="text-lg mt-1">{profile.display_name}</p>
              </div>
            )}

            {profile?.notes && (
              <div>
                <Label className="text-sm text-muted-foreground">Notes</Label>
                <p className="text-sm mt-1 whitespace-pre-wrap">{profile.notes}</p>
              </div>
            )}

            {profile?.updated_at && (
              <div>
                <Label className="text-sm text-muted-foreground">Last Updated</Label>
                <p className="text-sm mt-1">
                  {new Date(profile.updated_at).toLocaleString()}
                </p>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
