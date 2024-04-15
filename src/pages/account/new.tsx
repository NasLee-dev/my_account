import Form from '@/components/account/Form'
import Terms from '@/components/account/Terms'
import FullPageLoader from '@/components/shared/FullPageLoader'
import ProgressBar from '@/components/shared/ProgressBar'
import useUser from '@/hooks/useUser'
import withAuth from '@/hooks/withAuth'
import { Account } from '@/models/account'
import { User } from '@/models/user'
import setTerms, { createAccount, getAccount, getTerms } from '@/remote/account'
import { GetServerSidePropsContext } from 'next'
import { getSession } from 'next-auth/react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { useState } from 'react'

const FixedBottomButton = dynamic(
  () => import('@/components/shared/FixedBottomButton'),
)

// step 0 : 약관동의
// step 1 : 계좌 개설 폼 페이지
// step 2 : 계좌 개설 완료 페이지
const LAST_STEP = 2

function AccountNew({ initialStep }: { initialStep: number }) {
  const router = useRouter()
  const [step, setStep] = useState(initialStep)
  const user = useUser()
  return (
    <div>
      <ProgressBar progress={step / LAST_STEP} />
      {step === 0 ? (
        <Terms
          onNext={async (termsId) => {
            await setTerms({ userId: user?.id as string, termsId })
            setStep(step + 1)
          }}
        />
      ) : null}
      {step === 1 ? (
        <Form
          onNext={async (formValues) => {
            const newAccount = {
              ...formValues,
              accountNumber: Date.now(),
              balance: 0,
              status: 'READY',
              userId: user?.id as string,
            } as Account
            await createAccount(newAccount)
            setStep(step + 1)
          }}
        />
      ) : null}
      {step === 2 ? (
        <>
          <FullPageLoader message="계좌 개설 신청이 완료되었어요" />
          <FixedBottomButton
            label="확인"
            onClick={() => {
              router.push('/')
            }}
          />
        </>
      ) : null}
    </div>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context)
  const agreedTerms = await getTerms((session?.user as User).id)
  if (agreedTerms == null) {
    return {
      props: {
        initialStep: 0,
      },
    }
  }
  const account = await getAccount((session?.user as User).id)
  if (account == null) {
    return {
      props: {
        initialStep: 1,
      },
    }
  }
  return {
    props: {
      initialStep: 2,
    },
  }
}

export default withAuth(AccountNew)
