import { useEffect } from "react";
import { createContext, useState, useContext } from "react";
import { registerRequest, loginRequest } from "../api/auth";

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within an AuthProvider");
    return context;
}

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [errors, setErrors] = useState([]);

    const signup = async (user) => {
        try {
            const res = await registerRequest(user);
            console.log(res.data);
            setUser(res.data);
            setIsAuthenticated(true);
        } catch (err) {
            setErrors(err.response.data);
        }
    };

    const signin = async (user) => {
        try {
            const res = await loginRequest(user);
            console.log(res.data)
            setUser(res.data);
            setIsAuthenticated(true);
        } catch (error) {
            if(Array.isArray(error.response.data)){
                setErrors(error.response.data);
            }
            setErrors([error.response.data.message])
        }
    };

    useEffect(() => {
        if (errors.lenth > 0) {
            const timer = setTimeout(() => {
                setErrors([]);
            }, 5000)
            return () => clearTimeout(timer)
        }
    }, [errors])

    return (
        <AuthContext.Provider
            value={{
                user,
                signup,
                signin,
                isAuthenticated,
                errors,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
