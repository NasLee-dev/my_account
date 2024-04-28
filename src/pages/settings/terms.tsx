import Button from '@/components/shared/Button'
import ListRow from '@/components/shared/ListRow'
import Text from '@/components/shared/Text'
import Top from '@/components/shared/Top'
import { 약관목록 } from '@/constants/account'
import useUser from '@/hooks/useUser'
import { User } from '@/models/user'
import { getTerms, updateTerms } from '@/remote/account'
import { GetServerSidePropsContext } from 'next'
import { getSession } from 'next-auth/react'
import { useMemo } from 'react'
import {
  QueryClient,
  dehydrate,
  useMutation,
  useQuery,
  useQueryClient,
} from 'react-query'

function TermsPage() {
  const user = useUser()
  const client = useQueryClient()
  const { data } = useQuery(
    ['terms', user?.id],
    () => getTerms(user?.id as string),
    {
      enabled: user != null,
    },
  )
  const 동의한약관목록 = useMemo(() => {
    if (data == null) {
      return null
    }
    const 동의전체약관목록 = 약관목록.filter((약관) =>
      data.termsId.includes(약관.id),
    )
    const 필수약관목록 = 동의전체약관목록.filter(
      ({ mandatory }) => mandatory === true,
    )
    const 선택약관목록 = 동의전체약관목록.filter(
      ({ mandatory }) => mandatory === false,
    )
    return {
      필수약관목록,
      선택약관목록,
    }
  }, [data])
  const { mutate, isLoading } = useMutation(
    (termsId: string[]) => updateTerms(user?.id as string, termsId),
    {
      onSuccess: () => {
        client.invalidateQueries(['terms', user?.id])
      },
      onError: () => {},
    },
  )
  const handleDisagree = (selectedTermId: string) => {
    const updatedTermIds = data?.termsId.filter((id) => selectedTermId !== id)
    if (updatedTermIds != null) {
      mutate(updatedTermIds)
    }
  }
  return (
    <div>
      <Top title="약관" subTitle="약관 리스트 및 철회" />

      {동의한약관목록 == null ? (
        <Text>동의한 약관 목록이 없습니다.</Text>
      ) : (
        <ul>
          {동의한약관목록.필수약관목록.map((term) => (
            <ListRow
              key={term.id}
              contents={
                <ListRow.Texts title={`[필수] ${term.title}`} subTitle="" />
              }
            />
          ))}
          {동의한약관목록.선택약관목록.map((term) => (
            <ListRow
              key={term.id}
              contents={
                <ListRow.Texts title={`[선택] ${term.title}`} subTitle="" />
              }
              right={
                <Button
                  onClick={() => {
                    handleDisagree(term.id)
                    alert('철회되었습니다.')
                  }}
                  disabled={isLoading}
                >
                  철회
                </Button>
              }
            />
          ))}
        </ul>
      )}
    </div>
  )
}

async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context)
  if (session != null && session.user != null) {
    const client = new QueryClient()
    await client.prefetchQuery(['terms', (session.user as User).id], () =>
      getTerms((session.user as User).id),
    )
    return {
      props: {
        dehyratedState: JSON.parse(JSON.stringify(dehydrate(client))),
      },
    }
  }
  return {
    props: {},
  }
}

export default TermsPage
