import fs from 'fs-extra';

export const createDirs = (...dirNames: string[]) => {
    for (let dirName of dirNames) {
        if (!fs.existsSync(dirName)) {
            fs.mkdirSync(dirName);
        }
    }
};
