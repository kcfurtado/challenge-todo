import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { fetchJson } from './api';

export interface IUser {
    name: string;
    token: string;
}

interface IAuthContext {
    loading: boolean;
    errors: string[] | null;
    user: IUser | null;
    signIn(email: string, password: string): Promise<void>;
    signUp(name: string, email: string, password: string): Promise<void>;
    signOut(): Promise<void>;
}

type ILogin = {
    email: string;
    password: string;
}

interface IAuthProvider {
    children: ReactNode
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext);
const LOCALSTORAGE = 'key';

export const AuthProvider = ({ children }: IAuthProvider) => {
    const [user, setUser] = useState<IUser | null>(null);
    const [errors, setErrors] = useState<string[] | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        let userData: any = localStorage.getItem(LOCALSTORAGE)

        if (userData) {
            userData = JSON.parse(userData) as IUser
            setUser(userData)
        }

    }, [])


    async function signIn(email: string, password: string) {
        const response = await fetchJson<IUser>({ url: 'auth', method: 'POST', data: { email, password } })

        if (response.status === 'SUCCESS') {
            localStorage.setItem(LOCALSTORAGE, JSON.stringify(response.data))
            setUser(response.data)
        } else {
            setErrors(response.error)
        }
    }

    async function signUp(name: string, email: string, password: string) {
        const response = await fetchJson<IUser>({ url: 'users', method: 'POST', data: { name, email, password } })

        if (response.status === 'SUCCESS') {
            localStorage.setItem(LOCALSTORAGE, JSON.stringify(response.data))
            setUser(response.data)
        } else {
            setErrors(response.error)
        }
    }

    const signOut = async () => {
        localStorage.clear()
        setUser(null)
    }

    return (
        <AuthContext.Provider
            value={{
                loading, errors, signIn, signOut, signUp, user
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    return useContext(AuthContext);
}