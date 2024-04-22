import withAuth from '@/hooks/withAuth'
import TextField from '@/components/shared/TextField'
import Flex from '@/components/shared/Flex'
import { useCallback, useMemo, useState } from 'react'
import dynamic from 'next/dynamic'
import { format } from 'date-fns'
import { PiggyBank } from '@/models/piggybank'
import useUser from '@/hooks/useUser'
import { useMutation } from 'react-query'
import { createPiggybank } from '@/remote/piggyBank'
import { useAlertContext } from '@/contexts/AlertContext'

const FixedBottomButton = dynamic(
  () => import('@/components/shared/FixedBottomButton'),
)

function NewPiggyBankPage() {
  const user = useUser()
  const { open } = useAlertContext()
  const [formValues, setFormValues] = useState({
    name: '',
    endDate: '',
    goalAmount: '',
  })

  const minDate = useMemo(() => format(new Date(), 'yyyy-MM-dd'), []) //	계속 바뀌는 값이 아니므로.

  const handleFormValues = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target
      setFormValues((prev) => ({
        ...prev,
        [name]: value,
      }))
    },
    [formValues],
  )
  const { mutate, isLoading } = useMutation(
    (newPiggybank: PiggyBank) => createPiggybank(newPiggybank),
    {
      onSuccess: () => {
        open({
          title: '새로운 저금통을 만들었어요',
          onButtonClick: () => {
            window.history.back()
          },
        })
      },
      onError: () => {
        open({
          title: '저금통 생성에 실패했어요',
          description: '다시 시도해주세요',
          onButtonClick: () => {
            window.history.back()
          },
        })
      },
    },
  )
  const handleSubmit = () => {
    const newPiggyBank = {
      ...formValues,
      goalAmount: Number(formValues.goalAmount),
      userId: user?.id as string,
      startDate: new Date(),
      endDate: new Date(formValues.endDate),
      balance: 0,
    } as PiggyBank
    mutate(newPiggyBank)
  }
  return (
    <div>
      <Flex direction="column">
        <TextField
          name="name"
          label="통장이름"
          value={formValues.name}
          onChange={handleFormValues}
        />
        <TextField
          name="endDate"
          type="date"
          label="종료일자"
          min={minDate}
          value={formValues.endDate}
          onChange={handleFormValues}
        />
        <TextField
          name="goalAmount"
          label="목표금액"
          type="number"
          value={formValues.goalAmount}
          onChange={handleFormValues}
        />
      </Flex>
      <FixedBottomButton
        label="저금통 생성하기"
        disabled={isLoading == true}
        onClick={() => {
          handleSubmit()
        }}
      />
    </div>
  )
}

export default withAuth(NewPiggyBankPage)
