import ts from 'typescript';

export const getTypeAliasByName = (
    sourceFile: ts.SourceFile,
    typeName: string
) => {
    const targetType = sourceFile.statements.find(
        statement =>
            ts.isTypeAliasDeclaration(statement) &&
            statement.name.escapedText === typeName
    );

    return targetType && ts.isTypeAliasDeclaration(targetType)
        ? targetType
        : undefined;
};
