import { flags, SfdxCommand } from '@salesforce/command';
import { Messages } from '@salesforce/core';
import { AnyJson } from "@salesforce/ts-types";
import { parseStringAsync } from '../../../utils/xml2jsHelper';
import { writeFileAsync } from '../../../utils/writeFileAsync';
import { packageBuilder } from '../../../utils/xmlFromJson';
import * as fs from 'fs';
import * as path from 'path';

Messages.importMessagesDirectory(__dirname);

const messages = Messages.loadMessages('sfdx-plugin-psa', 'prettify');

export default class Prettify extends SfdxCommand {

    public static description = messages.getMessage('command');

    protected static flagsConfig = {
        packages: flags.array({
            char: 'p',
            description: messages.getMessage('packagesFlagDescription'),
            delimiter: ':',
            required: true,
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
                        .then(sortedContent => writeFileAsync(x, `${sortedContent}`))
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