import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const NumuroTag = () => {
  const [selectedLink, setSelectedLink] = useState(null);
  const router = useRouter();
  const playlists = [
    {
      id: 1,
      title: "End 55,555 || SUM 5 || Without 2,4,8",
      link: "https://www.vipnumbershop.com/search-results?type=advanced&end_with=55&contains=&not_contain=2%2C4%2C8&sum=5&callCount=0&searchBy=digit&comingsoon=yes&star_status=true",
    },
    {
      id: 2,
      title: "End 11,111,55,555 || SUM 1,5 || Without 2,4,8",
      link: "https://www.vipnumbershop.com/search-results?type=advanced&end_with=11%2C55&contains=&not_contain=2%2C4%2C8&sum=1%2C5&callCount=1&searchBy=digit&comingsoon=yes&star_status=true&comingsoon=yes&star_status=true",
    },
    {
      id: 3,
      title: "End 11,111,55,555 || SUM 1,5 || Without 2,4,7,8,0",
      link: "https://www.vipnumbershop.com/search-results?type=advanced&end_with=11%2C55&contains=&not_contain=2%2C4%2C8%2C7%2C0&sum=1%2C5&callCount=2&searchBy=digit&comingsoon=yes&star_status=true&comingsoon=yes&star_status=true",
    },
    {
      id: 4,
      title: "End 11,111,33,333,55,555 || SUM 1,3,5 || Without 2,4,8",
      link: "https://www.vipnumbershop.com/search-results?type=advanced&end_with=11%2C33%2C55&contains=&not_contain=2%2C4%2C8&sum=1%2C3%2C5&callCount=3&searchBy=digit&comingsoon=yes&star_status=true&comingsoon=yes&star_status=true",
    },
    {
      id: 5,
      title: "End 55,555,66,666 || SUM 1,3,5,6 || Without 2,4,8",
      link: "https://www.vipnumbershop.com/search-results?type=advanced&end_with=55%2C66&contains=&not_contain=2%2C4%2C8&sum=1%2C3%2C5%2C6&callCount=4&searchBy=digit&comingsoon=yes&star_status=true&comingsoon=yes&star_status=true",
    },
  ];
  useEffect(() => {
    // Check if the current URL matches any of the links
    const currentUrl = window.location.href; // Get the full current URL
    const selected = playlists.find((item) => currentUrl === item.link); // Find the matching link
    if (selected) {
      setSelectedLink(selected.id); // Set the selected link if matched
    }
  }, [router.asPath]);
  return (
    <div className="sub-caty-rs" style={{ marginBottom: "8rem" }}>
      <div className="flex justify-center items-center flex-wrap gap-2">
        {playlists.map((item, index) => {
          const isSelected = selectedLink === item.id;
          return (
            <Link
              href={item.link}
              prefetch={true}
              key={index}
              onClick={() => setSelectedLink(item.id)} // Update the selected budget on click
              className={`text-center p-3 bg-[#e4e4e4] text-xs rounded-full font-semibold`} // Apply selected styles
              style={{
                backgroundColor: isSelected ? "black" : "",
                color: isSelected ? "white" : "",
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

export default NumuroTag;
