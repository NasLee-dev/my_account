import dynamic from 'next/dynamic'
import Skeleton from '@shared/Skeleton'
import Account from '@/components/home/Account'
import { BannerSkeleton } from '@components/home/EventBanners'

const EventBanners = dynamic(() => import('@components/home/EventBanners'), {
  ssr: false,
  loading: () => <BannerSkeleton />,
})

export default function Home() {
  return (
    <>
      <EventBanners />
      <Account />
    </>
  )
}
