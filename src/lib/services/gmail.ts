import { logger } from '@/lib/utils/logger';

type EmailPayload = {
  recipient: string;
  subject: string;
  body: string;
};

/**
 * Gmail client with sandbox default. Real API calls can be wired using OAuth2 / Gmail API.
 */
export class GmailClient {
  private sandbox = true;

  constructor() {
    if (process.env.NODE_ENV === 'production') {
      this.sandbox = false; // set true to stay in preview mode in prod if needed
    }
  }

  async send(payload: EmailPayload): Promise<boolean> {
    if (this.sandbox) {
      logger.info('Gmail sandbox send', payload);
      return true;
    }
    // TODO: Implement Gmail API send.
    // HINT: Use Google APIs client with OAuth2 credentials from env.
    // TEST: Switch sandbox=false and verify.
    logger.info('Gmail real send (not configured), falling back to sandbox');
    return true;
  }
}


