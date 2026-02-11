import Image from "next/image";

export default function HomeHeroSection() {
  return (
    <section className="relative w-full pl-20 bg-black text-white rounded-b-4xl overflow-hidden">
      {/* 상단 영역 */}
      <div className="relative w-10/12 mx-auto aspect-21/9">
        <Image
          src="https://res.cloudinary.com/dfiaqyaug/image/upload/v1770427942/Frame_2085665719_r3hpi9.png"
          alt="데스노트 더 뮤지컬"
          fill
          priority
          className="object-contain object-bottom"
        />
      </div>
      <div></div>
    </section>
  );
}
