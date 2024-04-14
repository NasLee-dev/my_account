import { collection, doc, getDoc, setDoc } from 'firebase/firestore'
import { store } from './firebase'
import { COLLECTIONS } from '@/constants/collection'

export default function setTerms({
  userId,
  termsId,
}: {
  userId: string
  termsId: string[]
}) {
  return setDoc(doc(collection(store, COLLECTIONS.TERMS), userId), {
    userId,
    termsId,
  })
}

async function getTerms(userId: string) {
  const snapshot = await getDoc(
    doc(collection(store, COLLECTIONS.TERMS), userId),
  )
  if (snapshot.exists() === false) {
    return null
  }
  return {
    id: snapshot.id,
    ...(snapshot.data() as { userId: string; termsId: string[] }),
  }
}

export { getTerms }
