// AuthContext.js
import { useState, createContext, useContext, useEffect } from "react";
import PropTypes from "prop-types";

// Create a context for auth
const AuthContext = createContext(null);

// Create a provider component
export const AuthProvider = ({ children }) => {
  const initialUser = JSON.parse(localStorage.getItem("currentUser")) || null;
  const initialUserType = JSON.parse(localStorage.getItem("userType")) || null;

  const [currentUser, setCurrentUser] = useState(initialUser);
  const [userType, setUserType] = useState(initialUserType); // Añade esto

  // Simulate a login function
  const login = async (email, password, type) => {
    
    await fetch("http://localhost:3000/api/" + type +  "s/login", {
      method: "POST",
      mode: "cors",
      body: JSON.stringify({ email: email, password: password }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setCurrentUser(data);
        setUserType(type);
      });
  };

  // Simulate a logout function
  const logout = () => {
    setCurrentUser(null);
    setUserType(null); // Restablece el tipo de usuario aquí
  };

  // Check if user is logged in when the provider mounts
  useEffect(() => {
    const user = localStorage.getItem("currentUser");
    const type = localStorage.getItem("userType");
    if (user && type) {
      setCurrentUser(JSON.parse(user));
      setUserType(JSON.parse(type));
    } else {
      // logout()
    }
  }, []);

  // Store the user in localStorage when it changes
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
      localStorage.setItem("userType", JSON.stringify(userType));
    } else {
      localStorage.removeItem("currentUser");
      localStorage.removeItem("userType");
      // logout()
    }
  }, [currentUser, userType]);

  // The context value that will be supplied to any descendants of this component.
  const value = {
    currentUser,
    userType,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Create a custom hook to use the auth context
export const useAuth = () => {
  return useContext(AuthContext);
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired, // children debe ser un nodo React
};
