"use client"
import React, {useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const Canonical = () => {
  const pathname = usePathname();
  const [currentUrl, setCurrentUrl] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setCurrentUrl(`${window.location.href}`);
    setLoading(false);
  }, [pathname]);
  return (
    <>
      <link rel="canonical" href={loading ? pathname : currentUrl} />
    </>
  );
};

export default Canonical;
