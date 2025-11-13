import { Header } from "@components/ui/header/Head";
import { ProfileLayout } from "@components/profile/ProfileLayout";
import { useSessionStore } from "@store/session/Session.store";
import { useEffect } from "react";
import "./Profile.css";

export const Profile = () => {
  const links = [
    { name: "Home", link: "/" },
    { name: "Settings", link: "/settings" },
    {
      name: useSessionStore.isAutentificate ? "Exit" : "Sign In",
      link: "/auth/signIn",
      callback: async () => {
        await useSessionStore.isLogout();
      },
    },
  ];

  useEffect(() => {
    try {
      useSessionStore.refreshSession().catch((error) => {
        console.error("Error update session:", error);
      });
    } catch (err) {
      console.error("Service error:", err);
    }
  }, []);

  return (
    <>
      <Header links={links} />
      <ProfileLayout />
    </>
  );
};
