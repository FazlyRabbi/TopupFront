// mark as client component
"use client";
import { SessionProvider } from "next-auth/react";

import React from "react";

const SessionWrapper = ({ children, session }) => {
  return (
    <SessionProvider
      session={session} // Default base path if your app lives at the root "/"
      // basePath="/"
      // Re-fetch session every 5 minutes
      // refetchInterval={5 * 60}
      // Re-fetches session when window is focused
      // refetchOnWindowFocus={true}
    >
      {children}
    </SessionProvider>
  );
};

export default SessionWrapper;
