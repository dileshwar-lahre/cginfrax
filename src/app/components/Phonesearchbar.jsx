"use client";
import React from "react";
import SearchBarWrapper from "./SearchBarWrapper";

// ✅ REPLACED: Ab unified search bar use ho raha hai with Suspense
const PhoneSearchBar = () => {
  return (
    <div className="w-full bg-white px-4 py-4 md:hidden sticky top-0 z-50">
      <SearchBarWrapper variant="mobile" />
    </div>
  );
};

export default PhoneSearchBar;