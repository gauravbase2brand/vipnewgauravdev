import React from "react";
import { faArrowsRotate } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { Button, CircularProgress } from "@mui/material";
const WalletPage = ({
  handleWallet,
  walletActive,
  wBalance,
  nwBalance,
  show,
  hideModal,
  failedNumbers,
  handleRefresh,
  formData,
  handleChange,
  handleRecharge,
  rechargeBtn,
  setAmountTowithDraw,
  setPriceWarning,
  setActiveBankDetails,
  handleSubmit,
  priceWarning,
  amountTowithDraw,
  activeBankDetails,
  withdrawal,
  handleWithdrawaInput,
  handleClearField,
  error,
  selectedPaymentType,
  validationSubmit,
  nameOnCard,
  bankname,
  account,
  ifsc,
  handleWithdrawSubmit,
  loading,
  activeUpiPopup,
  setActiveUpiPopup,
  setSelectedPaymentType,
  upi,
  setUpi,
  setUpiError,
  upiError,
  isFastPayment,
  handleCheckboxChange,
  setWithdrawal,
  transferPayment,
  handleCheckboxTransfer,
  setTransferPayment,
  setIsFastPayment,
  mobileValid,
  defaultAcc,
  trasferLoading,
}) => {
  const panelImg = process.env.NEXT_PUBLIC_IMAGES;
  const clearAllFields = () => {
    setWithdrawal((prev) => ({
      ...prev,
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
    }));
  };
  return (
    <div className="container-os">
      <div className="wallet-page-row-os">
        <div className="wallet-balance-deatils-row-os">
          <div className="wallet-balance-deatils-col-1-os">
            <div
              onClick={() => handleWallet("wallet-tab-3")}
              className={`${
                walletActive === "wallet-tab-3"
                  ? "wallet-balance-deatils-col-12-os active"
                  : "wallet-balance-deatils-col-12-os"
              }`}
            >
              <div className="withdrawal-image-os">
                <Image
                  src={`${panelImg}/assets/img/vip-images/wallet-icon_okvmrx.webp`}
                  alt="Recharge"
                  width={300}
                  height={100}
                  priority="true"
                />
              </div>
              <div className="wallet-withdrawal-data-os">
                <span>Recharge</span>
              </div>
            </div>
            <div
              onClick={() => handleWallet("wallet-tab-2")}
              className={`${
                walletActive === "wallet-tab-2"
                  ? "wallet-balance-deatils-col-12-os active"
                  : "wallet-balance-deatils-col-12-os"
              }`}
            >
              <div className="withdrawal-image-os">
                <Image
                  src={`${panelImg}/assets/img/vip-images/wallet-icon_okvmrx.webp`}
                  alt="Withdraw"
                  width={300}
                  height={100}
                  priority="true"
                />
              </div>
              <div className="wallet-withdrawal-data-os">
                <span>Withdraw money to your Bank</span>
                <span>{wBalance || 0}</span>
              </div>
            </div>
            <div className="wallet-balance-deatils-col-12-os">
              <div className="withdrawal-image-os">
                <Image
                  src={`${panelImg}/assets/img/vip-images/wallet-icon_okvmrx.webp`}
                  alt="Non-Withdrawn"
                  width={300}
                  height={100}
                  priority="true"
                />
              </div>
              <div className="wallet-withdrawal-data-os">
                <span>Non-Withdrawn Balance</span>
                <span>{nwBalance || 0}</span>
              </div>
            </div>
          </div>
          <div className="wallet-balance-deatils-col-2-os">
            <span>TOTAL BALANCE</span>
            <span>{wBalance + nwBalance || 0} </span>
            <FontAwesomeIcon
              icon={faArrowsRotate}
              onClick={() => handleRefresh()}
              style={{ cursor: "pointer" }}
            />
          </div>
        </div>
        {show && (
          <div className="modal-rs display-block">
            <section className="modal-main">
              <button
                onClick={hideModal}
                className="modal-cross-button-rs"
                aria-label="cross"
              >
                <svg
                  width="53"
                  height="53"
                  viewBox="0 0 53 53"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="26.5" cy="26.5" r="26.5" fill="#D80027"></circle>
                  <path
                    d="M20.9132 15.5879L26.4994 23.9516L32.0857 15.5879H35.6768L28.3349 26.3947L35.8524 37.4114H32.2293L26.4994 28.8829L20.7696 37.4114H17.1465L24.664 26.3947L17.3221 15.5879H20.9132Z"
                    fill="#EFEFEF"
                  ></path>
                </svg>
              </button>
              <ul>
                {failedNumbers.map((number, index) => (
                  <li
                    key={index}
                    className="invalid-number"
                  >{`Invalid mobile number: ${number}`}</li>
                ))}
              </ul>
              <p style={{ color: "blue" }}>Thank You</p>
            </section>
          </div>
        )}
        {walletActive === "wallet-tab-3" && (
          <div
            className={
              walletActive === "wallet-tab-3"
                ? "wallet-page-withdrawal-money-data-row-os active"
                : "wallet-page-withdrawal-money-data-row-os"
            }
          >
            {/* <div className="OrderPlacement-paymentInfo-method-col-2-os">
              <div className="withdrawal-paymentInfo-heading-os">
                MOBILE RECHARGE
              </div>
              <div className="recharge-input-field-rs">
                <textarea
                  cols="30"
                  rows="5"
                  name="cf_2167"
                  placeholder="Please Enter Mobile Number*"
                  value={formData.cf_2167}
                  onChange={handleChange}
                ></textarea>
              </div>
              <div className="withdrawal-account-details-input-col-os withdrawal-account-details-input-col-3-os">
                <label>Amount</label>
                <div className="withdrawal-account-details-input-col-os-1">
                  <input
                    type="number"
                    name="cf_2163"
                    value={formData.cf_2163}
                    onChange={handleChange}
                    placeholder="Enter Amount"
                  />
                </div>
                <span className="error-msg-rs">BSNL Not Working</span>
              </div>
              <button
                onClick={() => {
                  handleRecharge();
                }}
                className="withdrawal-account-details-submit-btn-os"
                disabled={rechargeBtn}
                style={{ marginTop: "1rem" }}
                aria-label="Recharge"
              >
                Recharge
              </button>
            </div> */}
            <div className="w-full p-2 bg-white rounded-md ">
              <div className="relative w-full mb-4">
                <textarea
                  id="MOBILERECHARGE"
                  cols="30"
                  rows="5"
                  name="cf_2167"
                  placeholder=" "
                  value={formData.cf_2167}
                  onChange={handleChange}
                  className="peer w-full p-3 border border-primary rounded-md placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-primary  focus:border-primary"
                ></textarea>
                <label
                  htmlFor="MOBILERECHARGE"
                  className={`absolute cursor-text bg-white px-1 left-3 transition-all transform origin-left capitalize text-[16px] leading-4 ${
                    formData.cf_2167
                      ? "-top-2 left-3 text-xs text-primary scale-90"
                      : "top-3 text-primary peer-focus:-top-2 peer-focus:left-3 peer-focus:text-xs peer-focus:text-primary peer-focus:scale-90"
                  }`}
                >
                  MOBILE RECHARGE
                </label>
              </div>
              <div className="relative w-full mb-4">
                <input
                  id="amount"
                  type="number"
                  name="cf_2163"
                  value={formData.cf_2163}
                  onInput={(e) => {
                    // Remove any non-numeric characters
                    let value = e.target.value.replace(/[^0-9]/g, "");
                    // If the value starts with "0" and is longer than 1 character, remove the leading "0"
                    if (value.startsWith("0") && value.length > 1) {
                      value = value.substring(1);
                    }
                    // Update the input field value
                    e.target.value = value;
                  }}
                  onChange={handleChange}
                  placeholder=" "
                  className="peer w-full p-3 border border-primary rounded-md placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-primary  focus:border-primary"
                />
                <label
                  htmlFor="amount"
                  className={`absolute cursor-text bg-white px-1 left-3 transition-all transform origin-left capitalize text-[16px] leading-4 ${
                    formData.cf_2163
                      ? "-top-2 left-3 text-xs text-primary scale-90"
                      : "top-3 text-primary peer-focus:-top-2 peer-focus:left-3 peer-focus:text-xs peer-focus:text-primary peer-focus:scale-90"
                  }`}
                >
                  Amount
                </label>
              </div>

              <span className="text-red-500 text-sm mt-2 block">
                BSNL Not Working
              </span>

              <button
                onClick={() => {
                  handleRecharge();
                }}
                className={`w-full p-3 bg-primary  text-white font-semibold rounded-md hover:bg-white hover:text-primary hover:border hover:border-primary transition duration-300 ease-in-out ${
                  rechargeBtn ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={rechargeBtn}
                style={{ marginTop: "1rem" }}
                aria-label="Recharge"
              >
                Recharge
              </button>
            </div>
          </div>
        )}
        <div
          className={
            walletActive === "wallet-tab-2"
              ? "wallet-page-withdrawal-money-data-row-os active"
              : "wallet-page-withdrawal-money-data-row-os"
          }
        >
          {
            <div className="withdrawal-entered-amount-data-os">
              <div className="text-[16px] text-[#4f5760] mb-3 capitalize">
                Withdrawn Money
              </div>
              <div className="grid lg:grid-cols-[5fr_2fr] grid-cols-1 items-center gap-2">
                {/* <div className="wallet-page-withdrawal-money-input-os">
                  <span>Rs.</span>
                  <input
                    type="number"
                    placeholder="0"
                    onChange={(e) => {
                      setAmountTowithDraw(e.target.value);
                      if (e.target.value > wBalance) {
                        setPriceWarning(true);
                        setActiveBankDetails(false);
                      } else {
                        setPriceWarning(false);
                      }
                    }}
                  />
                </div> */}
                <div className=" relative">
                  <input
                    id="withdrawAmount"
                    type="number"
                    placeholder="0"
                    onInput={(e) => {
                      // Remove any non-numeric characters
                      let value = e.target.value.replace(/[^0-9]/g, "");
                      // If the value starts with "0" and is longer than 1 character, remove the leading "0"
                      if (value.startsWith("0") && value.length > 1) {
                        value = value.substring(1);
                      }
                      // Update the input field value
                      e.target.value = value;
                    }}
                    onChange={(e) => {
                      setAmountTowithDraw(e.target.value);
                      if (e.target.value > wBalance) {
                        setPriceWarning(true);
                        setActiveBankDetails(false);
                      } else {
                        setPriceWarning(false);
                      }
                    }}
                    className="peer w-full bg-transparent text-black border border-primary rounded-md px-3 py-3 transition duration-300 ease focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary  hover:border-primary shadow-sm focus:shadow text-[16px] leading-4"
                  />
                  <label
                    htmlFor="withdrawAmount"
                    className={`absolute cursor-text bg-white px-1 left-2.5 transition-all transform origin-left capitalize text-[16px] leading-4 ${
                      setAmountTowithDraw
                        ? "-top-2 left-2.5 text-xs text-primary scale-90"
                        : "top-[11px] text-primary peer-focus:-top-2 peer-focus:left-2.5 peer-focus:text-xs peer-focus:text-primary peer-focus:scale-90"
                    }`}
                  >
                    Enter Amount (Rs.)
                  </label>
                </div>

                {/* <div className="wallet-page-withdrawal-button-os">
                  <button
                    className={!wBalance ? "disabled" : ""}
                    type="submit"
                    onClick={() => {
                      handleSubmit();
                    }}
                    aria-label="Withdrawn Money"
                  >
                    Withdrawn Money
                  </button>
                </div> */}

                <div className="w-full">
                  <button
                    className={`font-semibold text-white text-[18.3917px] leading-[22px] bg-primary  rounded-[3px] w-full p-3 border border-primary transition duration-300 ease-in-out hover:bg-primary hover:text-white hover:border-primary  ${
                      !wBalance ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    type="submit"
                    onClick={() => {
                      handleSubmit();
                    }}
                    aria-label="Withdrawn Money"
                    disabled={!wBalance}
                  >
                    Withdrawn Money
                  </button>
                </div>
              </div>
              {priceWarning && (
                <p className="text-sm mt-2" style={{ color: "red" }}>
                  {wBalance < amountTowithDraw
                    ? "Please enter amount according to your balance."
                    : "Please enter amount."}
                </p>
              )}
            </div>
          }

          {activeBankDetails && (
            <div className="payment-radio-buttons-os withdrawal-paymentInfo-all-data-os">
              <div class="relative flex items-start">
                <div class="flex items-center h-5 mt-1">
                  <input
                    id="hs-checkbox-fast-payment"
                    name="hs-checkbox-fast-payment"
                    type="checkbox"
                    class="w-4 h-4 border-gray-200 rounded-sm text-blue-600 focus:ring-blue-500 checked:border-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800 cursor-pointer"
                    aria-describedby="hs-checkbox-fast-payment-description"
                    checked={isFastPayment}
                    onChange={(e) => {
                      handleCheckboxChange(e);
                      clearAllFields();
                      setTransferPayment(false);
                    }}
                    disabled={defaultAcc === null || defaultAcc === ""}
                  />
                </div>
                <label for="hs-checkbox-fast-payment" class="ms-3">
                  <span class="text-lg font-semibold text-gray-800">
                    {`For Fast Payment. (For Vendor only)`}
                  </span>
                  <span
                    id="hs-checkbox-fast-payment-description"
                    class="block text-sm dark:text-neutral-500 cursor-pointer text-red-600"
                  >
                    {defaultAcc === null || defaultAcc === "" ? (
                      `Enable to prioritize faster payment processing. (Contact your Account Manager)`
                    ) : (
                      <span
                        dangerouslySetInnerHTML={{
                          __html: defaultAcc.replace(/\n/g, "<br />"),
                        }}
                      />
                    )}
                  </span>
                </label>
              </div>
              {amountTowithDraw <= 18000 && !isFastPayment && (
                <div>
                  <div className="text-lg font-semibold text-gray-800">
                    Please Input the account detail to withdraw amount.
                  </div>
                  <div className="withdrawal-account-details-input-row-os">
                    <div className="withdrawal-account-details-input-col-os">
                      <label>Phone Pay</label>
                      <div className="withdrawal-account-details-input-col-os-1">
                        <input
                          type="input"
                          name="phonePay"
                          placeholder="Phone pay"
                          value={withdrawal.phonePay}
                          onChange={handleWithdrawaInput}
                          disabled={transferPayment}
                        />
                        <span
                          className="crossing-data"
                          onClick={() => handleClearField("phonePay")}
                        >
                          ×
                        </span>
                      </div>
                    </div>
                    <div className="withdrawal-account-details-input-col-os">
                      <label>Bhim upi</label>
                      <div className="withdrawal-account-details-input-col-os-1">
                        <input
                          type="input"
                          name="bhim"
                          placeholder="Bhim upi"
                          value={withdrawal.bhim}
                          onChange={handleWithdrawaInput}
                          disabled={transferPayment}
                        />
                        <span
                          className="crossing-data"
                          onClick={() => handleClearField("bhim")}
                        >
                          ×
                        </span>
                      </div>
                    </div>
                  </div>
                  {/* <span className="fast-payments">
                    Recommended For Fast Payment
                  </span> */}
                </div>
              )}
              <div className="OrderPlacement-paymentInfo-method-col-2-os">
                {!isFastPayment && (
                  <>
                    <div className="text-lg font-semibold text-gray-800">
                      Bank Account Details
                    </div>
                    <div className="withdrawal-account-details-input-row-os">
                      <div className="withdrawal-account-details-input-col-os withdrawal-account-details-input-col-1-os">
                        <label>Acc. Name</label>
                        <div className="withdrawal-account-details-input-col-os-1">
                          <input
                            type="text"
                            name="cardName"
                            value={withdrawal.cardName}
                            onChange={handleWithdrawaInput}
                            placeholder="Acc. Name"
                            disabled={transferPayment}
                          />
                          <span
                            className="crossing-data"
                            onClick={() => handleClearField("cardName")}
                          >
                            ×
                          </span>
                          {error.cardName && (
                            <div className="error-message">
                              {error.cardName}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="withdrawal-account-details-input-col-os withdrawal-account-details-input-col-2-os">
                        <label>Bank Name</label>
                        <div className="withdrawal-account-details-input-col-os-1">
                          <input
                            type="text"
                            name="bankName"
                            value={withdrawal.bankName}
                            onChange={handleWithdrawaInput}
                            placeholder="Bank Name"
                            disabled={transferPayment}
                          />
                          <span
                            className="crossing-data"
                            onClick={() => handleClearField("bankName")}
                          >
                            ×
                          </span>
                          {error.bankName && (
                            <div className="error-message">
                              {error.bankName}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="withdrawal-account-details-input-col-os withdrawal-account-details-input-col-3-os">
                        <label>Acc. No</label>
                        <div className="withdrawal-account-details-input-col-os-1">
                          <input
                            type="text"
                            name="accountNumber"
                            value={withdrawal.accountNumber}
                            onChange={handleWithdrawaInput}
                            placeholder="Enter Account Number"
                            disabled={transferPayment}
                          />
                          <span
                            className="crossing-data"
                            onClick={() => handleClearField("accountNumber")}
                          >
                            ×
                          </span>
                          {error.accountNumber && (
                            <div className="error-message">
                              {error.accountNumber}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="withdrawal-account-details-input-col-os withdrawal-account-details-input-col-4-os">
                        <label>Ifsc Code</label>
                        <div className="withdrawal-account-details-input-col-os-1">
                          <input
                            type="text"
                            name="ifscCode"
                            value={withdrawal.ifscCode}
                            onChange={handleWithdrawaInput}
                            placeholder="Enter IFSC Code"
                            disabled={transferPayment}
                          />
                          <span
                            className="crossing-data"
                            onClick={() => handleClearField("ifscCode")}
                          >
                            ×
                          </span>
                          {error.ifscCode && (
                            <div className="error-message">
                              {error.ifscCode}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    {selectedPaymentType === "bank" &&
                      validationSubmit &&
                      (!nameOnCard || !bankname || !account || !ifsc) && (
                        <p
                          className="price-warning-message"
                          style={{ color: "red" }}
                        >
                          Please Enter Bank Details
                        </p>
                      )}
                    <div className="wallet-input-field-rs">
                      <textarea
                        cols="30"
                        rows="5"
                        name="description"
                        placeholder="Remarks(optional)*"
                        value={withdrawal.description}
                        onChange={handleWithdrawaInput}
                        disabled={transferPayment}
                      ></textarea>
                      <span
                        className="crossing-data"
                        onClick={() => handleClearField("description")}
                      >
                        ×
                      </span>
                    </div>
                    <div className="withdrawal-alert-message-os">
                      1-3 Business days
                    </div>

                    <div className="mt-4">
                      <div class="flex items-center">
                        <input
                          id="default-checkbox"
                          type="checkbox"
                          value=""
                          class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 cursor-pointer"
                          checked={transferPayment}
                          onChange={(e) => {
                            handleCheckboxTransfer(e);
                            clearAllFields();
                            setIsFastPayment(false);
                          }}
                        />
                        <label
                          for="default-checkbox"
                          class="ms-2 text-lg font-semibold text-gray-800 dark:text-gray-300 cursor-pointer"
                        >
                          Transfer Balance To other account / other vendor
                        </label>
                      </div>
                      {transferPayment && (
                        <div className="withdrawal-account-details-input-row-os">
                          <div className="withdrawal-account-details-input-col-os">
                            <label>Mobile Number</label>
                            <div className="withdrawal-account-details-input-col-os-1">
                              <input
                                className={mobileValid ? "" : "error-border"}
                                type="number"
                                name="mobileNumber"
                                placeholder="Mobile Number"
                                value={withdrawal.mobileNumber}
                                onChange={handleWithdrawaInput}
                              />
                              <span
                                className="crossing-data"
                                onClick={() => handleClearField("mobileNumber")}
                              >
                                ×
                              </span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </>
                )}
                <div className="footer-sticky">
                <button
                  onClick={handleWithdrawSubmit}
                  className="withdrawal-account-details-submit-btn-os"
                  disabled={!validationSubmit}
                  aria-label="Submit"
                >
                  {loading || trasferLoading ? "Submitting..." : "Submit"}
                </button>
                </div>
              </div>
            </div>
          )}

          {activeUpiPopup && (
            <section className="upi-id-popup-section-os">
              <div className="upi-id-popup-all-data-row-os">
                <div className="upi-id-popup-row-os">
                  <button
                    onClick={() => {
                      setActiveUpiPopup(false);
                      setSelectedPaymentType(null);
                      setUpi("");
                      setUpiError(true);
                    }}
                    className="upi-id-popup-cross-btn-os"
                    aria-label="upi-id-popup"
                  >
                    <svg
                      width="53"
                      height="53"
                      viewBox="0 0 53 53"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle cx="26.5" cy="26.5" r="26.5" fill="#D80027" />
                      <path
                        d="M20.9132 15.5879L26.4994 23.9516L32.0857 15.5879H35.6768L28.3349 26.3947L35.8524 37.4114H32.2293L26.4994 28.8829L20.7696 37.4114H17.1465L24.664 26.3947L17.3221 15.5879H20.9132Z"
                        fill="#EFEFEF"
                      />
                    </svg>
                  </button>
                  <div className="upi-id-popup-heading-os">
                    Enter{" "}
                    {selectedPaymentType
                      ? `${selectedPaymentType} UPI ID`
                      : "ID"}
                  </div>
                  <form>
                    <div className="upi-id-form-os">
                      <div className="upi-id-input-os">
                        <input
                          type="text"
                          placeholder="e.g @paytm, @ybl, @upi"
                          value={upi}
                          onChange={(e) => {
                            setUpi(e.target.value);
                            setUpiError(true);
                          }}
                        />
                      </div>
                      <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        disabled={loading}
                        endIcon={
                          loading && (
                            <CircularProgress size={20} color="inherit" />
                          )
                        }
                        aria-label="Withdraw Money"
                      >
                        Withdraw Money
                      </Button>
                    </div>
                  </form>
                  {upiError === false && (
                    <p
                      className="price-warning-message"
                      style={{ color: "red" }}
                    >
                      Please enter a valid upi.
                    </p>
                  )}
                  <div className="withdrawal-alert-message-os">
                    Instant Transfer
                  </div>
                </div>
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default WalletPage;
