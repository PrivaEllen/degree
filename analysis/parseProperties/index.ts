import ts from 'typescript';

import { Property } from '../../definitions';

import { Statement } from './definitions';
import {
    convertObjectToString,
    getConditionalProperty,
    getIndexedAccessProperty,
    getLiteralProperty,
    getPropertyName,
    getReferenceMapping,
    getReferenceProperty,
    getUnionProperty,
} from './helpers';

export const parseProperties = (
    sourceFile: ts.SourceFile,
    sourceStatement?: Statement,
    fileName?: string,
    referenceMapping?: Record<string, string>,
    isArraySourceStatement = false
): Property | Property[] => {
    if (!sourceStatement) {
        return [];
    }

    const sourceType =
        'type' in sourceStatement ? sourceStatement.type : sourceStatement;

    if (!sourceType || !ts.isTypeNode(sourceType)) {
        return [];
    }

    switch (true) {
        case ts.isTypeLiteralNode(sourceType): {
            const typeParameters =
                'typeParameters' in sourceStatement
                    ? sourceStatement.typeParameters
                    : undefined;

            const newReferenceMapping = Array.isArray(typeParameters)
                ? getReferenceMapping(sourceFile, typeParameters)
                : undefined;
            const resultReferenceMapping = newReferenceMapping
                ? { ...referenceMapping, ...newReferenceMapping }
                : referenceMapping;

            return sourceType.members.flatMap(member => {
                const type = parseProperties(
                    sourceFile,
                    member,
                    fileName,
                    resultReferenceMapping
                );

                return getLiteralProperty(sourceFile, member, type);
            });
        }
        case ts.isMappedTypeNode(sourceType): {
            const newReferenceMapping = getReferenceMapping(
                sourceFile,
                sourceType
            );

            return parseProperties(
                sourceFile,
                sourceType,
                fileName,
                newReferenceMapping
                    ? { ...referenceMapping, ...newReferenceMapping }
                    : referenceMapping
            );
        }
        case ts.isIndexedAccessTypeNode(sourceType): {
            const { objectType, indexType } = sourceType;

            const newReferenceMapping = ts.isMappedTypeNode(objectType)
                ? getReferenceMapping(sourceFile, objectType)
                : undefined;
            const resultReferenceMapping = newReferenceMapping
                ? { ...referenceMapping, ...newReferenceMapping }
                : referenceMapping;

            const resultObjectType = parseProperties(
                sourceFile,
                objectType,
                fileName,
                resultReferenceMapping
            );

            const resultIndexType = parseProperties(
                sourceFile,
                indexType,
                fileName,
                resultReferenceMapping
            );

            return getIndexedAccessProperty(resultObjectType, resultIndexType);
        }
        case ts.isConditionalTypeNode(sourceType): {
            const trueType = parseProperties(
                sourceFile,
                sourceType.trueType,
                fileName,
                referenceMapping
            );
            const falseType = parseProperties(
                sourceFile,
                sourceType.falseType,
                fileName,
                referenceMapping
            );

            return getConditionalProperty(trueType, falseType);
        }
        case ts.isIntersectionTypeNode(sourceType): {
            return sourceType.types.flatMap(intersectionMappedType =>
                parseProperties(
                    sourceFile,
                    intersectionMappedType,
                    fileName,
                    referenceMapping
                )
            );
        }
        case ts.isUnionTypeNode(sourceType): {
            const type = sourceType.types.flatMap(unionType =>
                convertObjectToString(
                    parseProperties(
                        sourceFile,
                        unionType,
                        fileName,
                        referenceMapping
                    )
                )
            );

            return {
                name: '',
                type: getUnionProperty(type),
            };
        }
        case ts.isArrayTypeNode(sourceType): {
            const type = parseProperties(
                sourceFile,
                sourceType.elementType,
                fileName,
                referenceMapping,
                true
            );

            return type;
        }
        case ts.isTypeReferenceNode(sourceType): {
            const typeArguments = (sourceType.typeArguments ?? []).flatMap(
                typeArgument =>
                    convertObjectToString(
                        parseProperties(
                            sourceFile,
                            typeArgument,
                            fileName,
                            referenceMapping
                        )
                    )
            );

            return {
                name: '',
                type: getReferenceProperty(
                    sourceFile,
                    sourceType,
                    referenceMapping,
                    isArraySourceStatement,
                    typeArguments
                ),
            };
        }
        case ts.isFunctionTypeNode(sourceType): {
            const functionType = sourceType.parameters
                .map(parameter => {
                    const name = getPropertyName(sourceFile, parameter);
                    const type = convertObjectToString(
                        parseProperties(
                            sourceFile,
                            parameter.type,
                            fileName,
                            referenceMapping
                        )
                    );

                    return `${name}: ${type}`;
                })
                .join(', ');

            const returnType = convertObjectToString(
                parseProperties(
                    sourceFile,
                    sourceType.type,
                    fileName,
                    referenceMapping
                )
            );

            return {
                name: '',
                type: `(${functionType}) => ${returnType}`,
            };
        }
        default: {
            const primitiveType = sourceType.getText(sourceFile).trim();

            return {
                name: '',
                type: isArraySourceStatement
                    ? `${primitiveType}[]`
                    : primitiveType,
            };
        }
    }
};
