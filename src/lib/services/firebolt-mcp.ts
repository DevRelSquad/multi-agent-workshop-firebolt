import { logger } from '@/lib/utils/logger';

export type QueryResult = {
  columns: string[];
  rows: Array<Record<string, any>>;
};

type FireboltConfig = {
  clientId: string;
  clientSecret: string;
  account: string;
  database?: string;
};

/**
 * Minimal MCP-like client. In workshop/Stackblitz we operate in sandbox mode with mock data.
 * Replace execute() with real MCP server calls if available.
 */
export class FireboltMCPClient {
  private mock: boolean;
  constructor(private config: FireboltConfig) {
    this.mock = process.env.NODE_ENV !== 'production';
  }

  async execute(sql: string): Promise<QueryResult> {
    logger.info('FireboltMCP execute', { sql });
    if (this.mock) {
      return this.mockExecute(sql);
    }
    // TODO: Implement real MCP transport if available in your environment.
    // HINT: Use an MCP transport like stdio/websocket to a Firebolt MCP server.
    // TEST: Swap mock=false to verify prod plumbing.
    return this.mockExecute(sql);
  }

  private async mockExecute(sql: string): Promise<QueryResult> {
    const lower = sql.toLowerCase();
    if (lower.includes('sum(amount)') && lower.includes('from sales')) {
      return { columns: ['total_revenue'], rows: [{ total_revenue: 1234567.89 }] };
    }
    if (lower.includes('from orders') && lower.includes('group by product_name')) {
      return {
        columns: ['product_name', 'count'],
        rows: [
          { product_name: 'UltraWidget', count: 542 },
          { product_name: 'MegaGadget', count: 410 },
          { product_name: 'ProDevice', count: 377 },
        ],
      };
    }
    if (lower.includes('from customers') && lower.includes("date_trunc('month'")) {
      return {
        columns: ['month', 'new_customers', 'growth_pct'],
        rows: [
          { month: '2024-01-01', new_customers: 100, growth_pct: null },
          { month: '2024-02-01', new_customers: 120, growth_pct: 20.0 },
          { month: '2024-03-01', new_customers: 126, growth_pct: 5.0 },
        ],
      };
    }
    return { columns: ['message'], rows: [{ message: 'No mock available for query.' }] };
  }
}


