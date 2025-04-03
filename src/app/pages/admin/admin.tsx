"use client"

import { Printer, BarChart3, Store, Users, Clock, ShoppingCart, Server, CreditCard, MessageCircle } from "lucide-react"
import { Sidebar } from "@/app/components/layout/sidebar"
import { Header } from "@/app/components/layout/header"
import { StatCard } from "@/app/components/dashboard/stat-card"
import { ChartCard } from "@/app/components/dashboard/chart-card"
import { ProjectsTable } from "@/app/components/dashboard/projects-table"
import { OrdersTimeline } from "@/app/components/dashboard/orders-timeline"
import { BarChart } from "@/app/components/dashboard/bar-chart"
import { LineChart } from "@/app/components/dashboard/line-chart"

export default function Dashboard() {
  // Sample data for charts
  const weeklyData = [30, 15, 10, 20, 40, 15, 30]
  const weekLabels = ["M", "T", "W", "T", "F", "S", "S"]

  const monthlyData = [20, 60, 250, 300, 450, 350, 200, 300, 450]
  const monthLabels = ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

  const tasksData = [10, 100, 300, 200, 300, 450, 300, 350, 250]

  // Sample projects data
  const projects = [
    {
      id: "1",
      icon: <div className="text-white text-xs font-bold">XD</div>,
      iconBg: "bg-red-500",
      name: "Material UI XD Version",
      members: [{ initials: "JS" }, { initials: "TS" }, { initials: "AR" }, { initials: "MK" }],
      budget: "$14,000",
      completion: 60,
    },
    {
      id: "2",
      icon: <div className="text-white text-xs">A</div>,
      iconBg: "bg-blue-500",
      name: "Add Progress Track",
      members: [{ initials: "JS" }, { initials: "TS" }],
      budget: "$3,000",
      completion: 10,
    },
    {
      id: "3",
      icon: <div className="text-white text-xs">F</div>,
      iconBg: "bg-green-500",
      name: "Fix Platform Errors",
      members: [{ initials: "JS" }, { initials: "TS" }],
      budget: "Not set",
      completion: 100,
    },
    {
      id: "4",
      icon: <div className="text-white text-xs">S</div>,
      iconBg: "bg-green-500",
      name: "Launch our Mobile App",
      members: [{ initials: "JS" }, { initials: "TS" }, { initials: "AR" }, { initials: "MK" }],
      budget: "$20,500",
      completion: 100,
    },
    {
      id: "5",
      icon: <div className="text-white text-xs">P</div>,
      iconBg: "bg-blue-500",
      name: "Add the New Pricing Page",
      members: [{ initials: "JS" }],
      budget: "$500",
      completion: 25,
    },
    {
      id: "6",
      icon: <div className="text-white text-xs">R</div>,
      iconBg: "bg-red-500",
      name: "Redesign New Online Shop",
      members: [{ initials: "JS" }, { initials: "TS" }],
      budget: "$2,000",
      completion: 40,
    },
  ]

  // Sample orders data
  const orders = [
    {
      id: "1",
      icon: <div className="text-white text-xs">$</div>,
      iconBg: "bg-green-500",
      title: "$2400, Design changes",
      date: "22 DEC 7:20 PM",
    },
    {
      id: "2",
      icon: <ShoppingCart className="h-3 w-3 text-white" />,
      iconBg: "bg-red-500",
      title: "New order #1832412",
      date: "21 DEC 11 PM",
    },
    {
      id: "3",
      icon: <Server className="h-3 w-3 text-white" />,
      iconBg: "bg-blue-500",
      title: "Server payments for April",
      date: "21 DEC 9:34 PM",
    },
    {
      id: "4",
      icon: <CreditCard className="h-3 w-3 text-white" />,
      iconBg: "bg-orange-500",
      title: "New card added for order #4395133",
      date: "20 DEC 2:20 AM",
    },
    {
      id: "5",
      icon: <MessageCircle className="h-3 w-3 text-white" />,
      iconBg: "bg-pink-500",
      title: "New card added for order #4395133",
      date: "18 DEC 4:54 AM",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />

      <div className="ml-0 md:ml-64 p-4 md:p-8">
        <Header title="Dashboard" />

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <StatCard
            icon={<Printer className="h-6 w-6 text-white" />}
            iconBgColor="bg-gray-800"
            title="Bookings"
            value="281"
            change={{ value: "+55%", text: "than last week", isPositive: true }}
          />

          <StatCard
            icon={<BarChart3 className="h-6 w-6 text-white" />}
            iconBgColor="bg-blue-500"
            title="Today's Users"
            value="2,300"
            change={{ value: "+3%", text: "than last month", isPositive: true }}
          />

          <StatCard
            icon={<Store className="h-6 w-6 text-white" />}
            iconBgColor="bg-green-500"
            title="Revenue"
            value="34k"
            change={{ value: "+1%", text: "than yesterday", isPositive: true }}
          />

          <StatCard
            icon={<Users className="h-6 w-6 text-white" />}
            iconBgColor="bg-pink-500"
            title="Followers"
            value="+91"
            change={{ value: "Just updated", text: "", isPositive: true }}
          />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <ChartCard
            title="Website Views"
            subtitle="Last Campaign Performance"
            chart={<BarChart data={weeklyData} labels={weekLabels} color="#1A73E8" height={200} />}
            footer={{
              icon: <Clock className="h-4 w-4 text-gray-500" />,
              text: "campaign sent 2 days ago",
            }}
          />

          {/* <ChartCard
            title="Daily Sales"
            subtitle="(+15%) increase in today sales."
            chart={<LineChart data={monthlyData} labels={monthLabels} color="#4CAF50" height={200} />}
            footer={{
              icon: <Clock className="h-4 w-4 text-gray-500" />,
              text: "updated 4 min ago",
            }}
          />

          <ChartCard
            title="Completed Tasks"
            subtitle="Last Campaign Performance"
            chart={<LineChart data={tasksData} labels={monthLabels} color="#344767" height={200} />}
            footer={{
              icon: <Clock className="h-4 w-4 text-gray-500" />,
              text: "just updated",
            }}
          /> */}
        </div>

        {/* Projects and Orders Row */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3">
            <ProjectsTable projects={projects} />
          </div>

          <div className="lg:col-span-2">
            <OrdersTimeline events={orders} />
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-8 py-4 text-center text-sm text-gray-500">
          <p>© 2023, made with ❤️ by Creative Tim & UPDIVISION for a better web.</p>
          <div className="flex justify-center mt-2 space-x-4">
            <a href="#" className="hover:text-gray-700">
              UPDIVISION
            </a>
            <a href="#" className="hover:text-gray-700">
              Creative Tim
            </a>
            <a href="#" className="hover:text-gray-700">
              About Us
            </a>
            <a href="#" className="hover:text-gray-700">
              Blog
            </a>
            <a href="#" className="hover:text-gray-700">
              License
            </a>
          </div>
        </footer>
      </div>
    </div>
  )
}

