import Button from '../shared/Button'
import CreditScoreChart from '../shared/CreditScoreChart'
import Flex from '../shared/Flex'
import Spacing from '../shared/Spacing'
import Text from '../shared/Text'
import Skeleton from '../shared/Skeleton'
import Link from 'next/link'
import ListRow from '../shared/ListRow'
import useCredit from '../credit/hooks/useCredit'

function CreditScore() {
  const { data, isLoading } = useCredit()
  if (isLoading) {
    return <CreditScoreSkeleton />
  }
  return (
    <div
      style={{
        padding: '24px',
      }}
    >
      <Flex justify="space-between" align="center">
        <Flex direction="column">
          <Text bold={true}>
            나의 신용도를 증명하고
            <br />
            점수를 올리세요
          </Text>
          <Spacing size={8} />
          <Link href="/credit">
            <Button>내 신용점수 보러가기</Button>
          </Link>
        </Flex>
        <CreditScoreChart
          score={data?.creditScore ?? 0}
          width={80}
          height={80}
        />
      </Flex>
    </div>
  )
}

export function CreditScoreSkeleton() {
  return (
    <Flex justify="space-between" align="center">
      <Flex direction="column">
        <Skeleton width={155} height={50} />
        <Spacing size={8} />
        <Skeleton width={155} height={31} />
      </Flex>
    </Flex>
  )
}

export default CreditScore
