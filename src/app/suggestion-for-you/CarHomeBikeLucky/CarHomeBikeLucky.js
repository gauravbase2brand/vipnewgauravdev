import React, { useEffect, useState } from "react";
import MainHeading from "../../Shared/MainHeading/MainHeading";
import "./CarHomeBikeLucky.css";
import Card from "../../Shared/Card/Card";
import SearchFilterButton from "../../Shared/SearchFilterButton/SearchFilterButton";
import {
  SearchAdvanceAPI,
  getProfile,
  updateProfile,
} from "../../Services/Services";
import { useGetQueryParams } from "../../utils";
import ViewMoreButton from "../../Shared/ViewMoreButton/ViewMoreButton";
import "../../home/FeaturedNumber/FeaturedNumber.css";
import CardLoder from "@/app/CardLoder/CardLoder";

const SearchFilterInput = (props) => {
  const event = () => {};
  return (
    <div className="search-filter-input-field-os">
      <label>{props.inputLabel}</label>
      <input
        onChange={props.inputOnChange || event}
        onFocus={props.onFocus}
        type={props.inputType}
        placeholder={props.placeHolder}
        defaultValue={props.defaultValue || ""}
        {...(props?.min ? { min: props.min } : {})}
      />
    </div>
  );
};

const CarHomeBikeLucky = ({
  suggestion,
  setSuggestion,
  setData,
  data,
  user,
}) => {
  const { queryParams } = useGetQueryParams();
  const [activeVehicleFilter, setActiveVehicleFilter] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [profile, setProfile] = useState();
  const [loading, setLoading] = useState(false);
  const [nextURL, setnextURL] = useState();
  const [userDetails, setUserDetails] = useState({});
  const panelImg = process.env.NEXT_PUBLIC_IMAGES;
  const itemsPerPage = 60;
  const handleValues = (key, value) => {
    const formattedValue = value
      .split(/,+/) // Split by consecutive commas
      .filter((v) => v.trim().length > 0) // Filter out empty values
      .map((v) => v.trim()); // Trim each value

    setSuggestion((prevState) => {
      return {
        ...prevState,
        [key]: formattedValue,
      };
    });
  };

  useEffect(() => {
    if (user?.token) {
      setLoading(true); // Show loader when the API request starts
      getProfile(user?.token)?.then((res) => {
        setProfile(res?.contact_cf);
        setUserDetails(res);
        if (
          res?.contact_cf?.car_number === "" &&
          res?.contact_cf?.house_number === "" &&
          res?.contact_cf?.lucky_number === "" &&
          res?.contact_cf?.date_of_anniversary === "" &&
          res?.contactsubdetails?.date_of_birth === ""
        ) {
          setLoading(false); // Hide loader if there are no suggestion values
          return;
        }
        setSuggestion({
          car_number: res?.contact_cf?.car_number,
          house_number: res?.contact_cf?.house_number,
          lucky_number: res?.contact_cf?.lucky_number,
          date_of_anniversary: res?.contact_cf?.date_of_anniversary,
          date_of_birth: res?.contactsubdetails?.date_of_birth,
        });
        const endWithValues = [
          res?.contact_cf?.car_number,
          res?.contact_cf?.house_number,
          res?.contact_cf?.lucky_number,
          res?.contact_cf?.date_of_anniversary,
        ].filter(Boolean); // Remove empty values
        if (!endWithValues.length && !Object.values(suggestion || {})?.length) {
          setLoading(false); // Hide loader if there are no suggestion values
          return;
        }

        SearchAdvanceAPI("advanced", {
          end_with: endWithValues.join(","),
          ...queryParams,
          page: currentPage,
          paginate: itemsPerPage,
        }).then((res) => {
          //toast.info("Suggestion loaded successfully");
          setnextURL(res?.nextURL);
          setData(res?.data);
          //setData([...data, ...res?.data]);
          setLoading(false); // Hide loader when API response is received
        });
      });
    }
  }, [user, queryParams]);

  const updateUserProfile = () => {
    const {
      car_number,
      house_number,
      lucky_number,
      date_of_anniversary,
      date_of_birth,
    } = suggestion;
    const { mobile, lastname, firstname, email } = userDetails;
    // Prepare the updated profile data
    const updatedProfile = {
      full_name: firstname + " " + lastname || "",
      mobile: mobile || "",
      email: email || "",
      car_number: car_number?.toString() || "",
      house_number: house_number?.toString() || "",
      lucky_number: lucky_number?.toString() || "",
      // date_of_anniversary: formatDate(date_of_anniversary) || "",
      date_of_anniversary: date_of_anniversary || "",
      // date_of_birth: formatDate(date_of_birth) || "",
      date_of_birth: date_of_birth || "",
    };

    // Send the updated profile data to the server
    updateProfile(updatedProfile, user?.token)
      .then((res) => {})
      .catch((error) => {
        console.error("Error updating profile:", error);
      });
  };

  return (
    <section className="CarHomeBikeLucky-section-os">
      <div className="container-os">
        <div className="CarHomeBikeLucky-heading-os">
          <MainHeading
            MainHeading="Match your Number"
            rightImage={`${panelImg}/assets/img/vip-images/crown-icon1_imduk0.webp`}
          />
        </div>

        <div
          className={`CarHomeBikeLucky-filter-os ${
            data && data.length > 0 ? "active" : ""
          }`}
        >
          <div
            onClick={() => {
              setActiveVehicleFilter(!activeVehicleFilter);
            }}
            className="CarHomeBikeLucky-filter-heading-os"
          >
            Update Profile & Suggestions
            <span></span>
          </div>
          {activeVehicleFilter && (
            <div className="CarHomeBikeLucky-filter-content-os">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setLoading(true); // Show loader when the API request starts

                  SearchAdvanceAPI("advanced", {
                    end_with: Object.values(suggestion)
                      .flat()
                      .filter(Boolean)
                      .join(","),
                    ...queryParams,
                  }).then((res) => {
                    setData([...res?.data, ...data]);
                    setnextURL(res?.nextURL);

                    setLoading(false); // Hide loader when API response is received
                  });
                  updateUserProfile();
                }}
              >
                <div className="CarHomeBikeLucky-filter-content-row-os">
                  <div className="CarHomeBikeLucky-filter-content-col-os CarHomeBikeLucky-filter-content-col-1-os">
                    <SearchFilterInput
                      inputLabel="Vehicle Number"
                      inputType="text"
                      placeHolder="e.g: 3456"
                      defaultValue={profile?.car_number}
                      inputValue={suggestion?.car_number}
                      inputOnChange={(e) => {
                        const filteredValue = e.target.value.replace(
                          /[^0-9,]/g,
                          ""
                        );
                        handleValues("car_number", filteredValue);
                      }}
                    />
                  </div>

                  <div className="CarHomeBikeLucky-filter-content-col-os CarHomeBikeLucky-filter-content-col-1-os">
                    <SearchFilterInput
                      inputLabel="House Number"
                      inputType="text"
                      defaultValue={profile?.house_number}
                      placeHolder="e.g: 578"
                      inputValue={suggestion?.house_number}
                      inputOnChange={(e) => {
                        const filteredValue = e.target.value.replace(
                          /[^0-9,]/g,
                          ""
                        );
                        handleValues("house_number", filteredValue);
                      }}
                    />
                  </div>

                  <div className="CarHomeBikeLucky-filter-content-col-os CarHomeBikeLucky-filter-content-col-1-os">
                    <SearchFilterInput
                      inputLabel="Lucky Number"
                      inputType="text"
                      defaultValue={profile?.lucky_number}
                      placeHolder="e.g: 9"
                      inputValue={suggestion?.lucky_number}
                      inputOnChange={(e) => {
                        const filteredValue = e.target.value.replace(
                          /[^0-9,]/g,
                          ""
                        );
                        handleValues("lucky_number", filteredValue);
                      }}
                    />
                  </div>

                  <div className="CarHomeBikeLucky-filter-content-col-os CarHomeBikeLucky-filter-content-col-1-os">
                    <SearchFilterInput
                      inputLabel="Birth Date"
                      inputType="date"
                      defaultValue={suggestion?.date_of_birth}
                      placeHolder="Birth date"
                      inputValue={suggestion?.date_of_birth}
                      onFocus={(e) => (e.target.type = "date")}
                      inputOnChange={(e) => {
                        const filteredValue = e.target.value.replace(
                          /[^0-9,]/g,
                          ""
                        );
                        handleValues("date_of_birth", filteredValue);
                      }}
                    />
                  </div>

                  <div className="CarHomeBikeLucky-filter-content-col-os CarHomeBikeLucky-filter-content-col-1-os">
                    <SearchFilterInput
                      inputLabel="Anniversary Date"
                      inputType="date"
                      placeHolder="Anniversary Date"
                      defaultValue={profile?.date_of_anniversary}
                      inputValue={suggestion?.date_of_anniversary}
                      inputOnChange={(e) => {
                        const filteredValue = e.target.value.replace(
                          /[^0-9-,]/g,
                          ""
                        );
                        handleValues("date_of_anniversary", filteredValue);
                      }}
                    />
                  </div>
                  <div className="CarHomeBikeLucky-filter-content-col-os CarHomeBikeLucky-filter-search-btn-os">
                    <SearchFilterButton onClick={() => {}} />
                  </div>
                </div>
              </form>
            </div>
          )}
        </div>
        {/* {/ Show loader if loading state is true /} */}
        {loading && <CardLoder columns={5} gridItems={20} />}
        <div>
          {data && data.length > 0 && (
            <div className="featured-number-row-os grid__category">
              {data.map((product) => {
                const vipNumbers = product.productname.split("-").join("");
                const total = vipNumbers
                  .split("")
                  .reduce((acc, num) => acc + parseInt(num), 0)
                  .toString();
                const sum =
                  total
                    .split("")
                    .reduce((acc, num) => acc + parseInt(num), 0)
                    .toString().length > 0
                    ? total
                        .split("")
                        .reduce((acc, num) => acc + parseInt(num), 0)
                        .toString()
                        .split("")
                        .reduce((acc, num) => acc + parseInt(num), 0)
                        .toString()
                    : total;
                const showCod = product.cod === "yes";
                const showComingSoon = product.rtp_date === null;
                const formatPriceWithCommas = (price) => {
                  const options = {
                    style: "decimal",
                    useGrouping: true,
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 2,
                  };
                  return parseFloat(price).toLocaleString("en-IN", options);
                };
                const formattedPrice = formatPriceWithCommas(
                  product.unit_price
                );

                return (
                  <Card
                    key={product.productid}
                    product_id={product.productid}
                    productname={product.productname}
                    number={product.number}
                    rating={Math.floor(product.rating)}
                    cod={showCod ? product.cod : "cod"}
                    coming_soon={showComingSoon ? null : "Coming Soon"}
                    unit_price={formattedPrice}
                    total={product.total}
                    sum={product.sum}
                    card_btn_text={product.card_btn_text}
                    seller_type={product.seller_type}
                    rtp_date={product.rtp_date}
                    buttonTitle="Buy Now"
                    comingsoon={product.comingsoon}
                    comingsoon_date={product.comingsoon_date}
                    speciality={product.speciality}
                    star_status={product.star_status}
                  />
                );
              })}
            </div>
          )}
          {data && data.length > 0 && (
            <div className="default-loadMore-button-os">
              <ViewMoreButton
                onClick={() => {
                  const endWithValues = [
                    suggestion?.car_number,
                    suggestion?.house_number,
                    suggestion?.lucky_number,
                    suggestion?.date_of_anniversary,
                  ].filter(Boolean);

                  SearchAdvanceAPI(
                    "advanced",
                    {
                      end_with: endWithValues.join(","),
                      ...queryParams,
                      page: currentPage + 1,
                      paginate: itemsPerPage,
                    },
                    {},
                    nextURL
                  ).then((res) => {
                    setData((prevData) => [...prevData, ...res?.data]); // Update the loadedData state
                    setnextURL(res?.nextURL);
                    setLoading(false);
                  });

                  setCurrentPage((prevPage) => prevPage + 1); // Increment the page number
                }}
                title="Load More"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CarHomeBikeLucky;
