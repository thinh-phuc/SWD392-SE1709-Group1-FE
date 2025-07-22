// components/shared/GenericModal.tsx
import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';

type GenericModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
};

export default function GenericModal({
  open,
  onOpenChange,
  title,
  description,
  children
}: GenericModalProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40" />
        <Dialog.Content className="fixed left-1/2 top-1/2 max-h-[90vh] w-[90vw] max-w-md -translate-x-1/2 -translate-y-1/2 rounded bg-white p-6 shadow-lg focus:outline-none">
          {title && (
            <Dialog.Title className="mb-1 text-lg font-semibold">
              {title}
            </Dialog.Title>
          )}
          {description && (
            <Dialog.Description className="mb-4 text-sm text-gray-500">
              {description}
            </Dialog.Description>
          )}
          {children}

          <Dialog.Close asChild>
            <button
              className="absolute right-2 top-2 rounded-full p-1 hover:bg-gray-200"
              aria-label="Close"
            >
              <Cross2Icon />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
