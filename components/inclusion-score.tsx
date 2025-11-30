"use client"

import { Card } from "@/components/ui/card"
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts"

const data = [
  { name: "Score", value: 88 },
  { name: "Remaining", value: 12 },
]

const COLORS = ["hsl(var(--accent))", "hsl(var(--muted))"]

export function InclusionScore() {
  return (
    <Card className="p-6 h-full">
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-1">インクルージョンスコア</h3>
        <p className="text-sm text-muted-foreground">従業員感情指数（EI）</p>
      </div>

      <div className="relative">
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              startAngle={90}
              endAngle={-270}
              innerRadius={60}
              outerRadius={80}
              paddingAngle={0}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <p className="text-4xl font-bold">88</p>
            <p className="text-sm text-muted-foreground">/ 100</p>
          </div>
        </div>
      </div>

      <div className="mt-6 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">帰属感</span>
          <span className="text-sm font-medium">92</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">公平性</span>
          <span className="text-sm font-medium">86</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">発言権</span>
          <span className="text-sm font-medium">85</span>
        </div>
      </div>
    </Card>
  )
}
