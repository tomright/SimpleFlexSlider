let all_containers = document.querySelectorAll(".container");
class Slider {
  current = 1;
  next_button_press = undefined;
  constructor(target_element) {
    this.target_element = target_element;
    this.num_items = this.target_element.querySelectorAll(".slider-item").length;
  }
  init_sliders() {
    this.target_element.querySelectorAll(".slider-item").forEach(function (element, index) {
      element.style.order = index + 1;
    });

    this.addEvents();
  }
  addEvents() {
    this.target_element.querySelector(".move-button").addEventListener("click", () => {
      this.gotoNext();
    });

    this.target_element.querySelector(".prev-button").addEventListener("click", () => {
      this.gotoPrev();
    });
    this.target_element.querySelector(".slider-container").addEventListener("transitionend", () => {
      this.changeOrder();
    });
  }
  changeOrder() {
    if (this.next_button_press) {
      if (this.current == this.num_items) this.current = 1;
      else this.current++;

      let order = 1;

      for (let i = this.current; i <= this.num_items; i++) {
        this.target_element.querySelector(".slider-item[data-position='" + i + "']").style.order = order;
        order++;
      }

      for (let i = 1; i < this.current; i++) {
        this.target_element.querySelector(".slider-item[data-position='" + i + "']").style.order = order;
        order++;
      }
    } else {
      if (this.current == 1) this.current = this.num_items;
      else this.current--;

      let order = 1;

      for (let i = this.current; i > 0; i--) {
        this.target_element.querySelector(".slider-item[data-position='" + i + "']").style.order = order;
        order++;
      }

      for (let i = this.num_items; i > this.current; i--) {
        this.target_element.querySelector(".slider-item[data-position='" + i + "']").style.order = order;
        order++;
      }
    }
    this.target_element.querySelector(".slider-container").classList.remove("slider-container-transition");
    this.target_element.querySelector(".slider-container").style.transform = "translateX(0)";
  }
  gotoNext() {
    this.next_button_press = true;
    this.target_element.querySelector(".slider-container").classList.add("slider-container-transition");
    this.target_element.querySelector(".slider-container").style.transform = "translateX(-100%)";
  }
  gotoPrev() {
    this.next_button_press = false;
    this.target_element.querySelector(".slider-container").classList.add("slider-container-transition");
    this.target_element.querySelector(".slider-container").style.transform = "translateX(100%)";
  }
}

for (let i = 0; i < all_containers.length; i++) {
  new Slider(all_containers[i]).init_sliders();
}
