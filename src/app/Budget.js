import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useSearchParams, usePathname } from "next/navigation"; // Import useSearchParams and usePathname

const Budget = () => {
  const [selectedBudget, setSelectedBudget] = useState(null);
  const searchParams = useSearchParams(); // Get the search params from the URL
  const pathname = usePathname(); // Get the current path (to ensure correct routing)

  const playlists = [
    {
      id: 1,
      title: "Below 2500",
      minPrice: 1400,
      maxPrice: 2500,
    },
    {
      id: 2,
      title: "2300/- to 4000/-",
      minPrice: 2300,
      maxPrice: 4000,
    },
    {
      id: 3,
      title: "4000/- to 7500/-",
      minPrice: 4000,
      maxPrice: 7500,
    },
    {
      id: 4,
      title: "7000/- to 13500/-",
      minPrice: 7000,
      maxPrice: 13500,
    },
    {
      id: 5,
      title: "12000/- to 20000/-",
      minPrice: 12000,
      maxPrice: 20000,
      priceRange: "Top Selling Range",
    },
    {
      id: 6,
      title: "18000/- to 35000/-",
      minPrice: 18000,
      maxPrice: 35000,
      priceRange: "Top Selling Range",
    },
    {
      id: 7,
      title: "30000 /- to 65000/-",
      minPrice: 30000,
      maxPrice: 65000,
    },
    {
      id: 8,
      title: "60000 /- to 125000/-",
      minPrice: 60000,
      maxPrice: 125000,
    },
    {
      id: 9,
      title: "100000  /- to 260000/-",
      minPrice: 100000,
      maxPrice: 260000,
    },
    {
      id: 10,
      title: "200000  /- to 500000/-",
      minPrice: 200000,
      maxPrice: 500000,
    },
    {
      id: 11,
      title: "Above 3,50,000",
      minPrice: 350000,
      maxPrice: 5000000,
    },
  ];

  useEffect(() => {
    // Extract min_price and max_price from the search parameters
    const min_price = searchParams.get("min_price");
    const max_price = searchParams.get("max_price");

    // Find the playlist that matches the current price range
    if (min_price && max_price) {
      const selected = playlists.find(
        (item) => item.minPrice == min_price && item.maxPrice == max_price
      );
      if (selected) {
        setSelectedBudget(selected.id);
      }
    }
  }, [searchParams]); // Re-run whenever the search params change

  return (
    <div className="sub-caty-rs" style={{marginBottom:"8rem"}}>
      <div className="flex justify-center items-center flex-wrap gap-2">
        {playlists.map((item, index) => {
          const isSelected = selectedBudget === item.id;
          return (
            <Link
              href={`/search-results?searchBy=price&min_price=${item.minPrice}&max_price=${item.maxPrice}&callCount=0&comingsoon=yes&star_status=true`}
              prefetch={true}
              key={index}
              onClick={() => setSelectedBudget(item.id)} // Update the selected budget on click
              className={`sub-caty-slice flex items-center`} // Apply selected styles
              style={{
                backgroundColor: isSelected ? "black" : "", // Apply black background if selected, else no background
                color: isSelected ? "white" : "", // Apply white color if selected, else default color
              }}
            >
              <span>{item.title}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Budget;
