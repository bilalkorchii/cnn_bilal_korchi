"use client"

import { useState } from "react"
import { ProductForm } from "@/components/product-form"
import { Stepper } from "@/components/stepper"
import { ProductPreview } from "@/components/product-preview"
import { ShopifyStoreInfo } from "@/components/shopify-store-info"
import { Container } from "@/components/ui/container"
import { LanguageSwitcher } from "@/components/language-switcher"
import { useLanguage } from "@/components/language-provider"

export default function Home() {
  const { t, isRTL, fontFamily } = useLanguage()
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    shopifyToken: "",
    shopifyDomain: "",
    productImage: null,
    productTitle: "",
    productPrice: "",
    productDescription: "",
    predictedCategory: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [isVerifying, setIsVerifying] = useState(false)
  const [isPosting, setIsPosting] = useState(false)
  const [postSuccess, setPostSuccess] = useState(false)
  const [storeInfo, setStoreInfo] = useState(null)

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleFormChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    })
  }

  const verifyShopifyToken = async () => {
    setIsVerifying(true)
    try {
      const response = await fetch("/api/verify-shopify-token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: formData.shopifyToken, domain: formData.shopifyDomain }),
      })

      const data = await response.json()

      if (data.success) {
        setStoreInfo(data.shop)
        handleNext()
      } else {
        // Handle error - in a real app you would show an error message

        alert(t("token Verification Error"))
      }
    } catch (error) {
      console.error("Error verifying token:", error)
    } finally {
      setIsVerifying(false)
    }
  }

  const predictCategory = async () => {
    setIsLoading(true)
    try {
      // Simulate API call to predict category
      const response = await fetch("/api/predict-category", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image: formData.productImage,
          title: formData.productTitle,
        }),
      })

      const data = await response.json()

      setFormData({
        ...formData,
        predictedCategory: data.category,
      })

      handleNext()
    } catch (error) {
      console.error("Error predicting category:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const postToShopify = async () => {
    setIsPosting(true)
    try {
      // Simulate API call to post to Shopify
      const response = await fetch("/api/post-to-shopify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, storeInfo,token: formData.shopifyToken, domain: formData.shopifyDomain }),
      })

      const data = await response.json()

      if (data.success) {
        setPostSuccess(true)
      }
    } catch (error) {
      console.error("Error posting to Shopify:", error)
    } finally {
      setIsPosting(false)
    }
  }

  return (
    <main
      className={`min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 ${fontFamily}`}
      dir={isRTL ? "rtl" : "ltr"}
    >
      <LanguageSwitcher />
      <Container>
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{t("app.title")}</h1>
            <p className="mt-2 text-lg text-gray-600">{t("app.subtitle")}</p>
          </div>

          <div className="bg-white shadow-xl rounded-xl overflow-hidden">
            <div className="p-6 sm:p-8">
              <Stepper currentStep={currentStep} />

              <div className="mt-8">
                {currentStep > 1 && storeInfo && (
                  <div className={`mb-6 ${currentStep > 1 ? "block" : "hidden"}`}>
                    <ShopifyStoreInfo storeInfo={storeInfo} />
                  </div>
                )}

                <ProductForm
                  currentStep={currentStep}
                  formData={formData}
                  onChange={handleFormChange}
                  onNext={handleNext}
                  onBack={handleBack}
                  onVerify={verifyShopifyToken}
                  onPredict={predictCategory}
                  isLoading={isLoading}
                  isVerifying={isVerifying}
                />

                {currentStep === 5 && (
                  <ProductPreview
                    formData={formData}
                    onPost={postToShopify}
                    isPosting={isPosting}
                    postSuccess={postSuccess}
                    storeInfo={storeInfo}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </main>
  )
}
