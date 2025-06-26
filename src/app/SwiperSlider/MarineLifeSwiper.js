import React, { useContext, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "./swiperSlider.css";
import { EffectCoverflow, Pagination } from "swiper/modules";
import axios from "axios";
import { toast } from "react-toastify";
import { AppStateContext } from "../contexts/AppStateContext/AppStateContext";
import { useRouter } from "next/navigation";
import ViewMoreButton from "../Shared/ViewMoreButton/ViewMoreButton";

export default function MarineLifeSwiper({ setDataUrl }) {
  const router = useRouter();
  const [data, setData] = useState([]);

  const {
    addToCart,
    checkUser,
    setCartCache,
    cartItems,
    setCartCacheData,
    setCartClick,
    setPdp,
    pdp,
  } = useContext(AppStateContext);
  const apiUrl = process.env.NEXT_PUBLIC_LEAFYMANGO_API_URL;
  useEffect(() => {
    const getImages = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/web/numbers/images/Image View`
        );
        setData(response?.data?.data?.data);
        setDataUrl(response?.data?.data?.data);
      } catch (error) {
        console.log(error);
      }
    };
    getImages();
  }, []);

  const handleBookNowClick = (item) => {
    localStorage.setItem("Lead-Page", "Book-Now");
    setPdp(true);
    if (pdp === true) {
      return;
    }
    const cartCacheSavedData =
      JSON.parse(localStorage.getItem("cartCacheSavedData")) || [];

    const isItemAlreadyInCart = cartCacheSavedData.some(
      (cartItem) => cartItem?.number === item?.number
    );

    if (!checkUser() && !isItemAlreadyInCart) {
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

      localStorage.setItem(
        "cartCacheSavedData",
        JSON.stringify(updatedCartCacheData)
      );
      localStorage.setItem("cartCacheNumber", JSON.stringify(updatedCartCache));
      setCartCacheData(updatedCartCacheData);
      setCartCache(updatedCartCache);
      toast.success("Item added to cart successfully!");
      setCartClick(true);
      router.push("/details");
    } else if (isItemAlreadyInCart) {
      toast.success("Item already in cart!");
      router.push("/details");
    } else {
      if (cartItems.some((cartItem) => cartItem?.number === item?.number)) {
        router.push("/details");
      } else {
        addToCart({
          ...item,
          number: item?.number,
          product_id: item?.productid,
          tag:'new'
        });
        setCartClick(true);
        router.push("/details");
      }
    }
  };

  return (
    <div className="coverFlow">
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        initialSlide={3}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={true}
        modules={[EffectCoverflow, Pagination]}
        className="mySwiper"
      >
        {data.map((item, index) => (
          <SwiperSlide key={index}>
            {/* <img src={`https://leafymango.com/${item.path}${item.attachmentsid}_${item.imagename}`} alt={`Slide ${index}`} onClick={() => handleBookNowClick(item)} /> */}
            <div className="card-abc">
              <div className="header-abc">
                <h2>VIP MOBILE NUMBER</h2>
              </div>
              <div className="tag-abc">
                {item.speciality ? item.speciality : "YOUR PERFECT MATCH"}
              </div>
              <div className="number-display-abc">
                <span>{item.productname}</span>
              </div>
              <div className="price-abc">
                <span>
                  &#8377;{" "}
                  {parseFloat(item?.unit_price).toLocaleString("en-IN", {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 2,
                  })}
                  /-
                </span>
              </div>
              <ViewMoreButton
                title={"Book Now"}
                onClick={() => handleBookNowClick(item)}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
