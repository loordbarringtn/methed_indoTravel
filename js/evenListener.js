import { animateBurgerMenu, animateBurgerMenuClose } from "./animation.js";
import { updatePeopleOptions, getData } from "./fetchData.js";
import { httpRequest } from "./requests.js";

const accordButtons = document.querySelectorAll(".travel__item-title");
const travelItemList = document.querySelectorAll(".travel__item");
const textWrapper = document.querySelectorAll(".travel__item-text-wrapper");
const headerMenuButton = document.querySelector(".header__menu-button");
const headerMenu = document.querySelector(".header__menu");
const body = document.querySelector("body");
const tourDatesList = document.getElementById("tour__date");
const tourPeopleList = document.getElementById("tour__people");
const reservationDatesList = document.getElementById("reservation__date");
const reservationPeopleList = document.getElementById("reservation__people");
const reservationData = document.querySelector(".reservation__data");
const reservationPrice = document.querySelector(".reservation__price");
const form = document.querySelector(".reservation__form");
const formTitle = document.querySelector(".reservation__title");
const footerForm = document.querySelector(".footer__form");
const footerText = document.querySelector(".footer__text");
const footerInput = document.querySelector(".footer__input");
const footerTitle = document.querySelector(".footer__form-title");

let textWrapperHeight = null;

const showReservationDates = () => {
  const reservationDate = reservationDatesList.value;
  const reservationPeople = reservationPeopleList.value;

  if (reservationDate && reservationPeople) {
    reservationData.textContent = `Даты бронирования: ${reservationDate}`;
  }
};

const calculateTourPrice = async () => {
  const data = await getData();
  const chosenDates = reservationDatesList.value;
  const chosenPeople = reservationPeopleList.value;
  const arrayWeNeed = data.filter((item) => item.date === chosenDates);
  const priceOnePerson = arrayWeNeed[0].price;
  reservationPrice.textContent = `${priceOnePerson * chosenPeople}` + "₽";
};

const eventController = () => {
  textWrapper.forEach((elem) => {
    if (textWrapperHeight < elem.scrollHeight) {
      textWrapperHeight = elem.scrollHeight;
    }
  });

  accordButtons.forEach((btns, index) => {
    btns.addEventListener("click", () => {
      for (let i = 0; i < travelItemList.length; i += 1) {
        if (index === i) {
          textWrapper[i].style.height = travelItemList[i].classList.contains(
            "travel__item_active"
          )
            ? ""
            : `${textWrapperHeight}px`;
          travelItemList[i].classList.toggle("travel__item_active");
        } else {
          travelItemList[i].classList.remove("travel__item_active");
          textWrapper[i].style.height = "";
        }
      }
    });
  });

  body.addEventListener("click", (e) => {
    const target = e.target;
    if (target !== headerMenuButton && target === headerMenu) return;
    if (target === headerMenuButton) {
      headerMenu.style.opacity = 0;
      headerMenu.classList.toggle("header__menu_active");
      requestAnimationFrame(animateBurgerMenu);
    } else {
      setTimeout(() => {
        headerMenu.classList.remove("header__menu_active");
      }, 400);
      requestAnimationFrame(animateBurgerMenuClose);
    }
    if (target.tagName === "A") return false;
  });

  tourDatesList.addEventListener("change", (e) => {
    updatePeopleOptions(e.target.value, tourPeopleList);
  });

  reservationDatesList.addEventListener("change", (e) => {
    updatePeopleOptions(e.target.value, reservationPeopleList);
    showReservationDates();
    calculateTourPrice();
  });

  reservationPeopleList.addEventListener("change", (e) => {
    showReservationDates();
    calculateTourPrice();
  });
};

const clearReservationDate = () => {
  reservationData.textContent = null;
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  const jsonData = Object.fromEntries(formData.entries());
  jsonData.name = document.getElementById("reservation__name").value;
  jsonData.phone = document.getElementById("reservation__phone").value;
  httpRequest("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    body: {
      title: formTitle.textContent,
      body: JSON.stringify(jsonData),
    },
    callback(error, data) {
      if (error) {
        const errorMessage = document.createElement("h2");
        errorMessage.style.color = "red";
        errorMessage.textContent = error;
        form.appendChild(errorMessage);
        return;
      } else {
        const statusMessage = document.createElement("p");
        statusMessage.textContent = `Запрос на бронирование отправлен, номер запроса: ${data.id}`;
        form.appendChild(statusMessage);
      }
    },
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
});

footerForm.addEventListener("submit", (e) => {
  e.preventDefault();
  httpRequest("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    body: {
      title: footerTitle.textContent,
      body: footerInput.value,
    },
    callback(error, data) {
      if (error) {
        footerText.style.color = "red";
        footerText.textContent = error;
        return;
      } else {
        footerText.textContent = `Наши менеджеры свяжутся с вами в течении 3-х рабочих дней`;
        footerText.style.border = "2px solid red";
        footerText.style.padding = "10px";
      }
    },
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
});

export {
  eventController,
  headerMenu,
  tourDatesList as tourDates,
  reservationDatesList as reservationDates,
  clearReservationDate,
};
