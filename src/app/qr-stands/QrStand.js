"use client";
import { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import delivery from "../../../public/assets/delivery.svg";
import shield from "../../../public/assets/shield.svg";
import cod from "../../../public/assets/cod.svg";
import facebook from "../../../public/assets/f-one.svg";
import google from "../../../public/assets/g-two.svg";
import instagram from "../../../public/assets/i-three.svg";
import www from "../../../public/assets/four-w.svg";
import whatsapp from "../../../public/assets/w-five.svg";
import youtube from "../../../public/assets/y-six.svg";
import contact from "../../../public/assets/c-seven.svg";
import Slider from "react-slick";
import oneqrcode from "../../../public/assets/oneqrcode.jpg";
import twoqrcode from "../../../public/assets/twoqrcode.jpg";
import threeqrcode from "../../../public/assets/threeqrcode.webp";
import { toast } from "react-toastify";
import { AppStateContext } from "../contexts/AppStateContext/AppStateContext";
import { MyRegisterSignInContext } from "../contexts/MyRegisterSignInContext/MyRegisterSignInContext";
function QrStand() {
  const { setActiveSignInWithOtp } = useContext(MyRegisterSignInContext);
  const { user, setDiscountPop, setQrData, qrCheckout } =
    useContext(AppStateContext);
  const qrPrices = [
    {
      qrCount: 1,
      originalPrice: 1499,
      discountedPrice: 999,
      discount: 33,
      SKU: "A264673",
    },
    {
      qrCount: 2,
      originalPrice: 1499,
      discountedPrice: 999,
      discount: 33,
      SKU: "A264672",
    },
    {
      qrCount: 3,
      originalPrice: 1699,
      discountedPrice: 1099,
      discount: 35,
      SKU: "A264671",
    },
  ];
  const [selectedQR, setSelectedQR] = useState(1); // Default QR option is 1 QR
  const [currentImage, setCurrentImage] = useState(oneqrcode);
  // Get the selected QR price details from the array
  const selectedPrice = qrPrices.find((item) => item.qrCount === selectedQR);
  const [selectedNames, setSelectedNames] = useState("");
  const images = [oneqrcode, twoqrcode, threeqrcode];
  const [selectedOptions, setSelectedOptions] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]); // Store state for all checkboxes
  const handleThumbnailClick = (image, index) => {
    setCurrentImage(image); // Change the main image when a thumbnail is clicked
    setSelectedQR(index + 1);
  };
  // Handle checkbox change
  const handleCheckboxChange = (index) => {
    // Only allow selection if the number of selected checkboxes is less than the selectedQR value
    if (
      selectedOptions.filter((option) => option).length < selectedQR ||
      selectedOptions[index]
    ) {
      const newSelectedOptions = [...selectedOptions];
      newSelectedOptions[index] = !newSelectedOptions[index];
      setSelectedOptions(newSelectedOptions);
      const selectedNamesArray = newSelectedOptions
        .map((isSelected, idx) =>
          isSelected
            ? [
                "Facebook",
                "Google Reviews",
                "Instagram",
                "Website",
                "Whatsapp",
                "YouTube",
                "Save Contact",
                "Payment QR",
              ][idx]
            : null
        )
        .filter((name) => name !== null); // Filter out null values

      // Join them into a comma-separated string
      setSelectedNames(selectedNamesArray.join(", "));
    } else {
      toast.error(`You can only select up to ${selectedQR} products.`);
    }
  };

  const handleQRChange = (event) => {
    setSelectedQR(Number(event.target.value)); // Update the selected QR option based on the radio button value
    setSelectedOptions([
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
    ]);
    setCurrentImage(images[Number(event.target.value) - 1]);
  };
  useEffect(() => {
    // Default logic to set the initial image
    setCurrentImage(images[selectedQR - 1]);
  }, [selectedQR]);
  const [reviews, setReviews] = useState([
    {
      id: 1,
      name: "Rahul",
      initial: "R",
      time: "3 Days ago",
      rating: 5,
      product: "Great Product",
      review:
        "The QR stand from Smart Cardly is a game changer for my office! I got the one with 2 QR codes for Instagram and contact saving. The white and golden finish gives it a premium look. Customization was seamless, and the delivery was prompt. Great product!",
    },
    {
      id: 2,
      name: "Lalit",
      initial: "L",
      time: "3 Days ago",
      rating: 5,
      product: "Great Product",
      review:
        "The QR stand from Smart Cardly is a game changer for my office! I got the one with 2 QR codes for Instagram and contact saving. The white and golden finish gives it a premium look. Customization was seamless, and the delivery was prompt. Great product!",
    },
    {
      id: 3,
      name: "Rohan",
      initial: "R",
      time: "3 Days ago",
      rating: 5,
      product: "Great Product",
      review:
        "Maine apne business ke liye Smart Cardly ka QR stand liya, Instagram aur payment QR ke liye customize kiya. Design bohot stylish hai aur customer ko easily connect karne mein madad milti hai. Quality bhi best hai, free delivery aur COD ka option bohot convenient raha!",
    },
  ]);
  const handleLike = (id) => {
    const updatedReviews = reviews.map((review) => {
      if (review.id === id) {
        const newLikedState = !review.liked;
        return { ...review, liked: newLikedState, disliked: false };
      }
      return review;
    });

    setReviews(updatedReviews);

    // Update localStorage
    localStorage.setItem("liked_" + id, true);
    localStorage.setItem("disliked_" + id, false);
  };

  const handleDislike = (id) => {
    const updatedReviews = reviews.map((review) => {
      if (review.id === id) {
        const newDislikedState = !review.disliked;
        return { ...review, disliked: newDislikedState, liked: false };
      }
      return review;
    });

    setReviews(updatedReviews);

    // Update localStorage
    localStorage.setItem("disliked_" + id, true);
    localStorage.setItem("liked_" + id, false);
  };

  useEffect(() => {
    const updatedReviews = reviews.map((review) => {
      const storedLiked = localStorage.getItem("liked_" + review.id) === "true";
      const storedDisliked =
        localStorage.getItem("disliked_" + review.id) === "true";

      return { ...review, liked: storedLiked, disliked: storedDisliked };
    });
    setReviews(updatedReviews);
  }, []);

  const handleCheckout = () => {
    if (selectedNames === "") {
      toast.error(
        "Please select at least one checkbox before proceeding to checkout."
      );
      return; // Stop further execution if no social options are selected
    }
    if (!user?.token) {
      setActiveSignInWithOtp(true);
      localStorage.setItem("Lead-Page", "qr-codes");
    } else {
      setDiscountPop(true);
      localStorage.setItem("Lead-Page", "qr-codes");
      setQrData((prevData) => ({
        ...prevData,
        amount: selectedPrice.discountedPrice,
        qrcode: selectedQR,
        social: selectedNames,
      }));
    }
  };
  const settings = {
    infinite: true, // Ensures the carousel will loop infinitely
    slidesToShow: 3, // Show 3 images at a time
    slidesToScroll: 1, // Scroll one image at a time
    centerMode: true, // Center the current image
    arrows: true,
    focusOnSelect: true, // Ensure the selected image is focused
    responsive: [
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 2, // Show 1 image on smaller screens
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3, // Show 2 images on medium screens
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3, // Show 1 image on smaller screens
        },
      },
      {
        breakpoint: 1440,
        settings: {
          slidesToShow: 3, // Show 2 images on medium screens
        },
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* <header className="bg-green-700 text-white py-3">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center">
            <Link href="/">
              <h1 className="text-xl font-black">VIP NUMBER SHOP</h1>
            </Link>
          </div>
        </div>
      </header> */}

      {/* Main Content */}
      <main className="md:container mx-auto px-4 py-3 md:pt-1 container-os">
        {/* Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Product Images */}
          <div className="space-y-4 arrow-handle md:w-[92%]">
            <div className="relative">
              <Image
                src={currentImage} // Set the dynamically selected image as the main image
                alt="Customizable Table Stand"
                className="w-full  rounded-lg shadow-lg"
              />
            </div>

            {/* Thumbnail Images */}
            {/* <div className="flex space-x-2"> */}
            <Slider {...settings}>
              {images.map((image, index) => (
                <div
                  key={index}
                  className="h-[130px] w-[130px] bg-gray-200 rounded border-2 border-gray-300 hover:border-primary cursor-pointer"
                  onClick={() => handleThumbnailClick(image, index)}
                >
                  <Image
                    src={image}
                    alt={`Product view ${index + 1}`}
                    className="w-full h-full object-cover rounded"
                  />
                </div>
              ))}
            </Slider>
            {/* </div> */}
          </div>

          {/* Product Details */}
          <div className="space-y-2">
            <div>
              <h1 className="text-2xl text-gray-800 mb-1">
                Customizable Table Stands with QR Codes
              </h1>
              <div className="flex flex-col md:flex-row gap-2 md:gap-0 justify-between">
                <div className="grid">
                  <span className="text-gray-600 text-[15px]">
                    SKU:{" "}
                    <span className="font-black text-gray-900">
                      {selectedPrice.SKU}
                    </span>
                  </span>
                  <span className="text-gray-600 text-[15px]">
                    Brand:{" "}
                    <span className="font-black text-gray-900">
                      Customizable Table Stands with QR Code
                    </span>
                  </span>
                </div>
                <div className="grid">
                  <span className="text-gray-600 text-[15px]">
                    Availability:{" "}
                    <span className="text-primary font-black">In Stock</span>
                  </span>
                  <span className="text-gray-600 text-[15px]">
                    Category:{" "}
                    <span className="font-black text-gray-900">
                      QR Code Stand
                    </span>
                  </span>
                </div>
              </div>
            </div>

            {/* Pricing */}
            <div className="flex items-center gap-3 ">
              {/* Render prices dynamically based on the selected QR option */}
              <span className="text-gray-500 line-through text-[18px]">
                Rs. {selectedPrice.originalPrice}
              </span>
              <span className="text-2xl font-black text-red-600">
                Rs. {selectedPrice.discountedPrice}.00
              </span>
              <span className="bg-secondary text-black-600 px-2 py-1  text-sm font-medium">
                {selectedPrice.discount}% off
              </span>
            </div>
            <hr />
            {/* QR Code Options */}
            <div>
              <h3 className="font-black text-gray-700  mb-1 text-xl">
                Available in 1, 2, or 3 QR Codes
              </h3>
              <div className="space-y-2">
                {qrPrices.reverse().map((item) => (
                  <label
                    key={item.qrCount}
                    className="flex items-center space-x-2 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="qr-option"
                      value={item.qrCount}
                      checked={selectedQR === item.qrCount}
                      onChange={handleQRChange}
                      className="hidden" // Hide the default radio button
                    />
                    <span
                      className={`w-5 h-5 rounded-full border-4 ${
                        selectedQR === item.qrCount
                          ? "bg-primary border-primary" // Green circle and green border when selected
                          : "bg-white border-gray-300" // Default circle color when not selected
                      } transition-all duration-300 flex items-center justify-center`}
                    >
                      {/* Inner circle (fully green when selected) */}
                      {selectedQR === item.qrCount && (
                        <span className="w-4 h-4 bg-primary rounded-full"></span> // Fully green inner circle when selected
                      )}
                    </span>
                    <span>
                      QR Stand with {item.qrCount} QR
                      {item.qrCount > 1 ? "s" : ""}
                    </span>
                  </label>
                ))}
              </div>
            </div>
            <hr />
            {/* Platform Selection */}
            <div>
              <h3 className="text-gray-900 mb-1 flex items-center gap-2">
                <span className="text-base">Select Any</span>
                <span className="font-black text-xl">{selectedQR}</span>
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-2">
                {[
                  { src: facebook, label: "Facebook" },
                  { src: google, label: "Google Reviews" },
                  { src: instagram, label: "Instagram" },
                  { src: www, label: "Website" },
                  { src: whatsapp, label: "Whatsapp" },
                  { src: youtube, label: "YouTube" },
                  { src: contact, label: "Save Contact" },
                  // { src: payQr, label: "Payment QR" },
                ].map((item, index) => {
                  const isSpecialItem =
                    item.label === "Google Reviews" ||
                    item.label === "Save Contact";
                  return (
                    <label key={index} className="flex items-center space-x-2">
                      <span
                        className={`w-[200px] flex items-center justify-around ${
                          isSpecialItem ? "gap-[8px]" : "gap-3"
                        } border border-gray-300 rounded-xl p-3 cursor-pointer`}
                      >
                        <Image
                          src={item.src}
                          alt={item.label}
                          className="shadow-lg h-5 w-5"
                        />
                        <span className="text-xs 2xl:text-sm">
                          {item.label}
                        </span>
                        <input
                          type="checkbox"
                          className="text-primary w-3 h-3 transform scale-150"
                          checked={selectedOptions[index]}
                          onChange={() => handleCheckboxChange(index)}
                        />
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="flex items-center space-x-4">
              {/* <div className="flex items-center border rounded">
                <button
                  className="px-3 py-2 hover:bg-gray-100"
                  onClick={() => {
                    if (count > 1) {
                      setCount(count - 1);
                    }
                  }}
                >
                  -
                </button>
                <span className="px-4 py-2">{count}</span>
                <button
                  className="px-3 py-2 hover:bg-gray-100"
                  onClick={() => setCount(count + 1)}
                >
                  +
                </button>
              </div> */}
              <button
                className="bg-primary text-white px-6 py-2 rounded hover:bg-primary-900 flex-1 max-w-[250px]"
                onClick={handleCheckout}
                disabled={qrCheckout}
              >
                {qrCheckout ? "Loading..." : "Proceed to checkout"}
              </button>
            </div>

            {/* Guarantees */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-[3px] pt-1 border-t">
              <div className="flex items-center space-x-2 xl:justify-center">
                <Image
                  src={delivery}
                  alt={`Product view`}
                  className="object-cover rounded h-[30px] w-[30px]"
                  height={20}
                  width={20}
                />
                <div>
                  <div className="text-primary font-black text-[15px]">
                    Free Delivery
                  </div>
                  <div className="text-sm text-gray-500">
                    Enter your Postal code for Delivery Availability
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2 xl:justify-center">
                <Image
                  src={shield}
                  alt={`Product view`}
                  className="object-cover rounded h-[30px] w-[30px]"
                  height={20}
                  width={20}
                />
                <div>
                  <div className="text-primary font-black">
                    100% Quality Warranty
                  </div>
                  <div className="text-sm text-gray-500">
                    100% Quality Warranty
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2 xl:justify-center">
                <Image
                  src={cod}
                  alt={`Product view`}
                  className="object-cover rounded h-[30px] w-[30px]"
                  height={20}
                  width={20}
                />
                <div>
                  <div className="text-primary font-black">COD Available</div>
                  <div className="text-xs text-gray-500">Cash on delivery</div>
                </div>
              </div>
            </div>

            {/* Payment Methods */}
            <div>
              <div className="text-base font-medium mb-1">
                100% Guarantee Safe Checkout
              </div>
              <div className="flex items-center gap-6">
                <img
                  className="h-6 w-auto dark:hidden"
                  src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/paypal.svg"
                  alt=""
                />
                <img
                  className="hidden h-6 w-auto dark:flex"
                  src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/paypal-dark.svg"
                  alt=""
                />
                <img
                  className="h-6 w-auto dark:hidden"
                  src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/visa.svg"
                  alt=""
                />
                <img
                  className="hidden h-6 w-auto dark:flex"
                  src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/visa-dark.svg"
                  alt=""
                />
                <img
                  className="h-6 w-auto dark:hidden"
                  src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/mastercard.svg"
                  alt=""
                />
                <img
                  className="hidden h-6 w-auto dark:flex"
                  src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/mastercard-dark.svg"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>

        {/* Description and Features */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md-4 md:mb-12">
          <div className="lg:pe-7 lg:border-r-2 border-gray-200">
            <h2 className="text-2xl font-black text-gray-900 mb-2">
              Description
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Enhance your customer engagement with our Customizable Table
              Stands featuring QR codes. Available in variations of 1, 2, or 3
              QR codes, these premium, durable stands allow you to link directly
              to Google reviews, Instagram, WhatsApp, or YouTube.
            </p>
            <p className="text-gray-700 leading-relaxed mt-4">
              Our team offers full customization of QR links, giving you the
              flexibility to promote your brand across multiple platforms.
              Perfect for restaurants, cafes, and retail businesses, these sleek
              stands ensure your customers can easily access your online
              presence. Elevate your marketing strategy with these fully
              customizable stands designed to last.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-black text-gray-900 mb-2">Feature</h2>
            <ul className=" text-gray-700">
              <li className="flex items-center gap-1 md:gap-3">
                <span className="text-primary text-[25px]">•</span>
                <span>Available in 1, 2, or 3 QR codes</span>
              </li>
              <li className="flex items-center gap-1 md:gap-3">
                <span className="text-primary text-[25px]">•</span>
                <span>Premium and durable design</span>
              </li>
              <li className="flex items-center gap-1 md:gap-3">
                <span className="text-primary text-[25px]">•</span>
                <span>Customizable QR code links</span>
              </li>
              <li className="flex items-center gap-1 md:gap-3">
                <span className="text-primary text-[25px]">•</span>
                <span>Supports multiple platform connections</span>
              </li>
              <li className="flex items-center gap-1 md:gap-3">
                <span className="text-primary text-[25px]">•</span>
                <span>Boost customer engagement instantly</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Customer Feedback */}
        <div className="lg:w-[80%] 2xl:w-[70%]">
          <h2 className="text-3xl font-black text-gray-900 mb-2 text-center">
            Customer Feedback
          </h2>

          <div className="flex flex-col md:flex-row gap-8 mb-8 pt-4">
            {/* Rating Summary */}
            <div className="text-center py-[5%] px-[6%] w-[60%] m-auto md:w-[30%] border-2 border-black rounded-2xl">
              <div className="text-6xl font-black mb-2">4.9</div>
              <div className="flex justify-center mb-2">
                <div className="flex items-center">
                  <svg
                    className="w-4 h-4 text-secondary ms-1"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20"
                  >
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                  </svg>
                  <svg
                    className="w-4 h-4 text-secondary ms-1"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20"
                  >
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                  </svg>
                  <svg
                    className="w-4 h-4 text-secondary ms-1"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20"
                  >
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                  </svg>
                  <svg
                    className="w-4 h-4 text-secondary ms-1"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20"
                  >
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                  </svg>
                  <svg
                    className="w-4 h-4 text-secondary ms-1"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20"
                  >
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                  </svg>
                </div>
              </div>
              <div className="text-gray-600">Product Rating</div>
            </div>

            {/* Rating Breakdown */}
            <div className="space-y-2 flex items-center md:w-[70%] border-2 border-black rounded-2xl py-2 md:py-0">
              <div className="w-[90%] m-auto">
                {[5, 4, 3, 2, 1].map((ratingStars) => {
                  let ratingPercentage = 0;

                  if (ratingStars === 5) {
                    ratingPercentage = 95; // 100% for 5-star rating
                  } else if (ratingStars === 4) {
                    ratingPercentage = 5; // 5% for 4-star rating
                  } else {
                    ratingPercentage = 0; // 0% for 3, 2, 1 stars
                  }

                  return (
                    <div
                      key={ratingStars}
                      className="flex items-center space-x-3 mt-3"
                    >
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-secondary h-2 rounded-full"
                          style={{ width: `${ratingPercentage}%` }} // Adjust width based on hardcoded percentage
                        ></div>
                      </div>
                      <div className="flex items-center">
                        {/* Render stars based on the rating */}
                        {Array.from({ length: 5 }).map((_, index) => (
                          <svg
                            key={index}
                            className={`w-4 h-4 ${
                              index < ratingStars && ratingPercentage > 0
                                ? "text-secondary"
                                : "text-gray-300"
                            }`}
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 22 20"
                          >
                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-sm text-gray-600 w-8">
                        {ratingPercentage}%
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Reviews */}
          <div>
            <h3 className="text-lg font-medium mb-4">
              Reviews ({reviews.length})
            </h3>
            <div className="space-y-6">
              {reviews.map((review, index) => (
                <div key={review.id} className="border-b pb-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-purple-500 text-white rounded-full flex items-center justify-center font-medium">
                      {review.initial}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-medium">{review.name}</span>
                        <span className="text-gray-500 text-sm">
                          {review.time}
                        </span>
                      </div>
                      <div className="flex mb-2">
                        <div className="flex items-center">
                          <svg
                            className="w-4 h-4 text-secondary ms-1"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 22 20"
                          >
                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                          </svg>
                          <svg
                            className="w-4 h-4 text-secondary ms-1"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 22 20"
                          >
                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                          </svg>
                          <svg
                            className="w-4 h-4 text-secondary ms-1"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 22 20"
                          >
                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                          </svg>
                          <svg
                            className="w-4 h-4 text-secondary ms-1"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 22 20"
                          >
                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                          </svg>
                          <svg
                            className="w-4 h-4 text-secondary ms-1"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 22 20"
                          >
                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                          </svg>
                        </div>
                      </div>
                      <div className="flex">
                        <span className="font-normal text-gray-700">
                          {review.product}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600 mb-2">
                        {review.review}
                      </div>
                      <div className="flex items-center space-x-4 mt-3 text-gray-500">
                        <div
                          className={`dislike-btn flex items-center justify-center w-7 h-7 rounded-full cursor-pointer transition duration-300 ease-in-out ${
                            review.disliked
                              ? "bg-primary text-white transform scale-110 rotate-180"
                              : "bg-gray-200 text-gray-500"
                          }`}
                          onClick={() => handleDislike(review.id)}
                        >
                          <FontAwesomeIcon
                            icon={review.disliked ? faThumbsDown : faThumbsUp}
                            className="text-xl"
                          />
                        </div>
                        <div
                          className={`like-btn flex items-center justify-center w-7 h-7 rounded-full cursor-pointer transition duration-300 ease-in-out ${
                            review.liked
                              ? "bg-red-500 text-white transform scale-110 rotate-180"
                              : "bg-gray-200 text-gray-500"
                          }`}
                          onClick={() => handleLike(review.id)}
                        >
                          <FontAwesomeIcon
                            icon={review.liked ? faThumbsUp : faThumbsDown}
                            className="text-xl"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      {/* <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm">
            © {new Date().getFullYear()} || smartcardly.com || Powered by VIP
            Number Shop
          </p>
        </div>
      </footer> */}
    </div>
  );
}

export default QrStand;
