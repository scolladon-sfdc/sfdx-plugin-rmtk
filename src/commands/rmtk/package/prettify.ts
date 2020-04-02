import { flags, SfdxCommand } from '@salesforce/command';
import { Messages } from '@salesforce/core';
import { AnyJson } from "@salesforce/ts-types";
import { parseStringAsync } from '../../../utils/xml2jsHelper';
import { writeFileAsync } from '../../../utils/writeFileAsync';
import { packageBuilder, customLabelBuilder, ppsBuilder } from '../../../utils/xmlFromJson';
import * as fs from 'fs';
import * as path from 'path';

Messages.importMessagesDirectory(__dirname);

const messages = Messages.loadMessages('sfdx-plugin-rmtk', 'prettify');
const INPUT_DELIMITER = ':'

export default class Prettify extends SfdxCommand {

    public static description = messages.getMessage('command');

    protected static flagsConfig = {
        packages: flags.array({
            char: 'p',
            description: messages.getMessage('packagesFlagDescription', [INPUT_DELIMITER]),
            delimiter: INPUT_DELIMITER,
            map: (val: string) => path.parse(val)
        }),
        profiles: flags.array({
            char: 'f',
            description: messages.getMessage('profilesFlagDescription', [INPUT_DELIMITER]),
            delimiter: INPUT_DELIMITER,
            map: (val: string) => path.parse(val)
        }),
        'permission-sets': flags.array({
            char: 's',
            description: messages.getMessage('psetsFlagDescription', [INPUT_DELIMITER]),
            delimiter: INPUT_DELIMITER,
            map: (val: string) => path.parse(val)
        }),
        labels: flags.filepath({
            char: 'l',
            description: messages.getMessage('labelsFlagDescription')
        })
    };
    public async run(): Promise<AnyJson> {

        const jobs = Promise.resolve([]); ``

        if (this.flags.packages !== undefined) {
            this.flags.packages.map(x => path.join(x.dir, x.base)).reduce((p, x) => p.then(() => new Promise((res) =>
                readFileAsync(x)
                    .then(parseStringAsync)
                    .then(packageBuilder)
                    .then(sortedContent => writeFileAsync(x, `${sortedContent}`))
                    .then(() => this.ux.log(messages.getMessage('logPrettify', [x])))
                    .then(res)
                    .catch(err => this.ux.log(messages.getMessage('errorProcess', [err.message])))
            )), jobs)
        }
        if (this.flags.profiles !== undefined) {
            this.flags.profiles.map(x => path.join(x.dir, x.base)).reduce((p, x) => p.then(() => new Promise((res) =>
                readFileAsync(x)
                    .then(parseStringAsync)
                    .then(ppsBuilder)
                    .then(sortedContent => writeFileAsync(x, `${sortedContent}`))
                    .then(() => this.ux.log(messages.getMessage('logPrettify', [x])))
                    .then(res)
                    .catch(err => this.ux.log(messages.getMessage('errorProcess', [err.message])))
            )), jobs)
        }
        if (this.flags['permission-sets'] !== undefined) {
            this.flags['permission-sets'].map(x => path.join(x.dir, x.base)).reduce((p, x) => p.then(() => new Promise((res) =>
                readFileAsync(x)
                    .then(parseStringAsync)
                    .then(ppsBuilder)
                    .then(sortedContent => writeFileAsync(x, `${sortedContent}`))
                    .then(() => this.ux.log(messages.getMessage('logPrettify', [x])))
                    .then(res)
                    .catch(err => this.ux.log(messages.getMessage('errorProcess', [err.message])))
            )), jobs)
        }
        if (this.flags.labels !== undefined) {
            jobs.then(() => new Promise((res) =>
                readFileAsync(this.flags.labels)
                    .then(parseStringAsync)
                    .then(customLabelBuilder)
                    .then(sortedContent => writeFileAsync(this.flags.labels, `${sortedContent}`))
                    .then(() => this.ux.log(messages.getMessage('logPrettify', [this.flags.labels])))
                    .then(res)
                    .catch(err => this.ux.log(messages.getMessage('errorProcess', [err.message])))
            ))
        }

        jobs.then(() => this.ux.log(messages.getMessage('successProcess')))
            .catch(ex => this.ux.log(messages.getMessage('failureProcess', [ex])))
        return jobs;
    }
}

const readFileAsync = file => new Promise((resolve, reject) =>
    fs.readFile(file, 'utf8', (_err, data) => {
        if (!!_err) return reject(_err)
        return resolve(data.replace("\ufeff", ""))
    })
)
