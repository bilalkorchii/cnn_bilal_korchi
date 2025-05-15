"use client"

import { motion } from "framer-motion"
import { CheckCircle, Store } from "lucide-react"
import { useLanguage } from "@/components/language-provider"

export function ShopifyStoreInfo({ storeInfo }) {
  const { t, isRTL } = useLanguage()

  if (!storeInfo) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-emerald-50 rounded-lg p-4 mb-6 border border-emerald-200"
    >
      <div className="flex items-center gap-2 mb-2">
        <CheckCircle className="h-5 w-5 text-emerald-600" />
        <h3 className="font-medium text-emerald-800">{t("shopify.connected")}</h3>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Store className="h-4 w-4 text-emerald-700 shrink-0" />
          <div>
            <p className="text-sm text-gray-500">{t("shopify.storeName")}</p>
            <p className="font-medium">{storeInfo.name}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-emerald-700 shrink-0"
          >
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
          </svg>
          <div>
            <p className="text-sm text-gray-500">{t("shopify.storeDomain")}</p>
            <p className="font-medium">{storeInfo.domain}</p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
