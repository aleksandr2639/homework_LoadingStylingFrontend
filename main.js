/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/js/Widget.js
class Widget {
  constructor(root, url) {
    if (!(root instanceof HTMLElement)) {
      throw new Error("root is not HTMLElement");
    }
    this.root = root;
    this.url = url;
    this.list = null;
    this.button = null;
  }
  init() {
    this.bindToDOM();
    this.createRequest();
  }
  bindToDOM() {
    this.markUp();
    this.onclickButtonUpdate();
  }
  onclickButtonUpdate() {
    this.button = this.root.querySelector(".button");
    this.button.addEventListener("click", e => {
      e.preventDefault();
      this.createRequest();
    });
  }
  async createRequest() {
    this.showPreloadContent();
    try {
      const request = await fetch(this.url);
      const response = await request.json();
      this.hidePreloadContent();
      this.showListNews(response.data);
    } catch (err) {
      this.showError();
    }
  }
  markUp() {
    this.root.innerHTML = `
      <div class="container">
        <header class="header">
          <h1 class="title">Random news</h1>
          <button class="button">Update</button>
         </header>
        <div class="news-list"></div>
      </div>`;
    this.list = this.root.querySelector(".news-list");
  }
  static newsMarkUp(id = '', title = '', image = '', date = '') {
    return `<div class="news" data-id="${id}">
    <div class="news-date">${date}</div>
    <div class="news-content">
      <div class="news-image">
        <img src="${image}" alt="" width="320px" height="240px">
      </div>
      <div class="news-text">
        <p class="text">${title}</p>
      </div>
    </div>
  </div>`;
  }
  showListNews(data) {
    data.forEach(el => {
      this.list.insertAdjacentHTML("beforeend", Widget.newsMarkUp(el.id, el.title, el.image, this.getData(el.date)));
    });
  }
  getData(date) {
    this.data = `${new Date(date).toLocaleTimeString()} ${new Date(date).toLocaleDateString()}`;
    return this.data;
  }
  showPreloadContent() {
    this.list.innerHTML = "";
    while (this.list.children.length <= 3) {
      this.list.insertAdjacentHTML("beforeend", Widget.newsMarkUp());
    }
    this.list.classList.add("preload");
  }
  hidePreloadContent() {
    if (this.list.classList.contains("preload")) {
      this.list.querySelectorAll(".news").forEach(elem => elem.remove());
      this.list.classList.remove("preload");
    }
  }
  showError() {
    this.list.insertAdjacentHTML("beforeend", Widget.errorMarkUp());
  }
  static errorMarkUp() {
    return `
    <div class="error">
      <p class="error-text">
        Failed to upload data. Check the connection and refresh the page
      </p>
    </div>
    `;
  }
  hideError() {
    if (this.list.querySelector(".error")) {
      this.list.querySelector(".error").remove();
    }
  }
}
;// CONCATENATED MODULE: ./src/js/app.js

const root = document.querySelector(".root");
const url = "https://loading-server.onrender.com/news";
const widget = new Widget(root, url);
widget.init();
(async () => {
  try {
    if (navigator.serviceWorker) {
      await navigator.serviceWorker.register("./service-worker.js");
      console.log("Service worker register success");
    }
  } catch (err) {
    console.log("Error: ", err);
  }
})();
;// CONCATENATED MODULE: ./src/index.js


/******/ })()
;