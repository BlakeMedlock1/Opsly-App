import { supabase } from "@/lib/supabase";


export const getCurrentUser = () => {
  const user = supabase.auth.user();
  return user ?? null;
};

export const getCurrentUserId = async (): Promise<string | null> => {
  const user = await getCurrentUser();
  return user?.id ?? null;
};
