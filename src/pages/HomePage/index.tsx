import { useState } from 'react';
import __helpers from '@/helpers';
import { ChatInterface } from './components/ChatInterface';
import { SessionSidebar } from './components/SessionSidebar';
import { useGetChatSessions } from '@/queries/chat.query';
import { useRouter } from '@/routes/hooks';

export default function HomePage() {
  const router = useRouter();
  const studentId = __helpers.localStorage_get('selectedProfile');
  const [selectedSessionId, setSelectedSessionId] = useState<number | null>(
    null
  );
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const { data: sessions = [], isLoading } = useGetChatSessions(studentId!);

  if (!studentId) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="mb-4 text-2xl font-bold text-gray-800">
            No Profile Selected
          </h2>
          <p className="text-gray-600">
            Please select a student profile to continue.
          </p>
          <button
            className="mt-6 rounded-lg bg-blue-500 px-6 py-3 font-semibold text-white shadow transition hover:bg-blue-600"
            onClick={() => router.push('/profile')}
          >
            Go to profiles page
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <SessionSidebar
        sessions={sessions}
        selectedSessionId={selectedSessionId}
        onSessionSelect={setSelectedSessionId}
        onNewChat={() => setSelectedSessionId(null)}
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        isLoading={isLoading}
      />

      {/* Main Chat Area */}
      <div className="flex flex-1 flex-col">
        <ChatInterface
          sessionId={selectedSessionId}
          studentId={parseInt(studentId)}
          onSessionCreated={setSelectedSessionId}
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        />
      </div>
    </div>
  );
}
