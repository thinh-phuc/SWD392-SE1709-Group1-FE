import React, { useEffect, useState } from 'react';
import {
  getBranches,
  deleteBranch,
  updateBranch
} from '@/queries/branch.query';
import { Branch } from '@/types/branch.type';
import { useNavigate } from 'react-router-dom';

const BranchList = () => {
  const [branches, setBranches] = useState<Branch[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<Partial<Branch>>({});
  const navigate = useNavigate();

  const fetchBranches = async () => {
    setLoading(true);
    try {
      const res = await getBranches(page, pageSize);
      setBranches(res.items || []);
      setTotalPages(res.totalPages || 1);
    } catch (err) {
      alert('Lấy danh sách branch thất bại!');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBranches();
  }, [page]);

  const handleDelete = async (id: number) => {
    if (!window.confirm('Bạn có chắc muốn xóa chi nhánh này?')) return;
    try {
      await deleteBranch(id);
      fetchBranches();
    } catch (err) {
      alert('Xóa branch thất bại!');
    }
  };

  const startEdit = (branch: Branch) => {
    setEditingId(branch.branchId!);
    setEditForm({ ...branch });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({});
  };

  const handleEditChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setEditForm((prev) => ({
      ...prev,
      [name]:
        type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSave = async () => {
    if (!editingId) return;
    try {
      const branch = branches.find((b) => b.branchId === editingId);
      await updateBranch(editingId, {
        ...branch,
        ...editForm,
        updateBy: 'admin',
        description: editForm.description ?? branch?.description ?? ''
      });
      setEditingId(null);
      setEditForm({});
      fetchBranches();
    } catch (err) {
      alert('Cập nhật branch thất bại!');
    }
  };

  return (
    <div className="mx-auto mt-10 max-w-3xl rounded bg-white p-6 shadow">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold">Danh sách chi nhánh</h2>
        <button
          onClick={() => navigate('/branches/create')}
          className="rounded bg-blue-500 px-4 py-2 text-white"
        >
          Tạo mới
        </button>
      </div>
      <table className="mb-4 w-full border">
        <thead>
          <tr>
            <th className="border px-2 py-1">Tên</th>
            <th className="border px-2 py-1">Địa điểm</th>
            <th className="border px-2 py-1">Ghi chú</th>
            <th className="border px-2 py-1">Mô tả</th>
            {/* <th className="border px-2 py-1">Hoạt động</th> */}
            <th className="border px-2 py-1">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {branches
            .filter((branch) => branch.isActive)
            .map((branch) =>
              editingId === branch.branchId ? (
                <tr key={branch.branchId} className="bg-yellow-50">
                  <td className="border px-2 py-1">
                    <input
                      name="name"
                      value={editForm.name || ''}
                      onChange={handleEditChange}
                      className="w-full rounded border px-2 py-1"
                    />
                  </td>
                  <td className="border px-2 py-1">
                    <input
                      name="location"
                      value={editForm.location || ''}
                      onChange={handleEditChange}
                      className="w-full rounded border px-2 py-1"
                    />
                  </td>
                  <td className="border px-2 py-1">
                    <input
                      name="note"
                      value={editForm.note || ''}
                      onChange={handleEditChange}
                      className="w-full rounded border px-2 py-1"
                    />
                  </td>
                  <td className="border px-2 py-1">
                    <input
                      name="description"
                      value={editForm.description || ''}
                      onChange={handleEditChange}
                      className="w-full rounded border px-2 py-1"
                    />
                  </td>
                  {/* <td className="border px-2 py-1 text-center">
                  <input type="checkbox" name="isActive" checked={!!editForm.isActive} onChange={handleEditChange} />
                </td> */}
                  <td className="border px-2 py-1">
                    <button
                      onClick={handleSave}
                      className="mr-2 rounded bg-green-500 px-2 py-1 text-white"
                    >
                      Lưu
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="rounded bg-gray-400 px-2 py-1 text-white"
                    >
                      Hủy
                    </button>
                  </td>
                </tr>
              ) : (
                <tr key={branch.branchId}>
                  <td className="border px-2 py-1">{branch.name}</td>
                  <td className="border px-2 py-1">{branch.location}</td>
                  <td className="border px-2 py-1">{branch.note}</td>
                  <td className="border px-2 py-1">{branch.description}</td>
                  {/* <td className="border px-2 py-1 text-center">{branch.isActive ? 'Có' : 'Không'}</td> */}
                  <td className="border px-2 py-1">
                    <button
                      onClick={() => startEdit(branch)}
                      className="mr-2 rounded bg-yellow-400 px-2 py-1 text-white"
                    >
                      Sửa
                    </button>
                    <button
                      onClick={() => handleDelete(branch.branchId!)}
                      className="rounded bg-red-500 px-2 py-1 text-white"
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              )
            )}
        </tbody>
      </table>
      <div className="flex justify-center gap-2">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="rounded border px-3 py-1"
        >
          Trước
        </button>
        <span>
          Trang {page} / {totalPages}
        </span>
        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          className="rounded border px-3 py-1"
        >
          Sau
        </button>
      </div>
      {loading && <div className="mt-2 text-center">Đang tải...</div>}
    </div>
  );
};

export default BranchList;
