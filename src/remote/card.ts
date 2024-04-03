import { Card } from '@/models/card'
import {
  QuerySnapshot,
  collection,
  getDocs,
  limit,
  query,
  startAfter,
} from 'firebase/firestore'
import { store } from './firebase'
import { COLLECTIONS } from '@/constants/collection'

async function getCards(pageParam?: QuerySnapshot<Card>) {
  const cardQuery =
    pageParam == null
      ? query(collection(store, COLLECTIONS.CARD), limit(15))
      : query(
          collection(store, COLLECTIONS.CARD),
          startAfter(pageParam),
          limit(15),
        )
  const cardSnapshot = await getDocs(cardQuery)
  const lastVisible = cardSnapshot.docs[cardSnapshot.docs.length - 1]
  const items = cardSnapshot.docs.map((doc) => {
    return { ...(doc.data() as Card), id: doc.id }
  })
  return { items, lastVisible }
}

export default getCards
