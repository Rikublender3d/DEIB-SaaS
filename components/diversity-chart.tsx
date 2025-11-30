"use client"

import { Card } from "@/components/ui/card"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from "recharts"

const data = [
  { department: "Engineering", women: 38, men: 62, nonBinary: 2 },
  { department: "Sales", women: 52, men: 46, nonBinary: 2 },
  { department: "Marketing", women: 61, men: 37, nonBinary: 2 },
  { department: "HR", women: 72, men: 26, nonBinary: 2 },
  { department: "Finance", women: 44, men: 54, nonBinary: 2 },
  { department: "Operations", women: 48, men: 50, nonBinary: 2 },
]

export function DiversityChart() {
  return (
    <Card className="p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-1">部署別で見る多様性</h3>
        <p className="text-sm text-muted-foreground">チーム間の属性データ</p>
      </div>

      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data}>
          <XAxis dataKey="department" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}%`} />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "8px",
            }}
          />
          <Legend />
          <Bar dataKey="women" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} />
          <Bar dataKey="men" fill="hsl(var(--chart-2))" radius={[4, 4, 0, 0]} />
          <Bar dataKey="nonBinary" fill="hsl(var(--chart-3))" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </Card >
  )
}
