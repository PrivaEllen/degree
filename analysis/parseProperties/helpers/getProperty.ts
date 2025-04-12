import ts from 'typescript';

import { Property } from '../../../definitions';
import { getName } from '../../helpers';

import { convertObjectToString } from './convertObjectToString';
import { getPropertyName } from './getPropertyName';

export const getUnionProperty = (type: string[]) => type.join(' | ');

export const getConditionalProperty = (
    trueType: Property | Property[],
    falseType: Property | Property[]
) => ({
    name: '',
    type: getUnionProperty([
        `(${convertObjectToString(trueType)})`,
        `(${convertObjectToString(falseType)})`,
    ]),
});

export const getIndexedAccessProperty = (
    objectType: Property | Property[],
    indexType: Property | Property[]
) => {
    if (Array.isArray(objectType)) {
        return objectType;
    }

    return {
        name: '',
        type: `${convertObjectToString(objectType)}[${convertObjectToString(
            indexType
        )}]`,
    };
};

export const getReferenceProperty = (
    sourceFile: ts.SourceFile,
    type: ts.TypeReferenceNode,
    typesMapping?: Record<string, string>,
    isArray = false,
    typeArguments: string[] = []
) => {
    const baseTypeName = getName(type, sourceFile);
    const typeNameMap =
        baseTypeName && typesMapping ? typesMapping[baseTypeName] : undefined;
    let typeName = typeNameMap ?? baseTypeName;

    let typeLink: string | undefined;

    if (typeArguments.length === 0) {
        const result = `${isArray ? `${typeName}[]` : typeName}`;
        return typeLink ? `<a href="${typeLink}">${result}</a>` : result;
    }

    const wrapperName = !typeLink
        ? typeName
        : `<a href="${typeLink}">${typeName}</a>`;
    const typeArgumentsAsString = typeArguments.join(', ');

    const result = wrapperName
        ? `${wrapperName}&lt;${typeArgumentsAsString}&gt;`
        : typeArgumentsAsString;

    return isArray ? `${result}[]` : result;
};

export const getLiteralProperty = (
    sourceFile: ts.SourceFile,
    element: ts.TypeElement,
    type: Property | Property[]
) => {
    if (
        !ts.isPropertySignature(element) &&
        !ts.isIndexSignatureDeclaration(element)
    ) {
        return {
            name: getPropertyName(sourceFile, element),
            type: convertObjectToString(type),
        };
    }

    let name = '';
    if (ts.isIndexSignatureDeclaration(element)) {
        const parameter = element.parameters[0];
        name = getName(parameter, sourceFile);
    } else {
        name = getPropertyName(sourceFile, element);
    }

    const elementType = element.type;
    const isArray = elementType && ts.isArrayTypeNode(elementType);

    const convertedType = convertObjectToString(
        type,
        isArray && Array.isArray(type) && type.length > 1
    );

    return {
        name,
        type: convertedType,
    };
};
