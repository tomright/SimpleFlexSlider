let all_containers = document.querySelectorAll(".slider");
class Slider {
  current = 1; // начальный счетчик для элементов
  target_element = undefined; // поле для хранения начальной точки слайдера
  next_button_press = undefined; // необходимо для отслеживания на какую кнопку нажал пользователь
  progressDot = undefined; // нода дом дерева с прогрессом просмотра
  progressDot__item_focus = `<img class="slider__dot" src="/src/EllipseFocusBlue.svg" alt="" />`; // код для добавления точки с фокусом
  progressDot__item = `<img class="slider__dot" src="/src/EllipseNofocusBlue.svg" alt="" />`; // код для добавления точки без фокусa
  constructor(target_element) {
    this.target_element = target_element; // заполняем начальный элемент слайдера
    this.num_items = this.target_element.querySelectorAll(".slider__item").length;
    this.progressDot = this.target_element.querySelector(".slider__progress-dot");
  }
  init_sliders() {
    this.target_element.querySelectorAll(".slider__item").forEach(function (element, index) {
      element.style.order = index + 1;
    });
    for (let i = 0; i < this.num_items - 1; i++) {
      this.progressDot.insertAdjacentHTML("afterBegin", this.progressDot__item);
    }

    this.progressDot.insertAdjacentHTML("afterBegin", this.progressDot__item_focus);
    this.addEvents();
  }
  addEvents() {
    this.target_element.querySelector(".slider__move-button").addEventListener("click", () => {
      this.gotoNext();
    });

    this.target_element.querySelector(".slider__prev-button").addEventListener("click", () => {
      this.gotoPrev();
    });
    this.target_element.querySelector(".slider__container").addEventListener("transitionend", () => {
      this.changeOrder();
    });
  }
  changeOrder() {
    if (this.next_button_press) {
      if (this.current == this.num_items) this.current = 1;
      else this.current++;

      let order = 1;

      for (let i = this.current; i <= this.num_items; i++) {
        this.target_element.querySelector(".slider__item[data-position='" + i + "']").style.order = order;
        order++;

        this.progressDot.childNodes[i - 1].src = "/src/EllipseNofocusBlue.svg";
      }

      for (let i = 1; i < this.current; i++) {
        this.target_element.querySelector(".slider__item[data-position='" + i + "']").style.order = order;
        order++;
        this.progressDot.childNodes[i - 1].src = "/src/EllipseNofocusBlue.svg";
      }
      this.progressDot.childNodes[this.current - 1].src = "/src/EllipseFocusBlue.svg";
    } else {
      if (this.current == 1) this.current = this.num_items;
      else this.current--;

      let order = 1;

      for (let i = this.current; i > 0; i--) {
        this.target_element.querySelector(".slider__item[data-position='" + i + "']").style.order = order;
        order++;
        this.progressDot.childNodes[i - 1].src = "/src/EllipseNofocusBlue.svg";
      }

      for (let i = this.num_items; i > this.current; i--) {
        this.target_element.querySelector(".slider__item[data-position='" + i + "']").style.order = order;
        order++;
        this.progressDot.childNodes[i - 1].src = "/src/EllipseNofocusBlue.svg";
      }
      this.progressDot.childNodes[this.current - 1].src = "/src/EllipseFocusBlue.svg";
    }
    this.target_element.querySelector(".slider__container").classList.remove("slider__container-transition");
    this.target_element.querySelector(".slider__container").style.transform = "translateX(0)";
  }
  gotoNext() {
    this.next_button_press = true;
    this.target_element.querySelector(".slider__container").classList.add("slider__container-transition");
    this.target_element.querySelector(".slider__container").style.transform = "translateX(-100%)";
  }
  gotoPrev() {
    this.next_button_press = false;
    this.target_element.querySelector(".slider__container").classList.add("slider__container-transition");
    this.target_element.querySelector(".slider__container").style.transform = "translateX(100%)";
  }
}

for (let i = 0; i < all_containers.length; i++) {
  new Slider(all_containers[i]).init_sliders();
}
