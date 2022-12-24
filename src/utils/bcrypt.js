import bcryptjs from 'bcryptjs';

const bcrypt = {
    async hash(value) {
        return await bcryptjs.hash(value, 12);
    },
}

export default bcrypt;