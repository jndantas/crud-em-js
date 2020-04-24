class User {

    constructor(name, gender, birth, country, email, password, photo, admin) {

        this._id;
        this._name = name;
        this._gender = gender;
        this._birth = birth;
        this._email = email;
        this._country = country;
        this._password = password;
        this._photo = photo;
        this._admin = admin;
        this._register = new Date();
    }

    get id() {
        return this._id;
    }

    get register() {
        return this._register;
    }

    get name() {
        return this._name;
    }

    get gender() {
        return this._gender;
    }
    get birth() {
        return this._birth;
    }
    get country() {
        return this._country;
    }
    get email() {
        return this._email;
    }
    get photo() {
        return this._photo;
    }

    set photo(value) {
        this._photo = value;
    }
    get password() {
        return this._password;
    }
    get admin() {
        return this._admin;
    }

    loadFromJSON(json) {

        for (let name in json) {

            switch (name) {
                case '_register':
                    this[name] = new Date(json[name]);
                    break;
                default:
                    this[name] = json[name];
            }

        }
    }

    static getUsersStorage() {
        let users = [];

        if (localStorage.getItem("user")) {

            users = JSON.parse(localStorage.getItem("user"));
        }

        return users;
    }

    getNewId() {

        let usersID = parseInt(localStorage.getItem("usersID"));

        if (!usersID > 0) usersID = 0;

        usersID++;

        localStorage.setItem("usersID", usersID);
        return usersID;
    }

    save() {

        let users = User.getUsersStorage();

        if (this.id > 0) {
            users.map(u => {
                if (u._id == this.id) {
                    Object.assign(u, this);
                }
                return u;
            });


        } else {
            this._id = this.getNewId();

            users.push(this);

        }

        localStorage.setItem("user", JSON.stringify(users));

    }

    delete() {

        let users = User.getUsersStorage();

        users.forEach((userData, index) => {
            if (this._id == userData._id) {
                users.splice(index, 1);
            }
        });

        localStorage.setItem("user", JSON.stringify(users));
    }

}