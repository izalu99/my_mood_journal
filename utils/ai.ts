
import { OpenAI } from '@langchain/openai'
//import { StructuredOutputParser } from 'langchain/output_parsers'
import { StructuredOutputParser } from '@langchain/core/output_parsers'
import z from 'zod'
import { PromptTemplate } from '@langchain/core/prompts'

export const analyze = async (prompt:any) => {

    //const model = new OpenAI({temperature:0, model: 'gpt-3.5-turbo', apiKey: process.env.OPENAI_API_KEY})
    const model = new OpenAI({temperature:0, model: 'gpt-3.5-turbo'})
    const result = await model.invoke(prompt)
    console.log(result)

}