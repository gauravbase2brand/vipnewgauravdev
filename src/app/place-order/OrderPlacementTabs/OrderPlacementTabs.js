import { FaRegEdit } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";
import React, { useState, useRef } from "react";
import "./OrderPlacementTabs.css";
import "../../blogs/BlogsNumber.css";
import { useContext } from "react";
import { AppStateContext } from "../../contexts/AppStateContext/AppStateContext";
import { useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import { getOrderId, getProfile, phonePayOrder } from "../../Services/Services";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useCallback } from "react";
import { useGetQueryParams } from "../../utils";
import MainHeading from "../../Shared/MainHeading/MainHeading";
import { ThreeDots } from "react-loader-spinner";
import CardCollection from "../CardCollection";
import OrderPlacementQuestions from "../OrderPlacementQuestions";
import UserProfile from "./UserProfile";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import AllCoupons from "./AllCoupons";
import { AiFillHome } from "react-icons/ai";
import HomeDelivery from "./HomeDelivery";
import DeliveryGuide from "./DeliveryGuide";
import PaymentGate from "./PaymentGate";

const OrderPlacementTabs = () => {
  const { queryParams } = useGetQueryParams();
  const pathname = usePathname();
  const {
    cartItems,
    setCartItems,
    addToWishList,
    addToCart,
    checkUser,
    removeFromCart,
    setRelatedNumbers: setNumber,
    setCartCache,
    user,
    setCartCacheData,
    cartCacheData,
    setPdp,
    setNameUpdate,
    wBalance,
    coupon_code,
    displayProfile,
    setDisplayProfile,
    setWBalance,
    setWalletBalance,
    walletBalance,
    skeleton,
    userProfile,
    setUserProfile,
  } = useContext(AppStateContext);
  const filteredCartItems = cartItems.filter((item) => item.tag === "new");
  const totalCharge = filteredCartItems.length; // Calculate total
  const comingSoonData = filteredCartItems.filter(
    (item) => item.comingsoon === "NO"
  );
  const [relatedNumbers, setRelatedNumbers] = useState([]);
  const [total, setTotal] = useState(0);
  const reff = useRef(false);
  const Router = useRouter();
  const [showOtherCityInput, setShowOtherCityInput] = useState(false);
  const [otherCity, setOtherCity] = useState("");
  const [activeOrderTab] = useState("order-tab-1");
  const [postOffices, setPostOffices] = useState([]);
  const [comingsoon, setComingsoon] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isTotalAmountZero, setIsTotalAmountZero] = useState(0);
  const [termCondition, setTermCondition] = useState(true);
  const [orderLoading, setOrderLoading] = useState(false);
  const [placeOrder, setPlaceOrder] = useState(false);
  const apiUrl = process.env.NEXT_PUBLIC_LEAFYMANGO_API_URL;
  const panelImg = process.env.NEXT_PUBLIC_IMAGES;
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState({
    full_name: "",
    mobile_number: "",
    primary_email: "",
    postal_code: "",
    billing_address: "",
    city: "",
    district: "",
    state: "",
    allFields: "",
  });
  const [apiHit, setApiHit] = useState(false);
  const [leadHitting, setLeadHitting] = useState(true);
  const ref = useRef();
  const [profile, setProfile] = useState({
    first_name: "",
    mobile_number: "",
    primary_email: "",
    postal_code: "",
    billing_address: "",
    city: "",
    district: "",
    state: "",
  });
  const [formData, setFormData] = useState({
    first_name: profile?.full_name?.split(" ")[0] || "",
    last_name: profile?.full_name?.split(" ")[1] || "",
    mobile_number: profile?.mobile || "",
    primary_email: profile?.email || "",
    postal_code: profile?.zip_code || "",
    amount: "",
    billing_address: profile?.address || "",
    original_amount: "",
    city: profile?.city || "",
    post_office: "",
    district: "",
    state: profile?.state || "",
    seller_id: "2",
  });
  const [prevFormData, setPrevFormData] = useState();
  const [referId, setReferId] = useState("");
  const [orderIds, setOrderIds] = useState("");
  const [walletInput] = useState(0);
  const [couponCode, setCouponCode] = useState("");
  const [coupons, setCoupons] = useState([]);
  const [totalDiscount, setTotalDiscount] = useState(0);
  const [discountValue, setDiscountValue] = useState(0);
  const myDataString = localStorage.getItem("vipcre");
  const [totalSaved, setTotalSaved] = useState(0);
  const [payNowLoading, setPayNowLoading] = useState(false);
  const [cartCacheTotolPrice, setCartCacheTotolPrice] = useState(0);
  const [totalActualPrice, setTotalActualPrice] = useState(0);
  const [show, setShow] = useState(false);
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState("");
  const [amountPay, setAmountPay] = useState(false);
  const [hasCalledAPI, setHasCalledAPI] = useState(false);
  const [isButtonInView, setIsButtonInView] = useState(false);
  const payNowButtonRef = useRef(null);
  const [showCoupon, setShowCoupon] = useState(false);
  const [isChecked, setIsChecked] = useState(false); // State for checkbox
  const [deliveryCharges, setDeliveryCharges] = useState(0); // State for delivery charges
  const [deliveryIsOpen, setDeliveryIsOpen] = useState(false);
  const [paySelected, setPaySelected] = useState("UPI");
  const [gatewayName, setGatewayName] = useState("RazorPay");
  
  const [finalAmount, setFinalAmount] = useState();
  const [leadUpdate, setLeadUpdate] = useState(false);
  const handleCheckboxChange = (pay) => {
    setIsChecked(!isChecked);
    setDeliveryCharges(isChecked ? 0 : pay); // Set delivery charges to 999 if checked, else 0
    // setDeliveryIsOpen(!isChecked);
  };

  const unwantedNames = [
    "loged-in",
    "Loged-in",
    "loged in",
    "missed call",
    "call me back",
    "vip",
    "undefined",
    "null",
    "login",
    "Login",
    "-",
  ];

  const loaderStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  };
  // Payment failed and Retry then this will be work
  useEffect(() => {
    // Listen for the 'openRazorPay' event
    const openRazorPayHandler = () => {
      if (gatewayName === "PhonePe") {
        handlePhonePay(orderIds);
      } else {
        handleRzpClick();
      }
    };
    window.addEventListener("openRazorPay", openRazorPayHandler);
    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("openRazorPay", openRazorPayHandler);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsButtonInView(true); // Button is visible in the viewport
        } else {
          setIsButtonInView(false); // Button is out of the viewport
        }
      },
      {
        root: null, // Defaults to the viewport
        threshold: 0.1, // Trigger when 10% of the button is visible
      }
    );
    if (payNowButtonRef.current) {
      observer.observe(payNowButtonRef.current);
    }
    return () => {
      if (payNowButtonRef.current) {
        observer.unobserve(payNowButtonRef.current);
      }
    };
  }, []);

  let contactid = "";
  if (myDataString) {
    const myData = JSON.parse(myDataString);
    contactid = myData?.user?.contact_cf?.contactid;
  }
  const showModal = () => {
    setShow(true);
  };

  const hideModal = () => {
    setShow(false);
  };

  const handleAccordion = (accordionId) => {
    setActiveAccordion(activeAccordion === accordionId ? "" : accordionId);
  };

  useEffect(() => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      `${process.env.NEXT_PUBLIC_LEAFYMANGO_API_URL}/web/discount/coupon/list`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.status === "success") {
          setCoupons(result.data);
        }
      })
      .catch((error) => console.error("Error fetching coupons:", error));
  }, []);

  // total price of cache products
  useEffect(() => {
    if (!user?.token && cartCacheData?.length > 0) {
      const cacheTotalPrice = cartCacheData?.reduce((total, product) => {
        if (product?.unit_price) {
          const price = parseFloat(product?.unit_price.replace(/,/g, ""));
          return total + price;
        }
        return total;
      }, 0);
      setCartCacheTotolPrice(cacheTotalPrice);
    }
  }, [!user?.token, cartCacheData]);

  // calculate saved price os
  useEffect(() => {
    let newTotalSaved;
    const calculateSavedAmount = (items) => {
      if (!Array.isArray(items)) {
        items = [items]; // Convert object to array if necessary
      }
      return items?.reduce((total, item) => {
        if (item?.compare_at_price && item?.unit_price) {
          // Remove commas from price strings and parse them to numbers
          const comparePrice = Number(item?.compare_at_price.replace(/,/g, ""));
          const unitPrice = Number(item?.unit_price.replace(/,/g, ""));
          // Check if parsed numbers are valid
          if (!isNaN(comparePrice) && !isNaN(unitPrice)) {
            if (comparePrice > unitPrice) {
              const savedAmount = comparePrice - unitPrice;
              return total + savedAmount;
            }
          }
        }
        return total;
      }, 0);
    };

    if (user?.token) {
      if (Array.isArray(filteredCartItems) && filteredCartItems.length > 0) {
        newTotalSaved = calculateSavedAmount(filteredCartItems);
      } else if (
        typeof filteredCartItems === "object" &&
        filteredCartItems !== null
      ) {
        newTotalSaved = calculateSavedAmount(filteredCartItems);
      }
    } else {
      if (Array.isArray(cartCacheData) && cartCacheData.length > 0) {
        newTotalSaved = calculateSavedAmount(cartCacheData);
      } else if (typeof cartCacheData === "object" && cartCacheData !== null) {
        newTotalSaved = calculateSavedAmount(cartCacheData);
      }
    }

    setTotalSaved(newTotalSaved);
  }, [cartItems, cartCacheData, user?.token]);

  // calculate total actual price os
  useEffect(() => {
    let newTotalActualPrice;
    const calculateActualTotalprice = (items) => {
      if (!Array.isArray(items)) {
        items = [items]; // Convert object to array if necessary
      }
      return items?.reduce((total, item) => {
        if (item?.compare_at_price) {
          // Remove commas from price strings and parse them to numbers
          const comparePrice = Number(item?.compare_at_price.replace(/,/g, ""));
          // Check if parsed numbers are valid
          if (!isNaN(comparePrice)) {
            // const savedAmount = comparePrice - unitPrice;
            return total + comparePrice;
          }
        }
        return total;
      }, 0);
    };

    if (user?.token) {
      if (Array.isArray(filteredCartItems) && filteredCartItems.length > 0) {
        newTotalActualPrice = calculateActualTotalprice(filteredCartItems);
      } else if (
        typeof filteredCartItems === "object" &&
        filteredCartItems !== null
      ) {
        newTotalActualPrice = calculateActualTotalprice(filteredCartItems);
      }
    } else {
      if (Array.isArray(cartCacheData) && cartCacheData.length > 0) {
        newTotalActualPrice = calculateActualTotalprice(cartCacheData);
      } else if (typeof cartCacheData === "object" && cartCacheData !== null) {
        newTotalActualPrice = calculateActualTotalprice(cartCacheData);
      }
    }

    setTotalActualPrice(newTotalActualPrice);
  }, [cartItems, cartCacheData, user?.token]);

  useEffect(() => {
    let newTotalActualPrice;
    const calculateActualTotalprice = (items) => {
      if (!Array.isArray(items)) {
        items = [items]; // Convert object to array if necessary
      }
      return items?.reduce((total, item) => {
        if (item?.compare_at_price) {
          // Remove commas from price strings and parse them to numbers
          const comparePrice = Number(item.compare_at_price.replace(/,/g, ""));
          const unitPrice = Number(item.unit_price.replace(/,/g, ""));
          // Check if parsed numbers are valid
          if (!isNaN(comparePrice) && !isNaN(unitPrice)) {
            // If compare_at_price is less than unit_price, add unit_price
            if (comparePrice < unitPrice) {
              return total + unitPrice;
            }
            // Otherwise, add compare_at_price
            return total + comparePrice;
          }
        }
        return total;
      }, 0);
    };

    if (user?.token) {
      if (Array.isArray(filteredCartItems) && filteredCartItems.length > 0) {
        newTotalActualPrice = calculateActualTotalprice(filteredCartItems);
      } else if (
        typeof filteredCartItems === "object" &&
        filteredCartItems !== null
      ) {
        newTotalActualPrice = calculateActualTotalprice(filteredCartItems);
      }
    } else {
      if (Array.isArray(cartCacheData) && cartCacheData.length > 0) {
        newTotalActualPrice = calculateActualTotalprice(cartCacheData);
      } else if (typeof cartCacheData === "object" && cartCacheData !== null) {
        newTotalActualPrice = calculateActualTotalprice(cartCacheData);
      }
    }

    setTotalActualPrice(newTotalActualPrice);
  }, [cartItems, cartCacheData, user?.token]);

  useEffect(() => {
    if (filteredCartItems && filteredCartItems.length > 0) {
      if (
        filteredCartItems[0]?.comingsoon === "NO" &&
        filteredCartItems[0]?.seller_type === "PREMIUM" &&
        filteredCartItems[0]?.comingsoon_date
      ) {
        setComingsoon(filteredCartItems[0].comingsoon === "NO");
      }
    }
  }, [cartItems]);

  //delete  product
  const handleDeleteItem = (productid) => {
    removeFromCart(productid);
    setCartItems(cartItems.filter((item) => item.id !== productid));
  };

  //redirect to tab
  useEffect(() => {
    if (queryParams?.isRetry) {
      reff.current = true;
      // setActiveOrderTab("order-tab-3");
    }
  }, [queryParams]);

  useEffect(() => {
    let productid = [];
    if (filteredCartItems?.length) {
      productid = filteredCartItems?.map((item) => item?.productid);
    } else {
      if (Array.isArray(cartCacheData) && cartCacheData?.length) {
        productid = cartCacheData.map(
          (item) => item?.productid || item?.product_id
        );
      } else if (typeof cartCacheData === "object" && cartCacheData !== null) {
        productid = [cartCacheData.productid || cartCacheData.product_id];
      }
    }
    // Ensure productid has valid data before making the API call
    if (!productid.length) {
      return;
    }

    const fetchRelatedNumbers = async () => {
      try {
        const response = await fetch(
          `${apiUrl}/web/related/numbers?ids=${productid.join(",")}`
        );
        const data = await response.json();
        setRelatedNumbers(data.data);
        setNumber(data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchRelatedNumbers();
  }, [cartItems, cartCacheData]);

  // add products in cart items
  const handleAddToCart = (item, index) => {
    if (!checkUser()) {
      const cartCacheSavedData = JSON.parse(
        localStorage.getItem("cartCacheSavedData")
      );
      const isItemAlreadyInCart = cartCacheSavedData?.some(
        (cartItem) => cartItem?.number === item?.number
      );
      if (!isItemAlreadyInCart) {
        const updatedCartCacheData = [...cartCacheSavedData, item];
        const items = updatedCartCacheData.map((product) => ({
          product_id: product?.productid
            ? product?.productid
            : product?.product_id,
          number: parseInt(product.number),
          item_loc: "cart",
        }));

        const updatedCartCache = {
          items,
          number: items.map((item) => item.number).join(),
          product_id: items.map((item) => item.product_id).join(),
        };

        // Update the localStorage with new data
        localStorage.setItem(
          "cartCacheSavedData",
          JSON.stringify(updatedCartCacheData)
        );
        localStorage.setItem(
          "cartCacheNumber",
          JSON.stringify(updatedCartCache)
        );
        setCartCacheData(updatedCartCacheData);
        setCartCache(updatedCartCache);
        toast.success("Item added to cart successfully!");
      } else {
        toast.success("Item already in cart!");
      }
    } else {
      if (!item.alreadyInCart) {
        addToCart({ ...item, product_id: item?.productid, tag: "stay" });
        const updatedItem = { ...item, alreadyInCart: true };
        const updatedNumbers = [...relatedNumbers];
        updatedNumbers[index] = updatedItem;
        setRelatedNumbers(updatedNumbers);
      } else {
        toast.warn("Already moved to cart!", "Warning");
      }
    }
  };

  // check products in cart items
  useEffect(() => {
    const updatedNumbers = relatedNumbers.map((item) => ({
      ...item,
      alreadyInCart: false,
    }));
    setRelatedNumbers(updatedNumbers);
  }, []);

  const handleApplyCoupon = async (coupon) => {
    if (isApplyingCoupon) return; // Prevent multiple clicks
    setIsApplyingCoupon(true);
    setAmountPay(true);
    try {
      const response = await axios.post(`${apiUrl}/web/discount/coupon`, {
        coupon_code: coupon,
        detail: filteredCartItems.map((item) => ({
          number: item.productname,
          amount: item.unit_price,
        })),
      });
      if (response.data.status === "success") {
        // Coupon is valid
        toast.success(response.data.message);
        setTotalDiscount(response.data.data.total_discount || 0);
        setDiscountValue(response.data.data.discount_value);
        setCouponCode(response.data.data.coupon_code);
      } else {
        // Coupon is invalid
        toast.error(response.data.message);
        setIsApplyingCoupon(false);
        setCouponCode("");
      }
    } catch (error) {
      console.error("Error applying coupon:", error);
      toast.error("Error applying coupon. Please try again later.");
      setIsApplyingCoupon(false);
      setCouponCode("");
    } finally {
      setAmountPay(false);
    }
  };

  // Calculate newTotal based on user selections
  let newTotal = 0;
  const calculateNewTotal = () => {
    let updatedTotal = parseFloat(total);
    if (Number.isFinite(totalDiscount) && totalDiscount > 0) {
      // Subtract the total discount first if a coupon is applied
      updatedTotal -= totalDiscount;
    }
    // Now subtract the wallet balance
    if (Number.isFinite(walletInput) && walletInput > 0) {
      updatedTotal -= Math.min(updatedTotal, walletInput);
    }
    return updatedTotal;
  };
  newTotal = calculateNewTotal();
  // product total zero condition os
  useEffect(() => {
    setIsTotalAmountZero(newTotal);
  }, [newTotal]);

  //user profile code
  useEffect(() => {
    if (user?.token) {
      getProfile(user?.token)?.then((res) => {
        setProfile(res);
        setUserProfile(res);
        const address = res?.address || {};
        const fullName = `${res?.firstname || ""} ${
          res?.lastname || ""
        }`.trim(); // Remove leading/trailing spaces from the full name
        setFormData((prevState) => ({
          ...prevState,
          first_name: res?.firstname || "",
          last_name: res?.lastname || "",
          mobile_number: res?.mobile || "",
          primary_email: res?.email || "",
          postal_code: address?.zip_code || "",
          amount: filteredCartItems
            ?.reduce((total, item) => total + parseInt(item.unit_price), 0)
            .toString(),
          billing_address: address?.address || "",
          original_amount: filteredCartItems
            ?.reduce((total, item) => total + parseInt(item.unit_price), 0)
            .toString(),
          city: address?.city || "",
          district: res?.contact_cf?.district || "",
          state: address?.state || "",
          seller_id: "2",
          number_for_display: filteredCartItems
            ?.map((item) => item.productname)
            .join(","),
          requested_number: filteredCartItems
            ?.map((item) => item.number)
            .join(","),
          full_name: fullName,
        }));
        setPrevFormData((prevState) => ({
          ...prevState,
          first_name: res?.firstname || "",
          last_name: res?.lastname || "",
          mobile_number: res?.mobile || "",
          primary_email: res?.email || "",
          postal_code: address?.zip_code || "",
          amount: filteredCartItems
            ?.reduce((total, item) => total + parseInt(item.unit_price), 0)
            .toString(),
          billing_address: address?.address || "",
          original_amount: filteredCartItems
            ?.reduce((total, item) => total + parseInt(item.unit_price), 0)
            .toString(),
          city: address?.city || "",
          district: res?.contact_cf?.district || "",
          state: address?.state || "",
          seller_id: "2",
          number_for_display: filteredCartItems
            ?.map((item) => item.productname)
            .join(","),
          requested_number: filteredCartItems
            ?.map((item) => item.number)
            .join(","),
          full_name: fullName,
        }));
        setApiHit(true);
        if (!res.address?.city && !res?.contact_cf?.district) {
          setDisplayProfile(true);
        }
      });
      setPdp(false);
    }
  }, [user]);

  //create lead  rendom data for ORDERID
  useEffect(() => {
    const storedReferId = localStorage.getItem("referId");
    if (storedReferId) {
      setReferId(storedReferId);
    }
  }, [formData, profile?.contactid]);

  //payload data for create and update leads
  const payload = {
    requested_numbers: formData?.requested_number,
    order_status: "Created",
    seller_id: "",
    // order_id: orderIds,
    success: false,
    first_name: userProfile?.firstname,
    last_name:
      userProfile?.lastname === undefined ||
      userProfile?.lastname === "undefined" ||
      ""
        ? ""
        : userProfile?.lastname,
    mobile_number: userProfile?.mobile,
    primary_email: userProfile?.email,
    postal_code: userProfile?.address?.zip_code,
    amount:
      newTotal - Math.min(newTotal, wBalance) >= 500000
        ? 100000
        : newTotal - Math.min(newTotal, wBalance),
    billing_address: userProfile?.address?.address,
    original_amount: formData?.original_amount,
    city: userProfile?.address?.city,
    district: userProfile?.contact_cf?.district,
    state: userProfile?.address?.state,
    payment_status:
      newTotal - Math.min(newTotal, wBalance) === 0 ? "Payment Received" : "",
    number_for_display: formData?.number_for_display,
    coupon_code: totalDiscount > 0 ? couponCode : "",
    discount_value: discountValue,
    discount_type: "Amount",
    total_discount: totalDiscount,
    // lead_page: productRtpDate ? "coming soon" : "",
    lead_page: isChecked ? "Home Delivery" : comingsoon ? "coming soon" : "Paynow",
    lead_action:
      newTotal - Math.min(newTotal, wBalance) === 0 ? "Payment Received" : "",
    // wallet_money_used: walletInput > 0 ? walletInput : "",
    wallet_money_used: Math.min(newTotal, wBalance),
    contactid: contactid,
    ...(referId && { refer_id: referId === "undefined" ? "" : referId }),
  };

  const placeOrderData = {
    requested_numbers: formData?.requested_number,
    order_status: "Created",
    seller_id: "",
    success: false,
    first_name: userProfile?.firstname,
    last_name:
      userProfile?.lastname === undefined ||
      userProfile?.lastname === "undefined" ||
      ""
        ? ""
        : userProfile?.lastname,
    mobile_number: userProfile?.mobile,
    primary_email: userProfile?.email,
    postal_code: userProfile?.address?.zip_code,
    amount:
      newTotal - Math.min(newTotal, wBalance) >= 500000
        ? 100000
        : newTotal - Math.min(newTotal, wBalance),
    billing_address: userProfile?.address?.address,
    original_amount: formData?.original_amount,
    city: userProfile?.address?.city,
    district: userProfile?.contact_cf?.district,
    state: userProfile?.address?.state,
    payment_status: "",
    number_for_display: formData?.number_for_display,
    coupon_code: totalDiscount > 0 ? couponCode : "",
    discount_value: discountValue,
    discount_type: "Amount",
    total_discount: totalDiscount,
    lead_page: isChecked ? "Home Delivery" : comingsoon ? "coming soon" : "Paynow",
    lead_action: "",
    wallet_money_used: Math.min(newTotal, wBalance),
    contactid: contactid,
    ...(referId && { refer_id: referId === "undefined" ? "" : referId }),
  };
  const leadHittedAuto = async () => {
    try {
      await axios.post(
        `${apiUrl}/web/lead/custom_create`,
        {
          requested_numbers: formData?.requested_number,
          order_status: "Created",
          seller_id: "",
          order_id: "",
          success: false,
          first_name: formData?.first_name ? formData?.first_name : "Loged-In",
          last_name:
            !formData?.last_name || formData?.last_name.trim() === ""
              ? ""
              : formData?.last_name,
          mobile_number: formData?.mobile_number,
          primary_email: formData?.primary_email,
          postal_code: formData?.postal_code,
          amount: newTotal,
          billing_address: formData?.billing_address,
          original_amount: formData?.original_amount,
          city: formData?.city,
          district: formData?.district,
          state: formData?.state,
          payment_status: "",
          number_for_display: formData?.number_for_display,
          coupon_code: "",
          discount_value: 0,
          discount_type: "Amount",
          total_discount: "",
          lead_page: comingsoon ? "coming soon" : "address",
          lead_action: "",
          wallet_money_used: 0,
          contactid: contactid,
          ...(referId && { refer_id: referId === "undefined" ? "" : referId }),
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
      setLeadUpdate(false);
      // snap-chat checkout event triggred...........
      const userEmail = formData?.primary_email || ""; // or use some logic to fetch the user email
      const userPhoneNumber = formData?.mobile_number || ""; // or use some logic to fetch the user phone number
      const userHashedEmail = formData?.primary_email || ""; // Ensure to hash email if required
      const userHashedPhoneNumber = formData?.mobile_number || ""; // Ensure to hash phone number if required
      const uuidC1 = formData?.mobile_number; // Implement a function to generate a UUID if not available
      // Assuming `dataSet.items` holds the cart items
      const itemIds = formData.contactid;
      const numberItems = formData.number_for_display;
      // Prepare the necessary data for SnapChat
      const price = formData.newTotal; // Function to calculate total price of cart
      const currency = "INR"; // Set the correct currency if needed
      snaptr("track", "START_CHECKOUT", {
        price: price,
        currency: currency,
        item_ids: itemIds,
        item_category: "checkout", // Replace with actual category if required
        number_items: numberItems,
        uuid_c1: uuidC1,
        user_email: userEmail,
        user_phone_number: userPhoneNumber,
        user_hashed_email: userHashedEmail,
        user_hashed_phone_number: userHashedPhoneNumber,
        firstname: formData.first_name || "",
      });
    } catch (error) {
      console.error("Error while sending lead data:", error);
      setLeadUpdate(false);
    }
  };
  useEffect(() => {
    // if (hasCalledAPI) return;
    // Check if all necessary fields are filled
    const isFormComplete =
      formData.first_name &&
      formData.mobile_number &&
      formData.primary_email &&
      formData.postal_code &&
      formData.billing_address &&
      formData.city &&
      // formData.district &&
      formData.number_for_display &&
      formData.requested_number;
    // formData.state;

    // Check if all optional fields
    const isAllOptionalFields =
      formData.mobile_number &&
      formData.number_for_display &&
      formData.requested_number;

    if ((isFormComplete || isAllOptionalFields) && leadUpdate) {
      // if ((isFormComplete || isAllOptionalFields) && apiHit) {
      leadHittedAuto();
      // setHasCalledAPI(true);
      setApiHit(false);
    }
  }, [
    // formData.first_name,
    // formData.mobile_number,
    // formData.primary_email,
    // formData.postal_code,
    // formData.billing_address,
    // formData.city,
    // formData.district,
    // formData.number_for_display,
    // formData.requested_number,
    // formData.state,
    // apiHit,
    // hasCalledAPI,
    leadUpdate,
  ]);

  const fetchPostOffices = async (zipCode) => {
    try {
      const response = await axios.get(
        `https://api.postalpincode.in/pincode/${zipCode}`
      );
      const { PostOffice } = response.data[0];
      const postOffices = PostOffice.map((postOffice) => postOffice.Name);
      const district = PostOffice[0].District;
      const state = PostOffice[0].State;
      setPostOffices(postOffices);
      setFormData((prevState) => ({
        ...prevState,
        city: prevState.city || postOffices[0] || "",
        district: district || "",
        state: state || "",
        postal_code: zipCode,
      }));
    } catch (error) {
      console.error(error);
    }
  };
  const handleZipCodeChange = (zipCode) => {
    setFormData((prevState) => ({
      ...prevState,
      postal_code: zipCode,
    }));
    if (zipCode.length === 6) {
      fetchPostOffices(zipCode);
    }
  };

  useEffect(() => {
    if (formData.postal_code.length === 6) {
      fetchPostOffices(formData.postal_code);
    }
  }, [formData.postal_code]);
  //input data changed for user profile
  const handleChange = (e) => {
    const { name } = e.target;
    if (name === "full_name") {
      setError((prevState) => ({
        ...prevState,
        first_name: "",
      }));
    } else {
      setError((prevState) => ({
        ...prevState,
        [name]: "",
        allFields: "",
      }));
    }

    if (name === "full_name") {
      const fullName = e.target.value;
      const [firstName, lastName] = fullName?.trim()?.split(" ");
      setFormData((prevState) => ({
        ...prevState,
        first_name: firstName,
        last_name: lastName === undefined ? "" : lastName,
        full_name: fullName,
      }));
    } else if (name === "mobile_number") {
      // Remove spaces from the phone number
      const phoneNumber = e.target.value.replace(/\s/g, "");
      // Remove the starting values "+91", "00", and "0" from the phone number
      const cleanedPhoneNumber = phoneNumber.replace(/^(\+91|00|0)/, "");
      setFormData((prevState) => ({
        ...prevState,
        mobile_number: cleanedPhoneNumber,
      }));
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
    setApiHit(false);
  };

  //send data in payload to server  profile
  useEffect(() => {
    let count = 0;
    const productnames = [];
    const number_for_display = [];
    filteredCartItems?.forEach((res) => {
      count = count + parseFloat(res?.unit_price) || 0;
      productnames.push(res?.productname);
      number_for_display.push(res?.number_for_display);
    });
    if (isChecked) {
      setTotal(deliveryCharges * totalCharge);
    } else {
      setTotal(count);
    }
    setFormData((prevState) => ({
      ...prevState,
      amount: count.toString(),
      original_amount: count.toString(),
      number_for_display: productnames.join(","),
      requested_number: productnames.join(","),
    }));
  }, [cartItems, addToWishList, isChecked]);

  // Payment Integration code
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
    script.onload = async () => {};
    return () => {
      document.body.removeChild(script);
    };
  }, [user]);
  // phone pay integration code....
  const handlePhonePay = async (orderId) => {
    setPayNowLoading(true);
    const token = user?.token; // get the user's token data
    const walletMoneyUsed = Math.min(newTotal, wBalance);
    const orderData =
      deliveryCharges > 0
        ? {
            charge: deliveryCharges * totalCharge,
            postal_code: userProfile?.address?.zip_code,
            order_id: orderId,
            wallet_money_used: walletMoneyUsed,
            requested_numbers: filteredCartItems
              ?.map((item) => item.productid)
              .join(","),
          }
        : {
            currency: "INR",
            requested_numbers: filteredCartItems
              ?.map((item) => item.productid)
              .join(","),
            wallet_money_used: walletMoneyUsed,
            coupon_code: isApplyingCoupon ? couponCode : "",
            order_id: orderId,
          };

    await phonePayOrder(orderData, token)
      .then((res) => {
        // Check if redirectUrl is available
        if (res.data.redirectUrl) {
          const redirectUrl = res.data.redirectUrl;
          const merchantOrderId = res.data.merchantOrderId;
          // Open the URL in a new window
          // window.open(redirectUrl, "_blank");
          function paymentCallback(response) {
            if (response === "USER_CANCEL") {
              // Router.push("/payment-declined");
              window.PhonePeCheckout.closePage();
            } else if (response === "CONCLUDED") {
              fetch(
                `${apiUrl}/web/payment/verifypaymentstatus`,
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    merchantOrderId: merchantOrderId,
                  }),
                }
              )
                .then((res) => res.json())
                .then((data) => {
                  if (data.state === "PENDING" || data.state === "FAILED") {
                    Router.push("/payment-declined");
                  } else if (data.state === "COMPLETED") {
                    Router.push("/thank-you");
                  }
                })
                .catch((err) => {
                  console.error("API Error:", err);
                });
            }
          }
          if (window.PhonePeCheckout && window.PhonePeCheckout.transact) {
            window.PhonePeCheckout.transact({
              tokenUrl: redirectUrl,
              callback: paymentCallback,
              type: "IFRAME",
            });
          } else {
            alert("PhonePeCheckout is not available.");
          }
        } else {
          console.error("Redirect URL is not available.");
          setPayNowLoading(false);
        }
      })
      .catch((err) => {
        console.error("Error while processing payment:", err);
        toast.error("Please try again");
        setPayNowLoading(false);
      })
      .finally(() => {
        setPayNowLoading(false);
      });
  };

  // Payment Integration code
  async function handleRzpClick(newOrderId) {
    if (isSubmitting) return;
    setIsSubmitting(true);
    const token = user?.token; // get the user's token data
    const walletMoneyUsed = Math.min(newTotal, wBalance);
    const orderData =
      deliveryCharges > 0
        ? {
            charge: deliveryCharges * totalCharge,
            postal_code: userProfile?.address?.zip_code,
            wallet_money_used: walletMoneyUsed,
            requested_numbers: filteredCartItems
              ?.map((item) => item.productid)
              .join(","),
          }
        : {
            currency: "INR",
            requested_numbers: filteredCartItems
              ?.map((item) => item.productid)
              .join(","),
            wallet_money_used: walletMoneyUsed,
            coupon_code: isApplyingCoupon ? couponCode : "",
          };
    // // Check if the cart amount is more than 5000/-
    const isCartAmountGreaterThan5000 = newTotal > 5000;
    // Set the "upi" method based on the condition
    const method = {
      upi: !isCartAmountGreaterThan5000, // Set "upi" to false if amount > 5000
    };

    await getOrderId(orderData, token)
      .then((res) => {
        if (res?.data?.status === "success") {
          setPayNowLoading(false);
          // Create Razorpay options for the payment form
          const options = {
            key: "rzp_live_mMfqxRhCpzrpog",
            name: "VIP NUMBER SHOP",
            description: "Payment for VIP Mobile Number",
            image: `${panelImg}/assets/img/vip-images/VIP-icon-2_iyiaaj.webp`,
            order_id: res?.data?.data?.order_id,
            handler: function (response) {
              ajaxRequest(response, false, newOrderId);
            },
            prefill: {
              name: formData.first_name + " " + formData.last_name,
              email: formData.primary_email,
              contact: formData.mobile_number,
            },
            notes: {
              address: formData.billing_address,
            },
            theme: {
              color: "#3399cc",
            },
            method: method,
          };
          const rzp1 = new window.Razorpay(options);
          rzp1.on("payment.failed", function (response) {
            ajaxRequest(response, true, newOrderId);
          });
          rzp1 && rzp1.open();
        } else {
          console.error("Failed to create order", res?.data?.message);
          toast.error("Something went wrong...");
          setPayNowLoading(false);
        }
      })
      .catch(() => {
        setIsSubmitting(false);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  }
  // Payment Integration code
  function ajaxRequest(response, orderdeclined, newOrderId) {
    let data;
    let leadPayload = {};
    if (response.error) {
      data = {
        payment_status: 0,
        amount: newTotal,
        user_id: 613,
        razorpay_payment_id: response.error.metadata.payment_id,
        razorpay_order_id: response.error.metadata.order_id,
        error_code: response.error.code,
        error_description: response.error.description,
        error_source: response.error.source,
        error_step: response.error.step,
        error_reason: response.error.reason,
      };
      leadPayload.payment_status = "failed";
      leadPayload.payment_id = response.error.metadata.payment_id; // Add payment_id to leadPayload
    } else {
      data = {
        payment_status: 1,
        amount: newTotal,
        user_id: 613,
        razorpay_payment_id: response.razorpay_payment_id,
        razorpay_order_id: response.razorpay_order_id,
        razorpay_signature: response.razorpay_signature,
        card_id: filteredCartItems?.map((cart) => cart?.cart_id)?.join(),
      };
      leadPayload.payment_status = "success";
      leadPayload.payment_id = response.razorpay_payment_id; // Add payment_id to leadPayload

      const trackingData = {
        event: "purchase", // Custom event name for GTM
        items: data,
        page_location: window.location.href,
        page_referrer: "https://www.vipnumbershop.com/",
        page_title: document.title,
        currency: "INR",
        value: newTotal,
        transaction_id: response.razorpay_payment_id,
      };
      // Push the structured data to the dataLayer
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push(trackingData);
    }
    const token = user?.token; // get the user's token data
    const orderId =
      response.razorpay_order_id || response.error.metadata.order_id;
    fetch(`${apiUrl}/web/transaction/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // use the user's token data
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          // Response is successful
          response.json().then((data) => {
            axios.post(
              `${apiUrl}/web/lead/update`,
              {
                order_id: newOrderId,
                ...leadPayload,
                success: orderdeclined,
                lead_action: "Payment Received",
              },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            if (orderdeclined) {
              localStorage.setItem("vipDeclined", true);
              // Router.push("/payment-declined?orderId=" + orderId);
              window.location.href = "/payment-declined?orderId=" + orderId;
              setLeadHitting(true);
            } else {
              toast.success("Transaction successful");
              toast.success("Your Order Placed is  successfully");
              localStorage.setItem("vipthankyou", true);
              Router.push("/thank-you?count=" + filteredCartItems?.length);
              setCartItems([]);
              setLeadHitting(true);
            }
          });
        } else {
          // Response is not successful
          response.json().then((data) => {
            toast.error(data.message);
            localStorage.setItem("vipDeclined", true);
            Router.push("/payment-declined");
            console.error(data);
          });
        }
      })
      .catch((error) => console.error(error));
  }

  const debounce = (func) => {
    let timer;
    return function (...args) {
      const context = this;
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        func.apply(context, args);
      }, 500);
    };
  };
  const optimizedFn = useCallback(debounce(handleZipCodeChange), []);

  //If Product is already sold, then  remove it from cart
  const isProductnameAvailable = filteredCartItems?.every(
    (item) => item.productname !== undefined
  );
  if (!isProductnameAvailable) {
    const itemsToRemove = filteredCartItems?.filter(
      (item) => item.productname === undefined
    );
    itemsToRemove?.forEach((item) => removeFromCart(item.id));
    return null;
  }

  const checkValidations = () => {
    let isValid = true;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (
      !formData.first_name.trim() ||
      formData.full_name === formData.mobile_number
    ) {
      setError((prevState) => ({
        ...prevState,
        first_name: "Name is required",
      }));
      isValid = false;
    } else {
      setError((prevState) => ({
        ...prevState,
        first_name: "",
      }));
    }

    if (!formData.primary_email.trim()) {
      setError((prevState) => ({
        ...prevState,
        primary_email: "Email address is required",
      }));
      isValid = false;
    } else if (!emailRegex.test(formData.primary_email)) {
      setError((prevState) => ({
        ...prevState,
        primary_email: "Invalid email address",
      }));
      isValid = false;
    } else {
      setError((prevState) => ({
        ...prevState,
        primary_email: "",
      }));
    }

    if (formData.postal_code.length === 0) {
      setError((prevState) => ({
        ...prevState,
        postal_code: "Postal code is required",
      }));
      isValid = false;
    } else if (formData.postal_code.length < 6) {
      setError((prevState) => ({
        ...prevState,
        postal_code: "Postal code should be 6 digits",
      }));
      isValid = false;
    } else {
      setError((prevState) => ({
        ...prevState,
        postal_code: "",
      }));
    }

    if (!formData.billing_address.trim()) {
      setError((prevState) => ({
        ...prevState,
        billing_address: "Billing address is required",
      }));
      isValid = false;
    } else {
      setError((prevState) => ({
        ...prevState,
        billing_address: "",
      }));
    }

    if (!formData.city.trim()) {
      setError((prevState) => ({
        ...prevState,
        city: "City is required",
      }));
      isValid = false;
    } else {
      setError((prevState) => ({
        ...prevState,
        city: "",
      }));
    }

    // if (!formData.district.trim()) {
    //   setError((prevState) => ({
    //     ...prevState,
    //     district: "District is required",
    //   }));
    //   isValid = false;
    // } else {
    //   setError((prevState) => ({
    //     ...prevState,
    //     district: "",
    //   }));
    // }

    // if (!formData.state.trim()) {
    //   setError((prevState) => ({
    //     ...prevState,
    //     state: "State is required",
    //   }));
    //   isValid = false;
    // } else {
    //   setError((prevState) => ({
    //     ...prevState,
    //     state: "",
    //   }));
    // }

    if (
      !formData.first_name.trim() ||
      !formData.mobile_number.trim() ||
      !formData.primary_email.trim() ||
      !formData.postal_code.trim() ||
      !formData.billing_address.trim() ||
      !formData.city.trim()
      // !formData.district.trim() ||
      // !formData.state.trim()
    ) {
      setError((prevState) => ({
        ...prevState,
        allFields: "Complete the fields above",
      }));
      isValid = false;
    } else {
      setError((prevState) => ({
        ...prevState,
        allFields: "",
      }));
    }

    return { isValid };
  };

  const generateRandomOrderId = (contactId) => {
    let randomDigits = "";
    for (let i = 0; i < 8; i++) {
      randomDigits += Math.floor(Math.random() * 10);
    }
    return `ORD_${contactId}_${randomDigits}_${new Date().getTime()}`;
  };

  // handle paynow button
  const handlePayNow = async (isConfirmed) => {
    const form = document.querySelector("form");
    form.reportValidity(); // Triggers browser's validation and shows messages
    const invalidNames = [
      "loged-in",
      "loged in",
      "missed call",
      "call me back",
      "vip",
      "undefined",
      "null",
      "-",
    ];
    // This pattern disallows any special characters, quotes, and symbols, allowing only letters, spaces, and hyphens
    const invalidCharPattern = /[^a-zA-Z\s-]/;

    const nameToCheck = formData?.full_name?.toLowerCase().trim();

    if (
      !nameToCheck ||
      invalidNames.includes(nameToCheck) ||
      invalidCharPattern.test(formData?.full_name)
    ) {
      toast.error(`Enter Correct Name`);
      setDisplayProfile(true);
      document
        .getElementById("auto-focus")
        .scrollIntoView({ behavior: "smooth" });
      document.getElementById("auto-focus-name")?.focus();
      return;
    }
    const { isValid } = checkValidations();

    const element = document.querySelector(".OrderPlacement-section-os");
    if (!isValid) {
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      setDisplayProfile(true);
      return;
    }
    const newOrderId = generateRandomOrderId(contactid);
    setOrderIds(newOrderId);
    if (gatewayName !== "PhonePe") {
      setPayNowLoading(true);
    }
    if (newTotal - Math.min(newTotal, wBalance) >= 500000) {
      showModal();
    } else if (
      total !== wBalance &&
      newTotal - Math.min(newTotal, wBalance) !== 0
    ) {
      if (gatewayName === "PhonePe") {
        // Call handlePhonePay() and wait for it to complete
        handlePhonePay(newOrderId);
      } else {
        await handleRzpClick(newOrderId);
      }
    }

    if (newOrderId && formData) {
      setNameUpdate(true);
      if (gatewayName !== "PhonePe") {
        setPayNowLoading(false);
      }
      if (newTotal - Math.min(newTotal, wBalance) === 0) {
        if (isConfirmed) {
          await axios.post(
            `${apiUrl}/web/lead/update`,
            {
              order_id: orderIds,
              ...payload,
              success: false,
              payment_status: "success",
            },
            {
              headers: {
                Authorization: `Bearer ${user.token}`,
              },
            }
          );
          const trackingData = {
            event: "purchase", // Custom event name for GTM
            items: payload,
            page_location: window.location.href,
            page_referrer: "https://www.vipnumbershop.com/",
            page_title: document.title,
            currency: "INR",
            value: newTotal,
            transaction_id: orderIds,
          };
          // Push the structured data to the dataLayer
          window.dataLayer = window.dataLayer || [];
          window.dataLayer.push(trackingData);
          toast.success("Your Order Placed is  successfully");
          localStorage.setItem("vipthankyou", true);
          Router.push("/thank-you?count=" + filteredCartItems?.length);
        } else {
          setPlaceOrder(true);
          // leadHittedAuto();
          await axios.post(
            `${apiUrl}/web/lead/custom_create`,
            {
              ...placeOrderData,
              order_id: newOrderId, // Use the new random order ID in payload
            },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user?.token}`,
              },
            }
          );
          return;
        }
      }
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      if (!isConfirmed) {
        await axios.post(
          `${apiUrl}/web/lead/custom_create`,
          {
            ...payload,
            order_id: newOrderId, // Use the new random order ID in payload
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user?.token}`,
            },
          }
        );
      }
      setIsApplyingCoupon(false);
      setCouponCode("");
      setDiscountValue(0);
      setTotalDiscount(0);
    } else {
      // If the API response is not successful, show error message
      toast.error(
        "Oops! There's been some error, please try again after sometime."
      );
    }
  };

  const headingStyle = {
    color: " var(--primary) ",
  };
  const goBack = () => {
    // Go back to the previous page
    window.history.back();
    // Delay scrolling to the top to ensure the navigation completes
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0);
  };

  //delete cache product os
  const handleDeleteCacheItem = (productId) => {
    if (!user?.token) {
      const cartCacheSavedData = JSON.parse(
        localStorage.getItem("cartCacheSavedData")
      );

      const filterCartCacheData = cartCacheSavedData.filter(
        (items) =>
          items.product_id !== productId && items.productid !== productId
      );

      const items = filterCartCacheData.map((product) => ({
        product_id: product?.productid
          ? product?.productid
          : product?.product_id,
        number: parseInt(product.number),
        item_loc: "cart",
      }));

      const updatedCartCache = {
        items,
        number: items.map((item) => item.number).join(),
        product_id: items.map((item) => item.product_id).join(),
      };
      // Update the localStorage with new data
      localStorage.setItem(
        "cartCacheSavedData",
        JSON.stringify(filterCartCacheData)
      );
      localStorage.setItem("cartCacheNumber", JSON.stringify(updatedCartCache));
      setCartCacheData(filterCartCacheData);
      setCartCache(updatedCartCache);
      toast.info("Item deleted successfully!");
    }
  };
  const formatDate = (inputDate) => {
    if (!inputDate) return ""; // Return empty string if inputDate is empty or undefined
    const date = new Date(inputDate);
    if (isNaN(date)) return ""; // Return empty string if the date is invalid
    const options = { day: "numeric", month: "short", year: "numeric" };
    return date.toLocaleDateString("en-GB", options);
  };

  const handleCondition = (event) => {
    setTermCondition(event.target.checked);
  };
  const handleNavigate = () => {
    Router.push("/terms-and-conditions");
  };

  const deliveryCloseModal = () => {
    setDeliveryIsOpen(false);
  };

  const handleCityChange = (e) => {
    const selectedCity = e.target.value;
    if (selectedCity === "Other") {
      setShowOtherCityInput(true);
      setFormData((prevState) => ({
        ...prevState,
        city: otherCity,
      }));
    } else {
      setShowOtherCityInput(false);
      setFormData((prevState) => ({
        ...prevState,
        city: selectedCity,
      }));
    }
  };

  const handleOtherCityChange = (e) => {
    const inputCity = e.target.value;
    setOtherCity(inputCity);
    setFormData((prevState) => ({
      ...prevState,
      city: inputCity,
    }));
  };

  const getRemainingDays = (endDate) => {
    const today = new Date();
    const end = new Date(endDate);
    const diffTime = end - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const handleBlur = () => {
    const form = document.querySelector("form");
    if (form.checkValidity()) {
      // Add your payment logic here
    } else {
      form.reportValidity(); // Triggers validation messages
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const trimmedFullName = formData.full_name?.trim();

    const isFullNameValid =
      trimmedFullName && // Ensure the value is not undefined or empty
      !unwantedNames.includes(trimmedFullName.toLowerCase()) && // Ensure it doesn't match unwanted names
      /^[a-zA-Z\s]+$/.test(trimmedFullName) && // Ensure it contains only letters and spaces
      isNaN(trimmedFullName);
    // Check if all fields are filled
    const formHasChanged =
      formData.full_name !== prevFormData.full_name ||
      formData.mobile_number !== prevFormData.mobile_number ||
      formData.primary_email !== prevFormData.primary_email ||
      formData.postal_code !== prevFormData.postal_code ||
      formData.billing_address !== prevFormData.billing_address ||
      formData.city !== prevFormData.city ||
      formData.district !== prevFormData.district ||
      formData.state !== prevFormData.state;

    const formIsComplete =
      isFullNameValid &&
      formData.first_name &&
      formData.mobile_number &&
      formData.primary_email &&
      formData.postal_code &&
      formData.billing_address &&
      formData.city &&
      formData.district &&
      formData.state;

    // If all fields are complete, set hasCalledAPI to false
    if (formHasChanged && formIsComplete && leadHitting) {
      setApiHit(true);
      setHasCalledAPI(false);
      setPrevFormData({ ...formData });
      setLeadHitting(false);
    }
    // else {
    //   if (!isFullNameValid) {
    //     toast.error(`Enter Correct Name`);
    //   }
    // }
  };
  //amount will be less then 500000 then showing home delivery check..
  const HideDelivery = newTotal - Math.min(newTotal, wBalance) < 500000;

  useEffect(() => {
    const zip = userProfile?.address?.zip_code;
    if (zip) {
      handleSearchClick(zip);
    }
  }, [userProfile?.address?.zip_code]);

  const handleSearchClick = async (location) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_LEAFYMANGO_API_URL}/web/address/search`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${user?.token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ search: location, delivery: "yes" }),
        }
      );
      const data = await response.json();
      setResponseData(data.result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleproceed = () => {
    setShow(false);
    if (gatewayName === "PhonePe") {
      handlePhonePay(orderIds);
    } else {
      handleRzpClick(orderIds);
    }
  };
  useEffect(() => {
    if (wBalance > 0 && isChecked) {
      setFinalAmount(formData?.original_amount);
    } else {
      setFinalAmount(formData?.original_amount - wBalance);
    }
  }, [wBalance, isChecked]);
  return (
    <>
      {skeleton ? (
        <div className="my-3">
          <div className="container-os ">
            <div className="">
              <div className="animate-pulse">
                <div className="flex items-center md:mb-4 mb-2  justify-center">
                  <div className="flex gap-4 md:flex-col justify-center items-center flex-row">
                    <div className="h-6 w-36 bg-gray-200 rounded "></div>
                    <div className="h-6 w-32 bg-gray-200 rounded "></div>
                  </div>
                </div>
                <form className="animate-pulse">
                  <div className="flex justify-between flex-wrap md:flex-row flex-col-reverse ">
                    <div className="lg:w-[65%] w-full">
                      <div className="mb-4">
                        <div className="h-8 w-2/6 bg-gray-200 rounded mb-4"></div>
                        <div className="flex gap-2 flex-col">
                          <div className="md:h-32 h-16 bg-gray-200 rounded"></div>

                          <div className="md:h-32 h-16 bg-gray-200 rounded"></div>
                        </div>
                        <div className="flex justify-end mt-4 animate-pulse">
                          <button className="h-12 md:w-32 w-full bg-gray-200 rounded"></button>
                        </div>
                      </div>
                    </div>
                    <div className="lg:w-[30%] w-full">
                      <div className="flex justify-center flex-col w-full">
                        <div className="full">
                          <div className="w-full md:p-2 p-2 border border-gray-300 rounded-lg my-1 animate-pulse">
                            <div className="flex flex-col">
                              <div className="flex justify-between items-center">
                                <div className="h-4 w-32 bg-gray-300 rounded-md mb-1"></div>
                                <button className="cursor-pointer text-center bg-gray-300 rounded-md h-[21px] w-[21px]"></button>
                              </div>
                              <div className="h-4 w-48 bg-gray-300 rounded-md mt-2"></div>
                            </div>
                          </div>

                          <div className="w-full md:p-2 p-2 border border-gray-300 rounded-lg my-1 animate-pulse">
                            <div className="flex flex-col">
                              <div className="flex justify-between items-center">
                                <div className="h-4 w-32 bg-gray-300 rounded-md mb-1"></div>

                                <button className="cursor-pointer text-center bg-gray-300 rounded-md h-[21px] w-[21px]"></button>
                              </div>
                            </div>
                          </div>

                          <div className="w-full md:p-2 p-2 border border-gray-300 rounded-lg my-1 animate-pulse">
                            <div className="flex flex-col">
                              <div className="flex justify-between items-center">
                                <div className="h-4 w-32 bg-gray-300 rounded-md mb-1"></div>

                                <button className="cursor-pointer text-center bg-gray-300 rounded-md h-[21px] w-[21px]"></button>
                              </div>
                              <div className="md:block hidden">
                                <div className="h-4 w-48 bg-gray-300 rounded-md md:mt-2 nt-1"></div>
                                <div className="h-4  bg-gray-300 rounded-md mt-1"></div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="h-[28px] w-40 bg-gray-300 rounded-md mb-1 md:hidden block"></div>
                        <div className="">
                          <div className="animate-pulse">
                            <div className="md:h-32 h-16 bg-gray-200 rounded mb-2"></div>
                          </div>
                        </div>
                        <div className="h-32 bg-gray-200 rounded p-4 flex justify-center w-full ">
                          <div className="flex flex-col gap-2 items-center justify-center">
                            <div className="h-4 w-40 bg-gray-300 rounded-md mb-1"></div>
                            <div className="h-4 w-32 bg-gray-300 rounded-md mb-1"></div>
                            <div className="h-3 w-[200px] bg-gray-300 rounded-md mb-1"></div>
                          </div>
                        </div>

                        <div className="h-8 w-full bg-gray-200 rounded my-2"></div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <Link href="/">
              <AiFillHome className="md:hidden block" />
            </Link>
          </div>
        </div>
      ) : (
        <section className="OrderPlacement-section-os" id="auto-focus">
          <div className="container-os">
            <div>
              <div className="flex justify-between py-2 items-center md:justify-center">
                <div className="checkout-arrow-goBack-os">
                  <Link href="" onClick={goBack}>
                    <IoArrowBackCircleOutline fontSize={30} />
                  </Link>
                </div>
                <div className="flex gap-2 md:flex-col">
                  <Link href="/">
                    <MainHeading
                      MainHeading="VIP NUMBER SHOP"
                      style={headingStyle}
                    />
                  </Link>
                  <MainHeading MainHeading="Since 2007" />
                </div>
                <Link href="/">
                  <AiFillHome className="md:hidden block" />
                </Link>
              </div>
              <div className="md:hidden block">
                <div className="w-full md:p-2 p-2  border-[1px] border-[#58447f99] rounded-[10px] my-1 mobile">
                  <div className="flex flex-col">
                    <div className="flex justify-between items-center">
                      <div className="flex flex-col">
                        <h3 className="lg:text-[18px] text-[14px] font-medium  md:text-[26px] md:leading-[20px] md:font-bold sm:text-[17px] sm:leading-[30px] sm:font-bold text-left text-darktext undefined">
                          Address{" "}
                        </h3>
                        {userProfile?.address?.address && (
                          <p className="text-[#0A0A0A] lg:text-[16px] text-[14px] font-normal  capitalize">
                            {`${userProfile?.address?.address}, ${userProfile?.address?.city}, ${userProfile?.address?.state}, ${userProfile?.address?.zip_code}`}
                          </p>
                        )}
                      </div>

                      <div>
                        <div className="flex flex-row-reverse ">
                          <button
                            className="  cursor-pointer text-center md:text-[16px] leading-5 bg-primary  rounded-md text-white lg:p-[6px] font-normal  p-1  text-[13px]  hover:bg-secondary  hover:text-darktext flex items-center justify-between gap-1"
                            type="button"
                            onClick={() => setDisplayProfile(true)}
                          >
                            <FaRegEdit />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {coupons.length > 0 && user && (
                  <div className="w-full md:p-2 p-2  border-[1px] border-[#58447f99] rounded-[10px] my-1 mobile">
                    <>
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium">Coupon</h3>
                        <button
                          className="  cursor-pointer text-center md:text-[16px] leading-5 bg-primary  rounded-md text-white lg:p-[6px] font-normal  p-1  text-[13px]  hover:bg-secondary  hover:text-darktext flex items-center justify-between gap-1"
                          type="button"
                          onClick={() => setShowCoupon(true)}
                        >
                          <FaRegEdit />
                        </button>
                      </div>
                      {couponCode && (
                        <p className="text-[#0A0A0A] mt-[2px]">
                          <span className="text-red-600">{couponCode}</span>{" "}
                          Applied
                        </p>
                      )}
                    </>
                  </div>
                )}
              </div>
              <form
                onSubmit={() => {}}
                className="OrderPlacement-tab-all-contents-row-os"
              >
                {displayProfile && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="discount_popup">
                      <div className="container-os">
                        <div className="discount_code-live">
                          <UserProfile
                            activeOrderTab={activeOrderTab}
                            user={user}
                            unwantedNames={unwantedNames}
                            formData={formData}
                            handleChange={handleChange}
                            handleBlur={handleBlur}
                            ref={ref}
                            error={error}
                            setFormData={setFormData}
                            optimizedFn={optimizedFn}
                            setError={setError}
                            showOtherCityInput={showOtherCityInput}
                            postOffices={postOffices}
                            handleCityChange={handleCityChange}
                            handleOtherCityChange={handleOtherCityChange}
                            setDisplayProfile={setDisplayProfile}
                            setNameUpdate={setNameUpdate}
                            checkValidations={checkValidations}
                            setLeadUpdate={setLeadUpdate}
                            userProfile={userProfile}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div
                  className={`OrderPlacement-orderSummary-content-main-row-os ${
                    activeOrderTab === "order-tab-1"
                      ? "OrderPlacement-content-os active"
                      : "OrderPlacement-content-os"
                  }`}
                >
                  <div className="OrderPlacement-orderSummary-content-row-os">
                    <div className="OrderPlacement-orderSummary-content-col-2-os-gk">
                      {cartItems.length !== 0 ? (
                        <CardCollection
                          cardCollectionTitle="Cart details"
                          currentItems={cartItems.filter(
                            (item) => item.tag === "new"
                          )}
                          cardEdit={"cardEdit"}
                          handleAddToCart={handleAddToCart}
                          formatDate={formatDate}
                          removeFromWishList={handleDeleteItem}
                        />
                      ) : null}
                      <OrderPlacementQuestions />
                    </div>
                    <div className="OrderPlacement-orderSummary-content-col-1-os">
                      <div className="md:block hidden">
                        <div className="w-full md:p-2 p-2  border-[1px] border-[#58447f99] rounded-[10px] my-1">
                          <div className="flex flex-col">
                            <div className="flex justify-between items-center">
                              <div className="flex flex-col">
                                <h3 className="font-medium">Address </h3>
                                {userProfile?.address?.address && (
                                  <p className="text-[#0A0A0A] lg:text-[16px] text-[14px] font-normal  capitalize">
                                    {`${userProfile?.address?.address}, ${userProfile?.address?.city}, ${userProfile?.address?.state}, ${userProfile?.address?.zip_code}`}
                                  </p>
                                )}
                              </div>

                              <div>
                                <div className="flex flex-row-reverse ">
                                  <button
                                    className=" cursor-pointer text-center md:text-[16px] leading-5 bg-primary  rounded-md text-white lg:p-[6px] font-normal  p-1  text-[13px]  hover:bg-secondary  hover:text-darktext flex items-center justify-between gap-1"
                                    type="button"
                                    onClick={() => setDisplayProfile(true)}
                                  >
                                    <FaRegEdit />
                                  </button>
                                </div>
                              </div>
                            </div>
                            {coupons.length > 0 && user && (
                              <>
                                <div className="flex justify-between items-center">
                                  <h3 className="lg:text-[18px] text-[14px] font-medium  md:text-[26px] md:leading-[20px] md:font-bold sm:text-[17px] sm:leading-[30px] sm:font-bold text-left text-darktext undefined">
                                    Coupon
                                  </h3>
                                  <button
                                    className="  cursor-pointer text-center md:text-[16px] leading-5 bg-primary  rounded-md text-white lg:p-[6px] font-normal  p-1  text-[13px]  hover:bg-secondary  hover:text-darktext flex items-center justify-between gap-1"
                                    type="button"
                                    onClick={() => setShowCoupon(true)}
                                  >
                                    <FaRegEdit />
                                  </button>
                                </div>
                                {couponCode && (
                                  <p className="text-[#0A0A0A] mt-[2px]">
                                    <span className="text-green-600">
                                      {couponCode}
                                    </span>{" "}
                                    Applied
                                  </p>
                                )}
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="w-full md:p-2 p-2  border-[1px] border-[#58447f99] rounded-[10px] my-1">
                        {coupons.length > 0 && user && showCoupon && (
                          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                            <div className="discount_popup">
                              <div className="container-os">
                                <div className="discount_code-live">
                                  <AllCoupons
                                    handleAccordion={handleAccordion}
                                    setCouponCode={setCouponCode}
                                    activeAccordion={activeAccordion}
                                    coupons={coupons}
                                    getRemainingDays={getRemainingDays}
                                    setIsApplyingCoupon={setIsApplyingCoupon}
                                    handleApplyCoupon={handleApplyCoupon}
                                    isApplyingCoupon={isApplyingCoupon}
                                    setShowCoupon={setShowCoupon}
                                    setIsChecked={setIsChecked}
                                    setDeliveryCharges={setDeliveryCharges}
                                    couponCode={couponCode}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                        <div className="">
                          <div className="lg:text-[18px] text-primary font-semibold cursor-pointer text-left pb-1">
                            Order Summary
                          </div>

                          <div className="flex justify-between items-center pb-1 ">
                            <span className="text-sm font-medium md:text-lg">
                              Cart Amount
                            </span>
                            {user?.token ? (
                              <span className="text-sm font-medium md:text-lg">
                                &#8377;
                                {filteredCartItems?.length > 0
                                  ? Math.round(
                                      parseFloat(totalActualPrice)
                                    ).toLocaleString("en-IN")
                                  : 0}
                              </span>
                            ) : (
                              <span>
                                &#8377;
                                {cartCacheData?.length > 0
                                  ? Math.round(
                                      parseFloat(totalActualPrice)
                                    ).toLocaleString("en-IN")
                                  : 0}
                              </span>
                            )}
                          </div>
                          <div className=" font-medium text-[17px] leading-[20px]  flex items-center justify-between pb-1">
                            <div className="flex gap-1 items-center">
                              <span className="text-sm font-medium md:text-lg">
                                Discount
                              </span>
                              <FaCheckCircle color="#067d62" />
                              <span className="text-[#067d62] text-sm font-medium md:text-lg">
                                You saved
                              </span>
                            </div>

                            <span className="text-[#067d62] text-sm font-medium md:text-lg">
                              - &#8377;
                              {totalSaved
                                ? parseInt(totalSaved).toLocaleString("en-IN")
                                : 0}
                            </span>
                          </div>
                          {totalDiscount > 0 && (
                            <div className="OrderPlacement-product-price-os">
                              <span className="OrderPlacement-saved-text">
                                Coupon Applied
                              </span>
                              <span className="OrderPlacement-saved-amount">
                                - &#8377;
                                {parseFloat(totalDiscount).toLocaleString(
                                  "en-IN"
                                )}
                              </span>
                            </div>
                          )}
                          <div className="">
                            <div className="flex items-center gap-2 mb-3">
                              {/* Custom Ripple Checkbox */}
                              <label
                                className="relative flex cursor-pointer items-center rounded-full"
                                htmlFor="ripple-on"
                                data-ripple-dark="true"
                              >
                                <input
                                  id="ripple-on"
                                  type="checkbox"
                                  className="peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-gray-400 shadow-md transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-10 before:w-10 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-gray-500 before:opacity-0 before:transition-opacity checked:border-primary checked:bg-primary checked:before:bg-gray-400 hover:before:opacity-10"
                                  checked={termCondition}
                                  onChange={handleCondition}
                                />
                                <span className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-3.5 w-3.5"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    stroke="currentColor"
                                    strokeWidth="1"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                      clipRule="evenodd"
                                    ></path>
                                  </svg>
                                </span>
                              </label>
                              {/* Terms and Conditions Text */}
                              <span className=" text-gray-700 italic cursor-pointer text-[11px] md:text-[13px]">
                                I agree with the{" "}
                                <span
                                  className=" cursor-pointer text-primary underline"
                                  onClick={handleNavigate}
                                >
                                  Terms and Conditions
                                </span>
                                ,{" "}
                                <span
                                  className=" cursor-pointer text-primary underline"
                                  onClick={() => Router.push("/refund-policy")}
                                >
                                  Refund Policy
                                </span>{" "}
                                and{" "}
                                <span
                                  className=" cursor-pointer text-primary underline"
                                  onClick={() => Router.push("/privacy-policy")}
                                >
                                  Privacy Policy
                                </span>
                                .
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="md:py-2 py-2 ">
                        <div className="bg-lightprimery text-darktext md:p-5 p-3 rounded-xl ">
                          <div className="text-sm ">
                            <div className="text-center space-y-2 ">
                              <h3 className="font-medium">
                                {" "}
                                Don't worry About Anything{``}
                              </h3>
                              <p>
                                After payment, a dedicated Account Manager will
                                call you for full Help/Support/Guidance till
                                activation
                              </p>
                              <span>
                                📲✅ (Working Hours: 10:00 AM to 6:00 PM)
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* home delivery process.. */}
                      {responseData?.length > 0 &&
                        responseData[0]?.cf_2913 !== "" &&
                        !couponCode &&
                        total > 0 && (
                          <>
                            {HideDelivery && (
                              <HomeDelivery
                                isChecked={isChecked}
                                handleCheckboxChange={handleCheckboxChange}
                                charge={parseInt(responseData[0]?.cf_2913)}
                                setDeliveryIsOpen={setDeliveryIsOpen}
                                filteredCartItems={filteredCartItems}
                                comingSoonData={comingSoonData}
                              />
                            )}
                          </>
                        )}
                      <div className="relative">
                        <div className="bottom-[0px] left-0 right-0 bg-white py-2 z-10 md:static fixed md:p-0 p-3 rounded-[5px_5px_5px_5px] shadow-[2px_-1px_18px_11px_#b5b1b14f] md:shadow-none">
                          <div className="flex flex-col md:gap-1 gap-1 border-[#3161616] md:py-2 py-1">
                            <div className="flex justify-between pb-1 items-center">
                              <span className="text-sm font-medium md:text-lg">
                                Sub Total
                              </span>
                              {user?.token ? (
                                <span className="text-sm font-medium md:text-lg">
                                  &#8377;
                                  {filteredCartItems?.length > 0
                                    ? parseFloat(total).toLocaleString("en-IN")
                                    : 0}
                                </span>
                              ) : (
                                <span>
                                  &#8377;
                                  {cartCacheData?.length > 0
                                    ? cartCacheTotolPrice.toLocaleString(
                                        "en-IN"
                                      )
                                    : 0}
                                </span>
                              )}
                            </div>
                            {coupon_code !== 0 && (
                              <div className="flex items-center space-x-2  ">
                                <label
                                  className="relative flex cursor-pointer items-center rounded-full p-1"
                                  htmlFor="wallet-balance"
                                  data-ripple-dark="true"
                                >
                                  <input
                                    id="wallet-balance"
                                    type="checkbox"
                                    checked={wBalance > 0}
                                    onChange={(e) => {
                                      if (e.target.checked) {
                                        setWalletBalance(true); // Call this when checking
                                      } else {
                                        setWBalance(0); // Call this when unchecking
                                      }
                                    }}
                                    className="peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-gray-400 shadow-md transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-10 before:w-10 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-gray-500 before:opacity-0 before:transition-opacity checked:border-primary checked:bg-primary checked:before:bg-gray-400 hover:before:opacity-10"
                                  />
                                  <span className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      className="h-3.5 w-3.5"
                                      viewBox="0 0 20 20"
                                      fill="currentColor"
                                      stroke="currentColor"
                                      strokeWidth="1"
                                    >
                                      <path
                                        fillRule="evenodd"
                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                        clipRule="evenodd"
                                      ></path>
                                    </svg>
                                  </span>
                                </label>
                                <label
                                  htmlFor="wallet-balance"
                                  className="text-gray-700 italic cursor-pointer text-[14px]"
                                >
                                  {walletBalance ? (
                                    <span className="dot-loader ml-2 flex">
                                      <span className="dot animate-bounce delay-0 bg-primary h-2 w-2 rounded-full"></span>
                                      <span className="dot animate-bounce delay-200 bg-primary h-2 w-2 rounded-full mx-1"></span>
                                      <span className="dot animate-bounce delay-400 bg-primary h-2 w-2 rounded-full"></span>
                                    </span>
                                  ) : (
                                    "User Wallet Balance"
                                  )}
                                </label>
                              </div>
                            )}
                            {wBalance > 0 && (
                              <div className="flex justify-between text-primary font-medium">
                                <span className="text-sm font-medium md:text-lg">
                                  Wallet Balance (
                                  {user?.token && (
                                    <span>
                                      &#8377;
                                      {wBalance || 0} /-
                                    </span>
                                  )}
                                  )
                                </span>
                                {user?.token && (
                                  <span>
                                    - &#8377;
                                    {Math.min(newTotal, wBalance)}
                                  </span>
                                )}
                              </div>
                            )}
                            <div className="flex items-center justify-between border-y border-[#3161616] md:py-2 py-1">
                              <span className="text-sm font-medium md:text-lg">
                                Grand Total
                              </span>
                              {user?.token ? (
                                <span className="font-medium ">
                                  &#8377;
                                  {filteredCartItems?.length > 0
                                    ? (
                                        newTotal - Math.min(newTotal, wBalance)
                                      ).toLocaleString("en-IN")
                                    : 0}
                                </span>
                              ) : (
                                <span>
                                  &#8377;
                                  {cartCacheData?.length > 0
                                    ? cartCacheTotolPrice.toLocaleString(
                                        "en-IN"
                                      )
                                    : 0}
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="flex flex-col">
                            {isChecked && (
                              <span className="text-gray-700 italic cursor-pointer text-[14px]">
                                Rupee &#8377;{finalAmount}
                                /- will be paid on delivery!
                              </span>
                            )}
                            {/* {newTotal - Math.min(newTotal, wBalance) > 0 && (
                              <span className="text-red-700 italic cursor-pointer text-[13px]">
                                Select Payment method...
                              </span>
                            )} */}
                          </div>
                          <div className=" flex justify-between gap-1 md:pb-10">
                            {newTotal - Math.min(newTotal, wBalance) > 0 &&
                              !payNowLoading && (
                                <PaymentGate
                                  paySelected={paySelected}
                                  setPaySelected={setPaySelected}
                                  setGatewayName={setGatewayName}
                                  payment={
                                    newTotal - Math.min(newTotal, wBalance)
                                  }
                                />
                              )}
                            <button
                              ref={payNowButtonRef}
                              type="button"
                              className={`  text-white flex items-center justify-center gap-2 p-2 px-4  rounded-xl  bg-[#82bc29] w-[100%]  ${
                                isButtonInView ? "" : ""
                              }`}
                              onClick={() => {
                                if (isTotalAmountZero > 0) {
                                  handlePayNow();
                                } else if (isTotalAmountZero === 0 && !user) {
                                  setError((prevState) => ({
                                    ...prevState,
                                    allFields: "Please fill your details.",
                                  }));
                                  document
                                    .getElementById("user_number_focus")
                                    .focus();
                                } else if (isTotalAmountZero === 0) {
                                  setError((prevState) => ({
                                    ...prevState,
                                    allFields:
                                      "Cart is empty! Please add a product into cart",
                                  }));
                                }
                              }}
                              disabled={
                                payNowLoading || !termCondition || amountPay
                              }
                              aria-label="pay_now_position"
                            >
                              {/* {newTotal - Math.min(newTotal, wBalance) === 0
                                ? "Place Order"
                                : isTotalAmountZero > 0 && !payNowLoading
                                ? "Pay now"
                                : isTotalAmountZero === 0 && !payNowLoading
                                ? "Pay now"
                                : "Loading..."} */}
                              {newTotal - Math.min(newTotal, wBalance) === 0
                                ? "Place Order"
                                : isTotalAmountZero > 0 && !payNowLoading
                                ? deliveryCharges > 0 &&
                                  newTotal - Math.min(newTotal, wBalance) !== 0
                                  ? `Pay ₹${
                                      newTotal - Math.min(newTotal, wBalance)
                                    } /-`
                                  : "Pay now"
                                : isTotalAmountZero === 0 && !payNowLoading
                                ? "Pay now"
                                : "Loading..."}
                            </button>
                          </div>
                        </div>
                      </div>
                      {/* <div className="OrderPlacement-paymentInfo-submit-buttons-row-os">
                     <button
                       type="button"
                       onClick={() => Router.push("/")}
                       className="OrderPlacement-paymentInfo-previous-os back-button-hide-rs"
                       aria-label="Back"
                     >
                       Back
                     </button>
                     <button
                       ref={payNowButtonRef}
                       type="button"
                       className={`OrderPlacement-paymentInfo-submit-button-os ${
                         isButtonInView ? "pay_now_position" : ""
                       }`}
                       onClick={() => {
                         if (isTotalAmountZero > 0) {
                           handlePayNow();
                         } else if (isTotalAmountZero === 0 && !user) {
                           setError((prevState) => ({
                             ...prevState,
                             allFields: "Please fill your details.",
                           }));
                           document.getElementById("user_number_focus").focus();
                         } else if (isTotalAmountZero === 0) {
                           setError((prevState) => ({
                             ...prevState,
                             allFields:
                               "Cart is empty! Please add a product into cart",
                           }));
                         }
                       }}
                       disabled={payNowLoading || !termCondition || amountPay}
                       aria-label="pay_now_position"
                     >
                       {newTotal - Math.min(newTotal, wBalance) === 0
                         ? "Place Order"
                         : isTotalAmountZero > 0 && !payNowLoading
                         ? "Pay now"
                         : isTotalAmountZero === 0 && !payNowLoading
                         ? "Pay now"
                         : "Loading..."}
                     </button>
                   </div> */}
                    </div>
                  </div>
                </div>
                <div
                  className={`OrderPlacement-paymentInfo-content-main-row-os payment-radio-buttons-os"
                 ? "OrderPlacement-content-os active"
                 : "OrderPlacement-content-os"
                 }`}
                >
                  <div className="OrderPlacement-paymentInfo-content-row-os">
                    {placeOrder && (
                      <div className="modal-rs display-block">
                        <section className="modal-main">
                          {!orderLoading ? (
                            <>
                              {/* Hide the close button and Confirm button when loading */}
                              <button
                                onClick={() => setPlaceOrder(false)}
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
                                  <circle
                                    cx="26.5"
                                    cy="26.5"
                                    r="26.5"
                                    fill="#D80027"
                                  ></circle>
                                  <path
                                    d="M20.9132 15.5879L26.4994 23.9516L32.0857 15.5879H35.6768L28.3349 26.3947L35.8524 37.4114H32.2293L26.4994 28.8829L20.7696 37.4114H17.1465L24.664 26.3947L17.3221 15.5879H20.9132Z"
                                    fill="#EFEFEF"
                                  ></path>
                                </svg>
                              </button>
                              <p>
                                Your order is almost complete! Click 'Confirm'
                                to finalise your purchase. We appreciate your
                                trust and look forward to serving you!
                              </p>
                              <div
                                className="OrderPlacement-paymentInfo-submit-buttons-row-os"
                                style={{ justifyContent: "center" }}
                              >
                                <button
                                  type="button"
                                  className="OrderPlacement-paymentInfo-submit-button-os"
                                  onClick={() => {
                                    setOrderLoading(true);
                                    setTimeout(() => {
                                      handlePayNow(true);
                                      setOrderLoading(false);
                                      setPlaceOrder(false);
                                    }, 8000);
                                  }}
                                  aria-label="Confirm"
                                >
                                  Confirm
                                </button>
                              </div>
                            </>
                          ) : (
                            <>
                              <p>
                                Your order is in progress! We’re preparing
                                everything for you. Please hold tight, and we’ll
                                notify you once it’s ready.
                              </p>
                              <div style={loaderStyle}>
                                <ThreeDots
                                  height="80"
                                  width="80"
                                  radius="9"
                                  color="blue"
                                  aria-label="three-dots-loading"
                                  visible={true}
                                />
                              </div>
                            </>
                          )}
                        </section>
                      </div>
                    )}
                    {show ? (
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
                              <circle
                                cx="26.5"
                                cy="26.5"
                                r="26.5"
                                fill="#D80027"
                              ></circle>
                              <path
                                d="M20.9132 15.5879L26.4994 23.9516L32.0857 15.5879H35.6768L28.3349 26.3947L35.8524 37.4114H32.2293L26.4994 28.8829L20.7696 37.4114H17.1465L24.664 26.3947L17.3221 15.5879H20.9132Z"
                                fill="#EFEFEF"
                              ></path>
                            </svg>
                          </button>
                          <p>
                            Pay ₹1 Lakh now to book your number(s). Our team
                            will contact you soon for the remaining payment and
                            delivery.
                          </p>
                          <p>Thank You</p>
                          <div
                            className="OrderPlacement-paymentInfo-submit-buttons-row-os"
                            style={{ justifyContent: "center" }}
                          >
                            <button
                              type="button"
                              onClick={() => handleproceed()}
                              className="OrderPlacement-paymentInfo-submit-button-os"
                              aria-label="Proceed"
                            >
                              Proceed
                            </button>
                          </div>
                        </section>
                      </div>
                    ) : (
                      ""
                    )}
                    {deliveryIsOpen && (
                      <DeliveryGuide
                        deliveryCloseModal={deliveryCloseModal}
                        amount={parseInt(responseData[0]?.cf_2913)}
                        district={responseData[0]?.cf_2861}
                        filteredCartItems={filteredCartItems}
                      />
                    )}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default OrderPlacementTabs;
