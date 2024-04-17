import useUser from '@/hooks/useUser'
import { getTransactions } from '@/remote/transaction'
import { useInfiniteQuery } from 'react-query'

export default function useTransactions({ suspense }: { suspense?: boolean }) {
  const user = useUser()
  return useInfiniteQuery(
    ['transactions', user?.id],
    ({ pageParam }) =>
      getTransactions({ userId: user?.id as string, pageParam }),
    {
      getNextPageParam: (snapshot) => {
        return snapshot.lastVisible
      },
      suspense,
    },
  )
}
