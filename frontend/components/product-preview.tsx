"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Loader2 } from "lucide-react"
import { useLanguage } from "@/components/language-provider"

export function ProductPreview({ formData, onPost, isPosting, postSuccess, storeInfo }) {
  const { t, isRTL } = useLanguage()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">{t("preview.title")}</h2>
        <p className="text-gray-500">{t("preview.subtitle")}</p>
      </div>

      <div className="bg-gray-50 rounded-lg p-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="relative w-full md:w-1/3 h-64">
            {formData.productImage && (
              <Image
                src={formData.productImage || "/placeholder.svg"}
                alt={formData.productTitle}
                fill
                className="object-contain rounded-md"
              />
            )}
          </div>

          <div className="flex-1 space-y-4">
            <div>
              <h3 className="text-xl font-bold">{formData.productTitle}</h3>
              <div className="flex items-center mt-1">
                <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
                  {formData.predictedCategory || "Clothing"}
                </Badge>
                <span className="mx-2 text-sm text-gray-500">{t("preview.aiPredicted")}</span>
              </div>
            </div>

            <div>
              <p className="text-2xl font-bold">${formData.productPrice}</p>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-500">{t("preview.description")}</h4>
              <p className="mt-1">{formData.productDescription}</p>
            </div>

            {storeInfo && (
              <div className="text-sm text-gray-500">
                <p>
                  {t("shopify.storeName")}: {storeInfo.name}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        {postSuccess ? (
          <div className="flex flex-col items-center text-center">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-emerald-100 mb-4">
              <CheckCircle className="h-6 w-6 text-emerald-600" />
            </div>
            <h3 className="text-lg font-medium">{t("preview.success")}</h3>
            <p className="text-gray-500 mt-1">{t("preview.successMessage")}</p>
          </div>
        ) : (
          <Button onClick={onPost} disabled={isPosting} size="lg" className="bg-emerald-600 hover:bg-emerald-700">
            {isPosting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {t("preview.posting")}
              </>
            ) : (
              t("preview.postButton")
            )}
          </Button>
        )}
      </div>
    </motion.div>
  )
}
