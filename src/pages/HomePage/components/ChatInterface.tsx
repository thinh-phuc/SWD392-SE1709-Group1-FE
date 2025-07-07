import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useGetChatMessages, useSendMessage } from '@/queries/chat.query';
import { MessageBubble } from './MessageBubble';
import { Send, Menu, Bot } from 'lucide-react';

interface Message {
  messageId: number;
  sender: 'user' | 'ai';
  messageText: string;
  createdAt: string;
}

interface ChatInterfaceProps {
  sessionId: number | null;
  studentId: number;
  onSessionCreated: (sessionId: number) => void;
  onToggleSidebar: () => void;
}

export function ChatInterface({
  sessionId,
  studentId,
  onSessionCreated,
  onToggleSidebar
}: ChatInterfaceProps) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { data: chatMessages = [], isLoading } = useGetChatMessages(
    sessionId || 0
  );
  const sendMessageMutation = useSendMessage();

  useEffect(() => {
    if (chatMessages.length > 0) {
      setMessages(chatMessages);
    } else if (sessionId === null) {
      setMessages([]);
    }
  }, [chatMessages, sessionId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = message.trim();
    setMessage('');

    // Add user message to local state immediately
    const newUserMessage: Message = {
      messageId: Date.now(),
      sender: 'user',
      messageText: userMessage,
      createdAt: new Date().toISOString()
    };
    setMessages((prev) => [...prev, newUserMessage]);

    try {
      const response = await sendMessageMutation.mutateAsync({
        message: userMessage,
        sessionId: sessionId || 0,
        studentId: studentId
      });

      // If it's a new session, update the session ID
      if (sessionId === null && response.sessionId) {
        onSessionCreated(response.sessionId);
      }

      // Add AI response to local state
      const aiMessage: Message = {
        messageId: Date.now() + 1,
        sender: 'ai',
        messageText: response.reply,
        createdAt: new Date().toISOString()
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      // Remove the user message if sending failed
      setMessages((prev) =>
        prev.filter((msg) => msg.messageId !== newUserMessage.messageId)
      );
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-200 bg-white p-4">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleSidebar}
            className="md:hidden"
          >
            <Menu className="h-4 w-4" />
          </Button>
          <div className="flex items-center gap-2">
            <Bot className="h-6 w-6 text-blue-600" />
            <h1 className="text-xl font-semibold text-gray-800">
              {sessionId ? `Chat Session #${sessionId}` : 'New Chat'}
            </h1>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <ScrollArea className="flex-1 p-4">
        <div className="mx-auto max-w-4xl space-y-4">
          {isLoading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex gap-3">
                  <div className="h-8 w-8 animate-pulse rounded-full bg-gray-200" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 animate-pulse rounded bg-gray-200" />
                    <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200" />
                  </div>
                </div>
              ))}
            </div>
          ) : messages.length === 0 ? (
            <div className="py-12 text-center">
              <Bot className="mx-auto mb-4 h-12 w-12 text-gray-300" />
              <h3 className="mb-2 text-lg font-medium text-gray-800">
                Start a conversation
              </h3>
              <p className="text-gray-500">
                Ask me anything about your academic journey or career guidance!
              </p>
            </div>
          ) : (
            messages.map((msg) => (
              <MessageBubble
                key={msg.messageId}
                message={msg}
                isLoading={
                  sendMessageMutation.isPending &&
                  msg.messageId === messages[messages.length - 1]?.messageId
                }
              />
            ))
          )}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* Input Area */}
      <div className="border-t border-gray-200 bg-white p-4">
        <div className="mx-auto max-w-4xl">
          <div className="flex gap-2">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="flex-1"
              disabled={sendMessageMutation.isPending}
            />
            <Button
              onClick={handleSendMessage}
              disabled={!message.trim() || sendMessageMutation.isPending}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
