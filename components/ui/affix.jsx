// import React, { useRef, useState, useEffect } from "react";
// import PropTypes from "prop-types";

// const Affix = ({ children, offsetTop }) => {
//   const [isFixed, setIsFixed] = useState(false);
//   const ref = useRef(null);

//   const handleScroll = () => {
//     if (!ref.current) return;

//     const { top } = ref.current.getBoundingClientRect();
//     const shouldBeFixed = top <= offsetTop;

//     setIsFixed(shouldBeFixed);
//   };

//   useEffect(() => {
//     window.addEventListener("scroll", handleScroll);
//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, []);

//   const affixStyles = {
//     position: isFixed ? "fixed" : "static",
//     top: isFixed ? offsetTop + "px" : "auto",
//     width: "100%",
//     zIndex: 1000, // adjust z-index as needed
//   };

//   return (
//     <div ref={ref} style={{ height: "200px" }}>
//       {/* Add a placeholder div with the same height as the affixed element */}
//       {isFixed && <div style={{ height: "50px" }}></div>}
//       <div style={affixStyles}>{children}</div>
//     </div>
//   );
// };

// Affix.propTypes = {
//   children: PropTypes.node.isRequired,
//   offsetTop: PropTypes.number.isRequired,
// };

// export default Affix;

import React, { useRef, useState, useEffect } from "react";
import PropTypes from "prop-types";

const Affix = ({ children, offsetTop, target }) => {
  const [isFixed, setIsFixed] = useState(false);
  const ref = useRef(null);
  const containerRef = useRef(null);

  const handleScroll = () => {
    if (!ref.current || !containerRef.current) return;

    const { top } = ref.current.getBoundingClientRect();
    const { top: containerTop } = containerRef.current.getBoundingClientRect();
    const shouldBeFixed = top <= offsetTop && containerTop < offsetTop;

    setIsFixed(shouldBeFixed);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [offsetTop]);

  const affixStyles = {
    position: isFixed ? "fixed" : "static",
    top: isFixed ? offsetTop + "px" : "auto",
    width: "100%",
    zIndex: 1000, // adjust z-index as needed
  };

  return (
    <div
      ref={containerRef}
      style={{ height: "300px", margin: "20px", width: "200px" }}
    >
      {/* Add a placeholder div with the same height as the affixed element */}
      {isFixed && <div style={{ height: "50px" }}></div>}
      <div ref={ref} style={affixStyles}>
        {children}
      </div>
    </div>
  );
};

Affix.propTypes = {
  children: PropTypes.node.isRequired,
  offsetTop: PropTypes.number.isRequired,
  target: PropTypes.func,
};

export default Affix;
