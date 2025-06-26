"use client";
import { useEffect } from "react";
import { createContext, useState } from "react";
import {
  deleteCartAndWishList,
  getCart,
  getProfile,
  getWishlist,
  postCart,
  useGetCategories,
} from "../../Services/Services";
import { toast } from "react-toastify";
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";
export const AppStateContext = createContext();

const AppStateContextProvider = ({ children }) => {
  // Handle global level settings. cart, login etc.
  const { data: categoriesData, categoriesById } = useGetCategories();
  const pathName = usePathname();
  const [isWishListed, setIsWishListed] = useState(false);
  const [redirectTo, setRedirectTo] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [wishListItem, setWishListItem] = useState([]);
  const [user, setUserDetails] = useState();
  const [selectedPropduct, setSelectedPropduct] = useState([]);
  const [userloggedIn, setUserLogginedIn] = useState(false);
  const [viewLogin, setViewLogin] = useState(false);
  const [isUserDetailsLoaded, setIsUserDetailsLoaded] = useState(false);
  const [cartCache, setCartCache] = useState();
  const [cartCacheData, setCartCacheData] = useState([]);
  const [userProfile, setUserProfile] = useState();
  const [cartAnimation, setCartAnimation] = useState("");
  const [routeScroll, setRouteScroll] = useState(true);
  const [Seo, setSeo] = useState({});
  const [relatedNumbers, setRelatedNumbers] = useState([]);
  const [currentUrl, setCurrentUrl] = useState("");
  const [deleteClicked, setDeleteClicked] = useState(false);
  const [cartClick, setCartClick] = useState(false);
  const [loadData, setLoadData] = useState(false);
  const [numerologyPop, setNumerologyPop] = useState(false);
  const [discountPop, setDiscountPop] = useState(false);
  const [blogsRoute, setBlogsRoute] = useState(false);
  const [tab, setTab] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [blogId, setBlogId] = useState("");
  const navigate = useRouter();
  const [itemsBeingProcessed, setItemsBeingProcessed] = useState(new Set());
  const [wishList, setWishList] = useState(false);
  const [activeCategoryLink, setActiveCategoryLink] = useState(null);
  const [category, setCategoryId] = useState();
  const [pdp, setPdp] = useState(false);
  const apiUrl = process.env.NEXT_PUBLIC_LEAFYMANGO_API_URL;
  const [nameUpdate, setNameUpdate] = useState(false);
  const [flterHide, setFilterHide] = useState(false);
  const [wBalance, setWBalance] = useState(0);
  const [searchPopup, setSearchPopup] = useState(false);
  const [voucher, setVoucher] = useState([]);
  const [contactData, setContactData] = useState(false);
  const [apiData, setApiData] = useState([]);
  const [loader, SetLoader] = useState(true);
  const [categoryCurrentPage, setCategoryCurrentPage] = useState(1);
  const [fromTab, setFromTab] = useState(false);
  const [footerCat, setFooterCat] = useState();
  const [showPopup, setShowPopup] = useState(false);
  const [catLoader, setCatLoader] = useState(false);
  const [catData, setCatData] = useState([]);
  const [selectedStartWithOption, SetSelectedStartWithOption] = useState([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);
  const [minPrice, setMinPrice] = useState(null); // Minimum price value
  const [maxPrice, setMaxPrice] = useState(null);
  const [numurologyValues, setNewInputValue] = useState({});
  const [inputValues, setInputValues] = useState([]);
  const [selectedPriceOptions, setSelectedPriceOptions] = useState([]);
  const [loaderdata, setLoaderData] = useState(false);
  const [sellers, setSellers] = useState();
  const [coming, setComing] = useState();
  const [walletBalance, setWalletBalance] = useState(false);
  const [checkboxState, setCheckboxState] = useState({
    basicSeller: false, // default 'premium'
    comingSoon: false, // default 'no'
  });
  const [coupon_code, setCoupon_code] = useState(0);
  const [selectedNumbers, setSelectedNumbers] = useState([]);
  const [selectedSubCategories, setSelectedSubCategories] = useState([]);
  const [catFilter, setCatFilter] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [tabCategory, setTabCategory] = useState(false);
  const [subCategoryData, setSubCategoryData] = useState([]);
  const [subCatDetail, setSubCatDetail] = useState();
  const [loaderCat, setLoaderCat] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);
  const [similarLoader, setSimilarLoader] = useState(false);
  const [familyPackValue, setFamilyPackValue] = useState();
  const [catModalOpen, setCatModalOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState(false);
  const [loadmore, setLoadMore] = useState(false);
  const [popupModal, setPopupModal] = useState(false);
  const [resend, setResend] = useState(false);
  const [filters, setFilters] = useState({
    type: "global",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [skeleton, setskeleton] = useState(true);
  const [displayProfile, setDisplayProfile] = useState(false);
  const [profileUpdate, setProfileUpdate] = useState(false);
  const [deliveryIsOpen, setDeliveryIsOpen] = useState(false);
  const [starRating, setStarRating] = useState(0);
  const [openFeed, setOpenFeed] = useState(false);
  // OnClick Handler
  const handleSubCat = async (subCategory) => {
    setSimilarLoader(true);
    setLoaderData(true);
    setCategoryId("");
    const { parentCategoryName, id } = subCategory;

    // Construct query params
    const queryParams = new URLSearchParams({
      category: parentCategoryName,
      id: id,
      seller: "PREMIUM",
      comingsoon: "yes",
      page: 1,
      paginate: 60,
      star_status: true,
    });
    // API URL
    const apiUrl = `${
      process.env.NEXT_PUBLIC_LEAFYMANGO_API_URL
    }/web/categories/search?${queryParams.toString()}`;
    const dynamicApiUrl = `https://leafymango.com/getSubCategoriesDetails.php?id=${id}`;
    try {
      // Hit the API
      const response = await fetch(apiUrl);
      const data = await response.json();
      setApiData(data.data);
      const dynamicResponse = await fetch(dynamicApiUrl);
      const dynamicData = await dynamicResponse.json();
      setSubCatDetail(dynamicData);
      // Update the URL with query parameters
      // navigate.push(`/subcategory?${queryParams.toString()}`);
    } catch (error) {
      console.error("Error hitting the API:", error);
      setSimilarLoader(false);
    } finally {
      setSearchPopup(false);
      setSimilarLoader(false);
    }
  };
  const deliveryCloseModal = () => {
    setDeliveryIsOpen(false);
  };
  // for skeliton code
  useEffect(() => {
    // Simulate an image or content load with a timeout
    const timer = setTimeout(() => {
      setskeleton(false); // stop showing the skeleton loader
    }, 700);

    return () => clearTimeout(timer); // Cleanup the timer on component unmount
  }, []);

  // 404 Page error perticular urls where 404 then redirect to home page
  useEffect(() => {
    // Combine pathname and search parameters to form the full path
    const queryString = window?.location?.search;
    const currentPath = `${window?.location?.pathname}${
      queryString ? queryString : ""
    }`;
    // Define regex patterns to match dynamic URLs
    const patterns = [
      /^\/nosingle\.php\?no=\d+$/,
      /^\/number\/\d+\.html$/,
      /^\/sold_no_feedback\.php\?no=\d+-\d+$/,
      /^\/sold_no_feedback\.php\?no=\d+\s\d+$/,
      /^\/number\/\d+\.html\?verify_code$/,
      /^\/number\/(\d{10})\.html(\?.+)?$/,
      /^\/faq\.php\?loginHere/,
      /^\/sold_no_feedback\.php\?no=/,
    ];
    // Check if the current path matches any of the patterns
    const isDynamicUrl = patterns.some((pattern) => {
      const match = pattern.test(currentPath);
      return match;
    });

    if (isDynamicUrl) {
      window.location.href = "/";
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    setUserDetails(JSON.parse(localStorage.getItem("vipcre")));
    setIsUserDetailsLoaded(true);
  }, []);

  useEffect(() => {
    const requestOptions = {
      method: "GET",
      // headers: { authorization: `Bearer ${user.token}` },
      redirect: "follow",
    };

    fetch(
      `${process.env.NEXT_PUBLIC_LEAFYMANGO_API_URL}/web/discount/coupon/list`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.status === "success") {
          setVoucher(result.data);
        }
      })
      .catch((error) => console.error("Error fetching coupons:", error));
  }, []);

  // set localStorage empty array by default os
  useEffect(() => {
    if (!localStorage.getItem("cartCacheSavedData")) {
      localStorage.setItem("cartCacheSavedData", JSON.stringify([]));
    }
    if (!localStorage.getItem("cartCacheNumber")) {
      localStorage.setItem("cartCacheNumber", JSON.stringify(""));
    }
    const cartCacheNumber = JSON.parse(localStorage.getItem("cartCacheNumber"));
    setCartCache(cartCacheNumber);
    const cartCacheSavedData = JSON.parse(
      localStorage.getItem("cartCacheSavedData")
    );
    setCartCacheData(cartCacheSavedData);
  }, []);

  // useEffect(() => {
  //   axios
  //     .get(`${apiUrl}/web/meta/tags`, {})
  //     .then((response) => {
  //       const obj = {};
  //       response?.data?.data?.map((dta) => {
  //         obj[dta.page] = dta;
  //         return obj;
  //       });
  //       setSeo(obj);
  //     })
  //     .catch((error) => {});
  // }, []);

  useEffect(() => {
    const storedSeo = sessionStorage.getItem("metaTagsData");
    if (storedSeo) {
      // If data exists in sessionStorage, use it
      setSeo(JSON.parse(storedSeo));
    } else {
      // Otherwise, fetch from the API
      axios
        .get(`${apiUrl}/web/meta/tags`)
        .then((response) => {
          const obj = {};
          response?.data?.data?.map((dta) => {
            obj[dta.page] = dta;
            return obj;
          });

          // Store the fetched data in sessionStorage
          sessionStorage.setItem("metaTagsData", JSON.stringify(obj));

          // Set state with the fetched data
          setSeo(obj);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [apiUrl]);

  const checkUser = () => {
    if (!user) {
      setViewLogin(true);
      return false;
    }
    return true;
  };


  
  useEffect(() => {
    if (user?.token) {
      updateCart(() => {});
      updateWishlist(() => {});
      getProfile(
        user?.token,
        setUserDetails,
        setCartItems,
        setWishListItem
      )?.then((res) => {
        const existingVipcre = JSON.parse(localStorage.getItem("vipcre")) || {};
        if (existingVipcre.user) {
          existingVipcre.user.firstname = res?.firstname;
          existingVipcre.user.lastname = res?.lastname;
          existingVipcre.user.email = res?.email;
        }
        localStorage?.setItem("vip_minprice", res?.contact_cf?.user_min_price);
        localStorage?.setItem("vip_maxprice", res?.contact_cf?.user_max_price);
        localStorage?.setItem("referId", res?.contact_cf?.refer_id);
        localStorage?.setItem("my_refer_id", res?.contact_cf?.my_refer_id);
        localStorage?.setItem(
          "vip_hidePopup",
          res?.contact_cf?.user_blocked_price || false
        );
        localStorage.setItem("vipcre", JSON.stringify(existingVipcre));
        setWBalance(parseInt(res?.contact_cf?.wallet_balance));
        setCoupon_code(parseInt(res?.contact_cf?.wallet_balance));
        setUserProfile(res);
        setNameUpdate(false);
        //snap chat............
        snaptr("track", "VIEW_CONTENT", {
          uuid_c1: res?.mobile || "",
          user_email: res?.email || "",
          user_phone_number: res?.mobile || "",
          firstname: res?.firstname || "",
        });
        setProfileUpdate(false);
      });
    }
  }, [user, nameUpdate, profileUpdate,pathName]);

  useEffect(() => {
    if (user?.token && walletBalance) {
      getProfile(user?.token)?.then((res) => {
        setWBalance(parseInt(res?.contact_cf?.wallet_balance));
        setWalletBalance(false);
      });
    }
  }, [walletBalance]);

  const updateWishlist = (fn = () => {}) => {
    if (user?.token) {
      getWishlist(user?.token).then((res) => {
        setWishListItem(res?.data?.items || []);
        fn();
        setWishList(false);
      });
    } else {
      setWishList(false);
    }
  };

  const updateCart = (fn = () => {}, token) => {
    if (user?.token || token) {
      getCart(user?.token || token).then((res) => {
        setCartItems(res);
        fn();
        if (res.length === 0) {
          setCartCacheData([]);
        }
      });
      setCartClick(false);
    }
  };

  const pushToDataLayer = (dataSet) => {
    if (typeof window !== "undefined") {
      const trackingData = {
        event: "add_to_cart",
        items: dataSet,
        page_location: window.location.href,
        page_referrer: "https://www.vipnumbershop.com/",
        page_title: document.title,
        currency: "INR",
        value: dataSet.unit_price,
      };
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push(trackingData);
    }
    // Snap-chat add to cart event triggred...........
    const userEmail = user?.user?.email || ""; // or use some logic to fetch the user email
    const userPhoneNumber = user?.user?.mobile || ""; // or use some logic to fetch the user phone number
    const userHashedEmail = user?.user?.email || ""; // Ensure to hash email if required
    const userHashedPhoneNumber = user?.user?.mobile || ""; // Ensure to hash phone number if required
    const uuidC1 = user?.user?.mobile; // Implement a function to generate a UUID if not available
    // Assuming `dataSet.items` holds the cart items
    const itemIds = dataSet.product_id;
    const numberItems = dataSet.productname;
    // Prepare the necessary data for SnapChat
    const price = dataSet.unit_price; // Function to calculate total price of cart
    const currency = "INR"; // Set the correct currency if needed
    snaptr("track", "ADD_CART", {
      price: price,
      currency: currency,
      item_ids: itemIds,
      item_category: dataSet.seller_type, // Replace with actual category if required
      number_items: numberItems,
      uuid_c1: uuidC1,
      user_email: userEmail,
      user_phone_number: userPhoneNumber,
      user_hashed_email: userHashedEmail,
      user_hashed_phone_number: userHashedPhoneNumber,
      firstname: user?.user?.firstname || "",
    });
    // facebook add to cart event...
    const eventId = crypto.randomUUID(); // Generate a unique event ID
    const eventData = {
      eventName: "AddToCart",
      eventId,
      emails: user?.user?.email || "",
      phones: user?.user?.mobile || "",
      firstName: user?.user?.firstname || "",
      lastName: user?.user?.lastname || "",
      country: "IND",
      userAgent: navigator.userAgent,
      sourceUrl: window.location.href,
      products: [
        {
          sku: dataSet?.product_id?.toString(), // correct productid as SKU
          quantity: 1, // dynamically use item quantity
          item_price: parseFloat(dataSet?.unit_price?.replace(/,/g, "")) || 0,
        },
      ],
      value: dataSet?.unit_price?.replace(/,/g, ""),
      currency: "INR",
    };

    try {
      const response = axios.post("/api/facebook-event", eventData);
    } catch (error) {
      console.error("Error sending Facebook Event:", error);
    }
  };

  const addToCart = (dataSet, fn, token = "") => {
    if (
      typeof dataSet.items === "undefined" ||
      typeof dataSet.items[0] === "undefined"
    ) {
      postCart(
        {
          items: [
            {
              product_id: dataSet?.product_id,
              number: parseInt(dataSet?.number),
              item_loc: "cart",
              tag: dataSet?.tag,
            },
          ],
        },
        user?.token || token,
        setUserDetails,
        setCartItems,
        setWishListItem,
        setCartClick
      ).then((res) => {
        if (res?.status === "success") {
          pushToDataLayer(dataSet);
          updateCart(fn, token);
        }
      });
    } else {
      postCart(
        dataSet,
        user?.token || token,
        setUserDetails,
        setCartItems,
        setWishListItem,
        setCartClick
      ).then((res) => {
        if (res?.status === "success") {
          pushToDataLayer(dataSet);
          updateCart(fn, token);
        }
      });
    }
    if (dataSet.tag !== "old") {
      toast.success("Item added to cart successfully");
    }
  };

  const logout = async () => {
    const storedReferId = localStorage.getItem("referId");
    localStorage.clear();
    setUserDetails(null);
    setCartItems([]);
    setWishListItem([]);
    try {
      const token = user?.token;
      const response = await fetch(`${apiUrl}/web/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        toast.success("Logged out successfully");
        localStorage.setItem("cartCacheSavedData", JSON.stringify([])); // Save an empty array as JSON
        localStorage.setItem("cartCacheNumber", "");
        setUserProfile({});
        navigate.push("/");
        if (storedReferId) {
          localStorage.setItem("referId", storedReferId);
        }
      } else {
        toast.info("Failed to log out");
      }
    } catch (error) {
      // Handle any error that occurred during the request
      console.error("An error occurred during logout:", error);
    }
  };

  const removeFromCart = (indexToRemove) => {
    deleteCartAndWishList(indexToRemove, user?.token).then((res) => {
      updateCart(() => {
        setDeleteClicked(false);
      });
    });
    toast.info("Item deleted successfully");
  };

  const removeFromWishList = (indexToRemove, isBatch = false) => {
    if (isProcessing && !isBatch) return;
    if (itemsBeingProcessed.has(indexToRemove)) return; // Prevent multiple calls for the same item

    setItemsBeingProcessed((prev) => new Set(prev).add(indexToRemove));
    setIsProcessing(true);

    deleteCartAndWishList(indexToRemove, user?.token)
      .then((res) => {
        if (res?.status === "success") {
          toast.info("Item removed from wishlist successfully");
          updateWishlist(() => {});
          const updatedWishListItems = wishListItem.filter(
            (item) => item.id !== indexToRemove
          );
          setWishListItem(updatedWishListItems);
          setIsWishListed(false);
          setWishList(false);
        }
        setItemsBeingProcessed((prev) => {
          const newSet = new Set(prev);
          newSet.delete(indexToRemove);
          return newSet;
        });
        setIsProcessing(false);
      })
      .catch((error) => {
        setItemsBeingProcessed((prev) => {
          const newSet = new Set(prev);
          newSet.delete(indexToRemove);
          return newSet;
        });
        setIsProcessing(false);
        console.error(error);
        setWishList(false);
      });
  };
  const addToWishList = (items, isBatch = false) => {
    const trackingData = {
      event: "add_to_wishlist", // Custom event name for GTM
      items: items,
      page_location: window.location.href,
      page_referrer: "https://www.vipnumbershop.com/",
      page_title: document.title,
      currency: "INR",
      value: items.unit_price,
    };
    // Push the structured data to the dataLayer
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(trackingData);
    if (isProcessing && !isBatch) return;
    setIsProcessing(true);

    const itemsToAdd = Array.isArray(items)
      ? items.filter(
          (item) => !wishListItem.some((x) => x.number === item.number)
        )
      : [];
    const itemsToRemove = Array.isArray(items)
      ? wishListItem.filter((x) =>
          items.some((item) => item.number === x.number)
        )
      : [];

    if (!Array.isArray(items)) {
      const singleItem = items;
      const itemExists = wishListItem.some((x) => {
        if (x.number === singleItem?.number) {
          removeFromWishList(x.id, false);
          return true;
        }
        return false;
      });

      if (!itemExists) {
        postCart(
          {
            items: [
              {
                product_id: singleItem?.product_id,
                number: parseInt(singleItem?.number),
                item_loc: "wishlist",
              },
            ],
          },
          user?.token
        )
          .then((res) => {
            if (res?.status === "success") {
              updateCart();
              updateWishlist();
              const updatedCart = [...wishListItem, singleItem];
              setWishListItem(updatedCart);
              setIsWishListed(true);
              toast.success("Item added to wishlist successfully");
            }
            setIsProcessing(false);
          })
          .catch((error) => {
            setIsProcessing(false);
            console.error(error);
          });
      } else {
        setIsProcessing(false);
      }
    } else {
      const removePromises = itemsToRemove.map((item) => {
        return new Promise((resolve) => {
          deleteCartAndWishList(item.id, user?.token)
            .then((res) => {
              if (res?.status === "success") {
                updateWishlist(() => {});
                setWishListItem((prev) =>
                  prev.filter((wishItem) => wishItem.id !== item.id)
                );
                resolve();
              }
            })
            .catch((error) => {
              console.error(error);
              resolve();
            });
        });
      });

      const addPromises = itemsToAdd.map((item) => {
        return new Promise((resolve) => {
          postCart(
            {
              items: [
                {
                  product_id: item.product_id,
                  number: parseInt(item.number),
                  item_loc: "wishlist",
                },
              ],
            },
            user?.token
          )
            .then((res) => {
              if (res?.status === "success") {
                updateCart();
                updateWishlist();
                setWishListItem((prev) => [...prev, item]);
                resolve();
              }
            })
            .catch((error) => {
              console.error(error);
              resolve();
            });
        });
      });

      Promise.all([...removePromises, ...addPromises])
        .then(() => {
          if (itemsToAdd.length > 0) {
            toast.success("Items added to wishlist successfully");
          }
          if (itemsToRemove.length > 0) {
            toast.info("Items removed from wishlist successfully");
          }
          setIsProcessing(false);
        })
        .catch((error) => {
          console.error(error);
          setIsProcessing(false);
        });
    }
  };
  if (!isUserDetailsLoaded) return <></>;
  return (
    <AppStateContext.Provider
      value={{
        isWishListed,
        viewLogin,
        setViewLogin,
        cartItems,
        setCartItems,
        addToCart,
        user,
        setUserDetails,
        removeFromCart,
        userloggedIn,
        setUserLogginedIn,
        checkUser,
        wishListItem,
        addToWishList,
        removeFromWishList,
        selectedPropduct,
        setSelectedPropduct,
        logout,
        categoriesData,
        redirectTo,
        setRedirectTo,
        cartCache,
        setCartCache,
        userProfile,
        updateWishlist,
        cartAnimation,
        setCartAnimation,
        routeScroll,
        setRouteScroll,
        setUserProfile,
        Seo,
        relatedNumbers,
        setRelatedNumbers,
        categoriesById,
        currentUrl,
        setCurrentUrl,
        deleteClicked,
        setDeleteClicked,
        setNumerologyPop,
        numerologyPop,
        tab,
        setTab,
        cartCacheData,
        setCartCacheData,
        loadData,
        setLoadData,
        setBlogId,
        blogId,
        cartClick,
        setCartClick,
        setBlogsRoute,
        blogsRoute,
        isProcessing,
        wishList,
        setWishList,
        pdp,
        setPdp,
        setNameUpdate,
        flterHide,
        setFilterHide,
        wBalance,
        setWBalance,
        searchPopup,
        setSearchPopup,
        setDiscountPop,
        discountPop,
        voucher,
        contactData,
        setContactData,
        apiData,
        setApiData,
        loader,
        SetLoader,
        categoryCurrentPage,
        setCategoryCurrentPage,
        fromTab,
        setFromTab,
        footerCat,
        setFooterCat,
        showPopup,
        setShowPopup,
        catLoader,
        setCatLoader,
        catData,
        setCatData,
        selectedStartWithOption,
        SetSelectedStartWithOption,
        setSelectedPriceRanges,
        selectedPriceRanges,
        setMaxPrice,
        maxPrice,
        minPrice,
        setMinPrice,
        numurologyValues,
        setNewInputValue,
        inputValues,
        setInputValues,
        selectedPriceOptions,
        setSelectedPriceOptions,
        sellers,
        setSellers,
        checkboxState,
        setCheckboxState,
        coming,
        setComing,
        catFilter,
        setCatFilter,
        selectedCategory,
        setSelectedCategory,
        selectedSubCategories,
        setSelectedSubCategories,
        setTabCategory,
        tabCategory,
        subCategoryData,
        setSubCategoryData,
        setLoaderData,
        loaderdata,
        subCatDetail,
        setSubCatDetail,
        setWalletBalance,
        walletBalance,
        handleSubCat,
        activeCategoryLink,
        setActiveCategoryLink,
        category,
        setCategoryId,
        loaderCat,
        setLoaderCat,
        dataLoading,
        setDataLoading,
        similarLoader,
        setSimilarLoader,
        familyPackValue,
        setFamilyPackValue,
        selectedNumbers,
        setSelectedNumbers,
        catModalOpen,
        setCatModalOpen,
        activeFilter,
        setActiveFilter,
        loadmore,
        setLoadMore,
        popupModal,
        setPopupModal,
        filters,
        setFilters,
        displayProfile,
        setDisplayProfile,
        resend,
        setResend,
        skeleton,
        setskeleton,
        currentPage,
        setCurrentPage,
        coupon_code,
        setProfileUpdate,
        deliveryIsOpen,
        setDeliveryIsOpen,
        deliveryCloseModal,
        starRating,
        setStarRating,
        openFeed,
        setOpenFeed,
      }}
    >
      {children}
    </AppStateContext.Provider>
  );
};

export default AppStateContextProvider;
