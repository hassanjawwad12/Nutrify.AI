

export const getYAxisConfig = (colors) => ({
  labels: getLabel(colors),
});

export const getXAxisConfig = (colors) => ({
  categories: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
  labels: getLabel(colors),
  axisBorder: {
    show: false,
  },
  axisTicks: {
    show: false,
  }

});

export const getLabel = (colors) => ({
  style: {
    colors: colors,
    fontFamily: "Inter",
  },
});

export const getGridConfig = (colors) => ({
  show: true,
  borderColor: colors,
  strokeDashArray: 10,
  position: "back",
});
