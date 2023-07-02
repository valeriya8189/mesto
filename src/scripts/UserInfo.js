export class UserInfo {
    constructor({ profileName, profileJob }) {
        this._profileName = document.querySelector(profileName);
        this._profileJob = document.querySelector(profileJob);
    }

    getUserInfo() {
        return {
            name: this._profileName.textContent,
            job: this._profileJob.textContent
        };
    }

    /*   setUserInfo(data) {
           this._profileName.textContent = data.profileName;
           this._profileJob.textContent = data.profileJob;
       }*/
    setUserInfo({ username, profileJob }) {
        this._profileName.textContent = username;
        this._profileJob.textContent = profileJob;
    }
}