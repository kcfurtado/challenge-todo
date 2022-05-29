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
export const LOCALSTORAGE = 'key';

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

    function responseHandler(response:any) {
        switch (response.status) {
            case 'SUCCESS':
                localStorage.setItem(LOCALSTORAGE, JSON.stringify(response.data))
                setUser(response.data)
                setLoading(true)
                break;
            case 'ERROR':
                setErrors(response.error)
                setLoading(false)
                break;
            case 'UNAUTHORIZED':
                setErrors(['Email or password incorrect!'])
                setLoading(false)
                break;
            case 'NOT_FOUND':
                setErrors(['Account not found!'])
                setLoading(false)
                break;
            default:
                setErrors(response.error)
                setLoading(false)
        }
    }

    async function signIn(email: string, password: string) {
        setLoading(true)

        if (email==='' || password === '') {
            setErrors(['Please, fill all fields correctly!'])
            return
        }

        const response = await fetchJson<IUser>({ url: 'auth', method: 'POST', data: { email, password } })

        responseHandler(response)
    }

    async function signUp(name: string, email: string, password: string) {
        setLoading(true)
        
        if (name ==='' || email==='' || password === '') {
            setErrors(['Please, fill all fields correctly!'])
            return
        }

        const response = await fetchJson<IUser>({ url: 'users', method: 'POST', data: { name, email, password } })

        responseHandler(response)
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