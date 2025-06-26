import React, { useState } from "react";
import Link from "next/link";

const FooterCategory = ({
  category,
  setFooterCat,
  setTabCategory,
  allSubCategories,
  handleSubCat,
}) => {
  const [visibleCount, setVisibleCount] = useState(25);

  // Load more handler
  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + 10); // Load 10 more subcategories each time
  };
  return (
    <section className="footer-categories-section-os">
      <div className="footer-categories-links-row-os">
        <div className="container-os">
          <div className="footer-links-heading-os">Categories</div>
          <ul className="footer-categories-links-list-os">
            {category &&
              category.map((e, i) => (
                <React.Fragment key={e?.id}>
                  <Link
                    onClick={() => {
                      setFooterCat(e);
                      setTabCategory(true);
                    }}
                    href={`/category/${
                      e?.detail?.slug?.replace(/[\s/]+/g, "-") || "slugVIP"
                    }`}
                    target="_blank"
                  >
                    {e?.name}
                  </Link>
                  {i < category?.length - 1 && " | "}
                </React.Fragment>
              ))}
          </ul>
        </div>
      </div>
      {allSubCategories?.length > 0 && (
        <div className="footer-categories-links-row-os">
          <div className="container-os">
            <div className="footer-links-heading-os">Sub-Categories</div>
            <ul className="footer-categories-links-list-os">
              {allSubCategories
                .slice(0, visibleCount)
                .map((subCategory, index) => {
                  const queryParams = new URLSearchParams({
                    category: subCategory.parentCategoryName,
                    id: subCategory.id,
                    seller: "PREMIUM",
                    comingsoon: "yes",
                    page: 1,
                    paginate: 60,
                  });
                  return (
                    <span key={subCategory.id}>
                      <Link
                        href={`/subcategory?${queryParams.toString()}`}
                        className="subCategory-rs"
                        onClick={() => handleSubCat(subCategory)}
                        target="_blank"
                      >
                        {subCategory.name}
                      </Link>
                      {index < allSubCategories?.length - 1 && " | "}
                    </span>
                  );
                })}
              {visibleCount < allSubCategories.length && (
                <React.Fragment>
                  <button
                    className='cursor-pointer text-center md:text-[16px] leading-5 bg-primary  rounded-md text-white lg:p-[8px] p-[8px]  text-[13px] font-medium hover:bg-secondary  hover:text-darktext "'
                    onClick={handleLoadMore}
                    aria-label="Load More..."
                  >
                    Load More...
                  </button>
                </React.Fragment>
              )}
            </ul>
          </div>
        </div>
      )}
      <div className="footer-categories-links-row-os">
        <div className="container-os">
          <div className="footer-links-heading-os">Cities & States</div>
          <div className="footer-cities-links-list-os">
            <Link href="/vip-mobile-number-in-punjab">Punjab |</Link>
            <Link href="/vip-mobile-number-in-maharashtra"> Maharashtra |</Link>
            <Link href="/fancy-mobile-numbers-in-karnataka"> Karnataka |</Link>
            <Link href="/fancy-mobile-number-in-kerala"> Kerala |</Link>
            <Link href="/vip-mobile-number-in-gujarat"> Gujarat |</Link>
            <Link href="/vip-mobile-number-in-mumbai"> Mumbai |</Link>
            <Link href="/vip-mobile-number-in-haryana"> Haryana |</Link>
            <Link href="/fancy-mobile-numbers-in-bangalore"> Bangalore |</Link>
            <Link href="/fancy-mobile-numbers-in-chennai"> Chennai |</Link>
            <Link href="/fancy-mobile-number-in-tamil-nadu"> Tamil Nadu |</Link>
            <Link href="/vip-mobile-number-in-himachal-pradesh">
              {" "}
              Himachal Pradesh |
            </Link>
            <Link href="/vip-mobile-number-in-lucknow"> Lucknow |</Link>
            <Link href="/vip-mobile-number-in-ahmedabad"> Ahmedabad |</Link>
            <Link href="/vip-mobile-number-in-surat"> Surat |</Link>
            <Link href="/vip-mobile-number-in-delhi"> Delhi |</Link>
            <Link href="/vip-mobile-number-in-rajasthan"> Rajasthan |</Link>
            <Link href="/fancy-mobile-number-in-hyderabad"> Hyderabad |</Link>
            <Link href="/vip-mobile-number-in-bihar"> Bihar |</Link>
            <Link href="/fancy-mobile-number-in-odisha"> Odisha |</Link>
            <Link href="/fancy-mobile-number-in-pune"> Pune |</Link>
            <Link href="/vip-mobile-number-in-uttarakhand"> Uttarakhand |</Link>
            <Link href="/vip-mobile-number-in-uttar-pradesh">
              {" "}
              Uttar-Pradesh |
            </Link>
            <Link href="/vip-mobile-number-in-madhya-pradesh">
              {" "}
              Madhya-Pradesh |
            </Link>
            <Link href="/vip-mobile-number-in-chhattisgarh">
              {" "}
              Chhattisgarh |
            </Link>
            <Link href="/vip-mobile-number-in-chandigarh"> Chandigarh |</Link>
            <Link href="/vip-mobile-number-rajkot"> Rajkot |</Link>
            <Link href="/vip-mobile-number-in-jaipur"> Jaipur |</Link>
            <Link href="/vip-mobile-number-in-moradabad"> Moradabad |</Link>
            <Link href="/vip-mobile-number-in-indore"> Indore |</Link>
            <Link href="/vip-mobile-number-in-jalandhar"> Jalandhar |</Link>
            <Link href="/vip-mobile-number-in-jammu"> Jammu |</Link>
            <Link href="/vip-mobile-number-in-patna"> Patna</Link>
          </div>
        </div>
      </div>
      <div className="footer-categories-links-row-os">
        <div className="container-os">
          <div className="footer-links-heading-os">Telecom Operators</div>
          <div className="footer-cities-links-list-os">
            <Link href="/airtel-fancy-numbers">Airtel VIP Numbers |</Link>
            <Link href="/jio-fancy-numbers"> Jio VIP Number |</Link>
            <Link href="/bsnl-fancy-numbers"> BSNL Fancy Numbers |</Link>
            <Link href="/vi-fancy-number"> VI Fancy Number |</Link>
            <Link href="/idea-fancy-numbers"> IDEA Fancy Number |</Link>
            <Link href="/vip-prepaid-number"> Prepaid Number |</Link>
            <Link href="/postpaid-fancy-numbers"> Postpaid Number</Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FooterCategory;
