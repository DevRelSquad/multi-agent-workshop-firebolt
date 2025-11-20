import { FireboltMCPClient, QueryResult } from '@/lib/services/firebolt-mcp';
import { GeminiService } from '@/lib/services/gemini';

// Build pre-defined analytics queries for a given table name.
function buildQueries(tableName: string): Record<string, string> {
  return {
    revenue: `
      SELECT 
        SUM(price) as total_revenue,
        COUNT(*) as total_purchases,
        COUNT(DISTINCT user_id) as unique_customers,
        ROUND(SUM(price) / NULLIF(COUNT(DISTINCT user_id), 0), 2) as avg_revenue_per_customer
      FROM ${tableName}
      WHERE event_type = 'purchase' 
      AND event_time > CURRENT_DATE - INTERVAL '30 days'
    `,
    top_products: `
      SELECT 
        product_id,
        brand,
        category_code,
        COUNT(*) as purchase_count,
        SUM(price) as total_revenue,
        ROUND(AVG(price), 2) as avg_price
      FROM ${tableName}
      WHERE event_type = 'purchase'
      AND event_time > CURRENT_DATE - INTERVAL '30 days'
      GROUP BY product_id, brand, category_code
      ORDER BY purchase_count DESC 
      LIMIT 10
    `,
    user_behavior: `
      SELECT 
        event_type,
        COUNT(*) as event_count,
        COUNT(DISTINCT user_id) as unique_users,
        COUNT(DISTINCT user_session) as unique_sessions
      FROM ${tableName}
      WHERE event_time > CURRENT_DATE - INTERVAL '7 days'
      GROUP BY event_type
      ORDER BY event_count DESC
    `,
    category_performance: `
      SELECT 
        category_code,
        COUNT(*) as purchases,
        SUM(price) as revenue,
        ROUND(AVG(price), 2) as avg_price,
        COUNT(DISTINCT user_id) as unique_customers
      FROM ${tableName}
      WHERE event_type = 'purchase'
      AND category_code IS NOT NULL
      AND event_time > CURRENT_DATE - INTERVAL '30 days'
      GROUP BY category_code
      ORDER BY revenue DESC
      LIMIT 10
    `,
    brand_analysis: `
      SELECT 
        brand,
        COUNT(*) as purchases,
        SUM(price) as revenue,
        ROUND(AVG(price), 2) as avg_price,
        COUNT(DISTINCT user_id) as customers
      FROM ${tableName}
      WHERE event_type = 'purchase'
      AND brand IS NOT NULL
      AND event_time > CURRENT_DATE - INTERVAL '30 days'
      GROUP BY brand
      ORDER BY revenue DESC
      LIMIT 10
    `,
  };
}

export class AnalyticsAgent {
  private mcpClient: FireboltMCPClient;
  private gemini: GeminiService;
  private tableName: string;
  
  /**
   * Initializes the Analytics Agent with Firebolt connection
   * 
   * TABLE SCHEMA (FACT TABLE):
   * - event_time     TIMESTAMPTZ NOT NULL  (PRIMARY INDEX)
   * - event_type     TEXT NOT NULL         (view, cart, purchase)
   * - product_id     BIGINT NOT NULL
   * - category_id    TEXT NULL
   * - category_code  TEXT NULL
   * - brand          TEXT NULL
   * - price          NUMERIC(38,9) NULL    (NULL for view events)
   * - user_id        TEXT NULL
   * - user_session   TEXT NULL
   * 
   * FACT TABLE Benefits:
   * ✅ Automatic sparse indexing on all columns
   * ✅ Fast partition pruning for time-based queries
   * ✅ Optimized for analytical aggregations
   */
  constructor() {
    const clientId = process.env.FIREBOLT_CLIENT_ID || '';
    const clientSecret = process.env.FIREBOLT_CLIENT_SECRET || '';
    const account = process.env.FIREBOLT_ACCOUNT || '';
    const database = process.env.FIREBOLT_DATABASE || 'ecommercedb';
    const engine = process.env.FIREBOLT_ENGINE;
    
    this.mcpClient = new FireboltMCPClient({
      clientId,
      clientSecret,
      account,
      database,
      engine,
    });
    
    // Initialize Gemini for natural language queries
    const geminiApiKey = process.env.GEMINI_API_KEY || '';
    this.gemini = new GeminiService(geminiApiKey);
    
    // Use the schema.table format for Firebolt queries
    // Default schema is 'public' if not specified
    const schema = process.env.FIREBOLT_SCHEMA || 'public';
    this.tableName = `${schema}.ecommerce`;
  }

