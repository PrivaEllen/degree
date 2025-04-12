import ts from 'typescript';

export const getName = (
    sourceStatement:
        | ts.Expression
        | ts.Identifier
        | ts.ImportSpecifier
        | ts.Node
        | ts.ParameterDeclaration
        | ts.PropertySignature
        | ts.Statement
        | ts.TypeReferenceNode
        | ts.VariableDeclaration,
    sourceFile?: ts.SourceFile
) => {
    switch (true) {
        case ts.isTypeParameterDeclaration(sourceStatement):
            return sourceStatement.name.getText(sourceFile);
        case ts.isTypeReferenceNode(sourceStatement):
            return sourceStatement.typeName.getText(sourceFile);
        case ts.isCallExpression(sourceStatement):
            return sourceStatement.expression.getText(sourceFile);
        case ts.isElementAccessExpression(sourceStatement):
            return sourceStatement.expression.getText(sourceFile);
        case ts.isAsExpression(sourceStatement):
            return sourceStatement.expression.getText(sourceFile);
        case ts.isPropertySignature(sourceStatement): {
            if (ts.isComputedPropertyName(sourceStatement.name)) {
                return sourceStatement.name.expression.getText(sourceFile);
            }
            return sourceStatement.name.getText(sourceFile);
        }
        case 'name' in sourceStatement && ts.isIdentifier(sourceStatement.name):
            return sourceStatement.name.getText(sourceFile);
        default:
            return sourceStatement.getText(sourceFile);
    }
};
