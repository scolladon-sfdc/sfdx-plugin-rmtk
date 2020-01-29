import { SfdxCommand } from '@salesforce/command';
import { Messages } from '@salesforce/core';
import { AnyJson } from "@salesforce/ts-types";

Messages.importMessagesDirectory(__dirname);

const messages = Messages.loadMessages('sfdx-plugin-psa', 'filter');

export default class Filter extends SfdxCommand {

    protected static requiresProject = true;

    public static description = messages.getMessage('command');


    public async run(): Promise<AnyJson> {

        return null;
    }
}
