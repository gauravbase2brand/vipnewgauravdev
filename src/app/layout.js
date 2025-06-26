import "./globals.css";
import AppStateContextProvider from "./contexts/AppStateContext/AppStateContext";
import MyRegisterSignInContextProvider from "./contexts/MyRegisterSignInContext/MyRegisterSignInContext";
import Index from "./index";
import "react-notifications/lib/notifications.css";
import ClientSideNotificationContainer from "./Shared/ClientSideNotificationContainer/ClientSideNotificationContainer";
import Notification from "./FooterNotification/Notification";
import Scripts from "./Scripts";
import { ResponsiveFooter, ResponsiveHeader } from "./ResponsiveModule";
import MetaHead from "./HeadSection/MetaHead";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ChatBot from "./chat/ChatBot";

export default function RootLayout({ children }) {
  return (
    <html lang="en" prefix="og: https://ogp.me/ns#">
      <MetaHead />
      <body>
        <noscript>
          <video
            src="https://www.googletagmanager.com/ns.html?id=GTM-N3Q92W6R"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></video>
        </noscript>
        <AppStateContextProvider>
          <MyRegisterSignInContextProvider>
            <ToastContainer />
            <Index>
              {/* <PageLoader /> */}
              <ResponsiveHeader />
              {children}
              {/* <SpeedInsights /> */}
              <ResponsiveFooter />
            </Index>
            <Notification />
            {/* <VipVideoPlayer /> */}
          </MyRegisterSignInContextProvider>
        </AppStateContextProvider>
        <Scripts />
        <div className="chatbot">
          <ChatBot />
        </div>
      </body>
    </html>
  );
}
