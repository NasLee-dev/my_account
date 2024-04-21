import withAuth from '@/hooks/withAuth'
import dynamic from 'next/dynamic'

const Transactions = dynamic(() => import('@/components/account/Transactions'))
const MonthlyChart = dynamic(() => import('@/components/account/MonthlyChart'))

function AccountPage() {
  return (
    <div>
      <MonthlyChart chartData={generateMonthlyChartData()} />
      <Transactions />
    </div>
  )
}

function generateMonthlyChartData() {
  return [
    '2023-01-31',
    '2023-02-28',
    '2023-03-31',
    '2023-04-30',
    '2023-05-31',
    '2023-06-30',
    '2023-07-31',
    '2023-08-31',
    '2023-09-30',
    '2023-10-31',
    '2023-11-30',
    '2023-12-31',
  ].map((date) => ({
    date,
    balance: Math.floor(Math.random() * (100000 - 10000 + 1)),
  }))
}

export default withAuth(AccountPage)
