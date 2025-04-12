import { definitionsFilesCount } from '../../constants';
import { logger } from '../../utils';

export const showProgress = (name: string, index: number) => {
    const state = (100 / definitionsFilesCount) * (index + 1);
    const logMessage =
        index >= definitionsFilesCount - 1
            ? `${name} progress: ${Math.floor(state)}%\n`
            : `${name} progress: ${Math.floor(state)}%`;

    logger.debug(logMessage, index);
};
