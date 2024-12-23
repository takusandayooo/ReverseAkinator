
import * as express from "express";
import * as path from "path";
import bodyParser = require('body-parser');


import { getEnvContent } from "./config";
import { WebSchema } from "./common.schema";
import { aiQuestion, checkingAnswer } from "./geminiAI";
import { searchInfoFromWikipedia } from "./searchWikipedia";


const app = express();
const port = 3000; // ポート番号
const { GEMINI_API_KEY } = getEnvContent();
// 静的ファイルを提供するミドルウェアを設定
app.use(express.static(path.join(__dirname, "template")));

// ルートにアクセスがあった場合にindex.htmlを送信
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "template", "index.html"));
});

app.get("/akinator", (req, res) => {
  res.sendFile(path.join(__dirname, "template", "akinator_main.html"));
});

app.get("/result", (req, res) => {
  res.sendFile(path.join(__dirname, "template", "result.html"));
});


app.use(bodyParser.json());
app.post("/ai_question", (req, res) => {
  const data = WebSchema.parse(req.body);
  console.log(data);
  const result = userQuestion(data);
  result.then((playlist) => {
    res.json(playlist);
  }).catch((error) => {
    res.status(500).json({ error: error.message });
  });
});
app.post("/checking_answer", (req, res) => {
  const data = WebSchema.parse(req.body);
  console.log(data);
  const result = checkingAnswerFromUserInput(data);
  result.then((playlist) => {
    res.json(playlist);
  }).catch((error) => {
    res.status(500).json({ error: error.message });
  });
});


// サーバーを起動してリクエストを待ち受け状態にする
app.listen(port, () => {
  console.log(`http://localhost:${port} へアクセスください`);
});
const userQuestion = async ({ answer, userInput }: WebSchema): Promise<string> => {
  const wikipediaData = await searchInfoFromWikipedia(answer);
  const result = await aiQuestion(GEMINI_API_KEY, userInput, wikipediaData);
  return result;
}
const checkingAnswerFromUserInput = async ({ answer, userInput }: WebSchema): Promise<string> => {
  const wikipediaData = await searchInfoFromWikipedia(answer);
  const result = await checkingAnswer(GEMINI_API_KEY, answer, userInput, wikipediaData);
  return result;
}