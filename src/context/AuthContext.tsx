import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { session } from "@/services/session";

interface AuthContextProps {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined
);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null); 
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token); 
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await session(email, password);
      
      if (!response.token) {
        toast.error("Invalid credentials", {
          position: "top-center",
          autoClose: 3000, 
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        return;
      }

      localStorage.setItem("token", response.token);
      setIsAuthenticated(true);
      router.push("/home");
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("An unexpected error occurred. Please try again later.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    router.push("/login");
  };

  if (isAuthenticated === null) {
    return <div>Loading...</div>; // Show a loading state while checking auth status
  }

  return (
    <>
      <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
        {children}
      </AuthContext.Provider>
      <ToastContainer />
    </>
  );
};