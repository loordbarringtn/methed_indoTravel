const timerSection = document.querySelector(".timer");
const daysLabel = document.querySelector(".timer__units_days");
const hoursLabel = document.querySelector(".timer__units_hours");
const minutesLabel = document.querySelector(".timer__units_minutes");
const advertText = document.querySelector(".hero__text");
const timerText = document.querySelector(".hero__timer");
const daysValue = document.querySelector(".timer__count_days");
const hoursValue = document.querySelector(".timer__count_hours");
const minutesValue = document.querySelector(".timer__count_minutes");

const setDeadline = (deadLineTime) => {
  timerSection.dataset.timerDeadline = deadLineTime;
};

const getWordByNumber = (number, words) => {
  const lastDigit = number % 10;
  if (number >= 11 && number <= 14) {
    return words[2];
  } else if (lastDigit === 1) {
    return words[0];
  } else if (lastDigit >= 2 && lastDigit <= 4) {
    return words[1];
  } else {
    return words[2];
  }
};

const timer = () => {
  let intervalId;

  const getTimeRemaining = () => {
    const dateStop = new Date(timerSection.dataset.timerDeadline).getTime();
    const dateNow = Date.now();
    let timeRemaining = (dateStop - dateNow) / 1000;
    const minutes = Math.floor((timeRemaining / 60) % 60);
    const hours = Math.floor((timeRemaining / 60 / 60) % 24);
    const days = Math.floor(timeRemaining / 60 / 60 / 24);
    const seconds = Math.floor(timeRemaining % 60);

    return {
      timeRemaining,
      days,
      hours,
      minutes,
      daysLabel,
      hoursLabel,
      minutesLabel,
      seconds,
    };
  };

  const updateClock = () => {
    let timer = getTimeRemaining();

    daysValue.textContent = timer.days;
    daysLabel.textContent = getWordByNumber(timer.days, [
      "день",
      "дня",
      "дней",
    ]);
    hoursValue.textContent = timer.hours;
    hoursLabel.textContent = getWordByNumber(timer.hours, [
      "час",
      "часа",
      "часов",
    ]);
    minutesValue.textContent = timer.minutes;
    minutesLabel.textContent = getWordByNumber(timer.minutes, [
      "минута",
      "минуты",
      "минут",
    ]);

    if (timer.timeRemaining <= 0) {
      clearInterval(intervalId);
      daysValue.textContent = "00";
      hoursValue.textContent = "00";
      minutesValue.textContent = "00";
      advertText.style.display = "none";
      timerText.style.display = "none";
    } else if (timer.timeRemaining / 3600 <= 24) {
      clearInterval(intervalId);
      intervalId = setInterval(updateClock, 1000);
      const timezoneOffset = new Date().getTimezoneOffset() * 60 * 1000;
      timer.timeRemaining += timezoneOffset;
      daysValue.textContent = timer.hours;
      daysLabel.textContent = getWordByNumber(timer.hours, [
        "час",
        "часа",
        "часов",
      ]);
      hoursValue.textContent = timer.minutes;
      hoursLabel.textContent = getWordByNumber(timer.minutes, [
        "минута",
        "минуты",
        "минут",
      ]);
      minutesValue.textContent = timer.seconds;
      minutesLabel.textContent = getWordByNumber(timer.seconds, [
        "секунда",
        "секунды",
        "секунд",
      ]);
    }
  };
  updateClock();
  intervalId = setInterval(updateClock, 60000);
};

//Для тестирования
// setDeadline('2023-04-30');
// setDeadline('2023-04-28 23:59:59');
// setDeadline('2023-04-28 21:59:59');
// setDeadline('2023-04-28 21:37:59');
// setDeadline("2023-04-20 23:59:59");
// setDeadline("2023-05-10");
// setDeadline(new Date().toLocaleDateString());
// setDeadline(new Date().toISOString().slice(0, 10));
// setDeadline("2023-04-20 14:45:00");
// setDeadline("2023-04-21 11:45:00");
// setDeadline("2023-04-20 11:45:00");

export { setDeadline, timer };
