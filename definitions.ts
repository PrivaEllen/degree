import ts from 'typescript';

export type File = {
    fileName: string;
    filePath: string;
    sourceFile?: ts.SourceFile;
};

export type Property = {
    name: string;
    type: string;
    isArray?: boolean;
    description?: string;
    defaultValue?: string;
};

export type Types = {
    typeName: string;
    properties: Property[];
}[];
