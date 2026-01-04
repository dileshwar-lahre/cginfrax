"use client";

import { SessionProvider, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import PhonePromptPopup from "./PhonePromptPopup";

function PhoneCheckWrapper({ children }) {
  const { data: session, status } = useSession();
  const [showPhonePrompt, setShowPhonePrompt] = useState(false);

  useEffect(() => {
    // Check if user is logged in and has temp phone number
    if (status === "authenticated" && session?.user?.mobile) {
      const mobile = session.user.mobile;
      // If phone starts with "G-", it's a temp Google number
      if (mobile && mobile.startsWith("G-")) {
        setShowPhonePrompt(true);
      }
    }
  }, [session, status]);

  return (
    <>
      {children}
      {showPhonePrompt && (
        <PhonePromptPopup
          isOpen={showPhonePrompt}
          onClose={() => setShowPhonePrompt(false)}
          userEmail={session?.user?.email}
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