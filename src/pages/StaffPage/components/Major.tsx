import { useState, useEffect, useMemo } from 'react';
import { DataTableSkeleton } from '../../../components/shared/data-table-skeleton';
import DataTable from '../../../components/shared/data-table';
import BaseRequest from '@/config/axios.config';
import { useLocation } from 'react-router-dom';
import GenericModal from '@/components/shared/dialog';
import type { CellContext } from '@tanstack/react-table';

interface Major {
  majorId: number;
  code: string;
  name: string;
  description: string;
  requiredSubjects: string;
  minGpa: number;
  hollandType: string;
  admissionQuantity: number;
  isActive: boolean;
  createDate: string | null;
  createBy: string | null;
  updateDate: string | null;
  updateBy: string | null;
}

export default function MajorPage() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<Major[]>([]);
  const [pageCount, setPageCount] = useState(0);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedMajor, setSelectedMajor] = useState<Major | null>(null);
  const [editForm, setEditForm] = useState<Partial<Major>>({});
  const [submitting, setSubmitting] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [majorToDelete, setMajorToDelete] = useState<Major | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [createForm, setCreateForm] = useState({
    code: '',
    name: '',
    description: '',
    requiredSubjects: '',
    minGpa: 0,
    hollandType: '',
    admissionQuantity: 0,
    isActive: true
  });
  const location = useLocation();

  const searchParams = useMemo(() => {
    return new URLSearchParams(location.search);
  }, [location.search]);

  const handleEdit = (major: Major) => {
    setSelectedMajor(major);
    setEditForm({
      code: major.code,
      name: major.name,
      description: major.description,
      requiredSubjects: major.requiredSubjects,
      minGpa: major.minGpa,
      hollandType: major.hollandType,
      admissionQuantity: major.admissionQuantity,
      isActive: major.isActive
    });
    setShowEditModal(true);
  };

  const handleDelete = (major: Major) => {
    setMajorToDelete(major);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    if (!majorToDelete) return;
    setSubmitting(true);
    try {
      await BaseRequest.Delete(`/api/majors/${majorToDelete.majorId}`);
      // Refresh data
      const page = Number(searchParams.get('page') || '1');
      const limit = searchParams.get('limit') || '10';
      const name = searchParams.get('keyword') || '';
      const res = await BaseRequest.Get(
        `/api/majors?typeName=${name}&pageIndex=${page - 1}&pageSize=${limit}`
      );
      setData(res.items);
      setShowDeleteModal(false);
      setMajorToDelete(null);
    } catch (error) {
      console.error('Error deleting major:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpdateMajor = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMajor) return;
    setSubmitting(true);
    try {
      const currentUserId = localStorage.getItem('user_id');
      const updatePayload = {
        id: selectedMajor.majorId, // backend expects 'id'
        code: editForm.code ?? '',
        name: editForm.name ?? '',
        description: editForm.description ?? '',
        requiredSubjects: editForm.requiredSubjects ?? '',
        minGpa: editForm.minGpa ?? 0,
        hollandType: editForm.hollandType ?? '',
        admissionQuantity: editForm.admissionQuantity ?? 0,
        isActive: editForm.isActive ?? true,
        updateDate: new Date().toISOString(),
        updateBy: currentUserId || 'Unknown'
      };
      await BaseRequest.Put(
        `/api/majors/${selectedMajor.majorId}`,
        updatePayload
      );
      // Refresh data
      const page = Number(searchParams.get('page') || '1');
      const limit = searchParams.get('limit') || '10';
      const name = searchParams.get('keyword') || '';
      const res = await BaseRequest.Get(
        `/api/majors?typeName=${name}&pageIndex=${page - 1}&pageSize=${limit}`
      );
      setData(res.items);
      setShowEditModal(false);
      setSelectedMajor(null);
      setEditForm({});
    } catch (error) {
      console.error('Error updating major:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof Major, value: any) => {
    setEditForm((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCreateMajor = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await BaseRequest.Post('/api/majors', createForm);
      // Refresh data
      const page = Number(searchParams.get('page') || '1');
      const limit = searchParams.get('limit') || '10';
      const name = searchParams.get('keyword') || '';
      const res = await BaseRequest.Get(
        `/api/majors?typeName=${name}&pageIndex=${page - 1}&pageSize=${limit}`
      );
      setData(res.items);
      setShowCreateModal(false);
      setCreateForm({
        code: '',
        name: '',
        description: '',
        requiredSubjects: '',
        minGpa: 0,
        hollandType: '',
        admissionQuantity: 0,
        isActive: true
      });
    } catch (error) {
      console.error('Error creating major:', error);
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

  const hollandOptions = [
    { label: 'Realistic', value: 'R' },
    { label: 'Investigative', value: 'I' },
    { label: 'Artistic', value: 'A' },
    { label: 'Social', value: 'S' },
    { label: 'Enterprising', value: 'E' },
    { label: 'Conventional', value: 'C' }
  ];

  const headers = [
    { accessorKey: 'majorId', header: 'ID' },
    { accessorKey: 'code', header: 'Code' },
    { accessorKey: 'name', header: 'Name' },
    { accessorKey: 'description', header: 'Description' },
    { accessorKey: 'requiredSubjects', header: 'Required Subjects' },
    { accessorKey: 'minGpa', header: 'Min GPA' },
    { accessorKey: 'hollandType', header: 'Holland Type' },
    { accessorKey: 'admissionQuantity', header: 'Admission Quantity' },
    {
      accessorKey: 'isActive',
      header: 'Is Active',
      cell: (info: CellContext<Major, unknown>) =>
        info.getValue() ? 'Yes' : 'No'
    },
    {
      accessorKey: 'createDate',
      header: 'Created At',
      cell: (info: CellContext<Major, unknown>) => {
        const value = info.getValue();
        return value ? new Date(value as string).toLocaleString() : 'N/A';
      }
    },
    {
      accessorKey: 'updateDate',
      header: 'Updated At',
      cell: (info: CellContext<Major, unknown>) => {
        const value = info.getValue();
        return value ? new Date(value as string).toLocaleString() : 'N/A';
      }
    },
    {
      header: 'Actions',
      cell: ({ row }: CellContext<Major, unknown>) => (
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
    const fetchMajors = async () => {
      setLoading(true);
      try {
        const page = Number(searchParams.get('page') || '1');
        const limit = searchParams.get('limit') || '10';
        const name = searchParams.get('keyword') || '';
        const res = await BaseRequest.Get(
          `/api/majors?typeName=${name}&pageIndex=${page - 1}&pageSize=${limit}`
        );
        setData(res.items);
        setPageCount(res.totalPages);
      } catch (error: any) {
        if (error?.status === 404) {
          setData([]);
          setPageCount(1);
        } else {
          console.error('Error fetching majors:', error);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchMajors();
  }, [location.search, searchParams]);

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold">Majors</h2>
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
          placeHolderInputSearch="Searching majors..."
        />
      )}
      <GenericModal
        open={showEditModal}
        onOpenChange={setShowEditModal}
        title="Edit Major"
        description="Update major details here"
      >
        <form
          onSubmit={handleUpdateMajor}
          className="max-h-[70vh] space-y-4 overflow-y-auto pr-4"
        >
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label
                htmlFor="code"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                Code <span className="text-red-500">*</span>
              </label>
              <input
                id="code"
                type="text"
                required
                value={editForm.code || ''}
                onChange={(e) => handleInputChange('code', e.target.value)}
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter major code"
              />
            </div>
            <div>
              <label
                htmlFor="name"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                Name <span className="text-red-500">*</span>
              </label>
              <input
                id="name"
                type="text"
                required
                value={editForm.name || ''}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter major name"
              />
            </div>
            <div>
              <label
                htmlFor="requiredSubjects"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                Required Subjects
              </label>
              <input
                id="requiredSubjects"
                type="text"
                value={editForm.requiredSubjects || ''}
                onChange={(e) =>
                  handleInputChange('requiredSubjects', e.target.value)
                }
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter required subjects"
              />
            </div>
            <div>
              <label
                htmlFor="minGpa"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                Min GPA
              </label>
              <input
                id="minGpa"
                type="number"
                min={0}
                value={editForm.minGpa || 0}
                onChange={(e) =>
                  handleInputChange('minGpa', Number(e.target.value))
                }
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter minimum GPA"
              />
            </div>
            <div>
              <label
                htmlFor="hollandType"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                Holland Type
              </label>
              <select
                id="hollandType"
                value={editForm.hollandType || ''}
                onChange={(e) =>
                  handleInputChange('hollandType', e.target.value)
                }
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="" disabled>
                  Chọn Holland type
                </option>
                {hollandOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor="admissionQuantity"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                Admission Quantity
              </label>
              <input
                id="admissionQuantity"
                type="number"
                min={0}
                value={editForm.admissionQuantity || 0}
                onChange={(e) =>
                  handleInputChange('admissionQuantity', Number(e.target.value))
                }
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter admission quantity"
              />
            </div>
            <div className="md:col-span-2">
              <label
                htmlFor="description"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <textarea
                id="description"
                value={editForm.description || ''}
                onChange={(e) =>
                  handleInputChange('description', e.target.value)
                }
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter major description"
                rows={2}
              />
            </div>
            <div className="flex items-center md:col-span-2">
              <input
                id="isActive"
                type="checkbox"
                checked={editForm.isActive || false}
                onChange={(e) =>
                  handleInputChange('isActive', e.target.checked)
                }
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label
                htmlFor="isActive"
                className="ml-2 block text-sm text-gray-900"
              >
                Active
              </label>
            </div>
          </div>
          <div className="sticky bottom-0 flex justify-end space-x-3 bg-white pb-2 pt-4">
            <button
              type="button"
              onClick={() => {
                setShowEditModal(false);
                setSelectedMajor(null);
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
      <GenericModal
        open={showDeleteModal}
        onOpenChange={setShowDeleteModal}
        title="Xác nhận xóa"
        description={`Bạn có chắc chắn muốn xóa ngành "${majorToDelete?.name}"?`}
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
      <GenericModal
        open={showCreateModal}
        onOpenChange={setShowCreateModal}
        title="Tạo mới ngành"
        description="Nhập thông tin ngành mới"
      >
        <form
          onSubmit={handleCreateMajor}
          className="max-h-[70vh] space-y-4 overflow-y-auto pr-4"
        >
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label
                htmlFor="create-code"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                Code <span className="text-red-500">*</span>
              </label>
              <input
                id="create-code"
                type="text"
                required
                value={createForm.code}
                onChange={(e) =>
                  handleCreateInputChange('code', e.target.value)
                }
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter major code"
              />
            </div>
            <div>
              <label
                htmlFor="create-name"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                Name <span className="text-red-500">*</span>
              </label>
              <input
                id="create-name"
                type="text"
                required
                value={createForm.name}
                onChange={(e) =>
                  handleCreateInputChange('name', e.target.value)
                }
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter major name"
              />
            </div>
            <div>
              <label
                htmlFor="create-requiredSubjects"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                Required Subjects
              </label>
              <input
                id="create-requiredSubjects"
                type="text"
                value={createForm.requiredSubjects}
                onChange={(e) =>
                  handleCreateInputChange('requiredSubjects', e.target.value)
                }
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter required subjects"
              />
            </div>
            <div>
              <label
                htmlFor="create-minGpa"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                Min GPA
              </label>
              <input
                id="create-minGpa"
                type="number"
                min={0}
                value={createForm.minGpa}
                onChange={(e) =>
                  handleCreateInputChange('minGpa', Number(e.target.value))
                }
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter minimum GPA"
              />
            </div>
            <div>
              <label
                htmlFor="create-hollandType"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                Holland Type
              </label>
              <select
                id="create-hollandType"
                value={createForm.hollandType}
                onChange={(e) =>
                  handleCreateInputChange('hollandType', e.target.value)
                }
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="" disabled>
                  Chọn Holland type
                </option>
                {hollandOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor="create-admissionQuantity"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                Admission Quantity
              </label>
              <input
                id="create-admissionQuantity"
                type="number"
                min={0}
                value={createForm.admissionQuantity}
                onChange={(e) =>
                  handleCreateInputChange(
                    'admissionQuantity',
                    Number(e.target.value)
                  )
                }
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter admission quantity"
              />
            </div>
            <div className="md:col-span-2">
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
                placeholder="Enter major description"
                rows={2}
              />
            </div>
            <div className="flex items-center md:col-span-2">
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
          </div>
          <div className="sticky bottom-0 flex justify-end space-x-3 bg-white pb-2 pt-4">
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
