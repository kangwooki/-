import React from 'react';
import {
  ArrowRight,
  CheckCircle2,
  Home,
  Check,
  Building,
  ShieldCheck,
  Camera,
  FileText,
  AlertTriangle,
  Sparkles,
  TreePine,
  Layers,
} from 'lucide-react';
import { PageTab } from '../types';
import { IMAGES, VACANT_HOUSE_SERVICES } from '../data/constants';

interface VacantHouseViewProps {
  onSelectTab: (tab: PageTab) => void;
}

export const VacantHouseView: React.FC<VacantHouseViewProps> = ({ onSelectTab }) => {
  return (
    <div className="space-y-0 text-[#1E4334]">
      
      {/* Page Header */}
      <section className="bg-[#FAF8F5] py-16 lg:py-24 border-b border-[#1E4334]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#1E4334]/10 text-xs font-bold text-[#1E4334]">
                <span>VACANT PROPERTY & SURROUNDINGS</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#1E4334] leading-tight">
                멀리 있는 빈집과 주변 토지,<br />
                누가 관리하고 있을까요?
              </h1>

              <p className="text-xl font-medium text-[#5E856F]">
                "비어 있는 집도 관리가 필요합니다."
              </p>

              <p className="text-base sm:text-lg text-[#1E4334]/80 leading-relaxed font-normal">
                비어 있는 집은 사람이 살지 않는다고 해서 관리가 필요 없는 것은 아닙니다. 
                비와 바람에 의한 누수, 우거진 잡목과 덩굴, 악취와 해충 유입은 
                시간이 지날수록 건축물의 가치를 훼손하고 이웃 주민의 민원으로 이어집니다.
                세이프가든이 정기적으로 현장을 방문하여 상태를 확인하고 필요한 만큼 관리합니다.
              </p>

              <div className="pt-2">
                <button
                  id="vacant-header-cta-btn"
                  onClick={() => onSelectTab('consultation')}
                  className="inline-flex items-center space-x-2 px-6 py-3.5 bg-[#1E4334] hover:bg-[#255240] text-[#FAF8F5] text-sm font-semibold rounded-lg shadow-sm transition-all"
                >
                  <span>빈집 현장평가 상담 신청</span>
                  <ArrowRight className="w-4 h-4 text-[#5E856F]" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden shadow-xl border border-[#1E4334]/15">
                <img
                  src={IMAGES.vacantYard}
                  alt="오래된 시골 빈집과 마당의 실제 모습"
                  className="w-full h-[360px] sm:h-[420px] object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1E4334]/80 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <p className="text-xs text-[#5E856F] font-mono uppercase mb-1">
                    SAFE GARDEN RESIDENTIAL CARE
                  </p>
                  <p className="text-sm font-semibold">
                    건물 안팎과 마당, 주변 토지까지 한눈에 살피는 통합 예찰
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* Section 17: 3대 핵심 관리 영역 */}
      <section className="bg-white py-20 lg:py-28 border-b border-[#1E4334]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-semibold tracking-wider text-[#5E856F] uppercase">
              3 CORE AREAS
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1E4334] tracking-tight">
              빈집 서비스 3대 영역
            </h2>
            <p className="text-base text-[#1E4334]/75">
              기본 청소부터 전문 점검, 마당과 주변 식생 관리까지 필요한 만큼만 조합하여 의뢰할 수 있습니다.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* 01 기본관리 */}
            <div className="bg-[#FAF8F5] rounded-2xl p-7 border border-[#1E4334]/10 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold bg-[#1E4334] text-white px-2.5 py-1 rounded">
                    01
                  </span>
                  <span className="text-xs text-[#5E856F] font-bold">기본 환경 보존</span>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-[#1E4334]">기본관리</h3>
                  <p className="text-xs text-[#1E4334]/70 mt-1">
                    비어 있는 공간의 청결과 위생을 지키는 필수 정돈
                  </p>
                </div>

                <div className="space-y-2 pt-2">
                  <span className="text-xs font-bold text-[#1E4334] block">관리 항목:</span>
                  <div className="grid grid-cols-3 gap-2">
                    {['청소', '주변정리', '방역'].map((item) => (
                      <div
                        key={item}
                        className="bg-white p-3 rounded-lg text-center font-bold text-sm text-[#1E4334] border border-[#1E4334]/10 shadow-2xs"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>

                <p className="text-xs text-[#1E4334]/80 leading-relaxed pt-2">
                  방치되어 쌓인 낙엽, 먼지, 폐기물 침출수를 정리하고, 
                  모기·바퀴·쥐 등 해충 서식을 막기 위한 실내외 약제 방역을 진행합니다.
                </p>
              </div>

              <div className="pt-4 border-t border-[#1E4334]/10 text-xs text-[#5E856F] font-medium flex items-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#5E856F] shrink-0" />
                <span>정기 방문 주기별 선택 가능 (월 1회 / 분기 1회)</span>
              </div>
            </div>


            {/* 02 상태점검 (가장 핵심) */}
            <div className="bg-[#1E4334] text-[#FAF8F5] rounded-2xl p-7 border border-[#1E4334] flex flex-col justify-between space-y-6 shadow-md relative">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold bg-[#5E856F] text-[#1E4334] px-2.5 py-1 rounded">
                    02
                  </span>
                  <span className="text-xs text-[#5E856F] font-bold">7대 정밀 예찰</span>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-white">상태점검</h3>
                  <p className="text-xs text-[#FAF8F5]/70 mt-1">
                    방치로 인한 건축 손상과 누수를 조기에 차단하는 정밀 진단
                  </p>
                </div>

                <div className="space-y-2 pt-2">
                  <span className="text-xs font-bold text-[#5E856F] block">
                    점검 7대 항목:
                  </span>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {[
                      '문·창문 (잠금·파손)',
                      '누수 흔적 (천장·벽)',
                      '곰팡이 (실내 습도)',
                      '외부시설 (담장·지붕)',
                      '배수 (배수로·우수관)',
                      '해충 (벌집·동물침입)',
                      '주변환경 (민원 요소)',
                    ].map((item, idx) => (
                      <div
                        key={idx}
                        className="bg-white/10 px-2.5 py-2 rounded text-[#FAF8F5] flex items-center space-x-1.5 border border-white/5"
                      >
                        <Check className="w-3.5 h-3.5 text-[#5E856F] shrink-0" />
                        <span className="truncate">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 방문 후 리포트 프로세스 */}
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 mt-3 text-center space-y-1">
                  <span className="text-[11px] text-[#5E856F] font-bold block">
                    방문 직후 프로세스
                  </span>
                  <div className="text-sm font-bold text-white">
                    확인 → 사진기록 → 전달
                  </div>
                  <span className="text-[11px] text-[#FAF8F5]/60 block">
                    현장에 직접 가지 않아도 모바일로 생생한 현장 리포트 수신
                  </span>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 text-xs text-[#5E856F] font-medium flex items-center space-x-1.5">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span>이상 발견 시 즉각적인 사진 알림 및 조치 방향 제안</span>
              </div>
            </div>


            {/* 03 주변 토지·식물관리 */}
            <div className="bg-[#FAF8F5] rounded-2xl p-7 border border-[#1E4334]/10 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold bg-[#1E4334] text-white px-2.5 py-1 rounded">
                    03
                  </span>
                  <span className="text-xs text-[#5E856F] font-bold">외부 부지 관리</span>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-[#1E4334]">주변 토지·식물관리</h3>
                  <p className="text-xs text-[#1E4334]/70 mt-1">
                    마당과 주변 식생을 살펴 안전과 이웃 피해를 예방
                  </p>
                </div>

                <div className="space-y-2 pt-2">
                  <span className="text-xs font-bold text-[#1E4334] block">관리 대상 영역:</span>
                  <div className="grid grid-cols-3 gap-2 text-xs font-semibold text-[#1E4334]">
                    {['마당', '정원', '나무', '잔디', '텃밭', '주변 토지'].map((zone) => (
                      <div
                        key={zone}
                        className="bg-white p-2.5 rounded-lg text-center border border-[#1E4334]/10 shadow-2xs"
                      >
                        {zone}
                      </div>
                    ))}
                  </div>
                </div>

                <p className="text-xs text-[#1E4334]/80 leading-relaxed pt-2">
                  시골 빈집은 마당의 잡풀과 나무가 순식간에 자라 전선을 건드리거나 도로를 침범하기 쉽습니다. 
                  필요한 경우에 한해 안전 전정과 잡목 정리를 수행합니다.
                </p>
              </div>

              <div className="pt-4 border-t border-[#1E4334]/10 text-xs text-[#5E856F] font-medium flex items-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#5E856F] shrink-0" />
                <span>과도한 작업 없이 "필요한 경우에만" 관리 진행</span>
              </div>
            </div>

          </div>

        </div>
      </section>


      {/* ━━━━━━━━━━━━━━━━━━━━━━
          SECTION 18: 빈집 리모델링 확장 영역
          ━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="bg-[#FAF8F5] py-20 lg:py-28 border-b border-[#1E4334]/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="bg-white rounded-2xl p-8 sm:p-12 border border-[#1E4334]/15 shadow-sm space-y-10">
            
            <div className="max-w-3xl space-y-3">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded bg-[#1E4334]/10 text-xs font-bold text-[#1E4334]">
                <Building className="w-3.5 h-3.5 text-[#5E856F]" />
                <span>필요시 제공되는 확장 서비스</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1E4334] tracking-tight">
                필요하다면,<br className="sm:hidden" /> 빈집의 새로운 활용을 준비합니다.
              </h2>

              <p className="text-sm sm:text-base text-[#1E4334]/80 leading-relaxed">
                빈집을 임대주택, 민박, 세컨드하우스 등으로 활용하고 싶은 경우 
                활용 목적에 맞춰 필요한 리모델링을 검토하고 관련 전문 서비스를 연결합니다.
              </p>
            </div>

            {/* 5-Step Extension Process: 현장 확인 → 활용 목적 확인 → 필요한 공사 검토 → 전문업체 연결 → 공사 후 관리 */}
            <div className="space-y-4">
              <span className="text-xs font-bold text-[#1E4334]/70 uppercase tracking-wider block">
                리모델링 확장 프로세스
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                {[
                  { step: '01', title: '현장 확인', desc: '골조, 배관, 지붕 누수 등 건축물 기초 현황 진단' },
                  { step: '02', title: '활용 목적 확인', desc: '임대주택, 농촌민박, 주말 별장 등 고객 의도 파악' },
                  { step: '03', title: '필요한 공사 검토', desc: '과잉 공사를 배제하고 필수 개보수 범위만 산정' },
                  { step: '04', title: '전문업체 연결', desc: '검증된 지역 전문 시공팀 매칭 및 견적 검토' },
                  { step: '05', title: '공사 후 관리', desc: '완공 후 주변 식물 및 정기 관리로 자산 가치 유지' },
                ].map((p, pIdx) => (
                  <div
                    key={pIdx}
                    className="p-4 rounded-xl bg-[#FAF8F5] border border-[#1E4334]/10 space-y-2 flex flex-col justify-between"
                  >
                    <div>
                      <span className="text-xs font-mono font-bold text-[#5E856F] block">
                        STEP {p.step}
                      </span>
                      <h4 className="text-sm font-bold text-[#1E4334] mt-1">
                        {p.title}
                      </h4>
                    </div>
                    <p className="text-xs text-[#1E4334]/70 leading-relaxed pt-2">
                      {p.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Subtle boundary clarification */}
            <div className="p-4 rounded-lg bg-[#FAF8F5]/70 border border-[#1E4334]/10 text-xs text-[#1E4334]/75 flex items-start space-x-2.5">
              <span className="font-bold text-[#5E856F] shrink-0">안내:</span>
              <span>
                세이프가든은 인테리어·건축 시공회사가 아닙니다. 현장 기반 자산 관리의 연장선에서, 
                소유주께서 공간을 유의미하게 활용하고자 하실 때 신뢰할 수 있는 전문 서비스를 연결해 드립니다.
              </span>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-[#1E4334]/60">
                멀리 있어 방치되었던 고향 집이나 상속 주택의 현재 상태를 먼저 알아보세요.
              </span>
              <button
                onClick={() => onSelectTab('consultation')}
                className="w-full sm:w-auto px-6 py-3 bg-[#1E4334] hover:bg-[#255240] text-[#FAF8F5] text-xs font-semibold rounded-lg shadow-xs transition-all"
              >
                빈집 진단 상담 신청하기
              </button>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
};
