import { globalColors } from '@/globalColors';
import Image from 'next/image';
import Link from 'next/link';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import Rating from '@mui/material/Rating';

const AiPortfolioCard = ({
  description,
  title,
  stability,
  profitability,
  recommend,
}) => {
  return (
    <div className="group relative flex-1 flex flex-col h-full transition-[flex-grow,flex-shrink] duration-300 ease-in-out hover:flex-[4] hover:shrink-0">
      <div className="p-4 flex-1 flex flex-col gap-2 transition-opacity duration-300 rounded-md bg-pink-100 shadow-md">
        <div className="absolute inset-0 flex flex-col justify-center gap-2 p-4 transition-opacity duration-300 ease-in opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100">
          {/* 옵션 소개 */}
          <div className="opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 transition-all duration-150 ease-in">
            <p className="text-black text-2xl font-bold font-ng">
              {description}
            </p>
          </div>
          {/* 안정성 */}
          <div className="flex opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 transition-all duration-150 ease-in">
            <span className="font-ng font-bold text-xl">안정성</span>
            <Rating
              name="half-rating"
              defaultValue={stability}
              precision={0.5}
              readOnly
            />
          </div>
          {/* 수익성 */}
          <div className="flex opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 transition-all duration-150 ease-in">
            <span className="font-ng font-bold text-xl">수익성</span>
            <Rating
              name="half-rating"
              defaultValue={profitability}
              precision={0.5}
              readOnly
              sx={{ color: globalColors.hotpink[400] }}
            />
          </div>
          {/* 추천 성향 */}
          <div className="flex flex-col opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 transition-all duration-150 ease-in">
            <span className="font-ng font-bold text-xl">추천 성향</span>
            <span className="font-ng">{recommend}</span>
          </div>
        </div>
      </div>
      <span className="py-2 text-xl font-oneTitle">{title}</span>
    </div>
  );
};

export default function Index() {
  const logos = [
    'btc.avif',
    'eth.avif',
    'etc.avif',
    'doge.avif',
    'shib.avif',
    'xrp.avif',
    'sol.avif',
    'beam.avif',
    'pepe.avif',
    'metal.avif',
    'cro.avif',
    'ont.avif',
    'qtum.avif',
    'snt.avif',
    'storj.avif',
    'waves.avif',
    'xem.avif',
    'grs.avif',
    'steem.avif',
    'qkc.avif',
  ];

  const portfolioOptions = [
    {
      title: '요즘 핫한',
      description: '📈 최근 상승율이 높은 마켓들을 믿어보세요',
      stability: 4,
      profitability: 3.5,
      recommend:
        '단기 트렌드를 빠르게 반영하는 투자 스타일이라면 추천! 안정성과 수익성을 균형 있게 고려하는 투자자에게 적합합니다.',
    },
    {
      title: '잠재력 뿜뿜한',
      description: '🔍 미래 가치를 봅니다',
      stability: 5,
      profitability: 4,
      recommend:
        '장기적인 성장 가능성을 보는 투자자에게 추천! 코인의 본질적인 가치를 분석하고 꾸준히 투자하는 분들에게 적합합니다.',
    },
    {
      title: '화끈한',
      description: '⚡️ 하이 리스크 하이 리턴!',
      stability: 2,
      profitability: 5,
      recommend:
        '단기 고수익을 노리는 공격적인 투자자에게 추천! 변동성이 크지만 큰 수익을 기대하는 분들에게 적합합니다.',
    },
  ];

  return (
    <main className="min-h-screen max-w-screen overflow-hidden">
      {/* 1st Section 대표 멘트 */}
      <section className="w-full h-[30rem]">
        <Image
          src="/images/1st_section.avif"
          alt="배경 이미지"
          priority={true}
          layout="fill"
          objectFit="cover"
          quality={100}
          className="absolute inset-0 -z-10"
        />

        <div className="bottom-2 translate-x-[20vw] translate-y-[30vh] flex flex-col gap-2">
          <div className="flex flex-col gap-2">
            <span className="text-5xl text-white font-oneTitle text-shadow-black">
              미스터 크립이
            </span>
            <span className="text-5xl text-white font-oneTitle text-shadow-black">
              더 쉬운 코인 투자를 도와드립니다.
            </span>
          </div>
          <div className="flex gap-4">
            <div className="right-0 h-[2rem] rounded-md flex items-center opacity-80 hover:opacity-40 transition duration-100 ease-in">
              <span className="font-oneTitle text-white text-shadow-black">
                #크립토 비서
              </span>
            </div>
            <div className="right-0 h-[2rem] rounded-md flex items-center opacity-80 hover:opacity-40 transition duration-100 ease-in">
              <span className="font-oneTitle text-white text-shadow-black">
                #AI 포트폴리오
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 2nd Section 마키 */}
      <section className="w-full h-[40rem] bg-cover bg-center bg-white">
        <section className="[mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-200px),transparent_100%)]">
          <div className="animate-marqueeX whitespace-nowrap flex gap-6 pt-4">
            {[...logos, ...logos].map(logo => (
              <Image
                key={crypto.randomUUID()}
                src={`/images/marquee/${logo}`}
                alt="coin logo images"
                width={80}
                height={80}
                className="h-auto"
                draggable="false"
              />
            ))}
          </div>
        </section>
        <section className="bottom-2 translate-x-[20vw] translate-y-[40vh] flex">
          <div className="flex flex-col gap-10">
            <span className="text-5xl font-oneTitle text-shadow-black">
              Crypto Secretary for me
            </span>
            <div className="flex gap-4">
              <div className="right-0 h-[2rem] rounded-md flex items-center">
                <span className="font-oneTitle">
                  미스터 크립은 고객이 필요한 정보를 한 서비스 안에서 모두
                  제공합니다. <br />
                  자산을 확인하고, 시황과, 실시간 마켓 정보를 편하게 확인하세요.{' '}
                  <br />
                </span>
              </div>
            </div>
          </div>
          <Image
            alt="introduce service image"
            src="/images/introduce_service.avif"
            width={500}
            height={500}
            className="h-auto -translate-y-[30vh]"
          />
        </section>
      </section>

      {/* 3rd Section AI 포트폴리오 기능 소개 */}
      <section className="w-full h-[80rem] bg-cover bg-center">
        <section className="bottom-2 translate-x-[20vw] translate-y-[40vh] flex">
          <div className="flex flex-col gap-10">
            <div className="flex items-end gap-2">
              <span className="text-5xl font-oneTitle text-shadow-black">
                투자를 스마트하게
              </span>
              <AutoAwesomeIcon fontSize="large" color="primary" />
              <span className="text-lg font-oneTitle">
                v2 업데이트 추가 예정
              </span>
            </div>
            <div className="flex gap-4">
              <div className="right-0 h-[2rem] rounded-md flex items-center">
                <span className="flex flex-col font-oneTitle">
                  미스터 크립은 원하는 성향에 따라 현재 보유 중인 현금으로{' '}
                  <br />
                  매수 가능한 포트폴리오를 구성해줍니다.
                  <br />
                </span>
              </div>
            </div>
            <Link
              href="/signin"
              className="w-[8rem] h-[2rem] rounded-md flex items-center opacity-80 hover:opacity-40 transition duration-100 ease-in"
            >
              <span className="font-oneTitle text-main">체험하기 {'>'}</span>
            </Link>
          </div>
        </section>
        <section className="w-[60%] h-[40%] translate-x-1/3 translate-y-[50vh] flex gap-4">
          {portfolioOptions.map((option, index) => (
            <AiPortfolioCard key={index} {...option} />
          ))}
        </section>
      </section>
    </main>
  );
}
