import { Statement } from '../definitions';

export const isOptionalType = (statement: Statement) =>
    'questionToken' in statement && !!statement.questionToken;
