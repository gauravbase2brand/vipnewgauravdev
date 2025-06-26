import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
axios.interceptors.response.use(function (response) {
  return response;
});
// axios.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     if (error.response?.status === 429) {
//       const retryAfter = parseInt(error.response.headers["retry-after"], 10) * 1000 || 1000;
//       await new Promise((resolve) => setTimeout(resolve, retryAfter));
//       return axios.request(error.config); // Retry the original request
//     }
//     return Promise.reject(error);
//   }
// );
const apiUrl = process.env.NEXT_PUBLIC_LEAFYMANGO_API_URL;

const URL = {
  mostContained: `${apiUrl}/web/most/contain/digit`,
  exactPlacement: `${apiUrl}/web/exact/digit`,
  basic: `${apiUrl}/web/basic/search`,
  price: `${apiUrl}/web/price/search`,
  global: [
    `${apiUrl}/web/platinum/search`,
    `${apiUrl}/web/global/basic/search`,
    `${apiUrl}/web/gold/search`,
    `${apiUrl}/web/silver/search`,
    `${apiUrl}/web/bronze/search`,
  ],
  advanced: `${apiUrl}/web/advance/search`,
};

// export const SearchAPI = async (
//   key,
//   params,
//   userProfile = {},
//   page,
//   setLazy
// ) => {
//   try {
//     if (key === "global") {
//       const results = await Promise.all(
//         URL.global.map((endpoint) =>
//           axios.get(endpoint, {
//             params: {
//               ...params,
//               id: userProfile?.contactid,
//             },
//           })
//         )
//       );
//       const combinedData = {
//         platinum: results[0]?.data || [],
//         gold: results[1]?.data || [],
//         silver: results[2]?.data || [],
//         bronze: results[3]?.data || [],
//         globalBasic: results[4]?.data || [],
//       };
//       if (setLazy) {
//         setLazy({
//           platinum: results[0]?.data?.nextURL,
//           gold: results[1]?.data?.nextURL,
//           silver: results[2]?.data?.nextURL,
//           bronze: results[3]?.data?.nextURL,
//           globalBasic: results[4]?.data?.nextURL,
//         });
//       }

//       return combinedData;
//     } else {
//       const endpoint = page ? page : URL[key];
//       const response = await axios.get(endpoint, {
//         params: {
//           ...params,
//           id: userProfile?.contactid,
//         },
//       });

//       return response.data;
//     }
//   } catch (error) {
//     console.error(error);
//   }
// };
export const SearchAdvanceAPI = async (
  key,
  params,
  userProfile = {},
  page,
  setLazy
) => {
  try {
    if (key === "global") {
      const results = await Promise.all(
        URL.global.map((endpoint) =>
          axios.get(endpoint, {
            params: {
              ...params,
              id: userProfile?.contactid,
            },
          })
        )
      );
      const combinedData = {
        platinum: results[0]?.data || [],
        gold: results[1]?.data || [],
        silver: results[2]?.data || [],
        bronze: results[3]?.data || [],
        globalBasic: results[4]?.data || [],
      };
      if (setLazy) {
        setLazy({
          platinum: results[0]?.data?.nextURL,
          gold: results[1]?.data?.nextURL,
          silver: results[2]?.data?.nextURL,
          bronze: results[3]?.data?.nextURL,
          globalBasic: results[4]?.data?.nextURL,
        });
      }

      return combinedData;
    } else {
      const endpoint = page ? page : URL[key];
      const response = await axios.get(endpoint, {
        params: {
          ...params,
          id: userProfile?.contactid,
        },
      });

      return response.data;
    }
  } catch (error) {
    console.error(error);
  }
};

// export const SearchAPI = async (
//   key,
//   params,
//   userProfile = {},
//   page,
//   setSearchResults,
//   setLazy,
//   setLoadingState //  Track which API is being loaded
// ) => {
//   try {
//     if (key === "global") {
//       const results = {};
//       const nextURLs = {};
//       const categories = [
//         "platinum",
//         "globalBasic",
//         "gold",
//         "silver",
//         "bronze",
//       ];

