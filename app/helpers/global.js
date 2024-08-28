export const scrollToTop = (refInfo) => {
  // const info = refInfo || window
  (refInfo || window).scrollTo({
    top: 0,
    behavior: "smooth",
  });
};
