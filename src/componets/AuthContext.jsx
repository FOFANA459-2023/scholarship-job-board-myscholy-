import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../componets/supabaseClient';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null); // 'admin' or 'student'
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check active sessions and sets the user
    const checkUser = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        
        if (user) {
          // Check if user is admin
          const { data: adminData } = await supabase
            .from('admin-user')
            .select('*')
            .eq('id', user.id)
            .single();

          if (adminData) {
            setUserRole('admin');
          } else {
            // Check if user is student
            const { data: studentData } = await supabase
              .from('student-user')
              .select('*')
              .eq('id', user.id)
              .single();

            if (studentData) {
              setUserRole('student');
            }
          }
          
          setUser(user);
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Error checking user:', error);
        setLoading(false);
      }
    };

    checkUser();

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        setUser(session.user);
        // Recheck role when auth state changes
        const { data: adminData } = await supabase
          .from('admin-user')
          .select('*')
          .eq('id', session.user.id)
          .single();

        if (adminData) {
          setUserRole('admin');
        } else {
          const { data: studentData } = await supabase
            .from('student-user')
            .select('*')
            .eq('id', session.user.id)
            .single();

          if (studentData) {
            setUserRole('student');
          }
        }
      } else {
        setUser(null);
        setUserRole(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, userRole, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};