"use client"
import * as React from "react"
import { Line, LineChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export const description = "A multiple line chart"


const chartData = [
  { date: "2024-07-01", completados:130,pendientes: 222, archivados: 150  , curso: 400 },
  { date: "2024-07-02", completados:130,pendientes: 97, archivados: 180 , curso: 400 },
  { date: "2024-07-03", completados:130,pendientes: 167, archivados: 120  , curso: 400 },
  { date: "2024-07-04", completados:130,pendientes: 242, archivados: 260  , curso: 400 },
  { date: "2024-07-05", completados:130,pendientes: 373, archivados: 290  , curso: 400 },
  { date: "2024-07-06", completados:130,pendientes: 301, archivados: 340  , curso: 400 },
  { date: "2024-07-07", completados:130,pendientes: 245, archivados: 180  , curso: 400 },
  { date: "2024-07-08", completados:130,pendientes: 409, archivados: 320  , curso: 400 },
  { date: "2024-07-09", completados:130,pendientes: 59, archivados: 110 , curso: 400 },
  { date: "2024-07-10", completados:130,pendientes: 261, archivados: 190  , curso: 400 },
  { date: "2024-07-11", completados:130,pendientes: 327, archivados: 350  , curso: 400 },
  { date: "2024-07-12", completados:130,pendientes: 292, archivados: 210  , curso: 400 },
  { date: "2024-07-13", completados:130,pendientes: 342, archivados: 380  , curso: 400 },
  { date: "2024-07-14", completados:130,pendientes: 137, archivados: 220  , curso: 400 },
  { date: "2024-07-15", completados:130,pendientes: 120, archivados: 170  , curso: 400 },
  { date: "2024-07-16", completados:130,pendientes: 138, archivados: 190  , curso: 400 },
  { date: "2024-07-17", completados:130,pendientes: 446, archivados: 360  , curso: 400 },
  { date: "2024-07-18", completados:130,pendientes: 364, archivados: 410  , curso: 400 },
  { date: "2024-07-19", completados:130,pendientes: 243, archivados: 180  , curso: 400 },
  { date: "2024-07-20", completados:130,pendientes: 89, archivados: 150 , curso: 400 },
  { date: "2024-07-21", completados:130,pendientes: 137, archivados: 200  , curso: 400 },
  { date: "2024-07-22", completados:130,pendientes: 224, archivados: 170  , curso: 400 },
  { date: "2024-07-23", completados:130,pendientes: 138, archivados: 230  , curso: 400 },
  { date: "2024-07-24", completados:130,pendientes: 387, archivados: 290  , curso: 400 },
  { date: "2024-07-25", completados:130,pendientes: 215, archivados: 250  , curso: 400 },
  { date: "2024-07-26", completados:130,pendientes: 75, archivados: 130 , curso: 400 },
  { date: "2024-07-27", completados:130,pendientes: 383, archivados: 420  , curso: 400 },
  { date: "2024-07-28", completados:130,pendientes: 122, archivados: 180  , curso: 400 },
  { date: "2024-07-29", completados:130,pendientes: 315, archivados: 240  , curso: 400 },
  { date: "2024-07-30", completados:130,pendientes: 454, archivados: 380  , curso: 400 },
  { date: "2024-08-01", completados:130,pendientes: 165, archivados: 220  , curso: 400 },
  { date: "2024-08-02", completados:100,pendientes: 293, archivados: 310  , curso: 400 },
  { date: "2024-08-03", completados:150,pendientes: 247, archivados: 190  , curso: 400 },
  { date: "2024-08-04", completados:150,pendientes: 385, archivados: 420  , curso: 400 },
  { date: "2024-08-05", completados:150,pendientes: 481, archivados: 390  , curso: 400 },
  { date: "2024-08-06", completados:150,pendientes: 498, archivados: 520  , curso: 400 },
  { date: "2024-08-07", completados:150,pendientes: 388, archivados: 300  , curso: 400 },
  { date: "2024-08-08", completados:250,pendientes: 149, archivados: 210  , curso: 400 },
  { date: "2024-08-09", completados:150,pendientes: 227, archivados: 180  , curso: 400 },
  { date: "2024-08-10", completados:150,pendientes: 293, archivados: 330  , curso: 400 },
  { date: "2024-08-11", completados:150,pendientes: 335, archivados: 270  , curso: 400 },
  { date: "2024-08-12", completados:150,pendientes: 197, archivados: 240  , curso: 400 },
  { date: "2024-08-13", completados:150,pendientes: 197, archivados: 160  , curso: 400 },
  { date: "2024-08-14", completados:150,pendientes: 448, archivados: 490  , curso: 400 },
  { date: "2024-08-15", completados:150,pendientes: 473, archivados: 380  , curso: 400 },
  { date: "2024-08-16", completados:150,pendientes: 338, archivados: 400  , curso: 400 },
  { date: "2024-08-17", completados:100,pendientes: 499, archivados: 420  , curso: 400 },
  { date: "2024-08-18", completados:320,pendientes: 315, archivados: 350  , curso: 400 },
  { date: "2024-08-19", completados:320,pendientes: 235, archivados: 180  , curso: 400 },
  { date: "2024-08-20", completados:320,pendientes: 177, archivados: 230  , curso: 400 },
  { date: "2024-08-21", completados:321,pendientes: 82, archivados: 140 , curso: 400 },
  { date: "2024-08-22", completados:325,pendientes: 81, archivados: 120 , curso: 400 },
  { date: "2024-08-23", completados:326,pendientes: 252, archivados: 290  , curso: 400 },
  { date: "2024-08-24", completados:320,pendientes: 294, archivados: 220  , curso: 400 },
  { date: "2024-08-25", completados:320,pendientes: 201, archivados: 250  , curso: 400 },
  { date: "2024-08-26", completados:320,pendientes: 213, archivados: 170  , curso: 400 },
  { date: "2024-08-27", completados:320,pendientes: 420, archivados: 460  , curso: 400 },
  { date: "2024-08-28", completados:320,pendientes: 233, archivados: 190  , curso: 400 },
  { date: "2024-08-29", completados:320,pendientes: 78, archivados: 130 , curso: 400 },
  { date: "2024-08-30", completados:320,pendientes: 340, archivados: 280  , curso: 400 },
  { date: "2024-08-31", completados:100,pendientes: 178, archivados: 230  , curso: 400 },
  { date: "2024-09-01", completados:100,pendientes: 178, archivados: 200  , curso: 400 },
  { date: "2024-09-02", completados:100,pendientes: 470, archivados: 410  , curso: 400 },
  { date: "2024-09-03", completados:100,pendientes: 103, archivados: 160  , curso: 400 },
  { date: "2024-09-04", completados:100,pendientes: 439, archivados: 380  , curso: 400 },
  { date: "2024-09-05", completados:100,pendientes: 88, archivados: 140 , curso: 400 },
  { date: "2024-09-06", completados:100,pendientes: 294, archivados: 250  , curso: 400 },
  { date: "2024-09-07", completados:100,pendientes: 323, archivados: 370  , curso: 400 },
  { date: "2024-09-08", completados:100,pendientes: 385, archivados: 320  , curso: 400 },
  { date: "2024-09-09", completados:100,pendientes: 438, archivados: 480  , curso: 400 },
  { date: "2024-09-10", completados:100,pendientes: 155, archivados: 200  , curso: 400 },
  { date: "2024-09-11", completados:100,pendientes: 92, archivados: 150 , curso: 400 },
  { date: "2024-09-12", completados:100,pendientes: 492, archivados: 420  , curso: 400 },
  { date: "2024-09-13", completados:100,pendientes: 81, archivados: 130 , curso: 400 },
  { date: "2024-09-14", completados:100,pendientes: 426, archivados: 380  , curso: 400 },
  { date: "2024-09-15", completados:100,pendientes: 307, archivados: 350  , curso: 400 },
  { date: "2024-09-16", completados:100,pendientes: 371, archivados: 310  , curso: 400 },
  { date: "2024-09-17", completados:250,pendientes: 475, archivados: 520  , curso: 400 },
  { date: "2024-09-18", completados:100,pendientes: 107, archivados: 170  , curso: 400 },
  { date: "2024-09-19", completados:100,pendientes: 341, archivados: 290  , curso: 400 },
  { date: "2024-09-20", completados:100,pendientes: 408, archivados: 450  , curso: 400 },
  { date: "2024-09-21", completados:100,pendientes: 169, archivados: 210  , curso: 400 },
  { date: "2024-09-22", completados:100,pendientes: 317, archivados: 270  , curso: 400 },
  { date: "2024-09-23", completados:100,pendientes: 480, archivados: 530  , curso: 400 },
  { date: "2024-09-24", completados:100,pendientes: 132, archivados: 180  , curso: 400 },
  { date: "2024-09-25", completados:100,pendientes: 141, archivados: 190  , curso: 400 },
  { date: "2024-09-26", completados:100,pendientes: 434, archivados: 380  , curso: 400 },
  { date: "2024-09-27", completados:100,pendientes: 448, archivados: 490  , curso: 400 },
  { date: "2024-09-28", completados:100,pendientes: 149, archivados: 200  , curso: 400 },
  { date: "2024-09-29", completados:100,pendientes: 103, archivados: 160  , curso: 400 },
  { date: "2024-09-30", completados:100,pendientes: 446, archivados: 400  , curso: 400 },
]

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  completados: {
    label: "Completado",
    color: "#42962d",
  },
  pendientes: {
    label: "Pendiente",
    color: "#ffcc85",
  },
  archivados: {
    label: "Archivado",
    color: "#ad3929",
  },
  curso: {
    label: "Curso",
    color: "#0097eb",
  },
} satisfies ChartConfig

