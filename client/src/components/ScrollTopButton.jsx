import React from "react";
import { HiOutlineArrowUp } from "react-icons/hi";

const ScrollTopButton = () => {
  const [showScroll, setShowScroll] = React.useState(false);

  const checkScrollTop = () => {
    if (!showScroll && window.pageYOffset > 300) {
      setShowScroll(true);
    } else if (showScroll && window.pageYOffset <= 300) {
      setShowScroll(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  React.useEffect(() => {
    window.addEventListener("scroll", checkScrollTop);
    return () => {
      window.removeEventListener("scroll", checkScrollTop);
    };
  }, []);

  return (
    <div className="fixed bottom-10 right-5 bg-gray-800 text-white p-2 rounded-full cursor-pointer transition duration-300 hover:bg-gray-700 hover:transition-all hover:ease-out">
      <HiOutlineArrowUp size={28} onClick={scrollToTop} />
    </div>
  );
};

export default ScrollTopButton;
