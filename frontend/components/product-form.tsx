"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Loader2 } from "lucide-react"
import { useLanguage } from "@/components/language-provider"

export function ProductForm({
  currentStep,
  formData,
  onChange,
  onNext,
  onBack,
  onVerify,
  onPredict,
  isLoading,
  isVerifying,
}) {
  const { t, isRTL } = useLanguage()
  const [imagePreview, setImagePreview] = useState(null)

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
        onChange("productImage", reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const variants = {
    hidden: { opacity: 0, x: isRTL ? -100 : 100 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: isRTL ? 100 : -100 },
  }

  return (
    <AnimatePresence mode="wait">
      {currentStep === 1 && (
        <motion.div
          key="step1"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={variants}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">{t("shopify.connect")}</h2>
            <p className="text-gray-500">{t("shopify.enterToken")}</p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="shopifyToken">{t("shopify.apiToken")}</Label>
              <Input
                id="shopifyToken"
                type="password"
                placeholder={t("shopify.placeholder")}
                value={formData.shopifyToken}
                onChange={(e) => onChange("shopifyToken", e.target.value)}
              />
            </div>
              <div className="space-y-2">
              <Label htmlFor="shopifyToken">Domain</Label>
              <Input
                id="shopifyDomain"
                type="text"
                
                value={formData.shopifyDomain}
                onChange={(e) => onChange("shopifyDomain", e.target.value)}
              />
            </div>

            <Button onClick={onVerify} disabled={!formData.shopifyToken || isVerifying} className="w-full sm:w-auto">
              {isVerifying ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {t("shopify.verifying")}
                </>
              ) : (
                t("button.verify")
              )}
            </Button>
          </div>
        </motion.div>
      )}

      {currentStep === 2 && (
        <motion.div
          key="step2"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={variants}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">{t("upload.title")}</h2>
            <p className="text-gray-500">{t("upload.subtitle")}</p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="productImage">{t("upload.label")}</Label>
              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="productImage"
                  className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                >
                  {imagePreview ? (
                    <div className="relative w-full h-full">
                      <Image
                        src={imagePreview || "/placeholder.svg"}
                        alt="Product preview"
                        fill
                        className="object-contain p-2"
                      />
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg
                        className="w-8 h-8 mb-4 text-gray-500"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 16"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                        />
                      </svg>
                      <p className="mb-2 text-sm text-gray-500">
                        <span className="font-semibold">{t("upload.clickToUpload")}</span> {t("upload.dragDrop")}
                      </p>
                      <p className="text-xs text-gray-500">{t("upload.fileTypes")}</p>
                    </div>
                  )}
                  <input
                    id="productImage"
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </label>
              </div>
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={onBack}>
                {t("button.back")}
              </Button>
              <Button onClick={onNext} disabled={!imagePreview}>
                {t("button.continue")}
              </Button>
            </div>
          </div>
        </motion.div>
      )}

      {currentStep === 3 && (
        <motion.div
          key="step3"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={variants}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">{t("product.details")}</h2>
            <p className="text-gray-500">{t("product.enterDetails")}</p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="productTitle">{t("product.title")}</Label>
              <Input
                id="productTitle"
                placeholder={t("product.titlePlaceholder")}
                value={formData.productTitle}
                onChange={(e) => onChange("productTitle", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="productPrice">{t("product.price")}</Label>
              <Input
                id="productPrice"
                type="number"
                placeholder={t("product.pricePlaceholder")}
                value={formData.productPrice}
                onChange={(e) => onChange("productPrice", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="productDescription">{t("product.description")}</Label>
              <Textarea
                id="productDescription"
                placeholder={t("product.descriptionPlaceholder")}
                rows={4}
                value={formData.productDescription}
                onChange={(e) => onChange("productDescription", e.target.value)}
              />
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={onBack}>
                {t("button.back")}
              </Button>
              <Button
                onClick={onNext}
                disabled={!formData.productTitle || !formData.productPrice || !formData.productDescription}
              >
                {t("button.continue")}
              </Button>
            </div>
          </div>
        </motion.div>
      )}

      {currentStep === 4 && (
        <motion.div
          key="step4"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={variants}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">{t("ai.title")}</h2>
            <p className="text-gray-500">{t("ai.subtitle")}</p>
          </div>

          <div className="space-y-4">
            <div className="flex flex-col items-center justify-center py-8">
              {isLoading ? (
                <div className="text-center">
                  <Loader2 className="h-12 w-12 animate-spin text-emerald-600 mx-auto" />
                  <p className="mt-4 text-lg font-medium">{t("ai.analyzing")}</p>
                  <p className="text-gray-500">{t("ai.wait")}</p>
                </div>
              ) : (
                <>
                  <div className="relative w-32 h-32 mb-4">
                    {formData.productImage && (
                      <Image
                        src={formData.productImage || "/placeholder.svg"}
                        alt="Product"
                        fill
                        className="object-contain"
                      />
                    )}
                  </div>
                  <Button onClick={onPredict} size="lg" className="animate-pulse">
                    {t("ai.predictButton")}
                  </Button>
                </>
              )}
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={onBack} disabled={isLoading}>
                {t("button.back")}
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
