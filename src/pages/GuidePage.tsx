import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Search, ChevronRight, FileText, LayoutDashboard, Settings, HelpCircle, MessageSquare, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

const SIDEBAR_MENU = [
  {
    title: '공통 가이드',
    icon: <LayoutDashboard className="w-4 h-4" />,
    items: ['처음 시작하기', '게시판형 채팅과 실시간 채팅 차이', '무료/유료 사용 방식']
  },
  {
    title: '게시판형 채팅 솔루션',
    icon: <MessageSquare className="w-4 h-4" />,
    items: ['게시판형 채팅 시작하기', '플로팅 문의 버튼 설치하기', '문의 목록 확인하기', '답변 등록하기', '문의 답변 확인하기', '재문의와 원문의 연결 확인하기']
  },
  {
    title: '실시간 채팅 솔루션',
    icon: <MessageSquare className="w-4 h-4" />,
    items: ['실시간 상담 체험', '실시간 상담 화면 이해하기', '상담원 응대하기', '상담 이력 확인하기']
  },
  {
    title: '관리자 설정',
    icon: <Settings className="w-4 h-4" />,
    items: ['상담원 관리', '문의 유형 관리', '권한 설정', '알림 설정']
  },
  {
    title: '문제 해결',
    icon: <HelpCircle className="w-4 h-4" />,
    items: ['문의가 보이지 않을 때', '문의 답변 확인하기', '플로팅 버튼이 보이지 않을 때']
  },
  {
    title: 'FAQ',
    icon: <HelpCircle className="w-4 h-4" />,
    items: ['게시판형 채팅은 무료인가요?', '실시간 채팅은 어떻게 체험하나요?', '답변 확인은 어떻게 하나요?']
  }
];

