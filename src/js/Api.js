export default class Api {
  constructor({ baseUrl, headers }) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  getUser() {                                                                                             //получаем данные пользователя
    return(
    fetch((this.baseUrl + '/users/me'), {
      headers: this.headers
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);                                                  
    })
)
}

  getInitialCards() {
    return (                                                                                            //получаем стартовые карточки
      fetch((this.baseUrl + '/cards'), {
        headers: this.headers
      })
        .then(res => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(`Ошибка: ${res.status}`);                                                  
        })
    )
  }

  setProfile(newName, newAbout) {                                                                       //передаем новые данные профиля
    return (
      fetch((this.baseUrl + '/users/me'), {
        method: 'PATCH',
        headers: this.headers,
        body: JSON.stringify({
          name: newName,
          about: newAbout
        })
      })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);                                                  
      })
    )
  }

  setAvatar(newLink) {                                                                       //передаем новые данные профиля
    return (
      fetch((this.baseUrl + '/users/me/avatar'), {
        method: 'PATCH',
        headers: this.headers,
        body: JSON.stringify({
          avatar: newLink
        })
      })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);                                                  
      })
    )
  }

  postNewCard(newName, newLink) {
    return (
      fetch( (this.baseUrl + '/cards'), {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify({
          name: newName,
          link: newLink
        })
      })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
    )
  }

  deleteCard(cardId) {
    return (   
      fetch( (this.baseUrl + '/cards/' + cardId), {
        method: 'DELETE',
        headers: this.headers
      })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
     )
   }

   putLike(cardId){
    return (   
        fetch( (this.baseUrl + '/cards/like/' + cardId), {
          method: 'PUT',
          headers: this.headers
        })
        .then(res => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(`Ошибка: ${res.status}`);
        })
       )
    }

    deleteLike(cardId){
      return (   
          fetch( (this.baseUrl + '/cards/like/' + cardId), {
            method: 'DELETE',
            headers: this.headers
          })
          .then(res => {
            if (res.ok) {
              return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
          })
         )
      }
  
}