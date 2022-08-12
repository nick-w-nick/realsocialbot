process.env.NODE_ENV !== 'production' && import('dotenv/config');

import slack from '@slack/bolt';
const { App, LogLevel } = slack;

import logger from './utils/logger.js';
import install from './utils/install.js';

const { SIGNING_SECRET, CLIENT_ID, CLIENT_SECRET, STATE_SECRET, BOT_SCOPES } = process.env;

const app = new App({
    logLevel: LogLevel.INFO,
    signingSecret: SIGNING_SECRET,
    clientId: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    stateSecret: STATE_SECRET,
    scopes: BOT_SCOPES.split(','),
    installerOptions: { directInstall: false },
    installationStore: {
        storeInstallation: async (installation) => {
            logger('Storing installation', { data: { installation } }, 'INFO');
            try {
                await install.create(installation);
            } catch (error) {
                logger('Error storing installation', { data: { installation }, exception: error }, 'ERROR');
            }
        },
        fetchInstallation: async ({ teamId }) => {
            logger('Fetching installation', { data: { teamId } }, 'INFO');
            try {
                return await install.fetch(teamId);
            } catch (error) {
                logger('Error fetching installation', { data: { teamId }, exception: error }, 'ERROR');
            }
        },
        deleteInstallation: async ({ teamId }) => {
            logger('Deactivating installation', { data: { teamId } }, 'INFO');
            try {
                await install.deactivate(teamId);
            } catch (error) {
                logger('Error deleting installation', { data: { teamId }, exception: error }, 'ERROR');
            }
        }
    }
});

(async () => {
    await app.start(process.env.PORT || 3000);
    console.log('⚡️ Bolt app is running!');
})();