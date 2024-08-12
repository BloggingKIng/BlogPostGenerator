import { useContext, createContext } from "react";

const LoginContext = createContext();

export default function LoginContextProvider({ children }) {
    const [isLogin, setIsLogin] = useState(false);
    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);

    return (
        <LoginContext.Provider value=
            {{ 
                isLogin, setIsLogin, token, setToken, user, setUser
             }}
        >
            {children}
        </LoginContext.Provider>
    );
}

export const useLogin = () => useContext(LoginContext);