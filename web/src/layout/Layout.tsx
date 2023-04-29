import React from "react";

import Header from "./header/Header";
import Footer from "./footer/Footer";
import { 
    Stack,
 } from "@chakra-ui/react";

const WithLayout = (props: React.ReactNode) => {
  return (
    <>
      <Header />
      <Stack>{props}</Stack>
      <Footer />
    </>
  );
};

export default WithLayout;