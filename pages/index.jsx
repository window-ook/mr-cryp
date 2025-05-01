import { useRef } from 'react';
import { useRouter } from 'next/router';
import { FaStar } from 'react-icons/fa6';
import { useInView } from 'motion/react';
import * as m from 'motion/react-m';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

const Navbar = () => {
  const router = useRouter();

  const handleRoute = () => router.push('/auth');

  return (
    <nav className="fixed top-0 left-0 z-50 w-full bg-transparent shadow-md backdrop-blur-lg">
      <div className="max-w-5xl px-6 py-4 mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Image
            alt="navbar logo image"
            src={'/images/mustachetrans.webp'}
            width="60"
            height="60"
            className="w-auto h-4"
          />
          <span className="font-navbar-mrcryp">Mr.cryp</span>
        </div>

        <div className="flex gap-6">
          <a
            onClick={handleRoute}
            className="w-[6rem] h-[2rem] rounded-md cursor-pointer hover:opacity-40 transition duration-150 ease"
          >
            <span className="font-navbar-button">시작하기</span>
          </a>
        </div>
      </div>
    </nav>
  );
};

const Header = () => {
  return (
    <>
      <Image
        src="/images/home_background.avif"
        alt="배경 이미지"
        priority={true}
        quality={100}
        width={5760}
        height={4000}
        className="absolute inset-0 -z-10 object-cover w-full h-full"
      />
      <section className="max-w-[75rem] w-full mx-auto pt-60 px-10 xl:px-32 lg:px-24 md:px-20 sm:px-16 flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <span className="font-title-primary text-xl lg:text-5xl md:text-3xl sm:text-2xl text-white text-shadow-black">
            미스터 크립이
          </span>
          <span className="font-title-primary text-xl lg:text-5xl md:text-3xl sm:text-2xl text-white text-shadow-black whitespace-nowrap">
            코인 투자를 더 쉽게 해드립니다.
          </span>
        </div>
        <div className="flex gap-4">
          <div className="h-[2rem] rounded-md flex items-center opacity-80 hover:opacity-40 transition duration-100 ease-in">
            <span className="font-onetitle text-white text-shadow-black">
              #모의투자
            </span>
          </div>
          <div className="h-[2rem] rounded-md flex items-center opacity-80 hover:opacity-40 transition duration-100 ease-in">
            <span className="font-onetitle text-white text-shadow-black">
              #AI 포트폴리오
            </span>
          </div>
        </div>
      </section>
    </>
  );
};

const Marquee = () => {
  const LOGO_IMGS = [
    '/images/coin-logos/bitcoin-btc-logo.svg',
    '/images/coin-logos/bitcoin-cash-bch-logo.svg',
    '/images/coin-logos/dogecoin-doge-logo.svg',
    '/images/coin-logos/ethereum-eth-logo.svg',
    '/images/coin-logos/meme-meme-logo.svg',
    '/images/coin-logos/monero-xmr-logo.svg',
    '/images/coin-logos/onbeam-beam-logo.svg',
    '/images/coin-logos/pepe-pepe-logo.svg',
    '/images/coin-logos/polkadot-new-dot-logo.svg',
    '/images/coin-logos/qtum-qtum-logo.svg',
    '/images/coin-logos/shiba-inu-shib-logo.svg',
    '/images/coin-logos/solana-sol-logo.svg',
    '/images/coin-logos/storj-storj-logo.svg',
    '/images/coin-logos/the-sandbox-sand-logo.svg',
    '/images/coin-logos/tron-trx-logo.svg',
    '/images/coin-logos/xrp-xrp-logo.svg',
    '/images/coin-logos/near-protocol-near-logo.svg',
  ];

  return (
    <div className="relative w-full flex items-center overflow-hidden">
      <div className="pt-4 flex gap-4 animate-marquee whitespace-nowrap">
        {LOGO_IMGS.map((logo, i) => (
          <object
            key={`1-${logo}-${i}`}
            data={logo}
            type="image/svg+xml"
            className="inline-block h-8 w-8 sm:h-20 sm:w-20"
            aria-label="coin logo"
          />
        ))}
      </div>
      <div className="ml-2 pt-4 flex gap-4 animate-marquee2 whitespace-nowrap">
        {LOGO_IMGS.map((logo, i) => (
          <object
            key={`2-${logo}-${i}`}
            data={logo}
            type="image/svg+xml"
            className="inline-block h-8 w-8 sm:h-20 sm:w-20"
            aria-label="coin logo"
          />
        ))}
      </div>
    </div>
  );
};

