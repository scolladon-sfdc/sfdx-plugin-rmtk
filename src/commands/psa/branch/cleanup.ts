import { flags, SfdxCommand } from '@salesforce/command';
import { Messages, SfdxProject } from '@salesforce/core';
import { AnyJson, JsonArray, JsonMap } from "@salesforce/ts-types";
import * as fs from 'fs';
import * as fse from 'fs-extra';
import * as glob from 'glob';
import * as path from 'path';

Messages.importMessagesDirectory(__dirname);

const messages = Messages.loadMessages('sfdx-plugin-psa', 'cleanup');
const templateFolder = path.resolve(__dirname, '../../../../template/vcs/setup/git/');
const templateFiles = ['destructiveChanges.xml', 'package.xml'];
const VERSION_TAG = '{{version}}';

export default class Cleanup extends SfdxCommand {

    protected static requiresProject = true;

    public static description = messages.getMessage('command');

    protected static flagsConfig = {
        apiversion: flags.builtin(),
        manifestfolder: flags.directory({ description: messages.getMessage('manifestFolderFlag'), required: true })

    };

    public async run(): Promise<AnyJson> {
        // get the sfdx-project file
        const project = await SfdxProject.resolve();
        const projectJson = await project.resolveProjectConfig();
        const basePath = project.getPath();
        const packageDirectories = projectJson['packageDirectories'] as JsonArray || [];
        for (let el of packageDirectories) {
            el = el as JsonMap;
            if (el.default == true) {
                glob.sync(`${basePath}/${el.path}/**/profile`)
                    .forEach(fs.unlinkSync);
                this.ux.log(messages.getMessage('successClean', ['Profiles']));
            } else {
                const dirPath = path.resolve(basePath, `${el.path}`);
                fse.removeSync(dirPath);
                fse.ensureDirSync(dirPath);
                this.ux.log(messages.getMessage('successClean', [`${el.name}`]));
            }
        }

        templateFiles.forEach(templateFile => {
            const xml = fs.readFileSync(path.resolve(templateFolder, templateFile)).toString().replace(VERSION_TAG, this.flags.apiversion);
            fs.writeFileSync(path.resolve(this.flags.manifestfolder, templateFile), xml);
            this.ux.log(messages.getMessage('successClean', [templateFile]));
        });

        return null;
    }
}
