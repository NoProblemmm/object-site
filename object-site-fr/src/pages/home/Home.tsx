import { Layout } from "../../components/home/playerLayout/layout/Layout";
import { Footer } from "../../components/ui/footer/Footer";
import { Header } from "../../components/ui/header/Head";

export const Home = () => {
  const links = [
    { name: "Welcome", link: "/welcome" },
    { name: "Sign In", link: "#" },
  ];
  return (
    <>
      <Header links={links} />
      <Layout />
      <Footer />
    </>
  );
};
