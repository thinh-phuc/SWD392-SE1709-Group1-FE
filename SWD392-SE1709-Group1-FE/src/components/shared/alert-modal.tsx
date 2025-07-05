import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';

type TAlertModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading?: boolean;
  title?: string;
  description?: string;
  className?: string;
  btnConfirmColor?: 'success' | 'destructive';
};
export const AlertModal = ({
  isOpen,
  onClose,
  onConfirm,
  loading,
  title = 'Xác nhận',
  description = 'Bạn có chắc muốn tiếp tục chứ?',
  className,
  btnConfirmColor = 'destructive'
}: TAlertModalProps) => {
  return (
    <Modal
      title={title}
      description={description}
      isOpen={isOpen}
      onClose={onClose}
      className={className}
    >
      <div className="flex w-full items-center justify-end space-x-2 pt-6">
        <Button disabled={loading} variant="outline" onClick={onClose}>
          Quay lại
        </Button>
        <Button
          disabled={loading}
          variant={btnConfirmColor}
          onClick={onConfirm}
        >
          Tiếp tục
        </Button>
      </div>
    </Modal>
  );
};
