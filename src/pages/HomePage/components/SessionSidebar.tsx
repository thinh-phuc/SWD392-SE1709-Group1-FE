import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Plus, MessageSquare, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Session {
  sessionId: number;
  sessionStart: string;
  status: string;
  chatMessages: any[];
}

interface SessionSidebarProps {
  sessions: Session[];
  selectedSessionId: number | null;
  onSessionSelect: (sessionId: number) => void;
  onNewChat: () => void;
  isOpen: boolean;
  onToggle: () => void;
  isLoading: boolean;
}

export function SessionSidebar({
  sessions,
  selectedSessionId,
  onSessionSelect,
  onNewChat,
  isOpen,
  onToggle,
  isLoading
}: SessionSidebarProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString();
    }
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          'fixed inset-y-0 left-0 z-50 w-80 transform border-r border-gray-200 bg-white transition-transform duration-300 ease-in-out md:relative md:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="border-b border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-800">
                Chat Sessions
              </h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={onToggle}
                className="md:hidden"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <Button
              onClick={onNewChat}
              className="mt-3 w-full bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="mr-2 h-4 w-4" />
              New Chat
            </Button>
          </div>

          {/* Sessions List */}
          <ScrollArea className="flex-1">
            <div className="p-2">
              {isLoading ? (
                <div className="space-y-2">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="h-16 animate-pulse rounded-lg bg-gray-100"
                    />
                  ))}
                </div>
              ) : sessions.length === 0 ? (
                <div className="py-8 text-center text-gray-500">
                  <MessageSquare className="mx-auto mb-2 h-8 w-8 opacity-50" />
                  <p>No chat sessions yet</p>
                  <p className="text-sm">Start a new conversation!</p>
                </div>
              ) : (
                <div className="space-y-1">
                  {sessions.map((session) => (
                    <button
                      key={session.sessionId}
                      onClick={() => onSessionSelect(session.sessionId)}
                      className={cn(
                        'w-full rounded-lg border p-3 text-left transition-colors hover:bg-gray-50',
                        selectedSessionId === session.sessionId
                          ? 'border-blue-200 bg-blue-50'
                          : 'border-gray-200 bg-white'
                      )}
                    >
                      <div className="flex items-start justify-between">
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <MessageSquare className="h-4 w-4 flex-shrink-0 text-gray-400" />
                            <span className="truncate text-sm font-medium text-gray-800">
                              Chat Session #{session.sessionId}
                            </span>
                          </div>
                          <p className="mt-1 text-xs text-gray-500">
                            {formatDate(session.sessionStart)}
                          </p>
                        </div>
                        <div
                          className={cn(
                            'rounded-full px-2 py-1 text-xs font-medium',
                            session.status === 'Open'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-gray-100 text-gray-700'
                          )}
                        >
                          {session.status}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </ScrollArea>
        </div>
      </div>
    </>
  );
}
