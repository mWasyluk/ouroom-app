export default class AuthDetails {
    constructor({ email, password } = {}) {
        if (email && password) {
            this.email = email;
            this.password = password;
        }
    }

    isValid() {
        return this.email && this.password ? true : false;
    }
}