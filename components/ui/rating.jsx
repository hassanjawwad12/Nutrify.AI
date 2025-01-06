import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Rating as PluginRating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
const ratingVariants = cva(" ", {
  variants: {
    variant: {
      flat: "flat",
      outline: "outline-style",
    },
  },

  defaultVariants: {
    variant: "flat",
  },
});

const StarDrawing = (
  <path d="M9.56687 2.91584C9.60212 2.82987 9.66214 2.75632 9.73931 2.70456C9.81647 2.65279 9.90729 2.62515 10.0002 2.62515C10.0931 2.62515 10.1839 2.65279 10.2611 2.70456C10.3383 2.75632 10.3983 2.82987 10.4335 2.91584L12.2044 7.17501C12.2375 7.2547 12.292 7.32371 12.3618 7.37443C12.4317 7.42516 12.5142 7.45563 12.6002 7.46251L17.1985 7.83084C17.6144 7.86417 17.7827 8.38334 17.466 8.65417L13.9627 11.6558C13.8973 11.7118 13.8485 11.7848 13.8217 11.8666C13.795 11.9485 13.7913 12.0362 13.811 12.12L14.8819 16.6075C14.9034 16.6975 14.8978 16.7919 14.8657 16.8788C14.8336 16.9656 14.7765 17.041 14.7016 17.0953C14.6267 17.1497 14.5373 17.1807 14.4448 17.1844C14.3523 17.188 14.2608 17.1642 14.1819 17.1158L10.2444 14.7117C10.1708 14.6668 10.0863 14.6431 10.0002 14.6431C9.91407 14.6431 9.82959 14.6668 9.75604 14.7117L5.81854 17.1167C5.73959 17.165 5.64808 17.1888 5.55559 17.1852C5.46309 17.1816 5.37375 17.1506 5.29885 17.0962C5.22394 17.0418 5.16684 16.9664 5.13475 16.8796C5.10266 16.7928 5.09702 16.6984 5.11854 16.6083L6.18937 12.12C6.20923 12.0362 6.20558 11.9485 6.17882 11.8666C6.15207 11.7847 6.10324 11.7118 6.03771 11.6558L2.53437 8.65417C2.46422 8.59385 2.41347 8.51413 2.3885 8.42504C2.36353 8.33594 2.36546 8.24146 2.39405 8.15346C2.42264 8.06546 2.47661 7.98789 2.54918 7.93048C2.62174 7.87308 2.70966 7.83841 2.80187 7.83084L7.40021 7.46251C7.48625 7.45563 7.56873 7.42516 7.63856 7.37443C7.7084 7.32371 7.76289 7.2547 7.79604 7.17501L9.56687 2.91584Z" />
);

const Rating = React.forwardRef(
  ({ className, itemStyles, variant, ...props }, ref) => {
    const myStyles = {
      itemShapes: StarDrawing,
      activeFillColor: variant === "outline" ? "none" : "#FACC15",
      activeStrokeColor: variant === "outline" ? "#FACC15" : "none",
      inactiveStrokeColor: variant === "outline" ? "#CBD5E1" : "none",
      itemStrokeWidth: 1,
      inactiveFillColor: variant === "outline" ? "none" : "#CBD5E1",
      ...itemStyles,
    };
    return (
      <PluginRating
        className={cn(ratingVariants({ variant }), className)}
        ref={ref}
        {...props}
        itemStyles={myStyles}
      />
    );
  }
);
Rating.displayName = "Rating";

export { Rating };
