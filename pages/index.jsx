import { useRouter } from 'next/router';
import { globalColors } from '@/globalColors';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Rating from '@mui/material/Rating';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

function Navbar() {
  const router = useRouter();

  const handleRoute = () => router.push('/signin');

  return (
    <nav className="fixed top-0 left-0 z-50 w-full bg-transparent shadow-md backdrop-blur-lg">
      <div className="max-w-5xl px-6 py-4 mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Image
            alt="navbar logo image"
            src={'/images/logo_mustache.webp'}
            width="60"
            height="60"
            className="w-auto h-3"
          />
          <span className="text-[1.5rem] text-white font-aggro font-bold italic text-shadow-black">
            Mr.cryp
          </span>
        </div>

        <div className="flex gap-6">
          <a
            onClick={handleRoute}
            className=" w-[6rem] h-[2rem] rounded-md cursor-pointer hover:opacity-40 transition duration-100 ease-in"
          >
            <span className="text-xl max-sm:text-lg font-bold text-black font-oneTitle">
              시작하기
            </span>
          </a>
        </div>
      </div>
    </nav>
  );
}

function Header() {
  return (
    <>
      <Image
        src="/images/1st_section.avif"
        alt="배경 이미지"
        priority={true}
        layout="fill"
        objectFit="cover"
        quality={100}
        className="absolute inset-0 -z-10"
      />
      <section className="w-full max-w-[75rem] mx-auto px-10 sm:px-16 md:px-20 lg:px-24 xl:px-32 pt-60 flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <span className="text-5xl lg:text-4xl md:text-3xl sm:text-2xl xs:text-xl text-white font-oneTitle text-shadow-black">
            미스터 크립이
          </span>
          <span className="text-5xl lg:text-4xl md:text-3xl sm:text-2xl xs:text-xl text-white font-oneTitle text-shadow-black">
            더 쉬운 코인 투자를 도와드립니다.
          </span>
        </div>
        <div className="flex gap-4">
          <div className="h-[2rem] rounded-md flex items-center opacity-80 hover:opacity-40 transition duration-100 ease-in">
            <span className="text-white font-oneTitle text-shadow-black">
              #크립토 비서
            </span>
          </div>
          <div className="h-[2rem] rounded-md flex items-center opacity-80 hover:opacity-40 transition duration-100 ease-in">
            <span className="text-white font-oneTitle text-shadow-black">
              #AI 포트폴리오
            </span>
          </div>
        </div>
      </section>
    </>
  );
}

function Marquee() {
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

  return (
    <div className="pt-4 flex gap-6 animate-marqueeX whitespace-nowrap">
      {[...logos, ...logos].map(logo => (
        <Image
          key={crypto.randomUUID()}
          src={`/images/marquee/${logo}`}
          alt="coin logo images"
          width={80}
          height={80}
          className="h-auto max-sm:w-[10%]"
          draggable="false"
        />
      ))}
    </div>
  );
}

function Introduce() {
  return (
    <>
      <div className="flex flex-col gap-10 max-md:gap-20">
        <span className="break-words text-5xl max-lg:text-4xl max-md:text-2xl max-sm:text-lg max-lg:text-shadow-none font-oneTitle text-shadow-black whitespace-nowrap">
          Crypto Secretary for me
        </span>
        <div className="flex gap-4">
          <div className="h-[2rem] rounded-md flex items-center">
            <span className="text-lg max-sm:text-sm max-md:text-[1rem] font-oneTitle">
              미스터 크립은 고객이 필요한 정보를 모두 제공합니다. <br />
              자산, 뉴스, 실시간 가격과 차트를 편하게 확인하세요. <br />
            </span>
          </div>
        </div>
      </div>
      <Image
        alt="introduce service image"
        src="/images/introduce_service.avif"
        width={400}
        height={400}
        className="w-[50%] md:w-[30%]"
      />
    </>
  );
}

function AiInvestIntroduce() {
  return (
    <div className="flex flex-col gap-10">
      <div className="flex items-end gap-2">
        <span className="text-5xl max-lg:text-4xl max-md:text-2xl max-sm:text-lg font-oneTitle text-shadow-black max-lg:text-shadow-none">
          투자를 스마트하게
        </span>
        <AutoAwesomeIcon
          fontSize="large"
          color="primary"
          sx={{
            '@media (max-width:900px)': {
              fontSize: '1rem',
            },
          }}
        />
        <span className="text-lg max-md:text-sm font-oneTitle">
          v2 업데이트 추가 예정
        </span>
      </div>
      <div className="flex gap-4">
        <div className="h-[2rem] rounded-md flex items-center">
          <span className="flex flex-col text-lg max-sm:text-sm font-oneTitle">
            미스터 크립은 원하는 성향에 따라 현재 보유 중인 현금으로 <br />
            매수 가능한 포트폴리오를 구성해줍니다.
            <br />
          </span>
        </div>
      </div>
      <Link
        href="/signin"
        className="w-[8rem] h-[2rem] rounded-md opacity-80 flex items-center hover:opacity-40 transition duration-100 ease-in"
      >
        <span className="text-lg font-oneTitle text-main">체험하기 {'>'}</span>
      </Link>
    </div>
  );
}

