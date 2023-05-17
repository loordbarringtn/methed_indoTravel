import { animateBurgerMenu, animateBurgerMenuClose } from "./animation.js";

const accordButtons = document.querySelectorAll(".travel__item-title");
const travelItem = document.querySelectorAll(".travel__item");
const textWrapper = document.querySelectorAll(".travel__item-text-wrapper");
const headerMenuButton = document.querySelector(".header__menu-button");
const headerMenu = document.querySelector(".header__menu");
const body = document.querySelector("body");
let textWrapperHeight = null;

const eventController = () => {
  textWrapper.forEach((elem) => {
    if (textWrapperHeight < elem.scrollHeight) {
      textWrapperHeight = elem.scrollHeight;
    }
  });

  accordButtons.forEach((btns, index) => {
    btns.addEventListener("click", () => {
      for (let i = 0; i < travelItem.length; i += 1) {
        if (index === i) {
          textWrapper[i].style.height = travelItem[i].classList.contains(
            "travel__item_active"
          )
            ? ""
            : `${textWrapperHeight}px`;
          travelItem[i].classList.toggle("travel__item_active");
        } else {
          travelItem[i].classList.remove("travel__item_active");
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
};

export { eventController, headerMenu };
