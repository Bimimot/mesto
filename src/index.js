import "../pages/index.css";

import Api from '../js/Api.js';
import Avatar from '../js/Avatar.js';
import Card from '../js/Card.js';
import CardList from '../js/CardList.js';
import FormValidator from '../js/FormValidator.js';
import PlusCard from '../js/PlusCard.js';
import Popup from '../js/Popup.js';
import UserInfo from '../js/UserInfo.js';

    //dom-элементы, для работы с методами классов
    const mainContainer = document.querySelector('.root');                            //основной контейнер, нужен для слушания keydown
    const rootContainer = document.querySelector('.places-list');                     //контейнер для карточек
    const plusCardForm = document.querySelector('.popup__form_type_add-place');
    const profileForm = document.querySelector('.popup__form_type_edit-ptofile');
    const avatarForm = document.querySelector('.popup__form_type_avatar');
    const profileElement = document.querySelector('.profile');
    const avatarElement = document.querySelector('.user-info__photo');
  
    const popupProfileContainer = document.querySelector('.popup_type_edit-profile');
    const popupAvatarContainer = document.querySelector('.popup_type_avatar');
    const popupCardContainer = document.querySelector('.popup_type_card');
    const popupAddCardContainer = document.querySelector('.popup_type_add-place');
  
    //мой Id пользователя
    let myId = 0;
  
    //тексты ошибок
    const errorsMessages = {
      validateBlank: 'Это обязательное поле',
      validateText: 'Должно быть от 2 до 30 символов',
      validateUrl: 'Здесь должна быть ссылка'
    }


    const api = new Api({
      baseUrl: 'https://praktikum.tk/cohort10',
      headers: {
        authorization: 'caf701ff-6f39-4585-92c8-ebdddadba86b',
        'Content-Type': 'application/json'
      }
    });
  
    

    const newProfile = new UserInfo(profileForm, profileElement, api);                //создаем объект для обработки формы профиля, передаем методы api
    const doList = new CardList(rootContainer);
    const editAvatar = new Avatar(avatarForm, avatarElement, api);
    const cards = new PlusCard(plusCardForm, doList, api);                            //методы для обработки формы добавления карточки

    

    api.getUser()                                                                    //получаем данные о пользователе, получаем промис
      .then((result) => {
        newProfile.renderUser(result.name, result.about);                            //если успешно - отрисовываем профиль
        editAvatar.renderAvatar(result.avatar);                                      //и аватар
        myId = result._id;                                                           //запоминаю свой ID для использования
      })
      .catch((err) => {
        console.log(err);
      })
  
  
    api.getInitialCards()                                                           //запрашиваем карточки, получаем промис
      .then((result) => {                                                           //если получили массив - выводим карточки
        result.forEach((value) => {
          const startCard =
            new Card(value, myId, api)                                              // передавать весь объект целиком
              .create();                                                            //контейнер с карточкой
          doList.addCard(startCard);                                                //добавляем на страницу созданный контейнер карты                                                               
        })
        new Popup(popupCardContainer, '.place-card__image', validator);             //и только теперь начинаем слущать открытие попапов на карточках
      })
      .catch((err) => {
        console.log(err);
      })
  
  
    const validator = new FormValidator(errorsMessages);                               //создаем валидатор, передаем тексты ошибок
  
    editProfilePopup = new Popup(popupProfileContainer, '.user-info__button_type_edit-profile', validator);
    editAvatarPopup = new Popup(popupAvatarContainer, '.user-info__photo', validator)
    plusCardPopup = new Popup(popupAddCardContainer, '.user-info__button_type_add-place', validator);

  
  
  