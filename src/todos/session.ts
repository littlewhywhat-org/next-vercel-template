import { createClient } from '@/lib/supabase/client';

export async function ensureAnonymousSession() {
  const supabase = createClient();
  const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
  if (sessionError) {
    throw sessionError;
  }
  if (sessionData.session) {
    return sessionData.session;
  }
  const { data, error } = await supabase.auth.signInAnonymously();
  if (error) {
    throw error;
  }
  if (!data.session) {
    throw new Error('Anonymous sign-in returned no session');
  }
  return data.session;
}
