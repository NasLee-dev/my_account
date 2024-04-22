import Image from 'next/image'
import ListRow from '../shared/ListRow'
import { useRouter } from 'next/router'
import withSusepnse from '@/hooks/withSuspense'
import { useQuery } from 'react-query'
import useUser from '@/hooks/useUser'
import { getPiggybanks } from '@/remote/piggyBank'
import { differenceInDays } from 'date-fns'
import Flex from '../shared/Flex'
import Text from '../shared/Text'
import addDelimeter from '@/utils/addDelimeter'

function PiggyBankRow() {
  const router = useRouter()
  const user = useUser()
  const { data } = useQuery(
    ['piggybank', user?.id],
    () => getPiggybanks(user?.id as string),
    {
      enabled: !!user?.id,
      suspense: true,
    },
  )
  if (data == null) {
    return (
      <div>
        <ul>
          <ListRow
            left={
              <Image
                src="https://cdn3.iconfinder.com/data/icons/banking-and-finance-24/64/Money-saving-piggy-bank-arrow-pig_-256.png"
                width={40}
                height={40}
                alt="piggy bank"
              />
            }
            contents={
              <ListRow.Texts
                title="저금통"
                subTitle="매일 매일 조금씩 저금하여 목표금액을 모아보세요."
              />
            }
            withArrow={true}
            onClick={() => {
              router.push('/account/piggybank/new')
            }}
          />
        </ul>
      </div>
    )
  }
  const { balance, startDate, endDate, goalAmount } = data
  const dday = differenceInDays(endDate, new Date())
  return (
    <div>
      <ul>
        <ListRow
          left={
            <Image
              src="https://cdn3.iconfinder.com/data/icons/banking-and-finance-24/64/Money-saving-piggy-bank-arrow-pig_-256.png"
              width={40}
              height={40}
              alt="piggy bank"
            />
          }
          contents={
            <Flex direction="column">
              <Text typography="t4" bold={true}>
                D-{dday}
              </Text>
              <Text>{addDelimeter(goalAmount - balance)}원 남았어요</Text>
            </Flex>
          }
          withArrow={true}
          onClick={() => {
            // TODO: 저금통 상세 페이지로 이동
          }}
        />
      </ul>
    </div>
  )
}

export default withSusepnse(PiggyBankRow, { fallback: <div>로딩중...</div> })