function AiPortfolioCard({
  description,
  title,
  stability,
  profitability,
  recommend,
}) {
  return (
    <div className="group relative max-md:w-[60rem] max-sm:w-[30%] h-[30rem] flex-1 flex flex-col hover:flex-[4] hover:shrink-0 transition-[flex-grow,flex-shrink] duration-300 ease-in-out">
      <div className="bg-pink-100 rounded-md shadow-md flex flex-col flex-1 gap-2 transition-opacity duration-300">
        <div className="absolute inset-0 p-4 scale-90 opacity-0 flex flex-col justify-around gap-2 transition-opacity duration-300 ease-in group-hover:opacity-100 group-hover:scale-100">
          {/* 옵션 소개 */}
          <div className="scale-90 opacity-0 transition-all duration-150 ease-in group-hover:opacity-100 group-hover:scale-100">
            <p className="text-2xl max-lg:text-xl max-sm:text-lg text-black font-oneTitle">
              {description}
            </p>
          </div>
          <div className="flex flex-col gap-2">
            {/* 안정성 */}
            <div className="scale-90 opacity-0 flex gap-2 transition-all duration-150 ease-in group-hover:opacity-100 group-hover:scale-100">
              <span className="text-xl max-sm:text-sm font-bold font-ng">
                안정성
              </span>
              <Rating
                name="half-rating"
                defaultValue={stability}
                precision={0.5}
                readOnly
              />
            </div>
            {/* 수익성 */}
            <div className="scale-90 opacity-0 flex gap-2 transition-all duration-150 ease-in group-hover:opacity-100 group-hover:scale-100">
              <span className="text-xl max-sm:text-sm font-bold font-ng">
                수익성
              </span>
              <Rating
                name="half-rating"
                defaultValue={profitability}
                precision={0.5}
                readOnly
                sx={{ color: globalColors.hotpink[400] }}
              />
            </div>
            {/* 추천 성향 */}
            <div className="scale-90 opacity-0 flex flex-col transition-all duration-150 ease-in group-hover:opacity-100 group-hover:scale-100">
              <span className="text-xl max-sm:text-sm font-bold font-ng">
                추천 성향
              </span>
              <span className="max-sm:text-sm font-ng">{recommend}</span>
            </div>
          </div>
        </div>
      </div>
      <span className="py-2 text-xl max-sm:text-sm font-oneTitle">{title}</span>
    </div>
  );
}

function Footer() {
  return (
    <div className="w-full max-w-[75rem] mx-auto px-10 sm:px-16 md:px-20 lg:px-24 xl:px-32 flex flex-col gap-4">
      <span className="text-md text-gray-400 font-ng">
        Copyrights All reserved © Mr.Cryp 2024
      </span>
      <span className="text-md text-gray-400 font-ng">
        Contact - https://github.com/window-ook
      </span>
    </div>
  );
}

export default function Index() {
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
      stability: 4.5,
      profitability: 3,
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
    <main className="min-h-screen overflow-hidden max-w-screen">
      <Head>
        <title>미스터 크립 Mr.cryp</title>
      </Head>
      <Navbar />
      {/* 1st Section */}
      <section className="relative w-full h-[30rem]">
        <Header />
      </section>
      {/* 2nd Section */}
      <section className="w-full h-[45rem] bg-gray-50 bg-cover bg-center">
        <section className="[mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-200px),transparent_100%)]">
          <Marquee />
        </section>
        <section className="w-full max-w-[75rem] mx-auto px-10 sm:px-16 md:px-20 lg:px-24 xl:px-32 pt-60 flex items-center gap-4">
          <Introduce />
        </section>
      </section>
      {/* 3rd Section */}
      <section className="w-full h-[65rem]">
        <section className="w-full max-w-[75rem] mx-auto px-10 sm:px-16 md:px-20 lg:px-24 xl:px-32 pt-60 flex items-center gap-4">
          <AiInvestIntroduce />
        </section>
        <section className="w-full max-w-[75rem] mx-auto px-10 sm:px-16 md:px-20 lg:px-24 xl:px-32 flex items-center gap-4">
          {portfolioOptions.map((option, index) => (
            <AiPortfolioCard key={index} {...option} />
          ))}
        </section>
      </section>
      {/* 4th Section */}
      <section className="w-full h-[10rem] bg-gray-700 flex items-center">
        <Footer />
      </section>
    </main>
  );
}
