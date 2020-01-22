import { flags, SfdxCommand } from '@salesforce/command';
import { Messages, SfdxProject } from '@salesforce/core';
import { AnyJson, JsonArray, JsonMap } from "@salesforce/ts-types";
import * as fs from 'fs';
import * as fse from 'fs-extra';
import * as glob from 'glob';
import * as path from 'path';

Messages.importMessagesDirectory(__dirname);

const messages = Messages.loadMessages('sfdx-plugin-psa', 'cleanup');
const templateFolder = path.resolve(__dirname, '../../../../template/branch/cleanup/');
const templateFiles = ['destructiveChanges.xml', 'package.xml'];
const VERSION_TAG = '{{version}}';

export default class Cleanup extends SfdxCommand {

    protected static requiresProject = true;

    public static description = messages.getMessage('command');

    protected static flagsConfig = {
        apiversion: flags.number({ char: 'v', description: messages.getMessage('apiVersionFlag'), min: 1, default: 48 }),
        manifestfolder: flags.directory({ char: 'm', description: messages.getMessage('manifestFolderFlag'), required: true })
    };

    public async run(): Promise<AnyJson> {

        const project = await SfdxProject.resolve();
        const projectJson = await project.resolveProjectConfig();
        const basePath = project.getPath();
        const packageDirectories = projectJson['packageDirectories'] as JsonArray || [];
        for (let el of packageDirectories) {
            el = el as JsonMap;
            if (el.default == true) {
                findInDir(`${el.path}`, /\.profile/)
                    .forEach(fs.unlinkSync);
                this.ux.log(messages.getMessage('successClean', ['profiles']));
            } else {
                const dirPath = path.resolve(basePath, `${el.path}`);
                fse.removeSync(dirPath);
                fse.ensureDirSync(dirPath);
                fs.writeFileSync(path.join(dirPath, '.gitkeep'), '');
                this.ux.log(messages.getMessage('successClean', [`${el.path}`]));
            }
        }

        templateFiles.forEach(templateFile => {
            const xml = fs.readFileSync(path.resolve(templateFolder, templateFile)).toString().replace(VERSION_TAG, this.flags.apiversion.toFixed(1));
            fs.writeFileSync(path.resolve(this.flags.manifestfolder, templateFile), xml);
            this.ux.log(messages.getMessage('successClean', [templateFile]));
        });

        return null;
    }
}

const findInDir = (dir, filter, fileList = []) => {
    const files = fs.readdirSync(dir);

    files.forEach((file) => {
        const filePath = path.join(dir, file);
        const fileStat = fs.lstatSync(filePath);

        if (fileStat.isDirectory()) {
            findInDir(filePath, filter, fileList);
        } else if (filter.test(filePath)) {
            fileList.push(filePath);
        }
    });

    return fileList;
}