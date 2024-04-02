import Image from 'next/image'
import Button from '../shared/Button'
import Flex from '../shared/Flex'
import Spacing from '../shared/Spacing'
import Text from '../shared/Text'

function Account() {
  const hasAccount = false
  if (hasAccount) {
    return (
      <div
        style={{
          padding: 24,
        }}
      >
        <Flex justify="space-between" align="center">
          <Flex direction="column">
            <Text typography="t6" color="gray600">
              이우택 회원님의 자산
            </Text>
            <Spacing size={2} />
            <Text typography="t3" bold={true}>
              7,000원
            </Text>
          </Flex>
          <Button>분석</Button>
        </Flex>
      </div>
    )
  }
  //	계좌 미보유, 계좌를 개설중일 경우도 포함
  //	READY || DONE
  const 계좌개설상태 = 'READY'
  const title =
    계좌개설상태 === 'READY'
      ? '만들고 있으신\n 계좌가 있으시군요'
      : '계좌 개설이\n 더 쉽고 빨라졌어요'
  const buttonLabel =
    계좌개설상태 === 'READY' ? '이어서 만들기' : '3분만에 개설하기'
  return (
    <div
      style={{
        padding: 24,
      }}
    >
      <Flex justify="space-between">
        <Flex direction="column">
          <Text
            bold={true}
            style={{
              whiteSpace: 'pre-wrap',
            }}
          >
            {title}
          </Text>
          <Spacing size={8} />
          <Button>{buttonLabel}</Button>
        </Flex>
        <Image
          src="https://cdn4.iconfinder.com/data/icons/business-and-finance-colorful-free-hand-drawn-set/100/money_dollars-256.png"
          alt=""
          width={80}
          height={80}
        />
      </Flex>
    </div>
  )
}

export default Account
