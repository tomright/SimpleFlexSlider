let all_containers = document.querySelectorAll(".slider");
class Slider {
  current = 1; // начальный счетчик для элементов
  target_element; // поле для хранения начальной точки слайдера
  num_items;
  progressDot; // нода дом дерева с прогрессом просмотра
  progressDot__item_focus; // код для добавления точки с фокусом
  progressDot__item; // код для добавления точки без фокусa
  progressDot__item_array;
  xCoordinat = 0; // текущее смещение флекс контейнера со слайдерами
  setToMove = 100; // шаг на который будет смещаться флекс контейнер со слайдерами
  constructor(target_element) {
    this.target_element = target_element; // заполняем начальный элемент слайдера
    this.num_items = this.target_element.querySelectorAll(".slider__item").length; //общее количество слайдов
    this.progressDot = this.target_element.querySelector(".slider__progress-dot"); // нода для добавления в неё точек прогресса
    this.progressDot__item_focus = this.progressDot.firstElementChild;
    this.progressDot__item = this.progressDot.lastElementChild;

    this.progressDot.removeChild(this.progressDot__item_focus);
    this.progressDot.removeChild(this.progressDot__item);
  }
  init_sliders() {
    // функция инициализации и запуска
    this.target_element.querySelectorAll(".slider__item").forEach(function (element, index) {
      element.style.order = index + 1; // заполняем order для каждого флекс элемента, то есть слайдера
    });
    for (let i = 0; i < this.num_items - 1; i++) {
      // по количеству слайдов, добавляем точки прогресса, которые находятся не в фокусе
      this.progressDot.append(this.progressDot__item.cloneNode(true));
    }
    // поскольку в данной реализации слайды начинаются с первого элемента, то нужно добавить точку с фокусом на ней
    this.progressDot.prepend(this.progressDot__item_focus.cloneNode(true));
    //запускаем добавление событий
    this.addEvents();
  }
  addEvents() {
    // событие для пролистывания вперед
    this.target_element.querySelector(".slider__move-button").addEventListener("click", () => {
      this.gotoNext();
    });

    // событие для пролистывания назад
    this.target_element.querySelector(".slider__prev-button").addEventListener("click", () => {
      this.gotoPrev();
    });
  }
  gotoNext() {
    this.progressDot__item_array = this.target_element.getElementsByClassName("slider__dot");
    if (this.current == this.num_items) {
      this.current = 1; // условие для цикличной перемотки слайдов, без остановок
      this.xCoordinat = 0;
    } else {
      this.current++;
      this.xCoordinat -= this.setToMove;
    }
    let order = 1;

    for (let i = this.current; i <= this.num_items; i++) {
      this.progressDot__item_array[i - 1].replaceWith(this.progressDot__item.cloneNode(true)); // проставляем не фокусные точки для того чтобы ушли фокусные точки.
    }

    for (let i = 1; i < this.current; i++) {
      this.progressDot__item_array[i - 1].replaceWith(this.progressDot__item.cloneNode(true)); // проставляем не фокусные точки для того чтобы ушли фокусные точки.
    }
    this.progressDot__item_array[this.current - 1].replaceWith(this.progressDot__item_focus.cloneNode(true)); //ставим точку фокуса на текущий элемент
    // кнопка для перехода к следующему слайду
    this.target_element.querySelector(".slider__container").classList.add("slider__container-transition"); // добавляем класс для анимации сдвига
    console.log(this.xCoordinat);
    this.target_element.querySelector(".slider__container").style.transform = `translateX(${this.xCoordinat}%)`; // двигаем флекс контейнер
  }
  gotoPrev() {
    // кнопка для перехода к предыдущему слайду
    this.progressDot__item_array = this.target_element.getElementsByClassName("slider__dot");

    if (this.current == 1) {
      // условие для того чтобы с первого элемента перейти на четвертый
      this.current = this.num_items;
      this.xCoordinat = -this.setToMove * this.num_items + this.setToMove;
    } else {
      this.current--;
      this.xCoordinat += this.setToMove;
    }

    let order = 1;

    for (let i = this.current; i > 0; i--) {
      this.progressDot__item_array[i - 1].replaceWith(this.progressDot__item.cloneNode(true));
    }

    for (let i = this.num_items; i > this.current; i--) {
      this.progressDot__item_array[i - 1].replaceWith(this.progressDot__item.cloneNode(true));
    }
    this.progressDot__item_array[this.current - 1].replaceWith(this.progressDot__item_focus.cloneNode(true)); //ставим точку фокуса на текущий элемент
    console.log(this.xCoordinat);
    this.target_element.querySelector(".slider__container").classList.add("slider__container-transition");
    this.target_element.querySelector(".slider__container").style.transform = `translateX(${this.xCoordinat}%)`;
  }
}

// запуск слайдера для всей найденных слайдеров
for (let i = 0; i < all_containers.length; i++) {
  new Slider(all_containers[i]).init_sliders();
}
