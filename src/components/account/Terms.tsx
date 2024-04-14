import { 약관목록 } from '@/constants/account'
import { Term } from '@/models/account'
import { MouseEvent, useState } from 'react'
import Agreement from '../shared/Agreement'
import dynamic from 'next/dynamic'

const FixedBottomButton = dynamic(() => import('../shared/FixedBottomButton'), {
  ssr: false,
})
function Terms({ onNext }: { onNext: (termsId: string[]) => void }) {
  const [termsAgreements, setTermsAgreements] = useState(() =>
    generateInitialValues(약관목록),
  )
  const handleAgreement = (id: string, checked: boolean) => {
    setTermsAgreements((prev) => {
      return prev.map((term) => (term.id === id ? { ...term, checked } : term))
    })
  }
  const handleAllAgree = (_: MouseEvent<HTMLElement>, checked: boolean) => {
    setTermsAgreements((prev) => {
      return prev.map((term) => ({ ...term, checked }))
    })
  }

  const 모든약관이_동의되었는가 = termsAgreements.every((term) => term.checked)
  const 모든필수약관이_동의되었는가 = termsAgreements
    .filter((term) => term.mandatory)
    .every((term) => term.checked)
  return (
    <div>
      <Agreement>
        <Agreement.Title
          checked={모든약관이_동의되었는가}
          onChange={handleAllAgree}
        >
          약관 모두 동의
        </Agreement.Title>
        {termsAgreements.map((term) => (
          <Agreement.Description
            key={term.id}
            link={term.link}
            checked={term.checked}
            onChange={(_, checked) => {
              handleAgreement(term.id, checked)
            }}
          >
            {term.mandatory ? '[필수]' : '[선택]'} {term.title}
          </Agreement.Description>
        ))}
      </Agreement>
      <FixedBottomButton
        label="약관동의"
        disabled={모든필수약관이_동의되었는가 === false}
        onClick={() => {
          onNext(
            termsAgreements
              .filter((term) => term.checked)
              .map((term) => term.id),
          )
        }}
      />
    </div>
  )
}

function generateInitialValues(terms: Term[]) {
  return terms.map((term) => ({
    ...term,
    checked: false,
  }))
}

export default Terms
