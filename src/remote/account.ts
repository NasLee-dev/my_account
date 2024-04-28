import { collection, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'
import { store } from './firebase'
import { COLLECTIONS } from '@/constants/collection'
import { Account } from '@/models/account'

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

export function createAccount(newAccount: Account) {
  return setDoc(
    doc(collection(store, COLLECTIONS.ACCOUNT), newAccount.userId),
    newAccount,
  )
}

export async function getAccount(userId: string) {
  const snapshot = await getDoc(
    doc(collection(store, COLLECTIONS.ACCOUNT), userId),
  )
  if (snapshot.exists() === false) {
    return null
  }
  return {
    id: snapshot.id,
    ...(snapshot.data() as Account),
  }
}

export function updateAccountBalance(userId: string, balance: number) {
  const snapshot = doc(collection(store, COLLECTIONS.ACCOUNT), userId)
  return updateDoc(snapshot, { balance })
}

export function updateTerms(userId: string, termsId: string[]) {
  const snapshot = doc(collection(store, COLLECTIONS.TERMS), userId)
  return updateDoc(snapshot, { termsId })
}

export { getTerms }
