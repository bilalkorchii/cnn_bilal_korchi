"use client"

import { createContext, useContext, useState, useEffect } from "react"

type Language = "en" | "ar"

type LanguageContextType = {
  language: Language
  setLanguage: (lang: Language) => void
  isRTL: boolean
  t: (key: string) => string
  fontFamily: string
}

const translations = {
  en: {
    "app.title": "1335.io",
    "app.subtitle": "AI-Powered Product Category Prediction for Shopify",
    "step.shopifyToken": "Shopify Token",
    "step.productImage": "Product Image",
    "step.productDetails": "Product Details",
    "step.aiPrediction": "AI Prediction",
    "step.previewPost": "Preview & Post",
    "shopify.connect": "Connect Your Shopify Store",
    "shopify.enterToken": "Enter your Shopify API token to get started",
    "shopify.apiToken": "Shopify API Token",
    "shopify.placeholder": "Enter your Shopify API token",
    "shopify.verifying": "Verifying token...",
    "shopify.connected": "Store Connected Successfully",
    "shopify.storeName": "Store Name",
    "shopify.storeDomain": "Store Domain",
    "shopify.storeInfo": "Store Information",
    "button.continue": "Continue",
    "button.back": "Back",
    "button.verify": "Verify Token",
    "upload.title": "Upload Product Image",
    "upload.subtitle": "Upload a high-quality image of your product",
    "upload.label": "Product Image",
    "upload.clickToUpload": "Click to upload",
    "upload.dragDrop": "or drag and drop",
    "upload.fileTypes": "PNG, JPG or WEBP (MAX. 2MB)",
    "product.details": "Product Details",
    "product.enterDetails": "Enter the details of your product",
    "product.title": "Product Title",
    "product.titlePlaceholder": "Enter product title",
    "product.price": "Product Price ($)",
    "product.pricePlaceholder": "Enter product price",
    "product.description": "Product Description",
    "product.descriptionPlaceholder": "Enter product description",
    "ai.title": "AI Category Prediction",
    "ai.subtitle": "Our AI will analyze your product image and predict the best category",
    "ai.analyzing": "Analyzing your product...",
    "ai.wait": "This may take a few seconds",
    "ai.predictButton": "Predict Category",
    "preview.title": "Product Preview",
    "preview.subtitle": "Review your product before posting to Shopify",
    "preview.aiPredicted": "AI Predicted Category",
    "preview.description": "Description",
    "preview.postButton": "Post to Shopify",
    "preview.posting": "Posting to Shopify...",
    "preview.success": "Successfully Posted to Shopify!",
    "preview.successMessage": "Your product has been added to your Shopify store",
    language: "العربية",
  },
  ar: {
    "app.title": "1335.io",
    "app.subtitle": "التنبؤ بفئة المنتج المدعوم بالذكاء الاصطناعي لـ Shopify",
    "step.shopifyToken": "رمز Shopify",
    "step.productImage": "صورة المنتج",
    "step.productDetails": "تفاصيل المنتج",
    "step.aiPrediction": "تنبؤ الذكاء الاصطناعي",
    "step.previewPost": "معاينة ونشر",
    "shopify.connect": "قم بتوصيل متجر Shopify الخاص بك",
    "shopify.enterToken": "أدخل رمز API الخاص بـ Shopify للبدء",
    "shopify.apiToken": "رمز API لـ Shopify",
    "shopify.placeholder": "أدخل رمز API الخاص بـ Shopify",
    "shopify.verifying": "جاري التحقق من الرمز...",
    "shopify.connected": "تم توصيل المتجر بنجاح",
    "shopify.storeName": "اسم المتجر",
    "shopify.storeDomain": "نطاق المتجر",
    "shopify.storeInfo": "معلومات المتجر",
    "button.continue": "استمرار",
    "button.back": "رجوع",
    "button.verify": "تحقق من الرمز",
    "upload.title": "تحميل صورة المنتج",
    "upload.subtitle": "قم بتحميل صورة عالية الجودة لمنتجك",
    "upload.label": "صورة المنتج",
    "upload.clickToUpload": "انقر للتحميل",
    "upload.dragDrop": "أو اسحب وأفلت",
    "upload.fileTypes": "PNG أو JPG أو WEBP (الحد الأقصى 2 ميجابايت)",
    "product.details": "تفاصيل المنتج",
    "product.enterDetails": "أدخل تفاصيل منتجك",
    "product.title": "عنوان المنتج",
    "product.titlePlaceholder": "أدخل عنوان المنتج",
    "product.price": "سعر المنتج ($)",
    "product.pricePlaceholder": "أدخل سعر المنتج",
    "product.description": "وصف المنتج",
    "product.descriptionPlaceholder": "أدخل وصف المنتج",
    "ai.title": "تنبؤ الفئة بالذكاء الاصطناعي",
    "ai.subtitle": "سيقوم الذكاء الاصطناعي لدينا بتحليل صورة منتجك والتنبؤ بأفضل فئة",
    "ai.analyzing": "جاري تحليل منتجك...",
    "ai.wait": "قد يستغرق هذا بضع ثوان",
    "ai.predictButton": "التنبؤ بالفئة",
    "preview.title": "معاينة المنتج",
    "preview.subtitle": "راجع منتجك قبل النشر على Shopify",
    "preview.aiPredicted": "فئة متوقعة بالذكاء الاصطناعي",
    "preview.description": "الوصف",
    "preview.postButton": "نشر على Shopify",
    "preview.posting": "جاري النشر على Shopify...",
    "preview.success": "تم النشر بنجاح على Shopify!",
    "preview.successMessage": "تمت إضافة منتجك إلى متجر Shopify الخاص بك",
    language: "English",
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState<Language>("en")
  const [isRTL, setIsRTL] = useState(false)
  const [fontFamily, setFontFamily] = useState("font-poppins")

  useEffect(() => {
    setIsRTL(language === "ar")
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr"
    setFontFamily(language === "ar" ? "font-cairo" : "font-poppins")
  }, [language])

  const t = (key: string) => {
    return translations[language][key] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, isRTL, t, fontFamily }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
