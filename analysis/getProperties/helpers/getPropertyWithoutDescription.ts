import { commentsRegExp, descriptionRegExp } from '../constants';

export const getPropertyWithoutDescription = (
    propertiesText: string,
    prevDescription: string
) => {
    const nextDescriptions = propertiesText
        ?.match(commentsRegExp)
        ?.reduce((acc: string[], comment) => {
            const description = comment?.match(descriptionRegExp);

            return description ? [...acc, ...description] : acc;
        }, []);

    const prevDescriptionIndex = nextDescriptions?.findIndex(
        item => item === prevDescription
    );

    return prevDescriptionIndex
        ? nextDescriptions?.[prevDescriptionIndex + 1]
        : undefined;
};
