import Image from "next/image"

export default function BlogRowImage({ src }: { src: string }) {
  return (
    <div className="relative aspect-[16/9] sm:aspect-[2/1] lg:aspect-square lg:w-64 lg:shrink-0">
      <Image
        src={src}
        alt=""
        width={500}
        height={500}
        className="absolute inset-0 h-full w-full rounded-2xl bg-gray-50 object-cover"
      />
      <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
    </div>
  )
}