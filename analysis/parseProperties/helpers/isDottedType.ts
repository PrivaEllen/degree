import { Statement } from '../definitions';

export const isDottedType = (statement: Statement) =>
    'dotDotDotToken' in statement && !!statement.dotDotDotToken;
