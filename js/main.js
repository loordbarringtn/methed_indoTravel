import { setDeadline, timer } from "./timer.js";
import { eventController } from "./evenListener.js";

const start = () => {
  setDeadline("2023-05-25 00:45:00" );
  timer();
  eventController();
};

window.start = start;
