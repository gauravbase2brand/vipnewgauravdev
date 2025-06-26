import React, { useState, useContext } from "react";
import axios from "axios";
import useRazorpay from "react-razorpay";
import { toast } from "react-toastify";
import { AppStateContext } from "../contexts/AppStateContext/AppStateContext";
import { updateProfile } from "../Services/Services";

const createOrderInDB = async (Token, payload) => {
  const apiUrl = process.env.NEXT_PUBLIC_LEAFYMANGO_API_URL;
  try {
    const response = await axios.post(`${apiUrl}/web/razorpay/order`, payload, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${Token}`,
      },
    });
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const useInitiatePaymentByRazorPay = () => {
  const { user = {} } = useContext(AppStateContext);
  const Razorpay = useRazorpay();
  const [orderId, setOrderId] = useState();

  const initiate = (Token, payload, setWBalance) => {
    createOrderInDB(Token, payload)?.then((res) => {
      const userInfo = res?.data?.data?.user;
      setOrderId(res?.data?.data?.order_id);
      // Check if the cart amount is more than 5000/-
      const isCartAmountGreaterThan5000 = payload?.amount > 5000;

      // Set the "upi" method based on the condition
      const method = {
        upi: !isCartAmountGreaterThan5000, // Set "upi" to false if amount > 5000
      };

      const options = {
        key: "rzp_live_mMfqxRhCpzrpog",
        name: "VIP NUMBER SHOP",
        description: "Transaction",
        image: "https://example.com/your_logo",
        order_id: res?.data?.data?.order_id,
        handler: function (response) {
          const paymentId = response.razorpay_payment_id;
          const updatedProfile = {
            wallet_balance: payload?.amount,
            paymentId,
          };
          updateProfile(updatedProfile, user?.token)
            .then((res) => {
              setWBalance(payload?.amount || "1023-Failed");
            })
            .catch((error) => {
              console.error("Error adding balancce:", error);
            });
          // fetch(
          //   "https://upc.vipnumbershop.com/get_contact_data.php?mobile=" +
          //     user?.user?.mobile,
          //   {
          //     method: "POST",
          //     headers: {
          //       "Content-Type": "application/json",
          //       Authorization: `Bearer ${Token}`, // use the user's token data
          //     },
          //     body: JSON.stringify({
          //       cf_2038: payload?.amount,
          //     }),
          //   }
          // )
          //   .then((response) => response.json())
          //   .then((data) => {
          //     toast.success("Added successfully!", "", {
          //       timeOut: 3000,
          //     });
          //     localStorage.setItem("vipthankyou", true);
          //     navigate.push("/thank-you?count=" + cartItems?.length);
          //   })
          //   .catch((error) => console.error(error));
        },
        prefill: {
          name: userInfo?.firstname + " " + userInfo?.lastname,
          email: userInfo?.email,
          contact: userInfo?.mobile,
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
        method: method,
      };
      const rzp1 = new Razorpay(options);
      rzp1.on("payment.failed", function (response) {
        toast.error(response.error.code);
        toast.error(response.error.description);
        toast.error(response.error.source);
        toast.error(response.error.step);
        toast.error(response.error.reason);
        toast.error(response.error.metadata.order_id);
        toast.error(response.error.metadata.payment_id);
      });
      rzp1.open();
    });
  };

  return { initiate, orderId };
};

export const WithDrawMoney = async (payload, token) => {
  const apiUrl = process.env.NEXT_PUBLIC_LEAFYMANGO_API_URL;
  try {
    const response = await axios.post(`${apiUrl}/web/profile/update`, payload, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    });
    if (response.data.status === "success") {
      // If the API response is successful, show success message
      toast.success(
        "Your request has been submitted, The said amount will be credited to your account within 24-48 working hours"
      );
    } else {
      // If the API response is not successful, show error message
      toast.error(
        "Oops! There's been some error, please try again after sometime."
      );
    }
    return response;
  } catch (error) {
    console.error(error);
    toast.error(
      "Oops! There's been some error, please try again after sometime."
    );
  }
};
