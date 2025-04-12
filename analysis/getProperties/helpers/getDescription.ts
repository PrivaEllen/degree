import { Property } from '../../../definitions';
import { commentsRegExp, descriptionRegExp } from '../constants';

import { getPropertyWithoutDescription } from './getPropertyWithoutDescription';

export const getDescription = (
    properties: Property[],
    descriptions: string[],
    propertiesText: string,
    name: string,
    index: number,
    text?: string
) => {
    if (name) {
        const nextProperty = properties[index + 1];

        return nextProperty && !nextProperty.name
            ? getPropertyWithoutDescription(
                  propertiesText,
                  descriptions[descriptions.length - 1]
              )
            : text?.match(commentsRegExp)?.[0].match(descriptionRegExp)?.[0];
    }

    if (index === properties.length - 1) {
        return getPropertyWithoutDescription(
            propertiesText,
            descriptions[descriptions.length - 1]
        );
    }

    return undefined;
};
