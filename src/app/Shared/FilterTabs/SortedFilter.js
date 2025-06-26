import { useContext, useEffect, useState } from "react";
import "./FilterTabs.css";
import { useGetQueryParams } from "../../utils";
import { usePathname, useRouter } from "next/navigation";
import { AppStateContext } from "../../contexts/AppStateContext/AppStateContext";

const SortedFilter = ({ id }) => {
  const { queryParams } = useGetQueryParams();
  const {
    setCatFilter,
    setSelectedPriceOptions,
    setTabCategory,
    setLoaderData,
    setComing,dataLoading
  } = useContext(AppStateContext);
  const pathname = usePathname();

  const Router = useRouter();
  const getSortValue = (sort) =>
    sort === "asc" ? "low-to-high" : sort === "desc" ? "high-to-low" : "";

  const [sortingOrder, setSortingOrder] = useState(
    getSortValue(queryParams?.sort)
  );
  const [comingSoon, setComingSoon] = useState("");

  useEffect(() => {
    setSortingOrder(getSortValue(queryParams?.sort));
  }, [queryParams?.sort]);

  useEffect(() => {
    if (queryParams?.comingsoon) {
      setComingSoon(queryParams.comingsoon);
    } else {
      setComingSoon("yes");
    }
  }, [queryParams]); // Runs when queryParams changes

  const applyFilters = (order) => {
    if (!order && pathname !== "/search-results") {
      setSelectedPriceOptions("");
      setSortingOrder("");
      setCatFilter(true);
      return;
    }
    const currentPath = window.location.pathname;
    if (currentPath === "/subcategory") {
      setSelectedPriceOptions(order === "low-to-high" ? "asc" : "desc");
      setCatFilter(true);
      const filterObj = {
        callCount: (parseInt(queryParams?.callCount) || 0) + 1,
      };
      if (order) filterObj["sort"] = order === "low-to-high" ? "asc" : "desc";

      const route = { ...queryParams, ...filterObj };
      const queryString = new URLSearchParams(route).toString();
      Router.push(`${pathname}?${queryString}`);
      return;
    }
    const categoryUrl = currentPath.split("/")[2];
    if (categoryUrl) {
      setSelectedPriceOptions(order === "low-to-high" ? "asc" : "desc");
      setCatFilter(true);
    } else {
      const filterObj = {
        callCount: (parseInt(queryParams?.callCount) || 0) + 1,
        id,
      };
      if (order) {
        filterObj["sort"] = order === "low-to-high" ? "asc" : "desc";
      } else if (order === "") {
        filterObj["sort"] = "";
      }

      const route = { ...queryParams, ...filterObj };
      const queryString = new URLSearchParams(route).toString();
      Router.push(`${pathname}?${queryString}`);
    }
  };
  const handleClick = () => {
    const currentPath = window.location.pathname;
    const categoryUrl = currentPath.split("/")[2];
    if (categoryUrl) {
      setCatFilter(false);
      setTabCategory(false);
      setComing("");
    } else if (currentPath === "/subcategory") {
      setLoaderData(false);
      setCatFilter(false);
      setComing("");
    }
  };

  const handleSelectChange = (e) => {
    const selectedValue = e.target.value;
    if (selectedValue === "no" && pathname !== "/search-results") {
      setComingSoon(selectedValue);
      setComing("no");
      setCatFilter(true);
      return;
    }
    setComingSoon(selectedValue); // Set the coming soon value in state
    setCatFilter(true); // Trigger category filter
    const filterObj = {
      comingsoon: selectedValue, // Add comingsoon to query params
      callCount: (parseInt(queryParams?.callCount) || 0) + 1,
    };

    const route = { ...queryParams, ...filterObj };
    const queryString = new URLSearchParams(route).toString();
    Router.push(`${pathname}?${queryString}`);
  };

  return (
    <div className="flex gap-3 items-center ">
      <div
        className="relative  mb-3"
        onClick={handleClick}
      >
        <select
          value={sortingOrder}
          onChange={(e) => {
            const order = e.target.value;
            setSortingOrder(order);
            applyFilters(order);
          }}
          className="w-[170px] md:w-[200px] px-3 py-2 text-sm text-gray-700 border-2 border-primary  rounded-full bg-white appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-400 "
          disabled={dataLoading} 
        >
          <option value="">Sort by price</option>
          <option value="high-to-low">High to Low</option>
          <option value="low-to-high">Low to High</option>
        </select>
        <span className="absolute top-1/2 right-3 transform -translate-y-1/2 text-sm text-primary pointer-events-none">
          ▼
        </span>
      </div>
      {/* <div
        className="relative w-full lg:max-w-[200px] max-w-full mb-3"
        onClick={handleClick}
      >
        <select
          value={comingSoon}
          onChange={handleSelectChange}
          className="w-full px-3 py-2 text-sm text-gray-700 border-2 border-primary  rounded-full bg-white appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-400"
        >
          <option value="">Coming soon</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
        <span className="absolute top-1/2 right-3 transform -translate-y-1/2 text-sm text-primary pointer-events-none">
          ▼
        </span>
      </div> */}
      <div className="flex items-center gap-3 mb-3 w-full md:justify-self-auto justify-center">
        {/* <label
          className="flex items-center space-x-2 cursor-pointer"
          onClick={handleClick}
        >
          <input
            type="checkbox"
            checked={comingSoon === "yes"}
            onChange={(e) =>
              handleSelectChange({
                target: { value: e.target.checked ? "yes" : "no" },
              })
            }
            className="w-4 h-4 text-[#6019eb] border-2 border-[#6019eb] rounded focus:ring-purple-400 focus:ring-2"
          />
          <span className="text-sm text-gray-700">Coming Soon</span>
        </label> */}
        <label
          className=" w-[170px] md:w-[200px] flex items-center space-x-2 cursor-pointer  text-sm text-gray-700 border-2 border-primary  rounded-full bg-white appearance-none  focus:outline-none focus:ring-2 focus:ring-purple-400 "
          onClick={handleClick}
        >
          <label
            className="relative flex cursor-pointer items-center rounded-full p-[10px]"
            data-ripple-dark="true"
          >
            <input
              id="ripple-on"
              type="checkbox"
              checked={comingSoon === "yes"}
              onChange={(e) =>
                handleSelectChange({
                  target: { value: e.target.checked ? "yes" : "no" },
                })
              }
              className="peer relative h-4 w-4 cursor-pointer appearance-none rounded-full border border-slate-300 shadow hover:shadow-md transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-slate-400 before:opacity-0 before:transition-opacity checked:border-primary checked:bg-primary checked:before:bg-slate-400 hover:before:opacity-10"
              disabled={dataLoading} 
            />
            <span className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3.5 w-3.5"
                viewBox="0 0 20 20"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth="1"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </span>
          </label>
          <span className="text-sm text-gray-700">Coming Soon</span>
        </label>
      </div>
    </div>
  );
};

export default SortedFilter;
