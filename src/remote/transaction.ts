import {
  QuerySnapshot,
  collection,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  setDoc,
  startAfter,
  where,
} from 'firebase/firestore'
import { store } from './firebase'
import { COLLECTIONS } from '@/constants/collection'
import { Transaction, TransactionFilterType } from '@/models/transaction'

export default function createTransaction(newTransaction: Transaction) {
  return setDoc(doc(collection(store, COLLECTIONS.TRANSACTION)), newTransaction)
}

export async function getTransactions({
  pageParam,
  userId,
  filter = 'all',
}: {
  userId: string
  pageParam?: QuerySnapshot<Transaction>
  filter?: TransactionFilterType
}) {
  const transactionQuery = generateQuery({
    filter,
    pageParam: pageParam!,
    userId,
  })
  const transactionSnapshot = await getDocs(transactionQuery)
  const lastVisible =
    transactionSnapshot.docs[transactionSnapshot.docs.length - 1]
  const items = transactionSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Transaction),
  }))
  return { items, lastVisible }
}

export function generateQuery({
  filter,
  pageParam,
  userId,
}: {
  filter: TransactionFilterType
  pageParam: QuerySnapshot<Transaction>
  userId: string
}) {
  const baseQuery = query(
    collection(store, COLLECTIONS.TRANSACTION),
    where('userId', '==', userId),
    orderBy('date', 'desc'),
    limit(15),
  )

  if (filter != 'all') {
    if (pageParam == null) {
      return query(baseQuery, where('type', '==', filter))
    }
    return query(baseQuery, startAfter(pageParam), where('type', '==', filter))
  } else {
    if (pageParam == null) {
      return baseQuery
    }
    return query(baseQuery, startAfter(pageParam))
  }
}
