import { useQuery } from '@tanstack/react-query';
import { useAccountInfo } from '../../context/accountContext';
import { usePage } from '../../context/pageContext';
import { Account } from '../../model/inteface';
import storage from '../../service/storageService';

export const useAccount = () => {
  const { currentPage } = usePage();
  const accountService = useAccountInfo();

  const {
    data: accountList,
    isLoading,
    refetch,
  } = useQuery<Account[] | undefined>(
    ['accounts', currentPage],
    async () => {
      try {
        return await accountService?.accountList(currentPage);
      } catch (error) {
        storage.deleteStorage();
        refetch();
      }
    },
    {
      staleTime: 1000 * 60 * 5,
      keepPreviousData: true,
      select: (data) => {
        return data;
      },
    }
  );

  return {
    accountList,
    isLoading,
  };
};
