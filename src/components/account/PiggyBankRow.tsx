import Image from 'next/image'
import ListRow from '../shared/ListRow'
import { useRouter } from 'next/router'

function PiggyBankRow() {
  const router = useRouter()
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

export default PiggyBankRow
