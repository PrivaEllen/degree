import ts from 'typescript';

import { parseProperties } from '../parseProperties';

import { getDescriptions, getTypeAliasByName } from './helpers';

export const getProperties = (
    sourceFile: ts.SourceFile,
    typeAliasName: string,
    fileName?: string
) => {
    const typeAlias = getTypeAliasByName(sourceFile, typeAliasName);
    const typeAliasAsText = typeAlias?.getText(sourceFile);

    const properties = parseProperties(sourceFile, typeAlias, fileName, {});

    const typeAliasProperties = Array.isArray(properties)
        ? properties
        : [properties];

    return getDescriptions(typeAliasProperties, typeAliasAsText);
};