export default function Component() {
  const [timeRange, setTimeRange] = React.useState("90d")

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date)
    const now = new Date()
    let daysToSubtract = 90
    if (timeRange === "30d") {
      daysToSubtract = 30
    } else if (timeRange === "7d") {
      daysToSubtract = 7
    }
    now.setDate(now.getDate() - daysToSubtract)
    return date >= now
  })

  return (
    <Card>
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>Linea char multiple</CardTitle>
          <CardDescription>
            mirando los datos generales
          </CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="w-[160px] rounded-lg sm:ml-auto"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Last 3 months" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="90d" className="rounded-lg">
              los ultimos 3 meses
            </SelectItem>
            <SelectItem value="30d" className="rounded-lg">
              los ultimos 30 dias
            </SelectItem>
            <SelectItem value="7d" className="rounded-lg">
              los ultimos 7 dias
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <LineChart data={filteredData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("es-PE", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("es-PE", {
                      month: "short",
                      day: "numeric",
                    })
                  }}
                  indicator="dot"
                />
              }
            />
            <Line
              type="monotone"
              dataKey="completados"
              stroke="var(--color-completados)"
              dot={false} // Puedes decidir si quieres puntos en la línea
            />
            <Line
              type="monotone"
              dataKey="pendientes"
              stroke="var(--color-pendientes)"
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="archivados"
              stroke="var(--color-archivados)"
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="curso"
              stroke="var(--color-curso)"
              dot={false}
            />
            <ChartLegend content={<ChartLegendContent />} />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
