import { v4 } from 'uuid';

const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export function validateUuid(uuid) {
    return uuidRegex.test(uuid);
}

export function generateUuid() {
    return v4();
}
