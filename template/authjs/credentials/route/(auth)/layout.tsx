import React, { ReactNode } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="flex item-center justify-center min-h-screen">
      {children}
    </main>
  );
};

export default AuthLayout;
