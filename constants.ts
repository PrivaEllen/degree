import ts from 'typescript';

import { File } from './definitions';
import { viewNames } from './projects/project1/src/Containers/View';
import { pathResolve } from './utils';

const processDir = pathResolve(process.cwd());
const containersDir = 'projects/project1/src/Containers';
const sourceDir = pathResolve(processDir, `./${containersDir}`);

export const documentationDir = pathResolve(processDir, './documentation');
export const handlebarsDirName = 'handlebars';

export const viewsDirName = 'views';
export const viewsDirSearchStr = `${viewsDirName}/[^/]+/`;

const definitionsFileName = 'definitions.ts';
const globalTypesFile = pathResolve(processDir, './types/global.d.ts');

export const propsTypeName = 'Props';
export const targetTypesNames = [propsTypeName];

const tsOptions = {
    target: ts.ScriptTarget.Latest,
};

const baseDefinitionsFiles: File[] = [
    ...viewNames.map(fileName => ({
        fileName,
        filePath: pathResolve(
            sourceDir,
            `./views/${fileName}/${definitionsFileName}`
        ),
    })),
];

const program = ts.createProgram(
    [...baseDefinitionsFiles.map(({ filePath }) => filePath), globalTypesFile],
    tsOptions
);

export const definitionsFiles: File[] = baseDefinitionsFiles.map(
    definitionFile => ({
        ...definitionFile,
        sourceFile: program.getSourceFile(definitionFile.filePath),
    })
);

export const definitionsFilesCount = definitionsFiles.length;
