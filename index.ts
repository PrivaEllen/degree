import { generateDocumentation } from './generation';

const main = () => {
    const documentation = generateDocumentation();
    console.log('documentation', documentation);
    console.log(
        'documentation[1].types[0].properties',
        documentation[1].types[0].properties
    );
};

main();
