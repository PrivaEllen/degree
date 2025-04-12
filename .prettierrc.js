/** @type {import('@trivago/prettier-plugin-sort-imports').PrettierConfig} */
module.exports = {
    plugins: ['@trivago/prettier-plugin-sort-imports'],
    trailingComma: 'es5',
    tabWidth: 4,
    semi: true,
    singleQuote: true,
    printWidth: 80,
    bracketSpacing: true,
    arrowParens: 'avoid',
    endOfLine: 'lf',
    importOrder: [
        '^(?!(src|\./|\.\./))(.*)\.s?css$',
        '^(?!(src|\./|\.\./))',
        '^src/(.*)(?!\.s?css$)',
        '^\.\./(.*)(?!\.s?css$)',
        '^\./(.*)(?!\.s?css$)',
    ],
    importOrderSeparation: true,
    importOrderSortSpecifiers: true,
};
