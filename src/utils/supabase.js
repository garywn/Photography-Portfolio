import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ntphopbtsuqbtbmprcsu.supabase.co/";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im50cGhvcGJ0c3VxYnRibXByY3N1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MDA2ODc5MiwiZXhwIjoyMDk1NjQ0NzkyfQ.Xm_e0AANQeVzywemdFQQimGm8LkxDY7d0pDA0niKw6A";


export const supabase = createClient(supabaseUrl, supabaseAnonKey);
