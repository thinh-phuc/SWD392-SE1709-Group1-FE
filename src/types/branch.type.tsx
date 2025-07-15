export interface Branch {
  branchId?: number;
  name: string;
  location: string;
  note: string;
  description?: string;
  isActive: boolean;
  createDate?: string;
  createBy?: string;
  updateDate?: string;
  updateBy?: string;
}
