import { useState, useEffect } from "react";

export default function useCurrentScroll() {
  const [scroll, setScroll] = useState(0);

  const handleScroll = () => {
    const top = window.pageYOffset || document.documentElement.scrollTop;
    setScroll(top);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return scroll;
}
