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
  Coins,
  HeartPulse,
  Fuel,
  FileCheck,
} from 'lucide-react';
import { PageTab } from '../types';
import { BRAND, IMAGES, CORE_SERVICES, SERVICE_TIERS } from '../data/constants';
import { SafeGardenLogo } from './SafeGardenLogo';

interface HomeViewProps {
  onSelectTab: (tab: PageTab) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onSelectTab }) => {
  return (
    <div className="space-y-0 text-[#1E4334]">
      
      {/* ━━━━━━━━━━━━━━━━━━━━━━
          SECTION 7: HERO AREA
          ━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative overflow-hidden bg-[#FAF8F5] border-b border-[#1E4334]/10 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#1E4334]/8 border border-[#1E4334]/15 text-xs font-semibold text-[#1E4334]">
                <span className="w-2 h-2 rounded-full bg-[#5E856F]" />
                <span>현장 기반 토지 및 식물자산 솔루션</span>
              </div>

              <div className="space-y-3">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#1E4334] leading-[1.25]">
                  당신의 식물자산을 지켜드립니다.
                </h1>
                <p className="text-xl sm:text-2xl font-bold text-[#5E856F] leading-relaxed">
                  토지에 맞는 식물을 찾아<br className="hidden sm:inline" /> 새로운 가치를 만들어드립니다.
                </p>
              </div>

              <div className="space-y-2 text-base sm:text-lg text-[#1E4334]/85 leading-relaxed max-w-2xl font-normal">
                <p>
                  토지는 있지만 무엇을 해야 할지 모르시나요?<br />
                  무엇을 심어야 할지, 어떻게 관리해야 할지 고민되시나요?
                </p>
                <p className="pt-0.5 text-[#1E4334] font-medium">
                  세이프가든은 현장을 직접 확인하고 토지의 조건에 맞는 식물을 선택하여 식재부터 관리까지 필요한 서비스를 제공합니다.
                </p>
              </div>

              {/* CTAs */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                <button
                  id="hero-main-cta-btn"
                  onClick={() => onSelectTab('consultation')}
                  className="inline-flex items-center justify-center space-x-2.5 px-6 py-3.5 bg-[#1E4334] hover:bg-[#255240] text-[#FAF8F5] text-base font-semibold rounded-lg shadow-sm hover:shadow transition-all border border-[#1E4334] group"
                >
                  <span>현장평가 상담</span>
                  <ArrowRight className="w-4 h-4 text-[#5E856F] group-hover:translate-x-0.5 transition-transform" />
                </button>

                <button
                  id="hero-sub-cta-btn"
                  onClick={() => onSelectTab('land-asset')}
                  className="inline-flex items-center justify-center space-x-2 px-6 py-3.5 bg-white/80 hover:bg-white text-[#1E4334] text-base font-medium rounded-lg border border-[#1E4334]/20 hover:border-[#1E4334]/40 transition-all shadow-xs"
                >
                  <span>서비스 알아보기</span>
                </button>
              </div>

              {/* 3 Core Points */}
              <div className="pt-6 border-t border-[#1E4334]/10 grid grid-cols-3 gap-2 sm:gap-4 text-xs sm:text-sm">
                <div className="p-3 bg-white/60 rounded-lg border border-[#1E4334]/5">
                  <span className="block font-bold text-[#1E4334]">현장 직접 확인</span>
                  <span className="text-[#1E4334]/70 text-xs">사진과 기록 전달</span>
                </div>
                <div className="p-3 bg-white/60 rounded-lg border border-[#1E4334]/5">
                  <span className="block font-bold text-[#1E4334]">토지에 맞는 식물 선택</span>
                  <span className="text-[#1E4334]/70 text-xs">합리적인 식물 매칭</span>
                </div>
                <div className="p-3 bg-white/60 rounded-lg border border-[#1E4334]/5">
                  <span className="block font-bold text-[#1E4334]">필요한 만큼 관리</span>
                  <span className="text-[#1E4334]/70 text-xs">식재부터 관리·출하까지</span>
                </div>
              </div>
            </div>

            {/* Right Visual - Company Vehicle with Safe Garden CI */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden shadow-xl border border-[#1E4334]/15 group bg-[#1E4334]/5">
                <img
                  src={IMAGES.pv5Van}
                  alt="세이프가든 현장 전용 차량"
                  className="w-full h-[380px] sm:h-[460px] object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1E4334]/90 via-[#1E4334]/20 to-transparent" />
                
                {/* Official CI Badge Watermark */}
                <div className="absolute top-4 right-4 bg-[#FAF8F5]/95 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#1E4334]/20 shadow-md flex items-center space-x-2">
                  <SafeGardenLogo variant="symbol" size="sm" theme="light" />
                  <span className="text-xs font-bold text-[#1E4334]">세이프가든 현장 전용 차량</span>
                </div>

                <div className="absolute bottom-5 left-5 right-5 text-[#FAF8F5] space-y-1">
                  <div className="flex items-center space-x-2 text-[#5E856F] text-xs font-semibold uppercase tracking-wider">
                    <ShieldCheck className="w-4 h-4" />
                    <span>기동형 현장평가 모빌리티</span>
                  </div>
                  <p className="text-sm sm:text-base font-medium text-white leading-snug">
                    전국 현장에 방문하여 직접 평가 합니다.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* ━━━━━━━━━━━━━━━━━━━━━━
          SECTION 8: THE REAL OPPORTUNITY
          ━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="bg-white py-20 lg:py-28 border-b border-[#1E4334]/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-10">
          
          <div className="space-y-4">
            <span className="text-xs font-semibold tracking-widest text-[#5E856F] uppercase block">
              THE REAL OPPORTUNITY
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1E4334] tracking-tight leading-tight">
              “당신의 토지로 농업경영을 시작한다면?”
            </h2>

            <div className="w-16 h-0.5 bg-[#5E856F] mx-auto" />

            <p className="text-base sm:text-lg lg:text-xl text-[#1E4334]/85 leading-relaxed font-medium max-w-2xl mx-auto">
              농업경영체 등록을 기반으로<br />
              토지를 활용할 수 있는 다양한 지원과 혜택을 확인해보세요.
            </p>
          </div>

          {/* 4 Opportunity Benefits Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 text-left pt-2">
            
            {/* 1. 공익직불금 */}
            <div className="p-6 rounded-xl bg-[#FAF8F5] border border-[#1E4334]/10 hover:border-[#1E4334]/30 transition-all flex flex-col justify-between space-y-3 group shadow-xs">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-lg bg-[#1E4334]/10 text-[#1E4334] flex items-center justify-center group-hover:bg-[#1E4334] group-hover:text-white transition-colors">
                  <Coins className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-[#1E4334]">
                  공익직불금
                </h3>
                <p className="text-sm font-semibold text-[#5E856F] leading-snug">
                  소농직불금 연 130만원부터
                </p>
              </div>
              <p className="text-xs text-[#1E4334]/70 leading-relaxed pt-2 border-t border-[#1E4334]/10">
                일정 요건을 갖춘 소규모 농가 대상 기본형 공익직접지불금 수령 가능
              </p>
            </div>

            {/* 2. 건강보험료 · 국민연금 */}
            <div className="p-6 rounded-xl bg-[#FAF8F5] border border-[#1E4334]/10 hover:border-[#1E4334]/30 transition-all flex flex-col justify-between space-y-3 group shadow-xs">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-lg bg-[#1E4334]/10 text-[#1E4334] flex items-center justify-center group-hover:bg-[#1E4334] group-hover:text-white transition-colors">
                  <HeartPulse className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-[#1E4334]">
                  건강보험료 · 국민연금
                </h3>
                <p className="text-sm font-semibold text-[#5E856F] leading-snug">
                  농업인 보험료 일부 지원
                </p>
              </div>
              <p className="text-xs text-[#1E4334]/70 leading-relaxed pt-2 border-t border-[#1E4334]/10">
                농업인 자격 확인을 통해 국민연금 및 건강보험료 경감 지원
              </p>
            </div>

            {/* 3. 농업용 혜택 */}
            <div className="p-6 rounded-xl bg-[#FAF8F5] border border-[#1E4334]/10 hover:border-[#1E4334]/30 transition-all flex flex-col justify-between space-y-3 group shadow-xs">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-lg bg-[#1E4334]/10 text-[#1E4334] flex items-center justify-center group-hover:bg-[#1E4334] group-hover:text-white transition-colors">
                  <Fuel className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-[#1E4334]">
                  농업용 혜택
                </h3>
                <p className="text-sm font-semibold text-[#5E856F] leading-snug">
                  면세유 · 농기계 · 농업시설 등 지원사업 활용
                </p>
              </div>
              <p className="text-xs text-[#1E4334]/70 leading-relaxed pt-2 border-t border-[#1E4334]/10">
                농업용 면세유 공급 및 임대 농기계, 관정·울타리 등 시설 보조
              </p>
            </div>

            {/* 4. 정책지원 */}
            <div className="p-6 rounded-xl bg-[#FAF8F5] border border-[#1E4334]/10 hover:border-[#1E4334]/30 transition-all flex flex-col justify-between space-y-3 group shadow-xs">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-lg bg-[#1E4334]/10 text-[#1E4334] flex items-center justify-center group-hover:bg-[#1E4334] group-hover:text-white transition-colors">
                  <FileCheck className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-[#1E4334]">
                  정책지원
                </h3>
                <p className="text-sm font-semibold text-[#5E856F] leading-snug">
                  다양한 농업정책사업 및 지원금 신청 가능
                </p>
              </div>
              <p className="text-xs text-[#1E4334]/70 leading-relaxed pt-2 border-t border-[#1E4334]/10">
                농업경영체를 기반으로 지자체 및 정부 공모사업, 창농·육성 자금 연계
              </p>
            </div>

          </div>

          {/* Bottom Banner & CTA */}
          <div className="pt-6">
            <div className="p-6 sm:p-8 rounded-2xl bg-[#1E4334] text-[#FAF8F5] max-w-3xl mx-auto shadow-md space-y-4">
              <div className="space-y-2">
                <span className="text-xs font-semibold tracking-wider text-[#5E856F] uppercase">
                  LAND CONSULTATION
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white">
                  내 토지도 활용할 수 있을까?
                </h3>
                <p className="text-sm sm:text-base text-[#FAF8F5]/90 leading-relaxed">
                  세이프가든이 당신의 토지를 확인하고 가능한 방법을 찾아드립니다.
                </p>
              </div>
              <div className="pt-2">
                <button
                  id="opportunity-cta-btn"
                  onClick={() => onSelectTab('consultation')}
                  className="inline-flex items-center space-x-2 px-6 py-3 bg-[#FAF8F5] hover:bg-white text-[#1E4334] font-bold text-sm rounded-lg shadow-sm hover:shadow transition-all"
                >
                  <span>내 토지 진단 및 지원혜택 상담받기</span>
                  <ArrowRight className="w-4 h-4 text-[#1E4334]" />
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>


      {/* ━━━━━━━━━━━━━━━━━━━━━━
          SECTION 9: 세이프가든의 차별점
          ━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="bg-[#FAF8F5] py-20 lg:py-28 border-b border-[#1E4334]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl mb-16 space-y-4">
            <span className="text-xs font-semibold tracking-wider text-[#5E856F] uppercase block">
              DIFFERENTIATOR
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1E4334] tracking-tight">
              우리는 조경회사가 아닙니다.
            </h2>
            <p className="text-lg sm:text-xl font-semibold text-[#5E856F]">
              “조경은 공간을 아름답게 만들지만, 세이프가든은 토지와 식물자산의 가치를 관리합니다.”
            </p>
            <p className="text-base text-[#1E4334]/80 leading-relaxed pt-2">
              단순히 나무를 전지하고, 예초하여 공간을 정리하는 것에서 끝나지 않습니다.<br />
              토지의 상태를 확인하고, 적합한 식물을 선택하며, 식물과 주변 환경을 관리해 토지의 새로운 가치를 만들어갑니다.
            </p>
          </div>

          {/* Visual Lifecycle Flow: 토지 → 식물 → 관리 → 자산 */}
          <div className="bg-white rounded-2xl p-6 sm:p-10 border border-[#1E4334]/15 shadow-sm">
            <div className="text-center mb-8">
              <span className="text-xs font-semibold text-[#1E4334]/60 uppercase tracking-wider">
                SAFE GARDEN CORE CYCLE
              </span>
              <h3 className="text-xl font-bold text-[#1E4334] mt-1">
                토지의 가능성을 자산의 가치로
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
              
              {/* STEP 1: 토지 */}
              <div className="relative p-5 rounded-xl bg-[#FAF8F5] border border-[#1E4334]/10 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="w-8 h-8 rounded-full bg-[#1E4334] text-white flex items-center justify-center font-bold text-xs">
                    01
                  </div>
                  <h4 className="text-lg font-bold text-[#1E4334]">토지 (Land)</h4>
                  <p className="text-xs text-[#1E4334]/75 leading-relaxed">
                    토지의 위치와 접근성, 토양, 배수, 일조, 용수 등 식물이 자랄 수 있는 환경과 활용 가능성을 확인합니다.
                  </p>
                </div>
                <div className="pt-3 border-t border-[#1E4334]/10 text-xs text-[#5E856F] space-y-1">
                  <div>· 진입로 및 차량 접근성 확인</div>
                  <div>· 토양·배수·일조 환경 분석</div>
                </div>
              </div>

              {/* STEP 2: 식물 */}
              <div className="relative p-5 rounded-xl bg-[#FAF8F5] border border-[#1E4334]/10 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="w-8 h-8 rounded-full bg-[#5E856F] text-white flex items-center justify-center font-bold text-xs">
                    02
                  </div>
                  <h4 className="text-lg font-bold text-[#1E4334]">식물 (Plant)</h4>
                  <p className="text-xs text-[#1E4334]/75 leading-relaxed">
                    토지의 환경과 목적에 맞는 식물을 선택하고 식물자산으로 성장할 수 있는 계획을 세웁니다.
                  </p>
                </div>
                <div className="pt-3 border-t border-[#1E4334]/10 text-xs text-[#5E856F] space-y-1">
                  <div>· 환경에 맞는 수종·작물 매칭</div>
                  <div>· 식재 및 생육계획 수립</div>
                </div>
              </div>

              {/* STEP 3: 관리 */}
              <div className="relative p-5 rounded-xl bg-[#FAF8F5] border border-[#1E4334]/10 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="w-8 h-8 rounded-full bg-[#1E4334] text-white flex items-center justify-center font-bold text-xs">
                    03
                  </div>
                  <h4 className="text-lg font-bold text-[#1E4334]">관리 (Care)</h4>
                  <p className="text-xs text-[#1E4334]/75 leading-relaxed">
                    예초와 전정부터 관수·시비·병해충 예찰까지 필요한 관리만 체계적으로 수행합니다.
                  </p>
                </div>
                <div className="pt-3 border-t border-[#1E4334]/10 text-xs text-[#5E856F] space-y-1">
                  <div>· 정기적인 생육 예찰 및 기록</div>
                  <div>· 예초·전정·관수·시비·병해충 관리</div>
                  <div>· 빈집 및 주변 환경 관리</div>
                </div>
              </div>

              {/* STEP 4: 자산 */}
              <div className="relative p-5 rounded-xl bg-[#FAF8F5] border border-[#1E4334]/10 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="w-8 h-8 rounded-full bg-[#5E856F] text-[#FAF8F5] flex items-center justify-center font-bold text-xs">
                    04
                  </div>
                  <h4 className="text-lg font-bold text-[#1E4334]">자산 (Asset)</h4>
                  <p className="text-xs text-[#1E4334]/75 leading-relaxed">
                    잘 관리된 식물과 토지의 상태를 기록하고 수확·판매·이식 등 다양한 방법으로 가치를 이어갑니다.
                  </p>
                </div>
                <div className="pt-3 border-t border-[#1E4334]/10 text-xs text-[#5E856F] space-y-1">
                  <div>· 식물자산 가치 관리</div>
                  <div>· 수확·판매·이식 및 수요처 연계</div>
                  <div>· 토지와 식물의 지속적인 관리 기록</div>
                </div>
              </div>

            </div>

            <div className="mt-8 pt-6 border-t border-[#1E4334]/10 flex flex-col sm:flex-row items-center justify-between text-xs sm:text-sm text-[#1E4334]/70 gap-3">
              <span className="font-medium text-[#1E4334]">
                화려한 시각적 미화가 아닌, 토지와 식물의 생애주기를 고려한 자산 관리 시스템
              </span>
              <button
                onClick={() => onSelectTab('about')}
                className="inline-flex items-center text-[#1E4334] font-semibold hover:underline"
              >
                <span>회사 철학 자세히 보기</span>
                <ChevronRight className="w-4 h-4 ml-1 text-[#5E856F]" />
              </button>
            </div>
          </div>

        </div>
      </section>


      {/* ━━━━━━━━━━━━━━━━━━━━━━
          SECTION 10: 주요 서비스 (SERVICES)
          ━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="bg-white py-20 lg:py-28 border-b border-[#1E4334]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-semibold tracking-widest text-[#5E856F] uppercase">
              SERVICES
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1E4334] tracking-tight">
              토지와 식물자산을 함께 봅니다.
            </h2>
            <p className="text-base sm:text-lg text-[#1E4334]/80 leading-relaxed font-medium">
              토지의 조건을 진단하고, 식물을 선택하고, 관리하며<br />
              필요한 경우 빈집과 주변 환경까지 함께 관리합니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {CORE_SERVICES.map((srv) => (
              <div
                key={srv.id}
                id={`home-service-${srv.id}`}
                className="bg-[#FAF8F5] rounded-xl overflow-hidden border border-[#1E4334]/10 hover:border-[#1E4334]/30 transition-all shadow-xs hover:shadow-md flex flex-col group"
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
                  <span className="absolute top-3 left-3 bg-[#1E4334] text-white text-xs font-mono font-bold px-2 py-1 rounded">
                    CARD {srv.num}
                  </span>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-[#1E4334] group-hover:text-[#255240]">
                      {srv.title}
                    </h3>
                    <p className="text-xs text-[#1E4334]/80 leading-relaxed">
                      {srv.description}
                    </p>
                  </div>

                  {/* Bullet details */}
                  <div className="pt-3 border-t border-[#1E4334]/10 space-y-1 text-xs text-[#5E856F]">
                    {srv.details.map((detail, idx) => (
                      <div key={idx} className="flex items-start">
                        <span className="mr-1.5">·</span>
                        <span>{detail}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={() => onSelectTab(srv.id === 'vacant-surroundings' ? 'vacant-house' : 'land-asset')}
                      className="inline-flex items-center text-xs font-bold text-[#1E4334] hover:text-[#5E856F] transition-colors"
                    >
                      <span>자세히 보기</span>
                      <ArrowRight className="w-3.5 h-3.5 ml-1 text-[#5E856F]" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>


      {/* ━━━━━━━━━━━━━━━━━━━━━━
          SECTION 11: 빈집과 주변 토지 관리 (멀리 있는 빈집과 주변 토지 누가 관리하고 있을까요?)
          ━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="bg-[#FAF8F5] py-20 lg:py-28 border-b border-[#1E4334]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Visual: Rustic Vacant House */}
            <div className="lg:col-span-5 order-2 lg:order-1">
              <div className="relative rounded-2xl overflow-hidden shadow-lg border border-[#1E4334]/15 group">
                <img
                  src={IMAGES.vacantHouse}
                  alt="멀리 있는 시골 빈집과 마당 현장"
                  className="w-full h-[360px] sm:h-[420px] object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1E4334]/80 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <span className="text-xs font-mono text-[#5E856F] uppercase tracking-wider block mb-1">
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
              <span className="text-xs font-semibold tracking-wider text-[#5E856F] uppercase block">
                VACANT HOUSE & SURROUNDINGS
              </span>

              <h2 className="text-3xl sm:text-4xl font-bold text-[#1E4334] tracking-tight leading-snug">
                멀리 있는 빈집과 주변 토지,<br />
                누가 관리하고 있을까요?
              </h2>

              <p className="text-base sm:text-lg text-[#1E4334]/80 leading-relaxed font-normal">
                비어 있는 집은 사람이 살지 않는다고 해서 관리가 필요 없는 것은 아닙니다. 
                세이프가든은 집 안의 청소부터 주변 정리, 방역, 상태점검, 
                마당과 주변 식물관리까지 필요한 만큼 제공합니다.
              </p>

              {/* 5 Core Keywords */}
              <div className="space-y-3">
                <span className="text-xs font-semibold text-[#1E4334]/60 block uppercase tracking-wider">
                  핵심 서비스 키워드
                </span>
                <div className="flex flex-wrap gap-2.5">
                  {['청소', '주변정리', '방역', '상태점검', '식물관리'].map((kw) => (
                    <span
                      key={kw}
                      className="px-4 py-2 bg-white border border-[#1E4334]/15 text-[#1E4334] font-medium text-sm rounded-lg"
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
                  className="inline-flex items-center space-x-2 px-6 py-3 bg-[#1E4334] hover:bg-[#255240] text-[#FAF8F5] text-sm font-semibold rounded-lg shadow-sm transition-all"
                >
                  <span>빈집 서비스 보기</span>
                  <ArrowRight className="w-4 h-4 text-[#5E856F]" />
                </button>
              </div>

              {/* ━━━━━━━━━━━━━━━━━━━━━━
                  SECTION 12: 빈집 활용 확장 (Extension)
                  ━━━━━━━━━━━━━━━━━━━━━━ */}
              <div className="mt-8 p-5 sm:p-6 bg-white rounded-xl border border-[#1E4334]/15 space-y-2 shadow-2xs">
                <div className="flex items-center space-x-2 text-xs font-semibold text-[#5E856F] uppercase tracking-wider">
                  <Building className="w-4 h-4" />
                  <span>필요시 제공되는 확장 연계</span>
                </div>
                <h3 className="text-base font-bold text-[#1E4334]">
                  "비어 있는 집의 새로운 활용도 생각합니다."
                </h3>
                <p className="text-xs sm:text-sm text-[#1E4334]/75 leading-relaxed">
                  빈집을 임대주택이나 민박 등으로 활용하고 싶은 경우, 
                  활용 목적에 맞춰 필요한 리모델링을 검토하고 관련 전문 서비스를 연결할 수 있습니다.
                </p>
                <span className="text-[11px] text-[#1E4334]/60 block pt-1">
                  * 무리한 공사를 부추기지 않으며, 현장 점검 후 실수요 목적이 있을 때 한하여 전문 파트너십을 연결합니다.
                </span>
              </div>

            </div>

          </div>

        </div>
      </section>


      {/* ━━━━━━━━━━━━━━━━━━━━━━
          SECTION 13: 선택형 서비스 강조 (필요한 서비스만, 필요한 만큼)
          ━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="bg-white py-20 lg:py-28 border-b border-[#1E4334]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl mb-14 space-y-3">
            <span className="text-xs font-semibold tracking-wider text-[#5E856F] uppercase">
              FLEXIBLE SERVICE MODEL
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1E4334] tracking-tight">
              필요한 서비스만, 필요한 만큼.
            </h2>
            <p className="text-base text-[#1E4334]/80 leading-relaxed">
              모든 토지에 같은 관리가 필요한 것은 아닙니다. 
              토지의 상태와 식물의 종류, 관리 목적에 따라 필요한 서비스만 선택할 수 있습니다. 
              세이프가든은 비싼 종합관리 계약을 강요하지 않습니다.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICE_TIERS.map((tier, idx) => (
              <div
                key={idx}
                className="bg-[#FAF8F5] rounded-xl p-6 border border-[#1E4334]/15 shadow-xs hover:shadow-md transition-all flex flex-col justify-between relative"
              >
                <div className="space-y-4">
                  <div className="inline-block px-3 py-1 rounded bg-[#1E4334]/8 text-[#1E4334] text-xs font-bold tracking-wide">
                    {tier.type}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#1E4334] leading-snug">
                      {tier.title}
                    </h3>
                    <p className="text-xs text-[#1E4334]/70 mt-2 leading-relaxed">
                      {tier.desc}
                    </p>
                  </div>

                  <ul className="space-y-2 pt-2 border-t border-[#1E4334]/10">
                    {tier.points.map((pt, pIdx) => (
                      <li key={pIdx} className="flex items-center text-xs text-[#1E4334]/85">
                        <Check className="w-3.5 h-3.5 text-[#5E856F] mr-1.5 shrink-0" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6 mt-4">
                  <button
                    onClick={() => onSelectTab('consultation')}
                    className="w-full py-2.5 px-3 rounded-lg border border-[#1E4334]/20 hover:border-[#1E4334] text-xs font-semibold text-[#1E4334] hover:bg-[#1E4334] hover:text-white transition-all text-center"
                  >
                    이 구성으로 상담받기
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 p-5 rounded-xl bg-[#FAF8F5] border border-[#1E4334]/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-3 text-xs sm:text-sm text-[#1E4334]">
              <ShieldCheck className="w-5 h-5 text-[#5E856F] shrink-0" />
              <span>과도한 작업 권유 없이, 현장 진단 결과표를 바탕으로 고객이 직접 선택합니다.</span>
            </div>
            <button
              onClick={() => onSelectTab('consultation')}
              className="text-xs font-bold text-[#1E4334] underline underline-offset-4 hover:text-[#5E856F] whitespace-nowrap"
            >
              내 토지 맞춤 진단 요청하기
            </button>
          </div>

        </div>
      </section>


      {/* ━━━━━━━━━━━━━━━━━━━━━━
          SECTION 14: 관리 철학 (분석에서 관리가 시작됩니다)
          ━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="bg-[#1E4334] text-[#FAF8F5] py-20 lg:py-28 border-b border-[#1E4334]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
          
          <div className="space-y-4">
            <span className="text-xs font-semibold tracking-widest text-[#5E856F] uppercase block">
              MANAGEMENT PHILOSOPHY
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
              분석에서 관리가 시작됩니다.
            </h2>
            <p className="text-base sm:text-lg text-[#FAF8F5]/85 max-w-2xl mx-auto leading-relaxed">
              토지와 식물을 단순히 바라보는 것이 아니라<br />
              환경과 상태를 분석하고, 필요한 관리방법을 설계합니다.
            </p>
          </div>

          {/* 6단계 구조: 01 분석 → 02 진단 → 03 설계 → 04 식재 → 05 관리 → 06 기록 */}
          <div className="py-4">
            <div className="bg-[#142E24] p-6 sm:p-8 rounded-2xl border border-white/10 shadow-lg space-y-6">
              <div className="flex items-center justify-center space-x-2">
                <span className="text-xs font-bold text-[#5E856F] uppercase tracking-wider">
                  6단계 구조
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3 sm:gap-3 text-left">
                
                {/* 01 분석 */}
                <div className="p-4 bg-white/5 rounded-xl border border-white/10 flex flex-col justify-between space-y-2 hover:bg-white/10 transition-colors">
                  <div className="space-y-1">
                    <span className="text-xs font-mono text-[#5E856F] font-bold block">01</span>
                    <h3 className="text-lg font-bold text-white">분석</h3>
                  </div>
                  <p className="text-xs text-[#FAF8F5]/75 leading-relaxed">
                    토양·수분·배수·일조·접근성 등 토지의 환경을 분석합니다.
                  </p>
                </div>

                {/* 02 진단 */}
                <div className="p-4 bg-white/5 rounded-xl border border-white/10 flex flex-col justify-between space-y-2 hover:bg-white/10 transition-colors">
                  <div className="space-y-1">
                    <span className="text-xs font-mono text-[#5E856F] font-bold block">02</span>
                    <h3 className="text-lg font-bold text-white">진단</h3>
                  </div>
                  <p className="text-xs text-[#FAF8F5]/75 leading-relaxed">
                    식물의 생육상태와 문제 원인을 확인합니다.
                  </p>
                </div>

                {/* 03 설계 */}
                <div className="p-4 bg-white/5 rounded-xl border border-white/10 flex flex-col justify-between space-y-2 hover:bg-white/10 transition-colors">
                  <div className="space-y-1">
                    <span className="text-xs font-mono text-[#5E856F] font-bold block">03</span>
                    <h3 className="text-lg font-bold text-white">설계</h3>
                  </div>
                  <p className="text-xs text-[#FAF8F5]/75 leading-relaxed">
                    토지의 조건과 목적에 맞는 식물과 관리방법을 설계합니다.
                  </p>
                </div>

                {/* 04 식재 */}
                <div className="p-4 bg-white/5 rounded-xl border border-white/10 flex flex-col justify-between space-y-2 hover:bg-white/10 transition-colors">
                  <div className="space-y-1">
                    <span className="text-xs font-mono text-[#5E856F] font-bold block">04</span>
                    <h3 className="text-lg font-bold text-white">식재</h3>
                  </div>
                  <p className="text-xs text-[#FAF8F5]/75 leading-relaxed">
                    적합한 식물을 선정하고 올바른 방법으로 식재합니다.
                  </p>
                </div>

                {/* 05 관리 */}
                <div className="p-4 bg-white/5 rounded-xl border border-white/10 flex flex-col justify-between space-y-2 hover:bg-white/10 transition-colors">
                  <div className="space-y-1">
                    <span className="text-xs font-mono text-[#5E856F] font-bold block">05</span>
                    <h3 className="text-lg font-bold text-white">관리</h3>
                  </div>
                  <p className="text-xs text-[#FAF8F5]/75 leading-relaxed">
                    예초·전정·관수·시비·병해충 관리 등 필요한 관리를 시행합니다.
                  </p>
                </div>

                {/* 06 기록 */}
                <div className="p-4 bg-white/5 rounded-xl border border-white/10 flex flex-col justify-between space-y-2 hover:bg-white/10 transition-colors">
                  <div className="space-y-1">
                    <span className="text-xs font-mono text-[#5E856F] font-bold block">06</span>
                    <h3 className="text-lg font-bold text-white">기록</h3>
                  </div>
                  <p className="text-xs text-[#FAF8F5]/75 leading-relaxed">
                    관리 결과와 식물의 변화를 기록하여 다음 관리로 연결합니다.
                  </p>
                </div>

              </div>

              {/* Bottom Quote Banner */}
              <div className="mt-8 pt-6 border-t border-white/10 text-center space-y-1">
                <p className="text-lg sm:text-xl font-bold text-white tracking-tight">
                  “감으로 관리하지 않습니다.<br />
                  분석하고, 판단하고, 관리합니다.”
                </p>
              </div>
            </div>
          </div>

          <div>
            <button
              onClick={() => onSelectTab('about')}
              className="inline-flex items-center space-x-2 text-xs font-semibold text-[#FAF8F5]/80 hover:text-white underline underline-offset-8"
            >
              <span>세이프가든의 7대 원칙 모두 보기</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1 text-[#5E856F]" />
            </button>
          </div>

        </div>
      </section>


      {/* ━━━━━━━━━━━━━━━━━━━━━━
          SECTION 15: 최종 CTA
          ━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="bg-[#FAF8F5] py-20 lg:py-32">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          
          <div className="w-12 h-12 rounded-xl bg-[#1E4334] text-[#5E856F] flex items-center justify-center mx-auto shadow-sm">
            <ClipboardList className="w-6 h-6" />
          </div>

          <div className="space-y-4">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1E4334] tracking-tight leading-tight">
              내 토지와 빈집,<br />
              한번 확인해보세요.
            </h2>
            <p className="text-base sm:text-lg text-[#1E4334]/80 max-w-xl mx-auto leading-relaxed">
              직접 관리하기 어려운 토지와 빈집, 
              현장을 확인하고 필요한 관리부터 시작할 수 있습니다.
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              id="bottom-main-cta-btn"
              onClick={() => onSelectTab('consultation')}
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2.5 px-8 py-4 bg-[#1E4334] hover:bg-[#255240] text-[#FAF8F5] text-base font-semibold rounded-lg shadow-md hover:shadow-lg transition-all"
            >
              <span>현장평가 상담</span>
              <ArrowRight className="w-4 h-4 text-[#5E856F]" />
            </button>

            <button
              id="bottom-sub-cta-btn"
              onClick={() => onSelectTab('consultation')}
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-8 py-4 bg-white text-[#1E4334] text-base font-medium rounded-lg border border-[#1E4334]/20 hover:border-[#1E4334] transition-all"
            >
              <span>문의하기</span>
            </button>
          </div>

          <p className="text-xs text-[#1E4334]/60 pt-4">
            * 전국 토지 및 빈집 위치에 따라 현장조사 일정을 조율해 드립니다.
          </p>

        </div>
      </section>

    </div>
  );
};
