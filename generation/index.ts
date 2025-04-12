import { getProperties } from '../analysis';
import { definitionsFiles, targetTypesNames } from '../constants';
import { Types } from '../definitions';

import { DocumentationItem } from './definitions';
import { showProgress } from './helpers';

export const generateDocumentation = () =>
    definitionsFiles.reduce(
        (result: DocumentationItem[], { fileName, sourceFile }, index) => {
            if (!sourceFile) {
                return result;
            }

            const documentationItem: DocumentationItem = {
                item: fileName,
                types: targetTypesNames.reduce((acc: Types, typeName) => {
                    const properties = getProperties(
                        sourceFile,
                        typeName,
                        fileName
                    );

                    if (properties.length === 0) {
                        return acc;
                    }

                    return [
                        ...acc,
                        {
                            typeName,
                            properties,
                        },
                    ];
                }, []),
            };

            showProgress("Compile md's", index);
            return [...result, documentationItem];
        },
        []
    );
