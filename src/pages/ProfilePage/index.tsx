import { useEffect, useState } from 'react';
import __helpers from '@/helpers';
import BaseRequest from '@/config/axios.config';
import { useRouter } from '@/routes/hooks';

export default function ProfilePage() {
  const [profiles, setProfiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await BaseRequest.Get(
          '/api/student-profiles/me?pageNumber=1&pageSize=20'
        );
        setProfiles(response.items || []);
        setLoading(false);
      } catch (err) {
        setError('Failed to load profiles');
        setLoading(false);
      }
    };
    fetchProfiles();
  }, []);

  const handleProfileClick = (studentId: string) => {
    __helpers.localStorage_set('selectedProfile', studentId);
    router.push(`/`);
  };

  const handleCreateProfile = () => {
    router.push('/profile-form');
  };

  if (loading)
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
          <p className="text-lg font-medium text-gray-700">
            Loading profiles...
          </p>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-red-50 to-pink-100">
        <div className="rounded-lg bg-white p-8 shadow-lg">
          <div className="text-center">
            <div className="mb-4 text-4xl">❌</div>
            <p className="text-lg font-medium text-red-600">{error}</p>
          </div>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 px-4 py-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold text-gray-800">
            Choose Your Profile
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Select an existing profile or create a new one to get started with
            your academic journey.
          </p>
        </div>

        <div className="grid grid-cols-1 justify-items-center gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {profiles.map((profile) => (
            <div
              key={profile.studentId}
              onClick={() => handleProfileClick(profile.studentId)}
              className="group relative w-full max-w-sm transform cursor-pointer transition-all duration-300 hover:scale-105"
            >
              <div className="relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-6 shadow-lg transition-all duration-300 hover:shadow-2xl">
                <div className="absolute left-0 top-0 h-2 w-full bg-gradient-to-r from-blue-500 to-indigo-600"></div>

                <div className="text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 text-2xl font-bold text-white shadow-lg">
                    {profile.fullName?.[0]?.toUpperCase() || '?'}
                  </div>

                  <h3 className="mb-2 text-xl font-bold text-gray-800">
                    {profile.fullName}
                  </h3>

                  <div className="mb-4 space-y-2">
                    <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                      <span className="font-medium">ID:</span>
                      <span className="rounded-full bg-gray-100 px-2 py-1 font-mono text-xs">
                        {profile.studentId}
                      </span>
                    </div>

                    <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                      <span className="font-medium">GPA:</span>
                      <span className="rounded-full bg-blue-100 px-2 py-1 font-bold text-blue-700">
                        {profile.highSchoolGpa}
                      </span>
                    </div>
                  </div>

                  {profile.note && (
                    <div className="mb-4 rounded-lg bg-gray-50 px-3 py-2">
                      <p className="line-clamp-2 text-xs italic text-gray-600">
                        "{profile.note}"
                      </p>
                    </div>
                  )}

                  {profile.isActive && (
                    <div className="flex justify-center">
                      <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                        <div className="h-2 w-2 rounded-full bg-green-500"></div>
                        Active
                      </span>
                    </div>
                  )}
                </div>

                <div className="pointer-events-none absolute inset-0 rounded-2xl border-2 border-transparent transition-colors duration-300 group-hover:border-blue-300"></div>
              </div>
            </div>
          ))}

          <div
            onClick={handleCreateProfile}
            className="group relative w-full max-w-sm transform cursor-pointer transition-all duration-300 hover:scale-105"
          >
            <div className="relative overflow-hidden rounded-2xl border-2 border-dashed border-blue-300 bg-white p-6 transition-all duration-300 hover:border-blue-500 hover:bg-blue-50 hover:shadow-lg">
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border-2 border-dashed border-blue-400 bg-blue-50 text-3xl font-bold text-blue-600 transition-all duration-300 group-hover:border-blue-600 group-hover:bg-blue-100">
                  +
                </div>

                <h3 className="mb-2 text-xl font-bold text-blue-600">
                  Create New Profile
                </h3>

                <p className="text-sm text-blue-500">
                  Start your academic journey by creating a new profile
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
