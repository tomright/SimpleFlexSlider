let all_sliders = document.querySelectorAll(".container");
console.log(all_sliders);

for (let i = 0; i < all_sliders.length; i++) {
  console.log(all_sliders[i]);
  init_sliders(all_sliders[i]);
}

let gotoNext = function (slider) {
  return function () {
    slider.querySelector(".slider-container").classList.add("slider-container-trasition");
    slider.querySelector(".slider-container").style.transform = "translateX(-100%)";
  };
};
let changeOrder = function (num_items, current, slider) {
  return function () {
    if (current == num_items) current = 1;
    else current++;
    let order = 1;
    for (let i = current; i <= num_items; i++) {
      slider.querySelector(".slider-item[data-position='" + i + "']").style.order = order;
      order++;
    }
    for (let i = 1; i < current; i++) {
      slider.querySelector(".slider-item[data-position='" + i + "']").style.order = order;
      order++;
    }
    document.querySelector(".slider-container").classList.remove("slider-container-transition");
    document.querySelector(".slider-container").style.transform = "translateX(0)";
  };
};
function init_sliders(slider) {
  let num_items = slider.querySelectorAll(".slider-item").length;
  let current = 1;
  slider.querySelectorAll(".slider-item").forEach(function (element, index) {
    element.style.order = index + 1;
  });
  slider.querySelector(".move-button").addEventListener("click", gotoNext(slider));
  slider.querySelector(".sliser-container").addEventListener("transitionded", changeOrder(num_items, current, slider));
}
