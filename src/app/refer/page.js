"use client";
import React from "react";
import Link from "next/link";

const Refer = () => {
  return (
    <div>
      <h1>Refer Page</h1>
      <p>This is the refer page</p>
      <Link href="/refer/123" >Go to ReferId page with ID 123</Link>
    </div>
  );
};

export default Refer;
