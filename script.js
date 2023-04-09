"use strict";

let isMenuActive = false;
const menu = document.querySelector(".header__menu");
const body = document.querySelector("body");
const burger = document.querySelector(".burger");

const toggleMenu = () => {
  if (isMenuActive) {
    menu.classList.remove("active");
    body.classList.remove("locked");
    burger.classList.remove("active");
    isMenuActive = false;
  } else {
    menu.classList.add("active");
    body.classList.add("locked");
    burger.classList.add("active");
    isMenuActive = true;
  }
};

const featureButtons = document.querySelectorAll(".feature__category");
const line = document.querySelector(".feature__active-line");

const setActive = (e) => {
  const button = e.target;
  const parent = button.parentNode;
  const buttonPosition = button.getBoundingClientRect();
  const parentPosition = parent.getBoundingClientRect();
  const relativePosition = buttonPosition.left - parentPosition.left;
  const lineLeft = relativePosition + buttonPosition.width / 2;
  line.style.width = `${buttonPosition.width}px`;
  line.style.left = `${lineLeft - buttonPosition.width / 2}px`;
  featureButtons.forEach((button) => {
    button.classList.remove("active");
  });
  button.classList.add("active");
};

featureButtons.forEach((button) => {
  button.addEventListener("click", setActive);
});
