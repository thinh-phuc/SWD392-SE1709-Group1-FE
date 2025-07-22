import { useState, useEffect, useMemo } from 'react';
import { DataTableSkeleton } from '../../../components/shared/data-table-skeleton';
import DataTable from '../../../components/shared/data-table';
import BaseRequest from '@/config/axios.config';
import { useLocation } from 'react-router-dom';
import GenericModal from '@/components/shared/dialog';
import type { CellContext } from '@tanstack/react-table';

interface AdmissionType {
  admissionTypeId: number;
  typeName: string;
  description: string;
  note: string;
  isActive: boolean;
  createDate: string | null;
  createBy: string | null;
  updateDate: string | null;
  updateBy: string | null;
}

export default function AdmissionTypePage() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<AdmissionType[]>([]);
  const [pageCount, setPageCount] = useState(0);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedAdmissionType, setSelectedAdmissionType] =
    useState<AdmissionType | null>(null);
  const [editForm, setEditForm] = useState<Partial<AdmissionType>>({});
  const [submitting, setSubmitting] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [admissionTypeToDelete, setAdmissionTypeToDelete] =
    useState<AdmissionType | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [createForm, setCreateForm] = useState({
    typeName: '',
    description: '',
    note: '',
    isActive: true
  });
  const location = useLocation();

  const searchParams = useMemo(() => {
    return new URLSearchParams(location.search);
  }, [location.search]);

  const handleEdit = (admissionType: AdmissionType) => {
    setSelectedAdmissionType(admissionType);
    setEditForm({
      typeName: admissionType.typeName,
      description: admissionType.description,
      note: admissionType.note,
      isActive: admissionType.isActive
    });
    setShowEditModal(true);
  };

  const handleDelete = (admissionType: AdmissionType) => {
    setAdmissionTypeToDelete(admissionType);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    if (!admissionTypeToDelete) return;
    setSubmitting(true);
    try {
      await BaseRequest.Delete(
        `/api/admission-types/${admissionTypeToDelete.admissionTypeId}`
      );
      // Refresh data
      const page = Number(searchParams.get('page') || '1');
      const limit = searchParams.get('limit') || '10';
      const name = searchParams.get('keyword') || '';
      const res = await BaseRequest.Get(
        `/api/admission-types?typeName=${name}&pageIndex=${page - 1}&pageSize=${limit}`
      );
      setData(res.items);
      setShowDeleteModal(false);
      setAdmissionTypeToDelete(null);
    } catch (error) {
      console.error('Error deleting admission type:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpdateAdmissionType = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAdmissionType) return;
    setSubmitting(true);
    try {
      const currentUserId = localStorage.getItem('user_id');
      const updatePayload = {
        admissionTypeId: selectedAdmissionType.admissionTypeId,
        typeName: editForm.typeName ?? '',
        description: editForm.description ?? '',
        note: editForm.note ?? '',
        isActive: editForm.isActive ?? true,
        updateBy: currentUserId || 'Unknown'
      };
      await BaseRequest.Put(
        `/api/admission-types/${selectedAdmissionType.admissionTypeId}`,
        updatePayload
      );
      // Refresh data
      const page = Number(searchParams.get('page') || '1');
      const limit = searchParams.get('limit') || '10';
      const name = searchParams.get('keyword') || '';
      const res = await BaseRequest.Get(
        `/api/admission-types?typeName=${name}&pageIndex=${page - 1}&pageSize=${limit}`
      );
      setData(res.items);
      setShowEditModal(false);
      setSelectedAdmissionType(null);
      setEditForm({});
    } catch (error) {
      console.error('Error updating admission type:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof AdmissionType, value: any) => {
    setEditForm((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCreateAdmissionType = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await BaseRequest.Post('/api/admission-types', createForm);
      // Refresh data
      const page = Number(searchParams.get('page') || '1');
      const limit = searchParams.get('limit') || '10';
      const name = searchParams.get('keyword') || '';
      const res = await BaseRequest.Get(
        `/api/admission-types?typeName=${name}&pageIndex=${page - 1}&pageSize=${limit}`
      );
      setData(res.items);
      setShowCreateModal(false);
      setCreateForm({
        typeName: '',
        description: '',
        note: '',
        isActive: true
      });
    } catch (error) {
      console.error('Error creating admission type:', error);
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
    { accessorKey: 'admissionTypeId', header: 'ID' },
    { accessorKey: 'typeName', header: 'Type Name' },
    { accessorKey: 'description', header: 'Description' },
    { accessorKey: 'note', header: 'Note' },
    {
      accessorKey: 'isActive',
      header: 'Is Active',
      cell: (info: CellContext<AdmissionType, unknown>) =>
        info.getValue() ? 'Yes' : 'No'
    },
    {
      accessorKey: 'createDate',
      header: 'Created At',
      cell: (info: CellContext<AdmissionType, unknown>) => {
        const value = info.getValue();
        return value ? new Date(value as string).toLocaleString() : 'N/A';
      }
    },
    {
      accessorKey: 'updateDate',
      header: 'Updated At',
      cell: (info: CellContext<AdmissionType, unknown>) => {
        const value = info.getValue();
        return value ? new Date(value as string).toLocaleString() : 'N/A';
      }
    },
    {
      header: 'Actions',
      cell: ({ row }: CellContext<AdmissionType, unknown>) => (
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
    const fetchAdmissionTypes = async () => {
      setLoading(true);
      try {
        const page = Number(searchParams.get('page') || '1');
        const limit = searchParams.get('limit') || '10';
        const name = searchParams.get('keyword') || '';
        const res = await BaseRequest.Get(
          `/api/admission-types?typeName=${name}&pageIndex=${page - 1}&pageSize=${limit}`
        );
        setData(res.items);
        setPageCount(res.totalPages);
      } catch (error: any) {
        if (error?.status === 404) {
          setData([]);
          setPageCount(1);
        } else {
          console.error('Error fetching admission types:', error);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchAdmissionTypes();
  }, [location.search, searchParams]);

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold">Admission Types</h2>
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
          placeHolderInputSearch="Searching admission types..."
        />
      )}
      <GenericModal
        open={showEditModal}
        onOpenChange={setShowEditModal}
        title="Edit Admission Type"
        description="Update admission type details here"
      >
        <form
          onSubmit={handleUpdateAdmissionType}
          className="max-h-[70vh] space-y-4 overflow-y-auto pr-4"
        >
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label
                htmlFor="typeName"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                Type Name <span className="text-red-500">*</span>
              </label>
              <input
                id="typeName"
                type="text"
                required
                value={editForm.typeName || ''}
                onChange={(e) => handleInputChange('typeName', e.target.value)}
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter type name"
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
                placeholder="Enter admission type description"
                rows={2}
              />
            </div>
            <div className="md:col-span-2">
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
                setSelectedAdmissionType(null);
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
        description={`Bạn có chắc chắn muốn xóa loại tuyển sinh "${admissionTypeToDelete?.typeName}"?`}
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
        title="Tạo mới loại tuyển sinh"
        description="Nhập thông tin loại tuyển sinh mới"
      >
        <form
          onSubmit={handleCreateAdmissionType}
          className="max-h-[70vh] space-y-4 overflow-y-auto pr-4"
        >
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label
                htmlFor="create-typeName"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                Type Name <span className="text-red-500">*</span>
              </label>
              <input
                id="create-typeName"
                type="text"
                required
                value={createForm.typeName}
                onChange={(e) =>
                  handleCreateInputChange('typeName', e.target.value)
                }
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter type name"
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
                placeholder="Enter admission type description"
                rows={2}
              />
            </div>
            <div className="md:col-span-2">
              <label
                htmlFor="create-note"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                Note
              </label>
              <textarea
                id="create-note"
                value={createForm.note}
                onChange={(e) =>
                  handleCreateInputChange('note', e.target.value)
                }
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter additional notes"
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
