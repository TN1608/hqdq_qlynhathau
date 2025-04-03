"use client"

import type React from "react"

import { MoreVertical, Check } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/ui/avatar"
import { Button } from "@/app/components/ui/button"

interface Project {
  id: string
  icon: React.ReactNode
  iconBg: string
  name: string
  members: {
    image?: string
    initials: string
  }[]
  budget: string
  completion: number
}

interface ProjectsTableProps {
  projects: Project[]
  className?: string
}

export function ProjectsTable({ projects, className }: ProjectsTableProps) {
  return (
    <div className={`bg-white rounded-lg shadow-sm ${className}`}>
      <div className="p-6 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium text-gray-700">Projects</h3>
          <div className="flex items-center mt-1">
            <Check className="h-4 w-4 text-blue-500 mr-2" />
            <span className="text-sm text-gray-500">
              <span className="font-medium text-blue-500">30 done</span> this month
            </span>
          </div>
        </div>

        <Button variant="ghost" size="icon">
          <MoreVertical className="h-5 w-5" />
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-xs text-gray-400 uppercase">
              <th className="px-6 py-3 text-left">Companies</th>
              <th className="px-6 py-3 text-left">Members</th>
              <th className="px-6 py-3 text-left">Budget</th>
              <th className="px-6 py-3 text-left">Completion</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.id} className="border-t border-gray-100">
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className={`w-10 h-10 rounded flex items-center justify-center ${project.iconBg}`}>
                      {project.icon}
                    </div>
                    <span className="ml-3 font-medium">{project.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex -space-x-2">
                    {project.members.map((member, index) => (
                      <Avatar key={index} className="border-2 border-white w-8 h-8">
                        {member.image ? <AvatarImage src={member.image} alt="Member" /> : null}
                        <AvatarFallback className="bg-gray-200 text-gray-600 text-xs">{member.initials}</AvatarFallback>
                      </Avatar>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 text-sm">{project.budget}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="w-full bg-gray-200 rounded-full h-2 mr-2 max-w-[120px]">
                      <div
                        className={`h-2 rounded-full ${project.completion > 70 ? "bg-green-500" : "bg-blue-500"}`}
                        style={{ width: `${project.completion}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-500">{project.completion}%</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

