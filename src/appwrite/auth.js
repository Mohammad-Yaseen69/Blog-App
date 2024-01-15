import { Client, Account, ID } from "appwrite";
import config from '../config/config'


export class AuthenticateService {
    Client = new Client();
    Account;

    constructor() {
        this.Client
            .setEndpoint(config.AppWrite_Url).
            setProject(config.AppWrite_Project_Id);
        this.Account = new Account(this.Client);
    }

    async createAccount({ email, password, name }) {
        try {
            const account = await this.Account.create(ID.unique(), email, password, name);

            if (account) {
                return this.login({ email , password });
            }
            else {
                return account
            }
        }
        catch (error) {
            throw error
        }
    }
 
    async login({ email, password }) {
        try {
            const account = await this.Account.createEmailSession(email, password);
            return account
        }
        catch (error) {
            throw error
        }
    }

    async getUser() {
        try {
            const account = await this.Account.get();
            return account
        }
        catch (error) {
            throw error
        }
    }


    async logout() {
        try {
            const account = await this.Account.deleteSessions();
            return account
        }
        catch (error) {
            throw error
        }
    }
};

const auth = new AuthenticateService();

export default auth