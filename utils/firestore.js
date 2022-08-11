import { getFirestore } from 'firebase-admin/firestore';

import init from './init.js';

await init();
const firestore = getFirestore();

export default firestore;