
'use client'

import { useState } from "react";

const Question = () => {

    const [value, setValue] = useState('');
    const onChange = (e) => {
        setValue(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        // what's gonna happen when this handleSubmit is triggered?
    }

    return <div>
        <form >
            <input
            onChange={onChange}
            className="border border-white/20 px-4 py-2 text-lg rounded-lg text-black" 
            value= {value} 
            type="text" 
            placeholder="Ask a question" />
            <button type='submit' className='bg-blue-400 px-4 py-2 rounded-lg text-white text-lg'>Ask</button>
        </form>
    </div>

}

export default Question;