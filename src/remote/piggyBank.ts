import { PiggyBank } from '@/models/piggybank'
import { collection, doc, setDoc } from 'firebase/firestore'
import { store } from './firebase'
import { COLLECTIONS } from '@/constants/collection'

export default function createPiggybank(newPiggybank: PiggyBank) {
  return setDoc(doc(collection(store, COLLECTIONS.PIGGYBANK)), newPiggybank)
}
