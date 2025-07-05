export type Product = {
  photo_url: string;
  name: string;
  description: string;
  created_at: string;
  price: number;
  id: number;
  category: string;
  updated_at: string;
};

export const ceoNavItems: any = [
  {
    label: 'Quản lý',
    detail: [
      {
        title: 'Tổng quan',
        url: '/dashboard',
        icon: 'dashboard',
        isActive: false,
        shortcut: ['d', 'd'],
        items: []
      },
      {
        title: 'Bảo hành',
        url: '/bao-hanh',
        icon: 'shieldCheck',
        isActive: false,
        shortcut: ['d', 'd'],
        items: []
      },
      {
        title: 'Danh sách đơn mua lẻ',
        url: '/danh-sach-don-mua-le',
        icon: 'stretchhorizontal',
        isActive: false,
        shortcut: ['d', 'd'],
        items: []
      }
    ]
  },
  {
    label: 'Quản lý gói thầu',
    detail: [
      {
        title: 'Lịch trình',
        url: '/goi-thau',
        icon: 'package',
        isActive: false,
        shortcut: ['d', 'd'],
        items: []
      },
      {
        title: 'Danh sách gói thầu',
        url: '/danh-sach-goi-thau',
        icon: 'listOrdered',
        isActive: false,
        shortcut: ['d', 'd'],
        items: []
      }
    ]
  },
  {
    label: 'Quản lý Tiêm',
    detail: [
      {
        title: 'Danh sách lô tiêm',
        url: '/lo-tiem',
        icon: 'layers',
        isActive: false,
        shortcut: ['d', 'd'],
        items: []
      },
      {
        title: 'Quản lý lô tiêm',
        url: '/quan-ly-lo-tiem',
        icon: 'grid',
        isActive: false,
        shortcut: ['d', 'd'],
        items: []
      }
    ]
  },
  {
    label: 'Quản lý Nhập/Xuất',
    detail: [
      {
        title: 'Danh sách lô nhập',
        url: '/admin/lo-nhap',
        icon: 'download',
        isActive: false,
        shortcut: ['d', 'd'],
        items: []
      }
    ]
  },
  {
    label: 'Thuốc/Vaccine',
    detail: [
      {
        title: 'Danh sách thuốc/vaccine',
        url: '/danh-sach-thuoc',
        icon: 'syringe',
        isActive: false,
        shortcut: ['d', 'd'],
        items: []
      }
    ]
  },
  {
    label: 'Vật nuôi',
    detail: [
      {
        title: 'Tổng quan chăn nuôi',
        url: '/livestock-dashboard',
        icon: 'barChart',
        isActive: false,
        shortcut: ['d', 'd'],
        items: []
      },
      {
        title: 'Danh sách vật nuôi',
        url: '/danh-sach-vat-nuoi',
        icon: 'dog',
        isActive: false,
        shortcut: ['d', 'd'],
        items: []
      }
    ]
  },
  {
    label: 'Bệnh dịch',
    detail: [
      {
        title: 'Danh sách các loại bệnh',
        url: '/danh-sach-benh',
        icon: 'pill',
        isActive: false,
        shortcut: ['d', 'd'],
        items: []
      }
    ]
  },
  {
    label: 'Mã kiểm dịch',
    detail: [
      {
        title: 'Mã kiểm dịch',
        icon: 'pill',
        isActive: true,
        shortcut: ['d', 'd'],
        items: [
          {
            title: 'Lịch sử mã kiểm dịch',
            url: '/ma-kiem-dich',
            isActive: false,
            shortcut: ['d', 'd'],
            items: []
          },
          {
            title: 'Mã kiểm dịch theo loài',
            url: '/ma-kiem-dich-theo-loai',
            isActive: false,
            shortcut: ['d', 'd'],
            items: []
          }
        ]
      }
    ]
  },
  {
    label: 'Hệ thống',
    detail: [
      {
        title: 'Quản lý người dùng',
        url: '/nguoi-dung',
        icon: 'attendees',
        isActive: false,
        shortcut: ['d', 'd'],
        items: []
      },
      {
        title: 'Quản lý quyền',
        url: '/quyen',
        icon: 'shieldCheck',
        isActive: false,
        shortcut: ['d', 'd'],
        items: []
      }
    ]
  }
];

export const managerNavItems: any = [
  {
    label: 'Quản lý Nhập/Xuất',
    detail: [
      {
        title: 'Danh sách lô nhập',
        url: '/lo-nhap',
        icon: 'download',
        isActive: false,
        shortcut: ['d', 'd'],
        items: []
      }
    ]
  },
  {
    label: 'Thuốc/Vaccine',
    detail: [
      {
        title: 'Danh sách thuốc/vaccine',
        url: '/danh-sach-thuoc',
        icon: 'syringe',
        isActive: false,
        shortcut: ['d', 'd'],
        items: []
      }
    ]
  }
];

export const employeeNavItems: any = [
  {
    label: 'Vật nuôi',
    detail: [
      {
        title: 'Danh sách vật nuôi',
        url: '/danh-sach-vat-nuoi',
        icon: 'dog',
        isActive: false,
        shortcut: ['d', 'd'],
        items: []
      }
    ]
  },
  {
    label: 'Bệnh dịch',
    detail: [
      {
        title: 'Danh sách các loại bệnh',
        url: '/danh-sach-benh',
        icon: 'pill',
        isActive: false,
        shortcut: ['d', 'd'],
        items: []
      }
    ]
  }
];

export const AssistantNavItems: any = [
  {
    label: 'Vật nuôi',
    detail: [
      {
        title: 'Danh sách vật nuôi',
        url: '/danh-sach-vat-nuoi',
        icon: 'dog',
        isActive: false,
        shortcut: ['d', 'd'],
        items: []
      }
    ]
  },
  {
    label: 'Bệnh dịch',
    detail: [
      {
        title: 'Danh sách các loại bệnh',
        url: '/danh-sach-benh',
        icon: 'pill',
        isActive: false,
        shortcut: ['d', 'd'],
        items: []
      }
    ]
  }
];

export const Permission = {
  1: 'Users.View',
  2: 'Permission.Users.Create'
};

export const sumaryUser = {
  CEO: 5,
  Manager: 3,
  Employee: 10
};

export const InspectionCodeRangeStatus: any = {
  1: 'Dùng hết',
  2: 'Đang sử dụng',
  3: 'Mới'
};
