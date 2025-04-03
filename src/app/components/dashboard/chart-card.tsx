"use client"

import type { ReactNode } from "react"
import { cn } from "@/app/lib/utils"

interface ChartCardProps {
  title: string
  subtitle?: string
  chart: ReactNode
  footer?: {
    icon: ReactNode
    text: string
  }
  className?: string
}

export function ChartCard({ title, subtitle, chart, footer, className }: ChartCardProps) {
  return (
    <div className={cn("bg-white rounded-lg shadow-sm overflow-hidden", className)}>
      <div className="p-4">{chart}</div>

      <div className="p-4 pt-0">
        <h3 className="font-medium text-gray-700">{title}</h3>
        {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}

        {footer && (
          <div className="flex items-center mt-4 text-sm text-gray-500">
            {footer.icon}
            <span className="ml-2">{footer.text}</span>
          </div>
        )}
      </div>
    </div>
  )
}

