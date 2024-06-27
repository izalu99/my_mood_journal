import { prisma } from '@/utils/db';
import { getUserByClerkID } from '@/utils/auth';
import React from 'react';
import HistoryChart from '@/components/HistoryChart';
import MoodPieChart from '@/components/MoodPieChart';

const getData = async () => {
    const user = await getUserByClerkID()
    const analyses = await prisma.analysis.findMany({
        where:{
            userId:user.id,
        },
        orderBy:{
            createdAt:'asc',
        },
    })

    const sum = analyses.reduce((all, current) => all + current.sentimentScore, 0)
    const average = Math.round(sum / analyses.length)

    return {analyses, average }
}


const History = async () => {
    const { average, analyses } = await getData()
    //console.log(analyses)
    //prep the data for the mood pie chart
    // count the number of each mood and make an array of objects with the mood and the count
    // as well as the color of each mood
    // the data array should look like this: [{name: 'mood', value: count, color: color}]
    
    const countByMoodValue = (array:any, key:any, colorKey:any) => {
        return array.reduce((all:any, current:any) => {
            if (!all[current[key]]) {
                all[current[key]] = {name: current[key], value: 1, color: current[colorKey]}
            } else {
                all[current[key]].value++;
            }
            return all
        }, {});
    }
    
    //use the countByMoodValue function to get the data for the pie chart
    const pieData = Object.values(countByMoodValue(analyses, 'mood', 'color'));
    console.log('pieData: ',pieData)
    return (
        <div className='w-full h-full'>
            <h1 className='text-3xl'>Mood History</h1>
            <div className='w-full h-full'>
                <HistoryChart data={analyses}/>
            </div>
            <div className='w-full h-full'>
                <h2 className='pt-4 text-2xl'>Mood Distribution</h2>
                <MoodPieChart data={pieData}/>
            </div>
            <div>
                Average Sentiment: {average}
            </div>
        </div>
    );
}

export default History;