import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export function UserProvider({ children }) {

    const [user, setUser] = useState(null);
    const [roles, setRoles] = useState(null);
    const [token, setToken] = useState(null);

    useEffect(() => {
        const storedToken = localStorage.getItem("token")
        const storedUser = localStorage.getItem("user")

        if (storedToken && storedUser) {
            setToken(storedToken)
            setUser(JSON.parse(storedUser))
        }
    }, [])

    const login = (res) => {

        const user = res.data.user;
        const roles = res.data.roles;
        const token = res.data.token;

        localStorage.setItem("token", token)
        localStorage.setItem("user", JSON.stringify(user))
        localStorage.setItem("roles", JSON.stringify(roles))

        setUser(user)
        setUser(roles)
        setToken(token)
    };

    const logout = () => {
        setUser(null);
        setToken(null);
    };

    return (
        <UserContext.Provider
            value={{
                user,
                token,
                login,
                logout
            }}
        >
            {children}
        </UserContext.Provider>
    );
}