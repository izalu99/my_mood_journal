
import NewEntryCard from '@/components/NewEntryCard';
import EntryCard from '@/components/EntryCard';
import { getUserByClerkID } from '@/utils/auth';
import { prisma } from '@/utils/db';
import Link from 'next/link';

import Question from '@/components/Question';



const getEntries = async () => {
    const user = await getUserByClerkID()
    const entries = await prisma.journalEntry.findMany({
        where: {
            userId: user.id,
        },
        orderBy: {
            createdAt: 'desc',
        },
        include: {
            analysis: true,
        }    
    })

        return entries

}


const JournalPage = async () => {
    const entries = await getEntries()
    console.log('entries: ',entries)
    return (
        <div className='p-10 bg-zinc-200/10 w-full h-full'>
            <h2 className='text-3xl mb-8'>Journal</h2>
            <div className='mb-8 w-full'>
                <Question />
            </div>
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-4'>
                <NewEntryCard />
                {entries.map((entry) => (
                    <Link href={`/journal/${entry.id}`} key={entry.id}>
                        <EntryCard entry={entry} />
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default JournalPage;