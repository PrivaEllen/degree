import path from 'path';

export const pathResolve: typeof path.resolve = (...pathSegments) =>
    path.resolve(...pathSegments).replace(/\\/g, '/');
