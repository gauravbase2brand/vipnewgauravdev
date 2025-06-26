"use client";
import React, { useContext, useEffect, useState } from "react";
import SilverResult from "./SilverResult/SilverResult";
import GoldResult from "./GoldResult/GoldResult";
import BronzeResult from "./BronzeResult/BronzeResult";
import PlatinumResult from "./PlatinumResult/PlatinumResult";
import GlobalBasicResult from "./GlobalBasicResult/GlobalBasicResult";
import { SearchAPI, updateProfile } from "../Services/Services";
import Search from "../Shared/Search/Search";
import SearchByPrice from "./SearchByPrice/SearchByPrice";
import BasicSearch from "./BasicSearch/BasicSearch";
import AdvanceSearch from "./AdvanceSearch/AdvanceSearch";
import ExactDigitPlacementSearch from "./ExactDigitPlacementSearch/ExactDigitPlacementSearch";
import MustContainsSearch from "./MustContainsSearch/MustContainsSearch";
import SuggestionBanner from "../suggestion-for-you/SuggestionBanner/SuggestionBanner";
import { useGetQueryParams } from "../utils";
import OurCustomers from "../Shared/OurCustomers/OurCustomers";
import FAQs from "../Shared/FAQs/FAQs";
import VideoTestimonial from "../Shared/VideoTestimonial/VideoTestimonial";
import QRVipApp from "../Shared/QRVipApp/QRVipApp";
import { toast } from "react-toastify";
import { AppStateContext } from "../contexts/AppStateContext/AppStateContext";
import { useRouter } from "next/navigation";
import axios from "axios";
import {
  checkAscendingOrDescendingBy5,
  checkForSamePattern,
  count_repeating_digits,
} from "../utils/comman";
import FamilyPack_Search from "./FamilyPackInSearchTab/FamilyPack_Search";
import PriceNumber from "../SpotifyDesign/PriceNumber";
// import { ResponsiveFooter } from "../ResponsiveModule";
import CardLoder from "../CardLoder/CardLoder";
export const SearchContext = React.createContext(null);

const BannerText = {
  digit: {
    advanced: "Advanced Search",
    basic: "Premium Search",
    global: "Global Search",
    exactPlacement: "Exact Digit placement",
    mostContained: "Most Contained",
  },
  price: {
    price: "Search by Price",
  },
  family_pack: {
    family_pack: "Search for Family Pack",
  },
};

