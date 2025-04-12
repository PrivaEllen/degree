import ts from 'typescript';

import { getName } from '../../helpers';

export const getReferenceMapping = (
    sourceFile: ts.SourceFile,
    statement: ts.MappedTypeNode | ts.TypeParameterDeclaration[]
) => {
    const typeParameter = Array.isArray(statement)
        ? statement[0]
        : statement.typeParameter;
    const parameterName = getName(typeParameter, sourceFile);
    const constraintName = typeParameter.constraint
        ? getName(typeParameter.constraint, sourceFile)
        : undefined;

    return parameterName && constraintName
        ? {
              [parameterName]: constraintName,
          }
        : undefined;
};
