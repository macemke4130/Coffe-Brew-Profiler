import * as bcrypt from 'bcrypt';

export async function generateHash(password: string) {
    try {
        const salt = await bcrypt.genSalt(12);
        const hash = await bcrypt.hash(password, salt);
        return hash;
    } catch (e) {
        throw e;
    }
}

export function comparePasswords(attemptPassword: string, storedPassword: string) {
    return bcrypt.compareSync(attemptPassword, storedPassword)
}