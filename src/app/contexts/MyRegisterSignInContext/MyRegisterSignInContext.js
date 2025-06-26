"use client";
import React, { createContext, useState } from "react";
export const MyRegisterSignInContext = createContext();

const MyRegisterSignInContextProvider = ({ children }) => {
  const [activeRegisterForm, setActiveRegisterForm] = useState(false);
  const [activeSignInWithPassword, setActiveSignInWithPassword] =
    useState(false);
  const [activeSignInWithOtp, setActiveSignInWithOtp] = useState(false);

  return (
    <MyRegisterSignInContext.Provider
      value={{
        activeRegisterForm,
        setActiveRegisterForm,
        activeSignInWithPassword,
        setActiveSignInWithPassword,
        activeSignInWithOtp,
        setActiveSignInWithOtp,
      }}
    >
      {children}
    </MyRegisterSignInContext.Provider>
  );
};

export default MyRegisterSignInContextProvider;
