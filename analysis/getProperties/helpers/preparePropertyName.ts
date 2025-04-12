import { getNameRegExp } from './getNameRegExp';

export const preparePropertyName = (propertyName: string) => {
    if (propertyName.includes('?')) {
        return propertyName.replace('?', '\\?');
    }

    if (!propertyName.startsWith(`'`) && !propertyName.endsWith(`'`)) {
        return getNameRegExp(propertyName);
    }

    return propertyName;
};
