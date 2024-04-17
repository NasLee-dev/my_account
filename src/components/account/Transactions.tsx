import withSusepnse from '@/hooks/withSuspense'
import useTransactions from './hooks/useTransactions'
import Flex from '../shared/Flex'
import Text from '../shared/Text'
import ListRow from '../shared/ListRow'
import { format, parseISO } from 'date-fns'
import addDelimeter from '@/utils/addDelimeter'
import Link from 'next/link'
import Button from '../shared/Button'

function Transactions() {
  const { data } = useTransactions({ suspense: true })
  const transactions = data?.pages
    .map(({ items }) => items)
    .flat()
    .slice(0, 5)
  return (
    <div>
      <Text
        bold={true}
        style={{
          padding: 24,
        }}
      >
        입출금 내역
      </Text>
      {transactions?.length === 0 ? (
        <Flex
          style={{
            padding: 24,
          }}
        >
          <Text>입출금 내역이 없습니다.</Text>
        </Flex>
      ) : (
        <ul>
          {transactions?.map((transaction: any) => {
            const 입금인가 = transaction.type === 'deposit'
            return (
              <ListRow
                key={transaction.id}
                contents={
                  <ListRow.Texts
                    title={transaction.displayText}
                    subTitle={format(
                      parseISO(transaction.date),
                      'yyyy-MM-dd HH:mm:SS',
                    )}
                  />
                }
                right={
                  <Flex direction="column" align="flex-end">
                    <Text color={입금인가 ? 'blue' : 'red'} bold={true}>
                      {입금인가 ? '+' : '-'} {addDelimeter(transaction.amount)}
                      원
                    </Text>
                    <Text>{addDelimeter(transaction.balance)}원</Text>
                  </Flex>
                }
              />
            )
          })}
        </ul>
      )}
      <Link href="/account/transactions">
        <Button full={true} size="medium" weak={true}>
          자세히 보기
        </Button>
      </Link>
    </div>
  )
}

export default withSusepnse(Transactions, { fallback: <div>Loading...</div> })
