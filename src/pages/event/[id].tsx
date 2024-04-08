import Preview from '@/components/event/Preview'
import { useAlertContext } from '@/contexts/AlertContext'
import { Event } from '@/models/event'
import { getEvent } from '@/remote/event'
import { isAfter, parseISO } from 'date-fns'
import { GetServerSidePropsContext } from 'next'
import { useQuery } from 'react-query'

interface EventPageProps {
  initialEvnent: Event
  id: string
}

function EventPage({ initialEvnent, id }: EventPageProps) {
  const { open } = useAlertContext()
  const { data } = useQuery(['event', id], () => getEvent(id), {
    initialData: initialEvnent,
    onSuccess: (event) => {
      const 이벤트가종료되었는가 = isAfter(new Date(), parseISO(event.endDate))
      console.log(event)
      if (이벤트가종료되었는가) {
        open({
          title: `${event.title} 이벤트가 종료되었습니다`,
          description: '다음 이벤트를 기대해주세요',
          onButtonClick: () => {
            window.history.back()
          },
        })
      }
    },
  })
  if (data == null) return null
  return <Preview data={initialEvnent} mode="preview" />
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { id } = context.query
  const event = await getEvent(id as string)
  console.log(event)
  return {
    props: {
      id,
      initialEvnent: event,
    },
  }
}

export default EventPage
