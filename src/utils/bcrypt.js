import bcryptjs from 'bcryptjs';

const bcrypt = {
    hash(value) {
        return bcryptjs.hashSync(value, 12);
    },
}

export default bcrypt;