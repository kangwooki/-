import React from 'react';
import { Mail, Clock, ArrowUpRight, Lock } from 'lucide-react';
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
    <footer className="bg-[#142E24] text-[#FAF8F5] border-t border-[#1E4334]">
      {/* Brand Message Banner */}
      <div className="border-b border-white/10 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[#5E856F] text-xs font-semibold tracking-wider uppercase">
              Brand Perspective
            </span>
            <p className="text-lg sm:text-xl font-medium text-[#FAF8F5]">
              "토지를 보고, 식물을 이해하고, 자산을 관리합니다."
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-[#FAF8F5]/70">
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

            <p className="text-[#FAF8F5]/80 text-sm font-medium leading-relaxed pt-1">
              "{BRAND.slogan}"
            </p>

            <p className="text-xs text-[#FAF8F5]/60 leading-relaxed max-w-md">
              세이프가든은 단순 조경 관리회사가 아닌, 현장을 직접 방문하고 관찰하여 
              토지와 식물을 지속 가능한 자산으로 관리하는 현장 중심 식물자산 관리 기업입니다.
            </p>

            <div className="pt-2 text-xs text-[#5E856F] font-mono">
              관찰 → 기록 → 판단 → 조치 → 확인 → 기록
            </div>
          </div>

          {/* Quick Menu Col */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs font-semibold text-[#5E856F] tracking-wider uppercase">
              서비스 바로가기
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => handleNav('home')}
                  className="text-[#FAF8F5]/80 hover:text-white transition-colors flex items-center group"
                >
                  <span>HOME</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity ml-1 text-[#5E856F]" />
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('land-asset')}
                  className="text-[#FAF8F5]/80 hover:text-white transition-colors flex items-center group"
                >
                  <span>토지와 식물자산</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity ml-1 text-[#5E856F]" />
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('vacant-house')}
                  className="text-[#FAF8F5]/80 hover:text-white transition-colors flex items-center group"
                >
                  <span>빈집 서비스</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity ml-1 text-[#5E856F]" />
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('consultation')}
                  className="text-[#FAF8F5]/80 hover:text-white transition-colors flex items-center group"
                >
                  <span>상담 (현장평가 신청)</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity ml-1 text-[#5E856F]" />
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('about')}
                  className="text-[#FAF8F5]/80 hover:text-white transition-colors flex items-center group"
                >
                  <span>회사소개 (철학 및 원칙)</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity ml-1 text-[#5E856F]" />
                </button>
              </li>
              <li>
                <button
                  id="footer-admin-menu-btn"
                  onClick={() => handleNav('admin')}
                  className="text-[#5E856F] hover:text-[#E5EDE8] transition-colors flex items-center group font-medium"
                >
                  <Lock className="w-3.5 h-3.5 mr-1 text-[#5E856F]" />
                  <span>관리자 페이지</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity ml-1 text-[#5E856F]" />
                </button>
              </li>
            </ul>
          </div>

          {/* Business Info (Placeholder) */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-xs font-semibold text-[#5E856F] tracking-wider uppercase">
              회사 기본정보
            </h4>
            <div className="space-y-2.5 text-xs text-[#FAF8F5]/70 leading-relaxed">
              <div className="flex items-start space-x-2">
                <span className="text-[#FAF8F5]/40 w-16 shrink-0">상호명</span>
                <span className="text-[#FAF8F5]/90 font-medium">세이프가든 (Safe Garden)</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-[#FAF8F5]/40 w-16 shrink-0">대표자</span>
                <span className="text-[#FAF8F5]/90 font-medium">대표 김영락</span>
              </div>
              <div className="flex items-start space-x-2">
                <Mail className="w-3.5 h-3.5 text-[#5E856F] shrink-0 mt-0.5" />
                <a
                  href="mailto:cuthip@gmail.com"
                  className="font-mono text-[#FAF8F5]/90 hover:text-white hover:underline transition-colors"
                >
                  cuthip@gmail.com
                </a>
              </div>
              <div className="flex items-start space-x-2">
                <Clock className="w-3.5 h-3.5 text-[#5E856F] shrink-0 mt-0.5" />
                <span>평일 09:00 - 18:00 (현장 사전 점검 일정 사전 조율)</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#FAF8F5]/60">
          <p>© 2026 세이프가든 (Safe Garden). All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-4">
            <span>토지 및 식물자산 관리 서비스</span>
            <span>•</span>
            <span>빈집 안전 및 주변 토지 관리</span>
            <span>•</span>
            <button
              id="footer-bottom-admin-btn"
              onClick={() => handleNav('admin')}
              className="text-[#5E856F] hover:underline flex items-center space-x-1 font-semibold transition-colors"
            >
              <Lock className="w-3 h-3 text-[#5E856F]" />
              <span>관리자 페이지</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
