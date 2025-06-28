"use client"
import React, { useContext, useEffect, useState } from 'react'
import Search from "../Shared/Search/Search";
import NewMobileSearch from '../Shared/MobileSearch/NewMobileSearch';
import { useGetQueryParams } from "../utils";
import { AppStateContext } from '../contexts/AppStateContext/AppStateContext';
export default function Familypacksearch() {
    const [isMobile, setIsMobile] = useState(false);
    const { setFilters } = useContext(AppStateContext);
    const { queryParams } = useGetQueryParams();
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 576);
        handleResize(); // Set initial state
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);
    // const repeatedText2 = Array(100).fill(text2).join(" ");
    useEffect(() => {
        setFilters({
            type: "family_pack",
        });
    }, []);
    return (
        <>
            {isMobile && <NewMobileSearch queryParams={queryParams} />}
            <div className={`bg-[url("/assets/filter.webp")] bg-cover bg-no-repeat bg-center lg:py-8`}>
                <div className="container-os  ">
                    <Search />
                </div>
            </div>
        </>
    )
}
