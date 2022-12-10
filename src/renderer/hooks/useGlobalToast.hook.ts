import { useToast } from '@chakra-ui/react';
import { useEffect } from 'react';
import useToastStore from 'renderer/store/toast.store';

const useGlobalToast = () => {
  const toast = useToast();
  const [toastData] = useToastStore((state: any) => [state.toastData]);

  useEffect(() => {
    if (toastData) {
      toast(toastData);
    }
  }, [toastData]);
};

export default useGlobalToast;
