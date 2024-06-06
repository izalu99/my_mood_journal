import { prisma } from '@/utils/db';
import { getUserByClerkID } from '@/utils/auth';
import HistoryChart from '@/components/HistoryChart';

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
    return (
        <div className='w-full h-full'>
            <h1>History</h1>
            <div>
                `Average Sentiment: ${average}`
            </div>
            <div className='w-full h-full'>
                <HistoryChart data={analyses}/>
            </div>
        </div>
    );
}

export default History;