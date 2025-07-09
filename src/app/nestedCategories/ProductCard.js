import React, { useState, useEffect } from "react";

export const calculateTimeLeft = (targetDate) => {
  const targetTime = new Date(targetDate).getTime();
  const currentTime = new Date().getTime();
  const timeDifference = targetTime - currentTime;

  if (timeDifference <= 0) {
    return "Expired";
  }

  const hours = Math.floor(timeDifference / (1000 * 60 * 60))
    .toString()
    .padStart(2, "0");
  const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60))
    .toString()
    .padStart(2, "0");
  const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000)
    .toString()
    .padStart(2, "0");

  return `${hours}:${minutes}:${seconds}`;
};

export const ProductCard = React.memo(({ product, setTimer }) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(product.rtp_date));

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeLeft(calculateTimeLeft(product.rtp_date));
      setTimer(calculateTimeLeft(product.rtp_date));
    }, 1000);

    return () => clearInterval(intervalId);
  }, [product.rtp_date]);

  return (
    <div className="absolute lg:top-8 lg:left-5 left-[5px] top-[31px] bg-secondary  text-white md:font-semibold font-semibold text-xs text-center rounded-full border-[1px] p-[0px_3px] border-white shadow-md md:px-4 md:py-1 transform -rotate-3">
      <span className="text-darktext">{timeLeft} Left</span>
    </div>
  );
});
