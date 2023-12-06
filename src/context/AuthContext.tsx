"use client"
import {useContext, createContext, useState, useEffect, SetStateAction, Dispatch} from 'react';
import {auth} from '@/lib/firebase';
import { signInWithPopup, signOut as signout, onAuthStateChanged, GoogleAuthProvider, User } from 'firebase/auth';
import { useRouter } from 'next/navigation';

interface AuthState {
  user?: User;
}

const AuthContext = createContext({
  state: {} as Partial<AuthState>,
  setState: {} as Dispatch<SetStateAction<Partial<AuthState>>>,
  signinWithGoogle: () => {},
  signOut: () => {}
});

function AuthProvider({children}:{children: React.ReactNode}){
  const [state, setState] = useState<Partial<AuthState>>({});
  const router = useRouter()
  const signinWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).catch((error) => {
      console.log(error);
    });
  }

  const signOut = () => {
    signout(auth).catch((error) => {
      console.log(error);
    })
    router.push('/');
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setState({user});
      } else {
        setState({});
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{state, setState, signinWithGoogle, signOut}}>
      {children}
    </AuthContext.Provider>
  )
}

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
