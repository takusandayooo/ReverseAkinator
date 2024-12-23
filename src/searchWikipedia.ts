import axios from 'axios';
import { parseStringPromise } from 'xml2js';

export const searchInfoFromWikipedia = async (answer: string): Promise<string> => {
    const url = `https://ja.wikipedia.org/w/api.php?format=xml&action=query&prop=revisions&titles=${answer}&rvprop=content`;
    try {
        const response = await axios.get(url);
        // console.log(response.data);
        const result = await parseStringPromise(response.data);
        // XMLの内容から<rev>タグを抽出
        const revContent = result.api.query[0].pages[0].page[0].revisions[0].rev[0]._;
        return revContent;
    } catch (error) {
        console.error('Error fetching data from Wikipedia:', error);
        return '';
    }
};