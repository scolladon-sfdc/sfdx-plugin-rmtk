import { SfdxCommand } from '@salesforce/command';
import { Messages } from '@salesforce/core';
import { AnyJson } from "@salesforce/ts-types";

Messages.importMessagesDirectory(__dirname);

const messages = Messages.loadMessages('sfdx-plugin-psa', 'validate');

export default class Validate extends SfdxCommand {

    protected static requiresProject = true;

    public static description = messages.getMessage('command');

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
    check_incorrect_source_files(source_md_describe_h, input_folder)
    */

    public async run(): Promise<AnyJson> {

        return null;
    }
}
