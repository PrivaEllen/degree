import ts from 'typescript';

import { getName } from '../../helpers';

import { isDottedType } from './isDottedType';
import { isOptionalType } from './isOptionalType';

export const getPropertyName = (
    sourceFile: ts.SourceFile,
    property: ts.TypeElement | ts.ParameterDeclaration
) => {
    const name = getName(property, sourceFile);

    const optionalName = isOptionalType(property) ? `${name}?` : name;
    return isDottedType(property) ? `...${optionalName}` : optionalName;
};
