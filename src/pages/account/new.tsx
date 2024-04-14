import Terms from '@/components/account/Terms'
import ProgressBar from '@/components/shared/ProgressBar'
import useUser from '@/hooks/useUser'
import withAuth from '@/hooks/withAuth'
import { User } from '@/models/user'
import setTerms, { getTerms } from '@/remote/account'
import { GetServerSidePropsContext } from 'next'
import { getSession } from 'next-auth/react'
import { useState } from 'react'

// step 0 : 약관동의
// step 1 : 계좌 개설 폼 페이지
// step 2 : 계좌 개설 완료 페이지
const LAST_STEP = 2

function AccountNew({ initialStep }: { initialStep: number }) {
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
    </div>
  )
}

async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context)
  const agreedTerms = await getTerms((session?.user as User).id)
  if (agreedTerms == null) {
    return {
      props: {
        initialStep: 0,
      },
    }
  }
  if (agreedTerms != null) {
    return {
      props: {
        initialStep: 1,
      },
    }
  }
  return {
    props: {
      initialStep: 0,
    },
  }
}

export default withAuth(AccountNew)
