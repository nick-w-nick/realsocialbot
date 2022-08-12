import { getFirestore } from 'firebase-admin/firestore';

import init from './init.js';

await init();

const firestore = getFirestore();
firestore.settings({ ignoreUndefinedProperties: true });

export default firestore;