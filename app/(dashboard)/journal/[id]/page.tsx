import Editor from "@/components/Editor";
import { getUserByClerkID } from "@/utils/auth";
import prisma from "@/utils/db";


const getEntry = async (id: any) => {
    const user = await getUserByClerkID();
    const entry = await prisma.journalEntry.findUnique({
        where: {
            userId_id: {
                userId: user.id,
                id: id,
            },
        },

        include: {
            analysis: true,
        },
    })

    return entry;

}

const EntryPage = async ({ params }: any) => {
    const entry = await getEntry(params.id);
    const { mood, summary, color, subject, negative } = entry.analysis;
    const analysisData = [
        { name: 'Summary', value:  summary},
        { name: 'Subject', value: subject },
        { name: 'Mood', value: mood },
        { name: 'Negative', value: negative ? 'True' : 'False'},
    ]
    return <div className="w-full h-full grid grid-cols-3">
        <div className='col-span-2'>
            <Editor entry={entry} />
        </div>
        <div className='border-l border-white/85'>
            <div className= "px-4 py-10" style={{backgroundColor: color}}>
                <h2 className="text-2xl">Analysis</h2>
            </div>
            <div>
                <ul>
                    {analysisData.map((item) => (
                        <li key={item.name} className="px-2 py-4 flex justify-between items-center border-b border-t border-white/85">
                            <span className='text-lg font-semibold'>{item.name}</span>
                            <span className= ''>{item.value}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    </div>
}

export default EntryPage;