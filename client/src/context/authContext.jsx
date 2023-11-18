import { useEffect } from "react";
import { createContext, useState, useContext } from "react";
import Cookies from "js-cookie";
import {
    registerRequest,
    loginRequest,
    verifyTokenRequest
} from "../api/auth";

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
    const [loading, setLoading] = useState(true);

    const signup = async (user, file) => {
        try {


            const formData = new FormData();

            formData.append('username', user.username);
            formData.append('email', user.email);
            formData.append('password', user.password);
            formData.append('imageFile', file);

            const res = await registerRequest(formData);

            if (res.status === 200) {
                setUser(res.data.User);
                setIsAuthenticated(false);
            }
        } catch (error) {
 
            setErrors([error.response.data.message]);
        }
    };



    const signin = async (user) => {
        try {
            const res = await loginRequest(user);

 

            setUser(res.data.User);
            setIsAuthenticated(true);

        } catch (error) {
 
            setErrors([error.response.data.message]);
        }
    };

    const logout = () => {
        Cookies.remove("token");
        setUser(null);
        setIsAuthenticated(false);
    };

    useEffect(() => {
        if (errors.length > 0) {
            const timer = setTimeout(() => {
                setErrors([]);
            }, 5000)
            return () => clearTimeout(timer)
        }
    }, [errors])


    useEffect(() => {
        const checkLogin = async () => {

            /* cookies.token = jwt */
            const cookies = Cookies.get();

            if (!cookies.token) {
                setIsAuthenticated(false);
                setLoading(false);
                return;
            }

            try {

                const res = await verifyTokenRequest(cookies.token);
 
 

                if (!res.data) return setIsAuthenticated(false);

                setIsAuthenticated(true);
                setUser(res.data);
                setLoading(false);

            } catch (error) {
                setIsAuthenticated(false);
                setLoading(false);
            }
        };
        checkLogin();
    }, []);


    return (
        <AuthContext.Provider
            value={{
                user,
                signup,
                signin,
                logout,
                loading,
                isAuthenticated,
                errors,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
