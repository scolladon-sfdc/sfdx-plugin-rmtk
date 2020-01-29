import { flags, SfdxCommand } from '@salesforce/command';
import { Messages } from '@salesforce/core';
import { AnyJson } from "@salesforce/ts-types";
import * as fs from 'fs';
import * as path from 'path';
import * as xml2js from 'xml2js';
import * as xmlbuilder from 'xmlbuilder';

Messages.importMessagesDirectory(__dirname);

const messages = Messages.loadMessages('sfdx-plugin-psa', 'prettify');

export default class Prettify extends SfdxCommand {

    public static description = messages.getMessage('command');

    protected static flagsConfig = {
        packages: flags.array({
            char: 'p',
            description: messages.getMessage('packagesFlagDescription'),
            delimiter: ':',
            map: (val: string) => path.parse(val)
        })
    };
    public async run(): Promise<AnyJson> {

        Promise.all(
            this.flags.packages.map(x => path.join(x.dir, x.base))
                .map(x =>
                    readFileAsync(x)
                        .then(parseStringAsync)
                        .then(packageBuilder)
                        .then(sortedContent => writeFileAsync(x, sortedContent))
                )
        )
            .then(() => this.ux.log(messages.getMessage('successProcess')))
            .catch(ex => this.ux.log(messages.getMessage('failureProcess', [ex])))
        return null;
    }
}

const readFileAsync = file => {
    return new Promise((resolve) => {
        fs.readFile(file, 'utf8', (_err, data) => {
            resolve(data.replace("\ufeff", ""))
        })
    })
}
const writeFileAsync = (file, fileContent) => {
    return new Promise((resolve) => {
        fs.writeFile(file, fileContent, () => {
            resolve()
        })
    })
}

const parseStringAsync = (content) => {
    return new Promise((resolve) => {
        const parser = new xml2js.Parser();
        parser.parseString(content, (_err, result) => {
            resolve(result)
        })
    })
}

const packageBuilder = (packageContent) => {
    const pkg = {};
    packageContent.Package.types.reduce((r, e) => pkg[e.name[0]] = [...new Set((pkg[e.name[0]] || []).concat(e.members))], pkg)
    const xml = xmlbuilder.create('Package')
        .att('xmlns', 'http://soap.sforce.com/2006/04/metadata')
        .dec('1.0', 'UTF-8');

    Object.keys(pkg).filter(x => Array.isArray(pkg[x])).sort().forEach(i => {
        const types = xml.ele('types');
        pkg[i].sort().forEach(y => types.ele('members', y))
        types.ele('name', i);
    });
    xml.ele('version', '' + packageContent.Package.version[0]);
    return xml.end({ pretty: true, indent: '    ', newline: '\n' }) + '\n';
}