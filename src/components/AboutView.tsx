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
  Trees,
  Shield,
  Leaf,
  Palette,
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
    <div className="space-y-0 text-[#23382A]">
      
      {/* Header Banner */}
      <section className="bg-[#F4F1E8] py-16 lg:py-24 border-b border-[#23382A]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            <div className="lg:col-span-8 space-y-6">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#23382A]/10 text-xs font-bold text-[#23382A]">
                <span>ABOUT SAFE GARDEN</span>
              </div>

              <div className="space-y-2">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#23382A] leading-tight">
                  {BRAND.nameKo}
                  <span className="text-xl sm:text-2xl font-light text-[#6F8068] ml-3">
                    {BRAND.nameEn}
                  </span>
                </h1>
                <p className="text-xl sm:text-2xl font-medium text-[#6F8068]">
                  "{BRAND.slogan}"
                </p>
              </div>

              <p className="text-base sm:text-lg text-[#23382A]/85 leading-relaxed font-normal">
                세이프가든은 토지와 그곳에서 자라는 식물을 하나의 자산으로 보고 
                현장을 확인하고 기록하며 필요한 관리와 서비스를 제공합니다.
              </p>
            </div>

            {/* Official CI Badge Card */}
            <div className="lg:col-span-4 flex justify-center lg:justify-end">
              <div className="bg-white/90 p-8 rounded-2xl border border-[#23382A]/15 shadow-sm flex flex-col items-center text-center max-w-xs w-full">
                <SafeGardenLogo variant="vertical" size="xl" theme="light" showSubtitle={false} />
                <div className="mt-4 pt-3 border-t border-[#23382A]/10 w-full text-center">
                  <span className="text-xs font-bold text-[#23382A] block">공식 브랜드 아이덴티티</span>
                  <span className="text-[11px] text-[#6F8068] mt-0.5 block">토지·식물자산 보호 & 관리</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* Core Differentiator Statements */}
      <section className="bg-white py-16 lg:py-24 border-b border-[#23382A]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <span className="text-xs font-semibold text-[#6F8068] uppercase tracking-wider">
              WHO WE ARE
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#23382A]">
              우리의 기준과 시선
            </h2>
            <p className="text-xs sm:text-sm text-[#23382A]/70">
              세이프가든은 화려한 겉모습보다 정직한 현장 데이터와 보존 가치를 믿습니다.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                title: '우리는 조경회사가 아닙니다.',
                desc: '보기 좋게 꾸미고 떠나는 공사가 아닌, 토지와 식물의 생애 전반을 관리합니다.',
              },
              {
                title: '작업을 하기 전에 현장을 봅니다.',
                desc: '무작정 기계를 돌리기 전에 배수, 일조, 진입로, 토양을 면밀히 살핍니다.',
              },
              {
                title: '식물보다 식물자산을 봅니다.',
                desc: '환경과 결합하여 시간이 지날수록 가치를 갖는 실질적 자산으로 대합니다.',
              },
              {
                title: '필요한 서비스만 제공합니다.',
                desc: '과도한 계약을 강요하지 않으며, 현장에 필요한 최소한의 합리적 조치만 제안합니다.',
              },
            ].map((card, i) => (
              <div
                key={i}
                className="p-6 rounded-xl bg-[#F4F1E8] border border-[#23382A]/10 space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="w-2 h-2 rounded-full bg-[#6F8068]" />
                  <h3 className="text-lg font-bold text-[#23382A] leading-snug">
                    "{card.title}"
                  </h3>
                </div>
                <p className="text-xs text-[#23382A]/75 leading-relaxed pt-2 border-t border-[#23382A]/10">
                  {card.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>


      {/* Brand Corporate Identity (CI) Story Section */}
      <section className="bg-[#FAF8F5] py-20 lg:py-24 border-b border-[#23382A]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <span className="text-xs font-semibold text-[#6F8068] uppercase tracking-wider block">
              CORPORATE IDENTITY
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#23382A]">
              세이프가든 CI와 브랜드 철학
            </h2>
            <p className="text-xs sm:text-sm text-[#23382A]/75 max-w-2xl mx-auto">
              안전을 뜻하는 방패(Safe)와 살아있는 자산인 잎(Garden)이 결합된 세이프가든의 공식 심볼마크입니다. 
              홈페이지와 모든 현장 리포트에 단정하고 신뢰감 있는 브랜드 아이덴티티를 적용합니다.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* CI Visual Display Card */}
            <div className="lg:col-span-5 bg-white p-8 sm:p-10 rounded-2xl border border-[#23382A]/15 shadow-sm flex flex-col items-center justify-between space-y-8">
              <div className="w-full flex justify-between items-center border-b border-[#23382A]/10 pb-4">
                <span className="text-xs font-bold text-[#23382A] uppercase tracking-wider">
                  Official Symbol & Wordmark
                </span>
                <span className="text-[11px] px-2.5 py-1 bg-[#23382A]/8 text-[#23382A] font-semibold rounded-full">
                  정식 CI 규정
                </span>
              </div>

              {/* Large CI Vector */}
              <div className="p-6 bg-[#F4F1E8]/70 rounded-2xl border border-[#23382A]/10 w-full flex flex-col items-center justify-center">
                <SafeGardenLogo variant="vertical" size="xl" theme="light" />
              </div>

              {/* CI Dark Variation Mini Badge */}
              <div className="w-full p-4 bg-[#1C2C21] rounded-xl flex items-center justify-between text-white">
                <div className="flex items-center space-x-3">
                  <SafeGardenLogo variant="symbol" size="sm" theme="dark" />
                  <div className="text-left">
                    <span className="text-xs font-bold block text-white">Dark Theme Application</span>
                    <span className="text-[10px] text-[#C9B98B]">야간 및 다크 톤 적용형</span>
                  </div>
                </div>
                <span className="text-xs font-mono text-[#C9B98B]">CI DARK</span>
              </div>
            </div>

            {/* CI Meaning and Color System */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* 1. Safe (Shield) */}
                <div className="p-5 bg-white rounded-xl border border-[#23382A]/10 space-y-2.5 shadow-2xs">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-lg bg-[#23382A]/10 text-[#23382A] flex items-center justify-center">
                      <Shield className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#23382A]">방패 (Safe)</h4>
                      <span className="text-[10px] text-[#6F8068] font-semibold block">보호와 지속적인 신뢰</span>
                    </div>
                  </div>
                  <p className="text-xs text-[#23382A]/75 leading-relaxed">
                    거리나 여건으로 인해 방치되기 쉬운 토지, 수목, 빈집 자산을 훼손과 감가상각으로부터 온전하게 지켜냅니다.
                  </p>
                </div>

                {/* 2. Garden (Leaf) */}
                <div className="p-5 bg-white rounded-xl border border-[#23382A]/10 space-y-2.5 shadow-2xs">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-lg bg-[#4E9C54]/15 text-[#2E7A34] flex items-center justify-center">
                      <Leaf className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#23382A]">식물 잎 (Garden)</h4>
                      <span className="text-[10px] text-[#6F8068] font-semibold block">생명력과 자산 가치</span>
                    </div>
                  </div>
                  <p className="text-xs text-[#23382A]/75 leading-relaxed">
                    단순 소모성 정원이 아닌, 토양에 뿌리를 내리고 성장하여 미래에 실질적인 가치를 창출하는 식물자산의 본질을 의미합니다.
                  </p>
                </div>

                {/* 3. Interlocking Stem */}
                <div className="p-5 bg-white rounded-xl border border-[#23382A]/10 space-y-2.5 shadow-2xs sm:col-span-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-lg bg-[#C9B98B]/20 text-[#8E7947] flex items-center justify-center">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#23382A]">연결된 줄기 (Interlocking Flow)</h4>
                      <span className="text-[10px] text-[#6F8068] font-semibold block">현장 확인에서 차기 관리로의 순환</span>
                    </div>
                  </div>
                  <p className="text-xs text-[#23382A]/75 leading-relaxed">
                    방패와 잎이 분리되지 않고 줄기를 통해 하나로 이어지듯, 
                    <strong>관찰 → 기록 → 판단 → 조치 → 확인 → 기록</strong>의 선순환 체계로 토지와 식물을 이어 관리합니다.
                  </p>
                </div>
              </div>

              {/* Color Harmony Palette */}
              <div className="p-5 bg-white rounded-xl border border-[#23382A]/10 space-y-3 shadow-2xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Palette className="w-4 h-4 text-[#6F8068]" />
                    <h4 className="text-xs font-bold text-[#23382A]">홈페이지 조화 컬러 팔레트 (Color Palette)</h4>
                  </div>
                  <span className="text-[11px] text-[#23382A]/50">자연과 토양의 배색</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                  <div className="p-2.5 rounded-lg border border-[#23382A]/15 bg-[#23382A] text-white space-y-1">
                    <div className="text-[10px] text-white/70 font-mono">#23382A</div>
                    <div className="font-bold text-[11px]">Forest Deep</div>
                    <div className="text-[9px] text-white/60">신뢰와 안정감</div>
                  </div>
                  <div className="p-2.5 rounded-lg border border-[#23382A]/15 bg-[#4E9C54] text-white space-y-1">
                    <div className="text-[10px] text-white/70 font-mono">#4E9C54</div>
                    <div className="font-bold text-[11px]">Botanical Green</div>
                    <div className="text-[9px] text-white/80">생명력 있는 잎</div>
                  </div>
                  <div className="p-2.5 rounded-lg border border-[#23382A]/15 bg-[#F4F1E8] text-[#23382A] space-y-1">
                    <div className="text-[10px] text-[#23382A]/70 font-mono">#F4F1E8</div>
                    <div className="font-bold text-[11px]">Warm Ivory</div>
                    <div className="text-[9px] text-[#23382A]/60">토양과 편안함</div>
                  </div>
                  <div className="p-2.5 rounded-lg border border-[#23382A]/15 bg-[#C9B98B] text-[#23382A] space-y-1">
                    <div className="text-[10px] text-[#23382A]/70 font-mono">#C9B98B</div>
                    <div className="font-bold text-[11px]">Muted Gold</div>
                    <div className="text-[9px] text-[#23382A]/70">자산의 가치</div>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>


      {/* Section 21: 7 Core Principles */}
      <section className="bg-[#23382A] text-[#F4F1E8] py-20 lg:py-28 border-b border-[#23382A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-semibold text-[#C9B98B] uppercase tracking-wider block">
              OUR 7 PRINCIPLES
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              세이프가든의 7대 핵심 원칙
            </h2>
            <p className="text-sm sm:text-base text-[#F4F1E8]/75">
              모든 현장 매니저와 관리사는 다음 7가지 원칙에 따라 판단하고 행동합니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PHILOSOPHY_PRINCIPLES.map((pr, idx) => {
              const IconComp = icons[idx % icons.length];
              return (
                <div
                  key={pr.num}
                  className="p-7 rounded-2xl bg-[#1C2C21] border border-white/10 flex flex-col justify-between space-y-4 hover:border-[#C9B98B]/40 transition-colors shadow-sm"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-[#C9B98B]">
                        PRINCIPLE {pr.num}
                      </span>
                      <IconComp className="w-5 h-5 text-[#6F8068]" />
                    </div>

                    <h3 className="text-xl font-bold text-white leading-snug">
                      {pr.title}
                    </h3>
                  </div>

                  <p className="text-xs text-[#F4F1E8]/75 leading-relaxed pt-3 border-t border-white/10">
                    {pr.desc}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Core Formula */}
          <div className="p-8 rounded-2xl bg-white/5 border border-white/10 text-center space-y-3 max-w-3xl mx-auto">
            <span className="text-xs font-semibold text-[#C9B98B] uppercase tracking-wider">
              THE WORKFLOW
            </span>
            <div className="text-lg sm:text-2xl font-bold text-white font-mono tracking-wide">
              관찰 → 기록 → 판단 → 조치 → 확인 → 기록
            </div>
            <p className="text-xs text-[#F4F1E8]/70 pt-2">
              일회성 공사로 끝내지 않고 다음 관리를 위한 기록을 지속적으로 남깁니다.
            </p>
          </div>

        </div>
      </section>


      {/* Final Callout */}
      <section className="bg-[#F4F1E8] py-16 text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <h3 className="text-2xl sm:text-3xl font-bold text-[#23382A]">
            믿을 수 있는 현장 파트너가 되어 드립니다.
          </h3>
          <p className="text-sm text-[#23382A]/75">
            토지와 빈집의 고민, 현장 평가 상담으로 첫걸음을 시작해 보세요.
          </p>
          <div>
            <button
              onClick={() => onSelectTab('consultation')}
              className="inline-flex items-center space-x-2 px-8 py-3.5 bg-[#23382A] hover:bg-[#2E4634] text-[#F4F1E8] font-semibold text-sm rounded-lg shadow-sm"
            >
              <span>현장평가 상담 신청하기</span>
              <ArrowRight className="w-4 h-4 text-[#C9B98B]" />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
