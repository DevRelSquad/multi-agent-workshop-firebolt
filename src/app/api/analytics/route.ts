import { NextRequest, NextResponse } from 'next/server';
import { AnalyticsAgent } from '@/lib/agents/analytics';

export async function POST(request: NextRequest) {
  try {
    // TODO: Exercise 2 - Implement Analytics API POST endpoint
    //
    // INSTRUCTIONS:
    // 1. Extract queryType and naturalLanguageQuery from request.json()
    // 2. Create a new AnalyticsAgent instance
    // 3. If naturalLanguageQuery is provided:
    //    - Call analytics.executeNaturalLanguageQuery(naturalLanguageQuery)
    //    - Return JSON with: success, type: 'natural_language', query, sql, result, error
    // 4. If queryType is provided:
    //    - Validate it's one of: revenue, top_products, user_behavior, category_performance, brand_analysis
    //    - Call analytics.executeQuery(queryType)
    //    - Return JSON with: success: true, type: 'predefined', queryType, result
    // 5. If neither is provided, return 400 error
    // 6. Wrap in try-catch, return 500 error on exceptions
    //
    // HINT: See Step 4 Exercise 2 in the tutorial for full implementation
    
    throw new Error('TODO: Implement POST endpoint');
  } catch (error: any) {
    console.error('Analytics API error:', error);
    return NextResponse.json(
      { 
        success: false,
        error: error?.message ?? 'Unknown error',
        details: process.env.NODE_ENV === 'development' ? error?.stack : undefined
      }, 
      { status: 500 }
    );
  }
}

// Add GET endpoint for available query types
export async function GET() {
  return NextResponse.json({
    availableQueryTypes: [
      { 
        type: 'revenue', 
        description: 'Total revenue, purchases, and customer metrics for the last 30 days' 
      },
      { 
        type: 'top_products', 
        description: 'Top 10 products by purchase count in the last 30 days' 
      },
      { 
        type: 'user_behavior', 
        description: 'User behavior analysis (views, carts, purchases) for the last 7 days' 
      },
      { 
        type: 'category_performance', 
        description: 'Category performance metrics for the last 30 days' 
      },
      { 
        type: 'brand_analysis', 
        description: 'Brand performance analysis for the last 30 days' 
      }
    ]
  });
}


