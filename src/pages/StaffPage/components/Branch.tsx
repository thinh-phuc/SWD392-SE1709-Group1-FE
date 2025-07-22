import { useState, useEffect } from 'react';
import { DataTableSkeleton } from '../../../components/shared/data-table-skeleton';
import DataTable from '../../../components/shared/data-table';
import BaseRequest from '@/config/axios.config';
import { useLocation } from 'react-router-dom';
import { useMemo } from 'react';
import GenericModal from '@/components/shared/dialog';
import type { CellContext } from '@tanstack/react-table';

interface Branch {
  branchId: number;
  description: string;
  name: string;
  location: string;
  note: string;
  isActive: boolean;
  createDate: Date | null;
  updateDate: Date | null;
  createBy: string;
  updateBy: string;
}

// Move headers inside BranchPage to access handleEdit and handleDelete

export default function BranchPage() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<Branch[]>([]);
  const [pageCount, setPageCount] = useState(0);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null);
  const [editForm, setEditForm] = useState<Partial<Branch>>({});
  const [submitting, setSubmitting] = useState(false);
  // State cho xóa branch
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [branchToDelete, setBranchToDelete] = useState<Branch | null>(null);
  // State cho tạo mới branch
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [createForm, setCreateForm] = useState({
    name: '',
    description: '',
    location: '',
    note: '',
    isActive: true
  });
  const location = useLocation();

  const searchParams = useMemo(() => {
    return new URLSearchParams(location.search);
  }, [location.search]);

  const handleEdit = (branch: Branch) => {
    setSelectedBranch(branch);
    setEditForm({
      name: branch.name,
      description: branch.description,
      location: branch.location,
      note: branch.note,
      isActive: branch.isActive
    });
    setShowEditModal(true);
  };

  const handleDelete = (branch: Branch) => {
    setBranchToDelete(branch);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    if (!branchToDelete) return;
    setSubmitting(true);
    try {
      await BaseRequest.Delete(`/api/branches/${branchToDelete.branchId}`);
      // Refresh data
      const page = searchParams.get('page') || '1';
      const limit = searchParams.get('limit') || '10';
      const name = searchParams.get('keyword') || '';
      const res = await BaseRequest.Get(
        `/api/branches?name=${name}&pageNumber=${page}&pageSize=${limit}`
      );
      setData(res.items);
      setShowDeleteModal(false);
      setBranchToDelete(null);
    } catch (error) {
      console.error('Error deleting branch:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpdateBranch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBranch) return;

    setSubmitting(true);
    try {
      // Lấy thông tin user hiện tại từ localStorage
      const currentUserId = localStorage.getItem('user_id');

      // Tạo payload với updateBy
      const updatePayload = {
        ...editForm,
        branchId: selectedBranch.branchId,
        updateBy: currentUserId || 'Unknown'
      };

      await BaseRequest.Put(
        `/api/branches/${selectedBranch.branchId}`,
        updatePayload
      );

      // Refresh the data
      const page = searchParams.get('page') || '1';
      const limit = searchParams.get('limit') || '10';
      const name = searchParams.get('keyword') || '';

      const res = await BaseRequest.Get(
        `/api/branches?name=${name}&pageNumber=${page}&pageSize=${limit}`
      );
      setData(res.items);

      setShowEditModal(false);
      setSelectedBranch(null);
      setEditForm({});
    } catch (error) {
      console.error('Error updating branch:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof Branch, value: any) => {
    setEditForm((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  // Xử lý tạo mới branch
  const handleCreateBranch = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await BaseRequest.Post('/api/branches', createForm);
      // Refresh data
      const page = searchParams.get('page') || '1';
      const limit = searchParams.get('limit') || '10';
      const name = searchParams.get('keyword') || '';
      const res = await BaseRequest.Get(
        `/api/branches?name=${name}&pageNumber=${page}&pageSize=${limit}`
      );
      setData(res.items);
      setShowCreateModal(false);
      setCreateForm({
        name: '',
        description: '',
        location: '',
        note: '',
        isActive: true
      });
    } catch (error) {
      console.error('Error creating branch:', error);
    } finally {
      setSubmitting(false);
    }
  };
  const handleCreateInputChange = (
    field: keyof typeof createForm,
    value: any
  ) => {
    setCreateForm((prev) => ({ ...prev, [field]: value }));
  };

  const headers = [
    { accessorKey: 'branchId', header: 'ID' },
    { accessorKey: 'name', header: 'Name' },
    { accessorKey: 'description', header: 'Description' },
    { accessorKey: 'location', header: 'Location' },
    { accessorKey: 'note', header: 'Note' },
    {
      accessorKey: 'isActive',
      header: 'Is Active',
      cell: (info: CellContext<Branch, unknown>) =>
        info.getValue() ? 'Yes' : 'No'
    },
    {
      accessorKey: 'createDate',
      header: 'Created At',
      cell: (info: CellContext<Branch, unknown>) => {
        const value = info.getValue();
        return value ? new Date(value as string).toLocaleString() : 'N/A';
      }
    },
    {
      accessorKey: 'updateDate',
      header: 'Updated At',
      cell: (info: CellContext<Branch, unknown>) => {
        const value = info.getValue();
        return value ? new Date(value as string).toLocaleString() : 'N/A';
      }
    },
    {
      header: 'Actions',
      cell: ({ row }: CellContext<Branch, unknown>) => (
        <div className="flex gap-2">
          <button
            className="rounded bg-blue-500 px-2 py-1 text-white transition-colors hover:bg-blue-600"
            onClick={() => handleEdit(row.original)}
          >
            Edit
          </button>
          <button
            className="rounded bg-red-500 px-2 py-1 text-white transition-colors hover:bg-red-600"
            onClick={() => handleDelete(row.original)}
          >
            Delete
          </button>
        </div>
      )
    }
  ];

  useEffect(() => {
    const fetchBranches = async () => {
      setLoading(true);
      try {
        const page = searchParams.get('page') || '1';
        const limit = searchParams.get('limit') || '10';
        const name = searchParams.get('keyword') || '';

        const res = await BaseRequest.Get(
          `/api/branches?name=${name}&pageNumber=${page}&pageSize=${limit}`
        );
        setData(res.items);
        setPageCount(res.totalPages);
      } catch (error: any) {
        if (error?.status === 404) {
          setData([]);
          setPageCount(1);
        } else {
          console.error('Error fetching branches:', error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBranches();
  }, [location.search, searchParams]);

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold">Branches</h2>
        <button
          className="rounded bg-green-500 px-4 py-2 text-white transition-colors hover:bg-green-600"
          onClick={() => setShowCreateModal(true)}
        >
          Thêm mới
        </button>
      </div>
      {loading ? (
        <DataTableSkeleton columnCount={headers.length || 6} rowCount={3} />
      ) : (
        <DataTable
          columns={headers}
          data={data}
          pageCount={pageCount}
          showSearch={true}
          placeHolderInputSearch="Searching branches..."
        />
      )}

      <GenericModal
        open={showEditModal}
        onOpenChange={setShowEditModal}
        title="Edit Branch"
        description="Update branch details here"
      >
        <form
          onSubmit={handleUpdateBranch}
          className="max-h-[70vh] space-y-4 overflow-y-auto pr-4"
        >
          <div>
            <label
              htmlFor="name"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Name *
            </label>
            <input
              id="name"
              type="text"
              required
              value={editForm.name || ''}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter branch name"
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              value={editForm.description || ''}
              onChange={(e) => handleInputChange('description', e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter branch description"
              rows={3}
            />
          </div>

          <div>
            <label
              htmlFor="location"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Location
            </label>
            <input
              id="location"
              type="text"
              value={editForm.location || ''}
              onChange={(e) => handleInputChange('location', e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter branch location"
            />
          </div>

          <div>
            <label
              htmlFor="note"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Note
            </label>
            <textarea
              id="note"
              value={editForm.note || ''}
              onChange={(e) => handleInputChange('note', e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter additional notes"
              rows={2}
            />
          </div>

          <div className="flex items-center">
            <input
              id="isActive"
              type="checkbox"
              checked={editForm.isActive || false}
              onChange={(e) => handleInputChange('isActive', e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label
              htmlFor="isActive"
              className="ml-2 block text-sm text-gray-900"
            >
              Active
            </label>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={() => {
                setShowEditModal(false);
                setSelectedBranch(null);
                setEditForm({});
              }}
              className="rounded-md bg-gray-200 px-4 py-2 text-gray-700 transition-colors hover:bg-gray-300"
              disabled={submitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-md bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
              disabled={submitting}
            >
              {submitting ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </GenericModal>

      {/* Modal xác nhận xóa */}
      <GenericModal
        open={showDeleteModal}
        onOpenChange={setShowDeleteModal}
        title="Xác nhận xóa"
        description={`Bạn có chắc chắn muốn xóa chi nhánh "${branchToDelete?.name}"?`}
      >
        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            className="rounded-md bg-gray-200 px-4 py-2 text-gray-700 transition-colors hover:bg-gray-300"
            onClick={() => setShowDeleteModal(false)}
            disabled={submitting}
          >
            Hủy
          </button>
          <button
            type="button"
            className="rounded-md bg-red-500 px-4 py-2 text-white transition-colors hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-50"
            onClick={handleConfirmDelete}
            disabled={submitting}
          >
            {submitting ? 'Đang xóa...' : 'Xóa'}
          </button>
        </div>
      </GenericModal>

      {/* Modal tạo mới branch */}
      <GenericModal
        open={showCreateModal}
        onOpenChange={setShowCreateModal}
        title="Tạo mới chi nhánh"
        description="Nhập thông tin chi nhánh mới"
      >
        <form
          onSubmit={handleCreateBranch}
          className="max-h-[70vh] space-y-4 overflow-y-auto pr-4  "
        >
          <div>
            <label
              htmlFor="create-name"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Name *
            </label>
            <input
              id="create-name"
              type="text"
              required
              value={createForm.name}
              onChange={(e) => handleCreateInputChange('name', e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter branch name"
            />
          </div>
          <div>
            <label
              htmlFor="create-description"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="create-description"
              value={createForm.description}
              onChange={(e) =>
                handleCreateInputChange('description', e.target.value)
              }
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter branch description"
              rows={3}
            />
          </div>
          <div>
            <label
              htmlFor="create-location"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Location
            </label>
            <input
              id="create-location"
              type="text"
              value={createForm.location}
              onChange={(e) =>
                handleCreateInputChange('location', e.target.value)
              }
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter branch location"
            />
          </div>
          <div>
            <label
              htmlFor="create-note"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Note
            </label>
            <textarea
              id="create-note"
              value={createForm.note}
              onChange={(e) => handleCreateInputChange('note', e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter additional notes"
              rows={2}
            />
          </div>
          <div className="flex items-center">
            <input
              id="create-isActive"
              type="checkbox"
              checked={createForm.isActive}
              onChange={(e) =>
                handleCreateInputChange('isActive', e.target.checked)
              }
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label
              htmlFor="create-isActive"
              className="ml-2 block text-sm text-gray-900"
            >
              Active
            </label>
          </div>
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={() => setShowCreateModal(false)}
              className="rounded-md bg-gray-200 px-4 py-2 text-gray-700 transition-colors hover:bg-gray-300"
              disabled={submitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-md bg-green-500 px-4 py-2 text-white transition-colors hover:bg-green-600 disabled:cursor-not-allowed disabled:opacity-50"
              disabled={submitting}
            >
              {submitting ? 'Đang tạo...' : 'Tạo mới'}
            </button>
          </div>
        </form>
      </GenericModal>
    </div>
  );
}
