import { Property } from '../../../definitions';

import { getDescription } from './getDescription';
import { preparePropertyName } from './preparePropertyName';

export const getDescriptions = (
    properties: Property[],
    propertiesText?: string
) => {
    if (!propertiesText) {
        return properties;
    }

    const descriptions: string[] = [];
    return properties.reduce(
        (acc: Property[], property: Property, index: number) => {
            const propertyName = preparePropertyName(property.name);
            const nextPropertyName = properties[index + 1]
                ? preparePropertyName(properties[index + 1].name)
                : undefined;

            const propertySearchStr = nextPropertyName
                ? `${propertyName}(.?|\n)+(?=(\n( )+${nextPropertyName}))`
                : `${propertyName}(.?|\n)+`;

            const propertyText = propertiesText.match(propertySearchStr)?.[0];

            const propertyDescription = getDescription(
                properties,
                descriptions,
                propertiesText,
                property.name,
                index,
                propertyText
            );

            if (propertyDescription?.match(/@ignore/g)) {
                return acc;
            }

            descriptions.push(propertyDescription ?? '');

            const formattedPropertyDescription = propertyDescription?.replace(
                /`[^`]+`/g,
                match => `<code>${match.slice(1, match.length - 1)}</code>`
            );

            return [
                ...acc,
                propertyDescription
                    ? {
                          ...property,
                          description: formattedPropertyDescription,
                      }
                    : {
                          ...property,
                      },
            ];
        },
        []
    );
};
