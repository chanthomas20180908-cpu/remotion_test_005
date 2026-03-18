const lenis = new Lenis({
  smoothWheel: true,
  syncTouch: true, // required for infinite on touch/mobile
  infinite: true });


function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

lenis.on("scroll", ScrollTrigger.update);

gsap.ticker.lagSmoothing(0);

const lineTexts = gsap.utils.toArray(".line-text");

lineTexts.forEach(line => {
  gsap.fromTo(
  line,
  {
    scale: 1 },

  {
    scale: 0.5,
    ease: "none",
    scrollTrigger: {
      trigger: line,
      start: "top bottom",
      end: "bottom top",
      scrub: true } });



});

window.addEventListener("load", () => {
  ScrollTrigger.refresh();
});
