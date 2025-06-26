import React, { useContext, useEffect, useState } from "react";
import "./MovieNight.css";
import axios from "axios";
import { toast } from "react-toastify";
import { AppStateContext } from "../contexts/AppStateContext/AppStateContext";
import { useRouter } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
// import required modules
import { Navigation } from "swiper/modules";
import Link from "next/link";
import Image from "next/image";
const SliderView = ({ setDataSlider }) => {
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
  const panelImg = process.env.NEXT_PUBLIC_IMAGES;

  useEffect(() => {
    const getImages = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/web/numbers/images/Slider View`
        );
        const imagesData = response?.data?.data?.data || [];
        setData(imagesData);
        setDataSlider(imagesData);
        setPdp(false);
      } catch (error) {
        console.log(error);
      }
    };
    getImages();
  }, []);

  const handleBookNowClick = (item) => {
    localStorage.setItem("Lead-Page", "Book-Now");
    setPdp(true);
    if (pdp) {
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
    <section className="bg-primary  py-[15px]">
      <div className="container-os">
        <div className="SpecialShowcase-main-fx">
          <div className="grid lg:grid-cols-[2fr_3fr] gap-5 items-center">
            <Link href="https://www.smartcardly.com/" target="_blank">
              <div>
                <Image
                  src={`${panelImg}/assets/img/vip-images/slidcars_vs5f83.webp`}
                  alt="Slider Cars"
                  width={300}
                  height={100}
                  priority="true"
                />
              </div>
            </Link>
            <Swiper
              navigation={true}
              modules={[Navigation]}
              className="mySwiper"
            >
              {data.length > 0 ? (
                data.map((item, index) => (
                  <SwiperSlide key={index}>
                    <div className="bg-[url('https://d3re4dy3egxmsz.cloudfront.net/assets/img/vip-images/SpecialShowcaseback_mh7pcn.webp')] bg-no-repeat col-start-2 col-end-3 p-6 bg-cover relative rounded-2xl">
                      <div className="text-center">
                        <p className="text-primary text-[48px] font-roboto font-extrabold uppercase tracking-wider m-0 leading-none text-shadow-lg">
                          <span className="md:text-[55px] text-[30px] leading-[40px] md:leading-[75px]">
                            VIP Number Shop
                          </span>
                        </p>
                      </div>
                      <h3 className="text-[30px] leading-7 font-bold">
                        {item?.speciality || "Exclusive Premium"}
                      </h3>
                      <div className="lg:py-5 py-3">
                        <div className="p-2 border-2 border-secondary   rounded-[20px] m-auto w-fit">
                          <div className="p-2 bg-[#ef6b19] rounded-[19px]">
                            <h3 className="text-3xl lg:leading-[50px] leading-[20px] bg-[#ef6b19] text-white border-2 border-white rounded-[15px] p-4 w-fit mx-auto font-bold">
                              {item.productname}
                            </h3>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <h3 className="text-base font-bold leading-[30px]  lg:text-[20px] text-black">
                          &#8377;{" "}
                          {Math.round(parseFloat(item.compare_at_price)) >
                            Math.round(parseFloat(item.unit_price)) &&
                            Math.round(
                              parseFloat(item.compare_at_price)
                            ).toLocaleString("en-IN", {
                              minimumFractionDigits: 0,
                              maximumFractionDigits: 2,
                            })}
                          /-
                        </h3>
                        <h3 className="text-base font-bold leading-[30px]  lg:text-[20px]   text-primary  ">
                          {parseFloat(item?.unit_price).toLocaleString(
                            "en-IN",
                            {
                              minimumFractionDigits: 0,
                              maximumFractionDigits: 2,
                            }
                          )}
                          /-
                        </h3>
                        <div className="button-book-now">
                          <button
                            className="cursor-pointer text-center md:text-[16px] leading-5 bg-primary  rounded-md text-white lg:p-3 lg:font-bold  p-1  text-[13px] font-medium hover:bg-secondary  hover:text-white"
                            onClick={() => handleBookNowClick(item)}
                            aria-label="Book Now"
                          >
                            Book Now
                          </button>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))
              ) : (
                <p>No items available to display.</p>
              )}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SliderView;
