import React from 'react';
import {
  Sprout,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Eye,
  FileText,
  HelpCircle,
  Scissors,
  AlertTriangle,
  History,
  Shield,
  Leaf,
  Palette,
  Layers,
} from 'lucide-react';
import { PageTab } from '../types';
import { BRAND, PHILOSOPHY_PRINCIPLES, IMAGES } from '../data/constants';
import { SafeGardenLogo } from './SafeGardenLogo';

interface AboutViewProps {
  onSelectTab: (tab: PageTab) => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onSelectTab }) => {
  const icons = [
    Sprout,
    Eye,
    FileText,
    HelpCircle,
    Scissors,
    AlertTriangle,
    History,
  ];

  return (
    <div className="space-y-0 text-[#21262B]">
      
      {/* Header Banner */}
      <section className="bg-[#FAF8F5] py-16 lg:py-24 border-b border-[#1E4334]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            <div className="lg:col-span-8 space-y-6">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#1E4334]/8 text-xs font-bold text-[#1E4334]">
                <span>ABOUT SAFE GARDEN</span>
              </div>

              <div className="space-y-2">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#1E4334] leading-tight">
                  {BRAND.nameKo}
                  <span className="text-xl sm:text-2xl font-light text-[#5E856F] ml-3 font-sans">
                    {BRAND.nameEn}
                  </span>
                </h1>
                <p className="text-xl sm:text-2xl font-medium text-[#5E856F]">
                  "{BRAND.slogan}"
                </p>
              </div>

              <p className="text-base sm:text-lg text-[#21262B]/85 leading-relaxed font-normal">
                세이프가든은 토지와 그곳에서 자라는 식물을 하나의 가치 있는 자산으로 보고, 
                전국 현장을 직접 확인하고 기록하며 필요한 과학적 관리와 정직한 서비스를 제공합니다.
              </p>
            </div>

            {/* Official CI Badge Card */}
            <div className="lg:col-span-4 flex justify-center lg:justify-end">
              <div className="bg-white p-8 rounded-2xl border border-[#1E4334]/15 shadow-sm flex flex-col items-center text-center max-w-xs w-full">
                <SafeGardenLogo variant="vertical" size="xl" theme="light" showSubtitle={false} />
                <div className="mt-4 pt-3 border-t border-[#1E4334]/10 w-full text-center">
                  <span className="text-xs font-bold text-[#1E4334] block">공식 브랜드 아이덴티티</span>
                  <span className="text-[11px] text-[#5E856F] mt-0.5 block">토지·식물자산 보호 & 전문 솔루션</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* Core Differentiator Statements */}
      <section className="bg-white py-16 lg:py-24 border-b border-[#1E4334]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <span className="text-xs font-semibold text-[#5E856F] uppercase tracking-wider">
              WHO WE ARE
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1E4334]">
              우리의 기준과 시선
            </h2>
            <p className="text-xs sm:text-sm text-[#21262B]/70">
              세이프가든은 화려한 겉모습보다 정직한 현장 데이터와 보존 가치를 믿습니다.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                title: '우리는 조경회사가 아닙니다.',
                desc: '보기 좋게 꾸미고 떠나는 공사가 아닌, 토지와 식물의 생애 전반을 책임지고 관리합니다.',
              },
              {
                title: '작업을 하기 전에 현장을 봅니다.',
                desc: '무작정 기계를 돌리기 전에 배수, 일조, 진입로, 토양 상태를 면밀히 살핍니다.',
              },
              {
                title: '식물보다 식물자산을 봅니다.',
                desc: '토양 환경과 결합하여 시간이 지날수록 가치를 형성하는 실질적 자산으로 대합니다.',
              },
              {
                title: '필요한 서비스만 제공합니다.',
                desc: '과도한 계약을 권하지 않으며, 현장에 꼭 필요한 최소한의 합리적 조치만 제안합니다.',
              },
            ].map((card, i) => (
              <div
                key={i}
                className="p-6 rounded-xl bg-[#FAF8F5] border border-[#1E4334]/10 space-y-3 flex flex-col justify-between hover:border-[#1E4334]/30 transition-colors"
              >
                <div className="space-y-2">
                  <div className="w-2 h-2 rounded-full bg-[#5E856F]" />
                  <h3 className="text-lg font-bold text-[#1E4334] leading-snug">
                    "{card.title}"
                  </h3>
                </div>
                <p className="text-xs text-[#21262B]/75 leading-relaxed pt-2 border-t border-[#1E4334]/10">
                  {card.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>


      {/* Brand Corporate Identity (CI) Story Section */}
      <section className="bg-[#FAF8F5] py-20 lg:py-24 border-b border-[#1E4334]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <span className="text-xs font-semibold text-[#5E856F] uppercase tracking-wider block">
              OFFICIAL CORPORATE IDENTITY & BRAND COLORS
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1E4334]">
              세이프가든 CI와 공식 브랜드 규정
            </h2>
            <p className="text-xs sm:text-sm text-[#21262B]/75 max-w-2xl mx-auto leading-relaxed">
              견고한 대지(토지)와 보호를 상징하는 온실 아치(Safe), 그리고 생명력 넘치는 식물 새싹(Garden)이 
              하나로 조화를 이루는 세이프가든의 공식 브랜드 아이덴티티입니다. 
              홈페이지와 현장 모빌리티에 동일한 정밀 벡터 시스템과 규정 색상이 일관되게 적용됩니다.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* CI Visual Display Card */}
            <div className="lg:col-span-5 bg-white p-8 sm:p-10 rounded-2xl border border-[#1E4334]/15 shadow-sm flex flex-col items-center justify-between space-y-6">
              <div className="w-full flex justify-between items-center border-b border-[#1E4334]/10 pb-4">
                <span className="text-xs font-bold text-[#1E4334] uppercase tracking-wider">
                  Official Symbol & Wordmark
                </span>
                <span className="text-[11px] px-2.5 py-1 bg-[#1E4334]/10 text-[#1E4334] font-semibold rounded-full">
                  공식 CI 규정
                </span>
              </div>

              {/* Large CI Vector (Symbol & Wordmark) */}
              <div className="p-8 bg-[#FAF8F5] rounded-2xl border border-[#1E4334]/10 w-full flex flex-col items-center justify-center">
                <SafeGardenLogo variant="vertical" size="xl" theme="light" />
              </div>

              {/* App Icon & Symbol Variants Showcase */}
              <div className="w-full grid grid-cols-2 gap-3">
                <div className="p-4 bg-[#E5EDE8]/60 rounded-xl border border-[#1E4334]/10 flex flex-col items-center text-center space-y-2">
                  <SafeGardenLogo variant="app-icon" size="sm" />
                  <div>
                    <span className="text-xs font-bold text-[#1E4334] block">Squircle App Icon</span>
                    <span className="text-[10px] text-[#5E856F]">공식 심볼 아이콘 뱃지</span>
                  </div>
                </div>
                <div className="p-4 bg-[#142E24] rounded-xl flex flex-col items-center text-center space-y-2 text-white">
                  <SafeGardenLogo variant="symbol" size="sm" theme="dark" />
                  <div>
                    <span className="text-xs font-bold block text-white">Dark Inverse Mode</span>
                    <span className="text-[10px] text-[#E5EDE8]">야간 및 차량 리버리용</span>
                  </div>
                </div>
              </div>

              {/* Official Brand Livery Showcase */}
              <div className="w-full rounded-xl overflow-hidden border border-[#1E4334]/15 relative group">
                <img
                  src={IMAGES.ciOfficial}
                  alt="세이프가든 공식 브랜드 그래픽"
                  className="w-full h-40 object-contain bg-white p-2"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-2 left-2 bg-[#1E4334]/90 text-[#FAF8F5] text-[10px] px-2.5 py-1 rounded-full font-medium">
                  공식 CI 그래픽 시스템
                </div>
              </div>
            </div>

            {/* CI Meaning and Refinement Breakdown */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
              
              {/* Refinement Comparison Card */}
              <div className="p-6 bg-white rounded-xl border border-[#1E4334]/15 space-y-3.5 shadow-2xs">
                <div className="flex items-center justify-between border-b border-[#1E4334]/10 pb-2.5">
                  <h4 className="text-xs font-bold text-[#1E4334] uppercase tracking-wider">
                    세이프가든 심볼 마크 3대 조형 요소
                  </h4>
                  <span className="text-[10px] text-[#1E4334] bg-[#1E4334]/10 font-bold px-2.5 py-0.5 rounded">
                    단일 통합 CI 표준
                  </span>
                </div>
                <ul className="space-y-3 text-xs text-[#21262B]/85">
                  <li className="flex items-start space-x-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#1E4334] shrink-0 mt-0.5" />
                    <span><strong>1. 대지 기저선 (Earth Baseline - Land):</strong> 하단에 견고하게 배치된 수평 기저선은 모든 식물과 수목이 뿌리내리는 '토지'이자 안정적 자산 기반을 뜻합니다.</span>
                  </li>
                  <li className="flex items-start space-x-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#1E4334] shrink-0 mt-0.5" />
                    <span><strong>2. 온실 보호 아치 (Greenhouse Arch - Safe):</strong> 기저선 위에 서 있는 정교한 대칭 아치 돔은 기후 변화와 방치 위험으로부터 식물자산을 지키는 '보호'를 상징합니다.</span>
                  </li>
                  <li className="flex items-start space-x-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#1E4334] shrink-0 mt-0.5" />
                    <span><strong>3. 중심 줄기와 새싹 봉오리 (Botanical Sprout - Garden):</strong> 대지 중심에서 솟아올라 아치와 유기적으로 연결되는 새싹은 지속 가능한 생명력과 성장하는 식물자산의 가치를 나타냅니다.</span>
                  </li>
                </ul>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* 1. Safe (Arch) */}
                <div className="p-5 bg-white rounded-xl border border-[#1E4334]/10 space-y-2.5 shadow-2xs">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-lg bg-[#1E4334]/10 text-[#1E4334] flex items-center justify-center">
                      <Shield className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#1E4334]">온실 아치 (Safe)</h4>
                      <span className="text-[10px] text-[#5E856F] font-semibold block">체계적인 보호와 지속적 신뢰</span>
                    </div>
                  </div>
                  <p className="text-xs text-[#21262B]/75 leading-relaxed">
                    거리나 여건으로 인해 방치되기 쉬운 토지, 수목, 빈집 자산을 훼손과 감가상각으로부터 온전하게 지켜냅니다.
                  </p>
                </div>

                {/* 2. Garden (Sprout) */}
                <div className="p-5 bg-white rounded-xl border border-[#1E4334]/10 space-y-2.5 shadow-2xs">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-lg bg-[#5E856F]/15 text-[#1E4334] flex items-center justify-center">
                      <Leaf className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#1E4334]">식물 새싹 (Garden)</h4>
                      <span className="text-[10px] text-[#5E856F] font-semibold block">생명력과 성장하는 자산 가치</span>
                    </div>
                  </div>
                  <p className="text-xs text-[#21262B]/75 leading-relaxed">
                    단순 소모성 관리가 아닌, 토양에 뿌리를 내리고 성장하여 미래에 실질적인 가치를 창출하는 식물자산의 본질을 의미합니다.
                  </p>
                </div>
              </div>

              {/* Official Brand Color Palette System (from ci_sheet.svg) */}
              <div className="p-6 bg-white rounded-xl border border-[#1E4334]/15 space-y-3.5 shadow-2xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Palette className="w-4 h-4 text-[#5E856F]" />
                    <h4 className="text-xs font-bold text-[#1E4334]">세이프가든 공식 브랜드 컬러 시스템 (CI Palette)</h4>
                  </div>
                  <span className="text-[11px] text-[#5E856F] font-semibold">CI Sheet 표준 6색</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 text-xs">
                  
                  {/* Color 1: Deep Pine Green */}
                  <div className="p-2.5 rounded-lg border border-[#1E4334]/20 bg-[#1E4334] text-white space-y-1">
                    <div className="text-[9px] text-white/70 font-mono">#1E4334</div>
                    <div className="font-bold text-[11px] truncate">Deep Pine</div>
                    <div className="text-[9px] text-white/70">메인 브랜드</div>
                  </div>

                  {/* Color 2: Dark Charcoal */}
                  <div className="p-2.5 rounded-lg border border-black/20 bg-[#21262B] text-white space-y-1">
                    <div className="text-[9px] text-white/70 font-mono">#21262B</div>
                    <div className="font-bold text-[11px] truncate">Dark Charcoal</div>
                    <div className="text-[9px] text-white/70">본문 타이포</div>
                  </div>

                  {/* Color 3: Slate Navy */}
                  <div className="p-2.5 rounded-lg border border-black/20 bg-[#20313E] text-white space-y-1">
                    <div className="text-[9px] text-white/70 font-mono">#20313E</div>
                    <div className="font-bold text-[11px] truncate">Slate Navy</div>
                    <div className="text-[9px] text-white/70">코퍼레이트 딥</div>
                  </div>

                  {/* Color 4: Botanical Sage */}
                  <div className="p-2.5 rounded-lg border border-[#5E856F]/30 bg-[#5E856F] text-white space-y-1">
                    <div className="text-[9px] text-white/80 font-mono">#5E856F</div>
                    <div className="font-bold text-[11px] truncate">Muted Sage</div>
                    <div className="text-[9px] text-white/80">식물 세이지</div>
                  </div>

                  {/* Color 5: Light Mint Wash */}
                  <div className="p-2.5 rounded-lg border border-[#1E4334]/15 bg-[#E5EDE8] text-[#1E4334] space-y-1">
                    <div className="text-[9px] text-[#1E4334]/70 font-mono">#E5EDE8</div>
                    <div className="font-bold text-[11px] truncate">Mint Wash</div>
                    <div className="text-[9px] text-[#1E4334]/70">서피스 틴트</div>
                  </div>

                  {/* Color 6: Warm Ivory Canvas */}
                  <div className="p-2.5 rounded-lg border border-[#1E4334]/15 bg-[#FAF8F5] text-[#21262B] space-y-1">
                    <div className="text-[9px] text-[#21262B]/70 font-mono">#FAF8F5</div>
                    <div className="font-bold text-[11px] truncate">Warm Ivory</div>
                    <div className="text-[9px] text-[#21262B]/70">기본 캔버스</div>
                  </div>

                </div>
              </div>

            </div>

          </div>

        </div>
      </section>


      {/* Section 21: 7 Core Principles */}
      <section className="bg-[#1E4334] text-[#FAF8F5] py-20 lg:py-28 border-b border-[#1E4334]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-semibold text-[#5E856F] uppercase tracking-wider block">
              OUR 7 PRINCIPLES
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              세이프가든의 7대 핵심 원칙
            </h2>
            <p className="text-sm sm:text-base text-[#FAF8F5]/75">
              모든 현장 매니저와 관리사는 다음 7가지 원칙에 따라 판단하고 행동합니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PHILOSOPHY_PRINCIPLES.map((pr, idx) => {
              const IconComp = icons[idx % icons.length];
              return (
                <div
                  key={pr.num}
                  className="p-7 rounded-2xl bg-[#142E24] border border-white/10 flex flex-col justify-between space-y-4 hover:border-[#5E856F]/40 transition-colors shadow-sm"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-[#5E856F]">
                        PRINCIPLE {pr.num}
                      </span>
                      <IconComp className="w-5 h-5 text-[#5E856F]" />
                    </div>

                    <h3 className="text-xl font-bold text-white leading-snug">
                      {pr.title}
                    </h3>
                  </div>

                  <p className="text-xs text-[#FAF8F5]/75 leading-relaxed pt-3 border-t border-white/10">
                    {pr.desc}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Core Formula */}
          <div className="p-8 rounded-2xl bg-white/5 border border-white/10 text-center space-y-3 max-w-3xl mx-auto">
            <span className="text-xs font-semibold text-[#5E856F] uppercase tracking-wider">
              THE WORKFLOW
            </span>
            <div className="text-lg sm:text-2xl font-bold text-white font-mono tracking-wide">
              관찰 → 기록 → 판단 → 조치 → 확인 → 기록
            </div>
            <p className="text-xs text-[#FAF8F5]/70 pt-2">
              일회성 공사로 끝내지 않고 다음 관리를 위한 기록을 지속적으로 남깁니다.
            </p>
          </div>

        </div>
      </section>


      {/* Final Callout */}
      <section className="bg-[#FAF8F5] py-16 text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <h3 className="text-2xl sm:text-3xl font-bold text-[#1E4334]">
            믿을 수 있는 현장 파트너가 되어 드립니다.
          </h3>
          <p className="text-sm text-[#21262B]/75">
            토지와 빈집의 고민, 현장 평가 상담으로 첫걸음을 시작해 보세요.
          </p>
          <div>
            <button
              onClick={() => onSelectTab('consultation')}
              className="inline-flex items-center space-x-2 px-8 py-3.5 bg-[#1E4334] hover:bg-[#255240] text-[#FAF8F5] font-semibold text-sm rounded-lg shadow-sm"
            >
              <span>현장평가 상담 신청하기</span>
              <ArrowRight className="w-4 h-4 text-[#5E856F]" />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
