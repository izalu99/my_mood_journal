
'use client'

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";


// active, payload and label props are automatically passed to CustomTooltip component by  rechart's Toottip component
// active: boolean - whether the tooltip is active or not
// payload: array - an array of the active payload
// label: string - the label of the active tooltip; usually the x-axis value
// see more in recharts documentation
const CustomTooltip = ({ active, payload, label }) => {

    const dateLabel = new Date(label).toLocaleString('en-CA',{
        weekday:'long',
        month:'short',
        year:'numeric',
        day:'numeric',
        hour:'numeric',
        minute:'numeric',
    })

    if (active) {
        const analysis = payload[0].payload
        return (
            <div className='p-8 custom-tooltip bg-black/5 shadow-md border-white/10 rounded-lg backdrop-blur-md relative'>
                <div
                className='absolute left-2 top-2 w-2 h-2 rounded-full'
                style={{background: analysis.color}}
                ></div>
                <p className='label text-sm text-white/30'>{dateLabel}</p>
                <p className='intro text-xl uppercase'>{analysis.mood}</p>
            </div>
      );
    }
  
    return null;
  }



const HistoryChart = ({ data }: any) => {

    return (
        <ResponsiveContainer width="100%" height= "100%">
            <LineChart width={300} height={100} data={data}>
                <Line 
                type="monotone"
                dataKey="sentimentScore" 
                stroke="#8884d8" 
                strokeWidth={2}
                activeDot={{r: 8}}
                />
                <XAxis dataKey="createdAt" />
                <Tooltip content={<CustomTooltip />}/>
            </LineChart>
        </ResponsiveContainer>
    )

}

export default HistoryChart;