import { GoogleGenerativeAI } from '@google/generative-ai';
import { createRateLimiter, withRetry } from '@/lib/utils/error-handler';
import { logger } from '@/lib/utils/logger';

const limiter = createRateLimiter(15); // 15 RPM freemium

export type GeminiModel = 'gemini-1.5-flash' | 'gemini-1.5-pro';

export class GeminiService {
  private client: GoogleGenerativeAI;

  constructor(private apiKey: string) {
    this.client = new GoogleGenerativeAI(apiKey);
  }

  async generate(model: GeminiModel, prompt: string): Promise<string> {
    await limiter.removeToken();
    return withRetry(async () => {
      const gen = this.client.getGenerativeModel({ model });
      const res = await gen.generateContent(prompt);
      const text = res.response.text();
      return text;
    }, {
      onRetry: (attempt, error) => {
        logger.warn(`Gemini retry #${attempt}: ${String(error)}`);
      },
    });
  }

  /**
   * Shows an upgrade prompt message in UI contexts when we detect possible rate limiting.
   */
  static getUpgradeNote(): string {
    return 'You may be hitting freemium rate limits (15 RPM). Consider upgrading your key in Google AI Studio.';
  }
}


