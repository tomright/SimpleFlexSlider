let all_containers = document.querySelectorAll(".slider");
class Slider {
  current = 1; // начальный счетчик для элементов
  target_element; // поле для хранения начальной точки слайдера
  next_button_press; // необходимо для отслеживания на какую кнопку нажал пользователь
  progressDot; // нода дом дерева с прогрессом просмотра
  progressDot__item_focus; // код для добавления точки с фокусом
  progressDot__item; // код для добавления точки без фокусa
  progressDot__item_array;
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
    // событие которое смотрит за анимацией, когда она заканчивается, запускает функцию пересчета order для флекс элементов
    this.target_element.querySelector(".slider__container").addEventListener("transitionend", () => {
      this.changeOrder();
    });
  }
  changeOrder() {
    this.progressDot__item_array = this.target_element.getElementsByClassName("slider__dot");
    // функция которая пересчитывает order, для того чтобы слайды менялись
    if (this.next_button_press) {
      //логика для пересчета позиций флекс элемента. true - нажата клавиша следующего слайда, иначе предыдущего
      if (this.current == this.num_items) this.current = 1; // условие для цикличной перемотки слайдов, без остановок
      else this.current++;

      let order = 1;

      for (let i = this.current; i <= this.num_items; i++) {
        // проставляем позиции от текущего и до последнего
        this.target_element.querySelector(".slider__item[data-position='" + i + "']").style.order = order;
        order++;

        this.progressDot__item_array[i - 1].replaceWith(this.progressDot__item.cloneNode(true)); // проставляем не фокусные точки для того чтобы ушли фокусные точки.
      }

      for (let i = 1; i < this.current; i++) {
        this.target_element.querySelector(".slider__item[data-position='" + i + "']").style.order = order; // проставляем позиции от первого и до текущего
        order++;
        this.progressDot__item_array[i - 1].replaceWith(this.progressDot__item.cloneNode(true)); // проставляем не фокусные точки для того чтобы ушли фокусные точки.
      }
      this.progressDot__item_array[this.current - 1].replaceWith(this.progressDot__item_focus.cloneNode(true)); //ставим точку фокуса на текущий элемент
    } else {
      if (this.current == 1) this.current = this.num_items; // условие для того чтобы с первого элемента перейти на четвертый
      else this.current--;

      let order = 1;

      for (let i = this.current; i > 0; i--) {
        // аналогично предыдущим проставлениям ставим позиции для флекс элементов
        this.target_element.querySelector(".slider__item[data-position='" + i + "']").style.order = order;
        order++;
        this.progressDot__item_array[i - 1].replaceWith(this.progressDot__item.cloneNode(true));
      }

      for (let i = this.num_items; i > this.current; i--) {
        // аналогично предыдущим проставлениям ставим позиции для флекс элементов
        this.target_element.querySelector(".slider__item[data-position='" + i + "']").style.order = order;
        order++;
        this.progressDot__item_array[i - 1].replaceWith(this.progressDot__item.cloneNode(true));
      }
      this.progressDot__item_array[this.current - 1].replaceWith(this.progressDot__item_focus.cloneNode(true)); //ставим точку фокуса на текущий элемент
    }
    this.target_element.querySelector(".slider__container").style.transform = "translateX(0)"; // после пересчета показываем первый элемент флекс конейнера
    this.target_element.querySelector(".slider__container").classList.remove("slider__container-transition"); // убираем анимации чтоб все не прыгало
  }
  gotoNext() {
    // кнопка для перехода к следующему слайду
    this.next_button_press = true; // чтобы отличать какая кнопка была нажата
    this.target_element.querySelector(".slider__container").classList.add("slider__container-transition"); // добавляем класс для анимации сдвига
    this.target_element.querySelector(".slider__container").style.transform = "translateX(-100%)"; // двигаем флекс контейнер
  }
  gotoPrev() {
    // кнопка для перехода к предыдущему слайду
    this.next_button_press = false;
    this.target_element.querySelector(".slider__container").classList.add("slider__container-transition");
    this.target_element.querySelector(".slider__container").style.transform = "translateX(100%)";
  }
}

// запуск слайдера для всей найденных слайдеров
for (let i = 0; i < all_containers.length; i++) {
  new Slider(all_containers[i]).init_sliders();
}
