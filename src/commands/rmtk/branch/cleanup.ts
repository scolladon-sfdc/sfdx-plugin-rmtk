import { flags, SfdxCommand } from '@salesforce/command';
import { Messages, SfdxProject } from '@salesforce/core';
import { AnyJson, JsonArray, JsonMap } from "@salesforce/ts-types";
import { findInDir } from '../../../utils/findInDir';
import * as fs from 'fs';
import * as fse from 'fs-extra';
import * as path from 'path';

Messages.importMessagesDirectory(__dirname);

const messages = Messages.loadMessages('sfdx-plugin-rmtk', 'cleanup');
const templateFolder = path.resolve(__dirname, '../../../../template/branch/cleanup/');
const packageTemplateFiles = ['destructiveChanges.xml', 'package.xml'];
const customLabelTemplateFile = 'CustomLabels.xml';
const VERSION_TAG = '{{version}}';

export default class Cleanup extends SfdxCommand {

    protected static requiresProject = true;

    public static description = messages.getMessage('command');

    protected static flagsConfig = {
        version: flags.number({ char: 'v', description: messages.getMessage('versionFlag'), min: 1, default: 48 }),
        manifestfolder: flags.directory({ char: 'm', description: messages.getMessage('manifestFolderFlag'), required: true })
    };

    public async run(): Promise<AnyJson> {

        const project = await SfdxProject.resolve();
        const projectJson = await project.resolveProjectConfig();
        const basePath = project.getPath();
        const packageDirectories = projectJson['packageDirectories'] as JsonArray || [];
        let customLabelTemplate = null;
        for (let el of packageDirectories) {
            el = el as JsonMap;
            if (el.default == true) {
                findInDir(`${el.path}`, /\.profile/)
                    .forEach(fs.unlinkSync);
                this.ux.log(messages.getMessage('successClean', ['profiles']));
                findInDir(`${el.path}`, /\.permissionset/)
                    .forEach(fs.unlinkSync);
                this.ux.log(messages.getMessage('successClean', ['permission sets']));

                findInDir(`${el.path}`, /\.labels/)
                    .forEach(label => {
                        if (customLabelTemplate === null) {
                            customLabelTemplate = fs.readFileSync(path.resolve(templateFolder, customLabelTemplateFile))
                        }
                        fs.writeFileSync(label, customLabelTemplate);
                    });
                this.ux.log(messages.getMessage('successClean', ['custom labels']));
            } else {
                const dirPath = path.resolve(basePath, `${el.path}`);
                fse.removeSync(dirPath);
                fse.ensureDirSync(dirPath);
                fs.writeFileSync(path.join(dirPath, '.gitkeep'), '');
                this.ux.log(messages.getMessage('successClean', [`${el.path}`]));
            }
        }

        packageTemplateFiles.forEach(templateFile => {
            const xml = fs.readFileSync(path.resolve(templateFolder, templateFile)).toString().replace(VERSION_TAG, this.flags.version.toFixed(1));
            fs.writeFileSync(path.resolve(this.flags.manifestfolder, templateFile), xml);
            this.ux.log(messages.getMessage('successClean', [templateFile]));
        });

        return null;
    }
}