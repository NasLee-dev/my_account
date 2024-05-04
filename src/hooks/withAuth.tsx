import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { ComponentType } from 'react'

function withAuth<Props = Record<string, never>>(
  WrappedComponent: ComponentType<Props>,
) {
  return function AuthenticatedComponent(props: Props) {
    const router = useRouter()
    const { data, status } = useSession()
    if (status === 'loading') return null
    if (data == null) {
      router.replace('/auth/signin')
      return null
    }
    return <WrappedComponent {...(props as any)} />
  }
}

export default withAuth