const Introduce = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.7 });

  return (
    <div ref={ref} className="flex flex-col sm:flex-row items-center">
      <m.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : -100 }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
        className="w-full flex flex-col gap-10"
      >
        <p className="font-title-primary font-bold sm:whitespace-nowrap break-words text-2xl lg:text-5xl sm:text-3xl text-shadow-none lg:text-shadow-black">
          Crypto Secretary for me
        </p>
        <div className="flex flex-col sm:flex-row gap-6 sm:gap-4">
          <div className="rounded-md flex items-center">
            <span className="font-ng text-sm md:text-xl sm:text-xs">
              미스터 크립과 함께 자산, 뉴스, 실시간 차트를 편하게 확인하세요.{' '}
              <br />
              모의 투자를 하는 재미도 느끼실 수 있습니다.
            </span>
          </div>
        </div>
      </m.div>
      <m.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : 100 }}
        transition={{ duration: 1, ease: 'easeInOut' }}
        className="w-full"
      >
        <Image
          alt="introduce service image"
          src="/images/home_demo.avif"
          width={400}
          height={400}
          className="lg:w-full sm:w-[30%] md:w-[40%]"
        />
      </m.div>
    </div>
  );
};

const AiInvestIntroduce = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.7 });

  return (
    <div ref={ref} className="w-full flex flex-col gap-10">
      <div className="flex flex-wrap sm:flex-nowrap items-end gap-2">
        <m.span
          initial={{ opacity: 0, y: -60 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : -60 }}
          transition={{ duration: 1, ease: 'easeInOut' }}
          className="font-title-primary text-2xl lg:text-5xl sm:text-3xl text-shadow-none lg:text-shadow-black"
        >
          AI가 추천하는 포트폴리오
        </m.span>
        <m.span
          initial={{ opacity: 0 }}
          animate={{ opacity: isInView ? 1 : 0 }}
          transition={{ duration: 1, ease: 'easeInOut' }}
          className="font-ng text-sm md:text-lg"
        >
          (Ver 2 SOON)
        </m.span>
      </div>
      <div className="flex gap-4">
        <div className="rounded-md flex items-center">
          <m.span
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : -100 }}
            transition={{ duration: 1, ease: 'easeInOut' }}
            className=" flex flex-col font-ng text-sm sm:text-xl"
          >
            원하는 성향에 따라 현재 보유 중인 현금으로 매수 가능한 포트폴리오를
            구성해줍니다.
            <br />
          </m.span>
        </div>
      </div>
      <Link
        href="/exchange/ai-portfoilo"
        className="w-[8rem] h-[2rem] rounded-md opacity-100 flex items-center hover:opacity-60 transition-all duration-100 ease-in"
      >
        <span className="font-ng font-bold text-lg text-blue-500">
          체험하기 {'>'}
        </span>
      </Link>
    </div>
  );
};

