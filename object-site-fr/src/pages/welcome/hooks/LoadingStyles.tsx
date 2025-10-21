import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export const loadingStyle = () => {
  if (ScrollTrigger.isTouch !== 1) {
    const smoother = ScrollSmoother.create({
      wrapper: ".wrapper",
      content: ".welcome-content",
      smooth: 1.5,
      effects: true,
    });

    gsap.fromTo(
      ".hero-container",
      { opacity: 1 },
      {
        opacity: 0,
        scrollTrigger: {
          trigger: ".hero-container",
          start: "center",
          end: "820",
          scrub: true,
        },
      }
    );

    let itemLeft = gsap.utils.toArray(".gallery__left .gallery__item");
    let itemRight = gsap.utils.toArray(".gallery__right .gallery__item");

    itemLeft.forEach((item: any) => {
      gsap.fromTo(
        item,
        { x: -50, opacity: 0 },
        {
          opacity: 1,
          x: 0,
          scrollTrigger: {
            trigger: item,
            start: "-=800",
            end: "-=100",
            scrub: true,
          },
        }
      );
    });

    itemRight.forEach((item: any) => {
      gsap.fromTo(
        item,
        { x: 50, opacity: 0 },
        {
          opacity: 1,
          x: 0,
          scrollTrigger: {
            trigger: item,
            start: "-=800",
            end: "-=100",
            scrub: true,
          },
        }
      );
    });

    return () => {
      if (smoother) {
        smoother.kill();
      }
    };
  }
};
