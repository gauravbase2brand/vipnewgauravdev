"use client";
import React, { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

const ReferId = () => {
  const query = useParams();
  const router = useRouter();
  useEffect(() => {
    if (query?.referId) {
      const referIdNumbers = query.referId.match(/\d+/)?.[0];
      if (referIdNumbers) {
        localStorage.setItem("referId", referIdNumbers);
      }
      router.push("/");
    }
  }, [query?.referId]);

  return <></>;
};

export default ReferId;
