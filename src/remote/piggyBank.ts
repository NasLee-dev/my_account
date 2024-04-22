import { PiggyBank } from '@/models/piggybank'
import {
  collection,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  setDoc,
  where,
} from 'firebase/firestore'
import { store } from './firebase'
import { COLLECTIONS } from '@/constants/collection'

export function createPiggybank(newPiggybank: PiggyBank) {
  return setDoc(doc(collection(store, COLLECTIONS.PIGGYBANK)), newPiggybank)
}

export async function getPiggybanks(userId: string) {
  const snapshot = await getDocs(
    query(
      collection(store, COLLECTIONS.PIGGYBANK),
      where('userId', '==', userId),
      where('endDate', '>=', new Date()),
      orderBy('endDate', 'asc'),
      limit(1),
    ),
  )

  if (!snapshot) {
    return null
  }
  const piggybank = snapshot.docs[0].data()
  return {
    id: snapshot.docs[0].id,
    ...(piggybank as PiggyBank),
    startDate: piggybank.startDate.toDate(),
    endDate: piggybank.endDate.toDate(),
  }
}
