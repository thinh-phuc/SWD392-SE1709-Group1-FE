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
            <button
              className="mt-6 rounded-lg bg-blue-500 px-6 py-3 font-semibold text-white shadow transition hover:bg-blue-600"
              onClick={() => router.push('/login')}
            >
              Go to Login
            </button>
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

                {/* Settings/Edit button */}
                <button
                  type="button"
                  className="absolute right-4 top-4 z-10 rounded-full bg-gray-100 p-2 text-gray-500 transition hover:bg-blue-100 hover:text-blue-600"
                  onClick={(e) => {
                    e.stopPropagation();
                    router.push(`/profile-edit/${profile.studentId}`);
                  }}
                  title="Edit Profile"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15.232 5.232l3.536 3.536M9 13l6.536-6.536a2 2 0 112.828 2.828L11.828 15.828a2 2 0 01-2.828 0L9 13zm0 0V17h4"
                    />
                  </svg>
                </button>

                <div className="text-center">
                  <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border-4 border-blue-400 bg-gradient-to-r from-blue-100 to-indigo-100 shadow-lg">
                    {profile.imageUrl ? (
                      <img
                        src={profile.imageUrl}
                        alt={profile.fullName}
                        className="h-full w-full rounded-full object-cover"
                      />
                    ) : (
                      <svg
                        className="h-12 w-12 text-blue-300"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <circle cx="12" cy="8" r="4" />
                        <path d="M6 20c0-2.5 3.5-4 6-4s6 1.5 6 4" />
                      </svg>
                    )}
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
