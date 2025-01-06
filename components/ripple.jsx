import { AnimatePresence, motion } from "framer-motion";

export const clamp = (value, min, max) => {
  return Math.min(Math.max(value, min), max);
};

const Ripple = ({
  ripples = [],
  motionProps,
  color = "currentColor",
  style,
}) => {
  return (
    <>
      {ripples.map((ripple) => {
        const duration = clamp(
          0.01 * ripple.size,
          0.2,
          ripple.size > 100 ? 0.75 : 0.5
        );

        return (
          <AnimatePresence key={ripple.key} mode="popLayout">
            <motion.span
              animate={{ transform: "scale(2)", opacity: 0 }}
              className="rt-ripple"
              exit={{ opacity: 0 }}
              initial={{ transform: "scale(0)", opacity: 0.35 }}
              style={{
                position: "absolute",
                backgroundColor: color,
                borderRadius: "100%",
                transformOrigin: "center",
                pointerEvents: "none",
                zIndex: 10,
                top: ripple.y,
                left: ripple.x,
                width: `${ripple.size}px`,
                height: `${ripple.size}px`,
                ...style,
              }}
              transition={{ duration }}
              {...motionProps}
            />
          </AnimatePresence>
        );
      })}
    </>
  );
};

Ripple.displayName = "NextUI.Ripple";

export default Ripple;
