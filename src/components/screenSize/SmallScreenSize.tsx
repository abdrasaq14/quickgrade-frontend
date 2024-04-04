import React, { useState, useEffect } from "react";
import checkScreenSize from "../../utils/checkScreenSize";
import ScreenSizeStyle from "./ScreenSizeStyle";
interface ScreenSizeCheckerProps {
  children: React.ReactNode;
}
const ScreenSizeChecker = ({ children }: ScreenSizeCheckerProps) => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    // Check screen size on initial render
    const smallScreenBreakpoint = 768;
    checkScreenSize(smallScreenBreakpoint, setIsSmallScreen);

    // Add event listener for window resize
    window.addEventListener("resize", () =>
      checkScreenSize(smallScreenBreakpoint, setIsSmallScreen)
    );

    // Cleanup event listener on component unmount
    return () =>
      window.removeEventListener("resize", () =>
        checkScreenSize(smallScreenBreakpoint, setIsSmallScreen)
      );
  }, []);

  return (
    <div>
      {isSmallScreen ? (
        <ScreenSizeStyle>
          <p>You cannot view this page on a smaller screen device.</p>
        </ScreenSizeStyle>
      ) : (
        children
      )}
    </div>
  );
};

export default ScreenSizeChecker;
