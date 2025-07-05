import { useRouter } from '@/routes/hooks';
import { Button } from '../ui/button';
import { ArrowLeftToLine } from 'lucide-react';
export const ButtonBack = () => {
  const router = useRouter();
  return (
    <Button
      className="bg-blue/80 hover:bg-blue dark:text-white"
      onClick={() => router.back()}
    >
      <ArrowLeftToLine className="mr-2 h-4 w-4" />
      Quay lại
    </Button>
  );
};
