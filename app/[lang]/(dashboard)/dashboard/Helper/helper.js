export const truncation = (str) => {
  const width = window.innerWidth;

  if (width >= 1400) {
    if (str.length > 6) {
      return str.substring(0,6) + "...";
    }
    return str;
  } else if (width <= 1400) {
    if (str.length > 3) {
      return str.substring(0, 6) + "...";
     // return str
    }
    return str;
  } else {
    if (str.length > 2) {
      return str.substring(0, 2) + "...";
    }
    return str;
  }
};

export const truncateString = (str) => {
    const width = window.innerWidth;
    const height = window.innerHeight;
  
    if (width >= 1400) {
      if (str.length > 6) {
        return str.substring(0, 10) + "...";
      }
      return str;
    } else if (width <= 1400) {
      if (str.length > 3) {
        return str.substring(0, 6) + "...";
       // return str
      }
      return str;
    } else {
      if (str.length > 2) {
        return str.substring(0, 2) + "...";
      }
      return str;
    }
  };

  export const truncateStr = (str) => {
    const width = window.innerWidth;
    const height = window.innerHeight;
if( width >= 1620) { 
      if (str.length > 35) {
        return str.substring(0, 30) + "...";
      }
      return str;
  }
    else if (width >= 1400) {
      if (str.length > 10) {
        return str.substring(0, 23) + "...";
      }
      return str;
    }
    else if (width <= 1040) {
      if (str.length > 4) {
        return str.substring(0, 10) + "...";
      }
      return str;
    } else {
      if (str.length > 3) {
        return str.substring(0, 4) + "...";
      }
      return str;
    }
  };
  

  export const w3_open_laptop = () => {
    document.getElementById("main").style.marginLeft = "6%";
    document.getElementById("mySidebar").style.width = "7.5%";
    document.getElementById("mySidebar").style.display = "block";
    document.getElementById("openNav").style.display = "none";
  };

  export const w3_close_laptop = () => {
    document.getElementById("main").style.marginLeft = "0%";
    document.getElementById("mySidebar").style.display = "none";
    document.getElementById("openNav").style.display = "inline-block";
  };
  export const w3_open_mobile = () => {
    document.getElementById("mySidebar").style.display = "block";
    
  };

  export const w3_close_mobile = () => {
    document.getElementById("mySidebar").style.display = "none";
  };


const isLaptop = () => window.innerWidth >= 768;

export const handleOpenNav = () => {
  return isLaptop() ? w3_open_laptop() : w3_open_mobile();
};

export const handleCloseNav = () => {
  return isLaptop() ? w3_close_laptop() : w3_close_mobile();
};