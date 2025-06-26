import React, { useContext } from "react";
import { AppStateContext } from "../../contexts/AppStateContext/AppStateContext";

export const LoginModal = () => {
  const { viewLogin, setViewLogin } = useContext(AppStateContext);
  return <>{viewLogin ? <></> : null}</>;
};
