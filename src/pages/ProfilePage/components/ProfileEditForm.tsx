import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  useGetStudentProfileById,
  useUpdateStudentProfile
} from '@/queries/student.query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { uploadToCloudinary } from '@/cloudinary/cloudinaryConfig';
import { toast } from '@/components/ui/use-toast';

export default function ProfilePage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    id: '',
    fullName: '',
    highSchoolGpa: '',
    note: '',
    imageUrl: '',
    hollandType: '',
    description: ''
  });
  const [files, setFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [loading, setLoading] = useState(false);

  const { data: profile, isLoading: isLoadingProfile } =
    useGetStudentProfileById(id || '');
  const updateStudentProfile = useUpdateStudentProfile();

  useEffect(() => {
    if (profile) {
      setForm({
        id: profile.id || '',
        fullName: profile.fullName || '',
        highSchoolGpa: profile.highSchoolGpa?.toString() || '',
        note: profile.note || '',
        imageUrl: profile.imageUrl || '',
        hollandType: profile.hollandType || '',
        description: profile.description || ''
      });
    }
  }, [profile]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const uploadImage = async (): Promise<string> => {
    if (!files.length) return form.imageUrl;

    setIsUploading(true);
    try {
      const imageUrl = await uploadToCloudinary(files[0]);
      setIsUploading(false);
      return imageUrl;
    } catch (error) {
      setIsUploading(false);
      console.error('Error uploading image:', error);
      throw error;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const imageUrl = await uploadImage();

      const updatedProfile = {
        ...form,
        id: id,
        imageUrl,
        highSchoolGpa: parseFloat(form.highSchoolGpa)
      };

      await updateStudentProfile.mutateAsync(updatedProfile);

      toast({
        title: 'Profile Updated',
        description: 'Your profile has been updated successfully.'
      });

      navigate('/profile');
    } catch (error) {
      toast({
        title: 'Update Failed',
        description: 'There was a problem updating your profile.',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  if (isLoadingProfile) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
          <p className="text-lg font-medium text-gray-700">
            Loading profile...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 px-4 py-8">
      <div className="mx-auto max-w-2xl">
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-3xl font-bold text-gray-800">
            Edit Your Profile
          </h1>
          <p className="text-gray-600">Update your profile information</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 rounded-2xl border border-gray-100 bg-white p-8 shadow-xl"
        >
          <div className="mb-6">
            <div className="flex flex-col items-center">
              {(form.imageUrl || files.length > 0) && (
                <div className="mb-4">
                  <img
                    src={
                      files.length > 0
                        ? URL.createObjectURL(files[0])
                        : form.imageUrl
                    }
                    alt="Profile preview"
                    className="h-32 w-32 rounded-full border-2 border-blue-500 object-cover"
                  />
                </div>
              )}

              <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700">
                Profile Image
              </label>
              <label
                htmlFor="profile-image-upload"
                className="flex w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-blue-300 bg-blue-50 px-4 py-6 transition hover:border-blue-500 hover:bg-blue-100"
              >
                <svg
                  className="mb-2 h-8 w-8 text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7 16V8m0 0l-4 4m4-4l4 4M17 16V8m0 0l-4 4m4-4l4 4"
                  />
                </svg>
                <span className="text-sm font-medium text-blue-600">
                  Click or drag image here to upload
                </span>
                <span className="mt-1 text-xs text-gray-500">
                  PNG, JPG, JPEG up to 5MB
                </span>
                <input
                  id="profile-image-upload"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files && e.target.files.length > 0) {
                      setFiles([e.target.files[0]]);
                    }
                  }}
                  className="hidden"
                />
              </label>
              {form.imageUrl && !files.length && (
                <div className="mt-2 text-center text-sm text-gray-500">
                  <span className="font-medium text-blue-600">
                    Current profile image is saved
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700">
                Full Name
              </label>
              <Input
                type="text"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-500"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700">
                High School GPA
              </label>
              <Input
                type="number"
                name="highSchoolGpa"
                value={form.highSchoolGpa}
                onChange={handleChange}
                required
                min={0}
                max={10}
                step={0.01}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-500"
                placeholder="Enter your GPA (0-10)"
              />
            </div>

            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700">
                Description
              </label>
              <Input
                type="text"
                name="description"
                value={form.description}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-500"
                placeholder="Brief description about yourself"
              />
            </div>

            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700">
                Additional Notes
              </label>
              <textarea
                name="note"
                value={form.note}
                onChange={handleChange}
                rows={4}
                className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-500"
                placeholder="Any additional information you'd like to add..."
              />
            </div>

            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700">
                Holland Type
              </label>
              <select
                name="hollandType"
                value={form.hollandType}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900"
              >
                <option value="" disabled>
                  Select your Holland type
                </option>
                <option value="Realistic">Realistic</option>
                <option value="Investigative">Investigative</option>
                <option value="Artistic">Artistic</option>
                <option value="Social">Social</option>
                <option value="Enterprising">Enterprising</option>
                <option value="Conventional">Conventional</option>
              </select>
            </div>
          </div>

          <div className="flex gap-4 pt-6">
            <Button
              type="button"
              onClick={() => navigate('/profile')}
              className="flex-1 rounded-lg border border-gray-300 bg-white px-6 py-3 font-semibold text-gray-700"
              variant="outline"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading || isUploading}
              className="flex-1 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 px-6 py-3 font-semibold text-white shadow-lg"
            >
              {loading || isUploading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                  {isUploading ? 'Uploading...' : 'Saving...'}
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  Save Changes
                </div>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
