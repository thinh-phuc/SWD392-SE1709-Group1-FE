import React, { useState } from 'react';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { GeminiModel } from './gemini';
import ReactMarkdown from 'react-markdown';
import { Bot } from 'lucide-react';
interface GeminiAnalysisDialogProps {
  label?: string;
  data: any;
  generatePrompt: (data: any) => string;
}

export const GeminiAnalysisDialog: React.FC<GeminiAnalysisDialogProps> = ({
  label = 'Phân tích thông số',
  data,
  generatePrompt
}) => {
  const [open, setOpen] = useState(false);
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    const prompt = generatePrompt(data);
    setResponse('');
    setOpen(true);
    setLoading(true);

    GeminiModel.GenerateContentStream(
      prompt,
      (chunk) => setResponse((prev) => prev + chunk),
      () => setLoading(false)
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          onClick={handleClick}
          className="bg-orange-500/80 hover:bg-orange-500/90"
        >
          <Bot className="mr-2 h-4 w-4" />
          {label}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Kết quả phân tích</DialogTitle>
          <DialogDescription>
            Dưới đây là kết quả phân tích từ mô hình AI.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 max-h-96 overflow-y-auto whitespace-pre-wrap text-sm text-gray-800">
          {loading && (
            <p className="italic text-gray-500">Đang tải kết quả...</p>
          )}
          <ReactMarkdown>{response}</ReactMarkdown>
        </div>

        <DialogFooter>
          <Button onClick={() => setOpen(false)}>Đóng</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
