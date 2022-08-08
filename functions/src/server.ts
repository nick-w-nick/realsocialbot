import * as crypto from 'crypto';
import * as tsscmp from 'tsscmp';

function legitSlackRequest(req) {
  // Your signing secret
  const slackSigningSecret = '0ee27f40d217a0bc07f0614d6b4ee159';

  // Grab the signature and timestamp from the headers
  const requestSignature = req.headers['x-slack-signature'] as string;
  const requestTimestamp = req.headers['x-slack-request-timestamp'];

  // Create the HMAC
  const hmac = crypto.createHmac('sha256', slackSigningSecret);

  // Update it with the Slack Request
  const [version, hash] = requestSignature.split('=');
  const base = `${version}:${requestTimestamp}:${JSON.stringify(req.body)}`;
  hmac.update(base);

  // Returns true if it matches
  return tsscmp(hash, hmac.digest('hex'));
}
