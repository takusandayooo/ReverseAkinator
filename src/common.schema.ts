import { z } from 'zod';

//NOTE: webサイトの入力フォームのスキーマ
export const WebSchema = z.object({
  answer: z.string(),
  userInput: z.string(),
});
export type WebSchema = z.infer<typeof WebSchema>;
