import { prisma } from '@/utils/db';
import { getUserByClerkID } from '@/utils/auth';

const getData = async () => {
    const user = await getUserByClerkID()
    const analyses = await prisma.analysis.findMany({
        where:{
            
        }
    })
}


const History = () => {
    return (
        <div>
            <h1>History</h1>
        </div>
    );
}

export default History;