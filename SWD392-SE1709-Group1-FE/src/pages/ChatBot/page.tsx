'use client';

import type React from 'react';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Send,
  Bot,
  User,
  Menu,
  Plus,
  MessageSquare,
  GraduationCap,
  BookOpen,
  Users,
  MapPin
} from 'lucide-react';
import { cn } from '@/lib/utils';
import __helpers from '@/helpers';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  suggestions?: string[];
}

interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
}

export default function FPTUniversityAdvisor() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentConversationId, setCurrentConversationId] = useState<
    string | null
  >(null);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [sessionId, setSessionId] = useState<number>(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Set cứng studentId để test
  let studentId = 6;

  const currentConversation = conversations.find(
    (c) => c.id === currentConversationId
  );

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [currentConversation?.messages]);

  const createNewConversation = () => {
    const newConversation: Conversation = {
      id: Date.now().toString(),
      title: 'Tư vấn mới',
      messages: [],
      createdAt: new Date()
    };
    setConversations((prev) => [newConversation, ...prev]);
    setCurrentConversationId(newConversation.id);
  };

  const updateConversationTitle = (
    conversationId: string,
    firstMessage: string
  ) => {
    const title =
      firstMessage.length > 30
        ? firstMessage.substring(0, 30) + '...'
        : firstMessage;
    setConversations((prev) =>
      prev.map((conv) =>
        conv.id === conversationId ? { ...conv, title } : conv
      )
    );
  };

  const sendMessage = async (messageText?: string) => {
    const messageContent = messageText || input.trim();
    if (!messageContent) return;
    if (!studentId || isNaN(studentId)) {
      alert('Không tìm thấy mã sinh viên hợp lệ. Vui lòng đăng nhập lại!');
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      content: messageContent,
      role: 'user',
      timestamp: new Date()
    };

    let targetConversationId = currentConversationId;

    // Tạo conversation mới nếu chưa có
    if (!targetConversationId) {
      const newConversation: Conversation = {
        id: Date.now().toString(),
        title:
          messageContent.length > 30
            ? messageContent.substring(0, 30) + '...'
            : messageContent,
        messages: [],
        createdAt: new Date()
      };
      setConversations((prev) => [newConversation, ...prev]);
      targetConversationId = newConversation.id;
      setCurrentConversationId(targetConversationId);
    }

    // Thêm tin nhắn user
    setConversations((prev) =>
      prev.map((conv) =>
        conv.id === targetConversationId
          ? {
              ...conv,
              messages: [...conv.messages, userMessage]
            }
          : conv
      )
    );

    // Cập nhật title nếu đây là tin nhắn đầu tiên
    const currentConv = conversations.find(
      (c) => c.id === targetConversationId
    );
    if (!currentConv || currentConv.messages.length === 0) {
      updateConversationTitle(targetConversationId, messageContent);
    }

    setInput('');
    setIsLoading(true);

    try {
      // Lấy token từ cookie AT
      const token = __helpers.cookie_get('AT');
      // Gửi API thực tế với StudentId, SessionId, Message và token
      const res = await fetch(
        'https://thinhthpse183083-001-site1.qtempurl.com/api/chats/messages',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            message: messageContent,
            sessionId: sessionId,
            studentId: studentId
          })
        }
      );
      const data = await res.json();
      // API trả về { SessionId, Reply }
      setSessionId(data.sessionId || 0);
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: data.reply || 'Không có phản hồi từ hệ thống.',
        role: 'assistant',
        timestamp: new Date()
      };
      setConversations((prev) =>
        prev.map((conv) =>
          conv.id === targetConversationId
            ? {
                ...conv,
                messages: [...conv.messages, botResponse]
              }
            : conv
        )
      );
    } catch (err) {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: 'Xin lỗi, hệ thống không thể trả lời lúc này.',
        role: 'assistant',
        timestamp: new Date()
      };
      setConversations((prev) =>
        prev.map((conv) =>
          conv.id === targetConversationId
            ? {
                ...conv,
                messages: [...conv.messages, botResponse]
              }
            : conv
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    sendMessage(suggestion);
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-orange-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      {/* Sidebar */}
      <div
        className={cn(
          'flex flex-col bg-gradient-to-b from-orange-600 to-orange-700 text-white shadow-xl transition-all duration-300',
          sidebarOpen ? 'w-80' : 'w-0 overflow-hidden'
        )}
      >
        <div className="border-b border-orange-500 p-6">
          <div className="mb-4 flex items-center space-x-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white">
              <GraduationCap className="h-6 w-6 text-orange-600" />
            </div>
            <div>
              <h2 className="text-lg font-bold">FPT University</h2>
              <p className="text-sm text-orange-100">AI Advisor</p>
            </div>
          </div>
          <Button
            onClick={createNewConversation}
            className="w-full border border-white/20 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20"
          >
            <Plus className="mr-2 h-4 w-4" />
            Tư vấn mới
          </Button>
        </div>

        <ScrollArea className="flex-1 p-4">
          <div className="space-y-2">
            {conversations.map((conversation) => (
              <Button
                key={conversation.id}
                variant={
                  currentConversationId === conversation.id
                    ? 'secondary'
                    : 'ghost'
                }
                className={cn(
                  'h-auto w-full justify-start rounded-lg p-3 text-left text-sm',
                  currentConversationId === conversation.id
                    ? 'bg-white/20 text-white backdrop-blur-sm'
                    : 'text-orange-100 hover:bg-white/10 hover:text-white'
                )}
                onClick={() => setCurrentConversationId(conversation.id)}
              >
                <MessageSquare className="mr-2 h-4 w-4 flex-shrink-0" />
                <span className="truncate">{conversation.title}</span>
              </Button>
            ))}
          </div>
        </ScrollArea>

        <div className="space-y-2 border-t border-orange-500 p-4">
          <div className="space-y-1 text-xs text-orange-100">
            <div className="flex items-center space-x-2">
              <MapPin className="h-3 w-3" />
              <span>Hà Nội • TP.HCM • Đà Nẵng</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="h-3 w-3" />
              <span>Hotline: 1900 9090</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex flex-1 flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 bg-white/80 p-4 shadow-sm backdrop-blur-sm">
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-gray-600"
            >
              <Menu className="h-5 w-5" />
            </Button>
            <div className="flex items-center space-x-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-orange-500 to-blue-500">
                <GraduationCap className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="bg-gradient-to-r from-orange-600 to-blue-600 bg-clip-text text-xl font-bold text-transparent">
                  FPT University AI Advisor
                </h1>
                <p className="text-sm text-gray-600">
                  Tư vấn tuyển sinh & chọn ngành
                </p>
              </div>
            </div>
          </div>
          <Badge variant="secondary" className="bg-green-100 text-green-700">
            <div className="mr-2 h-2 w-2 animate-pulse rounded-full bg-green-500"></div>
            Online
          </Badge>
        </div>

        {/* Messages Area */}
        <ScrollArea className="flex-1 p-6">
          {!currentConversation || currentConversation.messages.length === 0 ? (
            <div className="mx-auto flex h-full max-w-2xl flex-col items-center justify-center space-y-6 text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-orange-500 to-blue-500 shadow-lg">
                <GraduationCap className="h-10 w-10 text-white" />
              </div>
              <div>
                <h2 className="mb-3 bg-gradient-to-r from-orange-600 to-blue-600 bg-clip-text text-3xl font-bold text-transparent">
                  Chào mừng đến với FPT University!
                </h2>
                <p className="text-lg leading-relaxed text-gray-600">
                  Tôi là AI Advisor, sẵn sàng hỗ trợ bạn tìm hiểu về các chương
                  trình đào tạo, điều kiện tuyển sinh và cơ hội nghề nghiệp tại
                  FPT University.
                </p>
              </div>
              <div className="grid w-full max-w-md grid-cols-2 gap-3">
                {[
                  'Các ngành học',
                  'Học phí & học bổng',
                  'Tuyển sinh 2024',
                  'Cơ hội việc làm'
                ].map((topic) => (
                  <Button
                    key={topic}
                    variant="outline"
                    className="h-12 border-2 border-orange-200 bg-transparent text-sm hover:border-orange-400 hover:bg-orange-50"
                    onClick={() => handleSuggestionClick(topic)}
                  >
                    {topic}
                  </Button>
                ))}
              </div>
            </div>
          ) : (
            <div className="mx-auto max-w-4xl space-y-6">
              {currentConversation.messages.map((message) => (
                <div key={message.id} className="space-y-4">
                  <div
                    className={cn(
                      'flex space-x-4',
                      message.role === 'user' ? 'justify-end' : 'justify-start'
                    )}
                  >
                    {message.role === 'assistant' && (
                      <Avatar className="h-10 w-10 bg-gradient-to-r from-orange-500 to-blue-500 shadow-md">
                        <AvatarFallback className="bg-transparent">
                          <Bot className="h-5 w-5 text-white" />
                        </AvatarFallback>
                      </Avatar>
                    )}

                    <Card
                      className={cn(
                        'max-w-[85%] p-4 shadow-md',
                        message.role === 'user'
                          ? 'border-0 bg-gradient-to-r from-blue-600 to-blue-700 text-white'
                          : 'border border-gray-200 bg-white'
                      )}
                    >
                      <div className="prose prose-sm max-w-none">
                        <p className="m-0 whitespace-pre-wrap text-sm leading-relaxed">
                          {message.content}
                        </p>
                      </div>
                      <p
                        className={cn(
                          'mt-3 text-xs opacity-70',
                          message.role === 'user'
                            ? 'text-blue-100'
                            : 'text-gray-500'
                        )}
                      >
                        {message.timestamp.toLocaleTimeString('vi-VN', {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </Card>

                    {message.role === 'user' && (
                      <Avatar className="h-10 w-10 bg-gray-100 shadow-md">
                        <AvatarFallback>
                          <User className="h-5 w-5 text-gray-600" />
                        </AvatarFallback>
                      </Avatar>
                    )}
                  </div>

                  {/* Suggestions */}
                  {message.role === 'assistant' && message.suggestions && (
                    <div className="ml-14 flex flex-wrap gap-2">
                      {message.suggestions.map((suggestion, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          className="h-8 border-orange-200 bg-transparent text-xs hover:border-orange-400 hover:bg-orange-50"
                          onClick={() => handleSuggestionClick(suggestion)}
                        >
                          {suggestion}
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start space-x-4">
                  <Avatar className="h-10 w-10 bg-gradient-to-r from-orange-500 to-blue-500 shadow-md">
                    <AvatarFallback className="bg-transparent">
                      <Bot className="h-5 w-5 text-white" />
                    </AvatarFallback>
                  </Avatar>
                  <Card className="border border-gray-200 bg-white p-4 shadow-md">
                    <div className="flex space-x-1">
                      <div className="h-2 w-2 animate-bounce rounded-full bg-orange-400"></div>
                      <div
                        className="h-2 w-2 animate-bounce rounded-full bg-orange-400"
                        style={{ animationDelay: '0.1s' }}
                      ></div>
                      <div
                        className="h-2 w-2 animate-bounce rounded-full bg-orange-400"
                        style={{ animationDelay: '0.2s' }}
                      ></div>
                    </div>
                  </Card>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          )}
        </ScrollArea>

        {/* Input Area */}
        <div className="border-t border-gray-200 bg-white/80 p-6 shadow-lg backdrop-blur-sm">
          <div className="mx-auto max-w-4xl">
            <div className="flex space-x-4">
              <div className="relative flex-1">
                <Input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Hỏi tôi về FPT University..."
                  disabled={isLoading}
                  className="rounded-xl border-2 border-gray-200 py-4 pr-12 text-sm shadow-sm focus:border-orange-400"
                />
                <Button
                  onClick={() => sendMessage()}
                  disabled={!input.trim() || isLoading}
                  size="sm"
                  className="absolute right-2 top-1/2 -translate-y-1/2 transform rounded-lg bg-gradient-to-r from-orange-500 to-blue-500 text-white hover:from-orange-600 hover:to-blue-600"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="mt-3 flex items-center justify-between">
              <p className="text-xs text-gray-500">
                Nhấn Enter để gửi • Shift + Enter để xuống dòng
              </p>
              <div className="flex items-center space-x-2 text-xs text-gray-500">
                <BookOpen className="h-3 w-3" />
                <span>Powered by FPT University</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
