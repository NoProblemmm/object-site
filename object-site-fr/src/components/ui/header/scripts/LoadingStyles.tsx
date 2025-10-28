import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export const LoadingStyles = () => {
  gsap.registerPlugin(ScrollTrigger);

  let showHeader = gsap
    .fromTo(".navigate", { yPercent: -100 }, { yPercent: 0 })
    .progress(1);

  ScrollTrigger.create({
    start: 0,
    end: () => ScrollTrigger.maxScroll(window) - 2,
    onUpdate: (self) => {
      self.direction === 1 ? showHeader.reverse() : showHeader.play();
    },
    onLeave: () => showHeader.play(),
  });
  return () => {
    if (showHeader) {
      showHeader.kill();
    }
  };
};
