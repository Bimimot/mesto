export default class Popup {
  constructor(container, buttonSelector, validator) {
    this.container = container;
    this.formElement = container.querySelector('.popup__form');
    this.validator = validator;
    this.buttonSelector = buttonSelector;
    this._closeByKey = this._closeByKey.bind(this);
    this._closeByClick = this._closeByClick.bind(this);
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);

    this._popupListeners()
    this._setSubmitListener()
  }

  _setSubmitListener() {
    
    if (this.formElement && this.formElement != '') {
      this.formElement.addEventListener('submit', this.close);                               //слушатель нажатия кнопки отправки если это форма
    }
  }

  _popupListeners() {                                                                       //слушаем нажатия на вызов попапа
    const elements = this.container.parentNode.querySelectorAll(this.buttonSelector);
    
    for (let element of elements) {
      element.addEventListener('click', (event) => {
        this.link = this._linkFromCard(event);
        if (!event.target.className.includes('place-card__delete-icon')) {
          this.open();
        }
      })
    }
  }

  _linkFromCard(event) {                                                                    // получения ссылки на изображение нажатой карточки 
    let curImageLink = '';
  
    if (event.target.closest('.place-card__image')) {                                       //берем элемент изображения нажатой карточкой 
      const cardIm = event.target.closest('.place-card__image');
      curImageLink = cardIm.style.backgroundImage;                                          //берем ссылку на бэкграунд нажатой карточки
      curImageLink = curImageLink.slice(5, (curImageLink.length - 2));                      //вырезаем чистую ссылку, без кавычек и url
    };

    return curImageLink;
  }

  open() {                                                                                  //открытие попапа
    if (this.link != '') { this._addLink() }                                                //или вешаем картинку
    else {
      this.validator.setEventListeners(this.formElement);
    };                                                                                      //или вызываем валидацию полей;
    
    this.container.classList.add('popup_is-opened');
    this._setEventListeners();                                                              //вызываем слушатели для закрытия

  }

  _setEventListeners() {                                                                    //обработчик событий для закрытия попапа
    this.container.parentNode.parentNode.addEventListener('keydown', this._closeByKey);
    this.container.addEventListener('click', this._closeByClick);
  }

  removeEventListeners() {                                                                  //удаление обработчиков
    this.container.parentNode.parentNode.removeEventListener('keydown', this._closeByKey);
    this.container.removeEventListener('click', this._closeByClick);
  }

  _closeByKey(event) {
    if (event.key === 'Escape') { this.close() }                                            //закрытие по Escape
  }

  _closeByClick(event) {                                                                    //закрытие по клику мимо попапа либо клика по крестику
    if (event.target.className.includes('popup_type') ||
      event.target.className.includes('popup__close')) { this.close() }
  }

  close() {                                                                                  //метод закрытия попапа
    event.preventDefault();
    this.removeEventListeners();
    this.container.classList.remove('popup_is-opened');

    if (this.formElement && this.formElement != '') {
      this._hideErrors();
      this._resetForm()
    }
  }

  _resetForm() {                                                                            //очистка формы
    this.formElement.reset();
  }

  _addLink() {                                                                               //подстановка ссылки на изображение
    this.container.querySelector('.popup__image').setAttribute("src", this.link);
  }

  _hideErrors() {                                                                           //стираниe ошибок после валидации
    const errors = this.container.querySelectorAll('.error-message');
    errors.forEach(value => (value.textContent = ''));
  }

}

