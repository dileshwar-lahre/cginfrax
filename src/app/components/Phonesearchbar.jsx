"use client";
import React, { Suspense } from "react"; // ✅ Suspense import karo
import SearchBarWrapper from "./SearchBarWrapper";

const PhoneSearchBar = () => {
  return (
    <div className="w-full bg-white px-4 py-4 md:hidden sticky top-0 z-50">
      {/* ✅ Sabse bada fix: SearchBarWrapper ko Suspense mein dalo */}
      <Suspense fallback={<div className="h-10 w-full bg-gray-100 animate-pulse rounded-md" />}>
        <SearchBarWrapper variant="mobile" />
      </Suspense>
    </div>
  );
};

export default PhoneSearchBar;