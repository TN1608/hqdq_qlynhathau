"use client"

import { useEffect, useRef } from "react"
import { Chart } from "chart.js"

// Chart.register(...registerables)

interface BarChartProps {
  data: number[]
  labels: string[]
  color: string
  height?: number
  className?: string
}

export function BarChart({ data, labels, color, height = 200, className }: BarChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const chartRef = useRef<Chart | null>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    // Destroy existing chart
    if (chartRef.current) {
      chartRef.current.destroy()
    }

    // // Create new chart
    // const ctx = canvasRef.current.getContext("2d")
    // if (ctx) {
    //   chartRef.current = new Chart(ctx, {
    //     type: "bar",
    //     data: {
    //       labels,
    //       datasets: [
    //         {
    //           label: "",
    //           data,
    //           backgroundColor: color,
    //           borderRadius: 4,
    //           borderSkipped: false,
    //           barThickness: 6,
    //           maxBarThickness: 8,
    //         },
    //       ],
    //     },
    //     options: {
    //       responsive: true,
    //       maintainAspectRatio: false,
    //       scales: {
    //         x: {
    //           grid: {
    //             display: true,
    //             color: "rgba(0, 0, 0, 0.05)",
    //           },
    //           ticks: {
    //             color: "rgba(0, 0, 0, 0.6)",
    //           },
    //         },
    //         y: {
    //           grid: {
    //             display: true,
    //             color: "rgba(0, 0, 0, 0.05)",
    //           },
    //           ticks: {
    //             color: "rgba(0, 0, 0, 0.6)",
    //           },
    //         },
    //       },
    //       plugins: {
    //         legend: {
    //           display: false,
    //         },
    //         tooltip: {
    //           enabled: true,
    //         },
    //       },
    //     },
    //   })
    // }

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy()
      }
    }
  }, [data, labels, color])

  return (
    <div className={className} style={{ height }}>
      <canvas ref={canvasRef} />
    </div>
  )
}

