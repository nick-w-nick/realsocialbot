import 'dotenv/config';

import Axios from 'axios';
import { initializeApp, cert } from 'firebase-admin/app';

const getFirebaseCredentials = async () => {
    try {
        const response = await Axios.get(process.env.FIREBASE_CREDENTIALS_URL);
        return response.data;
    } catch (error) {
        return console.log('Error getting firebase credentials', error);
    }
};

const initFirebase = async () => {
    const credentials = await getFirebaseCredentials();
    
    initializeApp({
        credential: cert(credentials),
        projectId: process.env.FIREBASE_PROJECT_ID
    });
};

export default initFirebase;