"use strict";

let isMenuActive = false;
const menu = document.querySelector(".header__menu");
const body = document.querySelector("body");
const burger = document.querySelector(".burger");

const toggleMenu = (isPC) => {
  if (isMenuActive) {
    menu.classList.remove("active");
    burger.classList.remove("active");
    isMenuActive = false;
    if (isPC) {
      body.classList.remove("locked");
    }
  } else {
    menu.classList.add("active");
    burger.classList.add("active");
    isMenuActive = true;
    if (isPC) {
      body.classList.add("locked");
    }
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

  const featureItems = document.querySelectorAll(".feature__item");
  const featureItem = document.querySelector(
    `.${button.getAttribute("data-target")}`
  );
  featureItems.forEach((item) => {
    item.classList.remove("active");
  });
  featureItem.classList.add("active");
};

featureButtons.forEach((button) => {
  button.addEventListener("click", setActive);
});

const homeSection = document.querySelector(".hero");
const featureSection = document.querySelector(".feature");
const aboutSection = document.querySelector(".about");
const productSection = document.querySelector(".product");

const homeLink = document.querySelector(".header__link_home");
const featureLink = document.querySelector(".header__link_feature");
const aboutLink = document.querySelector(".header__link_about");
const productLink = document.querySelector(".header__link_product");

const scrollToSection = (e) => {
  e.preventDefault();
  const link = e.target;
  const section = link.getAttribute("href").split("#")[1];
  const sectionPosition = document.querySelector(`.${section}`).offsetTop;
  const headerHeight = document.querySelector("header").offsetHeight;
  window.scrollTo({
    top: sectionPosition - headerHeight,
    behavior: "smooth",
  });
  toggleMenu();
};

const changeActiveLink = () => {
  const headerHeight = document.querySelector("header").offsetHeight;
  const homeSectionPosition = homeSection.offsetTop - headerHeight;
  const featureSectionPosition = featureSection.offsetTop - headerHeight;
  const aboutSectionPosition = aboutSection.offsetTop - headerHeight;
  const productSectionPosition = productSection.offsetTop - headerHeight;
  const currentPosition = window.pageYOffset;

  const links = [homeLink, featureLink, aboutLink, productLink];

  if (
    currentPosition >= homeSectionPosition &&
    currentPosition < featureSectionPosition
  ) {
    links.forEach((link) => link.classList.remove("menu__item_active"));
    homeLink.classList.add("menu__item_active");
  } else if (
    currentPosition >= featureSectionPosition &&
    currentPosition < aboutSectionPosition
  ) {
    links.forEach((link) => link.classList.remove("menu__item_active"));
    featureLink.classList.add("menu__item_active");
  } else if (
    currentPosition >= aboutSectionPosition &&
    currentPosition < productSectionPosition
  ) {
    links.forEach((link) => link.classList.remove("menu__item_active"));
    aboutLink.classList.add("menu__item_active");
  } else if (currentPosition >= productSectionPosition) {
    links.forEach((link) => link.classList.remove("menu__item_active"));
    productLink.classList.add("menu__item_active");
  }
};

window.addEventListener("scroll", changeActiveLink);
homeLink.addEventListener("click", scrollToSection);
featureLink.addEventListener("click", scrollToSection);
aboutLink.addEventListener("click", scrollToSection);
productLink.addEventListener("click", scrollToSection);