  /**
   * TODO: Exercise 1 - Implement executeQuery method
   * 
   * TASK: Execute pre-defined queries against the Firebolt FACT TABLE
   * 
   * SCHEMA NOTES:
   * - FACT TABLE provides automatic sparse indexing on all columns
   * - NOT NULL: event_time, event_type, product_id
   * - NULLABLE: category_id, category_code, brand, price, user_id, user_session
   * - Always filter NULL fields (brand IS NOT NULL) to avoid empty results
   * - Use NULLIF in aggregations to prevent divide-by-zero errors
   * 
   * INSTRUCTIONS:
   * 1. Create a Record<string, string> object called 'queries' with 5 query types
   * 2. Implement the following queries:
   *    - revenue: SUM(price), COUNT(*), COUNT(DISTINCT user_id), avg_revenue_per_customer
   *    - top_products: Group by product_id, brand, category_code; ORDER BY purchase_count DESC LIMIT 10
   *    - user_behavior: Group by event_type, show event_count, unique_users, unique_sessions
   *    - category_performance: Group by category_code, show purchases, revenue, avg_price
   *    - brand_analysis: Group by brand, show purchases, revenue, avg_price, customers
   * 3. Validate queryType exists in queries object, throw error if not found
   * 4. Execute the query using this.mcpClient.execute() and return the result
   * 
   * HINT: See Step 4 of the tutorial for full SQL query examples
   */
  async executeQuery(queryType: string): Promise<QueryResult> {
    const queries = buildQueries(this.tableName);

    

    throw new Error('TODO: Implement executeQuery method');
}

  /**
   * TODO: Exercise 3 - Implement getCustomerGrowth method (OPTIONAL/ADVANCED)
   * 
   * TASK: Track month-over-month customer growth using SQL window functions
   * 
   * INSTRUCTIONS:
   * 1. Use a CTE (WITH clause) to get unique customers per month
   * 2. Use DATE_TRUNC('month', event_time) for monthly grouping
   * 3. Use LAG() window function to get previous month's customer count
   * 4. Calculate growth percentage: ((current - previous) / previous) * 100
   * 5. Handle NULL cases (first month has no previous data)
   * 6. Order by month DESC, limit to 12 months
   * 
   * HINT: See Step 4 Exercise 3 in the tutorial for complete implementation
   */
  async getCustomerGrowth(): Promise<QueryResult> {
    // TODO: Implement customer growth analysis with window functions
    throw new Error('TODO: Implement getCustomerGrowth method');
  }





