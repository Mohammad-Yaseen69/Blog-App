const config = {
    AppWrite_Url: String(import.meta.env.VITE_APPWRITE_URL),
    AppWrite_Project_Id: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    AppWrite_Database_Id: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    AppWrite_Collection_Id: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    AppWrite_Bucket_Id: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
}

export default config 