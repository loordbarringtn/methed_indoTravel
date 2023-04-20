const setDeadline = (setDeadline) => {
  const timer = document.querySelector(".timer");
  timer.dataset.timerDeadline = setDeadline;
};

const defineDayWords = (numDays) => {
  const dayDeclension = ["день", "дня", "дней"];
  let lastDigit = numDays % 10;

  if (numDays >= 11 && numDays <= 14) {
    return dayDeclension[2];
  } else if (lastDigit === 1) {
    return dayDeclension[0];
  } else if (lastDigit >= 2 && lastDigit <= 4) {
    return dayDeclension[1];
  } else {
    return dayDeclension[2];
  }
};

const defineHoursWords = (numHours) => {
  const hoursDeclension = ["час", "часа", "часов"];
  let lastDigit = numHours % 10;

  if (numHours >= 11 && numHours <= 14) {
    return hoursDeclension[2];
  } else if (lastDigit === 1) {
    return hoursDeclension[0];
  } else if (lastDigit >= 2 && lastDigit <= 4) {
    return hoursDeclension[1];
  } else {
    return hoursDeclension[2];
  }
};

const defineMinutesWords = (numMinutes) => {
  const minutesDeclension = ["минута", "минуты", "минут"];
  let lastDigit = numMinutes % 10;

  if (numMinutes >= 11 && numMinutes <= 14) {
    return minutesDeclension[2];
  } else if (lastDigit === 1) {
    return minutesDeclension[0];
  } else if (lastDigit >= 2 && lastDigit <= 4) {
    return minutesDeclension[1];
  } else {
    return minutesDeclension[2];
  }
};

const defineSecondsWords = (numSeconds) => {
  const secondsDeclension = ["секунда", "секунды", "секунд"];
  let lastDigit = numSeconds % 10;

  if (numSeconds >= 11 && numSeconds <= 14) {
    return secondsDeclension[2];
  } else if (lastDigit === 1) {
    return secondsDeclension[0];
  } else if (lastDigit >= 2 && lastDigit <= 4) {
    return secondsDeclension[1];
  } else {
    return secondsDeclension[2];
  }
};

const timer = () => {
  const timer = document.querySelector(".timer");
  const daysLabel = document.querySelector(".timer__units_days");
  const hoursLabel = document.querySelector(".timer__units_hours");
  const minutesLabel = document.querySelector(".timer__units_minutes");

  const advertText = document.querySelector(".hero__text");
  const timerText = document.querySelector(".hero__timer");

  const daysValue = document.querySelector(".timer__count_days");
  const hoursValue = document.querySelector(".timer__count_hours");
  const minutesValue = document.querySelector(".timer__count_minutes");

  const getTimeRemaining = () => {
    const dateStop = new Date(timer.dataset.timerDeadline).getTime();
    const dateNow = Date.now();

    const timezoneOffset = 3 * 60 * 60 * 1000;
    const timeRemaining = (dateStop - dateNow + timezoneOffset) / 1000;

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
    daysLabel.textContent = defineDayWords(timer.days);
    hoursValue.textContent = timer.hours;
    hoursLabel.textContent = defineHoursWords(timer.hours);
    minutesValue.textContent = timer.minutes;
    minutesLabel.textContent = defineMinutesWords(timer.minutes);

    let interValId = setInterval(updateClock, 60000);

    if (timer.timeRemaining <= 0) {
      clearInterval(interValId);
      daysValue.textContent = "00";
      hoursValue.textContent = "00";
      minutesValue.textContent = "00";
      advertText.style.display = "none";
      timerText.style.display = "none";
    } else if (timer.timeRemaining / 3600 <= 24) {
      daysValue.textContent = timer.hours;
      daysLabel.textContent = defineHoursWords(timer.hours);
      hoursValue.textContent = timer.minutes;
      hoursLabel.textContent = defineMinutesWords(timer.minutes);
      minutesValue.textContent = timer.seconds;
      minutesLabel.textContent = defineSecondsWords(timer.seconds);
      interValId = setInterval(updateClock, 1000);
    }
  };
  updateClock();
};

//Для тестирования
setDeadline('2023-04-30');
// setDeadline('2023-04-28 23:59:59');
// setDeadline('2023-04-28 21:59:59');
// setDeadline('2023-04-28 21:37:59');
// setDeadline("2023-04-20 23:59:59");
// setDeadline("2023-05-10");
// setDeadline(new Date().toLocaleDateString());
// setDeadline(new Date().toISOString().slice(0, 10));
// setDeadline("2023-04-20 14:45:00");
// setDeadline("2023-04-21");
// setDeadline("2023-04-20 11:45:00");
timer();
