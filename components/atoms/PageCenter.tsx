import React from "react";

const PageCenter = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="flex flex-col items-center justify-center gap-4">
      {children}
    </section>
  );
};

export default PageCenter;
