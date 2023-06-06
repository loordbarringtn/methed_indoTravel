import { setDeadline, timer, setPlusThreeDays } from "./timer.js";
import { eventController, tourDates, reservationDates, clearReservationDate } from "./evenListener.js";
import { animateJet } from "./animation.js"; 
import { updateDateOptions } from "./fetchData.js"; 

const start = () => {
  setDeadline(setPlusThreeDays());
  timer();
  clearReservationDate();
  requestAnimationFrame(animateJet);
  updateDateOptions(tourDates, "date");
  updateDateOptions(reservationDates, "date");
  eventController();
};

window.start = start;
