import jwtDecode from "jwt-decode";
import React, { createContext, useState, useEffect, useCallback } from "react";

import { TOKEN } from "../Config/LocStorage";
import moment from "moment";

interface authProvider {
  children: React.ReactNode;
}

interface token {
  user: string;
  username: string;
  exp: number;
}

interface authContextTypes {
  loginHandler: (token: string) => void;
  logoutHandler: (token: string) => void;
  username: string | null;
  user: string | null;
  loggedIn: boolean;
}

export const AuthContext = createContext<authContextTypes>({
  loginHandler: () => {},
  logoutHandler: () => {},
  loggedIn: false,
  username: "",
  user: "",
});

let TIMER_ID: NodeJS.Timer;

export const AuthProvider = ({ children }: authProvider) => {
  const [decodedToken, setDecodedToken] = useState<null | token>(null);
  const [loggedIn, setLoggedIn] = useState(false);

  const tokenExpHandler = (tokenData: token) => {
    const now = moment();

    const tokenExpTime = moment.unix(tokenData.exp);

    const isTokenExpired = tokenExpTime.isBefore(now);

    return isTokenExpired;
  };

  const logoutTimer = useCallback((decodedToken: token) => {
    const checkingTime = 3000; //milliseconds

    const handler = () => {
      const isTokenExpired = tokenExpHandler(decodedToken);
      
      if (isTokenExpired) {
        logoutHandler();
        clearInterval(TIMER_ID);
      }
    };

    clearInterval(TIMER_ID);

    TIMER_ID = setInterval(() => {
      handler();
    }, checkingTime);
  }, []);

  const loginHandler = useCallback(
    (token: string) => {
      if (token) {
        const decodedToken: token = jwtDecode(token);

        localStorage.setItem(TOKEN, token);

        setDecodedToken(decodedToken);
        setLoggedIn(true);
        logoutTimer(decodedToken);
      }
    },
    [logoutTimer]
  );

  useEffect(() => {
    const token = localStorage.getItem(TOKEN);

    if (token) {
      loginHandler(token);
    }
  }, [loginHandler]);

  const logoutHandler = () => {
    localStorage.removeItem(TOKEN);
    setLoggedIn(false);
    setDecodedToken(null);
  };

  const contextValue = {
    loginHandler: loginHandler,
    logoutHandler: logoutHandler,
    loggedIn: loggedIn,
    username: decodedToken ? decodedToken.username : decodedToken,
    user: decodedToken ? decodedToken.user : decodedToken,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
