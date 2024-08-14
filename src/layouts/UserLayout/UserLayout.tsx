import React, { ReactNode } from "react";
import { Header } from "../../components/Header";
import Footer from "../../components/Footer";

interface UserLayoutProps {
  children: React.ReactNode;
}

const UserLayout: React.FC<UserLayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default UserLayout;
