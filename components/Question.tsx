
'use client'

import { useState } from "react";
import { askQuestion } from "../utils/api";

const Question = () => {

    const [value, setValue] = useState('');
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState('')


    const onChange = (e) => {
        setValue(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        // what's gonna happen when this handleSubmit is triggered?
        setLoading(true)
        
        // get the answer of question from the api hook
        const answer = await askQuestion(value)
        setResponse(answer)
       
        //when done...
        setValue('')
        setLoading(false)
    }

    return <div>
        <form onSubmit={handleSubmit}>
            <input
            disabled={loading}
            onChange={onChange}
            className="border border-white/20 px-4 py-2 text-lg rounded-lg text-black" 
            value= {value} 
            type="text" 
            placeholder="Ask a question" />
            <button disabled={loading} type='submit' className='bg-blue-400 px-4 py-2 rounded-lg text-white text-lg'>Ask</button>
        </form>

        <div>
            {loading && <div>Loading...</div>}
            {response && <div>{response}</div>}
        </div>
    </div>

}

export default Question;