import { GoogleGenerativeAI } from "@google/generative-ai";



export const aiQuestion = async (GEMINI_API_KEY: string, userInput: string, wikipediaData: string): Promise<string> => {
    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
                入力されるwikipediaのデータを用いて、ユーザが質問する内容に対して「はい」, 「いいえ」,「わからない」,「多分そう部分的にそう」,「多分違うそうでもない」のいずれか回答してください。説明などの追加情報は不要です。

                入力
                wikipedia情報: ${wikipediaData}
                ユーザの質問: ${userInput}
                `
    const result = await model.generateContentStream(prompt);
    let responseText = "";
    for await (const chunk of result.stream) {
        responseText += chunk.text();
    }
    console.log(responseText);
    return responseText;
}

export const checkingAnswer = async (GEMINI_API_KEY: string, answer: string, useranswer: string, wikipediaData: string): Promise<string> => {
    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
                入力されるwikipediaのデータを用いて、ユーザが回答をする内容に対してanswerの内容と一致するか確認してください。一致する場合は「はい」、一致しない場合は「いいえ」を回答してください。完全一致ではなく大文字小文字がぐちゃぐちゃでも構いません。ゆるく採点してください。説明などの追加情報は不要です。

                入力
                wikipedia情報: ${wikipediaData}
                システムの正解: ${answer}
                ユーザの回答: ${useranswer}
                `
    const result = await model.generateContentStream(prompt);
    let responseText = "";
    for await (const chunk of result.stream) {
        responseText += chunk.text();
    }
    return responseText;
}