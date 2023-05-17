import { headerMenu } from "./evenListener.js";

const jet = document.createElement("div");
const rootElement = document.documentElement;
let startTime = null;
const durationOpacity = 400;
let lastScrollY = window.pageYOffset;

jet.style.cssText = `
  position: fixed;
  width: 50px;
  height: 50px;
  right: 0;
  bottom: 0;
  pointer-events: none;
  background: url('img/airplane.svg') center/contain no-repeat;
`;

document.body.append(jet);

const animateJet = () => {
  const maxScrollHeight = rootElement.scrollHeight - rootElement.clientHeight;
  const scrollPercent = (window.pageYOffset / maxScrollHeight) * 100;
  const jetMaxScroll =
    (rootElement.clientHeight - jet.clientHeight) *
    (Math.min(scrollPercent, 100) / 100);

  if (window.pageYOffset < lastScrollY) {
    jet.style.transform = `rotate(180deg) translateY(${jetMaxScroll}px)`;
  } else {
    jet.style.transform = `translateY(${-jetMaxScroll}px)`;
  }

  lastScrollY = window.pageYOffset;
};

const handleWindowResize = () => {
  if (window.innerWidth < 758) {
    jet.style.display = "none";
  } else {
    jet.style.display = "block";
  }
};


const animateBurgerMenu = (timeStamp) => {
  startTime = startTime ||= timeStamp;
  const progress = (timeStamp - startTime) / durationOpacity;
  headerMenu.style.opacity = progress;

  if (progress < 1) {
    requestAnimationFrame(animateBurgerMenu);
  } else {
    startTime = null;
    headerMenu.style.opacity = 1;
  }
};

const animateBurgerMenuClose = (timeStamp) => {
  startTime = startTime ||= timeStamp;
  const progress = 1 - (timeStamp - startTime) / durationOpacity;
  headerMenu.style.opacity = progress;

  if (progress > 0) {
    requestAnimationFrame(animateBurgerMenuClose);
  } else {
    startTime = null;
    headerMenu.style.opacity = 0;
  }
};

window.addEventListener("scroll", () => {
  requestAnimationFrame(animateJet);
});

window.addEventListener("resize", () => {
  handleWindowResize();
});

export { animateJet, animateBurgerMenu, animateBurgerMenuClose };