  async optimizeQuery(query: string): Promise<string> {
    // Optimization plan for ecommerce FACT TABLE
    const optimizationPlan = `
Query Optimization Plan for ${this.tableName} FACT TABLE:
============================================

Current Table Type: FACT TABLE (Already Optimized!)
Schema Definition:
  CREATE FACT TABLE ${this.tableName} (
    event_time     TIMESTAMPTZ NOT NULL,
    event_type     TEXT NOT NULL,
    product_id     BIGINT NOT NULL,
    category_id    TEXT NULL,
    category_code  TEXT NULL,
    brand          TEXT NULL,
    price          NUMERIC(38, 9) NULL,
    user_id        TEXT NULL,
    user_session   TEXT NULL
  )
  PRIMARY INDEX event_time;

FACT TABLE Built-in Optimizations:
✅ Automatic sparse indexes on ALL columns (no manual INDEX creation!)
✅ Optimized columnar compression
✅ Fast partition pruning for time-based queries
✅ Best for append-only analytical workloads

Additional Recommended Optimizations:

1. AGGREGATING INDEXES for Frequent Queries:
   
   a) Daily Revenue Summary:
   CREATE AGGREGATING INDEX daily_revenue_agg ON ${this.tableName} (
     DATE_TRUNC('day', event_time) as date,
     event_type,
     SUM(price) as total_revenue,
     COUNT(*) as event_count,
     COUNT(DISTINCT user_id) as unique_users
   )
   WHERE event_type = 'purchase'
   
   b) Product Performance Summary:
   CREATE AGGREGATING INDEX product_performance_agg ON ${this.tableName} (
     product_id,
     brand,
     category_code,
     COUNT(*) as purchase_count,
     SUM(price) as total_revenue,
     AVG(price) as avg_price
   )
   WHERE event_type = 'purchase' AND brand IS NOT NULL

2. NULL FIELD HANDLING (Critical for Correct Results):
   
   ✅ GOOD: Filter NULL values before aggregation
   SELECT brand, COUNT(*) FROM ${this.tableName}
   WHERE brand IS NOT NULL AND event_type = 'purchase'
   GROUP BY brand
   
   ❌ BAD: NULL values create empty result groups
   SELECT brand, COUNT(*) FROM ${this.tableName}
   WHERE event_type = 'purchase'
   GROUP BY brand  -- Includes NULL rows!

3. CACHING LAYER:
   - Cache revenue queries (refresh every 1 hour)
   - Cache top products (refresh every 30 minutes)
   - Cache user behavior stats (refresh every 15 minutes)

4. REVISED REVENUE QUERY (Using Aggregating Index):
   SELECT 
     SUM(total_revenue) as total_revenue,
     SUM(event_count) as total_purchases,
     SUM(unique_users) as unique_customers
   FROM daily_revenue_agg
   WHERE date > CURRENT_DATE - INTERVAL '30 days'
   AND event_type = 'purchase'

Performance Impact:
- FACT TABLE: 10-20x speedup vs regular table
- Aggregating indexes: Additional 5-10x speedup for dashboards
- Proper NULL handling: Prevents incorrect/empty results
- Lower query costs on Firebolt
- Faster dashboard refresh times
`;
    
    return optimizationPlan;
  }

  /**
   * TODO: Exercise 4 - Implement getConversionFunnel method (OPTIONAL/ADVANCED)
   * 
   * TASK: Conversion funnel analysis - tracks user journey from view → cart → purchase
   * 
   * INSTRUCTIONS:
   * 1. Use CTE to group events by user_id and user_session
   * 2. Use MAX(CASE WHEN event_type = 'view' THEN 1 ELSE 0 END) pattern for each event type
   * 3. Calculate conversion rates at each funnel stage
   * 4. Use NULLIF to prevent divide-by-zero errors
   * 5. Return: total_views, total_cart_adds, total_purchases, and conversion rates
   * 
   * HINT: See Step 4 Exercise 4 in the tutorial for complete implementation
   */
  async getConversionFunnel(): Promise<QueryResult> {
  const query = `
    WITH funnel_data AS (
      SELECT 
        user_id,
        user_session,
        MAX(CASE WHEN event_type = 'view' THEN 1 ELSE 0 END) as viewed,
        MAX(CASE WHEN event_type = 'cart' THEN 1 ELSE 0 END) as added_to_cart,
        MAX(CASE WHEN event_type = 'purchase' THEN 1 ELSE 0 END) as purchased
      FROM ${this.tableName}
      WHERE event_time > CURRENT_DATE - INTERVAL '30 days'
      GROUP BY user_id, user_session
    )
    SELECT 
      SUM(viewed) as total_views,
      SUM(added_to_cart) as total_cart_adds,
      SUM(purchased) as total_purchases,
      ROUND((SUM(added_to_cart)::NUMERIC / NULLIF(SUM(viewed), 0)) * 100, 2) as view_to_cart_rate,
      ROUND((SUM(purchased)::NUMERIC / NULLIF(SUM(added_to_cart), 0)) * 100, 2) as cart_to_purchase_rate,
      ROUND((SUM(purchased)::NUMERIC / NULLIF(SUM(viewed), 0)) * 100, 2) as overall_conversion_rate
    FROM funnel_data
  `;
  
  return await this.mcpClient.execute(query);
}
  /**
   * Time-series revenue analysis
   * Shows revenue trends over time with growth metrics
   */
  async getRevenueTimeSeries(interval: 'day' | 'week' | 'month' = 'day'): Promise<QueryResult> {
    const query = `
      WITH time_series AS (
        SELECT 
          DATE_TRUNC('${interval}', event_time) as period,
          ROUND(SUM(price), 2) as revenue,
          COUNT(*) as transactions,
          COUNT(DISTINCT user_id) as customers
        FROM ${this.tableName}
        WHERE event_type = 'purchase'
        AND price IS NOT NULL
        GROUP BY DATE_TRUNC('${interval}', event_time)
      )
      SELECT 
        period,
        revenue,
        transactions,
        customers,
        ROUND(revenue / NULLIF(transactions, 0), 2) as avg_order_value,
        LAG(revenue) OVER (ORDER BY period) as prev_period_revenue,
        ROUND(
          ((revenue - LAG(revenue) OVER (ORDER BY period))::NUMERIC 
          / NULLIF(LAG(revenue) OVER (ORDER BY period), 0)) * 100, 
          2
        ) as revenue_growth_pct
      FROM time_series
      ORDER BY period DESC
      LIMIT 90
    `;
    
    return await this.mcpClient.execute(query);
  }