export const GuidePage = () => {
  const [activeItem, setActiveItem] = useState('처음 시작하기');

  return (
    <div className="bg-white min-h-screen pt-[72px]">
      <div className="w-full max-w-[1400px] mx-auto px-6 lg:px-8 flex items-start">
        
        {/* Left Sidebar */}
        <aside className="w-[260px] lg:w-[280px] shrink-0 sticky top-[72px] h-[calc(100vh-72px)] overflow-y-auto hidden md:block pr-8 py-10 border-r border-gray-100 scrollbar-hide">
          <div className="mb-6 relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="가이드 검색"
              className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          <nav className="space-y-6">
            {SIDEBAR_MENU.map((section, idx) => (
              <div key={idx}>
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 px-3 flex items-center gap-2">
                  {section.icon}
                  {section.title}
                </h3>
                <ul className="space-y-0.5">
                  {section.items.map((item, i) => (
                    <li key={i}>
                      <button
                        onClick={() => setActiveItem(item)}
                        className={`w-full text-left px-3 py-2 rounded-md text-[0.9rem] transition-colors ${
                          activeItem === item 
                            ? 'bg-blue-50 text-blue-700 font-semibold' 
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                        }`}
                      >
                        {item}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0 px-6 lg:px-12 xl:px-16 py-10 max-w-[860px]">
          {activeItem === '처음 시작하기' && <GettingStartedDoc />}
          {activeItem !== '처음 시작하기' && (
            <div className="text-center py-20 text-gray-500">
              <FileText className="w-12 h-12 mx-auto text-gray-300 mb-4" />
              <h3 className="text-lg font-semibold text-gray-700 mb-2">{activeItem}</h3>
              <p>해당 가이드 문서는 아직 준비 중입니다.</p>
            </div>
          )}
        </main>

        {/* Right TOC */}
        <aside className="w-[200px] xl:w-[240px] shrink-0 sticky top-[72px] h-[calc(100vh-72px)] overflow-y-auto hidden lg:block pl-8 py-10 border-l border-gray-100">
          <div>
            <h4 className="text-sm font-bold text-gray-900 mb-4">문서 목차</h4>
            <ul className="space-y-3 text-[0.85rem] text-gray-500">
              <li><a href="#section-1" className="hover:text-blue-600 transition-colors">1. 서비스 구성 이해하기</a></li>
              <li><a href="#section-2" className="hover:text-blue-600 transition-colors">2. 처음 사용할 때의 순서</a></li>
              <li><a href="#section-3" className="hover:text-blue-600 transition-colors">3. 게시판형 채팅 솔루션 먼저 사용하기</a></li>
              <li><a href="#section-4" className="hover:text-blue-600 transition-colors">4. 실시간 상담 체험</a></li>
              <li><a href="#section-5" className="hover:text-blue-600 transition-colors">5. 관련 문서</a></li>
            </ul>
          </div>
        </aside>

      </div>
    </div>
  );
};

const GettingStartedDoc = () => {
  return (
    <div className="max-w-3xl">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-6 font-medium">
        <Link to="/" className="hover:text-gray-900 transition-colors">홈</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-gray-900">가이드 센터</span>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-blue-600 font-semibold">처음 시작하기</span>
      </div>

      <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 mb-6 pt-2">
        처음 시작하기
      </h1>
      
      <p className="text-lg text-gray-600 leading-relaxed mb-12">
        이 가이드는 게시판형 채팅 솔루션과 실시간 채팅 솔루션을 처음 사용하는 사용자를 위한 시작 안내입니다.<br/>
        게시판형 채팅 솔루션은 무료로 시작할 수 있으며, 실시간 채팅 솔루션은 실시간 상담 체험을 통해 미리 확인해볼 수 있습니다.
      </p>

      {/* Section 1 */}
      <section id="section-1" className="mb-14 scroll-mt-24">
        <h2 className="text-2xl font-bold text-gray-900 mb-5 pb-2 border-b border-gray-100">1. 서비스 구성 이해하기</h2>
        <p className="text-gray-600 leading-relaxed mb-6">
          우리 솔루션은 기업의 상담 방식에 따라 두 가지 형태로 사용할 수 있습니다.<br/>
          게시판형 채팅 솔루션은 고객이 채팅처럼 문의를 남기고, 상담자가 1:1 문의처럼 확인하고 답변하는 방식입니다.<br/>
          실시간 채팅 솔루션은 고객과 상담원이 동시에 접속해 실시간으로 대화하는 유료 상담 방식입니다.
        </p>

        <div className="bg-gray-50 border border-gray-200 rounded-xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-200">
            <div className="p-6">
              <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-blue-500" />
                게시판형 채팅 솔루션
              </h3>
              <ul className="space-y-2 text-[0.9rem] text-gray-600">
                <li className="flex items-start gap-2"><Check className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" /> 무료 시작 가능</li>
                <li className="flex items-start gap-2"><Check className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" /> 문의 접수형</li>
                <li className="flex items-start gap-2"><Check className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" /> 답변 등록 및 확인 가능</li>
                <li className="flex items-start gap-2"><Check className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" /> 플로팅 문의 버튼으로 체험 가능</li>
              </ul>
            </div>
            <div className="p-6 bg-white">
              <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-red-400 animate-pulse"></div>
                실시간 채팅 솔루션
              </h3>
              <ul className="space-y-2 text-[0.9rem] text-gray-600">
                <li className="flex items-start gap-2"><Check className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" /> 유료 플랜</li>
                <li className="flex items-start gap-2"><Check className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" /> 즉시 응대형</li>
                <li className="flex items-start gap-2"><Check className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" /> 실시간 상담 체험 지원</li>
                <li className="flex items-start gap-2"><Check className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" /> 상담원 실시간 응대</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2 */}
      <section id="section-2" className="mb-14 scroll-mt-24">
        <h2 className="text-2xl font-bold text-gray-900 mb-5 pb-2 border-b border-gray-100">2. 처음 사용할 때의 순서</h2>
        
        <div className="space-y-4 pt-2">
          {[
            '게시판형 채팅 솔루션 무료 시작하기',
            '플로팅 문의 버튼 설정하기',
            '문의 유형 등록하기',
            '고객 문의 접수 확인하기',
            '답변 작성 및 등록하기',
            '고객이 문의창에서 답변 확인하기',
            '필요한 경우 실시간 상담 체험'
          ].map((step, idx) => (
            <div key={idx} className="flex items-start gap-4 p-4 rounded-xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition-shadow">
              <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 font-bold flex items-center justify-center shrink-0 border border-blue-100">
                {idx + 1}
              </div>
              <div className="pt-1.5 font-medium text-gray-800 text-[0.95rem]">
                {step}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 3 */}
      <section id="section-3" className="mb-14 scroll-mt-24">
        <h2 className="text-2xl font-bold text-gray-900 mb-5 pb-2 border-b border-gray-100">3. 게시판형 채팅 솔루션 먼저 사용하기</h2>
        <p className="text-gray-600 leading-relaxed mb-6">
          게시판형 채팅 솔루션은 무료로 사용할 수 있는 기본 솔루션입니다.<br/>
          고객은 채팅처럼 문의를 남기고, 상담자는 접수된 문의를 확인해 답변을 등록합니다.<br/>
          답변이 등록되면 고객은 같은 문의창에서 쉽게 답변을 확인할 수 있습니다.
        </p>

        <div className="w-full h-[300px] bg-gray-100 rounded-xl border border-gray-200 mb-6 flex items-center justify-center text-gray-400">
          <div className="text-center">
            <LayoutDashboard className="w-10 h-10 mx-auto text-gray-300 mb-3" />
            <p className="font-medium">문의 접수 및 답변 관리 화면 예시</p>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-100 rounded-xl p-6">
          <h4 className="font-bold text-blue-900 mb-3 flex items-center gap-2">
            <span className="text-xl">💡</span> 알아두면 좋아요
          </h4>
          <ul className="space-y-2 text-[0.9rem] text-blue-800">
            <li className="flex items-start gap-2"><span className="shrink-0 font-bold mt-0.5">•</span> 게시판형 채팅은 실시간 상담이 아닙니다.</li>
            <li className="flex items-start gap-2"><span className="shrink-0 font-bold mt-0.5">•</span> 고객 문의는 접수 후 상담자가 확인하여 답변합니다.</li>
            <li className="flex items-start gap-2"><span className="shrink-0 font-bold mt-0.5">•</span> 답변 내용은 고객 문의창에서 바로 확인할 수 있습니다.</li>
            <li className="flex items-start gap-2"><span className="shrink-0 font-bold mt-0.5">•</span> 재문의는 새 문의로 등록되지만, 이전 문의와 연결해서 확인할 수 있습니다.</li>
          </ul>
        </div>
      </section>

      {/* Section 4 */}
      <section id="section-4" className="mb-14 scroll-mt-24">
        <h2 className="text-2xl font-bold text-gray-900 mb-5 pb-2 border-b border-gray-100">4. 실시간 상담 체험</h2>
        <p className="text-gray-600 leading-relaxed mb-6">
          실시간 채팅 솔루션은 상담원이 고객과 즉시 대화하는 유료 플랜입니다.<br/>
          실제 사용 전 샘플 체험 화면을 통해 상담 흐름과 관리자 화면을 확인할 수 있습니다.
        </p>

        <button onClick={() => window.open('/experience', '_blank')} className="px-6 py-3 bg-[#274236] text-white rounded-lg font-semibold hover:bg-[#1C3027] transition-colors shadow-sm">
          실시간 상담 체험
        </button>
      </section>

      {/* Section 5 */}
      <section id="section-5" className="mb-10 scroll-mt-24">
        <h2 className="text-2xl font-bold text-gray-900 mb-5 pb-2 border-b border-gray-100">5. 관련 문서</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            '게시판형 채팅 시작하기',
            '플로팅 문의 버튼 설치하기',
            '문의 목록 확인하기',
            '답변 등록하기',
            '실시간 상담 체험'
          ].map((doc, idx) => (
            <div key={idx} className="group cursor-pointer p-5 bg-white border border-gray-200 hover:border-blue-300 rounded-xl shadow-sm hover:shadow-md transition-all flex justify-between items-center">
              <span className="font-medium text-gray-800 text-sm group-hover:text-blue-700 transition-colors flex items-center gap-2">
                {doc}
                <span className="px-1.5 py-0.5 rounded text-[0.65rem] font-medium bg-gray-100 text-gray-400 leading-none h-fit">준비 중</span>
              </span>
              <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-blue-500 transition-colors" />
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
