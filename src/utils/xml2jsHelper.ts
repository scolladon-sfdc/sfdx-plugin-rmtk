import * as xml2js from 'xml2js';

const parseStringAsync = (content: Buffer): Promise<String> =>
    new Promise((resolve) => {
        const parser = new xml2js.Parser();
        parser.parseString(content, (_err, result) => {
            resolve(result)
        })
    })

export { parseStringAsync };