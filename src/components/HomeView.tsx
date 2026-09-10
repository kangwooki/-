import React from 'react';
import {
  ArrowRight,
  CheckCircle2,
  Eye,
  FileText,
  Compass,
  Sparkles,
  Home,
  Check,
  Building,
  ShieldCheck,
  ChevronRight,
  ClipboardList,
} from 'lucide-react';
import { PageTab } from '../types';
import { BRAND, IMAGES, CORE_SERVICES, SERVICE_TIERS } from '../data/constants';
import { SafeGardenLogo } from './SafeGardenLogo';

interface HomeViewProps {
  onSelectTab: (tab: PageTab) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onSelectTab }) => {
  return (
    <div className="space-y-0 text-[#23382A]">
      
      {/* ━━━━━━━━━━━━━━━━━━━━━━
          SECTION 7: HERO AREA
          ━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative overflow-hidden bg-[#F4F1E8] border-b border-[#23382A]/10 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#23382A]/8 border border-[#23382A]/15 text-xs font-semibold text-[#23382A]">
                <span className="w-2 h-2 rounded-full bg-[#6F8068]" />
                <span>현장 기반 토지 및 식물자산 솔루션</span>
              </div>

              <div className="space-y-3">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#23382A] leading-[1.25]">
                  {BRAND.slogan}
                </h1>
                <p className="text-xl sm:text-2xl font-medium text-[#6F8068] leading-relaxed">
                  {BRAND.coreMessage}
                </p>
              </div>

              <p className="text-base sm:text-lg text-[#23382A]/85 leading-relaxed max-w-2xl font-normal">
                토지가 있지만 직접 관리하기 어렵거나, 무엇을 심어야 할지 모르거나, 
                멀리 있는 빈집과 주변 토지를 관리하기 어려운 분들을 위해 
                세이프가든이 현장을 확인하고 필요한 서비스를 제공합니다.
              </p>

              {/* CTAs */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                <button
                  id="hero-main-cta-btn"
                  onClick={() => onSelectTab('consultation')}
                  className="inline-flex items-center justify-center space-x-2.5 px-6 py-3.5 bg-[#23382A] hover:bg-[#2E4634] text-[#F4F1E8] text-base font-semibold rounded-lg shadow-sm hover:shadow transition-all border border-[#23382A] group"
                >
                  <span>현장평가 상담</span>
                  <ArrowRight className="w-4 h-4 text-[#C9B98B] group-hover:translate-x-0.5 transition-transform" />
                </button>

                <button
                  id="hero-sub-cta-btn"
                  onClick={() => onSelectTab('land-asset')}
                  className="inline-flex items-center justify-center space-x-2 px-6 py-3.5 bg-white/80 hover:bg-white text-[#23382A] text-base font-medium rounded-lg border border-[#23382A]/20 hover:border-[#23382A]/40 transition-all shadow-xs"
                >
                  <span>서비스 알아보기</span>
                </button>
              </div>

              {/* 10~20 sec instant summary badges */}
              <div className="pt-6 border-t border-[#23382A]/10 grid grid-cols-3 gap-2 sm:gap-4 text-xs sm:text-sm">
                <div className="p-3 bg-white/60 rounded-lg border border-[#23382A]/5">
                  <span className="block font-bold text-[#23382A]">현장 직접 확인</span>
                  <span className="text-[#23382A]/70 text-xs">사진과 기록 전달</span>
                </div>
                <div className="p-3 bg-white/60 rounded-lg border border-[#23382A]/5">
                  <span className="block font-bold text-[#23382A]">필요한 서비스만</span>
                  <span className="text-[#23382A]/70 text-xs">선택형 맞춤 진행</span>
                </div>
                <div className="p-3 bg-white/60 rounded-lg border border-[#23382A]/5">
                  <span className="block font-bold text-[#23382A]">식재에서 출하까지</span>
                  <span className="text-[#23382A]/70 text-xs">자산 가치 실현</span>
                </div>
              </div>
            </div>

            {/* Right Visual - Real Authentic Land & Trees */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden shadow-xl border border-[#23382A]/15 group">
                <img
                  src={IMAGES.heroField}
                  alt="자연스러운 토지와 나무가 자라는 실제 농지 현장"
                  className="w-full h-[380px] sm:h-[460px] object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#23382A]/85 via-transparent to-transparent" />
                
                {/* Official CI Badge Watermark */}
                <div className="absolute top-4 right-4 bg-[#F4F1E8]/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-[#23382A]/20 shadow-md flex items-center space-x-2">
                  <SafeGardenLogo variant="symbol" size="sm" theme="light" />
                  <span className="text-xs font-bold text-[#23382A]">Safe Garden</span>
                </div>

                <div className="absolute bottom-5 left-5 right-5 text-[#F4F1E8] space-y-1">
                  <div className="flex items-center space-x-2 text-[#C9B98B] text-xs font-semibold uppercase tracking-wider">
                    <ShieldCheck className="w-4 h-4" />
                    <span>실제 현장 관찰 및 조사</span>
                  </div>
                  <p className="text-sm font-medium text-white">
                    단순 조경이 아닌, 토양과 수목의 상태를 진단하는 현장 중심 관리
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* ━━━━━━━━━━━━━━━━━━━━━━
          SECTION 8: 문제 제기 (The Problem)
          ━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="bg-white py-20 lg:py-28 border-b border-[#23382A]/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          
          <span className="text-xs font-semibold tracking-widest text-[#6F8068] uppercase block">
            THE REAL CHALLENGE
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#23382A] tracking-tight leading-tight">
            "땅이 있다고 끝나는 것은 아닙니다."
          </h2>

          <div className="w-16 h-0.5 bg-[#C9B98B] mx-auto" />

          <p className="text-base sm:text-lg lg:text-xl text-[#23382A]/80 leading-relaxed font-normal">
            토지를 가지고 있어도 무엇을 심어야 할지, 현재 상태가 어떤지, 
            차량이 어디까지 들어갈 수 있는지, 식물이 제대로 자라고 있는지, 
            앞으로 어떻게 관리해야 하는지 직접 확인하기 어려운 경우가 많습니다.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-4 text-left">
            <div className="p-5 rounded-xl bg-[#F4F1E8] border border-[#23382A]/10 space-y-2">
              <span className="text-xs font-bold text-[#6F8068]">고민 01</span>
              <p className="font-semibold text-[#23382A] text-sm">토지는 있는데 관리가 막막함</p>
              <p className="text-xs text-[#23382A]/70 leading-relaxed">거리가 멀거나 바빠서 직접 방문해 관리할 여력이 없는 토지</p>
            </div>
            <div className="p-5 rounded-xl bg-[#F4F1E8] border border-[#23382A]/10 space-y-2">
              <span className="text-xs font-bold text-[#6F8068]">고민 02</span>
              <p className="font-semibold text-[#23382A] text-sm">무엇을 심을지 결정하기 어려움</p>
              <p className="text-xs text-[#23382A]/70 leading-relaxed">토양 상태나 일조량, 배수 조건을 몰라 수종 선택에 불안감</p>
            </div>
            <div className="p-5 rounded-xl bg-[#F4F1E8] border border-[#23382A]/10 space-y-2 sm:col-span-2 md:col-span-1">
              <span className="text-xs font-bold text-[#6F8068]">고민 03</span>
              <p className="font-semibold text-[#23382A] text-sm">진입로 및 향후 반출 걱정</p>
              <p className="text-xs text-[#23382A]/70 leading-relaxed">차량 접근이 어렵거나 향후 출하/이식이 가능한지 불투명한 상황</p>
            </div>
          </div>

          <div className="pt-6">
            <div className="inline-block px-6 py-3 rounded-full bg-[#23382A] text-[#F4F1E8] text-base sm:text-lg font-bold shadow-sm">
              세이프가든은 먼저 현장을 봅니다.
            </div>
          </div>

        </div>
      </section>


      {/* ━━━━━━━━━━━━━━━━━━━━━━
          SECTION 9: 세이프가든의 차별점
          ━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="bg-[#F4F1E8] py-20 lg:py-28 border-b border-[#23382A]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl mb-16 space-y-4">
            <span className="text-xs font-semibold tracking-wider text-[#6F8068] uppercase block">
              DIFFERENTIATOR
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#23382A] tracking-tight">
              우리는 조경회사가 아닙니다.
            </h2>
            <p className="text-lg sm:text-xl font-semibold text-[#6F8068]">
              "조경은 공간을 관리하지만, 세이프가든은 식물자산을 관리합니다."
            </p>
            <p className="text-base text-[#23382A]/80 leading-relaxed pt-2">
              단순히 나무를 깎고, 잔디를 깎고, 공간을 아름답게 만드는 것에서 끝나지 않습니다. 
              왜 이 식물이 이렇게 자라고 있는지, 현재 상태는 어떤지, 
              앞으로 어떻게 관리해야 하는지를 확인합니다.
            </p>
          </div>

          {/* Visual Lifecycle Flow: 토지 → 식물 → 관리 → 출하 */}
          <div className="bg-white rounded-2xl p-6 sm:p-10 border border-[#23382A]/15 shadow-sm">
            <div className="text-center mb-8">
              <span className="text-xs font-semibold text-[#23382A]/60 uppercase tracking-wider">
                SAFE GARDEN CORE CYCLE
              </span>
              <h3 className="text-xl font-bold text-[#23382A] mt-1">
                자산 가치로 이어지는 4단계 선순환 흐름
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
              
              {/* STEP 1: 토지 */}
              <div className="relative p-5 rounded-xl bg-[#F4F1E8] border border-[#23382A]/10 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="w-8 h-8 rounded-full bg-[#23382A] text-white flex items-center justify-center font-bold text-xs">
                    01
                  </div>
                  <h4 className="text-lg font-bold text-[#23382A]">토지 (Land)</h4>
                  <p className="text-xs text-[#23382A]/75 leading-relaxed">
                    접근 도로, 토양 상태, 배수와 일조 등 대지의 기초 환경과 잠재력을 면밀히 평가합니다.
                  </p>
                </div>
                <div className="pt-2 border-t border-[#23382A]/10 text-[11px] font-semibold text-[#6F8068]">
                  • 도로폭 및 차량 회전 점검<br />• 토양 배수 및 일조 분석
                </div>
              </div>

              {/* STEP 2: 식물 */}
              <div className="relative p-5 rounded-xl bg-[#F4F1E8] border border-[#23382A]/10 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="w-8 h-8 rounded-full bg-[#6F8068] text-white flex items-center justify-center font-bold text-xs">
                    02
                  </div>
                  <h4 className="text-lg font-bold text-[#23382A]">식물 (Plant)</h4>
                  <p className="text-xs text-[#23382A]/75 leading-relaxed">
                    토지 조건과 목적에 부합하는 수종을 엄선하고, 실패 없는 식재 계획을 수립합니다.
                  </p>
                </div>
                <div className="pt-2 border-t border-[#23382A]/10 text-[11px] font-semibold text-[#6F8068]">
                  • 환경 최적 수종 매칭<br />• 뿌리 활착 중심 식재
                </div>
              </div>

              {/* STEP 3: 관리 */}
              <div className="relative p-5 rounded-xl bg-[#F4F1E8] border border-[#23382A]/10 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="w-8 h-8 rounded-full bg-[#23382A] text-white flex items-center justify-center font-bold text-xs">
                    03
                  </div>
                  <h4 className="text-lg font-bold text-[#23382A]">관리 (Care)</h4>
                  <p className="text-xs text-[#23382A]/75 leading-relaxed">
                    과도한 약제와 인위적 변형 없이, 계절별 예찰과 상태 기록을 토대로 필요한 관리만 실행합니다.
                  </p>
                </div>
                <div className="pt-2 border-t border-[#23382A]/10 text-[11px] font-semibold text-[#6F8068]">
                  • 주기적 생육 예찰 리포트<br />• 병충해 및 잡목 최소화
                </div>
              </div>

              {/* STEP 4: 출하 */}
              <div className="relative p-5 rounded-xl bg-[#F4F1E8] border border-[#23382A]/10 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="w-8 h-8 rounded-full bg-[#C9B98B] text-[#23382A] flex items-center justify-center font-bold text-xs">
                    04
                  </div>
                  <h4 className="text-lg font-bold text-[#23382A]">출하 (Harvest)</h4>
                  <p className="text-xs text-[#23382A]/75 leading-relaxed">
                    잘 가꾸어진 식물자산을 적기에 굴취하고 안전하게 운송하여 실질적 가치를 회수합니다.
                  </p>
                </div>
                <div className="pt-2 border-t border-[#23382A]/10 text-[11px] font-semibold text-[#6F8068]">
                  • 자산 가치 보존 분감기<br />• 이식 및 실수요처 연계
                </div>
              </div>

            </div>

            <div className="mt-8 pt-6 border-t border-[#23382A]/10 flex flex-col sm:flex-row items-center justify-between text-xs sm:text-sm text-[#23382A]/70 gap-3">
              <span className="font-medium text-[#23382A]">
                화려한 시각적 미화가 아닌, 토지와 식물의 생애주기를 고려한 자산 관리 시스템
              </span>
              <button
                onClick={() => onSelectTab('about')}
                className="inline-flex items-center text-[#23382A] font-semibold hover:underline"
              >
                <span>회사 철학 자세히 보기</span>
                <ChevronRight className="w-4 h-4 ml-1 text-[#6F8068]" />
              </button>
            </div>
          </div>

        </div>
      </section>


      {/* ━━━━━━━━━━━━━━━━━━━━━━
          SECTION 10: 주요 서비스
          ━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="bg-white py-20 lg:py-28 border-b border-[#23382A]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-semibold tracking-widest text-[#6F8068] uppercase">
              SERVICES
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#23382A] tracking-tight">
              토지와 식물자산을 함께 봅니다.
            </h2>
            <p className="text-base text-[#23382A]/70">
              현장 중심의 4가지 핵심 모듈로 불필요한 비용 없이 체계적인 관리를 약속합니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {CORE_SERVICES.map((srv) => (
              <div
                key={srv.id}
                id={`home-service-${srv.id}`}
                className="bg-[#F4F1E8] rounded-xl overflow-hidden border border-[#23382A]/10 hover:border-[#23382A]/30 transition-all shadow-xs hover:shadow-md flex flex-col group"
              >
                {/* Image */}
                <div className="h-48 overflow-hidden relative">
                  <img
                    src={srv.imageUrl}
                    alt={srv.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?auto=format&fit=crop&w=1200&q=80';
                    }}
                  />
                  <span className="absolute top-3 left-3 bg-[#23382A] text-white text-xs font-mono font-bold px-2 py-1 rounded">
                    CARD {srv.num}
                  </span>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-[#23382A] group-hover:text-[#2E4634]">
                      {srv.title}
                    </h3>
                    <p className="text-xs text-[#23382A]/80 leading-relaxed">
                      "{srv.description}"
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#23382A]/10">
                    <button
                      onClick={() => onSelectTab('land-asset')}
                      className="inline-flex items-center text-xs font-bold text-[#23382A] hover:text-[#6F8068] transition-colors"
                    >
                      <span>자세히 보기</span>
                      <ArrowRight className="w-3.5 h-3.5 ml-1 text-[#C9B98B]" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>


      {/* ━━━━━━━━━━━━━━━━━━━━━━
          SECTION 11: 선택형 서비스 강조 (가격 인식 개선)
          ━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="bg-[#F4F1E8] py-20 lg:py-28 border-b border-[#23382A]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl mb-14 space-y-3">
            <span className="text-xs font-semibold tracking-wider text-[#6F8068] uppercase">
              FLEXIBLE SERVICE MODEL
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#23382A] tracking-tight">
              필요한 서비스만, 필요한 만큼.
            </h2>
            <p className="text-base text-[#23382A]/80 leading-relaxed">
              모든 토지에 같은 관리가 필요한 것은 아닙니다. 
              토지의 상태와 식물의 종류, 관리 목적에 따라 필요한 서비스만 선택할 수 있습니다. 
              세이프가든은 비싼 종합관리 계약을 강요하지 않습니다.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICE_TIERS.map((tier, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl p-6 border border-[#23382A]/15 shadow-xs hover:shadow-md transition-all flex flex-col justify-between relative"
              >
                <div className="space-y-4">
                  <div className="inline-block px-3 py-1 rounded bg-[#23382A]/8 text-[#23382A] text-xs font-bold tracking-wide">
                    {tier.type}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#23382A] leading-snug">
                      {tier.title}
                    </h3>
                    <p className="text-xs text-[#23382A]/70 mt-2 leading-relaxed">
                      {tier.desc}
                    </p>
                  </div>

                  <ul className="space-y-2 pt-2 border-t border-[#23382A]/10">
                    {tier.points.map((pt, pIdx) => (
                      <li key={pIdx} className="flex items-center text-xs text-[#23382A]/85">
                        <Check className="w-3.5 h-3.5 text-[#6F8068] mr-1.5 shrink-0" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6 mt-4">
                  <button
                    onClick={() => onSelectTab('consultation')}
                    className="w-full py-2.5 px-3 rounded-lg border border-[#23382A]/20 hover:border-[#23382A] text-xs font-semibold text-[#23382A] hover:bg-[#23382A] hover:text-white transition-all text-center"
                  >
                    이 구성으로 상담받기
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 p-5 rounded-xl bg-white/70 border border-[#23382A]/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-3 text-xs sm:text-sm text-[#23382A]">
              <ShieldCheck className="w-5 h-5 text-[#6F8068] shrink-0" />
              <span>과도한 작업 권유 없이, 현장 진단 결과표를 바탕으로 고객이 직접 선택합니다.</span>
            </div>
            <button
              onClick={() => onSelectTab('consultation')}
              className="text-xs font-bold text-[#23382A] underline underline-offset-4 hover:text-[#6F8068] whitespace-nowrap"
            >
              내 토지 맞춤 진단 요청하기
            </button>
          </div>

        </div>
      </section>


      {/* ━━━━━━━━━━━━━━━━━━━━━━
          SECTION 12 & 13: 빈집 서비스 미리보기 & 활용 확장
          ━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="bg-white py-20 lg:py-28 border-b border-[#23382A]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Visual: Rustic Vacant House */}
            <div className="lg:col-span-5 order-2 lg:order-1">
              <div className="relative rounded-2xl overflow-hidden shadow-lg border border-[#23382A]/15 group">
                <img
                  src={IMAGES.vacantHouse}
                  alt="멀리 있는 시골 빈집과 마당 현장"
                  className="w-full h-[360px] sm:h-[420px] object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#23382A]/80 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <span className="text-xs font-mono text-[#C9B98B] uppercase tracking-wider block mb-1">
                    VACANT PROPERTY CARE
                  </span>
                  <p className="text-sm font-medium">
                    방치된 빈집의 누수, 잡목, 방역 및 외벽 균열 사전 예찰
                  </p>
                </div>
              </div>
            </div>

            {/* Texts */}
            <div className="lg:col-span-7 space-y-6 order-1 lg:order-2">
              <span className="text-xs font-semibold tracking-wider text-[#6F8068] uppercase block">
                VACANT HOUSE & SURROUNDINGS
              </span>

              <h2 className="text-3xl sm:text-4xl font-bold text-[#23382A] tracking-tight leading-snug">
                멀리 있는 빈집과 주변 토지,<br />
                누가 관리하고 있을까요?
              </h2>

              <p className="text-base sm:text-lg text-[#23382A]/80 leading-relaxed font-normal">
                비어 있는 집은 사람이 살지 않는다고 해서 관리가 필요 없는 것은 아닙니다. 
                세이프가든은 집 안의 청소부터 주변 정리, 방역, 상태점검, 
                마당과 주변 식물관리까지 필요한 만큼 제공합니다.
              </p>

              {/* 5 Core Keywords */}
              <div className="space-y-3">
                <span className="text-xs font-semibold text-[#23382A]/60 block uppercase tracking-wider">
                  핵심 서비스 키워드
                </span>
                <div className="flex flex-wrap gap-2.5">
                  {['청소', '주변정리', '방역', '상태점검', '식물관리'].map((kw) => (
                    <span
                      key={kw}
                      className="px-4 py-2 bg-[#F4F1E8] border border-[#23382A]/15 text-[#23382A] font-medium text-sm rounded-lg"
                    >
                      {kw}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <button
                  id="preview-vacant-cta-btn"
                  onClick={() => onSelectTab('vacant-house')}
                  className="inline-flex items-center space-x-2 px-6 py-3 bg-[#23382A] hover:bg-[#2E4634] text-[#F4F1E8] text-sm font-semibold rounded-lg shadow-sm transition-all"
                >
                  <span>빈집 서비스 보기</span>
                  <ArrowRight className="w-4 h-4 text-[#C9B98B]" />
                </button>
              </div>

              {/* ━━━━━━━━━━━━━━━━━━━━━━
                  SECTION 13: 빈집 활용 확장 (Extension)
                  ━━━━━━━━━━━━━━━━━━━━━━ */}
              <div className="mt-8 p-5 sm:p-6 bg-[#F4F1E8] rounded-xl border border-[#23382A]/15 space-y-2">
                <div className="flex items-center space-x-2 text-xs font-semibold text-[#6F8068] uppercase tracking-wider">
                  <Building className="w-4 h-4" />
                  <span>필요시 제공되는 확장 연계</span>
                </div>
                <h3 className="text-base font-bold text-[#23382A]">
                  "비어 있는 집의 새로운 활용도 생각합니다."
                </h3>
                <p className="text-xs sm:text-sm text-[#23382A]/75 leading-relaxed">
                  빈집을 임대주택이나 민박 등으로 활용하고 싶은 경우, 
                  활용 목적에 맞춰 필요한 리모델링을 검토하고 관련 전문 서비스를 연결할 수 있습니다.
                </p>
                <span className="text-[11px] text-[#23382A]/60 block pt-1">
                  * 무리한 공사를 부추기지 않으며, 현장 점검 후 실수요 목적이 있을 때 한하여 전문 파트너십을 연결합니다.
                </span>
              </div>

            </div>

          </div>

        </div>
      </section>


      {/* ━━━━━━━━━━━━━━━━━━━━━━
          SECTION 14: 관리 철학
          ━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="bg-[#23382A] text-[#F4F1E8] py-20 lg:py-28 border-b border-[#23382A]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
          
          <div className="space-y-4">
            <span className="text-xs font-semibold tracking-widest text-[#C9B98B] uppercase block">
              MANAGEMENT PHILOSOPHY
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
              "관찰에서 관리가 시작됩니다."
            </h2>
            <p className="text-base sm:text-lg text-[#F4F1E8]/75 max-w-2xl mx-auto">
              작업을 먼저 앞세우지 않고, 식물과 토양의 상태를 주의 깊게 읽어내는 것으로부터 올바른 관리가 출발합니다.
            </p>
          </div>

          {/* Central Process Flow: 관찰 → 기록 → 판단 → 조치 → 확인 → 기록 */}
          <div className="py-6">
            <div className="bg-[#1C2C21] p-6 sm:p-8 rounded-2xl border border-white/10 shadow-lg">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-2 items-center">
                
                {[
                  { step: '01', name: '관찰', desc: '현장 생육·환경 탐색' },
                  { step: '02', name: '기록', desc: '사진 및 실측 데이터' },
                  { step: '03', name: '판단', desc: '필요 조치 객관적 판별' },
                  { step: '04', name: '조치', desc: '필요 최소한의 작업' },
                  { step: '05', name: '확인', desc: '결과 검증 및 상태 점검' },
                  { step: '06', name: '기록', desc: '다음 관리를 위한 축적' },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 bg-white/5 rounded-xl border border-white/10 flex flex-col items-center text-center space-y-1 relative"
                  >
                    <span className="text-[10px] font-mono text-[#C9B98B] font-bold">STEP {item.step}</span>
                    <span className="text-lg font-bold text-white tracking-wide">{item.name}</span>
                    <span className="text-[11px] text-[#F4F1E8]/60">{item.desc}</span>
                  </div>
                ))}

              </div>

              <div className="mt-8 pt-6 border-t border-white/10 text-center">
                <p className="text-sm sm:text-base font-medium text-[#C9B98B] italic">
                  "발견한 것은 기록하고, 모르는 것은 추측하지 않으며, 필요한 작업만 합니다."
                </p>
              </div>
            </div>
          </div>

          <div>
            <button
              onClick={() => onSelectTab('about')}
              className="inline-flex items-center space-x-2 text-xs font-semibold text-[#F4F1E8]/80 hover:text-white underline underline-offset-8"
            >
              <span>세이프가든의 7대 원칙 모두 보기</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1 text-[#C9B98B]" />
            </button>
          </div>

        </div>
      </section>


      {/* ━━━━━━━━━━━━━━━━━━━━━━
          SECTION 15: 최종 CTA
          ━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="bg-[#F4F1E8] py-20 lg:py-32">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          
          <div className="w-12 h-12 rounded-xl bg-[#23382A] text-[#C9B98B] flex items-center justify-center mx-auto shadow-sm">
            <ClipboardList className="w-6 h-6" />
          </div>

          <div className="space-y-4">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#23382A] tracking-tight leading-tight">
              내 토지와 빈집,<br />
              한번 확인해보세요.
            </h2>
            <p className="text-base sm:text-lg text-[#23382A]/80 max-w-xl mx-auto leading-relaxed">
              직접 관리하기 어려운 토지와 빈집, 
              현장을 확인하고 필요한 관리부터 시작할 수 있습니다.
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              id="bottom-main-cta-btn"
              onClick={() => onSelectTab('consultation')}
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2.5 px-8 py-4 bg-[#23382A] hover:bg-[#2E4634] text-[#F4F1E8] text-base font-semibold rounded-lg shadow-md hover:shadow-lg transition-all"
            >
              <span>현장평가 상담</span>
              <ArrowRight className="w-4 h-4 text-[#C9B98B]" />
            </button>

            <button
              id="bottom-sub-cta-btn"
              onClick={() => onSelectTab('consultation')}
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-8 py-4 bg-white text-[#23382A] text-base font-medium rounded-lg border border-[#23382A]/20 hover:border-[#23382A] transition-all"
            >
              <span>문의하기</span>
            </button>
          </div>

          <p className="text-xs text-[#23382A]/60 pt-4">
            * 전국 토지 및 빈집 위치에 따라 현장조사 일정을 조율해 드립니다.
          </p>

        </div>
      </section>

    </div>
  );
};
