import config from "../config/config";
import { Client, Databases, Query, Storage, ID } from "appwrite";


export class Service {
    Client = new Client();
    Database;
    Storage;
    constructor() {
        this.Client
            .setEndpoint(config.AppWrite_Url)
            .setProject(config.AppWrite_Project_Id)

        this.Database = new Databases(this.Client);
        this.Storage = new Storage(this.Client);
    }

    async createPost({ Title, Content, slug, Img, Status, UserId , UserName}) {
        try {
            return await this.Database.createDocument(
                config.AppWrite_Database_Id,
                config.AppWrite_Collection_Id,
                ID.unique(),
                {
                    Title,
                    Content,
                    Img,
                    Status,
                    UserId,
                    UserName
                }
            )
        } catch (error) {
            return console.log(error);
        }
    }

    async updatePost(ID, { Title, Content, Img, Status, UserId }) {
        try {
            const response = await this.Database.updateDocument(
                config.AppWrite_Database_Id,
                config.AppWrite_Collection_Id,
                ID,
                {
                    Title,
                    Content,
                    Img,
                    Status,
                }
            )
            return response
        } catch (error) {
            return console.log(error);
        }

    }

    async deletePost(slug) {
        try {
            const response = await this.Database.deleteDocument(
                config.AppWrite_Database_Id,
                config.AppWrite_Collection_Id,
                slug,
            )

            return response
        } catch (error) {
            return console.log(error);
        }
    }

    async getPost(slug) {
        try {
            const response = await this.Database.getDocument(
                config.AppWrite_Database_Id,
                config.AppWrite_Collection_Id,
                slug
            )
            return response
        } catch (error) {
            return console.log(error);
        }
    }

    async getAllPost() {
        try {
            const response = await this.Database.listDocuments(
                config.AppWrite_Database_Id,
                config.AppWrite_Collection_Id,
                [
                    Query.equal('Status', 'active')
                ]
            )

            return response
        } catch (error) {
            return console.log(error);
        }
    }

    // Storage Services 

    async uploadFile(file) {
        try {
            const response = await this.Storage.createFile(
                config.AppWrite_Bucket_Id,
                ID.unique(),
                file
            )
            return response
        } catch (error) {
            return console.log(error);
        }
    }

    async deleteFile(fileId) {
        try {
            await this.Storage.deleteFile(
                config.AppWrite_Bucket_Id,
                fileId
            )
            return true
        } catch (error) {
            return console.log(error);
        }
    }

    getFilePreview(fileId) {
        return this.Storage.getFilePreview(
            config.AppWrite_Bucket_Id,
            fileId,
        )
    }
}

const service = new Service();

export default service;