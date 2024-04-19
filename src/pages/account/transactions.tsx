import useTransactions from '@/components/account/hooks/useTransactions'
import Flex from '@/components/shared/Flex'
import ListRow from '@/components/shared/ListRow'
import Text from '@/components/shared/Text'
import withAuth from '@/hooks/withAuth'
import { TransactionFilterType } from '@/models/transaction'
import { User } from '@/models/user'
import { getTransactions } from '@/remote/transaction'
import addDelimeter from '@/utils/addDelimeter'
import { format, parseISO } from 'date-fns'
import { GetServerSidePropsContext } from 'next'
import { getSession } from 'next-auth/react'
import { useCallback, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { QueryClient, dehydrate } from 'react-query'

const FILTERS: Array<{ label: string; value: TransactionFilterType }> = [
  { label: '전체', value: 'all' },
  { label: '입금', value: 'deposit' },
  { label: '출금', value: 'withdraw' },
]

function TransactionsPage() {
  const [currentFilter, setCurrentFilter] =
    useState<TransactionFilterType>('all')
  const {
    data,
    hasNextPage = false,
    isFetching,
    fetchNextPage,
  } = useTransactions({
    suspense: true,
    filter: currentFilter,
  })

  const loadMore = useCallback(() => {
    if (hasNextPage === false || isFetching) {
      return
    }
    fetchNextPage()
  }, [hasNextPage, isFetching, fetchNextPage])
  const transactions = data?.pages.map(({ items }) => items).flat() ?? []

  return (
    <div>
      <Flex
        as="ul"
        justify="flex-end"
        style={{
          padding: 24,
        }}
      >
        {FILTERS.map((filter) => (
          <li
            key={filter.value}
            onClick={() => {
              setCurrentFilter(filter.value)
            }}
          >
            {filter.label}
          </li>
        ))}
      </Flex>
      <InfiniteScroll
        dataLength={transactions.length}
        hasMore={hasNextPage}
        loader={<></>}
        next={loadMore}
        scrollThreshold="100px"
      >
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
      </InfiniteScroll>
    </div>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context)
  if (session != null && session.user != null) {
    const client = new QueryClient()
    await client.prefetchInfiniteQuery(
      ['transctions', (session.user as User)?.id, 'all'],
      () => getTransactions({ userId: (session.user as User)?.id }),
    )
    return {
      props: {
        dehydratedState: JSON.parse(JSON.stringify(dehydrate(client))),
      },
    }
  }
  return {
    props: {},
  }
}

export default withAuth(TransactionsPage)
