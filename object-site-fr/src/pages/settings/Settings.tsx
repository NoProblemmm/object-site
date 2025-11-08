import { SettingsLayout } from "@components/settings/settingsLayout/SettingsLayout";
import { useSessionStore } from "@store/session/Session.store";
import { Header } from "@components/ui/header/Head";
import { Footer } from "@components/ui/footer/Footer";
import "./Settings.css";
export const Settings = () => {
  const links = [
    { name: "Home", link: "/" },
    {
      name: useSessionStore.isAutentificate ? "Exit" : "Sign In",
      link: "/auth/signIn",
      callback: async () => {
        await useSessionStore.isLogout();
      },
    },
  ];

  return (
    <>
      <Header links={links} />
      <SettingsLayout />
      <Footer />
    </>
  );
};
