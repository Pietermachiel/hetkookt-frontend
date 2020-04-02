import { useState, useEffect } from "react";

export default function useCurrentHeight() {
  const [height, setHeight] = useState(
    window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight
  );

  const getHeight = () => {
    const top =
      window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight;
    setHeight(top);
  };

  useEffect(() => {
    window.addEventListener("resize", getHeight);
    return () => {
      window.removeEventListener("resize", getHeight);
    };
  }, []);

  return height;
}
