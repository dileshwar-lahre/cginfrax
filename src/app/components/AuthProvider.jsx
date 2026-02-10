"use client";

import { SessionProvider, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import PhonePromptPopup from "./PhonePromptPopup";

function PhoneCheckWrapper({ children }) {
  const { data: session, status, update } = useSession(); // ✅ update function le lo
  const [showPhonePrompt, setShowPhonePrompt] = useState(false);

  useEffect(() => {
    // Check if user is logged in and has temp phone number
    if (status === "authenticated" && session?.user?.mobile) {
      const mobile = session.user.mobile;
      
      // ✅ Session storage check: Taaki user agar ek baar close karde toh baar-baar disturb na ho
      const isDismissed = sessionStorage.getItem("phonePromptDismissed");

      if (mobile && mobile.startsWith("G-") && !isDismissed) {
        setShowPhonePrompt(true);
      }
    }
  }, [session, status]);

  const handleClose = () => {
    setShowPhonePrompt(false);
    // User ne close kiya, toh is session ke liye yaad rakho
    sessionStorage.setItem("phonePromptDismissed", "true");
  };

  return (
    <>
      {children}
      {showPhonePrompt && (
        <PhonePromptPopup
          isOpen={showPhonePrompt}
          onClose={handleClose}
          userEmail={session?.user?.email}
          updateSession={update} // ✅ Success ke baad session update karne ke liye
        />
      )}
    </>
  );
}

export default function AuthProvider({ children }) {
  return (
    <SessionProvider>
      <PhoneCheckWrapper>{children}</PhoneCheckWrapper>
    </SessionProvider>
  );
}