import React, { useState, useEffect } from "react";
import checkScreenSize from "../../utils/checkScreenSize";
import ScreenSizeStyle from "./ScreenSizeStyle";
interface BigScreenSizeCheckerProps {
  children: React.ReactNode;
}
const BigScreenSizeChecker = ({ children }: BigScreenSizeCheckerProps) => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    // Check screen size on initial render
    const smallScreenBreakpoint = 1000;
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
          <p>You can only view this page on a desktop device.</p>
        </ScreenSizeStyle>
      ) : (
        children
      )}
    </div>
  );
};

export default BigScreenSizeChecker;
