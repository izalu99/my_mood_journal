
import { OpenAI } from '@langchain/openai'
//import { StructuredOutputParser } from 'langchain/output_parsers'
import { StructuredOutputParser } from '@langchain/core/output_parsers'
import z from 'zod'
import { PromptTemplate } from '@langchain/core/prompts'



// this parser is used to format the output of the AI model to match the format instructions.
const parser = StructuredOutputParser.fromZodSchema(
    z.object({
        mood: z
        .string()
        .describe('The mood of the person who wrote the journal entry.'),
        summary: z.string().describe('A brief summary of the journal entry.'),
        subject: z.string().describe('The subject of the journal entry.'),
        negative: z.boolean().describe('Whether the journal entry is negative. I.e. does it contain negative emotions?'),
        color: z
        .string()
        .describe(
            'A hexadecimal color code that represents the mood of the journal entry. For example, #FF0000 represents red, which is often associated with anger or frustration.'
        ),
    })
)

// this function takes the content of the journal entry and formats it along with the instructions.
const getPrompt = async (content:any) => {
    
    // get the format instructions from the parser
    const format_instructions = parser.getFormatInstructions()

    // create a prompt template with the format instructions and the journal entry content
    const prompt = new PromptTemplate({
        template:
        'Analyze the following journal entry. Follow the instructions and format your response to match the format instructions, no matter what! \n{format_instructions}\n{entry}',
        inputVariables: ['entry'],
        partialVariables: {format_instructions},
    })

    // format the prompt with the journal entry content
    const input = await prompt.format({ entry: content })

    return input
}


export const analyze = async (content:any) => {

    const input = await getPrompt(content) // here the content is taken to be formatted along with the instructions.

    //const model = new OpenAI({temperature:0, model: 'gpt-3.5-turbo', apiKey: process.env.OPENAI_API_KEY})
    const model = new OpenAI({temperature:0, model: 'gpt-3.5-turbo'})
    const result = await model.invoke(input)
    //console.log(result)

    try{
        return parser.parse(result)
    } catch (e){
        console.log(e)
    }

}