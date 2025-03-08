import { useRouter } from 'next/router';
import { globalColors } from '@/globalColors';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Rating from '@mui/material/Rating';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

const LandingNavbar = () => {
  const router = useRouter();

  const handleRoute = () => router.push('/signin');

  return (
    <nav className="fixed top-0 left-0 w-full bg-transparent backdrop-blur-lg shadow-md z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2">
          <Image
            alt="navbar logo image"
            src={'/images/logo_mustache.webp'}
            width="60"
            height="60"
            className="w-auto h-3"
          />
          <span className="text-[1.5rem] font-aggro font-bold italic">
            Mr.cryp
          </span>
        </div>

        <div className="flex gap-6">
          <a
            onClick={handleRoute}
            className=" w-[6rem] h-[2rem] rounded-md hover:opacity-40 transition duration-100 ease-in cursor-pointer"
          >
            <span className="font-oneTitle font-bold max-sm:text-lg text-xl text-black">
              시작하기
            </span>
          </a>
        </div>
      </div>
    </nav>
  );
};

const AiPortfolioCard = ({
  description,
  title,
  stability,
  profitability,
  recommend,
}) => {
  return (
    <div className="group relative max-md:w-[960px] max-sm:w-[30%] flex-1 flex flex-col h-[30rem] transition-[flex-grow,flex-shrink] duration-300 ease-in-out hover:flex-[4] hover:shrink-0">
      <div className="p-4 flex-1 flex flex-col gap-2 transition-opacity duration-300 rounded-md bg-pink-100 shadow-md">
        <div className="absolute inset-0 flex flex-col justify-center gap-2 p-4 transition-opacity duration-300 ease-in opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100">
          {/* 옵션 소개 */}
          <div className="opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 transition-all duration-150 ease-in">
            <p className="text-black text-2xl max-sm:text-lg font-oneTitle text-shadow-black">
              {description}
            </p>
          </div>
          {/* 안정성 */}
          <div className="flex opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 transition-all duration-150 ease-in">
            <span className="font-ng font-bold text-xl max-sm:text-sm">
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
          <div className="flex opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 transition-all duration-150 ease-in">
            <span className="font-ng font-bold text-xl max-sm:text-sm">
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
          <div className="flex flex-col opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 transition-all duration-150 ease-in">
            <span className="font-ng font-bold text-x max-sm:text-sm">
              추천 성향
            </span>
            <span className="font-ng max-sm:text-sm">{recommend}</span>
          </div>
        </div>
      </div>
      <span className="py-2 text-xl font-oneTitle max-sm:text-sm">{title}</span>
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
      <Head>
        <title>미스터 크립 Mr.cryp</title>
      </Head>
      {/* 네브바 */}
      <LandingNavbar />
      {/* 1st Section */}
      <section className="w-full h-[30rem] relative">
        <Image
          src="/images/1st_section.avif"
          alt="배경 이미지"
          priority={true}
          layout="fill"
          objectFit="cover"
          quality={100}
          className="absolute inset-0 -z-10"
        />
        <div className="w-full max-w-[1200px] mx-auto pl-10 md:pl-16 lg:pl-24 xl:pl-32 pt-60 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <span className="text-5xl text-white font-oneTitle text-shadow-black max-md:text-2xl">
              미스터 크립이
            </span>
            <span className="text-5xl text-white font-oneTitle text-shadow-black max-md:text-2xl">
              더 쉬운 코인 투자를 도와드립니다.
            </span>
          </div>
          <div className="flex gap-4">
            <div className="h-[2rem] rounded-md flex items-center opacity-80 hover:opacity-40 transition duration-100 ease-in">
              <span className="font-oneTitle text-white text-shadow-black">
                #크립토 비서
              </span>
            </div>
            <div className="h-[2rem] rounded-md flex items-center opacity-80 hover:opacity-40 transition duration-100 ease-in">
              <span className="font-oneTitle text-white text-shadow-black">
                #AI 포트폴리오
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 2nd Section */}
      <section className="w-full h-[40rem] bg-cover bg-center">
        {/* 코인 로고 마키 */}
        <section className="[mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-200px),transparent_100%)]">
          <div className="animate-marqueeX whitespace-nowrap flex gap-6 pt-4">
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
        </section>

        {/* 소개 */}
        <section className="w-full max-w-[1200px] mx-auto pl-10 sm:pl-16 lg:pl-24 xl:pl-32 pt-96 flex max-sm:flex-col max-sm:gap-32 gap-8 justify-center">
          <div className="flex flex-col gap-10 max-md:gap-20">
            <span className="max-lg:text-4xl max-md:text-2xl max-sm:text-lg max-lg:text-shadow-none text-5xl font-oneTitle text-shadow-black break-words whitespace-nowrap">
              Crypto Secretary for me
            </span>
            <div className="flex gap-4">
              <div className="h-[2rem] rounded-md flex items-center">
                <span className="font-oneTitle text-lg max-sm:text-sm max-md:text-[1rem]">
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
            className="max-lg:w-[18.75rem] max-md:w-[12rem] max-lg:-translate-y-[10vh] -translate-y-[30vh]"
          />
        </section>
      </section>

      {/* 3rd Section */}
      <section className="w-full h-[80rem]">
        <section className="w-full max-w-[1200px] mx-auto pl-10 md:pl-16 lg:pl-24 xl:pl-32 translate-y-[40vh] flex">
          <div className="flex flex-col gap-10">
            <div className="flex items-end gap-2">
              <span className="max-sm:text-lg max-md:text-2xl max-lg:text-4xl text-5xl font-oneTitle max-lg:text-shadow-none text-shadow-black">
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
                <span className="flex flex-col font-oneTitle max-md:text-[1rem] max-sm:text-sm ">
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

        <section className="w-full max-w-[1200px] mx-auto pl-10 md:pl-16 lg:pl-24 xl:pl-32 translate-y-[50vh] flex gap-4">
          {portfolioOptions.map((option, index) => (
            <AiPortfolioCard key={index} {...option} />
          ))}
        </section>
      </section>

      {/* 4th Section */}
      <section className="w-full h-[15rem] bg-gray-700 flex items-center">
        <div className="w-full max-w-[1200px] mx-auto pl-10 md:pl-16 lg:pl-24 xl:pl-32 max-xl:pr-30 flex flex-col gap-1">
          <span className="text-md text-gray-400 font-ng">
            Copyrights All reserved © Mr.Cryp 2024
          </span>
          <span className="text-md text-gray-400 font-ng">
            github@windowook
          </span>
          <div className="h-[0.0125rem] w-full bg-gray-400"></div>
        </div>
      </section>
    </main>
  );
}
