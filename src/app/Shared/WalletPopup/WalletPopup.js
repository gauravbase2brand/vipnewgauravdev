import React, { useContext } from "react";
import "../../Shared/Header/Header.css";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowsRotate } from "@fortawesome/free-solid-svg-icons";
import { AppStateContext } from "@/app/contexts/AppStateContext/AppStateContext";
import { MdOutlineAccountBalanceWallet } from "react-icons/md";

const WalletPopup = ({ wBalance, closePopup }) => {
  const { setWalletBalance } = useContext(AppStateContext);
  const handleRefresh = () => {
    setWalletBalance(true);
  };
  return (
    <section className="WalletPopup-dropdown-os">
      <div className="bg-white border-[0.45px] border-[#acacac] rounded-[3px] flex items-center justify-between p-[1rem] mb-[1rem]">
        <h4 className="flex gap-1 items-center">
          <span>
            <MdOutlineAccountBalanceWallet fontSize={20} />
          </span>
          Wallet Balance
        </h4>
        <div className="flex gap-2 items-center">
          <h2>Rs {wBalance}</h2>
          <FontAwesomeIcon
            icon={faArrowsRotate}
            onClick={() => handleRefresh()}
            style={{ cursor: "pointer" }}
          />
        </div>
      </div>
      <div className="flex justify-end">
        <Link href="/wallet">
          <button
            className="border-0 flex items-center gap-[8px] bg-transparent underline"
            onClick={() => closePopup(false)}
            aria-label="add-money"
          >
            <span>
              <svg
                id="fi_15991228"
                height="20"
                viewBox="0 0 100 100"
                width="20"
                xmlns="http://www.w3.org/2000/svg"
                data-name="Layer 4"
              >
                <path d="m18.24 94.81h60.35a8.44 8.44 0 0 0 8.41-8.44v-13a6 6 0 0 0 3.21-5.37v-14.07a6 6 0 0 0 -3.21-5.42v-13a8.44 8.44 0 0 0 -8.44-8.44h-13.39l5.31-20a1.51 1.51 0 0 0 -.26-1.3 1.48 1.48 0 0 0 -1.22-.58l-28.86.06a1.5 1.5 0 0 0 -1.14 2.42l5 6.48-5.07 3.91a25.85 25.85 0 0 0 -7.42 9h-13.27a8.45 8.45 0 0 0 -8.45 8.44v50.87a8.45 8.45 0 0 0 8.45 8.44zm68.97-26.81a2.75 2.75 0 0 1 -2.45 3h-13.12a10 10 0 1 1 0-20h13.12a2.75 2.75 0 0 1 2.45 3zm-46.46-47.56 6.25-4.83a1.47 1.47 0 0 0 .57-1 1.53 1.53 0 0 0 -.3-1.11l-4.05-5.25 23.86-.06-6.08 23.06-4-5.24a1.51 1.51 0 0 0 -2.11-.27l-10.8 8.26a25.87 25.87 0 0 0 -9.57 15.37 23 23 0 0 1 -.71-20.15 1.17 1.17 0 0 1 0-.11 22.87 22.87 0 0 1 6.94-8.67zm-28 15.1a5.45 5.45 0 0 1 5.45-5.44h12a26.29 26.29 0 0 0 -1.2 5.17 25.75 25.75 0 0 0 5.18 19.16l.11.14a1.49 1.49 0 0 0 1.19.59 1.83 1.83 0 0 0 .46-.07 1.51 1.51 0 0 0 1-1.38 22.87 22.87 0 0 1 8.91-17.32l9.62-7.39 5 6.46a1.5 1.5 0 0 0 1.49.56 1.52 1.52 0 0 0 1.13-1.02l1.29-4.86h14.21a5.45 5.45 0 0 1 5.41 5.4v12.46h-12.36a13 13 0 0 0 0 26h12.36v12.37a5.45 5.45 0 0 1 -5.44 5.44h-60.32a5.45 5.45 0 0 1 -5.45-5.44zm58.83 20.1a5.32 5.32 0 1 0 5.36 5.36 5.32 5.32 0 0 0 -5.32-5.36zm0 7.63a2.32 2.32 0 1 1 2.36-2.27 2.32 2.32 0 0 1 -2.32 2.27z"></path>
              </svg>
            </span>
            Withdrawn
          </button>
        </Link>
      </div>
    </section>
  );
};

export default WalletPopup;
