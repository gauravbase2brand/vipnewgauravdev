import React, { useState, useRef } from "react";
import "./BuyNowData.css";
import "../blogs/BlogsNumber.css";
import { useContext } from "react";
import { AppStateContext } from "../contexts/AppStateContext/AppStateContext";
import { useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import { getOrderId, getProfile } from "../Services/Services";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useCallback } from "react";
import { useGetQueryParams } from "../utils";
import MainHeading from "../Shared/MainHeading/MainHeading";
import { ThreeDots } from "react-loader-spinner";
import CardCollection from "../place-order/CardCollection";
import UserProfile from "../place-order/OrderPlacementTabs/UserProfile";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import AllCoupons from "../place-order/OrderPlacementTabs/AllCoupons";
import { GoArrowRight } from "react-icons/go";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { AiFillHome } from "react-icons/ai";
import OrderPlacementQuestions from "../place-order/OrderPlacementQuestions";

const BuyNowData = () => {
  const { queryParams } = useGetQueryParams();
  const pathname =usePathname();
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
    wishListItem,
    removeFromWishList,
    setWishList,
    wishList,
    displayProfile,
    setDisplayProfile,
    skeleton,userProfile
  } = useContext(AppStateContext);
  const filteredCartItems = cartItems.filter((item) => item.tag === "new");
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
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [isButtonInView, setIsButtonInView] = useState(false);
  const payNowButtonRef = useRef(null);
  const [showCoupon, setShowCoupon] = useState(false);
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
      handleRzpClick();
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

  //Pagination.....
  const totalPages = Math.ceil(relatedNumbers.length / itemsPerPage);
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = relatedNumbers.slice(indexOfFirstItem, indexOfLastItem);

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
      } else {
        // Coupon is invalid
        toast.error(response.data.message);
        setIsApplyingCoupon(false);
      }
    } catch (error) {
      console.error("Error applying coupon:", error);
      toast.error("Error applying coupon. Please try again later.");
      setIsApplyingCoupon(false);
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
    first_name: formData?.first_name,
    last_name:
      formData?.last_name === undefined ||
      formData?.last_name === "undefined" ||
      ""
        ? ""
        : formData?.last_name,
    mobile_number: formData?.mobile_number,
    primary_email: formData?.primary_email,
    postal_code: formData?.postal_code,
    // amount: testedAmount,
    amount:
      newTotal - Math.min(newTotal, wBalance) >= 500000
        ? 100000
        : newTotal - Math.min(newTotal, wBalance),
    billing_address: formData?.billing_address,
    original_amount: formData?.original_amount,
    city: formData?.city,
    district: formData?.district,
    state: formData?.state,
    payment_status:
      newTotal - Math.min(newTotal, wBalance) === 0 ? "Payment Received" : "",
    number_for_display: formData?.number_for_display,
    coupon_code: totalDiscount > 0 ? couponCode : "",
    discount_value: discountValue,
    discount_type: "Amount",
    total_discount: totalDiscount,
    // lead_page: productRtpDate ? "coming soon" : "",
    lead_page: comingsoon ? "coming soon" : "",
    lead_action:
      newTotal - Math.min(newTotal, wBalance) === 0 ? "Payment Received" : "",
    // wallet_money_used: walletInput > 0 ? walletInput : "",
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
          discount_value: "",
          discount_type: "Amount",
          total_discount: "",
          lead_page: comingsoon ? "coming soon" : "detail",
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
    }
  };
  useEffect(() => {
    if (hasCalledAPI) return;
    // Check if all necessary fields are filled
    const isFormComplete =
      formData.first_name &&
      formData.mobile_number &&
      formData.primary_email &&
      formData.postal_code &&
      formData.billing_address &&
      formData.city &&
      formData.district &&
      formData.number_for_display &&
      formData.requested_number &&
      formData.state;

    // Check if all optional fields
    const isAllOptionalFields =
      formData.mobile_number &&
      formData.number_for_display &&
      formData.requested_number;

    if ((isFormComplete || isAllOptionalFields) && apiHit) {
      leadHittedAuto();
      setHasCalledAPI(true);
      setApiHit(false);
    }
  }, [
    formData.first_name,
    formData.mobile_number,
    formData.primary_email,
    formData.postal_code,
    formData.billing_address,
    formData.city,
    formData.district,
    formData.number_for_display,
    formData.requested_number,
    formData.state,
    apiHit,
    hasCalledAPI,
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
    setTotal(count);
    setFormData((prevState) => ({
      ...prevState,
      amount: count.toString(),
      original_amount: count.toString(),
      number_for_display: productnames.join(","),
      requested_number: productnames.join(","),
    }));
  }, [cartItems, addToWishList]);

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

  // Payment Integration code
  async function handleRzpClick(newOrderId) {
    if (isSubmitting) return;
    setIsSubmitting(true);
    const token = user?.token; // get the user's token data
    const walletMoneyUsed = Math.min(newTotal, wBalance);
    const orderData = {
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

    if (!formData.district.trim()) {
      setError((prevState) => ({
        ...prevState,
        district: "District is required",
      }));
      isValid = false;
    } else {
      setError((prevState) => ({
        ...prevState,
        district: "",
      }));
    }

    if (!formData.state.trim()) {
      setError((prevState) => ({
        ...prevState,
        state: "State is required",
      }));
      isValid = false;
    } else {
      setError((prevState) => ({
        ...prevState,
        state: "",
      }));
    }

    if (
      !formData.first_name.trim() ||
      !formData.mobile_number.trim() ||
      !formData.primary_email.trim() ||
      !formData.postal_code.trim() ||
      !formData.billing_address.trim() ||
      !formData.city.trim() ||
      !formData.district.trim() ||
      !formData.state.trim()
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

    const element = document.querySelector("");
    if (!isValid) {
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      setDisplayProfile(true);
      return;
    }
    const newOrderId = generateRandomOrderId(contactid);
    setOrderIds(newOrderId);
    setPayNowLoading(true);
    if (newTotal - Math.min(newTotal, wBalance) >= 500000) {
      showModal();
    } else if (
      total !== wBalance &&
      newTotal - Math.min(newTotal, wBalance) !== 0
    ) {
      await handleRzpClick(newOrderId);
    }

    if (newOrderId && formData) {
      setNameUpdate(true);
      setPayNowLoading(false);
      if (newTotal - Math.min(newTotal, wBalance) === 0) {
        if (isConfirmed) {
          toast.success("Your Order Placed is  successfully");
          localStorage.setItem("vipthankyou", true);
          Router.push("/thank-you?count=" + filteredCartItems?.length);
        } else {
          setPlaceOrder(true);
          leadHittedAuto();
          return;
        }
      }
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
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
    } else {
      if (!isFullNameValid) {
        toast.error(`Enter Correct Name`);
      }
    }
  };

  const handleContinue = () => {
    if (!userProfile?.address?.city && !userProfile?.contact_cf?.district) {
      toast.success("Before proceeding, please fill in your details.");
      setDisplayProfile(true);
    } else {
      Router.push("/place-order");
    }
  };
  return (
    <>
      <section
        className={`${filteredCartItems.length >= 5 ? "h-full" : "h-[760px]"}`}
      >
        <div className="container-os">
          {skeleton ? (
            <>
              <div className="bg-white p-4">
                <div className="animate-pulse">
                  <div className="flex items-center mb-4  justify-center">
                    <div className="flex gap-2 md:flex-col justify-center items-center flex-row">
                      <div className="h-6 w-36 bg-gray-200 rounded "></div>
                      <div className="h-6 w-32 bg-gray-200 rounded "></div>
                    </div>
                  </div>
                  <form className="animate-pulse">
                    <div className="flex justify-between flex-wrap">
                      <div className="lg:w-[65%] w-full">
                        <div className="mb-4">
                          <div className="h-8 w-2/6 bg-gray-200 rounded mb-4"></div>
                          <div className="flex gap-2 flex-col">
                            <div className="md:h-32 h-16 bg-gray-200 rounded"></div>
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
                          <div className="text-center py-2 bg-gray-200 rounded mb-4">
                            <div className="h-6 w-32 bg-gray-200 rounded"></div>
                          </div>
                          <div className="">
                            <div className="animate-pulse">
                              <div className="h-8 w-full bg-gray-200 rounded mb-2"></div>
                              <div className="h-8 w-full bg-gray-200 rounded mb-2"></div>
                              <div className="h-8 w-full bg-gray-200 rounded mb-2"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </>
          ) : (
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
                  <div className="flex justify-between flex-wrap">
                    <div className="lg:w-[65%] w-full">
                      <div>
                        {cartItems.filter((item) => item.tag === "old").length >
                        0 ? (
                          <CardCollection
                            cardCollectionTitle="Cart"
                            cardCount={"cardCount"}
                            currentItems={cartItems.filter(
                              (item) => item.tag === "old"
                            )}
                            handleAddToCart={handleAddToCart}
                            formatDate={formatDate}
                            removeFromWishList={handleDeleteItem}
                            addToWishList={addToWishList}
                          />
                        ) : null}
                        {wishListItem.length !== 0 ? (
                          <CardCollection
                            cardCollectionTitle="WishList"
                            currentItems={wishListItem}
                            cardCount={"cardCount"}
                            handleAddToCart={handleAddToCart}
                            formatDate={formatDate}
                            setWishList={setWishList}
                            removeFromWishList={removeFromWishList}
                            wishList={wishList}
                          />
                        ) : null}
                        {currentItems.length !== 0 ? (
                          <CardCollection
                            cardCollectionTitle="Addon VIP Numbers for Family"
                            cardCount={"cardCount"}
                            currentItems={currentItems}
                            handleAddToCart={handleAddToCart}
                            formatDate={formatDate}
                          />
                        ) : null}
                        <div className="hidden lg:block">
                          <div className="flex justify-end">
                            <button
                              onClick={handleContinue}
                              className="cursor-pointer text-white flex items-center justify-center gap-2 p-2 px-4  rounded-xl  bg-[#82bc29] w-[100%] md:w-fit "
                              disabled={filteredCartItems?.length === 0}
                              type="button"
                            >
                              Continue
                              <GoArrowRight className="transition-transform transform hover:translate-x-2" />
                            </button>
                          </div>
                        <OrderPlacementQuestions/>
                        </div>
                      </div>
                    </div>
                    <div className="lg:w-[30%] w-full ">
                      <div className="flex justify-center flex-col w-full">
                        <div className="text-center text-sm md:text-lg py-2  md:mx-1 my-1 bg-lightprimery  border-[1px] border-[#58447f99] rounded-[10px] ">
                          Cart Details
                        </div>
                        {filteredCartItems?.length === 0 && (
                          <div className="text-center text-sm md:text-lg py-2  md:mx-1 my-1 bg-lightprimery rounded-[10px]">
                            <span>Add a Number in cart to Continue.</span>
                          </div>
                        )}
                        <div className="">
                          {user?.token &&
                            filteredCartItems.length > 0 &&
                            Array.isArray(filteredCartItems) &&
                            filteredCartItems.map((res, index) => (
                              <div
                                key={index}
                                className="p-2 rounded-[10px] mx-2 mb-2 flex  justify-between  bg-lightprimery items-center "
                              >
                                <div>
                                  <span className="lg:text-[20px] text-[15px]  text-center font-bold  pb-1">
                                    {res?.productname}
                                  </span>
                                  <div className="flex gap-2 items-center">
                                    <span className=" md:text-lg font-medium text-[#242424b6] line-through text-sm xs:text-[12px]">
                                      {Math.round(
                                        parseFloat(res.compare_at_price)
                                      ) >
                                        Math.round(
                                          parseFloat(res.unit_price)
                                        ) &&
                                        Math.round(
                                          parseFloat(res.compare_at_price)
                                        ).toLocaleString("en-IN", {
                                          minimumFractionDigits: 0,
                                          maximumFractionDigits: 2,
                                        }) + " /-"}
                                    </span>
                                    <span className="md:text-lg font-semibold text-primary text-sm xs:text-[12px]">
                                      {/* &#8377;{" "} */}
                                      {parseFloat(
                                        res?.unit_price
                                      ).toLocaleString("en-IN", {
                                        minimumFractionDigits: 0,
                                        maximumFractionDigits: 2,
                                      })}
                                      /-
                                    </span>
                                  </div>
                                </div>
                                <div className="OrderPlacement-price-delete-os">
                                  <button
                                    type="button"
                                    className="p-1 px-2 rounded-md"
                                    onClick={() => {
                                      addToCart({ ...res, tag: "old" });
                                      // handleDeleteItem(res.id);
                                      // setCouponCode("");
                                      // setDiscountValue(0);
                                      // setTotalDiscount(0);
                                      // setIsApplyingCoupon(false);
                                      // Remove cartCacheSavedData and cartCacheNumber from local storage
                                      localStorage.removeItem(
                                        "cartCacheSavedData"
                                      );
                                      localStorage.removeItem(
                                        "cartCacheNumber"
                                      );
                                    }}
                                    aria-label="WishListNumber"
                                  >
                                    <FontAwesomeIcon
                                      icon={faTrashAlt}
                                      color="red"
                                    />
                                  </button>
                                </div>
                              </div>
                            ))}
                        </div>
                        {coupons.length > 0 && user && showCoupon && (
                          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                            <div className="discount_popup">
                              <div className="container-os">
                                <div className="discount_code-live">
                                  <AllCoupons
                                    handleAccordion={handleAccordion}
                                    couponCode={couponCode}
                                    setCouponCode={setCouponCode}
                                    activeAccordion={activeAccordion}
                                    coupons={coupons}
                                    getRemainingDays={getRemainingDays}
                                    setIsApplyingCoupon={setIsApplyingCoupon}
                                    handleApplyCoupon={handleApplyCoupon}
                                    isApplyingCoupon={isApplyingCoupon}
                                    setShowCoupon={setShowCoupon}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="block lg:hidden w-full">
                      <div className="flex justify-end md:my-12 my-6">
                        <button
                          onClick={handleContinue}
                          className={`cursor-pointer text-white flex items-center justify-center gap-2 p-2 px-4  rounded-xl   w-[100%] md:w-fit ${
                            filteredCartItems?.length === 0
                              ? "bg-[#b6f78d]"
                              : "bg-[#82bc29]"
                          }`}
                          disabled={filteredCartItems?.length === 0}
                          type="button"
                        >
                          Continue
                          <GoArrowRight className="transition-transform transform hover:translate-x-2" />
                        </button>
                      </div>
                    </div>
                    <div className="block lg:hidden w-full">
                        <OrderPlacementQuestions/>
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
                                    }, 4000);
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
                              onClick={() => {
                                setShow(false);
                                handleRzpClick(orderIds);
                              }}
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
                  </div>
                </div>
              </form>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default BuyNowData;
