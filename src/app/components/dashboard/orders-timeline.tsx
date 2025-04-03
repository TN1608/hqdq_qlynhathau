"use client"

import type React from "react"

import { ArrowUp } from "lucide-react"

interface OrderEvent {
  id: string
  icon: React.ReactNode
  iconBg: string
  title: string
  date: string
}

interface OrdersTimelineProps {
  events: OrderEvent[]
  className?: string
}

export function OrdersTimeline({ events, className }: OrdersTimelineProps) {
  return (
    <div className={`bg-white rounded-lg shadow-sm p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-medium text-gray-700">Orders overview</h3>
        <div className="flex items-center text-sm">
          <ArrowUp className="h-4 w-4 text-green-500 mr-1" />
          <span className="font-medium text-green-500">24%</span>
          <span className="text-gray-500 ml-1">this month</span>
        </div>
      </div>

      <div className="relative pl-6 border-l border-gray-200">
        {events.map((event, index) => (
          <div key={event.id} className={`mb-6 ${index === events.length - 1 ? "mb-0" : ""}`}>
            <div className="absolute -left-3">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center ${event.iconBg}`}>
                {event.icon}
              </div>
            </div>
            <div className="ml-4">
              <h4 className="font-medium text-gray-700">{event.title}</h4>
              <p className="text-sm text-gray-500 mt-1">{event.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

