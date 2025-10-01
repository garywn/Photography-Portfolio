import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://xrgkvchrdpbebujvrxrl.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhyZ2t2Y2hyZHBiZWJ1anZyeHJsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkyNTYwODcsImV4cCI6MjA3NDgzMjA4N30.q3DjNpxqmitQl2Qb-DxTcQ8iTLNYwQBi6Gp626m3orM";


export const supabase = createClient(supabaseUrl, supabaseAnonKey);
