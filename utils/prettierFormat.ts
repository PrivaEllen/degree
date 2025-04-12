import { exec } from './exec';

export const prettierFormat = async (...paths: string[]) => {
    if (paths.length) {
        await exec(`prettier --allow-empty --write ${paths}`);
    }
};
