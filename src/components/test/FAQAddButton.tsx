import { collection, doc, writeBatch } from 'firebase/firestore'
import Button from '../shared/Button'
import { store } from '@/remote/firebase'
import { COLLECTIONS } from '@/constants/collection'
const FAQS = [
  {
    question: 'My Account는 어떤 서비스인가요?',
    answer:
      'My Account는 개인정보를 안전하게 보호하고, 편리하게 이용할 수 있도록 도와주는 서비스입니다. 회원님의 개인정보를 안전하게 보호하기 위해 비밀번호를 확인합니다.',
  },
  {
    question: 'My Account는 어떤 서비스인가요?2',
    answer: 'My Account',
  },
  {
    question: 'My Account는 어떤 서비스인가요?3',
    answer: 'My Account',
  },
]

function FAQAddButton() {
  const handleButtonClick = () => {
    const batch = writeBatch(store)
    FAQS.forEach((faq) => {
      const docRef = doc(collection(store, COLLECTIONS.FAQ))
      batch.set(docRef, faq)
    })
    batch.commit().then(() => {
      window.alert('FAQ가 추가되었습니다.')
    })
  }
  return <Button onClick={handleButtonClick}>FAQ 추가하기</Button>
}

export default FAQAddButton