const SearchResults = () => {
  const { queryParams } = useGetQueryParams();
  const [searchResults, setSearchResults] = useState([]);
  const [seracPrice, setSearchprice] = useState([]);
  const [besSeach, setBesSearch] = useState([]);
  const [digit, setDigit] = useState([]);
  const [containSearch, setContainSearch] = useState([]);
  const [adSearch, SetAdSearch] = useState([]);
  const [familyPack, SetFamilyPack] = useState([]);
  const [isFetchingGold, setIsFetchingGold] = useState(false);

  const {
    user,
    userProfile,
    dataLoading,
    setDataLoading,
    setSearchPopup,
    loadmore,
    setLoadMore,
  } = useContext(AppStateContext);
  const Router = useRouter();
  const [nextPage, setNextPage] = useState();
  const [lazy, setLazy] = useState();
  const [premiumGold, setPremiumGold] = useState(null);
  const [loadingState, setLoadingState] = useState(null);
  const apiUrl = process.env.NEXT_PUBLIC_LEAFYMANGO_API_URL;
  // const fetchData = async (endWith) => {
  //   while (endWith) {
  //     try {
  //       const response = await axios.get(
  //         `${apiUrl}/web/gold/search?number=${endWith}&seller=PREMIUM&paginate=60`
  //       );
  //       if (response.data && response.data.data.length > 0) {
  //         // Set the data in state and stop the loop if we get a response with data
  //         setPremiumGold(response.data);
  //         break;
  //       } else {
  //         endWith = endWith.slice(1); // Reduce the endWith string
  //       }
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //       break; // Stop on error
  //     }
  //   }
  // };
  const fetchData = async (endWith) => {
    setIsFetchingGold(true);
    while (endWith) {
      try {
        const params = new URLSearchParams({
          number: endWith,
          seller:
            queryParams?.seller === "BASIC,PREMIUM"
              ? "BASIC,PREMIUM"
              : "PREMIUM",
          star_status: true,
          paginate: 60,
          ...(queryParams?.start_with && {
            start_with: queryParams.start_with,
          }),
          ...(queryParams?.any_where && { any_where: queryParams.any_where }),
          ...(queryParams?.end_with && { end_with: queryParams.end_with }),
          ...(queryParams?.contains && { contains: queryParams.contains }),
          ...(queryParams?.not_contain && {
            not_contain: queryParams.not_contain,
          }),
          ...(queryParams?.total && { total: queryParams.total }),
          ...(queryParams?.sum && { sum: queryParams.sum }),
          ...(queryParams?.callCount && { callCount: queryParams.callCount }),
          ...(queryParams?.comingsoon && {
            comingsoon: queryParams.comingsoon,
          }),

          ...(queryParams?.sort && { sort: queryParams.sort }),
          ...(queryParams?.min_price && { min_price: queryParams.min_price }),
          ...(queryParams?.max_price && { max_price: queryParams.max_price }),
        });

        const response = await axios.get(
          `${apiUrl}/web/gold/search?${params.toString()}`
        );

        if (response.data && response.data.data.length > 0) {
          setPremiumGold(response.data);
          break;
        } else {
          endWith = endWith.slice(1); // Trim last digit and retry
          setIsFetchingGold(false);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsFetchingGold(false);
        break;
      } finally {
        setIsFetchingGold(false); // ← always turn loading off
      }
    }
  };

  useEffect(() => {
    if (!queryParams) return; // Exit if queryParams is undefined
    const {
      type,
      end_with,
      start_with,
      any_where,
      contains,
      not_contain,
      total,
      sum,
    } = queryParams;
    if (type === "basic" && end_with) {
      setPremiumGold(null);
      fetchData(end_with);
    } else if (type === "advanced") {
      if (adSearch?.length === 0) {
        if (end_with) {
          // fetchData(end_with);
        } else {
          const fallbackParam =
            start_with || any_where || contains || not_contain || total || sum;
          if (fallbackParam) {
            fetchData(fallbackParam); // Use the first available parameter
          } else {
            console.warn("No valid parameter available for fetchData");
          }
        }
      }
    }
  }, [queryParams, adSearch]);

  const resetAll = () => {
    setSearchResults();
    setSearchprice();
    setBesSearch();
    setDigit();
    setContainSearch();
    SetAdSearch();
    SetFamilyPack();
  };

  useEffect(() => {
    if (queryParams) {
      let params = { ...queryParams };
      delete params.type;
      delete params.searchBy;
      delete params.callCount;
      delete params.page;
      params.paginate = 60;
      params.star_status = true;
      if (
        queryParams?.type === "basic" ||
        queryParams?.type === "advanced" ||
        queryParams?.searchBy === "price" ||
        queryParams?.type === "global" ||
        queryParams?.type === "exactPlacement" ||
        queryParams?.type === "mostContained"
      ) {
        params.seller = queryParams?.seller || "PREMIUM";
      }

      resetAll();
      setDataLoading(true);
      SearchAPI(
        queryParams?.type || queryParams?.searchBy,
        params,
        userProfile,
        queryParams?.page,
        setSearchResults,
        setLazy,
        setLoadingState
      )
        ?.then((res) => {
          // Save the length of the res array in localStorage
          if (res?.data) {
            const resLength = res.data.length;
            localStorage.setItem("resLength", resLength);
          }

          if (
            res?.bronze?.data?.length === 0 &&
            res?.globalBasic?.data?.length &&
            res?.gold?.data?.length === 0 &&
            res?.platinum?.data?.length === 0 &&
            res?.silver?.data?.length === 0
          ) {
            // If following the first pattern same pattern eg. 1234512345
            if (checkForSamePattern(params?.number)) {
              Router.push(
                `https://www.vipnumbershop.com/category/customer-care-numbers`
              );
            }
            // if following the second conditions repeating eg. 4242424242
            else if (count_repeating_digits(params?.number)) {
              Router.push(
                `https://www.vipnumbershop.com/category/xy-xy-fancy-mobile-number`
              );
            }
            // if following the third conditions eg. 7071727374
            else if (checkAscendingOrDescendingBy5(params?.number)) {
              Router.push(
                `https://www.vipnumbershop.com/category/ascending-descending-fancy-number`
              );
            }
          } else {
            if (user?.token) {
              updateProfile(
                {
                  user_blocked_price: true,
                  user_min_price: queryParams?.min_price,
                  user_max_price: queryParams?.max_price,
                },
                user?.token
              )
                .then((res) => {})
                .catch((error) => {
                  console.error("Error Price Blocked:", error);
                });
            }
            if (!res && !queryParams?.searchBy === "family_pack") {
              toast.error("Something went wrong. Please try again later");
            }

            setNextPage(res?.nextURL);
            if (queryParams?.type === "advanced") {
              SetAdSearch(res?.data);
            } else if (queryParams?.type === "basic") {
              setBesSearch(res.data);
            } else if (queryParams?.type === "global") {
              setSearchResults(res);
            } else if (
              queryParams?.type === "price" ||
              queryParams?.searchBy === "price"
            ) {
              setSearchprice(res?.data);
            } else if (queryParams?.type === "exactPlacement") {
              setDigit(res.data);
            } else if (queryParams?.type === "mostContained") {
              setContainSearch(res?.data);
            }
          }
        })
        .catch(() => {
          setSearchPopup(false);
          setDataLoading(false);
        })
        .finally(() => {
          setDataLoading(false);
          setSearchPopup(false);
        });
    }
  }, [queryParams]);

  const globalLazy = (key, url) => {
    setLoadMore(true);
    let params = { ...queryParams };
    delete params.type;
    delete params.searchBy;
    delete params.callCount;
    delete params.page;
    axios
      .get(url, {
        params: {
          ...params,
          id: userProfile?.contactid,
          paginate: 60,
        },
      })
      .then((res) => {
        const obj = {
          ...searchResults,
          [key]: {
            data: [...searchResults[key]?.data, ...res?.data?.data],
          },
        };
        setSearchResults(obj);
        setLazy({
          ...lazy,
          [key]: res?.data?.nextURL,
        });
        setLoadMore(false);
      });
  };

  const lazyload = () => {
    setLoadMore(true);
    let params = { ...queryParams };
    delete params.type;
    delete params.searchBy;
    delete params.callCount;
    delete params.page;
    params.paginate = 60;
    params.star_status = true;
    if (
      queryParams?.type === "basic" ||
      queryParams?.type === "advanced" ||
      queryParams?.searchBy === "price" ||
      queryParams?.type === "global" ||
      queryParams?.type === "exactPlacement" ||
      queryParams?.type === "mostContained"
    ) {
      params.seller = queryParams?.seller || "PREMIUM";
    }
    SearchAPI(
      queryParams?.type || queryParams?.searchBy,
      params,
      userProfile,
      nextPage,
      setSearchResults,
      setLazy,
      setLoadingState
    )?.then((res) => {
      if (!res) {
        setLoadMore(false);
        toast.error(
          "Error message",
          "Something went wrong. Please try again later"
        );
      }

      setNextPage(res?.nextURL);

      if (queryParams?.type === "advanced") {
        setLoadMore(false);
        SetAdSearch([...adSearch, ...res.data]);
      } else if (queryParams?.type === "basic") {
        setLoadMore(false);
        setBesSearch([...besSeach, ...res.data]);
      } else if (queryParams?.type === "global") {
        setLoadMore(false);
        setSearchResults(res.data);
      } else if (
        queryParams?.type === "price" ||
        queryParams?.searchBy === "price"
      ) {
        setLoadMore(false);
        setSearchprice([...seracPrice, ...res.data]);
      } else if (queryParams?.type === "exactPlacement") {
        setLoadMore(false);
        setDigit([...digit, ...res.data]);
      } else if (queryParams?.type === "mostContained") {
        setLoadMore(false);
        setContainSearch([...containSearch, ...res.data]);
      } else if (queryParams?.type === "family_pack") {
        setLoadMore(false);
        SetFamilyPack([...familyPack, ...res.data]);
      }
    });
  };

  const filteredPlatinumData = searchResults?.platinum?.data?.filter((item) => {
    const startWithDigits = queryParams?.start_with
      ?.split(",")
      .map((digit) => digit.trim());
    if (startWithDigits && startWithDigits.length > 0 && item?.number) {
      return startWithDigits.some((digit) => item?.number?.startsWith(digit));
    }
    return true;
  });

  const filteredGoldData = searchResults?.gold?.data?.filter((item) => {
    const startWithDigits = queryParams?.start_with
      ?.split(",")
      .map((digit) => digit.trim());
    if (startWithDigits && startWithDigits.length > 0 && item?.number) {
      return startWithDigits.some((digit) => item?.number?.startsWith(digit));
    }
    return true;
  });

  const filteredSilverData = searchResults?.silver?.data?.filter((item) => {
    const startWithDigits = queryParams?.start_with
      ?.split(",")
      .map((digit) => digit.trim());
    if (startWithDigits && startWithDigits.length > 0 && item?.number) {
      return startWithDigits.some((digit) => item?.number?.startsWith(digit));
    }
    return true;
  });
  const filteredBronzeData = searchResults?.bronze?.data?.filter((item) => {
    const startWithDigits = queryParams?.start_with
      ?.split(",")
      .map((digit) => digit.trim());
    if (startWithDigits && startWithDigits.length > 0 && item?.number) {
      return startWithDigits.some((digit) => item?.number?.startsWith(digit));
    }
    return true;
  });

  return (
    <div className="SearchResult-page-os">
      <SuggestionBanner
        headingText={
          BannerText?.[queryParams?.searchBy]?.[
            queryParams?.type || queryParams?.searchBy
          ]
        }
      />
      <SearchContext.Provider
        className="ddd"
        value={{
          searchResults,
          seracPrice,
          besSeach,
          digit,
          containSearch,
          adSearch,
        }}
      >
        <div className="defaultPage-search-section-os">
          <Search queryParams={queryParams} />
        </div>
        <>
          {dataLoading && queryParams?.type !== "global" && (
            <CardLoder columns={5} gridItems={60} />
          )}
          <>
            {adSearch?.length >= 0 ? (
              <AdvanceSearch
                results={adSearch}
                nextPage={lazyload}
                page={"adSearch"}
                searchNextUrl={nextPage}
                loadmore={loadmore}
              />
            ) : null}

            {searchResults?.platinum?.data?.length >= 0 ? (
              <PlatinumResult
                results={filteredPlatinumData}
                nextPage={() => {
                  globalLazy("platinum", lazy?.platinum);
                }}
                viewLoadMore={lazy?.platinum}
                page={"searchResults"}
                loadmore={loadmore}
              />
            ) : null}
            {loadingState === "platinum" && (
              <CardLoder columns={5} gridItems={20} />
            )}
            {searchResults?.globalBasic?.data?.length >= 0 ? (
              <GlobalBasicResult
                results={searchResults.globalBasic.data}
                nextPage={() => {
                  globalLazy("globalBasic", lazy?.globalBasic);
                }}
                viewLoadMore={lazy?.globalBasic}
                page={"searchResults"}
                loadmore={loadmore}
              />
            ) : null}
            {loadingState === "globalBasic" && (
              <CardLoder columns={5} gridItems={20} />
            )}
            {searchResults?.gold?.data?.length >= 0 ? (
              <GoldResult
                results={filteredGoldData}
                nextPage={() => {
                  globalLazy("gold", lazy?.gold);
                }}
                viewLoadMore={lazy?.gold}
                page={"searchResults"}
                loadmore={loadmore}
              />
            ) : null}
            {loadingState === "gold" && (
              <CardLoder columns={5} gridItems={20} />
            )}
            {searchResults?.silver?.data?.length >= 0 ? (
              <SilverResult
                results={filteredSilverData}
                nextPage={() => {
                  globalLazy("silver", lazy?.silver);
                }}
                viewLoadMore={lazy?.silver}
                page={"searchResults"}
                loadmore={loadmore}
              />
            ) : null}
            {loadingState === "silver" && (
              <CardLoder columns={5} gridItems={20} />
            )}
            {searchResults?.bronze?.data?.length >= 0 ? (
              <BronzeResult
                results={filteredBronzeData}
                nextPage={() => {
                  globalLazy("bronze", lazy?.bronze);
                }}
                viewLoadMore={lazy?.bronze}
                page={"searchResults"}
                loadmore={loadmore}
              />
            ) : null}
            {loadingState === "bronze" && (
              <CardLoder columns={5} gridItems={20} />
            )}

            {seracPrice?.length >= 0 ? (
              <SearchByPrice
                results={seracPrice}
                page={"seracPrice"}
                nextPage={lazyload}
                searchNextUrl={nextPage}
                loadmore={loadmore}
              />
            ) : null}
            {besSeach?.length >= 0 ? (
              <BasicSearch
                nextPage={lazyload}
                searchNextUrl={nextPage}
                loadmore={loadmore}
              />
            ) : null}
            {isFetchingGold && <CardLoder columns={5} gridItems={20} />}
            {premiumGold?.data?.length >= 0 ? (
              <GoldResult results={premiumGold?.data} loadmore={loadmore} />
            ) : null}
            {digit?.length ? (
              <ExactDigitPlacementSearch
                results={digit}
                page={"digit"}
                nextPage={lazyload}
                searchNextUrl={nextPage}
                loadmore={loadmore}
              />
            ) : null}
            {containSearch?.length >= 0 ? (
              <MustContainsSearch
                results={containSearch}
                page={"containSearch"}
                nextPage={lazyload}
                searchNextUrl={nextPage}
                loadmore={loadmore}
              />
            ) : null}
            {queryParams?.searchBy !== "price" ? (
              <FamilyPack_Search family_Search={queryParams} />
            ) : null}
          </>
        </>
      </SearchContext.Provider>
      {!dataLoading && (
        <>
          <PriceNumber />
          <FAQs />
          <VideoTestimonial />
          <OurCustomers />
          <QRVipApp />
        </>
      )}
    </div>
  );
};

export default SearchResults;
