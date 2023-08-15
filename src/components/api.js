
export class Api {
    constructor(config) {
        this._link = config.link;
        this._headers = config.headers;
    }

    _onResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`)
    }

    getCards() {
        return fetch(`${this._link}cards`, {
            method: 'GET',
            headers: this._headers
        })
            .then(res => this._onResponse(res))
    }

    addCard(data) {
        return fetch(`${this._link}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                link: data.link
            })
        })
            .then(res => this._onResponse(res))
    }

    deleteCard(idCard) {
        return fetch(`${this._link}cards/${idCard}`, {
            method: 'DELETE',
            headers: this._headers
        })
            .then(res => this._onResponse(res))
    }

    getUser() {
        return fetch(`${this._link}/users/me`, {
            method: 'GET',
            headers: this._headers
        })
            .then(res => this._onResponse(res));
    }

    editUserInfo(data) {
        return fetch(`${this._link}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: data.username,
                about: data.job
            })
        })
            .then(res => this._onResponse(res));
    }

    getAllInfo() {
        return Promise.all([this.getUser(), this.getAllPosts()])
    }

    editAvatar(data) {
        return fetch(`${this._link}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: data.avatar
            })
        })
            .then(res => this._onResponse(res));
    }

    getCardById(idCard) {
        return fetch(`${this._link}/cards/${idCard}`, {
            method: 'GET',
            headers: this._headers
        })
            .then(res => this._onResponse(res))
    }

    setLike(cardId) {
        return fetch(`${this._link}/cards/${cardId}/likes`, {
            method: 'PUT',
            headers: this._headers
        })
            .then(res => this._onResponse(res))
    }

    deleteLike(cardId) {
        return fetch(`${this._link}/cards/${cardId}/likes`, {
            method: 'DELETE',
            headers: this._headers
        })
            .then(res => this._onResponse(res))
    }

    setCardLike(id) {
        return fetch(`${this._link}/cards/${id}/likes`, {
            method: 'PUT',
            headers: this._headers
        })
            .then(res => this._onResponse(res));
    }
}