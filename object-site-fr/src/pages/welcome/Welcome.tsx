import { Hero } from "../../components/welcome/header/hero/Hero";
import { Layout } from "../../components/welcome/layout/Layout";
import { useEffect } from "react";
import { loadingStyle } from "./hooks/LoadingStyles";
import { Head } from "../../components/welcome/header/head/Head";

export const Welcome = () => {
  useEffect(() => {
    loadingStyle();
  }, []);

  return (
    <div className="wrapper">
      <Head />
      <div className="welcome-content">
        <Hero />
        <Layout />
      </div>
    </div>
  );
};
