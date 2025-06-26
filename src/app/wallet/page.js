"use client";
import React, { useState, useEffect, useContext } from "react";
import "./Wallet.css";
import "../place-order/OrderPlacementTabs/OrderPlacementTabs.css";
import { WithDrawMoney } from "../Services/Wallat";
import { AppStateContext } from "../contexts/AppStateContext/AppStateContext";
import { getProfile } from "../Services/Services";
import { toast } from "react-toastify";
// import { ResponsiveFooter } from "../ResponsiveModule";
import WalletPage from "./WalletPage";

const Wallet = () => {
  const {
    user = {},
    userProfile,
    tab,
    setWalletBalance,
    setUserProfile,
  } = useContext(AppStateContext);
  const tabChange = localStorage.getItem("wallet");
  const [walletActive, setWalletActive] = useState(tabChange || tab);
  const [amountTowithDraw, setAmountTowithDraw] = useState(0);
  const [selectedPaymentType, setSelectedPaymentType] = useState();
  const [nameOnCard, setNameOnCard] = useState();
  const [account, setAccount] = useState();
  const [bankname, setbankname] = useState();
  const [ifsc, setIfsc] = useState();
  const [upi, setUpi] = useState();
  const [wBalance, setWBalance] = useState(0);
  const [nwBalance, setNwBalance] = useState(0);
  const [priceWarning, setPriceWarning] = useState(false);
  const [validationSubmit, setValidationSubmit] = useState(false);
  const [upiError, setUpiError] = useState(true);
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState("");
  const [show, setShow] = useState(false);
  const [failedNumbers, setFailedNumbers] = useState([]);
  const [loadApi, setLoadApi] = useState(false);
  const [rechargeBtn, setRechargeBtn] = useState(false);
  const [error, setError] = useState({
    cardName: "",
    bankName: "",
    accountNumber: "",
    ifscCode: "",
  });
  const [formData, setFormData] = useState({
    cf_2163: "",
    cf_2167: "",
  });
  // Bank details inputs show
  const [activeBankDetails, setActiveBankDetails] = useState(false);
  const [activeUpiPopup, setActiveUpiPopup] = useState(false);
  const [withdrawal, setWithdrawal] = useState({
    airtel: "",
    paytm: "",
    phonePay: "",
    bhim: "",
    googlePay: "",
    cardName: "",
    bankName: "",
    accountNumber: "",
    ifscCode: "",
    description: "",
  });

  const showModal = () => {
    setShow(true);
  };

  const hideModal = () => {
    setShow(false);
    window.location.reload();
  };

  useEffect(() => {
    setWalletActive(tab || "wallet-tab-2");
  }, [tab]);

  useEffect(() => {
    setWithdrawal({
      ...withdrawal,
      airtel: userProfile?.contact_cf?.airtel_number || "",
      paytm: userProfile?.contact_cf?.paytm_number || "",
      phonePay: userProfile?.contact_cf?.phone_pe_number || "",
      bhim: userProfile?.contact_cf?.upi_id || "",
      googlePay: userProfile?.contact_cf?.g_pay_number || "",
      cardName: userProfile?.contact_cf?.bank_account_name || "",
      bankName: userProfile?.contact_cf?.bank_name || "",
      accountNumber: userProfile?.contact_cf?.bank_account_number || "",
      ifscCode: userProfile?.contact_cf?.bank_ifsc_code || "",
    });
  }, [userProfile]);

  useEffect(() => {
    const isBankDetailsFilled =
      withdrawal.cardName.trim().length > 0 ||
      withdrawal.bankName.trim().length > 0 ||
      withdrawal.accountNumber.trim().length > 0 ||
      withdrawal.ifscCode.trim().length > 0;

    const isOtherDetailsFilled =
      withdrawal.airtel.trim().length > 0 ||
      withdrawal.paytm.trim().length > 0 ||
      withdrawal.phonePay.trim().length > 0 ||
      withdrawal.bhim.trim().length > 0 ||
      withdrawal.googlePay.trim().length > 0 ||
      withdrawal.description.trim().length > 0;

    // Check if all fields are empty
    const areAllFieldsEmpty = !isBankDetailsFilled && !isOtherDetailsFilled;

    if (areAllFieldsEmpty) {
      // If all bank fields are empty, disable submit and show error message
      setValidationSubmit(false);
    } else {
      setValidationSubmit(true);
      setError({
        cardName: "",
        bankName: "",
        accountNumber: "",
        ifscCode: "",
      });
    }
  }, [withdrawal]);

  const handleWallet = (walletTab) => {
    setWalletActive(walletTab);
    setPriceWarning(false);
  };

  const handleSubmit = () => {
    if (
      /^0+$/.test(amountTowithDraw) ||
      amountTowithDraw === "" ||
      wBalance < amountTowithDraw
    ) {
      setPriceWarning(true);
    } else {
      setActiveBankDetails(true);
      setPriceWarning(false);
    }
  };

  useEffect(() => {
    getProfile(user?.token)?.then((res) => {
      setWBalance(parseInt(res?.contact_cf?.with_drawn_balance));
      setNwBalance(parseInt(res?.contact_cf?.non_with_drawn_balance));
      setUserName(res);
      setUserProfile(res);
      setLoadApi(false);
    });
    // axios
    //   .get(
    //     "https://upc.vipnumbershop.com/contact_update.php?mobile=" +
    //       user?.user?.mobile
    //   )
    //   .then((response) => {
    //     setData(response.data, "---pp-vvv---");
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  }, [loadApi]);

  const handleWithdrawaInput = (e) => {
    const { value, name } = e.target;
    setWithdrawal((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setError((prevState) => ({
      ...prevState,
      [name]: "",
    }));
  };

  const handleWithdrawSubmit = () => {
    if (loading) return;
    let isValid = true;
    const isBankDetailsFilled =
      withdrawal.cardName.trim().length > 0 ||
      withdrawal.bankName.trim().length > 0 ||
      withdrawal.accountNumber.trim().length > 0 ||
      withdrawal.ifscCode.trim().length > 0;

    const isOtherDetailsFilled =
      withdrawal.airtel.trim().length > 0 ||
      withdrawal.paytm.trim().length > 0 ||
      withdrawal.phonePay.trim().length > 0 ||
      withdrawal.bhim.trim().length > 0 ||
      withdrawal.googlePay.trim().length > 0 ||
      withdrawal.description.trim().length > 0;

    if (isBankDetailsFilled) {
      // If any bank details field is filled, ensure all bank details fields are filled
      if (
        withdrawal.cardName.trim().length === 0 ||
        withdrawal.bankName.trim().length === 0 ||
        withdrawal.accountNumber.trim().length === 0 ||
        withdrawal.ifscCode.trim().length === 0
      ) {
        // If any bank details field is missing, set error messages and disable submit
        setError({
          cardName:
            withdrawal.cardName.trim().length === 0
              ? "Acc. name is required"
              : "",
          bankName:
            withdrawal.bankName.trim().length === 0
              ? "Bank name is required"
              : "",
          accountNumber:
            withdrawal.accountNumber.trim().length === 0
              ? "Account number is required"
              : "",
          ifscCode:
            withdrawal.ifscCode.trim().length === 0
              ? "Ifsc code is required"
              : "",
        });
        isValid = false;
      }
    }

    if (!isBankDetailsFilled && isOtherDetailsFilled) {
      // If non-bank details are filled, call API function
      setLoading(true);
      const storedReferId = localStorage.getItem("referId");
      WithDrawMoney(
        {
          airtel_number: withdrawal.airtel,
          paytm_number: withdrawal.paytm,
          bhim_number: withdrawal.bhim,
          phone_pe_number: withdrawal.phonePay,
          g_pay_number: withdrawal.googlePay,
          mobile_number: user?.user?.mobile,
          bank_account_name: withdrawal.cardName,
          bank_name: withdrawal.bankName,
          bank_ifsc_code: withdrawal.ifscCode,
          bank_account_number: withdrawal.accountNumber,
          amount_requested_remarks: withdrawal.description,
          amount_requested: amountTowithDraw,
          action: "Money Requested",
          ...(storedReferId && {
            refer_id: storedReferId === "undefined" ? "" : storedReferId,
          }),
        },
        user?.token
      ).then((res) => {
        setLoading(false);
        setValidationSubmit(false);
        setNameOnCard("");
        setbankname("");
        setAccount("");
        setIfsc("");
        setSelectedPaymentType(null);
      });
    }

    // If bank details are filled correctly, call API function
    if (isValid && isBankDetailsFilled) {
      setLoading(true);
      const storedReferId = localStorage.getItem("referId");
      WithDrawMoney(
        {
          airtel_number: withdrawal.airtel,
          paytm_number: withdrawal.paytm,
          bhim_number: withdrawal.bhim,
          phone_pe_number: withdrawal.phonePay,
          g_pay_number: withdrawal.googlePay,
          mobile_number: user?.user?.mobile,
          bank_account_name: withdrawal.cardName,
          bank_name: withdrawal.bankName,
          bank_ifsc_code: withdrawal.ifscCode,
          bank_account_number: withdrawal.accountNumber,
          amount_requested_remarks: withdrawal.description,
          amount_requested: amountTowithDraw,
          action: "Money Requested",
          ...(storedReferId && {
            refer_id: storedReferId === "undefined" ? "" : storedReferId,
          }),
        },
        user?.token
      ).then((res) => {
        setLoading(false);
        setValidationSubmit(false);
        setNameOnCard("");
        setbankname("");
        setAccount("");
        setIfsc("");
        setSelectedPaymentType(null);
      });
    }
  };

  const handleClearField = (fieldName) => {
    setWithdrawal({ ...withdrawal, [fieldName]: "" });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "cf_2167") {
      // Split the input by new lines
      const lines = value.split(/\r?\n/);
      // Process each line
      const cleanedLines = lines.map((line) => {
        // Remove spaces and dashes, limit to 10 digits
        const cleanedNumber = line.replace(/[-\s]/g, "").slice(0, 10);
        return cleanedNumber;
      });
      // Join cleaned lines with new lines
      const cleanedValue = cleanedLines.join("\n");
      // Update the form data state
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: cleanedValue,
      }));
    } else if (name === "cf_2163") {
      // Handle amount input change
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value, // Ensure to update the value directly
      }));
      // Validate amount against wallet balance if user is defined
      if (userName) {
        const { wallet_balance } = userName.contact_cf;
        if (parseFloat(value) > parseFloat(wallet_balance)) {
          toast.error("Please add an amount according to your balance");
          return;
        }
      }
    } else {
      // For other fields, update form data as usual
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: type === "checkbox" ? (checked ? "1" : "0") : value,
      }));
    }
  };

  const handleRecharge = () => {
    setRechargeBtn(true);
    if (!formData.cf_2167) {
      toast.error("Please Enter mobile numbers");
      setRechargeBtn(false);
      return;
    }
    if (!formData.cf_2163) {
      toast.error("Please Enter Amount");
      setRechargeBtn(false);
      return;
    }
    // Split and clean up mobile numbers
    const mobileNumbers = formData.cf_2167
      .split(/[\s,;-]+/) // Split by spaces, commas, hyphens, or semicolons
      .map((number) => number.trim())
      .filter((number) => number !== ""); // Remove empty strings

    const { wallet_balance } = userName.contact_cf;
    const rechargeAmount = parseFloat(formData.cf_2163);

    if (mobileNumbers.length * rechargeAmount > parseFloat(wallet_balance)) {
      toast.error(
        `Your wallet does not have sufficient balance for recharges.`
      );
      return;
    }

    const batchSize = 100; // Number of mobile numbers per batch
    const totalBatches = Math.ceil(mobileNumbers.length / batchSize);
    let successCount = 0;
    let failedNumbers = [];

    // Function to show modal with invalid numbers
    const showModalWithInvalidNumbers = (invalidNumbers) => {
      setFailedNumbers(invalidNumbers);
      showModal(); // Assuming setShow is used to display modal
    };

    // Filter out invalid numbers (not exactly 10 digits long)
    const validMobileNumbers = mobileNumbers.filter(
      (number) => number.length === 10 && /^[6789]/.test(number)
    );

    // Iterate over each batch of valid mobile numbers
    for (let i = 0; i < totalBatches; i++) {
      const batchNumbers = validMobileNumbers.slice(
        i * batchSize,
        (i + 1) * batchSize
      );

      if (batchNumbers.length === 0) continue; // Skip batch if there are no valid numbers

      // Construct comma-separated string of numbers for cf_2167
      const numbersString = batchNumbers.join(",");
      const payload = {
        requested_numbers: numbersString,
        amount: formData.cf_2163,
      };

      // Perform the API call for the batch
      fetch(
        `${process.env.NEXT_PUBLIC_LEAFYMANGO_API_URL}/web/wallet/createRecharge`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify(payload),
        }
      )
        .then((response) => {
          if (response.status === 0 || response.ok) {
            successCount++;
            if (successCount === totalBatches) {
              toast.success(`Recharge successful. Please wait for a moment!`);
              setLoadApi(true);
              setRechargeBtn(false);
            }
          } else {
            params.cf_2165 = "Credit";
            setRechargeBtn(false);
            throw new Error(`Failed to recharge for batch ${i}`);
          }
        })
        .catch((error) => {
          console.error(`Error for batch ${i}:`, error);
          params.cf_2165 = "Credit";
          setRechargeBtn(false);
        });
    }

    // Update failed numbers with invalid mobile numbers
    failedNumbers = mobileNumbers.filter(
      (number) => !validMobileNumbers.includes(number)
    );

    // Show modal with invalid numbers if any
    if (failedNumbers.length > 0) {
      showModalWithInvalidNumbers(failedNumbers);
    }
    // Clear form data after processing
    setFormData({
      cf_2163: "",
      cf_2167: "",
    });
  };

  const handleRefresh = () => {
    setWalletBalance(true);
  };
  return (
    <>
      <section className="wallet-page-os">
        <div className="wallet-heading">
          <div className="container-os">
            <div className="wallet-profile-text-os">VIP NUMBER WALLET</div>
          </div>
        </div>
        <WalletPage
          handleWallet={handleWallet}
          walletActive={walletActive}
          wBalance={wBalance}
          nwBalance={nwBalance}
          show={show}
          hideModal={hideModal}
          failedNumbers={failedNumbers}
          handleRefresh={handleRefresh}
          formData={formData}
          handleChange={handleChange}
          handleRecharge={handleRecharge}
          rechargeBtn={rechargeBtn}
          setAmountTowithDraw={setAmountTowithDraw}
          setPriceWarning={setPriceWarning}
          setActiveBankDetails={setActiveBankDetails}
          handleSubmit={handleSubmit}
          priceWarning={priceWarning}
          amountTowithDraw={amountTowithDraw}
          activeBankDetails={activeBankDetails}
          withdrawal={withdrawal}
          handleWithdrawaInput={handleWithdrawaInput}
          handleClearField={handleClearField}
          error={error}
          selectedPaymentType={selectedPaymentType}
          validationSubmit={validationSubmit}
          nameOnCard={nameOnCard}
          bankname={bankname}
          account={account}
          ifsc={ifsc}
          handleWithdrawSubmit={handleWithdrawSubmit}
          loading={loading}
          activeUpiPopup={activeUpiPopup}
          setActiveUpiPopup={setActiveUpiPopup}
          setSelectedPaymentType={setSelectedPaymentType}
          upi={upi}
          setUpi={setUpi}
          setUpiError={setUpiError}
          upiError={upiError}
        />
      </section>
    </>
  );
};

export default Wallet;
