"use client";
import { useContext} from "react";
import "./index.css";
import Register from "./Shared/Register/Register";
import { MyRegisterSignInContext } from "./contexts/MyRegisterSignInContext/MyRegisterSignInContext";
import { AppStateContext } from "./contexts/AppStateContext/AppStateContext";
import SignInWithPassword from "./Shared/SignInWithPassword/SignInWithPassword";
import SignInWithOtp from "./Shared/SignInWithOtp/SignInWithOtp";
import NumerologyPopup from "./numerology/NumerologyPopup";
import DiscountPop from "./Discount/DiscountPop";

export default function Index({ children }) {
  const { activeRegisterForm, activeSignInWithPassword, activeSignInWithOtp } =
    useContext(MyRegisterSignInContext);
  const { numerologyPop, discountPop } = useContext(AppStateContext);

  return (
    <>
      <div className="page-os">
        {activeRegisterForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <Register />
          </div>
        )}
        {activeSignInWithPassword && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <SignInWithPassword />
          </div>
        )}
        {activeSignInWithOtp && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <SignInWithOtp />
          </div>
        )}
        {numerologyPop && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <NumerologyPopup />
          </div>
        )}
        {discountPop && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <DiscountPop />
          </div>
        )}
        {children}
      </div>
    </>
  );
}
