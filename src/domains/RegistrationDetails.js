import bcrypt from "../utils/bcrypt";

const emailRegex = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;

export default class RegistrationDetails {
    constructor({ email, password, passwordRepeat } = {}) {
        if (email && password && passwordRepeat) {
            this.email = email;
            this.password = password;
            this.passwordRepeat = passwordRepeat;
        }
    }
    arePasswordsEqual() {
        return this.password === this.passwordRepeat;
    }

    isEmailCorrect() {
        return emailRegex.test(this.email);
    }

    isValid() {
        if (!this.email || !this.password || !this.passwordRepeat) {
            return false;
        }

        if (!this.arePasswordsEqual()) {
            return false;
        }

        if (!this.isEmailCorrect()) {
            return false;
        }
        return true;
    }

    get encodedPassword() {
        return bcrypt.hash(this.password);
    }
}