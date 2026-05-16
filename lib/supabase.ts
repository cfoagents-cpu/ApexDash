import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export interface BusinessProfile {
  id: string;
  user_id: string;
  name: string;
  industry: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zip: string;
}
