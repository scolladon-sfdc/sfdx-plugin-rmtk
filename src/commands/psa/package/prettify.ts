import { SfdxCommand } from '@salesforce/command';
import { Messages } from '@salesforce/core';
import { AnyJson } from "@salesforce/ts-types";

Messages.importMessagesDirectory(__dirname);

const messages = Messages.loadMessages('sfdx-plugin-psa', 'prettify');

export default class Prettify extends SfdxCommand {

    public static description = messages.getMessage('command');


    public async run(): Promise<AnyJson> {

        return null;
    }
}
