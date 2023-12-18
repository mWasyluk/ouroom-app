import bcryptjs from 'bcryptjs';

export function toBcrypt(value) {
    return bcryptjs.hashSync(value, 12);
}
