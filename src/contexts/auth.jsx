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
    try {
      const response = await fetch(`http://localhost:3000/api/${type}s/login`, {
        method: "POST",
        mode: "cors",
        body: JSON.stringify({ email: email, password: password }),
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      const data = await response.json();
  
      // Asegúrate de que el inicio de sesión fue exitoso antes de actualizar el estado
      if (response.ok) {
        setCurrentUser(data);
        setUserType(type);
      } else {
        // Manejo de errores o inicio de sesión fallido
        console.error(data.message);
        // Aquí podrías establecer algún estado para mostrar un mensaje de error en la UI
      }
    } catch (error) {
      console.error("Error al intentar iniciar sesión:", error);
    }
  };
  
  // Simulate a signup function
const signup = async (body, type) => {
  try {
    const response = await fetch(`http://localhost:3000/api/${type}s/signup`, {
      method: "POST",
      mode: "cors",
      body: JSON.stringify(body),
      headers: {
        "Content-type": "application/json",
      },
    });

    const data = await response.json();

    // Asegúrate de que el registro fue exitoso antes de actualizar el estado
    if (response.ok) {
      setCurrentUser(data);
      setUserType(type);
    } else {
      // Manejo de errores o registro fallido
      console.error(data.message);
      // Aquí podrías establecer algún estado para mostrar un mensaje de error en la UI
    }
  } catch (error) {
    console.error("Error al intentar registrar:", error);
  }
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
    signup,
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
