export class UserInfo {
    constructor({ profileName, profileJob, avatar }) {
        this._profileName = document.querySelector(profileName);
        this._profileJob = document.querySelector(profileJob);
        this._avatar = document.querySelector(avatar);
    }

    getUserInfo() {
        return {
            name: this._profileName.textContent,
            job: this._profileJob.textContent,
            avatar: this._avatar.src
        };
    }

    setUserInfo({ username, profileJob, avatar }) {
        this._profileName.textContent = username;
        this._profileJob.textContent = profileJob;
        this._avatar.src = avatar;
    }

    getUserId() {
        return this._userId;
    }
}