//       for (let i = 0; i < URL.global.length; i++) {
//         const endpoint = URL.global[i];
//         const categoryKey = categories[i];
//         if (params.seller !== "BASIC,PREMIUM") {
//           if (categoryKey === "globalBasic") {
//             params.seller = "BASIC";
//           } else {
//             params.seller = "PREMIUM";
//           }
//         }
//         try {
//           setLoadingState(categoryKey); //  Start loader for current category

//           const response = await axios.get(endpoint, {
//             params: {
//               ...params,
//               id: userProfile?.contactid,
//             },
//           });

//           const data = response?.data || [];

//           results[categoryKey] = data;

//           setSearchResults((prev) => ({
//             ...prev,
//             [categoryKey]: data,
//           }));

//           nextURLs[categoryKey] = data?.nextURL;
//         } catch (error) {
//           results[categoryKey] = [];
//           setSearchResults((prev) => ({
//             ...prev,
//             [categoryKey]: [],
//           }));
//         } finally {
//           setLoadingState(null); //Stop loader after API finishes
//         }
//       }

//       if (setLazy) {
//         setLazy(nextURLs);
//       }

//       return results;
//     } else {
//       try {
//         setLoadingState(key); //Start loader for current API

//         const endpoint = page || URL[key];
//         const response = await axios.get(endpoint, {
//           params: {
//             ...params,
//             id: userProfile?.contactid,
//           },
//         });

//         const data = response?.data;

//         setSearchResults((prev) => ({
//           ...prev,
//           [key]: data,
//         }));

//         return data;
//       } catch (error) {
//         console.error(`Error fetching ${key}:`, error);
//       } finally {
//         setLoadingState(null); //Stop loader after API finishes
//       }
//     }
//   } catch (error) {
//     throw error;
//   }
// };


