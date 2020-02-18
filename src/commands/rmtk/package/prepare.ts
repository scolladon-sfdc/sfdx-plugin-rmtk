import { SfdxCommand, flags } from '@salesforce/command';
import { Messages, SfdxProject } from '@salesforce/core';
import { AnyJson, JsonArray } from "@salesforce/ts-types";
import { parseStringAsync } from '../../../utils/xml2jsHelper';
import { packageBuilder, customLabelBuilder } from '../../../utils/xmlFromJson';
import { findInDir } from '../../../utils/findInDir';
import * as fs from 'fs';
import * as path from 'path';

Messages.importMessagesDirectory(__dirname);

const messages = Messages.loadMessages('sfdx-plugin-rmtk', 'prepare');

export default class prepare extends SfdxCommand {

    protected static requiresProject = true;

    public static description = messages.getMessage('command');

    protected static flagsConfig = {
        package: flags.filepath({
            char: 'p',
            description: messages.getMessage('packageFlagDescription'),
            required: true
        })
    };

    public async run(): Promise<AnyJson> {
        const project = await SfdxProject.resolve();
        const projectJson = await project.resolveProjectConfig();
        const basePath = project.getPath();

        // get package.xml
        const pkg = await parseStringAsync(fs.readFileSync(this.flags.package));
        const customLabels = new Set(pkg['Package']['types'].reduce((r, e) => {
            if (e.name[0] == 'CustomLabel') {
                r.push(...e.members);
                e.name[0] = 'CustomLabels';
                e.members = ['*'];
            }
            return r;
        }, []))
        customLabels.delete('*');

        const defaultDir = (projectJson['packageDirectories'] as JsonArray).reduce((a, v) => v['default'] == true ? a = v['path'] : a = a, '');
        findInDir(path.join(basePath, `${defaultDir}`), /\.labels/)
            .forEach(async labelFile => {
                const cl = await parseStringAsync(fs.readFileSync(labelFile));
                cl['CustomLabels']['labels'] = cl['CustomLabels']['labels'].filter(label => customLabels.has(label['fullName'][0]));
                fs.writeFileSync(labelFile, customLabelBuilder(cl));
            });
        fs.writeFileSync(this.flags.package, `${packageBuilder(pkg)}`);
        this.ux.log(messages.getMessage('successProcess', [this.flags.package, this.flags.package]))

        return null;
    }
}
