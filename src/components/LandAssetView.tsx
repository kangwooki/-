import React from 'react';
import {
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Truck,
  Layers,
  Sprout,
  Compass,
  FileCheck,
  ShieldAlert,
  ChevronRight,
  ClipboardList,
  Camera,
} from 'lucide-react';
import { PageTab } from '../types';
import { CORE_SERVICES, IMAGES } from '../data/constants';

interface LandAssetViewProps {
  onSelectTab: (tab: PageTab) => void;
}

export const LandAssetView: React.FC<LandAssetViewProps> = ({ onSelectTab }) => {
  return (
    <div className="space-y-0 text-[#23382A]">
      
      {/* Page Header */}
      <section className="bg-[#F4F1E8] py-16 lg:py-24 border-b border-[#23382A]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#23382A]/10 text-xs font-bold text-[#23382A]">
              <span>LAND & PLANT ASSET CARE</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#23382A] leading-tight">
              토지를 먼저 보고,<br />
              식물자산을 관리합니다.
            </h1>

            <p className="text-base sm:text-lg text-[#23382A]/80 leading-relaxed font-normal">
              어떤 식물을 심을지 결정하기 전에 먼저 토지의 환경과 접근성을 확인합니다. 
              그리고 토지에 맞는 식물을 선택하고 식재부터 생육관리, 
              필요할 경우 출하와 이식까지 연결합니다.
            </p>

            <div className="pt-2">
              <button
                id="land-header-cta-btn"
                onClick={() => onSelectTab('consultation')}
                className="inline-flex items-center space-x-2 px-6 py-3.5 bg-[#23382A] hover:bg-[#2E4634] text-[#F4F1E8] text-sm font-semibold rounded-lg shadow-sm transition-all"
              >
                <span>토지 현장평가 신청하기</span>
                <ArrowRight className="w-4 h-4 text-[#C9B98B]" />
              </button>
            </div>
          </div>
        </div>
      </section>


      {/* Big Flow: 토지 → 식물 → 관리 → 출하 */}
      <section className="bg-white py-14 border-b border-[#23382A]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <span className="text-xs font-semibold text-[#6F8068] tracking-widest uppercase">
              THE 4-STEP ASSET CYCLE
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-[#23382A] mt-1">
              토지에서 출하까지 이어지는 전체 관리 흐름
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {[
              {
                step: 'STEP 01',
                title: '토지 (Land)',
                desc: '도로, 토양, 배수, 일조량 등 환경 진단',
              },
              {
                step: 'STEP 02',
                title: '식물 (Plant)',
                desc: '토지에 최적화된 수종 선정 및 정밀 식재',
              },
              {
                step: 'STEP 03',
                title: '관리 (Care)',
                desc: '주기적 상태 기록과 최소 개입 예찰',
              },
              {
                step: 'STEP 04',
                title: '출하 (Harvest)',
                desc: '자산 가치 보존 굴취와 안전 운송·이식',
              },
            ].map((st, i) => (
              <div
                key={i}
                className="p-5 rounded-xl bg-[#F4F1E8] border border-[#23382A]/10 text-center space-y-1.5"
              >
                <span className="text-[11px] font-mono font-bold text-[#6F8068]">{st.step}</span>
                <h3 className="text-base sm:text-lg font-bold text-[#23382A]">{st.title}</h3>
                <p className="text-xs text-[#23382A]/70">{st.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* 4 Deep Core Services (Section 16) */}
      <section className="bg-[#F4F1E8] py-20 lg:py-28 border-b border-[#23382A]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
          
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-semibold tracking-wider text-[#6F8068] uppercase">
              DETAILED SERVICES
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#23382A] tracking-tight">
              현장에서 실제로 확인하는 4대 관리 영역
            </h2>
            <p className="text-sm sm:text-base text-[#23382A]/70">
              세이프가든은 현장에 직접 가서 눈으로 보고 손으로 흙을 만져보며 필요한 서비스를 판단합니다.
            </p>
          </div>

          {/* Service 01: 접근성 조사 */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center bg-white rounded-2xl p-6 sm:p-10 border border-[#23382A]/10 shadow-xs">
            <div className="lg:col-span-6 space-y-5">
              <div className="flex items-center space-x-2">
                <span className="px-3 py-1 bg-[#23382A] text-white text-xs font-mono font-bold rounded">
                  01
                </span>
                <span className="text-xs font-bold text-[#6F8068] tracking-wider uppercase">
                  Accessibility Survey
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-[#23382A]">
                접근성 조사
              </h3>

              <blockquote className="border-l-2 border-[#C9B98B] pl-4 italic text-sm text-[#23382A]/90 font-medium">
                "진입도로, 농로, 차량 접근성, 작업공간과 향후 운반 가능성까지 확인합니다."
              </blockquote>

              <p className="text-sm text-[#23382A]/80 leading-relaxed">
                나무를 심거나 장비를 투입할 때 가장 흔히 겪는 실패는 '진입로 협소'입니다. 
                차량이 어디까지 진입 가능한지, 농로의 회전각과 노면 하중 한계, 
                향후 성목이 되었을 때 크레인이나 화물차가 들어올 수 있는지를 가장 먼저 검토합니다.
              </p>

              <div className="space-y-2 pt-2">
                <span className="text-xs font-bold text-[#23382A] block">주요 현장 조사 항목:</span>
                <ul className="space-y-1.5 text-xs text-[#23382A]/85">
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-[#6F8068] shrink-0" />
                    <span>진입 도로 및 농로의 실측 폭, 교행 가능 여부</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-[#6F8068] shrink-0" />
                    <span>1톤 트럭, 5톤 화물차, 굴삭기 진입 및 회전 공간</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-[#6F8068] shrink-0" />
                    <span>식재 자재 야적 및 중장비 임시 주차 가능 구역</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-[#6F8068] shrink-0" />
                    <span>출하·이식 시 대형 차량 반출 동선 사전 확보</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-xl overflow-hidden border border-[#23382A]/15 shadow-sm">
                <img
                  src={IMAGES.countryRoad}
                  alt="실제 농로와 차량 진입로 현장"
                  className="w-full h-[320px] object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>


          {/* Service 02: 토양·환경 분석 */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center bg-white rounded-2xl p-6 sm:p-10 border border-[#23382A]/10 shadow-xs">
            <div className="lg:col-span-6 order-2 lg:order-1">
              <div className="rounded-xl overflow-hidden border border-[#23382A]/15 shadow-sm bg-[#EFECE3]">
                <img
                  src={IMAGES.soilLand}
                  alt="토양의 수분과 흙의 질을 확인하는 실제 대지 현장"
                  className="w-full h-[320px] object-cover"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&w=1200&q=80';
                  }}
                />
              </div>
            </div>

            <div className="lg:col-span-6 space-y-5 order-1 lg:order-2">
              <div className="flex items-center space-x-2">
                <span className="px-3 py-1 bg-[#23382A] text-white text-xs font-mono font-bold rounded">
                  02
                </span>
                <span className="text-xs font-bold text-[#6F8068] tracking-wider uppercase">
                  Soil & Environmental Analysis
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-[#23382A]">
                토양·환경 분석
              </h3>

              <blockquote className="border-l-2 border-[#C9B98B] pl-4 italic text-sm text-[#23382A]/90 font-medium">
                "토양과 수분·배수, 일조, 주변 식생과 식물의 생육상태를 확인합니다."
              </blockquote>

              <p className="text-sm text-[#23382A]/80 leading-relaxed">
                식물이 마르거나 썩는 원인의 80%는 겉모습이 아닌 땅속 배수와 토질에 있습니다. 
                흙의 굳기, 물이 빠지는 속도, 비가 올 때의 배수로 상태, 
                하루 동안 볕이 드는 시간과 바람길을 살펴 식물이 건강하게 자랄 수 있는지 분석합니다.
              </p>

              <div className="space-y-2 pt-2">
                <span className="text-xs font-bold text-[#23382A] block">주요 현장 조사 항목:</span>
                <ul className="space-y-1.5 text-xs text-[#23382A]/85">
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-[#6F8068] shrink-0" />
                    <span>토양의 물리적 구조(모래질, 점토질, 자갈 혼합비)</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-[#6F8068] shrink-0" />
                    <span>자연 배수 구배 및 집중호우 시 침수 위험성</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-[#6F8068] shrink-0" />
                    <span>주변 수목 및 건물에 의한 일조 차단 시간</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-[#6F8068] shrink-0" />
                    <span>기존 자생 식생의 건강도 및 병해 징후 확인</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>


          {/* Service 03: 식물 식재·관리 */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center bg-white rounded-2xl p-6 sm:p-10 border border-[#23382A]/10 shadow-xs">
            <div className="lg:col-span-6 space-y-5">
              <div className="flex items-center space-x-2">
                <span className="px-3 py-1 bg-[#23382A] text-white text-xs font-mono font-bold rounded">
                  03
                </span>
                <span className="text-xs font-bold text-[#6F8068] tracking-wider uppercase">
                  Planting & Lifecycle Care
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-[#23382A]">
                식물 식재·관리
              </h3>

              <blockquote className="border-l-2 border-[#C9B98B] pl-4 italic text-sm text-[#23382A]/90 font-medium">
                "토지의 조건과 관리 목적에 맞는 식물을 선택하고 필요한 만큼 관리합니다."
              </blockquote>

              <p className="text-sm text-[#23382A]/80 leading-relaxed">
                유행하는 나무라고 무조건 심으면 관리가 어려워 방치되기 쉽습니다. 
                소유주가 얼마나 자주 방문할 수 있는지, 향후 처분이나 감상 등 목적이 무엇인지에 따라 
                손이 적게 가면서도 땅에 잘 맞는 수종을 추천하고 꼭 필요한 생육 조치만 실행합니다.
              </p>

              <div className="space-y-2 pt-2">
                <span className="text-xs font-bold text-[#23382A] block">주요 현장 조사 항목:</span>
                <ul className="space-y-1.5 text-xs text-[#23382A]/85">
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-[#6F8068] shrink-0" />
                    <span>목적별 맞춤 수종 선정 (관리 최소화형, 가치 보존형 등)</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-[#6F8068] shrink-0" />
                    <span>뿌리분 보호 및 적정 깊이 식재, 안전 지주목 설치</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-[#6F8068] shrink-0" />
                    <span>정기적인 예찰 방문 및 병해충·잡초 생육 점검</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-[#6F8068] shrink-0" />
                    <span>과잉 약제 살포 지양, 생육 기록 사진 리포트 제공</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-xl overflow-hidden border border-[#23382A]/15 shadow-sm">
                <img
                  src={IMAGES.treeGrove}
                  alt="자연스럽게 건강하게 자라는 토지 내 식물들"
                  className="w-full h-[320px] object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>


          {/* Service 04: 출하·이식 */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center bg-white rounded-2xl p-6 sm:p-10 border border-[#23382A]/10 shadow-xs">
            <div className="lg:col-span-6 order-2 lg:order-1">
              <div className="rounded-xl overflow-hidden border border-[#23382A]/15 shadow-sm">
                <img
                  src={IMAGES.transplantCare}
                  alt="수목 굴취 및 안전한 이식 준비 현장"
                  className="w-full h-[320px] object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            <div className="lg:col-span-6 space-y-5 order-1 lg:order-2">
              <div className="flex items-center space-x-2">
                <span className="px-3 py-1 bg-[#23382A] text-white text-xs font-mono font-bold rounded">
                  04
                </span>
                <span className="text-xs font-bold text-[#6F8068] tracking-wider uppercase">
                  Harvest & Relocation
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-[#23382A]">
                출하·이식
              </h3>

              <blockquote className="border-l-2 border-[#C9B98B] pl-4 italic text-sm text-[#23382A]/90 font-medium">
                "필요한 경우 굴취, 이식, 운송, 출하까지 연결합니다."
              </blockquote>

              <p className="text-sm text-[#23382A]/80 leading-relaxed">
                식물자산의 관리는 심는 데서 멈추지 않습니다. 토지 개발이나 매각으로 
                수목을 이전해야 하거나, 잘 자란 나무를 판매하여 자산 가치를 회수하고자 할 때 
                뿌리가 상하지 않도록 섬세하게 굴취하고 전문 장비로 안전하게 운송합니다.
              </p>

              <div className="space-y-2 pt-2">
                <span className="text-xs font-bold text-[#23382A] block">주요 현장 조사 항목:</span>
                <ul className="space-y-1.5 text-xs text-[#23382A]/85">
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-[#6F8068] shrink-0" />
                    <span>굴취 적기 판단 및 뿌리분 규격 안전 확보</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-[#6F8068] shrink-0" />
                    <span>가지 손상 방지 결속 및 굴삭기·크레인 안전 작업</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-[#6F8068] shrink-0" />
                    <span>이식 대상지 정지 작업 및 식재 후 뿌리 활착 관리</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-[#6F8068] shrink-0" />
                    <span>가치 평가를 통한 적정 수요처 매칭 지원</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

        </div>
      </section>


      {/* Comparison: 일반 조경업체 vs 세이프가든 */}
      <section className="bg-white py-20 border-b border-[#23382A]/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-semibold text-[#6F8068] uppercase tracking-wider">
              CLEAR DIFFERENCE
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#23382A]">
              일반 조경업체와의 관점 차이
            </h2>
            <p className="text-xs sm:text-sm text-[#23382A]/70">
              세이프가든은 공간을 장식하기보다, 토지와 식물의 생육과 자산성을 먼저 검토합니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* 일반 조경업체 */}
            <div className="p-6 rounded-xl bg-[#F4F1E8]/50 border border-[#23382A]/10 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#23382A]/10">
                <span className="font-bold text-base text-[#23382A]/70">일반 조경업체</span>
                <span className="text-xs bg-[#23382A]/10 px-2.5 py-1 rounded text-[#23382A]/70 font-medium">공간 미화 중심</span>
              </div>
              <ul className="space-y-2.5 text-xs text-[#23382A]/70">
                <li className="flex items-start space-x-2">
                  <span className="text-red-700 font-bold shrink-0">•</span>
                  <span>화려하게 꾸미는 것을 목적으로 잔디 깎기 및 전정 작업 중심</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-red-700 font-bold shrink-0">•</span>
                  <span>토지의 배수나 진입로 여건보다 보기 좋은 식재 패키지 선제안</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-red-700 font-bold shrink-0">•</span>
                  <span>단기 시공 후 지속적인 생육 기록이나 관찰 추적 부재</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-red-700 font-bold shrink-0">•</span>
                  <span>작업 규모를 키워 종합 공사 계약을 유도하는 경향</span>
                </li>
              </ul>
            </div>

            {/* 세이프가든 */}
            <div className="p-6 rounded-xl bg-[#23382A] text-[#F4F1E8] border border-[#23382A] space-y-4 shadow-sm">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <span className="font-bold text-base text-white">세이프가든 (Safe Garden)</span>
                <span className="text-xs bg-[#C9B98B] text-[#23382A] px-2.5 py-1 rounded font-bold">현장 자산 관리</span>
              </div>
              <ul className="space-y-2.5 text-xs text-[#F4F1E8]/90">
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C9B98B] shrink-0 mt-0.5" />
                  <span>현장을 직접 방문해 토양, 일조, 차량 접근성을 먼저 관찰</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C9B98B] shrink-0 mt-0.5" />
                  <span>식물이 왜 그렇게 자라는지 원인을 파악하고 필요한 조치만 판단</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C9B98B] shrink-0 mt-0.5" />
                  <span>현장 사진과 실측 기록을 남겨 고객에게 객관적 데이터 제공</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C9B98B] shrink-0 mt-0.5" />
                  <span>기본 진단부터 출하까지 고객이 필요한 단계만 선택 가능</span>
                </li>
              </ul>
            </div>

          </div>

        </div>
      </section>


      {/* Field Evaluation Bottom CTA */}
      <section className="bg-[#F4F1E8] py-16 text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <h3 className="text-2xl sm:text-3xl font-bold text-[#23382A]">
            "현장을 알아야 정확한 판단을 할 수 있습니다."
          </h3>
          <p className="text-sm text-[#23382A]/75">
            토지 지번이나 위치를 알려주시면 진입 도로와 생육 여건을 사전 검토한 후 현장 일정 상담을 안내해 드립니다.
          </p>
          <div>
            <button
              onClick={() => onSelectTab('consultation')}
              className="inline-flex items-center space-x-2 px-7 py-3.5 bg-[#23382A] hover:bg-[#2E4634] text-[#F4F1E8] font-semibold text-sm rounded-lg shadow-sm"
            >
              <span>토지 현장평가 상담 신청하기</span>
              <ArrowRight className="w-4 h-4 text-[#C9B98B]" />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
