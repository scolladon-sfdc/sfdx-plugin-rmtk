import { flags, SfdxCommand } from '@salesforce/command';
import {
    Messages, SfdxError, SfdxProject
} from '@salesforce/core';
import { AnyJson, JsonArray } from "@salesforce/ts-types";
import * as fs from 'fs';
import * as path from 'path';
import * as xml2js from 'xml2js';

Messages.importMessagesDirectory(__dirname);

const messages = Messages.loadMessages('sfdx-plugin-rmtk', 'validate');

export default class Validate extends SfdxCommand {
    /*
        def validate_metadata(package_xml, input_folder, input_format)
        # get the metadata infos
        source_md_describe_h = parse_json_file_to_hash("../metadata-describe.json")
        #source_md_infolder = source_md_describe_h.map{|k,v| k if v && v['in_folder']}.compact
        
        # parse package.xml to get the list of metadata to deploy
        manifest = Manifest.new(package_xml)
        changes_to_deploy = manifest.to_package
        
        # 0- CHECK SOURCE FOLDER/FILES INTEGRETY
        check_source_mdt_folders(source_md_describe_h, input_folder)
        check_missing_source_files(changes_to_deploy, source_md_describe_h, input_folder, input_format)
        */

    protected static requiresProject = true;


    public static description = messages.getMessage('command');

    protected static flagsConfig = {
        package: flags.filepath({
            char: 'p',
            description: messages.getMessage('packageFlagDescription'),
            required: true
        }),
        'metadata-describe': flags.filepath({
            char: 'm',
            description: messages.getMessage('metadataDescribeFlagDescription'),
            required: true
        })
    };

    public async run(): Promise<AnyJson> {

        const m = JSON.parse(fs.readFileSync(this.flags['metadata-describe']).toString());
        const allowedMetadata = Object.keys(m).reduce((a, e) => {
            a.add(e);
            if (m[e].hasOwnProperty('child_xml_names')) {
                Array.isArray(m[e].child_xml_names)
                    ? m[e].child_xml_names.forEach(a.add, a)
                    : a.add(m[e].child_xml_names)
            }
            return a;
        }, new Set());
        const tmp = await parseStringAsync(fs.readFileSync(this.flags.package));
        const pkg = {}
        tmp['Package']['types'].reduce((_r, e) => pkg[e.name[0]] = [...new Set((pkg[e.name[0]] || []).concat(e.members))], pkg)
        // get list of file names removed from meta-xml in set
        const files = new Set();
        const project = await SfdxProject.resolve();
        const projectJson = await project.resolveProjectConfig();
        const packageDirectories = projectJson['packageDirectories'] as JsonArray || [];
        packageDirectories.filter(el => el['default']).map(el => getAllFiles(el['path'], files));

        let success = true;
        for (let type in pkg) {
            // Check if it is an allowed type
            if (!allowedMetadata.has(type)) {
                this.ux.log(messages.getMessage('metadataNotAllowed', [type, this.flags['metadata-describe']]));
                success = false;
                continue;
            }
            // Check existence of the file in the source from the package.xml
            for (let member of pkg[type]) {
                const memberName = member + (m.hasOwnProperty(type) && m[type].hasOwnProperty('suffix') ? `.${m[type].suffix}-meta.xml` : '');
                if (m.hasOwnProperty(type) && [...files].every(el => `${el}` !== memberName)) {
                    this.ux.log(messages.getMessage('metadataNotPresent', [memberName, this.flags.package]));
                    success = false;
                }
            }
        }
        if (!success) {
            throw new SfdxError(messages.getMessage('failureProcess'));
        }
        this.ux.log(messages.getMessage('successProcess'))
        return null;
    }
}


const parseStringAsync = (content) => {
    return new Promise((resolve) => {
        const parser = new xml2js.Parser();
        parser.parseString(content, (_err, result) => {
            resolve(result)
        })
    })
}

const getAllFiles = (dir, files) => {
    fs.readdirSync(dir).forEach(function (file) {
        if (fs.statSync(path.join(dir, file)).isDirectory()) {
            getAllFiles(path.join(dir, file), files)
        } else {
            files.add(`${dir}/${file.replace(/-meta.xml$/, '')}`)
        }
    })
}