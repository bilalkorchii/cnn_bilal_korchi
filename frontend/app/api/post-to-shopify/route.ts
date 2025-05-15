import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { productTitle, productDescription, predictedCategory, productPrice, token, domain, productImage } = body

    if (!productTitle || !productDescription || !predictedCategory || !productPrice || !token || !domain || !productImage) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const base64Image = productImage.replace(/^data:image\/\w+;base64,/, "")

    const productData = {
      product: {
        title: productTitle,
        body_html: productDescription,
        vendor:predictedCategory ,
        product_type : predictedCategory,
        variants: [
          {
            option1: "Default Title",
            price: productPrice,
          },
        ],
        images: [
          {
            attachment: base64Image,
            filename: "uploaded_image.png",
          },
        ],
      },
    }

    const shopifyResponse = await fetch(`https://${domain}/admin/api/2025-01/products.json`, {
      method: "POST",
      headers: {
        "X-Shopify-Access-Token": token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    })

    const result = await shopifyResponse.json()

    if (!shopifyResponse.ok) {
      return NextResponse.json({ error: "Failed to create product", details: result }, { status: 500 })
    }

    return NextResponse.json(result, { status: 201 })
  } catch (error: any) {
    console.error("Shopify Product Creation Error:", error)
    return NextResponse.json({ error: "Server Error", message: error.message }, { status: 500 })
  }
}
