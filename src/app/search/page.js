'use client'
import React from "react";
import { useGetQueryParams } from "../utils";
import NewMobileSearch from "../Shared/MobileSearch/NewMobileSearch";

const Page = () => {
  const { queryParams } = useGetQueryParams();
  return (
    <>
      {/* {searchPopup && (
        <section className={`${searchPopup}`}> */}
          <NewMobileSearch queryParams={queryParams} />
        {/* </section>
      )} */}
    </>
  );
};

export default Page;
