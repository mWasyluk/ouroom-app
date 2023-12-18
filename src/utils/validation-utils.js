const ValidationRegexes = {
    email: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+[.]{1}[a-zA-Z0-9-]+$/gu,
    // password: /^(?=.*[A-Za-z])(?=.*[~`!@#$%^&*()_\-+={[}\]|\\:;"'<,>.?/])[A-Za-z\d~`!@#$%^&*()_\-+={[}\]|\\:;"'<,>.?/]{8,}$/
    password: /^(?=.*\p{Ll})(?=.*\p{Lu})(?=.*[~`!@#$%^&*()_\-+={[}\]|\\:;"'<,>.?/])[\p{L}\d~`!@#$%^&*()_\-+={[}\]|\\:;"'<,>.?/]{8,}$/gu,
    firstName: /^[\p{L}]{3,}$/gu,
    lastName: /^[\p{L}]{2,}$/gu,
}

export function validateEmail(value) {
    const isValid = ValidationRegexes.email.test(value);
    ValidationRegexes.email.lastIndex = 0;
    return isValid;
}

export function validatePassword(value) {
    const isValid = ValidationRegexes.password.test(value);
    ValidationRegexes.password.lastIndex = 0;
    return isValid;
}

export function validateFirsName(value) {
    const isValid = ValidationRegexes.firstName.test(value);
    ValidationRegexes.firstName.lastIndex = 0;
    return isValid;
}

export function validateLastName(value) {
    const isValid = ValidationRegexes.lastName.test(value);
    ValidationRegexes.lastName.lastIndex = 0;
    return isValid;
}

export function validateBirthDate(value) {
    const today = new Date();
    const birthDate = new Date(value);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age >= 13;
}
