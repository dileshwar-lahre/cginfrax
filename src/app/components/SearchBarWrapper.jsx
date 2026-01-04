"use client";
import { Suspense } from "react";
import UnifiedSearchBar from "./UnifiedSearchBar";

// ✅ WRAPPER: useSearchParams ke liye Suspense boundary
export default function SearchBarWrapper({ variant = "default" }) {
  return (
    <Suspense fallback={
      <div className="w-full max-w-2xl h-12 bg-gray-100 rounded-full animate-pulse" />
    }>
      <UnifiedSearchBar variant={variant} />
    </Suspense>
  );
}





