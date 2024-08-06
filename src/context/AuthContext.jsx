import { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

const DEFAULT_TOKEN = 'XyteLRheEQsaR4bcbvsT4Kekc5KcROPwAAAAAQorDR8AAAGRKC5BNuQ1KlcE_6bt';

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken') || DEFAULT_TOKEN);

  const login = (token) => {
    setAccessToken(token);
    localStorage.setItem('accessToken', token);
  };

  const logout = () => {
    setAccessToken(DEFAULT_TOKEN);
    localStorage.removeItem('accessToken');
  };

  return <AuthContext.Provider value={{ accessToken, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
