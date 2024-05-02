import Image from 'next/image'

export default function ImagePage() {
  return (
    <div>
      <Image
        src="/image.jpg"
        alt="Image"
        width={200}
        height={200}
        layout="responsive"
      />
    </div>
  )
}
