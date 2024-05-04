import Button from '@/components/shared/Button'
import Flex from '@/components/shared/Flex'
import Spacing from '@/components/shared/Spacing'
import Text from '@/components/shared/Text'
import Image from 'next/image'

function NotFoundPage() {
  return (
    <div>
      <Spacing size={100} />
      <Flex align="center" direction="column">
        <Image
          src="https://cdn3.iconfinder.com/data/icons/network-and-communications-10/32/network_Error_lost_no_page_not_found-256.png"
          width={80}
          height={80}
          alt=""
        />
        <Spacing size={20} />
        <Text>찾으시는 페이지가 없습니다</Text>
        <Spacing size={100} />
        <Button onClick={() => window.history.back()}>돌아가기</Button>
      </Flex>
    </div>
  )
}

export default NotFoundPage
