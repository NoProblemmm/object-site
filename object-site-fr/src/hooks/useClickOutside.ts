import { useEffect, type RefObject } from "react";

type TUseClickOutside<T extends Element | null = HTMLElement | null> = {
  ref: RefObject<T>;
  callback: () => void;
};

export const useClickOutside = ({ ref, callback }: TUseClickOutside): void => {
  const handleClickOutside = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      callback();
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
};
