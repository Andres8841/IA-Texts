import axios from 'axios';

const COHERE_API_KEY = '9An6XqE1kxUqecUMmBGtXjgqEcimFjF1prlHNpYz';
const COHERE_API_GENERATE_URL = 'https://api.cohere.ai/generate';
const COHERE_API_DETECT_LENGUAGE_URL = 'https://api.cohere.ai/v1/detect-language';


export async function checkIsEnglish(input) {

    const options = {
        method: 'POST',
        url: `${COHERE_API_DETECT_LENGUAGE_URL}`,
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            authorization: `BEARER ${COHERE_API_KEY}`
        },
        data: { texts: [input] }
    };

    try {
        const response = await axios.request(options);

        const { results } = response.data;

        if (results && results.length > 0) {

            const [{ language_code }] = results;
            return language_code === 'en';

        }
    } catch (error) {
        console.error(error);
    }
}


export async function fixMyEnglish(input) {
    const data = {
        model: 'xlarge',
        prompt: `This is a spell chacker generator.
        --
        Incorrect sample: "I can has cheezburger?"
        Correct sample: "May I have a cheeseburger?"
        --
        Incorrect sample: "The man goed to the store."
        Correct sample: "The man went to the store."
        --
        Incorrect sample: "She dosn't like chocolat."
        Correct sample: "She doesn't like chocolate."
        --
        Incorrect sample: "I want too bee a famous righter."
        Correct sample: "I want to be a famous writer."
        --
        Incorrect sample: "I have red many bookes."
        Correct sample: "I have read many books."
        --
        Incorrect sample: "He runned as fast as he could."
        Correct sample: "He ran as fast as he could."
        --
        Incorrect sample: "They're going too the park."
        Correct sample: "They're going to the park."
        --
        Incorrect sample: "I can't beleive it!"
        Correct sample: "I can't believe it!"
        --
        Incorrect sample: "Let's go swiming at the beech."
        Correct sample: "Let's go swimming at the beach."
        --
        Incorrect sample: "She is a grate singger."
        Correct sample: "She is a great singer."
        --
        Incorrect sample: "${input}"
        Correct sample:`,
        max_tokens: 40,
        temperature: 0.3,
        k: 0,
        p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        stop_sequences: ['--'],
        return_likelihoods: 'NONE'
    };

    const response = await fetch(COHERE_API_GENERATE_URL, {
        method: 'POST',
        headers: {
            Authorization: `BEARER ${COHERE_API_KEY}`,
            'Content-Type': 'application/json',
            CohereVersion: '2022-12-06'
        },
        body: JSON.stringify(data)
    }).then(res => res.json());
    

    return response.
        text.replace('--', ' ')
        .replace(/"([^"]*)"/g, '$1') // Quita las comillas alrededor de la palabra
        .trim();

}


export async function generateParagraphsFromContext(contextText) {
    const data = {
        model: 'xlarge',
        prompt: contextText + '\n--',
        max_tokens: 200,
        temperature: 0.7,
        k: 0,
        p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        stop_sequences: ['--'],
        return_likelihoods: 'NONE'
    };

    const response = await fetch(COHERE_API_GENERATE_URL, {
        method: 'POST',
        headers: {
            Authorization: `BEARER ${COHERE_API_KEY}`,
            'Content-Type': 'application/json',
            CohereVersion: '2022-12-06'
        },
        body: JSON.stringify(data)
    }).then(res => res.json());

    return response.text
        .replace('--', ' ')
        .replace(/"([^"]*)"/g, '$1') // Quita las comillas alrededor de la palabra
        .trim();
}
