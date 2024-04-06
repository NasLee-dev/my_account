import Button from '@/components/shared/Button'
import Flex from '@/components/shared/Flex'
import Spacing from '@/components/shared/Spacing'
import Text from '@/components/shared/Text'
import { BuiltInProviderType } from 'next-auth/providers'
import {
  ClientSafeProvider,
  LiteralUnion,
  getProviders,
  signIn,
} from 'next-auth/react'

function SignInPage({
  providers,
}: {
  providers: Record<LiteralUnion<BuiltInProviderType>, ClientSafeProvider>
}) {
  return (
    <div>
      <Spacing size={100} />
      <Flex direction="column" align="center">
        <Text bold={true}>My Account</Text>
        <Spacing size={80} />
        <ul>
          {Object.values(providers).map((provider) => (
            <li key={provider.id}>
              <Button
                onClick={() => {
                  signIn(provider.id, { callbackUrl: '/' })
                }}
              >
                Sign in with {provider.name}
              </Button>
            </li>
          ))}
        </ul>
      </Flex>
    </div>
  )
}

export async function getServerSideProps() {
  const providers = await getProviders()
  return {
    props: {
      providers,
    },
  }
}

export default SignInPage
