import axios from "axios";
import React, { useEffect, useState } from "react";
import TabNumberData from "./TabNumberData/TabNumberData";
import PriceNumber from "../../SpotifyDesign/PriceNumber";
import Recommendations from "../../home/Recommendations/Recommendations";
import MarineLifeSwiper from "../../SwiperSlider/MarineLifeSwiper";
import SliderView from "../../SwiperSlider/SliderView";
import TrustPoint from "../../SwiperSlider/TrustPoint";
import VideoTestimonial from "../VideoTestimonial/VideoTestimonial";
import CityHowGetVipNumber from "../City/CityHowGetVipNumber/CityHowGetVipNumber";
import debounce from "lodash/debounce";
import FamilyPack from "@/app/home/FamilyPack/FamilyPack";
import QRVipApp from "../QRVipApp/QRVipApp";
import Benefits from "@/app/home/Benefits/Benefits";
import ClientVideo from "@/app/ClientVideo/ClientVideo";
import Image from "next/image";
import { NetedCategory } from "../../nestedCategories/NetedCategory";
import CardLoder from "@/app/CardLoder/CardLoder";
// const VipNumberShopSliderImages1 = dynamic(
//   () =>
//     import("@/app/home/VipNumberShopSliderImages1/VipNumberShopSliderImages1"),
//   { ssr: false }
// );
const TabNumbers = () => {
  const [data, setData] = useState();
  // const [dataUrl, setDataUrl] = useState();
  // const [dataSlider, setDataSlider] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const apiUrl = process.env.NEXT_PUBLIC_LEAFYMANGO_API_URL;
  // const panelImg = process.env.NEXT_PUBLIC_IMAGES;
  const [isMobile, setIsMobile] = useState(false);
  // const [categoriesTop, setCategoriesTop] = useState([]);
  // const [categoriesMiddle, setCategoriesMiddle] = useState([]);
  // const [categoriesBottom, setCategoriesBottom] = useState([]);
  // const [selectedCategoryTop, setSelectedCategoryTop] = useState(null);
  // const [selectedCategoryMiddle, setSelectedCategoryMiddle] = useState(null);
  // const [selectedCategoryBottom, setSelectedCategoryBottom] = useState(null);
  // const [productIndexes, setProductIndexes] = useState({});
  // const [viewingProduct, setViewingProduct] = useState({});
  // const [currentIndex, setCurrentIndex] = useState(0);

  // const [loadingNextData, setLoadingNextData] = useState(false);
  // useEffect(() => {
  //   const apiUrl = process.env.NEXT_PUBLIC_LEAFYMANGO_API_URL;
  //   axios
  //     .get(`${apiUrl}/web/numbers/homecategories`)
  //     .then((response) => {
  //       const { top, middle, bottom } = response.data;

  //       const transformData = (data) =>
  //         Object.keys(data).map((key) => ({
  //           tabName: key,
  //           items: data[key],
  //         }));

  //       setCategoriesTop(transformData(top));
  //       setCategoriesMiddle(transformData(middle));
  //       setCategoriesBottom(transformData(bottom));

  //       if (transformData(top).length > 0) setSelectedCategoryTop(transformData(top)[0]);
  //       if (transformData(middle).length > 0) setSelectedCategoryMiddle(transformData(middle)[0]);
  //       if (transformData(bottom).length > 0) setSelectedCategoryBottom(transformData(bottom)[0]);

  //       const initializeIndexes = (data) => {
  //         const initialIndexes = {};
  //         const initialViewingProduct = {};
  //         data.forEach((category) => {
  //           category.items.forEach((item) => {
  //             initialIndexes[item.id] = 0;
  //             initialViewingProduct[item.id] = false;
  //           });
  //         });
  //         return { initialIndexes, initialViewingProduct };
  //       };

  //       const topInit = initializeIndexes(transformData(top));
  //       const middleInit = initializeIndexes(transformData(middle));
  //       const bottomInit = initializeIndexes(transformData(bottom));

  //       setProductIndexes({
  //         ...topInit.initialIndexes,
  //         ...middleInit.initialIndexes,
  //         ...bottomInit.initialIndexes,
  //       });
  //       setViewingProduct({
  //         ...topInit.initialViewingProduct,
  //         ...middleInit.initialViewingProduct,
  //         ...bottomInit.initialViewingProduct,
  //       });
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching data:", error);
  //     });
  // }, []);

  useEffect(() => {
    axios
      .get(`${apiUrl}/web/numbers/stats`)
      .then((response) => {
        // setData((prevData) => [...prevData, ...response.data.data]);
        setData(response?.data?.data);
      })
      .catch(() => {
        setIsLoading(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  // const observer = useRef(
  //   new IntersectionObserver(
  //     (entries) => {
  //       entries.forEach((entry) => {
  //         console.log("Observer triggered:", entry.isIntersecting); // Debugging line

  //         // If the last item is visible, increment currentIndex to load more data
  //         if (entry.isIntersecting) {
  //           console.log("Last item visible, incrementing index");

  //           // Update state and log after re-render
  //           setLoadingNextData(true);
  //           setTimeout(() => {
  //             setCurrentIndex((prevIndex) => prevIndex + 3);
  //             setLoadingNextData(false);  // Hide loader after 2 seconds
  //           }, 100);
  //         }
  //       });
  //     },
  //     { threshold: 0.5 }  // Trigger when 50% of the item is visible
  //   )
  // );

  // const lastItemRef = useRef(null);

  // useEffect(() => {
  //   if (lastItemRef.current) {
  //     observer.current.observe(lastItemRef.current);
  //   }

  //   return () => {
  //     if (lastItemRef.current) {
  //       observer.current.unobserve(lastItemRef.current);
  //     }
  //   };
  // }, [currentIndex, data]);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Mobile width breakpoint
    };

    const debounceResize = debounce(handleResize, 200); // Debounce resize event
    handleResize(); // Set initial state
    window.addEventListener("resize", debounceResize);
    return () => window.removeEventListener("resize", debounceResize);
  }, []);

  return (
    <div className="TabNumbers-os">
      {data &&
        // data.slice(0, currentIndex + 1).map((item, index) => (
        data.map((item, index) => (
          <div key={index}>
            <TabNumberData
              title={item?.title}
              data={item?.numbers}
              key={index}
              link={item?.link}
              description={item?.description}
            />
            {/* {(index === 0 && selectedCategoryTop?.items?.length > 0) && (
              <NetedCategory
                viewingProduct={viewingProduct}
                productIndexes={productIndexes}
                selectedCategory={selectedCategoryTop}
                categories={categoriesTop}
                setProductIndexes={setProductIndexes}
                setViewingProduct={setViewingProduct}
                setSelectedCategory={setSelectedCategoryTop}
              />
            )} */}

            {index === 1 && <ClientVideo />}
            {index === 2 && <FamilyPack counter={2} />}
            {index === 3 && <Benefits />}
            {index === 4 && <QRVipApp />}
            {/* {(index === 5 && selectedCategoryMiddle?.items?.length > 0) && (
              <NetedCategory
                viewingProduct={viewingProduct}
                productIndexes={productIndexes}
                selectedCategory={selectedCategoryMiddle}
                categories={categoriesMiddle}
                setProductIndexes={setProductIndexes}
                setViewingProduct={setViewingProduct}
                setSelectedCategory={setSelectedCategoryMiddle}
              />
            )} */}
            {index === 6 && <FamilyPack counter={3} />}
            {index === 7 && !isMobile && (
              <CityHowGetVipNumber
                headingPart1="Delivery Process for"
                headingPart2="VIP Number"
                headingPart3="?"
              />
            )}
            {index === 7 && <FamilyPack counter={3} />}
            {index === 8 && <PriceNumber />}
            {index === 9 && isMobile && <Recommendations />}
            {index === 10 && <TrustPoint />}
            {index === 10 && <FamilyPack counter={4} />}
            {/* {index === 10 && dataUrl?.length !== 0 && (
              <MarineLifeSwiper setDataUrl={setDataUrl} />
            )} */}
            {/* comment sider */}
            {/* {index === 10 && <VideoTestimonial />} */}
            {/* {index === 10 && <FamilyPack counter={4} />}
            {index === 10 && dataSlider?.length !== 0 && (
              <SliderView setDataSlider={setDataSlider} />
            )} */}
            {/* {(index === 10 && selectedCategoryBottom?.items?.length > 0) && (
              <NetedCategory
                viewingProduct={viewingProduct}
                productIndexes={productIndexes}
                selectedCategory={selectedCategoryBottom}
                categories={categoriesBottom}
                setProductIndexes={setProductIndexes}
                setViewingProduct={setViewingProduct}
                setSelectedCategory={setSelectedCategoryBottom}
              />
            )} */}
            {/* {index === 10 && <TrustPoint />} */}
            {/* {index === 15 && (
              <>
                <VipNumberShopSliderImages1 />
              </>
            )} */}

            {/* {index === currentIndex && (
              <div ref={lastItemRef} style={{ height: "10px" }} /> // Observer for the last item
            )} */}
          </div>
        ))}
      {isLoading && (
      // <CardLoder  />
      <CardLoder columns={5} gridItems={60} />
      )}
    </div>
  );
};

export default TabNumbers;
