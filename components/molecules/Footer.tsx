import React from "react";
import { Link } from "@nextui-org/link";

const Footer = () => {
  return (
    <footer className="w-full flex items-center justify-center pb-20">
      <p className="text-default-600">Created with ♡ by:&nbsp;</p>
      <Link
        isExternal
        className="flex items-center gap-1 text-current"
        href="https://handikatriarlan.my.id/contact"
        title="handikatriarlan contact"
      >
        <span className="text-primary"> handikatriarlan</span>
      </Link>
    </footer>
  );
};

export default Footer;
