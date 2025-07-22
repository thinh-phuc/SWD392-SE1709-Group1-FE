import { Bot, User } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Message {
  messageId: number;
  sender: 'user' | 'ai';
  messageText: string;
  createdAt: string;
}

interface MessageBubbleProps {
  message: Message;
  isLoading?: boolean;
}

export function MessageBubble({ message, isLoading }: MessageBubbleProps) {
  const isUser = message.sender === 'user';
  // +7 for Vietnam)
  const TIMEZONE_OFFSET_HOURS = 7;

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    // Add timezone offset in milliseconds
    date.setHours(date.getHours() + TIMEZONE_OFFSET_HOURS);
    return date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div
      className={cn(
        'flex max-w-4xl gap-3',
        isUser ? 'justify-end' : 'justify-start'
      )}
    >
      {!isUser && (
        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-100">
          <Bot className="h-4 w-4 text-blue-600" />
        </div>
      )}

      <div
        className={cn(
          'flex max-w-[70%] flex-col',
          isUser ? 'items-end' : 'items-start'
        )}
      >
        <div
          className={cn(
            'rounded-2xl px-4 py-2',
            isUser ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-800'
          )}
        >
          <p className="whitespace-pre-wrap text-sm leading-relaxed">
            {message.messageText}
          </p>
          {isLoading && (
            <div className="mt-2 flex items-center gap-1">
              <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400" />
              <div
                className="h-2 w-2 animate-bounce rounded-full bg-gray-400"
                style={{ animationDelay: '0.1s' }}
              />
              <div
                className="h-2 w-2 animate-bounce rounded-full bg-gray-400"
                style={{ animationDelay: '0.2s' }}
              />
            </div>
          )}
        </div>

        <span className="mt-1 px-2 text-xs text-gray-500">
          {formatTime(message.createdAt)}
        </span>
      </div>

      {isUser && (
        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gray-100">
          <User className="h-4 w-4 text-gray-600" />
        </div>
      )}
    </div>
  );
}
