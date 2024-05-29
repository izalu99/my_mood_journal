
import NewEntryCard from '@/components/NewEntryCard';
import EntryCard from '@/components/EntryCard';
import { getUserByClerkID } from '@/utils/auth';
import { prisma } from '@/utils/db';
import Link from 'next/link';
import { analyze } from '@/utils/ai';



const getEntries = async () => {
    const user = await getUserByClerkID()
    const entries = await prisma.journalEntry.findMany({
        where: {
            userId: user.id,
        },
        orderBy: {
            createdAt: 'desc',
        },    
    })


    //check if open ai is working
    //await analyze(`im gonna give you a journal entry. and i want you to analyze it for a few things: mood, a summary, whether it is negative or not and what the subject us. as well as the color representation
    //of the mood. you need to respond back with a json in the format:{mood: "", summary: "", negative: "", subject: "", color: ""}
    //ok this is the entry: Today was a good day. I went to the park and played with my dog. I felt happy and content. The weather was nice and sunny.`)
        return entries

}


const JournalPage = async () => {
    const entries = await getEntries()
    console.log('entries: ',entries)
    return (
        <div className='p-10 bg-zinc-400/10 w-full h-full'>
            <h2 className='text-3xl mb-8'>Journal</h2>
            <div className='grid grid-cols-3 gap-4'>
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