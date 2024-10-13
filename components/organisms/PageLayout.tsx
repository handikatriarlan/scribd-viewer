import React from "react";
import { Navbar } from "@/components/molecules/Navbar";
import PageCenter from "@/components/atoms/PageCenter";
import Footer from "@/components/molecules/Footer";
import Container from "@/components/atoms/Container";

const PageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <PageCenter>
      <div className="relative flex flex-col h-screen min-w-full">
        <Navbar />
        <Container>{children}</Container>
        <Footer />
      </div>
    </PageCenter>
  );
};

export default PageLayout;
