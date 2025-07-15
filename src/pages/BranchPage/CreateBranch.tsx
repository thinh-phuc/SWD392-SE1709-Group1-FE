import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createBranch } from '@/queries/branch.query';
import { Branch } from '@/types/branch.type';

const defaultBranch: Omit<Branch, 'branchId'> = {
  name: '',
  location: '',
  note: '',
  description: '',
  isActive: true
};

const CreateBranch = () => {
  const [form, setForm] = useState(defaultBranch);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createBranch({ ...form, isActive: true });
      navigate('/branches');
    } catch (err) {
      alert('Tạo branch thất bại!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto mt-10 max-w-md rounded bg-white p-6 shadow">
      <h2 className="mb-4 text-xl font-bold">Create Branch</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1 block">Tên campus</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full rounded border px-2 py-1"
          />
        </div>
        <div>
          <label className="mb-1 block">Địa điểm</label>
          <input
            name="location"
            value={form.location}
            onChange={handleChange}
            required
            className="w-full rounded border px-2 py-1"
          />
        </div>
        <div>
          <label className="mb-1 block">Ghi chú</label>
          <input
            name="note"
            value={form.note}
            onChange={handleChange}
            className="w-full rounded border px-2 py-1"
          />
        </div>
        <div>
          <label className="mb-1 block">Mô tả</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full rounded border px-2 py-1"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="rounded bg-blue-500 px-4 py-2 text-white"
        >
          {loading ? 'Đang tạo...' : 'Tạo branch'}
        </button>
      </form>
    </div>
  );
};

export default CreateBranch;
