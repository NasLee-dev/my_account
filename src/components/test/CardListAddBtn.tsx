import { collection, doc, writeBatch } from 'firebase/firestore'
import Button from '../shared/Button'
import { store } from '@/remote/firebase'
import { card_list } from '@/mock/card'
import { COLLECTIONS } from '@/constants/collection'

function CardListAddBtn() {
  const handleButtonClick = async () => {
    const batch = writeBatch(store)
    card_list.forEach((card) => {
      const cardRef = doc(collection(store, COLLECTIONS.CARD))
      batch.set(cardRef, card)
    })
    await batch.commit()
    alert('카드가 추가되었습니다.')
  }
  return <Button onClick={handleButtonClick}>카드 추가</Button>
}

export default CardListAddBtn
