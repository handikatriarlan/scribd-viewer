import React from "react";

const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="container mx-auto max-w-7xl pt-16 px-6 flex-grow">
      {children}
    </main>
  );
};

export default Container;
