import bcryptjs from 'bcryptjs';

const Bcrypt = {
    hash(value) {
        return bcryptjs.hashSync(value, 12);
    },
}

export default Bcrypt;