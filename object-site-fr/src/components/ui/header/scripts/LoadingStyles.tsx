import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export const LoadingStyles = () => {
  gsap.registerPlugin(ScrollTrigger);

  let showHeader = gsap
    .fromTo(".navigate", { yPercent: -100 }, { yPercent: 0 })
    .progress(1);

  ScrollTrigger.create({
    start: 0,
    end: () => ScrollTrigger.maxScroll(window) - 2, // just above the bottom of the page
    onUpdate: (self) => {
      self.direction === 1 ? showHeader.reverse() : showHeader.play();
    },
    onLeave: () => showHeader.play(), // we're at the bottom of the page
  });
  return () => {
    if (showHeader) {
      showHeader.kill();
    }
  };
};
