import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../common/Header.tsx";
import Footer from "../common/Footer.tsx";

export default function ClientLayout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}
