import PageHead from '@/components/shared/page-head.jsx';
import { Breadcrumbs } from '@/components/shared/breadcrumbs';
import { SidebarTrigger } from '../ui/sidebar';
interface IBasePages {
  children?: React.ReactNode;
  className?: string;
  pageHead?: string;
  breadcrumbs?: { title: string; link: string }[];
}

const BasePages = ({
  children,
  className,
  pageHead,
  breadcrumbs
}: IBasePages) => {
  return (
    <>
      <PageHead title={pageHead} />
      <div className={`${className}`}>
        <div className=" mt-4 items-center justify-between max-md:pt-4 md:flex md:pr-8">
          <div className="flex items-center">
            <SidebarTrigger />
            <div
              data-orientation="vertical"
              role="none"
              className="mx-2 h-4 w-[1px]  shrink-0 bg-gray-400"
            ></div>
            {breadcrumbs && <Breadcrumbs items={breadcrumbs} />}
          </div>
          <div className="hidden items-center  space-x-4 pt-4 md:flex">
            {/* <ModeToggle /> */}
          </div>
        </div>
        {children}
      </div>
    </>
  );
};

export default BasePages;
