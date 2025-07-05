import { GoogleGenerativeAI } from '@google/generative-ai';
const genAI = new GoogleGenerativeAI('AIzaSyAv0B4oTjzUF59thIe-pbpwsFdG-hRd2KY');

const GetModel = {
  GeminiProModel: () => {
    return genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
  }
};

export const GeminiModel = {
  GenerateContentStream: (prompt, onDataReceived, handleResult) => {
    const model = GetModel.GeminiProModel();
    // generate content
    const generateContent = async () => {
      const result = await model.generateContentStream([prompt]);
      for await (const chunk of result.stream) {
        const chunkText = chunk.text();
        // Gọi callback với dữ liệu chunkText mỗi khi nhận được
        onDataReceived(chunkText);
      }
      handleResult(false);
    };
    generateContent();
  },
  GenerateWithFineTuning: (prompt, onDataReceived, handleResult) => {},
  GenerateWithHistory: async (historyChat, question, responseQuestion) => {
    const model = GetModel.GeminiProModel();
    const chat = model.startChat({
      history: historyChat
    });
    const msg = question;
    const result = await chat.sendMessage(msg + 'Câu trả lời khoảng 100 từ');
    const text = result.response.text();
    console.log(text);
    responseQuestion(text);
  }
};
