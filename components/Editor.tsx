'use client'

import { useState } from "react";
import { useAutosave } from "react-autosave";
import { updateEntry } from "@/utils/api";

const Editor = ({ entry }: any) => {
    const [value, setValue] = useState(entry.content)
    const [isLoading, setIsLoading] = useState(false)

    useAutosave({
        data: value,
        onSave: async (_value) => {
            setIsLoading(true)
            const updated = await updateEntry(entry.id, _value)
            setIsLoading(false)
        }
    })
    return (
        <div className='w-full h-full'>
            {isLoading && <div>...Loading</div>}
            <textarea 
            className='w-full h-full p-4 text-xl bg-zinc-400/10 rounded-lg shadow-inner'
            value={value} 
            onChange={(e) => setValue(e.target.value)} />
        </div>
    )
}

export default Editor;