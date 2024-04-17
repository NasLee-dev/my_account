import { ChangeEvent, useState } from 'react'
import Flex from '../shared/Flex'
import TextField from '../shared/TextField'
import Select from '../shared/Select'
import Spacing from '../shared/Spacing'
import Button from '../shared/Button'
import { getAccount, updateAccountBalance } from '@/remote/account'
import createTransaction from '@/remote/transaction'
import { Transaction } from '@/models/transaction'

function TransactionForm() {
  const [formValues, setFormValues] = useState({
    userId: '',
    type: 'deposit',
    amount: '',
    displayText: '',
  })

  const handleFormValues = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormValues((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }
  const handleSubmit = async () => {
    const account = await getAccount(formValues.userId)
    if (account == null) {
      window && window.alert('해당 유저는 계좌를 보유하고 있지 않습니다.')
      return
    }
    if (
      formValues.type === 'withdraw' &&
      (account?.balance ?? 0) - Number(formValues.amount) < 0
    ) {
      window && window.alert('잔액이 부족합니다.')
      return
    }
    const balance =
      formValues.type === 'withdraw'
        ? (account?.balance ?? 0) - Number(formValues.amount)
        : (account?.balance ?? 0) + Number(formValues.amount)
    const newTransaction = {
      ...formValues,
      amount: Number(formValues.amount),
      date: new Date().toISOString(),
      balance,
    } as Transaction
    // 1. 거래를 기록한다.
    // 2. 계좌의 잔액을 업데이트한다.
    Promise.all([
      createTransaction(newTransaction),
      updateAccountBalance(formValues.userId, balance),
    ])

    console.log(newTransaction)
  }
  return (
    <div>
      <Flex direction="column">
        <TextField
          name="userId"
          label="유저아이디"
          value={formValues.userId}
          onChange={handleFormValues}
        />
        <Spacing size={8} />
        <Select
          value={formValues.type}
          onChange={handleFormValues}
          name="type"
          options={[
            {
              label: '입금',
              value: 'deposit',
            },
            {
              label: '출금',
              value: 'withdraw',
            },
          ]}
        />
        <Spacing size={8} />
        <TextField
          name="amount"
          label="입출금 금액"
          value={formValues.amount}
          onChange={handleFormValues}
        />
        <Spacing size={8} />
        <TextField
          name="displayText"
          label="화면에 노출할 텍스트"
          value={formValues.displayText}
          onChange={handleFormValues}
        />
        <Spacing size={8} />
        <Button
          onClick={() => {
            handleSubmit()
          }}
        >
          {formValues.type === 'deposit' ? '입금' : '출금'}
        </Button>
      </Flex>
    </div>
  )
}

export default TransactionForm
