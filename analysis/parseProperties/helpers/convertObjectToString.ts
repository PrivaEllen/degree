import { Property } from '../../../definitions';

export const convertObjectToString = (
    sourceObject: Property | Property[],
    isArray = false
): string => {
    if (!Array.isArray(sourceObject)) {
        const { name, type } = sourceObject;

        if (!name) {
            return type;
        }

        return `${name}: ${type}`;
    }

    const result = sourceObject.reduce((acc: string, item, index) => {
        const convertedItem = convertObjectToString(item);

        const isLast = index === sourceObject.length - 1;

        const newAcc = acc.concat(convertedItem);
        return isLast ? newAcc : newAcc.concat(', ');
    }, '');

    return `{ ${result} }${isArray ? '[]' : ''}`;
};
