import getCards from '@/remote/card'
import { useQuery } from 'react-query'

export default function useCards() {
  return useQuery(['home-cards'], () => getCards(), {
    suspense: true,
  })
}
