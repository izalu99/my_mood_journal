'use client'

import { useState } from "react";
import { useAutosave } from "react-autosave";
import { updateEntry } from "@/utils/api";

const Editor = ({ entry }: any) => {
    const [value, setValue] = useState(entry.content)
    const [isLoading, setIsLoading] = useState(false)
    const [analysis, setAnalysis] = useState(entry.analysis)

    const { mood, summary, color, subject, negative } = analysis;
    const analysisData = [
        { name: 'Summary', value:  summary},
        { name: 'Subject', value: subject },
        { name: 'Mood', value: mood },
        { name: 'Negative', value: negative ? 'True' : 'False'},
    ]

    useAutosave({
        data: value,
        onSave: async (_value) => {
            setIsLoading(true)
            const data = await updateEntry(entry.id, _value)
            setAnalysis(data.analysis)
            setIsLoading(false)
        }
    })

    
    return (
        <div className='w-full h-full grid grid-cols-3'>
            <div className='col-span-2'>
                {isLoading && <div>...Loading</div>}
                <textarea 
                className='w-full h-full p-4 text-xl bg-zinc-400/10 rounded-lg shadow-inner'
                value={value} 
                onChange={(e) => setValue(e.target.value)} />
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
    )
}

export default Editor;