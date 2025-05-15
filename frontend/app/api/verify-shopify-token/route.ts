import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { domain, token } = await request.json()

    // Basic validation
    if (!domain || !token) {
      return NextResponse.json(
        { success: false, error: "Missing domain or token" },
        { status: 400 }
      )
    }

    // Call Shopify API to test the token
    const response = await fetch(`https://${domain}/admin/api/2025-01/shop.json`, {
      headers: {
        "X-Shopify-Access-Token": token,
        "Content-Type": "application/json"
      }
    })

    if (!response.ok) {
      const error = await response.text()
      return NextResponse.json(
        { success: false, error: error || "Failed to connect to Shopify API" },
        { status: 500 }
      )
    }

    const data = await response.json()
    const shop = data.shop

    return NextResponse.json({
      success: true,
      shop: {
        name: shop.name,
        domain: shop.domain,
        mydomain: shop.mydomain,
        email: shop.email,
        plan: shop.plan_display_name,
        createdAt: shop.created_at,
      },
    })
  } catch (error) {
    console.error("Error verifying Shopify store:", error)
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    )
  }
}
