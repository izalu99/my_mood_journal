'use client'

import { createNewEntry } from "@/utils/api"
import { useRouter } from "next/navigation"


const NewEntryCard = () => {

    const router = useRouter()
    const date = new Date().toDateString();

    const handleOnClick = async () => {
        const data = await createNewEntry()
        router.push(`/journal/${data.id}`)
       
    }
    return (
        <div className='cursor-pointer overflow-hidden rounded-lg bg-black shadow'>
            <div className='px-4 py-5 sm:p-6'
                onClick={handleOnClick}
            >
                <div className='text-2xl'>+</div>
                <span className='text-3xl'>New Entry</span>
                <div>{date}</div>
            </div>
        </div>
    )
}

export default NewEntryCard;