export const SearchAPI = async (
  key,
  params,
  userProfile = {},
  page,
  setSearchResults,
  setLazy,
  setLoadingState
) => {
  try {
    if (key === "global") {
      const categories = [
        "platinum",
        "globalBasic",
        "gold",
        "silver",
        "bronze",
      ];
      // 1. Build a map of promises (but don't await yet)
      const promiseMap = Object.fromEntries(
        categories.map((category, i) => {
          const endpoint = URL.global[i];
          // adjust seller param for BASIC vs PREMIUM
          const sellerParam = category === "globalBasic" ? "BASIC" : "PREMIUM";
          const finalParams = {
            ...params,
            seller:
              params.seller !== "BASIC,PREMIUM"
                ? sellerParam
                : params.seller,
            id: userProfile?.contactid,
          };
          return [
            category,
            axios.get(endpoint, { params: finalParams }),
          ];
        })
      );

      const results = {};
      const nextURLs = {};

      // 2. Now await each in order, rendering as soon as it's ready
      for (const category of categories) {
        setLoadingState(category);
        try {
          const response = await promiseMap[category];
          const data = response.data || { data: [], nextURL: null };

          // update local results
          results[category] = data;
          nextURLs[category] = data.nextURL;

          // push into React state in the right order
          setSearchResults(prev => ({
            ...prev,
            [category]: data,
          }));
        } catch (err) {
          // on error, at least clear that category
          results[category] = { data: [], nextURL: null };
          setSearchResults(prev => ({
            ...prev,
            [category]: { data: [] },
          }));
        } finally {
          setLoadingState(null);
        }
      }

      // 3. once all five are done, set lazy URLs if needed
      if (setLazy) {
        setLazy(nextURLs);
      }

      return results;
    }
    else {
      try {
        setLoadingState(key); //Start loader for current API

        const endpoint = page || URL[key];
        const response = await axios.get(endpoint, {
          params: {
            ...params,
            id: userProfile?.contactid,
          },
        });

        const data = response?.data;

        setSearchResults((prev) => ({
          ...prev,
          [key]: data,
        }));

        return data;
      } catch (error) {
        console.error(`Error fetching ${key}:`, error);
      } finally {
        setLoadingState(null); //Stop loader after API finishes
      }
    }
  } catch (error) {
    throw error;
  }
};
export const getCart = async (Token) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_LEAFYMANGO_API_URL}/web/cart`,
      {
        headers: {
          authorization: `Bearer ${Token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getWishlist = async (Token) => {
  try {
    const response = await axios.get(`${apiUrl}/web/wishlist`, {
      headers: {
        authorization: `Bearer ${Token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const postCart = async (
  payload,
  Token,
  setUserDetails,
  setCartItems,
  setWishListItem,
  setCartClick
) => {
  try {
    const response = await axios.post(`${apiUrl}/web/cart`, payload, {
      headers: {
        authorization: `Bearer ${Token}`,
      },
    });
    return response.data;
  } catch (error) {
    if (error?.response?.status === 401) {
      localStorage.clear();
      setUserDetails(null);
      setCartItems([]);
      setWishListItem([]);
      setCartClick(false);
      localStorage.setItem("cartCacheSavedData", JSON.stringify([]));
      localStorage.setItem("cartCacheNumber", JSON.stringify(""));
    }
    console.error(error);
  }
};

export const getSubCategories = async (id, params) => {
  try {
    const response = await axios.get(`${apiUrl}/web/category/search?id=` + id, {
      params,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteCartAndWishList = async (id, Token) => {
  try {
    const response = await axios.delete(`${apiUrl}/web/cart/` + id, {
      headers: {
        authorization: `Bearer ${Token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getOrderId = async (payload, Token) => {
  try {
    const response = await axios.post(
      `${apiUrl}/web/razorpay/createorder`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${Token}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const phonePayOrder = async (payload, Token) => {
  try {
    const response = await axios.post(
      `${apiUrl}/web/payment/initiate`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${Token}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const getOrderNumId = async (payload, Token) => {
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

export const getOrderBussiness = async (payload, Token) => {
  try {
    const response = await axios.post(
      `${apiUrl}/web/razorpay/businessPayment`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${Token}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const useGetCategories = () => {
  const [data, setdata] = useState(null);
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState("");
  const [categoriesById, setcategoriesById] = useState({});
  useEffect(() => {
    const storedCategories = sessionStorage.getItem("categoriesData");
    if (storedCategories) {
      // If data exists in sessionStorage, use it and skip the API call
      const parsedCategories = JSON.parse(storedCategories);
      setcategoriesById(parsedCategories.categoriesById);
      setdata(parsedCategories.data);
      setloading(false);
    } else {
      setloading(true);
      axios
        .get(`${apiUrl}/web/categories`)
        .then((res) => {
          window.scrollTo(0, 0);
          setdata(res?.data?.data);
          const obj = {};
          res?.data?.data.forEach((cat) => {
            if (!obj?.[cat?.id]) {
              obj[cat?.id] = cat?.sub_categories;
            }
            setcategoriesById(obj);
            sessionStorage.setItem(
              "categoriesData",
              JSON.stringify({
                data: res?.data?.data,
                categoriesById: obj,
              })
            );
          });
          setloading(false);
        })
        .catch((err) => {
          console.error(err);
          seterror("Failed to fetch categories");
          setloading(false);
        });
    }
  }, []);
  return { data, loading, error, categoriesById };
};

export const getProfile = async (
  token,
  setUserDetails,
  setCartItems,
  setWishListItem
) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_LEAFYMANGO_API_URL}/web/profile`,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    return response?.data?.data?.[0];
  } catch (error) {
    if (error?.response?.status === 401) {
      localStorage.clear();
      setUserDetails(null);
      setCartItems([]);
      setWishListItem([]);
      localStorage.setItem("cartCacheSavedData", JSON.stringify([]));
      localStorage.setItem("cartCacheNumber", JSON.stringify(""));
    }
    console.error(error);
  }
};

export const updateProfile = async (payload, token) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_LEAFYMANGO_API_URL}/web/profile/update`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
