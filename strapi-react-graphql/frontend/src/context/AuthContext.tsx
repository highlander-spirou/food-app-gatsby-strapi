import { ReactNode, createContext, useContext, useState } from "react";

type User = {
  id: number;
  username: string;
  email: string;
  provider?: string;
  confirmed?: boolean;
  blocked?: boolean;
  createdAt?: string;
  updatedAt?: string;
};

type AuthActions = {
    getUser: () => User | null;
  addAuthenticatedUser: (user: User) => void;
  removeAuthenticatedUser: () => void;
};

const AuthContext = createContext({} as AuthActions);

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setUser] = useState<User | null>();

  function addAuthenticatedUser(user: User) {
    localStorage.setItem("user", JSON.stringify(user));
  }

  function removeAuthenticatedUser() {
    localStorage.removeItem("user");
  }

  const getUser = (): User | null => {
    const userInStorage = localStorage.getItem("user");
    if (userInStorage !== null) {
      setUser(JSON.parse(userInStorage));
      return currentUser as User;
    }
    return null;
  };

  return (
    <AuthContext.Provider
      value={{
        getUser,
        addAuthenticatedUser,
        removeAuthenticatedUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
