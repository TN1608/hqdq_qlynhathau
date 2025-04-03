import type { ReactNode } from "react"
import { cn } from "@/app/lib/utils"

interface StatCardProps {
  icon: ReactNode
  iconBgColor: string
  title: string
  value: string
  change?: {
    value: string
    text: string
    isPositive?: boolean
  }
  className?: string
}

export function StatCard({ icon, iconBgColor, title, value, change, className }: StatCardProps) {
  return (
    <div className={cn("bg-white rounded-lg shadow-sm p-4 flex flex-col", className)}>
      <div className="flex items-start justify-between mb-6">
        <div className={cn("p-3 rounded-lg flex items-center justify-center", iconBgColor)}>{icon}</div>
        <div className="text-right">
          <p className="text-sm text-gray-500">{title}</p>
          <h3 className="text-2xl font-bold">{value}</h3>
        </div>
      </div>

      {change && (
        <div className="border-t border-gray-100 pt-3 text-sm">
          <span className={cn("font-medium", change.isPositive ? "text-green-500" : "text-red-500")}>
            {change.value}
          </span>
          <span className="text-gray-500 ml-1">{change.text}</span>
        </div>
      )}
    </div>
  )
}

