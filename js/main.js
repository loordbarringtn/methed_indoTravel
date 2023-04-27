import { setDeadline, timer } from "./timer.js";
import { eventController } from "./evenListener.js";

const start = () => {
  setDeadline("2023-04-29 00:45:00" );
  timer();
  eventController();
};

window.start = start;