  /**
   * 🆕 NATURAL LANGUAGE QUERY
   * 
   * Uses Gemini to convert natural language questions into SQL queries,
   * then executes them against Firebolt via MCP.
   * 
   * This is the key integration point between:
   * - Gemini AI (for natural language understanding)
   * - Firebolt MCP (for high-performance query execution)
   * 
   * @param naturalLanguageQuery - User's question in plain English
   * @returns Query results with the generated SQL
   */
  async executeNaturalLanguageQuery(naturalLanguageQuery: string): Promise<{
    success: boolean;
    sql?: string;
    result?: QueryResult;
    error?: string;
  }> {
    try {
      // Step 1: Use Gemini to convert natural language to SQL
      const prompt = `You are a SQL expert for Firebolt database. Convert the following natural language query into a valid SQL query.

DATABASE SCHEMA:
Table: ${this.tableName}
Columns:
  - event_time     TIMESTAMPTZ NOT NULL  (when the event occurred)
  - event_type     TEXT NOT NULL         (values: 'view', 'cart', 'purchase')
  - product_id     BIGINT NOT NULL       (unique product identifier)
  - category_id    TEXT NULL             (category identifier)
  - category_code  TEXT NULL             (category code/name)
  - brand          TEXT NULL             (product brand name)
  - price          NUMERIC(38,9) NULL    (price - NULL for 'view' events)
  - user_id        TEXT NULL             (unique user identifier)
  - user_session   TEXT NULL             (session identifier)

IMPORTANT RULES:
1. Always filter NULL values when grouping by nullable columns (brand, category_code, etc.)
2. Use COALESCE() to replace NULL values with defaults like 'Unknown' or 'Uncategorized'
3. For revenue queries, filter WHERE event_type = 'purchase' AND price IS NOT NULL
4. Use NULLIF() in division to avoid divide-by-zero errors
5. Use ROUND() for monetary values (2 decimal places)
6. Return only the SQL query, no explanations or markdown
7. Use ${this.tableName} as the table name
8. Limit results to 100 rows maximum

USER QUESTION:
${naturalLanguageQuery}

SQL QUERY (only return the SQL, no markdown or explanations):`;

      const generatedSQL = await this.gemini.generate('gemini-2.0-flash', prompt);
      
      // Clean up the SQL (remove markdown code blocks if present)
      let cleanSQL = generatedSQL.trim();
      if (cleanSQL.startsWith('```sql')) {
        cleanSQL = cleanSQL.replace(/```sql\n?/g, '').replace(/```\n?/g, '').trim();
      } else if (cleanSQL.startsWith('```')) {
        cleanSQL = cleanSQL.replace(/```\n?/g, '').trim();
      }

      // Step 2: Execute the generated SQL via Firebolt MCP
      const result = await this.mcpClient.execute(cleanSQL);

      return {
        success: true,
        sql: cleanSQL,
        result: result,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : String(error),
      };
    }
  }
}


