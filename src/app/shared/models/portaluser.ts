import { Contact } from './contact';
import { Account } from './account';
import { Serializable } from 'selenium-webdriver';

export class PortalUser implements Serializable<PortalUser> {
    contact: Contact;
    accounts: Array<Account>;
    selectedAccount: Account;

    set SelectedAccount(selectedAccount: Account) {
        this.selectedAccount = selectedAccount;
    }

    get Contact(): Contact {
        return this.contact;
    }

    set Contact(changedContact: Contact) {
        this.contact = changedContact;
    }

    constructor(loggedincontact?: Contact, linkedaccounts?: Array<Account>) {
        this.contact = loggedincontact;
        this.accounts = linkedaccounts;
        if (this.accounts !== undefined && this.accounts.length > 0) {
            this.selectedAccount = this.accounts[0];
        } else {
            this.selectedAccount = new Account();
        }
    }

    serialize() {
        return this;
    }

    deserialize(input) {
        this.contact = new Contact().deserialize(input.contact);
        this.accounts = input.accounts.map((a) => {
            return (new Account()).deserialize(a)
        });
        if (input.accounts.length > 0) {
            this.selectedAccount = (new Account()).deserialize(input.accounts[0]);
        }
        return this;
    }
}