const AiPortfolioCard = ({
  description,
  stability,
  profitability,
  recommend,
  title,
}) => {
  return (
    <div className="group relative w-[60rem] h-[30rem] hidden sm:flex flex-1 flex-col hover:flex-4 hover:shrink-0 transition-[flex-grow,flex-shrink] duration-300 ease-in-out">
      <div className="bg-slate-200 hover:bg-white shadow-md rounded-md flex flex-col flex-1 gap-2 transition-all duration-300">
        <div className="absolute inset-0 p-4 scale-90 opacity-0 flex flex-col justify-around gap-2 transition-opacity duration-300 ease-in group-hover:opacity-100 group-hover:scale-100">
          {/* 옵션 소개 */}
          <div className="scale-90 opacity-0 transition-all duration-150 ease-in group-hover:opacity-100 group-hover:scale-100">
            <p className="font-pretendard font-bold text-lg lg:text-3xl sm:text-2xl text-black">
              {description}
            </p>
          </div>
          <div className="flex flex-col gap-2">
            {/* 안정성 */}
            <div className="scale-90 opacity-0 flex items-center gap-2 transition-all duration-150 ease-in group-hover:opacity-100 group-hover:scale-100">
              <span className="font-description text-sm lg:text-xl">
                안정성
              </span>
              {Array.from({ length: stability }).map((_, index) => (
                <FaStar key={index} className="text-yellow-500" />
              ))}
            </div>
            {/* 수익성 */}
            <div className="scale-90 opacity-0 flex items-center gap-2 transition-all duration-150 ease-in group-hover:opacity-100 group-hover:scale-100">
              <span className="font-description text-sm lg:text-xl">
                수익성
              </span>
              {Array.from({ length: profitability }).map((_, index) => (
                <FaStar key={index} className="text-main-dark" />
              ))}
            </div>
            {/* 추천 성향 */}
            <div className="scale-90 opacity-0 flex flex-col transition-all duration-150 ease-in group-hover:opacity-100 group-hover:scale-100">
              <span className="font-description text-sm lg:text-xl">
                추천 성향
              </span>
              <span className="max-sm:text-sm font-ng">{recommend}</span>
            </div>
          </div>
        </div>
      </div>
      <span
        className={`py-2 font-pretendard font-bold text-sm sm:text-2xl ${title === '요즘 핫한' ? 'text-red-600' : title === '잠재력 뿜뿜한' ? 'text-purple-600' : 'text-main'}`}
      >
        {title}
      </span>
    </div>
  );
};

const Footer = () => {
  return (
    <div className="w-full max-w-[75rem] mx-auto px-10 sm:px-16 md:px-20 lg:px-24 xl:px-32 flex flex-col gap-4">
      <span className="text-md text-slate-600 font-ng">
        Copyrights All reserved © Mr.Cryp 2024
      </span>
    </div>
  );
};

export default function Home() {
  const options = [
    {
      title: '요즘 핫한',
      description: '📈 최근 상승율이 높은 코인에 투자해요',
      stability: 4,
      profitability: 4,
      recommend:
        '단기 트렌드를 빠르게 반영하는 투자 스타일이라면 추천! 안정성과 수익성을 균형 있게 고려하는 투자자에게 적합합니다.',
    },
    {
      title: '잠재력 뿜뿜한',
      description: '🔍 미래 가치를 봅니다',
      stability: 5,
      profitability: 3,
      recommend:
        '장기적인 성장 가능성을 보는 투자자에게 추천! 코인의 본질적인 가치를 분석하고 꾸준히 투자하는 분들에게 적합합니다.',
    },
    {
      title: '크게 한 방',
      description: '⚡️ 하이 리스크 하이 리턴!',
      stability: 3,
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
      <section className="w-full h-auto bg-white bg-cover bg-center py-8 sm:py-0">
        <section className="[mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-200px),transparent_100%)]">
          <Marquee />
        </section>
        <section className="w-full max-w-[75rem] mx-auto px-6 py-20 sm:px-16 md:px-20 lg:px-24 xl:px-32 pt-20 sm:pt-60 flex items-center gap-4">
          <Introduce />
        </section>
      </section>
      {/* 3rd Section */}
      <section className="w-full sm:h-[65rem] h-[40rem] bg-gray-50">
        <section className="w-full max-w-[75rem] mx-auto px-10 sm:px-16 md:px-20 lg:px-24 xl:px-32 pt-60 flex items-center gap-4">
          <AiInvestIntroduce />
        </section>
        <section className="w-full max-w-[75rem] mx-auto px-10 sm:px-16 md:px-20 lg:px-24 xl:px-32 flex items-center gap-4">
          {options.map((option, index) => (
            <AiPortfolioCard key={index} {...option} />
          ))}
        </section>
      </section>
      {/* 4th Section */}
      <section className="w-full h-[10rem] bg-stone-200 flex items-center">
        <Footer />
      </section>
    </main>
  );
}
