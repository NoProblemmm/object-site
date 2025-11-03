import { useEffect } from "react";
import { loadingStyle } from "./hooks/LoadingStyles";
import { Hero } from "@components/welcome/hero/Hero";
import { Layout } from "@components/welcome/layout/Layout";
import { Header } from "@components/ui/header/Head";
import { Footer } from "@components/ui/footer/Footer";

export const Welcome = () => {
  const links = [{ name: "Music", link: "/" }];
  useEffect(() => {
    loadingStyle();
  }, []);

  return (
    <div className="wrapper">
      <Header links={links} />
      <div className="welcome-content">
        <Hero />
        <Layout />
        <Footer />
      </div>
    </div>
  );
};
