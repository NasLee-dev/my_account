import CardListAddBtn from '@/components/test/CardListAddBtn'
import EventBannerAddButton from '@components/test/EventBannerAddButton'
import Flex from '@components/shared/Flex'
import Spacing from '@components/shared/Spacing'
import Text from '@components/shared/Text'
import EventForm from '@/components/test/EventForm'
import TransactionForm from '@/components/test/TransactionForm'
import FAQAddButton from '@/components/test/FAQAddButton'

function TestPage() {
  return (
    <Flex direction="column">
      <EventBannerAddButton />

      <Spacing
        size={8}
        backgroundColor="gray100"
        style={{
          margin: '20px 0',
        }}
      />
      <Text bold={true}>카드</Text>
      <CardListAddBtn />
      <Spacing
        size={8}
        backgroundColor="gray100"
        style={{ margin: '20px 0' }}
      />
      <EventForm />
      <Spacing
        size={8}
        backgroundColor="gray100"
        style={{ margin: '20px 0' }}
      />
      <Text bold={true}>입출금 테스트</Text>
      <TransactionForm />
      <Spacing
        size={8}
        backgroundColor="gray100"
        style={{ margin: '20px 0' }}
      />
      <Text bold={true}>FAQ 추가 버튼</Text>
      <FAQAddButton />
    </Flex>
  )
}

export default TestPage
