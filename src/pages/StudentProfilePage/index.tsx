import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';
import axios from 'axios';
import __helpers from '@/helpers';

export default function StudentProfilePage() {
  const [form, setForm] = useState({
    userId: '',
    description: '',
    fullName: '',
    highSchoolGpa: '',
    note: '',
    isActive: true,
    createDate: new Date().toISOString(),
    createBy: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    try {
      const userInfoStr = __helpers.cookie_get('USER_INFO');
      if (userInfoStr) {
        const userInfo = JSON.parse(userInfoStr);
        setForm((prev) => ({
          ...prev,
          userId: userInfo.id || userInfo.userId || '',
          createBy: userInfo.name || userInfo.email || ''
        }));
      }
    } catch (e) {}
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]:
        type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const payload = {
        ...form,
        highSchoolGpa: Number(form.highSchoolGpa)
      };
      const res = await axios.post(
        'https://thinhthpse183083-001-site1.qtempurl.com/api/student-profiles',
        payload
      );
      const studentId = res.data.studentId;
      if (studentId) {
        __helpers.cookie_set('STUDENT_PROFILE_ID', studentId);
      }
      toast({
        title: 'Tạo hồ sơ thành công',
        description: 'Thông tin hồ sơ đã được lưu.'
      });
      window.location.href = '/chat';
    } catch (error: any) {
      toast({
        title: 'Lỗi',
        description:
          error?.response?.data?.message ||
          'Không thể tạo hồ sơ, vui lòng thử lại.',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg space-y-4 rounded bg-white p-8 shadow"
      >
        <h2 className="mb-4 text-2xl font-bold">Student Profile</h2>
        <div>
          <Label htmlFor="fullName">Họ và tên</Label>
          <Input
            id="fullName"
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="description">Mô tả</Label>
          <Input
            id="description"
            name="description"
            value={form.description}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label htmlFor="highSchoolGpa">Điểm GPA cấp 3</Label>
          <Input
            id="highSchoolGpa"
            name="highSchoolGpa"
            type="number"
            step="0.01"
            value={form.highSchoolGpa}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="note">Ghi chú</Label>
          <Input
            id="note"
            name="note"
            value={form.note}
            onChange={handleChange}
          />
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="isActive"
            name="isActive"
            checked={form.isActive}
            onChange={handleChange}
          />
          <Label htmlFor="isActive">Kích hoạt</Label>
        </div>
        <div>
          <Label htmlFor="createDate">Ngày tạo</Label>
          <Input
            id="createDate"
            name="createDate"
            type="datetime-local"
            value={form.createDate.slice(0, 16)}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="createBy">Người tạo</Label>
          <Input
            id="createBy"
            name="createBy"
            value={form.createBy}
            onChange={handleChange}
            required
          />
        </div>
        <Button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700"
          disabled={isLoading}
        >
          {isLoading ? 'Đang lưu...' : 'Tạo hồ sơ'}
        </Button>
      </form>
    </div>
  );
}
