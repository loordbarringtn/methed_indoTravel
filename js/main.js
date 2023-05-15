import { setDeadline, timer, setPlusThreeDays } from "./timer.js";
import { eventController } from "./evenListener.js";
import { animateJet } from "./animation.js";  

const start = () => {
  setDeadline(setPlusThreeDays());
  timer();
  eventController();
  requestAnimationFrame(  animateJet);
};

window.start = start;
