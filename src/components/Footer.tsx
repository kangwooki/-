import React from 'react';
import { Phone, Mail, MapPin, Clock, ArrowUpRight, Lock } from 'lucide-react';
import { PageTab } from '../types';
import { BRAND } from '../data/constants';
import { SafeGardenLogo } from './SafeGardenLogo';

interface FooterProps {
  onSelectTab: (tab: PageTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab }) => {
  const handleNav = (tab: PageTab) => {
    onSelectTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#1C2C21] text-[#F4F1E8] border-t border-[#23382A]">
      {/* Brand Message Banner */}
      <div className="border-b border-white/10 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[#C9B98B] text-xs font-semibold tracking-wider uppercase">
              Brand Perspective
            </span>
            <p className="text-lg sm:text-xl font-medium text-[#F4F1E8]">
              "토지를 보고, 식물을 이해하고, 자산을 관리합니다."
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-[#F4F1E8]/70">
            <span className="bg-white/5 px-3 py-1.5 rounded border border-white/10">식물보다 식물자산</span>
            <span className="bg-white/5 px-3 py-1.5 rounded border border-white/10">작업보다 예찰 우선</span>
            <span className="bg-white/5 px-3 py-1.5 rounded border border-white/10">필요한 서비스만 필요한 만큼</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12">
          
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-4">
            <SafeGardenLogo
              variant="horizontal"
              size="md"
              theme="dark"
              showSubtitle={false}
              className="py-1"
            />

            <p className="text-[#F4F1E8]/80 text-sm font-medium leading-relaxed pt-1">
              "{BRAND.slogan}"
            </p>

            <p className="text-xs text-[#F4F1E8]/60 leading-relaxed max-w-md">
              세이프가든은 단순 조경 관리회사가 아닌, 현장을 직접 방문하고 관찰하여 
              토지와 식물을 지속 가능한 자산으로 관리하는 현장 중심 식물자산 관리 기업입니다.
            </p>

            <div className="pt-2 text-xs text-[#C9B98B] font-mono">
              관찰 → 기록 → 판단 → 조치 → 확인 → 기록
            </div>
          </div>

          {/* Quick Menu Col */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs font-semibold text-[#C9B98B] tracking-wider uppercase">
              서비스 바로가기
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => handleNav('home')}
                  className="text-[#F4F1E8]/80 hover:text-white transition-colors flex items-center group"
                >
                  <span>HOME</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity ml-1 text-[#C9B98B]" />
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('land-asset')}
                  className="text-[#F4F1E8]/80 hover:text-white transition-colors flex items-center group"
                >
                  <span>토지와 식물자산</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity ml-1 text-[#C9B98B]" />
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('vacant-house')}
                  className="text-[#F4F1E8]/80 hover:text-white transition-colors flex items-center group"
                >
                  <span>빈집 서비스</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity ml-1 text-[#C9B98B]" />
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('consultation')}
                  className="text-[#F4F1E8]/80 hover:text-white transition-colors flex items-center group"
                >
                  <span>상담 (현장평가 신청)</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity ml-1 text-[#C9B98B]" />
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('about')}
                  className="text-[#F4F1E8]/80 hover:text-white transition-colors flex items-center group"
                >
                  <span>회사소개 (철학 및 원칙)</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity ml-1 text-[#C9B98B]" />
                </button>
              </li>
            </ul>
          </div>

          {/* Business Info (Placeholder) */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-xs font-semibold text-[#C9B98B] tracking-wider uppercase">
              회사 기본정보
            </h4>
            <div className="space-y-2 text-xs text-[#F4F1E8]/70 leading-relaxed">
              <div className="flex items-start space-x-2">
                <span className="text-[#F4F1E8]/40 w-16 shrink-0">상호명</span>
                <span className="text-[#F4F1E8]/90">세이프가든 (Safe Garden)</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-[#F4F1E8]/40 w-16 shrink-0">대표자</span>
                <span>대표 홍길동 (사업자 정보 등록 예정)</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-[#F4F1E8]/40 w-16 shrink-0">사업자번호</span>
                <span className="font-mono">000-00-00000 (설립 준비 및 등록 중)</span>
              </div>
              <div className="flex items-start space-x-2">
                <MapPin className="w-3.5 h-3.5 text-[#6F8068] shrink-0 mt-0.5" />
                <span>대한민국 (전국 현장조사 및 지역별 거점 순차 오픈)</span>
              </div>
              <div className="flex items-start space-x-2">
                <Phone className="w-3.5 h-3.5 text-[#6F8068] shrink-0 mt-0.5" />
                <span className="font-mono">1544-0000 / 010-0000-0000</span>
              </div>
              <div className="flex items-start space-x-2">
                <Mail className="w-3.5 h-3.5 text-[#6F8068] shrink-0 mt-0.5" />
                <span className="font-mono">contact@safegarden.kr</span>
              </div>
              <div className="flex items-start space-x-2">
                <Clock className="w-3.5 h-3.5 text-[#6F8068] shrink-0 mt-0.5" />
                <span>평일 09:00 - 18:00 (현장 사전 점검 일정 사전 조율)</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#F4F1E8]/50">
          <div className="flex items-center space-x-3">
            <p>© 2026 세이프가든 (Safe Garden). All rights reserved.</p>
            {/* Subtle, Inconspicuous Admin Button for Owner only */}
            <button
              id="footer-admin-discreet-btn"
              onClick={() => handleNav('admin')}
              title="관리자 인증"
              className="opacity-15 hover:opacity-80 transition-opacity flex items-center space-x-1 text-[10px] text-[#F4F1E8] focus:outline-none"
              aria-label="관리자 접속"
            >
              <Lock className="w-2.5 h-2.5" />
              <span>Admin</span>
            </button>
          </div>
          <div className="flex items-center space-x-4">
            <span>토지 및 식물자산 관리 서비스</span>
            <span>•</span>
            <span>빈집 안전 및 주변 토지 관리</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
