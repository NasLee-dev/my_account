import useUser from '@/hooks/useUser'
import { getCredit } from '@/remote/credit'
import { useQuery } from 'react-query'

export default function useCredit() {
  const user = useUser()
  return useQuery(['credit', user?.id], () => getCredit(user?.id as string), {
    enabled: user != null,
  })
}
