import { SfdxCommand, flags } from '@salesforce/command';
import { Messages, SfdxProject } from '@salesforce/core';
import { AnyJson, JsonArray } from "@salesforce/ts-types";
import { parseStringAsync } from '../../../utils/xml2jsHelper';
import { packageBuilder } from '../../../utils/xmlFromJson';
import { findInDir } from '../../../utils/findInDir';
import * as xml2js from 'xml2js';
import * as fs from 'fs';
import * as path from 'path';

Messages.importMessagesDirectory(__dirname);

const messages = Messages.loadMessages('sfdx-plugin-rmtk', 'filter');
const childMetadata = {
  alerts : 'WorkflowAlert',
  fieldUpdates : 'WorkflowFieldUpdate',
  labels : 'CustomLabel',
  outboundMessages : 'WorkflowOutboundMessage',
  rules : 'WorkflowRule',
  sharingCriteriaRules : 'SharingCriteriaRule',
  sharingGuestRules : 'SharingGuestRule',
  sharingOwnerRules : 'SharingOwnerRule',
  sharingTerritoryRules : 'SharingTerritoryRule',
  tasks : 'WorkflowTask',
}

export default class Filter extends SfdxCommand {

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
        const inFilePackageContent = pkg['Package']['types'].reduce((r, e) => {
          const type = e.name[0]
          if(!Object.values(childMetadata).includes(type)) return r
          r[type] = r[type] || new Set()
          r[type].add(...e.members);
          r[type].delete('*')
          return r;
        }, {})

        const defaultDir = (projectJson['packageDirectories'] as JsonArray).reduce((a, v) => v['default'] == true ? a = v['path'] : a = a, '');
        findInDir(path.join(basePath, `${defaultDir}`), /(\.labels)|(\.workflow)|(\.sharingRules)/)
          .forEach(async file => {
            const objectName = path.basename(file).split('.')[0]
            const fileContentJSON = await parseStringAsync(fs.readFileSync(file));
            const metadataContent = Object.values(fileContentJSON)[0]
            const authorizedKeys = Object.keys(metadataContent).filter(x => Object.keys(childMetadata).includes(x))
            authorizedKeys.forEach(subType => 
              (metadataContent[subType] = metadataContent[subType].filter(
                elem => inFilePackageContent[childMetadata[subType]] && inFilePackageContent[childMetadata[subType]].has((subType === 'labels' ? '' : objectName + '.') + elem.fullName[0])
              )))

            const builder = new xml2js.Builder()
            fs.writeFileSync(file,builder.buildObject(fileContentJSON));
          });
        fs.writeFileSync(this.flags.package, `${packageBuilder(pkg)}`);
        this.ux.log(messages.getMessage('successProcess', [this.flags.package, this.flags.package]))

        return null;
    }
}