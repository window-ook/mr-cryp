import Image from 'next/image';
import Link from 'next/link';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

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

  return (
    <main className="min-h-screen max-w-screen overflow-hidden">
      {/* 1st Section 대표 멘트 */}
      <section className="w-full h-[30rem] bg-cover bg-center bg-main_light">
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
      <section className="w-full h-[40rem] bg-cover bg-center bg-gray-100">
        <article className="[mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-200px),transparent_100%)]">
          <div className="animate-marqueeX whitespace-nowrap flex gap-6 pt-4">
            {[...logos, ...logos].map(logo => (
              <Image
                key={`${logo}`}
                src={`/images/marquee/${logo}`}
                alt="coin's logo"
                width={80}
                height={80}
                className="h-auto"
              />
            ))}
          </div>
        </article>
        <article className="bottom-2 translate-x-[20vw] translate-y-[40vh] flex">
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
        </article>
      </section>

      {/* 3rd Section AI 포트폴리오 기능 소개 */}
      <section className="w-full h-[80rem] bg-cover bg-center">
        <article className="bottom-2 translate-x-[20vw] translate-y-[40vh] flex">
          <div className="flex flex-col gap-10">
            <div className="flex gap-2">
              <span className="text-5xl font-oneTitle text-shadow-black">
                투자를 스마트하게
              </span>
              <AutoAwesomeIcon fontSize="large" color="primary" />
            </div>
            <div className="flex gap-4">
              <div className="right-0 h-[2rem] rounded-md flex items-center">
                <span className="font-oneTitle">
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
              <span className="font-oneTitle text-main">
                빨리 체험하기 {'>'}
              </span>
            </Link>
          </div>
        </article>
        <article className="w-[60%] h-[40%] translate-x-1/3 translate-y-[50vh] bg-cyan-200 flex gap-4">
          <div className="w-1/3 bg-gray-100">
            {/* 이미지 */}
            <div className="bg-orange-300 h-full"></div>
            {/* 디스크립션 */}
            <span className="text-3xl font-ng">요즘 핫한</span>
          </div>
          <div className="w-1/3 bg-gray-100">
            {/* 이미지 */}
            <div className="bg-emerald-300 h-full"></div>
            {/* 디스크립션 */}
            <span className="text-3xl font-ng">잠재력 뿜뿜한</span>
          </div>
          <div className="w-1/3 bg-gray-100">
            {/* 이미지 */}
            <div className="bg-sky-400 h-full"></div>
            {/* 디스크립션 */}
            <span className="text-3xl font-ng">화끈한</span>
          </div>
        </article>
      </section>
    </main>
  );
}
