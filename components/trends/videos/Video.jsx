import Image from 'next/image';

export default function Video({ width, height, src, title, linkUrl }) {
  const handleClick = () => window.open(linkUrl);

  return (
    <button
      className="relative w-full h-auto overflow-hidden rounded-sm cursor-pointer hover:opacity-70 transition-opacity duration-300 ease"
      aria-label="영상 원본으로 이동하기"
      onClick={handleClick}
    >
      <Image
        alt={title || '트렌드 영상 썸네일'}
        src={src}
        width={width}
        height={height}
        priority
        title={title}
        style={{
          width: '100%',
          height: 'auto',
        }}
      />
    </button>
  );
}
