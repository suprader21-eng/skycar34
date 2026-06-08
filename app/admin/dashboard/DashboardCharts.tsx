'use client'

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts'

interface Props {
  data: { label: string; ca: number }[]
}

export default function DashboardCharts({ data }: Props) {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <LineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#1e1e1e" />
        <XAxis
          dataKey="label"
          tick={{ fill: '#888', fontSize: 11 }}
          axisLine={{ stroke: '#1e1e1e' }}
          tickLine={false}
        />
        <YAxis
          tick={{ fill: '#888', fontSize: 11 }}
          axisLine={false}
          tickLine={false}
          tickFormatter={(v) => `${v}€`}
        />
        <Tooltip
          contentStyle={{ backgroundColor: '#111', border: '1px solid #C9A84C', borderRadius: 0 }}
          labelStyle={{ color: '#C9A84C', fontFamily: 'var(--font-cinzel)', fontSize: 12 }}
          itemStyle={{ color: '#F5F5F5', fontSize: 12 }}
          formatter={(value: number) => [`${value.toFixed(0)}€`, "CA"]}
        />
        <Line
          type="monotone"
          dataKey="ca"
          stroke="#C9A84C"
          strokeWidth={2}
          dot={{ fill: '#C9A84C', strokeWidth: 0, r: 4 }}
          activeDot={{ r: 6, fill: '#E4C97A' }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
