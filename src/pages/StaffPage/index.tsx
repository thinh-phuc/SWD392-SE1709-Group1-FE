import SideBar from './components/SideBar';
import { Outlet } from 'react-router-dom';

export default function StaffPage() {
  return (
    <div className="grid grid-cols-[20%_80%] ">
      <div>
        <SideBar />
      </div>
      <div className="m-10">
        <Outlet /> {/* Nội dung route con sẽ hiển thị tại đây */}
      </div>
    </div>
  );
}
