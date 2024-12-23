import {searchInfoFromWikipedia} from './searchWikipedia';
import {aiQuestion,checkingAnswer} from './geminiAI';
import {getEnvContent} from './config';

const {GEMINI_API_KEY} = getEnvContent();

describe('searchInfoFromWikipedia', () => {
	it('should return a string', async () => {
		const result = await searchInfoFromWikipedia('JavaScript');
		console.log(result);
		expect(typeof result).toBe('string');
	});
	it('should return a string', async () => {
		const result = await searchInfoFromWikipedia('JavaScript');
		expect(result).toMatch(/JavaScript/);
	});
});


describe('aiQuestion', () => {
	it('should return a string', async () => {
		const result = await aiQuestion( 'フロントエンドの言語ですか？',GEMINI_API_KEY , 'HTMLはフロントエンドの言語でwebサイトで使用されます。');
		console.log(result);
		expect(typeof result).toBe('string');
	});
});

describe('checkingAnswer', () => {
	it('should return a string', async () => {
		const result = await checkingAnswer(GEMINI_API_KEY, 'HTML', 'HTML', 'HTMLはフロントエンドの言語でwebサイトで使用されます。');
		console.log(result);
		expect(result).toMatch(/はい/);
		expect(typeof result).toBe('string');
	});
	it('should return a string', async () => {
		const result = await checkingAnswer(GEMINI_API_KEY, 'HTML', 'CSS', 'HTMLはフロントエンドの言語でwebサイトで使用されます。');
		console.log(result);
		expect(result).toMatch(/いいえ/);
		expect(typeof result).toBe('string');
	});
});