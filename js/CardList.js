class CardList {
    constructor(container) {
        this.container = container;
    }

    addCard(element) {                                                                //добавление элемента карточки в контейнер карточек
        this.cardElement = element;
        this.container.appendChild(this.cardElement) // можно сразу передавать element
    }


}
