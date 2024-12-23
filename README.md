# AIが考えているものを当てよう！！ (Akinator)
## 概要
このプロジェクトは、ユーザーがAIに質問をして、AIが考えているものを当てるゲームです。デフォルトではプログラミング言語を対象にしていますが、独自のCSVファイルをアップロードすることで、さまざまなテーマに対応可能です。

### デプロイ済みのアプリはこちらから確認できます：
👉 [AIが考えているものを当てよう！！](https://reverseakinator.onrender.com/)  
※無料プランでデプロイしているため、初回アクセスには少し時間がかかる場合があります。

---
## 使用技術

- Node.js: フロントエンドフレームワーク
- TypeScript: 型安全な開発のため
- WikipediaAPI: 事前情報を取得するため
- GeminiAI: 入力されたテキストからYES/NOの質問を生成するため

## GeminiAIのAPIキーを取得する方法
GoogleのGeminiAPIを利用するためにAPIキーが必要です。詳細な手順は公式ドキュメントをご覧ください：  
👉 [GeminiAPIドキュメント](https://ai.google.dev/gemini-api/docs?hl=ja)

## アプリの使い方
1. このレポジトリをクローン
   ```bash
   git clone https://github.com/takusandayooo/ReverseAkinator
   cd ReverseAkinator
   ```
2. VSCode Dev Container拡張機能とDockerをインストール

   Dev Containerの拡張機能は[こちら](https://code.visualstudio.com/docs/devcontainers/containers)を参照。  
   Dockerは[公式サイト](https://www.docker.com/)からインストール。

3. APIキーを環境変数に設定
- 取得したAPIキーを.envファイルに記入します。
- .env.exampleを参考に、以下のように設定してください：
   ```bash
   GEMINI_API_KEY=your_api_key
   ```
4. 依存関係をインストール
   ```bash
   pnpm install
   ```
5. 開発サーバーを起動
   ```bash
   pnpm start
   ```
6. ブラウザでアクセス  
開発サーバーが起動したら、以下にアクセスしてください：  
👉 http://localhost:3000 以下のような画面が出たら成功です！！！

7. テストを実行
   ```bash
   pnpm test
   ```
   WikipediaAPIとGeminiAPIのテストが実行されます。