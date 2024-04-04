const checkScreenSize = (screenSize: number, setIsSmallScreen: (isSmall:boolean)=> void ):void => {
  
  const smallScreenBreakpoint = screenSize;
  const currentScreenWidth = window.innerWidth;

  if (currentScreenWidth < smallScreenBreakpoint) {
    setIsSmallScreen(true);
  } else {
    setIsSmallScreen(false);
  }
};

export default checkScreenSize