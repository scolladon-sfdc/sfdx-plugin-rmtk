import { SfdxCommand } from '@salesforce/command';
import { Messages } from '@salesforce/core';
import { AnyJson } from "@salesforce/ts-types";

Messages.importMessagesDirectory(__dirname);

const messages = Messages.loadMessages('sfdx-plugin-psa', 'lint');

// Lint the package.xml in order to reorder it and cleanup the output
export default class Lint extends SfdxCommand {

    protected static requiresProject = true;

    public static description = messages.getMessage('command');


    public async run(): Promise<AnyJson> {

        return null;
    }
}
