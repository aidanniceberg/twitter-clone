import { createContext, useState, ReactNode, useEffect } from 'react';

import { getCookie } from './utils';
import { getAuthContextUser } from './services';
import { AuthContextUser } from './types';

interface AuthContextProps {
    children: ReactNode
}

type AuthContextType = {
    token: string;
    user: AuthContextUser | null;
    isAuthenticated: boolean;
    isLoading: boolean;
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

function AuthContextProvider({ children }: AuthContextProps) {
    const [token, setToken] = useState('');
    const [user, setUser] = useState<AuthContextUser | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        const token = getCookie('token');
        if (token === null) throw new Error("Token not found");
        setToken(token);
        getAuthContextUser(token)
            .then((response) => {
                setUser(response);
                setIsAuthenticated(true);
                setIsLoading(false);
            });
    }, []);

    return (
        <AuthContext.Provider
            value={{
                token,
                user,
                isAuthenticated,
                isLoading
            }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;
