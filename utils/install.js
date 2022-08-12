import firestore from './firestore.js';
import { Timestamp } from 'firebase-admin/firestore';

const create = async (installation) => {
    return await firestore.collection('installations').doc(installation.team.id).set({ installation, active: true, updatedDate: Timestamp.now() });
};

const fetch = async (teamId) => {
    const installation = await firestore.collection('installations').doc(teamId).get();
    return installation.data().installation;
};

const deactivate = async (teamId) => {
    return await firestore.collection('installations').doc(teamId).update({ active: false, updatedDate: Timestamp.now() });
};

export default {
    create,
    fetch,
    deactivate
};