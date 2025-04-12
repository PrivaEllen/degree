import ts from 'typescript';

export type Statement =
    | ts.ParameterDeclaration
    | ts.PropertySignature
    | ts.TypeAliasDeclaration
    | ts.TypeElement
    | ts.TypeNode;
