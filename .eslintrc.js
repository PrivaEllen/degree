/** @type {import('@types/eslint').Linter.BaseConfig} */
module.exports = {
    root: true,
    env: {
        browser: false,
        node: true,
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: process.cwd(),
    },
    settings: {
        'import/resolver': {
            typescript: {
                project: './tsconfig.json',
            },
        },
    },
};
