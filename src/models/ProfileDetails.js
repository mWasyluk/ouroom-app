const nameRegex = /^[A-ZĄĆĘŁŃÓŚŻŹ]{1}[a-ząćęłńóśżź]{2,}$/;

export default class ProfileDetails {
    constructor({ firstName, lastName, birthDate, avatar } = {}) {
        if (firstName)
            this.firstName = firstName;
        if (lastName)
            this.lastName = lastName;
        if (birthDate)
            this.birthDate = birthDate;
        if (avatar || avatar !== {})
            this.avatar = avatar;
    }

    get age() {
        if (this.birthDate) {
            const today = new Date();
            const birthDate = new Date(this.birthDate);
            let age = today.getFullYear() - birthDate.getFullYear();
            const m = today.getMonth() - birthDate.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }
            return age;
        }
        return undefined;
    }

    areNamesValid() {
        if (!this.firstName || !this.lastName) {
            return false;
        }
        if (!nameRegex.test(this.firstName) || !nameRegex.test(this.lastName)) {
            return false;
        }
        return true;
    }

    isAgeSufficient() {
        return this.age >= 13;
    }

    isValid() {
        return this.areNamesValid() && this.isAgeSufficient();
    }
}