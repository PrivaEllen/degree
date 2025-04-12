import path from 'path';

export const pathRelative: typeof path.relative = (...pathSegments) =>
    path.relative(...pathSegments).replace(/\\/g, '/');
