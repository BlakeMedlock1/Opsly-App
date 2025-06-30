import { supabase } from '@/lib/supabase';
import { router } from 'expo-router';
import { useState } from 'react';
import { useAuth } from './authContext';

type Role = 'manager' | 'employee' | 'admin';

export function useAuthViewModel() {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { setRole, setIsAuthenticated } = useAuth();
  
  const handleAuth = async () => {
    setLoading(true);
    setError('');
    try {
      if (mode === 'signup') {
        const { user , error: signUpError } = await supabase.auth.signUp({
          email,
          password
        });
        if (signUpError) throw signUpError;
        if (user){
          const userId = user.id;
          const { error: profileError } = await supabase
          .from('user_profiles')
          .insert([{ id: userId, role: "employee", email: email }]);
        };
      } else {
        const { user, error: signInError } = await supabase.auth.signIn({
          email,
          password,
        });
        if (signInError) throw signInError;
        if (!user) throw new Error('No user returned from Supabase');
        setIsAuthenticated(true);
        const role = await getUserRole(user.id);
        setRole(role);
        if (role === 'employee') router.replace('/employee/employeeHome');
        else if (role === 'manager') router.replace('/manager/home');
        else if (role === 'admin') router.replace('/admin/adminHome');
        else throw new Error('Unknown role');
      }
    } catch (err: any) {
      setError(err.message || 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  const getUserRole = async (userId: string): Promise<Role> => {
    const { data, error } = await supabase
      .from('user_profiles')
      .select('role')
      .eq('id', userId)
      .single();

    if (error) throw error;
    return data.role as Role;
  };

  return {
    mode,
    setMode,
    email,
    setEmail,
    password,
    setPassword,
    loading,
    error,
    handleAuth,
  };
}
