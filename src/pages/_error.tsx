import Button from '@/components/shared/Button'
import Flex from '@/components/shared/Flex'
import Spacing from '@/components/shared/Spacing'
import Text from '@/components/shared/Text'
import { NextPageContext } from 'next'
import Image from 'next/image'

function Error({ statusCode }: { statusCode?: number }) {
  return (
    <div>
      <Spacing size={100} />
      <Flex align="center" direction="column">
        <Image
          src="https://cdn0.iconfinder.com/data/icons/sitemap-kit/64/sitemap_kit-07-256.png"
          width={80}
          height={80}
          alt="Error"
        />
        <Spacing size={20} />
        <Text>{statusCode} 에러가 발생했습니다</Text>
        <Button onClick={() => window.history.back()}>돌아가기</Button>
      </Flex>
    </div>
  )
}

Error.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}

export default Error
