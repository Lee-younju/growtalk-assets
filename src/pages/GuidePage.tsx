import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Search, ChevronRight, ChevronDown, FileText, LayoutDashboard, Settings, HelpCircle, MessageSquare, CreditCard, Check, X, Clock, Send, Smartphone, History, UserCheck, BookOpen } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const SIDEBAR_MENU = [
  { title: '처음 시작하기', icon: <LayoutDashboard className="w-4 h-4" /> },
  { title: '게시판형 채팅', icon: <MessageSquare className="w-4 h-4" /> },
  { title: '실시간 채팅 상담', icon: <MessageSquare className="w-4 h-4" /> },
  { title: '문의 관리', icon: <FileText className="w-4 h-4" /> },
  { title: '설정 관리', icon: <Settings className="w-4 h-4" /> },
  { title: '요금제 및 구독', icon: <CreditCard className="w-4 h-4" /> },
  { title: '문제 해결', icon: <HelpCircle className="w-4 h-4" /> },
  { title: 'FAQ', icon: <HelpCircle className="w-4 h-4" /> }
];

const SEARCH_INDEX = [
  { category: '공통 시작 가이드', title: '처음 시작하기', description: 'GrowTalk 솔루션의 기본 개념과 시작 방법을 안내합니다.', keywords: ['기본', '개념', 'GrowTalk', '시작 가이드'] },
  { category: '공통 시작 가이드', title: '서비스 구성 이해하기', description: '위젯, 상담원 화면, 관리자 화면 등 전체 서비스 구성을 설명합니다.', keywords: ['위젯', '상담원 화면', '관리자 화면', '서비스 구조'] },
  { category: '공통 시작 가이드', title: '게시판형 채팅과 실시간 채팅 차이', description: '두 가지 채널의 차이점과 특징, 요금제 적용 방식을 안내합니다.', keywords: ['비교', '요금제', '차이점', '특징'] },
  { category: '공통 시작 가이드', title: '무료로 시작하기', description: '무료 플랜으로 빠르게 게시판형 채팅을 시작하는 방법을 확인하세요.', keywords: ['무료 플랜', '게시판형 채팅'] },

  { category: '게시판형 채팅', title: '게시판형 채팅 시작하기', description: '게시판형 채팅 솔루션을 처음 도입하고 설정하는 방법을 안내합니다.', keywords: ['설정', '도입', '게시판형'] },
  { category: '게시판형 채팅', title: '플로팅 문의 버튼 설치하기', description: '홈페이지에 문의 버튼을 설치하는 방법과 스크립트를 확인하세요.', keywords: ['설치', '스크립트', '홈페이지', '버튼'] },
  { category: '게시판형 채팅', title: '문의 작성하기', description: '고객이 문의 유형, 이름, 연락처, 문의 내용을 입력하는 방법을 안내합니다.', keywords: ['고객', '입력', '문의 작성', '게시판형'] },
  { category: '게시판형 채팅', title: '내 문의 확인하기', description: '고객이 작성한 문의 내역과 처리 상태를 확인하는 방법을 알아봅니다.', keywords: ['고객', '내역', '처리 상태'] },
  { category: '게시판형 채팅', title: '문의 답변 확인하기', description: '고객 문의창에서 운영자의 답변을 바로 확인하는 방법을 안내합니다.', keywords: ['답변', '고객', '확인', '게시판형'] },
  { category: '게시판형 채팅', title: '회원/비회원 문의 확인 방식', description: '로그인 유무에 따른 문의 작성 및 확인 방식의 차이를 설명합니다.', keywords: ['로그인', '회원', '비회원', '게시판형'], hash: 'section-4' },

  { category: '실시간 채팅 상담', title: '실시간 상담 체험하기', description: '유료 플랜인 실시간 채팅을 무료로 체험하는 방법을 안내합니다.', keywords: ['유료 플랜', '무료 체험', '실시간'] },
  { category: '실시간 채팅 상담', title: '상담사 화면 이해하기', description: '상담사가 고객과 실시간으로 대화하고 상태를 변경하는 방법을 확인하세요.', keywords: ['상담사', '대화', '상태 변경', '실시간'] },
  { category: '실시간 채팅 상담', title: '고객 화면 이해하기', description: '고객이 실시간 채팅 위젯을 통해 상담을 요청하는 화면입니다.', keywords: ['고객', '위젯', '요청', '실시간'] },
  { category: '실시간 채팅 상담', title: '체험 데이터 저장 기준', description: '실시간 체험 시 작성된 데이터의 보관 기간 및 저장 기준을 설명합니다.', keywords: ['데이터', '보관 기간', '저장', '실시간'] },

  { category: '문의 관리', title: '문의 목록 확인하기', description: '접수된 전체 문의 목록을 확인하고 필터링하는 방법을 안내합니다.', keywords: ['접수', '전체 문의', '필터링'], hash: 'list' },
  { category: '문의 관리', title: '문의 상세 보기', description: '개별 문의의 상세 내용, 첨부파일, 연결된 이전 문의를 확인합니다.', keywords: ['상세 정보', '첨부파일', '이전 문의'], hash: 'detail' },
  { category: '문의 관리', title: '답변 등록하기', description: '상담 담당자가 고객 문의에 답변을 작성하고 등록하는 방법을 안내합니다.', keywords: ['상담 담당자', '작성', '도움', '답변'], hash: 'reply' },
  { category: '문의 관리', title: '문의 상태 관리하기', description: '문의의 처리 상태(접수, 확인 중, 완료)를 변경하는 방법입니다.', keywords: ['접수', '확인 중', '완료', '상태'], hash: 'status' },
  { category: '문의 관리', title: '문의 검색 및 필터 사용하기', description: '특정 키워드나 상태, 기간으로 문의를 빠르게 찾는 방법을 알아봅니다.', keywords: ['키워드', '기간', '필터', '검색'], hash: 'search' },

  { category: '설정 관리', title: '상담 채널 관리', description: '운영 중인 채널의 이름, 아이콘, 웰컴 메시지 등을 설정합니다.', keywords: ['채널', '이름', '아이콘', '웰컴 메시지'], hash: 'channel' },
  { category: '설정 관리', title: '문의 유형 관리', description: '고객이 선택할 수 있는 문의 유형(카테고리) 항목을 설정합니다.', keywords: ['유형', '카테고리', '선택'], hash: 'inquiry-type' },
  { category: '설정 관리', title: '문의 입력 항목 설정', description: '연락처, 이메일, 첨부파일 등 추가 입력 항목의 사용 여부를 지정합니다.', keywords: ['연락처', '이메일', '첨부파일', '입력 항목'], hash: 'input-fields' },
  { category: '설정 관리', title: '담당자 권한 설정', description: '팀원이나 상담원을 초대하고 권한 등급을 설정하는 방법입니다.', keywords: ['초대', '팀원', '상담 담당자', '관리자', '권한'], hash: 'permissions' },

  { category: '요금제 및 구독', title: '요금제 확인하기', description: '서비스 구성과 구독 신청 버튼을 확인하는 방법을 안내합니다.', keywords: ['요금제', '서비스 구성', '플랜', '구독'], hash: 'pricing' },
  { category: '요금제 및 구독', title: '구독 신청하기', description: '원하는 서비스를 선택하고 구독 신청을 진행하는 흐름을 안내합니다.', keywords: ['플랜', '결제', '신청', '구독'], hash: 'subscribe' },
  { category: '요금제 및 구독', title: '결제 샘플 화면 이해하기', description: '구독 신청 시 확인하게 되는 샘플 결제 화면에 대해 안내합니다.', keywords: ['결제', '샘플', '페이지', '구독'], hash: 'payment-sample' },
  { category: '요금제 및 구독', title: '상담 환경 준비 중 화면', description: '구독 후 상담 환경이 세팅되는 동안 표시되는 화면을 안내합니다.', keywords: ['세팅', '준비', '환경', '구독'], hash: 'setup' },
  { category: '요금제 및 구독', title: '설치 코드 확인하기', description: '완료된 환경의 설치 스크립트(플로팅 아이콘) 코드를 확인합니다.', keywords: ['설치', '코드', '스크립트', '설정'], hash: 'install-code' },

  { category: '문제 해결', title: '플로팅 문의 버튼이 보이지 않을 때', description: '웹사이트에 설치된 플로팅 문의 버튼이 표시되지 않을 때 원인을 확인합니다.', keywords: ['위젯', '설치', '버튼 안 보임', '캐시'], hash: 'widget' },
  { category: '문제 해결', title: '문의가 등록되지 않을 때', description: '고객이 문의 사항 작성 후 등록이 안 될 때 확인해야 할 사항을 안내합니다.', keywords: ['문의 등록', '필수', '오류', '첨부파일'], hash: 'inquiry' },
  { category: '문제 해결', title: '답변이 보이지 않을 때', description: '운영자가 답변을 작성했는데 고객에게 보이지 않는 경우 원인을 확인합니다.', keywords: ['오류', '답변 안 보임', '고객 화면', '기기'], hash: 'reply' },
  { category: '문제 해결', title: '문의 이력이 보이지 않을 때', description: '이전에 등록한 문의 목록이나 상세 이력을 다시 볼 수 없을 때 해결 방법입니다.', keywords: ['문의 이력', '오류', '비회원', '브라우저'], hash: 'history' },
  { category: '문제 해결', title: '실시간 상담이 시작되지 않을 때', description: '채팅 버튼을 눌러도 실시간 상담이 정상적으로 연결되지 않을 때 대처 방법입니다.', keywords: ['오류', '실시간 상담', '가능 상태', '연결'], hash: 'live-chat' },
  { category: '문제 해결', title: '설정이 반영되지 않을 때', description: '채널 정보나 권한 등 관리자에서 저장한 설정이 실제 화면에 적용 안 될 때 확인합니다.', keywords: ['설정 반영', '권한', '적용', '오류'], hash: 'setup' },

  { category: 'FAQ', title: '게시판형 채팅과 실시간 채팅 상담', description: 'GrowTalk의 게시판형 채팅과 실시간 채팅 상담의 차이를 확인합니다.', keywords: ['게시판형', '실시간', '차이'], hash: 'service' },
  { category: 'FAQ', title: '회원과 비회원 문의 기준', description: '비회원도 문의가 가능한지, 기기 변경 시 문의 이력은 어떻게 확인하는지 알아봅니다.', keywords: ['비회원', '회원', '문의 이력', '기기'], hash: 'member-guest' },
  { category: 'FAQ', title: '실시간 상담 체험', description: '실시간 상담 체험 버튼의 용도와 저장 여부를 확인합니다.', keywords: ['상담 체험', '체험', '저장'], hash: 'live-chat' },
  { category: 'FAQ', title: '구독 신청 및 설치 코드', description: '구독 신청 흐름과 상담 환경 준비, 설치 코드 사용처를 확인합니다.', keywords: ['구독', '결제', '설치 코드', '설정'], hash: 'subscription' },
];

export const GETTING_STARTED_SECTIONS = [
  { id: 'first-inquiry', title: '1. 고객과 첫 문의를 준비하기' },
  { id: 'customer-widget', title: '2. 고객이 보는 문의창 확인하기' },
  { id: 'prepare-inquiry', title: '3. 문의를 받을 준비하기' },
  { id: 'test-inquiry', title: '4. 테스트 문의 남겨보기' },
  { id: 'reply-test', title: '5. 상담 담당자가 답변해보기' },
  { id: 'live-chat', title: '6. 실시간 채팅 상담도 확인하기' },
  { id: 'next', title: '7. 다음에 볼 문서' }
];

export const GuidePage = () => {
  const [activeItem, setActiveItem] = useState('실시간 채팅 상담');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSection, setActiveSection] = useState('intro');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  useEffect(() => {
    // Map pathname to activeItem
    const path = location.pathname;
    if (path.includes('/guide/board-chat')) {
      setActiveItem('게시판형 채팅');
    } else if (path.includes('/guide/live-chat')) {
      setActiveItem('실시간 채팅 상담');
    } else if (path.includes('/guide/inquiry-management')) {
      setActiveItem('문의 관리');
    } else if (path.includes('/guide/settings')) {
      setActiveItem('설정 관리');
    } else if (path.includes('/guide/pricing-subscription')) {
      setActiveItem('요금제 및 구독');
    } else if (path.includes('/guide/troubleshooting')) {
      setActiveItem('문제 해결');
    } else if (path.includes('/guide/faq')) {
      setActiveItem('FAQ');
    } else {
      // Default /guide falls back to first item or '처음 시작하기'
      setActiveItem('처음 시작하기');
    }
  }, [location.pathname]);

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const el = document.getElementById(id);
      if (el) {
        setTimeout(() => el.scrollIntoView(), 0);
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
  }, [location.pathname, location.hash, activeItem]);

  const handlePageChange = (item: string, targetHash?: string) => {
    let newPath = '/guide';
    if (item === '게시판형 채팅') newPath = '/guide/board-chat';
    if (item === '실시간 채팅 상담') newPath = '/guide/live-chat';
    if (item === '문의 관리') newPath = '/guide/inquiry-management';
    if (item === '설정 관리') newPath = '/guide/settings';
    if (item === '요금제 및 구독') newPath = '/guide/pricing-subscription';
    if (item === '문제 해결') newPath = '/guide/troubleshooting';
    if (item === 'FAQ') newPath = '/guide/faq';

    if (targetHash) {
      navigate(`${newPath}#${targetHash}`);
    } else {
      navigate(newPath);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        'first-inquiry', 'customer-widget', 'prepare-inquiry', 'test-inquiry', 'reply-test',
        'section-1', 'section-2', 'section-3', 'section-4', 'section-5', 'section-6', 'section-7',
        'intro', 'customer-flow', 'write-inquiry', 'customer-start', 'agent-response', 'answer-check', 'agent-reply', 'customer', 'agent', 'start', 'features', 'history', 'end', 'try', 'next',
        'list', 'detail', 'reply', 'status', 'search',
        'channel', 'inquiry-type', 'input-fields', 'permissions', 'checklist',
        'pricing', 'subscribe', 'payment-sample', 'setup', 'install-code',
        'widget', 'inquiry', 'history', 'live-chat',
        'service', 'member-guest', 'subscription'
      ];
      let current = '';
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120) {
            current = section;
          }
        }
      }
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const searchResults = searchQuery.trim() === '' ? [] : SEARCH_INDEX.filter(item => {
    const query = searchQuery.toLowerCase();
    return item.title.toLowerCase().includes(query) ||
           item.category.toLowerCase().includes(query) ||
           item.description.toLowerCase().includes(query) ||
           item.keywords.some(k => k.toLowerCase().includes(query));
  });

  return (
    <div className="bg-white pt-[72px] pb-16">
      <div className="w-full max-w-[1400px] mx-auto px-6 lg:px-8 flex">
        
        {/* Left Sidebar */}
        <aside className="w-[260px] lg:w-[280px] shrink-0 hidden md:block border-r border-gray-100">
          <div className="sticky top-[72px] max-h-[calc(100vh-72px)] overflow-y-auto pl-1 pr-4 lg:pr-8 py-10 -ml-1 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-gray-200 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-track]:my-4">
            <div className="mb-6 relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="가이드 검색"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Escape') setSearchQuery('');
              }}
              className="w-full pl-9 pr-9 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all box-border"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 text-gray-400 hover:text-gray-600 bg-gray-200/50 hover:bg-gray-200 rounded-full transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {searchQuery.trim() !== '' ? (
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-gray-400 px-2 tracking-wide">검색 결과</h4>
              {searchResults.length > 0 ? (
                <div className="space-y-3">
                  {searchResults.map((result, idx) => (
                    <button 
                      key={idx}
                      onClick={() => {
                        const category = result.category === '공통 시작 가이드' ? '처음 시작하기' : result.category;
                        // @ts-ignore
                        handlePageChange(category, result.hash);
                        setSearchQuery('');
                      }}
                      title={result.title !== '처음 시작하기' ? '준비 중인 문서입니다.' : ''}
                      className="w-full text-left px-3 py-3 rounded-xl hover:bg-gray-50 transition-colors group border border-transparent block"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[0.7rem] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">{result.category}</span>
                        {result.title !== '처음 시작하기' && (
                          <span className="text-[0.65rem] font-bold text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">준비 중</span>
                        )}
                      </div>
                      <div className="font-bold text-gray-900 text-[0.85rem] mb-1 group-hover:text-blue-600 transition-colors">{result.title}</div>
                      <p className="text-[0.75rem] text-gray-500 line-clamp-2 leading-relaxed">{result.description}</p>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10 px-4">
                  <Search className="w-8 h-8 text-gray-200 mx-auto mb-3" />
                  <p className="text-sm font-medium text-gray-900 mb-1">검색 결과가 없습니다.</p>
                  <p className="text-xs text-gray-500">다른 키워드로 검색해보세요.</p>
                </div>
              )}
            </div>
          ) : (
            <nav className="space-y-4">
              {SIDEBAR_MENU.map((section, idx) => {
                const isActive = activeItem === section.title;
                return (
                  <button 
                    key={idx}
                    onClick={() => handlePageChange(section.title)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                      isActive 
                        ? 'bg-blue-50 text-blue-700 font-bold shadow-sm' 
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 font-medium'
                    }`}
                  >
                    <span className={isActive ? 'text-blue-600' : 'text-gray-400'}>
                      {section.icon}
                    </span>
                    <span className="text-[0.95rem]">{section.title}</span>
                  </button>
                );
              })}
            </nav>
          )}
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0 px-6 lg:px-12 xl:px-16 py-10 max-w-[860px] guide-doc-container">
          {activeItem === '처음 시작하기' && <GettingStartedDoc setActiveItem={handlePageChange} />}
          {activeItem === '게시판형 채팅' && <BoardChatDoc setActiveItem={handlePageChange} />}
          {activeItem === '실시간 채팅 상담' && <LiveChatDoc setActiveItem={handlePageChange} />}
          {activeItem === '문의 관리' && <InquiryManagementDoc setActiveItem={handlePageChange} />}
          {activeItem === '설정 관리' && <SettingsManagementDoc setActiveItem={handlePageChange} />}
          {activeItem === '요금제 및 구독' && <PricingSubscriptionDoc setActiveItem={handlePageChange} />}
          {activeItem === '문제 해결' && <TroubleshootingDoc setActiveItem={handlePageChange} />}
          {activeItem === 'FAQ' && <FaqDoc setActiveItem={handlePageChange} />}
          {activeItem !== '처음 시작하기' && activeItem !== '게시판형 채팅' && activeItem !== '실시간 채팅 상담' && activeItem !== '문의 관리' && activeItem !== '설정 관리' && activeItem !== '요금제 및 구독' && activeItem !== '문제 해결' && activeItem !== 'FAQ' && (
            <div className="text-center py-20 text-gray-500">
              <FileText className="w-12 h-12 mx-auto text-gray-300 mb-4" />
              <h3 className="text-lg font-semibold text-gray-700 mb-2">{activeItem}</h3>
              <p>해당 가이드 문서는 아직 준비 중입니다.</p>
            </div>
          )}
        </main>

        {/* Right TOC */}
        <aside className="w-[200px] xl:w-[240px] shrink-0 hidden lg:block border-l border-gray-100">
          <div className="sticky top-[72px] max-h-[calc(100vh-72px)] overflow-y-auto pl-8 py-10">
            <h4 className="text-sm font-bold text-gray-900 mb-4">문서 목차</h4>
            {activeItem === '처음 시작하기' && (
              <ul className="space-y-3 text-[0.85rem] text-gray-500">
                {GETTING_STARTED_SECTIONS.map((sec) => (
                  <li key={sec.id}>
                    <a 
                      href={`#${sec.id}`} 
                      className={`hover:text-blue-600 transition-colors ${activeSection === sec.id ? 'text-blue-600 font-semibold' : ''}`}
                    >
                      {sec.title}
                    </a>
                  </li>
                ))}
              </ul>
            )}
            {activeItem === '게시판형 채팅' && (
              <ul className="space-y-3 text-[0.85rem] text-gray-500">
                <li><a href="#intro" className={`hover:text-blue-600 transition-colors ${activeSection === 'intro' ? 'text-blue-600 font-semibold' : ''}`}>1. 게시판형 채팅이란?</a></li>
                <li><a href="#customer-flow" className={`hover:text-blue-600 transition-colors ${activeSection === 'customer-flow' ? 'text-blue-600 font-semibold' : ''}`}>2. 고객의 문의 접수 흐름</a></li>
                <li><a href="#write-inquiry" className={`hover:text-blue-600 transition-colors ${activeSection === 'write-inquiry' ? 'text-blue-600 font-semibold' : ''}`}>3. 문의 작성 화면 이해하기</a></li>
                <li><a href="#answer-check" className={`hover:text-blue-600 transition-colors ${activeSection === 'answer-check' ? 'text-blue-600 font-semibold' : ''}`}>4. 답변 대기와 답변 확인</a></li>
                <li><a href="#member-guest" className={`hover:text-blue-600 transition-colors ${activeSection === 'member-guest' ? 'text-blue-600 font-semibold' : ''}`}>5. 회원과 비회원 문의 확인 방식</a></li>
                <li><a href="#agent-reply" className={`hover:text-blue-600 transition-colors ${activeSection === 'agent-reply' ? 'text-blue-600 font-semibold' : ''}`}>6. 상담 담당자는 어디에서 답변하나요?</a></li>
                <li><a href="#next" className={`hover:text-blue-600 transition-colors ${activeSection === 'next' ? 'text-blue-600 font-semibold' : ''}`}>7. 다음에 볼 문서</a></li>
              </ul>
            )}
            {activeItem === '실시간 채팅 상담' && (
              <ul className="space-y-3 text-[0.85rem] text-gray-500">
                <li><a href="#intro" className={`hover:text-blue-600 transition-colors ${activeSection === 'intro' ? 'text-blue-600 font-semibold' : ''}`}>1. 실시간 채팅 상담이란?</a></li>
                <li><a href="#customer-start" className={`hover:text-blue-600 transition-colors ${activeSection === 'customer-start' ? 'text-blue-600 font-semibold' : ''}`}>2. 고객은 어떻게 상담을 시작하나요?</a></li>
                <li><a href="#agent-response" className={`hover:text-blue-600 transition-colors ${activeSection === 'agent-response' ? 'text-blue-600 font-semibold' : ''}`}>3. 상담 담당자는 어떻게 응대하나요?</a></li>
                <li><a href="#features" className={`hover:text-blue-600 transition-colors ${activeSection === 'features' ? 'text-blue-600 font-semibold' : ''}`}>4. 상담 중 사용할 수 있는 기능</a></li>
                <li><a href="#history" className={`hover:text-blue-600 transition-colors ${activeSection === 'history' ? 'text-blue-600 font-semibold' : ''}`}>5. 상담 종료와 이력 확인</a></li>
                <li><a href="#try" className={`hover:text-blue-600 transition-colors ${activeSection === 'try' ? 'text-blue-600 font-semibold' : ''}`}>6. 실시간 상담 체험으로 미리 확인하기</a></li>
                <li><a href="#next" className={`hover:text-blue-600 transition-colors ${activeSection === 'next' ? 'text-blue-600 font-semibold' : ''}`}>7. 다음에 볼 문서</a></li>
              </ul>
            )}
            {activeItem === '문의 관리' && (
              <ul className="space-y-3 text-[0.85rem] text-gray-500">
                <li><a href="#intro" className={`hover:text-blue-600 transition-colors ${activeSection === 'intro' ? 'text-blue-600 font-semibold' : ''}`}>1. 문의 관리란?</a></li>
                <li><a href="#list" className={`hover:text-blue-600 transition-colors ${activeSection === 'list' ? 'text-blue-600 font-semibold' : ''}`}>2. 문의 목록 확인하기</a></li>
                <li><a href="#detail" className={`hover:text-blue-600 transition-colors ${activeSection === 'detail' ? 'text-blue-600 font-semibold' : ''}`}>3. 문의 상세 보기</a></li>
                <li><a href="#reply" className={`hover:text-blue-600 transition-colors ${activeSection === 'reply' ? 'text-blue-600 font-semibold' : ''}`}>4. 답변 등록하기</a></li>
                <li><a href="#status" className={`hover:text-blue-600 transition-colors ${activeSection === 'status' ? 'text-blue-600 font-semibold' : ''}`}>5. 문의 상태 관리하기</a></li>
                <li><a href="#search" className={`hover:text-blue-600 transition-colors ${activeSection === 'search' ? 'text-blue-600 font-semibold' : ''}`}>6. 문의 검색 및 필터 사용하기</a></li>
                <li><a href="#next" className={`hover:text-blue-600 transition-colors ${activeSection === 'next' ? 'text-blue-600 font-semibold' : ''}`}>7. 다음에 볼 문서</a></li>
              </ul>
            )}
            {activeItem === '설정 관리' && (
              <ul className="space-y-3 text-[0.85rem] text-gray-500">
                <li><a href="#intro" className={`hover:text-blue-600 transition-colors ${activeSection === 'intro' ? 'text-blue-600 font-semibold' : ''}`}>1. 설정 관리란?</a></li>
                <li><a href="#channel" className={`hover:text-blue-600 transition-colors ${activeSection === 'channel' ? 'text-blue-600 font-semibold' : ''}`}>2. 상담 채널 관리</a></li>
                <li><a href="#inquiry-type" className={`hover:text-blue-600 transition-colors ${activeSection === 'inquiry-type' ? 'text-blue-600 font-semibold' : ''}`}>3. 문의 유형 관리</a></li>
                <li><a href="#input-fields" className={`hover:text-blue-600 transition-colors ${activeSection === 'input-fields' ? 'text-blue-600 font-semibold' : ''}`}>4. 문의 입력 항목 설정</a></li>
                <li><a href="#permissions" className={`hover:text-blue-600 transition-colors ${activeSection === 'permissions' ? 'text-blue-600 font-semibold' : ''}`}>5. 담당자 권한 설정</a></li>
                <li><a href="#checklist" className={`hover:text-blue-600 transition-colors ${activeSection === 'checklist' ? 'text-blue-600 font-semibold' : ''}`}>6. 시작 전 확인할 설정</a></li>
                <li><a href="#next" className={`hover:text-blue-600 transition-colors ${activeSection === 'next' ? 'text-blue-600 font-semibold' : ''}`}>7. 다음에 볼 문서</a></li>
              </ul>
            )}
            {activeItem === '요금제 및 구독' && (
              <ul className="space-y-3 text-[0.85rem] text-gray-500">
                <li><a href="#intro" className={`hover:text-blue-600 transition-colors ${activeSection === 'intro' ? 'text-blue-600 font-semibold' : ''}`}>1. 요금제 및 구독이란?</a></li>
                <li><a href="#pricing" className={`hover:text-blue-600 transition-colors ${activeSection === 'pricing' ? 'text-blue-600 font-semibold' : ''}`}>2. 요금제 확인하기</a></li>
                <li><a href="#subscribe" className={`hover:text-blue-600 transition-colors ${activeSection === 'subscribe' ? 'text-blue-600 font-semibold' : ''}`}>3. 구독 신청하기</a></li>
                <li><a href="#payment-sample" className={`hover:text-blue-600 transition-colors ${activeSection === 'payment-sample' ? 'text-blue-600 font-semibold' : ''}`}>4. 결제 샘플 화면 이해하기</a></li>
                <li><a href="#setup" className={`hover:text-blue-600 transition-colors ${activeSection === 'setup' ? 'text-blue-600 font-semibold' : ''}`}>5. 상담 환경 준비 중 화면</a></li>
                <li><a href="#install-code" className={`hover:text-blue-600 transition-colors ${activeSection === 'install-code' ? 'text-blue-600 font-semibold' : ''}`}>6. 설치 코드 확인하기</a></li>
                <li><a href="#next" className={`hover:text-blue-600 transition-colors ${activeSection === 'next' ? 'text-blue-600 font-semibold' : ''}`}>7. 다음에 볼 문서</a></li>
              </ul>
            )}
            {activeItem === '문제 해결' && (
              <ul className="space-y-3 text-[0.85rem] text-gray-500">
                <li><a href="#intro" className={`hover:text-blue-600 transition-colors ${activeSection === 'intro' ? 'text-blue-600 font-semibold' : ''}`}>1. 문제 해결 안내</a></li>
                <li><a href="#widget" className={`hover:text-blue-600 transition-colors ${activeSection === 'widget' ? 'text-blue-600 font-semibold' : ''}`}>2. 플로팅 문의 버튼이 보이지 않을 때</a></li>
                <li><a href="#inquiry" className={`hover:text-blue-600 transition-colors ${activeSection === 'inquiry' ? 'text-blue-600 font-semibold' : ''}`}>3. 문의가 등록되지 않을 때</a></li>
                <li><a href="#reply" className={`hover:text-blue-600 transition-colors ${activeSection === 'reply' ? 'text-blue-600 font-semibold' : ''}`}>4. 답변이 보이지 않을 때</a></li>
                <li><a href="#history" className={`hover:text-blue-600 transition-colors ${activeSection === 'history' ? 'text-blue-600 font-semibold' : ''}`}>5. 문의 이력이 보이지 않을 때</a></li>
                <li><a href="#live-chat" className={`hover:text-blue-600 transition-colors ${activeSection === 'live-chat' ? 'text-blue-600 font-semibold' : ''}`}>6. 실시간 상담이 시작되지 않을 때</a></li>
                <li><a href="#setup" className={`hover:text-blue-600 transition-colors ${activeSection === 'setup' ? 'text-blue-600 font-semibold' : ''}`}>7. 설정이 반영되지 않을 때</a></li>
                <li><a href="#next" className={`hover:text-blue-600 transition-colors ${activeSection === 'next' ? 'text-blue-600 font-semibold' : ''}`}>8. 다음에 볼 문서</a></li>
              </ul>
            )}
            {activeItem === 'FAQ' && (
              <ul className="space-y-3 text-[0.85rem] text-gray-500">
                <li><a href="#intro" className={`hover:text-blue-600 transition-colors ${activeSection === 'intro' ? 'text-blue-600 font-semibold' : ''}`}>1. FAQ 안내</a></li>
                <li><a href="#service" className={`hover:text-blue-600 transition-colors ${activeSection === 'service' ? 'text-blue-600 font-semibold' : ''}`}>2. 서비스 구성</a></li>
                <li><a href="#board-chat" className={`hover:text-blue-600 transition-colors ${activeSection === 'board-chat' ? 'text-blue-600 font-semibold' : ''}`}>3. 게시판형 채팅</a></li>
                <li><a href="#live-chat" className={`hover:text-blue-600 transition-colors ${activeSection === 'live-chat' ? 'text-blue-600 font-semibold' : ''}`}>4. 실시간 채팅 상담</a></li>
                <li><a href="#member-guest" className={`hover:text-blue-600 transition-colors ${activeSection === 'member-guest' ? 'text-blue-600 font-semibold' : ''}`}>5. 회원/비회원 문의</a></li>
                <li><a href="#subscription" className={`hover:text-blue-600 transition-colors ${activeSection === 'subscription' ? 'text-blue-600 font-semibold' : ''}`}>6. 요금제 및 구독</a></li>
                <li><a href="#next" className={`hover:text-blue-600 transition-colors ${activeSection === 'next' ? 'text-blue-600 font-semibold' : ''}`}>7. 다음에 볼 문서</a></li>
              </ul>
            )}
            {activeItem !== '처음 시작하기' && activeItem !== '게시판형 채팅' && activeItem !== '실시간 채팅 상담' && activeItem !== '문의 관리' && activeItem !== '설정 관리' && activeItem !== '요금제 및 구독' && activeItem !== '문제 해결' && activeItem !== 'FAQ' && (
              <ul className="space-y-3 text-[0.85rem] text-gray-500">
                <li><span className="text-gray-400">목차 준비 중</span></li>
              </ul>
            )}
          </div>
        </aside>

      </div>
    </div>
  );
};

const ServiceArchitectureDoc = () => {
  return (
    <div className="max-w-3xl">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-6 font-medium">
        <Link to="/" className="hover:text-gray-900 transition-colors">홈</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-gray-900">가이드 문서</span>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-blue-600 font-semibold">서비스 구성 이해하기</span>
      </div>

      <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 mb-6 pt-2">
        서비스 구성 이해하기
      </h1>
      
      <p className="text-lg text-gray-600 leading-relaxed mb-12">
        GrowTalk은 기업의 상담 운영 방식에 따라 게시판형 채팅 솔루션과 실시간 채팅 솔루션으로 사용할 수 있습니다. 이 문서에서는 두 솔루션의 역할과 차이를 안내합니다.
      </p>

      {/* Section 1 */}
      <section id="section-1" className="mb-14 scroll-mt-24 guide-section">
        <h2 className="text-2xl font-bold text-gray-900 mb-5 pb-2 border-b border-gray-100">1. GrowTalk 서비스 구성</h2>
        <p className="text-[0.95rem] text-gray-600 leading-relaxed mb-6">
          GrowTalk은 고객 문의를 빠르게 접수하고, 운영자가 체계적으로 답변할 수 있도록 돕는 상담 채팅 솔루션입니다.<br/>
          기업의 상담 운영 방식에 따라 게시판형 채팅 솔루션과 실시간 채팅 솔루션을 함께 사용할 수 있습니다.
        </p>

        <div className="bg-gray-50 border border-gray-200 rounded-xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-200">
            <div className="p-6">
              <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-blue-500" />
                게시판형 채팅 솔루션
              </h3>
              <p className="text-[0.85rem] text-gray-500 mb-4 h-[38px] leading-relaxed">고객이 채팅창에서 문의를 남기고, 운영자가 문의 목록에서 확인 후 답변하는 방식입니다.</p>
              <ul className="space-y-2 text-[0.9rem] text-gray-600">
                <li className="flex items-start gap-2"><Check className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" /> 실시간 상담원 대기 없이 문의 접수 가능</li>
                <li className="flex items-start gap-2"><Check className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" /> 고객은 채팅처럼 문의 등록</li>
                <li className="flex items-start gap-2"><Check className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" /> 운영자는 문의 목록에서 순차 처리</li>
                <li className="flex items-start gap-2"><Check className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" /> 답변은 고객 문의창에서 확인</li>
              </ul>
            </div>
            <div className="p-6 bg-white">
              <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-red-400 animate-pulse"></div>
                실시간 채팅 솔루션
              </h3>
              <p className="text-[0.85rem] text-gray-500 mb-4 h-[38px] leading-relaxed">상담원과 고객이 동시에 접속해 실시간으로 대화하는 상담 방식입니다.</p>
              <ul className="space-y-2 text-[0.9rem] text-gray-600">
                <li className="flex items-start gap-2"><Check className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" /> 고객과 상담원이 즉시 대화</li>
                <li className="flex items-start gap-2"><Check className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" /> 실시간 응대가 필요한 상담에 적합</li>
                <li className="flex items-start gap-2"><Check className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" /> 상담사 화면과 고객 화면으로 구성</li>
                <li className="flex items-start gap-2"><Check className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" /> 실제 도입 전 실시간 상담 체험 가능</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2 */}
      <section id="section-2" className="mb-14 scroll-mt-24 guide-section">
        <h2 className="text-2xl font-bold text-gray-900 mb-5 pb-2 border-b border-gray-100">2. 게시판형 채팅 솔루션</h2>
        <p className="text-[0.95rem] text-gray-600 leading-relaxed mb-6">
          게시판형 채팅 솔루션은 고객에게는 채팅처럼 보이지만, 운영자에게는 1:1 문의 게시판처럼 관리되는 방식입니다.<br/>
          고객은 웹사이트의 플로팅 문의 버튼을 눌러 문의를 남기고, 운영자는 관리자 화면의 문의 목록에서 내용을 확인한 뒤 답변을 등록합니다.
        </p>

        <div className="space-y-4 mb-8">
          {[
            '고객이 플로팅 문의 버튼 클릭',
            '문의 유형과 문의 내용 입력',
            '문의 접수 완료',
            '운영자가 문의 목록에서 확인',
            '운영자가 답변 등록',
            '고객이 문의창에서 답변 확인'
          ].map((step, idx) => (
            <div key={idx} className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition-shadow">
              <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 font-bold flex items-center justify-center shrink-0 border border-blue-100">
                {idx + 1}
              </div>
              <div className="font-medium text-gray-800 text-[0.95rem]">
                {step}
              </div>
            </div>
          ))}
        </div>
        
        <div className="w-full h-[300px] bg-gray-100 rounded-xl border border-gray-200 mb-6 flex items-center justify-center text-gray-400">
          <div className="text-center">
            <LayoutDashboard className="w-10 h-10 mx-auto text-gray-300 mb-3" />
            <p className="font-medium">게시판형 채팅 고객 문의창과 운영자 문의 목록 화면 예시</p>
          </div>
        </div>
      </section>

      {/* Section 3 */}
      <section id="section-3" className="mb-14 scroll-mt-24 guide-section">
        <h2 className="text-2xl font-bold text-gray-900 mb-5 pb-2 border-b border-gray-100">3. 실시간 채팅 솔루션</h2>
        <p className="text-[0.95rem] text-gray-600 leading-relaxed mb-6">
          실시간 채팅 솔루션은 고객과 상담원이 동시에 접속해 바로 대화하는 상담 방식입니다.<br/>
          구매 직전 문의, 긴급 응대, 빠른 상담이 필요한 상황에 적합합니다.
        </p>

        <ul className="space-y-3 mb-8">
          <li className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
            <Check className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
            <span className="text-[0.95rem] text-gray-700">상담원이 고객과 실시간으로 대화</span>
          </li>
          <li className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
            <Check className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
            <span className="text-[0.95rem] text-gray-700">상담사 화면과 고객 화면을 함께 사용</span>
          </li>
          <li className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
            <Check className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
            <span className="text-[0.95rem] text-gray-700">상담 흐름을 즉시 확인 가능</span>
          </li>
          <li className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
            <Check className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
            <span className="text-[0.95rem] text-gray-700">실시간 상담 체험으로 샘플 상담을 먼저 확인 가능</span>
          </li>
        </ul>

        <button onClick={() => window.open('/experience', '_blank')} className="px-6 py-3 bg-[#274236] text-white rounded-lg font-semibold hover:bg-[#1C3027] transition-colors shadow-sm">
          실시간 상담 체험
        </button>
      </section>

      {/* Section 4 */}
      <section id="section-4" className="mb-14 scroll-mt-24 guide-section">
        <h2 className="text-2xl font-bold text-gray-900 mb-5 pb-2 border-b border-gray-100">4. 두 솔루션의 차이</h2>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="py-4 px-4 font-bold text-gray-900 w-1/4">비교 항목</th>
                <th className="py-4 px-4 font-bold text-gray-900 w-3/8 text-blue-600 bg-blue-50/50 rounded-tl-lg">게시판형 채팅</th>
                <th className="py-4 px-4 font-bold text-gray-900 w-3/8">실시간 채팅</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-[0.95rem]">
              <tr className="hover:bg-gray-50 transition-colors">
                <td className="py-4 px-4 font-semibold text-gray-800">상담 방식</td>
                <td className="py-4 px-4 text-gray-600 bg-blue-50/30">고객이 문의를 남기고 운영자가 나중에 답변</td>
                <td className="py-4 px-4 text-gray-600">고객과 상담원이 동시에 대화</td>
              </tr>
              <tr className="hover:bg-gray-50 transition-colors">
                <td className="py-4 px-4 font-semibold text-gray-800">운영 방식</td>
                <td className="py-4 px-4 text-gray-600 bg-blue-50/30">문의 목록 기반으로 순차 처리</td>
                <td className="py-4 px-4 text-gray-600">상담방 중심으로 즉시 응대</td>
              </tr>
              <tr className="hover:bg-gray-50 transition-colors">
                <td className="py-4 px-4 font-semibold text-gray-800">상담원 대기</td>
                <td className="py-4 px-4 text-gray-600 bg-blue-50/30">필수 아님</td>
                <td className="py-4 px-4 text-gray-600">필요</td>
              </tr>
              <tr className="hover:bg-gray-50 transition-colors">
                <td className="py-4 px-4 font-semibold text-gray-800">적합한 상황</td>
                <td className="py-4 px-4 text-gray-600 bg-blue-50/30">일반 문의, 견적 문의, 제휴 문의, A/S 문의</td>
                <td className="py-4 px-4 text-gray-600">구매 직전 문의, 긴급 문의, 빠른 응대가 필요한 상담</td>
              </tr>
              <tr className="hover:bg-gray-50 transition-colors border-b border-gray-200">
                <td className="py-4 px-4 font-semibold text-gray-800">고객 경험</td>
                <td className="py-4 px-4 text-gray-600 bg-blue-50/30 rounded-bl-lg">채팅창에서 문의 등록 후 답변 확인</td>
                <td className="py-4 px-4 text-gray-600">메신저처럼 바로 대화</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Section 5 */}
      <section id="section-5" className="mb-14 scroll-mt-24 guide-section">
        <h2 className="text-2xl font-bold text-gray-900 mb-5 pb-2 border-b border-gray-100">5. 어떤 솔루션부터 사용하면 좋을까요?</h2>
        
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-6">
          <h4 className="font-bold text-blue-900 mb-3 flex items-center gap-2">
            <span className="text-xl">💡</span> 알아두면 좋아요
          </h4>
          <ul className="space-y-2 text-[0.95rem] text-blue-800">
            <li className="flex items-start gap-2"><span className="shrink-0 font-bold mt-0.5">•</span> 처음 사용하는 경우 게시판형 채팅 솔루션부터 확인하는 것이 좋습니다.</li>
            <li className="flex items-start gap-2"><span className="shrink-0 font-bold mt-0.5">•</span> 게시판형 채팅은 실시간 상담원이 없어도 고객 문의를 접수할 수 있습니다.</li>
            <li className="flex items-start gap-2"><span className="shrink-0 font-bold mt-0.5">•</span> 실시간 응대가 필요한 경우 실시간 상담 체험을 통해 상담사 화면과 고객 화면을 먼저 확인할 수 있습니다.</li>
            <li className="flex items-start gap-2"><span className="shrink-0 font-bold mt-0.5">•</span> 게시판형 채팅과 실시간 채팅은 서로 다른 상담 방식이며, 운영 상황에 따라 함께 사용할 수 있습니다.</li>
          </ul>
        </div>
      </section>

      {/* Section 6 */}
      <section id="section-6" className="mb-10 scroll-mt-24 guide-section">
        <h2 className="text-2xl font-bold text-gray-900 mb-5 pb-2 border-b border-gray-100">6. 관련 문서</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            '게시판형 채팅 시작하기',
            '실시간 상담 체험하기',
            '무료로 시작하기',
            '요금제 확인하기'
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

const GettingStartedDoc = ({ setActiveItem }: { setActiveItem: (item: string) => void }) => {
  return (
    <div className="max-w-3xl">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-6 font-medium">
        <Link to="/" className="hover:text-gray-900 transition-colors">홈</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-gray-900">가이드 문서</span>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-blue-600 font-semibold">처음 시작하기</span>
      </div>

      <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 mb-6 pt-2">
        처음 시작하기
      </h1>
      
      <p className="text-lg text-gray-600 leading-relaxed mb-12">
        고객과 첫 문의를 주고받기 전, GrowTalk에서 먼저 확인해야 할 기본 준비 과정을 안내합니다. 고객이 보는 문의창을 확인하고, 문의를 받을 준비를 한 뒤, 테스트 문의와 답변 등록까지 차례대로 확인해보세요.
      </p>

      {/* Section 1 */}
      {GETTING_STARTED_SECTIONS.some(s => s.id === 'first-inquiry') && (
        <section id="first-inquiry" className="mb-14 scroll-mt-24 guide-section">
          <h2 className="text-2xl font-bold text-gray-900 mb-5 pb-2 border-b border-gray-100">
            {GETTING_STARTED_SECTIONS.find(s => s.id === 'first-inquiry')?.title}
          </h2>
          
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 mb-6">
            <p className="text-[0.95rem] text-blue-900 leading-relaxed font-medium">
              설치는 준비됐지만 어떤 것부터 확인해야 할지 모르겠다면, 여기부터 시작해보세요.<br />
              고객이 처음 보게 될 문의창을 확인하고, 문의를 받을 준비를 한 뒤, 실제 답변 흐름까지 함께 확인해볼게요.
            </p>
          </div>

          <p className="text-[0.95rem] text-gray-600 leading-relaxed">
            GrowTalk을 처음 사용할 때는 모든 기능을 한 번에 설정할 필요가 없습니다.<br />
            먼저 고객이 문의를 남기는 화면을 확인하고, 상담 담당자가 문의를 확인하고 답변할 수 있는 기본 흐름을 점검하는 것이 좋습니다.
          </p>
        </section>
      )}

      {/* Section 2 */}
      {GETTING_STARTED_SECTIONS.some(s => s.id === 'customer-widget') && (
        <section id="customer-widget" className="mb-14 scroll-mt-24 guide-section">
          <h2 className="text-2xl font-bold text-gray-900 mb-5 pb-2 border-b border-gray-100">
            {GETTING_STARTED_SECTIONS.find(s => s.id === 'customer-widget')?.title}
          </h2>
          <p className="text-[0.95rem] text-gray-600 leading-relaxed mb-6">
            고객은 웹사이트 우측 하단의 플로팅 문의 버튼을 통해 GrowTalk을 처음 만납니다.<br />
            문의창은 고객이 질문을 남기고, 접수 상태와 답변을 다시 확인하는 공간입니다.
          </p>
          
          <div className="w-full h-[300px] bg-gray-50 rounded-xl border border-gray-200 mb-6 flex items-center justify-center text-gray-400 font-medium tracking-wide">
            고객이 보는 플로팅 문의 버튼과 문의창 화면 예시
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 bg-white border border-gray-200 rounded-xl shadow-sm">
              <h3 className="font-bold text-gray-800 text-[0.95rem] mb-2">플로팅 문의 버튼</h3>
              <p className="text-[0.85rem] text-gray-600 leading-relaxed">
                고객이 문의를 시작하는 진입 버튼입니다.
              </p>
            </div>
            <div className="p-5 bg-white border border-gray-200 rounded-xl shadow-sm">
              <h3 className="font-bold text-gray-800 text-[0.95rem] mb-2">문의 작성 화면</h3>
              <p className="text-[0.85rem] text-gray-600 leading-relaxed">
                문의 유형, 연락처, 문의 내용을 입력하는 화면입니다.
              </p>
            </div>
            <div className="p-5 bg-white border border-gray-200 rounded-xl shadow-sm">
              <h3 className="font-bold text-gray-800 text-[0.95rem] mb-2">문의 상세 화면</h3>
              <p className="text-[0.85rem] text-gray-600 leading-relaxed">
                문의 접수 상태와 답변을 확인하는 화면입니다.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Section 3 */}
      {GETTING_STARTED_SECTIONS.some(s => s.id === 'prepare-inquiry') && (
        <section id="prepare-inquiry" className="mb-14 scroll-mt-24 guide-section">
          <h2 className="text-2xl font-bold text-gray-900 mb-5 pb-2 border-b border-gray-100">
            {GETTING_STARTED_SECTIONS.find(s => s.id === 'prepare-inquiry')?.title}
          </h2>
          <p className="text-[0.95rem] text-gray-600 leading-relaxed mb-6">
            문의창을 고객에게 보여주기 전에, 고객이 어떤 문의를 남길 수 있는지와 어떤 정보를 입력해야 하는지 먼저 정해두는 것이 좋습니다.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div className="p-5 bg-white border border-gray-200 rounded-xl shadow-sm">
              <h3 className="font-bold text-gray-800 text-[0.95rem] mb-2 text-blue-700">문의 유형 정리</h3>
              <p className="text-[0.85rem] text-gray-600 leading-relaxed">
                서비스 이용 문의, 견적 문의, A/S 문의처럼 고객이 선택할 문의 유형을 정합니다.
              </p>
            </div>
            <div className="p-5 bg-white border border-gray-200 rounded-xl shadow-sm">
              <h3 className="font-bold text-gray-800 text-[0.95rem] mb-2 text-blue-700">입력 항목 확인</h3>
              <p className="text-[0.85rem] text-gray-600 leading-relaxed">
                이름, 연락처 또는 이메일, 문의 내용처럼 문의 처리에 필요한 정보를 정합니다.
              </p>
            </div>
            <div className="p-5 bg-white border border-gray-200 rounded-xl shadow-sm">
              <h3 className="font-bold text-gray-800 text-[0.95rem] mb-2 text-blue-700">안내 문구 확인</h3>
              <p className="text-[0.85rem] text-gray-600 leading-relaxed">
                고객에게 보여줄 기본 안내 문구를 확인합니다.
              </p>
            </div>
            <div className="p-5 bg-white border border-gray-200 rounded-xl shadow-sm">
              <h3 className="font-bold text-gray-800 text-[0.95rem] mb-2 text-blue-700">담당자 준비</h3>
              <p className="text-[0.85rem] text-gray-600 leading-relaxed">
                접수된 문의를 확인하고 답변할 상담 담당자를 준비합니다.
              </p>
            </div>
          </div>

          <p className="text-[0.85rem] text-gray-500 bg-gray-50 border border-gray-100 p-4 rounded-xl">
            <strong className="text-gray-700">💡 Tip:</strong> 처음에는 너무 많은 항목을 받기보다, 문의 내용을 확인할 수 있는 최소 정보부터 설정하는 것이 좋습니다.
          </p>
        </section>
      )}

      {/* Section 4 */}
      {GETTING_STARTED_SECTIONS.some(s => s.id === 'test-inquiry') && (
        <section id="test-inquiry" className="mb-14 scroll-mt-24 guide-section">
          <h2 className="text-2xl font-bold text-gray-900 mb-5 pb-2 border-b border-gray-100">
            {GETTING_STARTED_SECTIONS.find(s => s.id === 'test-inquiry')?.title}
          </h2>
          <p className="text-[0.95rem] text-gray-600 leading-relaxed mb-6">
            실제 고객에게 공개하기 전에 테스트 문의를 남겨보면 문의 접수 흐름을 안전하게 확인할 수 있습니다.
          </p>

          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <div className="flex flex-col gap-6 relative before:absolute before:inset-0 before:ml-[1.125rem] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-200 before:to-transparent">
              
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                <div className="flex items-center justify-center w-9 h-9 rounded-full border-2 border-white bg-blue-100 text-blue-600 font-bold text-sm shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm z-10">
                  1
                </div>
                <div className="w-[calc(100%-3rem)] md:w-[calc(50%-2rem)] bg-white border border-gray-100 p-4 rounded-xl shadow-sm hover:shadow-md hover:border-blue-200 transition-all">
                  <h3 className="font-bold text-gray-800 text-[0.95rem] mb-1">플로팅 문의 버튼 클릭</h3>
                  <p className="text-[0.85rem] text-gray-600">웹사이트 우측 하단에 떠 있는 버튼을 눌러주세요.</p>
                </div>
              </div>

              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                <div className="flex items-center justify-center w-9 h-9 rounded-full border-2 border-white bg-blue-100 text-blue-600 font-bold text-sm shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm z-10">
                  2
                </div>
                <div className="w-[calc(100%-3rem)] md:w-[calc(50%-2rem)] bg-white border border-gray-100 p-4 rounded-xl shadow-sm hover:shadow-md hover:border-blue-200 transition-all">
                  <h3 className="font-bold text-gray-800 text-[0.95rem] mb-1">문의 유형 선택</h3>
                  <p className="text-[0.85rem] text-gray-600">미리 설정해둔 문의 유형 중 하나를 선택합니다.</p>
                </div>
              </div>

              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                <div className="flex items-center justify-center w-9 h-9 rounded-full border-2 border-white bg-blue-100 text-blue-600 font-bold text-sm shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm z-10">
                  3
                </div>
                <div className="w-[calc(100%-3rem)] md:w-[calc(50%-2rem)] bg-white border border-gray-100 p-4 rounded-xl shadow-sm hover:shadow-md hover:border-blue-200 transition-all">
                  <h3 className="font-bold text-gray-800 text-[0.95rem] mb-1">테스트 문의 내용 작성</h3>
                  <p className="text-[0.85rem] text-gray-600">이름, 연락처 등 정보와 함께 임의의 문의 내용을 입력합니다.</p>
                </div>
              </div>

              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                <div className="flex items-center justify-center w-9 h-9 rounded-full border-2 border-white bg-blue-100 text-blue-600 font-bold text-sm shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm z-10">
                  4
                </div>
                <div className="w-[calc(100%-3rem)] md:w-[calc(50%-2rem)] bg-white border border-gray-100 p-4 rounded-xl shadow-sm hover:shadow-md hover:border-blue-200 transition-all">
                  <h3 className="font-bold text-gray-800 text-[0.95rem] mb-1">문의 등록하기 클릭</h3>
                  <p className="text-[0.85rem] text-gray-600">작성을 완료하고 등록 버튼을 눌러 제출합니다.</p>
                </div>
              </div>

              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                <div className="flex items-center justify-center w-9 h-9 rounded-full border-2 border-white bg-blue-100 text-blue-600 font-bold text-sm shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm z-10">
                  5
                </div>
                <div className="w-[calc(100%-3rem)] md:w-[calc(50%-2rem)] bg-white border border-gray-100 p-4 rounded-xl shadow-sm hover:shadow-md hover:border-green-200 transition-all">
                  <h3 className="font-bold text-gray-800 text-[0.95rem] mb-1">문의 접수 상태 확인</h3>
                  <p className="text-[0.85rem] text-gray-600">제출 후 화면에서 '접수됨' 혹은 '확인중' 상태를 확인합니다.</p>
                </div>
              </div>

            </div>
          </div>
        </section>
      )}

      {/* Section 5 */}
      {GETTING_STARTED_SECTIONS.some(s => s.id === 'reply-test') && (
        <section id="reply-test" className="mb-14 scroll-mt-24 guide-section">
          <h2 className="text-2xl font-bold text-gray-900 mb-5 pb-2 border-b border-gray-100">
            {GETTING_STARTED_SECTIONS.find(s => s.id === 'reply-test')?.title}
          </h2>
          <p className="text-[0.95rem] text-gray-600 leading-relaxed mb-6">
            고객이 남긴 문의는 문의 관리 화면에 표시됩니다.<br />
            상담 담당자는 문의 목록에서 새 문의를 확인하고, 문의 상세 화면에서 내용을 확인한 뒤 답변을 등록합니다.
          </p>

          <div className="flex flex-col md:flex-row gap-3 items-stretch w-full mb-6 relative z-0">
            <div className="flex-1 bg-white p-4 rounded-xl border border-gray-200 text-center shadow-sm">
              <span className="block text-xs font-bold text-gray-400 mb-1">탐색</span>
              <span className="text-sm font-semibold text-gray-800">문의 목록 확인</span>
            </div>
            <ChevronRight className="hidden md:block w-5 h-5 text-gray-300 shrink-0 self-center" />
            <div className="flex-1 bg-white p-4 rounded-xl border border-gray-200 text-center shadow-sm">
              <span className="block text-xs font-bold text-gray-400 mb-1">조회</span>
              <span className="text-sm font-semibold text-gray-800">문의 상세 보기</span>
            </div>
            <ChevronRight className="hidden md:block w-5 h-5 text-gray-300 shrink-0 self-center" />
            <div className="flex-1 bg-white p-4 rounded-xl border border-gray-200 text-center shadow-sm">
              <span className="block text-xs font-bold text-gray-400 mb-1">대응</span>
              <span className="text-sm font-semibold text-gray-800">답변 작성</span>
            </div>
            <ChevronRight className="hidden md:block w-5 h-5 text-gray-300 shrink-0 self-center" />
            <div className="flex-1 bg-blue-50 p-4 rounded-xl border border-blue-100 text-center shadow-sm relative overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-1 bg-blue-400"></div>
              <span className="block text-xs font-bold text-blue-500 mb-1">처리</span>
              <span className="text-sm font-semibold text-blue-900">답변 등록</span>
            </div>
            <ChevronRight className="hidden md:block w-5 h-5 text-gray-300 shrink-0 self-center" />
            <div className="flex-1 bg-green-50 p-4 rounded-xl border border-green-200 text-center shadow-sm">
              <span className="block text-xs font-bold text-green-600 mb-1">고객 측</span>
              <span className="text-sm font-semibold text-green-900">문의창에서 답변 확인</span>
            </div>
          </div>

          <div className="w-full h-[300px] bg-gray-50 rounded-xl border border-gray-200 mb-6 flex items-center justify-center text-gray-400 font-medium tracking-wide">
            문의 목록과 답변 작성 화면 예시
          </div>
        </section>
      )}

      {/* Section 6 */}
      {GETTING_STARTED_SECTIONS.some(s => s.id === 'live-chat') && (
        <section id="live-chat" className="mb-14 scroll-mt-24 guide-section">
          <h2 className="text-2xl font-bold text-gray-900 mb-5 pb-2 border-b border-gray-100">
            {GETTING_STARTED_SECTIONS.find(s => s.id === 'live-chat')?.title}
          </h2>
          <p className="text-[0.95rem] text-gray-600 leading-relaxed mb-6">
            바로 대화가 필요한 상담이라면 실시간 채팅 상담도 함께 확인해보세요.<br />
            실시간 채팅 상담은 고객과 상담 담당자가 동시에 접속해 바로 대화하는 방식입니다.
          </p>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <h3 className="font-bold text-gray-900 text-[1rem] mb-1">실시간 대화가 필요한가요?</h3>
              <p className="text-[0.85rem] text-gray-500">실시간 채팅 상담의 흐름과 특징을 확인하거나, 바로 체험해볼 수 있습니다.</p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
               <button
                onClick={() => setActiveItem('실시간 채팅 상담')}
                className="px-4 py-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 text-[0.85rem] font-medium rounded-lg transition-colors"
              >
                실시간 채팅 상담 보기
              </button>
              <button
                 onClick={() => {
                  const topCta = document.querySelector('header button.bg-blue-600');
                  if (topCta) {
                    (topCta as HTMLButtonElement).click();
                  }
                }}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-[0.85rem] font-medium rounded-lg transition-colors"
              >
                실시간 상담 체험
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Section 7 */}
      {GETTING_STARTED_SECTIONS.some(s => s.id === 'next') && (
        <section id="next" className="scroll-mt-24 guide-section">
          <h2 className="text-2xl font-bold text-gray-900 mb-5 pb-2 border-b border-gray-100">
            {GETTING_STARTED_SECTIONS.find(s => s.id === 'next')?.title}
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div onClick={() => setActiveItem('게시판형 채팅')} className="group cursor-pointer p-5 bg-white border border-gray-200 hover:border-blue-300 rounded-xl shadow-sm hover:shadow-md transition-all flex flex-col gap-2">
              <h3 className="font-bold text-gray-800 text-[0.95rem] group-hover:text-blue-700 transition-colors flex items-center justify-between">
                게시판형 채팅 <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
              </h3>
              <p className="text-[0.85rem] text-gray-600 leading-relaxed">
                고객이 문의를 남기는 화면과 흐름을 자세히 확인합니다.
              </p>
            </div>
            <div onClick={() => setActiveItem('문의 관리')} className="group cursor-pointer p-5 bg-white border border-gray-200 hover:border-blue-300 rounded-xl shadow-sm hover:shadow-md transition-all flex flex-col gap-2">
               <h3 className="font-bold text-gray-800 text-[0.95rem] group-hover:text-blue-700 transition-colors flex items-center justify-between">
                문의 관리 <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
              </h3>
              <p className="text-[0.85rem] text-gray-600 leading-relaxed">
                상담 담당자가 문의를 확인하고 답변하는 방법을 확인합니다.
              </p>
            </div>
            <div onClick={() => setActiveItem('설정 관리')} className="group cursor-pointer p-5 bg-white border border-gray-200 hover:border-blue-300 rounded-xl shadow-sm hover:shadow-md transition-all flex flex-col gap-2">
              <h3 className="font-bold text-gray-800 text-[0.95rem] group-hover:text-blue-700 transition-colors flex items-center justify-between">
                설정 관리 <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
              </h3>
              <p className="text-[0.85rem] text-gray-600 leading-relaxed">
                문의 유형, 입력 항목, 담당자 권한 설정을 확인합니다.
              </p>
            </div>
            <div onClick={() => setActiveItem('실시간 채팅 상담')} className="group cursor-pointer p-5 bg-white border border-gray-200 hover:border-blue-300 rounded-xl shadow-sm hover:shadow-md transition-all flex flex-col gap-2">
              <h3 className="font-bold text-gray-800 text-[0.95rem] group-hover:text-blue-700 transition-colors flex items-center justify-between">
                실시간 채팅 상담 <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
              </h3>
              <p className="text-[0.85rem] text-gray-600 leading-relaxed">
                고객과 상담 담당자가 실시간으로 대화하는 상담 방식을 확인합니다.
              </p>
            </div>
          </div>
        </section>
      )}

    </div>
  );
};

const BoardChatDoc = ({ setActiveItem }: { setActiveItem: (item: string) => void }) => {
  return (
    <div className="max-w-3xl">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-[13.5px] text-slate-500 mb-6 font-medium">
        <Link to="/" className="hover:text-slate-900 transition-colors">홈</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-slate-800">가이드 문서</span>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-blue-600 font-semibold">게시판형 채팅</span>
      </div>

      <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-950 mb-6 pt-2">
        게시판형 채팅
      </h1>
      
      <p className="text-[15.5px] text-slate-705 leading-[1.75] mb-12">
        게시판형 채팅은 고객이 웹사이트에서 채팅처럼 편안하게 문의를 남기고, 답변을 다시 손쉽게 확인할 수 있는 비동기식 문의 접수 솔루션입니다. 상담 담당자는 통합 문의 관리 데스크톱 화면에서 접수한 내용을 확인하고 명쾌한 피드백을 등록할 수 있습니다.
      </p>

      {/* Section 1 */}
      <section id="intro" className="mb-14 scroll-mt-[120px] guide-section">
        <h2 className="text-2xl font-bold text-slate-950 mb-5 pb-2 border-b border-slate-100">1. 게시판형 채팅이란?</h2>
        <p className="text-[15.5px] text-slate-705 leading-[1.75] mb-6">
          게시판형 채팅은 고객과 실시간으로 매번 대기를 소모하며 맞닿아 있는 대화 방식이 아닙니다. 고객이 문의를 투고하면 상담원이 이를 시간차를 두고 읽은 뒤 양질의 피드백을 게시판처럼 달아 주는 유연함을 지니고 있습니다.
          고객은 웹사이트 우측 하단에 뜨는 친근한 플로팅 문의하기 단추를 눌러 상세히 접수하고, 다시 재접속 시 이전 접수처와 일대일 매치되는 챗창 화면을 통해 등록된 조치를 즉시 받아봅니다.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="bg-slate-50/60 border border-slate-200/50 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between h-full hover:border-slate-350">
            <div>
              <div className="w-11 h-11 rounded-xl bg-blue-100/70 text-blue-700 flex items-center justify-center mb-5 font-bold">
                <MessageSquare className="w-5.5 h-5.5" />
              </div>
              <h4 className="font-bold text-slate-950 text-[16px] mb-2.5">채팅처럼 문의 등록</h4>
              <p className="text-[14.5px] text-slate-600 leading-[1.65]">
                고객은 웹사이트에서 지루하고 번거로운 서식 대신 메신저 대화처럼 매우 신속하고 친밀한 인터페이스로 고유 문의를 남깁니다.
              </p>
            </div>
          </div>

          <div className="bg-slate-50/60 border border-slate-200/50 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between h-full hover:border-slate-350">
            <div>
              <div className="w-11 h-11 rounded-xl bg-indigo-100/70 text-indigo-700 flex items-center justify-center mb-5 font-bold">
                <Check className="w-5.5 h-5.5" />
              </div>
              <h4 className="font-bold text-slate-950 text-[16px] mb-2.5">답변 대기 후 확인</h4>
              <p className="text-[14.5px] text-slate-600 leading-[1.65]">
                운영단에서 정중히 답변을 남기는 순간, 사용자는 별도 확인 메일함 필터링 없이 언제나 동일 문의 도구에서 완료된 답변을 정독할 수 있습니다.
              </p>
            </div>
          </div>

          <div className="bg-slate-50/60 border border-slate-200/50 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between h-full hover:border-slate-350">
            <div>
              <div className="w-11 h-11 rounded-xl bg-emerald-100/70 text-emerald-700 flex items-center justify-center mb-5 font-bold">
                <Clock className="w-5.5 h-5.5" />
              </div>
              <h4 className="font-bold text-slate-950 text-[16px] mb-2.5">실시간 대기 부담 해소</h4>
              <p className="text-[14.5px] text-slate-600 leading-[1.65]">
                담당 전담 인력이 항시 수하에 배치되어 밀착 응대하지 않더라도, 여유 스케줄에 노선화해 일대일 문의를 효율적으로 해결합니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2 */}
      <section id="customer-flow" className="mb-14 scroll-mt-[120px] guide-section">
        <h2 className="text-2xl font-bold text-slate-950 mb-5 pb-2 border-b border-slate-100">2. 고객의 문의 접수 흐름</h2>
        <p className="text-[15.5px] text-slate-705 leading-[1.75] mb-6">
          고객은 아래와 같이 직관적이고 군더더기 없이 조율된 웹 흐름에 탑승해 빠른 해결책을 수급받습니다.
        </p>

        {/* 흐름 일러스트레이션 카드 - 텍스트 마이크로화 해결 */}
        <div className="bg-blue-50/50 border border-blue-100/70 p-6 rounded-2xl mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-5 text-center sm:text-left">
            <div className="flex items-center gap-3.5 bg-white p-3.5 rounded-xl border border-blue-100/50 shadow-xs">
              <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center text-[14px] font-bold shrink-0 shadow-sm">1</div>
              <div>
                <h5 className="font-bold text-slate-950 text-[14.5px] mb-0.5">문의 시작</h5>
                <p className="text-[12.5px] text-slate-500 m-0">우측 하단 버튼 클릭</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3.5 bg-white p-3.5 rounded-xl border border-blue-100/50 shadow-xs">
              <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center text-[14px] font-bold shrink-0 shadow-sm">2</div>
              <div>
                <h5 className="font-bold text-slate-950 text-[14.5px] mb-0.5">내용 작성</h5>
                <p className="text-[12.5px] text-slate-500 m-0">유형 및 정보 기입</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5 bg-white p-3.5 rounded-xl border border-blue-100/50 shadow-xs">
              <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center text-[14px] font-bold shrink-0 shadow-sm">3</div>
              <div>
                <h5 className="font-bold text-slate-950 text-[14.5px] mb-0.5">문의 등록</h5>
                <p className="text-[12.5px] text-slate-500 m-0">접수 완료 후 대기</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5 bg-white p-3.5 rounded-xl border border-blue-100/50 shadow-xs">
              <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center text-[14px] font-bold shrink-0 shadow-sm">4</div>
              <div>
                <h5 className="font-bold text-slate-950 text-[14.5px] mb-0.5">답변 확인</h5>
                <p className="text-[12.5px] text-slate-500 m-0">피드백과 답변 정독</p>
              </div>
            </div>
          </div>
        </div>

        {/* 가이드창 목업도 고유 가독성 디테일 적용 */}
        <div className="flex justify-center mb-6">
          <div className="w-[310px] bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden flex flex-col transition-all hover:shadow-2xl">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4.5 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="relative">
                  <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center text-white">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-slate-900 absolute -bottom-0.5 -right-0.5"></div>
                </div>
                <div>
                  <h4 className="font-bold text-[14px] tracking-tight m-0 text-white">GrowTalk 문의 접수</h4>
                  <p className="text-[11.5px] text-blue-105 m-0 p-0">보통 1시간 이내에 답변을 드려요</p>
                </div>
              </div>
              <span className="text-[11px] font-bold text-white bg-black/25 px-2 py-0.5 rounded">게시판형</span>
            </div>

            <div className="p-5 space-y-4 text-[13.5px]">
              <div className="bg-blue-50/60 p-3.5 rounded-xl border border-blue-100/50">
                <p className="text-blue-950 leading-[1.65] text-[13.5px] m-0">
                  안녕하세요! <strong>인피드 문의 도구</strong>입니다. 문의를 적어두시면 확인 즉시 피드백을 전달드립니다.
                </p>
              </div>
              <div className="space-y-2">
                <label className="block text-[12.5px] font-bold text-slate-700 m-0">문의 유형 선택</label>
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-700 text-[13.5px] flex justify-between items-center cursor-pointer">
                  <span>이용 문의 / 계약 및 견적 문의</span>
                  <span className="text-slate-400 text-xs">▼</span>
                </div>
              </div>
              <div className="space-y-2">
                <label className="block text-[12.5px] font-bold text-slate-700 m-0">성함</label>
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-450 text-[13.5px]">홍길동</div>
              </div>
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-xl text-[13.5px] transition-colors shadow-md">
                문의 접수 완료
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3 */}
      <section id="write-inquiry" className="mb-14 scroll-mt-[120px] guide-section">
        <h2 className="text-2xl font-bold text-slate-950 mb-5 pb-2 border-b border-gray-100">3. 문의 작성 화면 이해하기</h2>
        <p className="text-[15.5px] text-slate-705 leading-[1.75] mb-6">
          문의 접수 양식 패널에서는 소통 담당자가 인피드 처리를 가속할 수 있도록 대분류 및 핵심 메타데이터를 정식으로 수집합니다.
          해당 분야 구성(세부 유형 등)은 언제나 <span className="text-blue-600 font-semibold cursor-pointer hover:underline" onClick={() => setActiveItem('설정 관리')}>설정 관리 가이드</span> 부분 혹은 담당 관리자 셋업 코너에서 커스터마이징할 수 있습니다.
        </p>

        {/* 입력 항목 카드 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
          <div className="p-6 bg-white border border-slate-200/60 rounded-2xl shadow-sm flex flex-col justify-between h-full">
            <div>
              <h4 className="font-bold text-slate-950 text-[16px] mb-2.5">문의 유형</h4>
              <p className="text-[14.5px] text-slate-650 leading-[1.65]">
                서비스 이용 가이드, 계약 제휴, 파손 피드백처럼 수신 담당 부서 분류를 자동화하고 수고를 절반으로 아우르는 필수 드롭다운 항목입니다.
              </p>
            </div>
          </div>

          <div className="p-6 bg-white border border-slate-200/60 rounded-2xl shadow-sm flex flex-col justify-between h-full">
            <div>
              <h4 className="font-bold text-slate-950 text-[16px] mb-2.5">성명 (이름)</h4>
              <p className="text-[14.5px] text-slate-650 leading-[1.65]">
                고객 및 잠재 리드 바이어 정보의 실제 식별과 실시간 친근한 매칭 호명에 적극 호응되는 텍스트 기본 영역입니다.
              </p>
            </div>
          </div>

          <div className="p-6 bg-white border border-slate-200/60 rounded-2xl shadow-sm flex flex-col justify-between h-full">
            <div>
              <h4 className="font-bold text-slate-950 text-[16px] mb-2.5">연락처 및 회신 이메일</h4>
              <p className="text-[14.5px] text-slate-650 leading-[1.65]">
                고객 고유 번호 key를 분별해주며 향후 비상 연락 회신, 혹은 이전 히스토리를 묶어내는 데이터 동기화의 든든한 가교입니다.
              </p>
            </div>
          </div>

          <div className="p-6 bg-white border border-slate-200/60 rounded-2xl shadow-sm flex flex-col justify-between h-full">
            <div>
              <h4 className="font-bold text-slate-950 text-[16px] mb-2.5">본문 기술 내용</h4>
              <p className="text-[14.5px] text-slate-650 leading-[1.65]">
                질답의 메인이 되는 줄글 영역으로, 요구 오류 내용이나 협상 디테일을 글자 수 제한 없이 정밀 기록하는 코어 공간입니다.
              </p>
            </div>
          </div>

          <div className="p-6 bg-white border border-slate-200/60 rounded-2xl shadow-sm sm:col-span-2 flex flex-col justify-between h-full">
            <div>
              <h4 className="font-bold text-slate-950 text-[16px] mb-2.5">문제 증빙 파일 전송</h4>
              <p className="text-[14.5px] text-slate-650 leading-[1.65]">
                스마트폰 스크린샷 캡쳐본 또는 현장 업무 매뉴얼 문서 파일을 끌어서 첨부해 빠른 인식을 도우는 보조 기능입니다.
              </p>
            </div>
          </div>
        </div>

        {/* 팁 안내 박스 가독성 높인 버전 */}
        <div className="p-5 bg-amber-50/70 border border-amber-200/60 rounded-2xl text-[14.5px] text-amber-900 leading-relaxed flex items-start gap-3">
          <span className="text-amber-600 font-bold shrink-0 text-[16px]">💡</span>
          <div>
            <strong className="block text-amber-950 text-[15px] mb-1">수집 항목 설정 팁</strong>
            <p className="text-[14px] text-amber-900 leading-[1.65] m-0">
              초장부터 너무나 긴 질문 서식을 채워 넣도록 권고하는 것은 고객의 상담 이탈률을 높이는 부작용을 야기합니다. 수습에 필수적인 서네 개 필드만 배치해 리더 확보를 빠르게 선점하는 것을 적극 조언 드립니다.
            </p>
          </div>
        </div>
      </section>

      {/* Section 4 */}
      <section id="answer-check" className="mb-14 scroll-mt-[120px] guide-section">
        <h2 className="text-2xl font-bold text-slate-950 mb-5 pb-2 border-b border-gray-100">4. 답변 대기와 답변 확인</h2>
        <p className="text-[15.5px] text-slate-705 leading-[1.75] mb-6">
          게시판형의 특수성상 사용자가 문의를 놓고 나간 이후 진척도를 직관적으로 마주할 수 있도록 이정표 표시가 필수 요구됩니다.
          안정적인 알람과 세 상태 구성을 통해 조급한 재문의를 방지하고 브랜드 충성도를 강화하십시오.
        </p>

        {/* 상태 설명 3단 카드 구성 - 텍스트 마이크로화 완전 퇴출 */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-6">
          <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-sm hover:border-slate-350 transition-colors">
            <h4 className="font-bold text-slate-950 text-base mb-2.5 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-orange-400"></span>
              접수 및 대기
            </h4>
            <p className="text-[14.5px] text-slate-650 leading-relaxed">
              고객이 문의를 성공적으로 발송하여 데이터베이스에 조치 대기로 안전하게 봉인된 최초 진입 상태입니다.
            </p>
          </div>

          <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-sm hover:border-slate-350 transition-colors">
            <h4 className="font-bold text-slate-950 text-base mb-2.5 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
              확인 중
            </h4>
            <p className="text-[14.5px] text-slate-650 leading-relaxed">
              상담 담당자가 관리단 대시보드 화면에 접속해 현재 문제의 경위와 정체 맥락을 활발히 검토하고 조율 중인 단계입니다.
            </p>
          </div>

          <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-sm hover:border-slate-350 transition-colors">
            <h4 className="font-bold text-slate-950 text-base mb-2.5 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              답변 완료
            </h4>
            <p className="text-[14.5px] text-slate-650 leading-relaxed">
              안내가 수록 완료되어 사용자가 플로팅 위젯의 일대일 대화 창을 열고 완성도 높은 답변을 실시간으로 보는 완료 상태입니다.
            </p>
          </div>
        </div>
      </section>

      {/* Section 5 */}
      <section id="section-4" className="mb-14 scroll-mt-[120px] guide-section">
        <h2 className="text-2xl font-bold text-slate-950 mb-5 pb-2 border-b border-gray-100">5. 회원/비회원 문의 확인 방식</h2>
        <p className="text-[15.5px] text-slate-705 leading-[1.75] mb-6">
          GrowTalk은 계정이 연동되지 않은 비회원 상태라 할지라도 문의 이력을 안전하게 조회하고 추적할 수 있도록 지원합니다. 로그인 상태에 따른 세부 특징은 다음과 같습니다.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
          <div className="p-6 bg-white border border-slate-200/60 rounded-2xl shadow-sm flex flex-col justify-between h-full">
            <div>
              <h4 className="font-bold text-slate-950 text-[16px] mb-3">회원 전용 세션</h4>
              <p className="text-[14.5px] text-slate-650 leading-relaxed mb-4">
                브랜드 도메인의 통합 소셜 로그인이나 정식 가입을 마친 고객입니다. 평생 안전한 DB 조회 및 누적된 질답 이정표를 보존합니다.
              </p>
            </div>
          </div>

          <div className="p-6 bg-white border border-slate-200/60 rounded-2xl shadow-sm flex flex-col justify-between h-full">
            <div>
              <h4 className="font-bold text-slate-950 text-[16px] mb-3">비회원 전용 세션</h4>
              <ul className="space-y-2 text-[14px] text-slate-650 leading-relaxed">
                <li className="flex items-start gap-2"><Check className="w-4 h-4 text-indigo-500 shrink-0 mt-1" /> 번잡한 소셜 로그인 없이 1초만에 다이렉트로 문의 작성</li>
                <li className="flex items-start gap-2"><Check className="w-4 h-4 text-indigo-500 shrink-0 mt-1" /> 브라우저 로컬 스토리지에 한시 박제되어 현재 사용 기기에서 확인</li>
                <li className="flex items-start gap-2"><Check className="w-4 h-4 text-indigo-500 shrink-0 mt-1" /> 기기가 바뀌거나 캐시 메모리가 청소되면 이력 식별 조회 제한</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="p-5 bg-slate-50 border border-slate-200/60 rounded-2xl text-[14.5px] text-slate-600 leading-relaxed">
          💡 <strong>운영진 안내 ∙</strong> 비회원 전용 세션은 브라우저 쿠키 소거 시 소실 염려가 있으므로 장기 제휴 및 단가가 높은 딜러들과 연합해야 할 경우 가급적 로그인 가입 권장을 적극 독려하시기 바랍니다.
        </div>
      </section>


      {/* Section 6 */}
      <section id="agent-reply" className="mb-14 scroll-mt-[120px] guide-section">
        <h2 className="text-2xl font-bold text-slate-950 mb-5 pb-2 border-b border-gray-100">6. 고객 문의 답변 관리</h2>
        <p className="text-[15.5px] text-slate-705 leading-[1.75] mb-6">
          고객의 정성 어린 피드백은 당사의 백그라운드 관리 전용 뷰어에 투명하게 상영됩니다.
          실무자들은 상태 필터를 통해 적체 문의를 거르고 꼼꼼하게 일괄 및 부분 답변을 처리해 명쾌함을 보강합니다.
        </p>

        {/* 간단 흐름 카드 - 가독성 향상 복구 */}
        <div className="p-5 bg-gradient-to-r from-slate-50 to-slate-100/50 border border-slate-200/60 rounded-2xl mb-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-center">
            <div className="flex-1 bg-white border border-slate-200/50 rounded-xl p-3 shadow-xs">
              <span className="block font-bold text-slate-900 text-[14px]">1. 문의 등록</span>
              <span className="text-xs text-slate-500">고객이 질문 작성</span>
            </div>
            <span className="text-slate-400 font-bold hidden md:inline">➔</span>
            <div className="flex-1 bg-white border border-slate-200/50 rounded-xl p-3 shadow-xs">
              <span className="block font-bold text-slate-900 text-[14px]">2. 대시보드 표시</span>
              <span className="text-xs text-slate-500">문의 관리 리스트 노출</span>
            </div>
            <span className="text-slate-400 font-bold hidden md:inline">➔</span>
            <div className="flex-1 bg-white border border-slate-200/50 rounded-xl p-3 shadow-xs">
              <span className="block font-bold text-slate-900 text-[14px]">3. 담당자 확인</span>
              <span className="text-xs text-slate-500">내용 파악 및 준비</span>
            </div>
            <span className="text-slate-400 font-bold hidden md:inline">➔</span>
            <div className="flex-1 bg-white border border-slate-200/50 rounded-xl p-3 shadow-xs">
              <span className="block font-bold text-slate-900 text-[14px]">4. 답변 등록</span>
              <span className="text-xs text-slate-500">정밀 피드백 저장</span>
            </div>
            <span className="text-slate-400 font-bold hidden md:inline">➔</span>
            <div className="flex-1 bg-white border border-slate-200/50 rounded-xl p-3 shadow-xs">
              <span className="block font-bold text-slate-900 text-[14px]">5. 고객 확인</span>
              <span className="text-xs text-slate-500">동기화된 채팅창 조회</span>
            </div>
          </div>
        </div>

        {/* CTA 카드 */}
        <div className="p-7 bg-gradient-to-br from-blue-50 via-white to-blue-50/20 border border-blue-100 rounded-2xl flex items-center justify-between cursor-pointer group hover:shadow-md transition-all" onClick={() => setActiveItem('문의 관리')}>
          <div>
            <h4 className="font-bold text-blue-950 text-[16.5px] sm:text-[17.5px] mb-2">문의 관리 문서에서 자세한 방법 보기</h4>
            <p className="text-[14.5px] text-slate-600 leading-[1.65]">상담 담당자 전용 대시보드를 사용하여 문의 현황 일람과 수금, 필터링 기법 등을 자세히 체크해 보세요.</p>
          </div>
          <ChevronRight className="w-5 h-5 text-blue-600 group-hover:translate-x-1.5 transition-transform shrink-0" />
        </div>
      </section>

      {/* Section 7 */}
      <section id="next" className="mb-10 scroll-mt-[120px] guide-section">
        <h2 className="text-2xl font-bold text-slate-950 mb-5 pb-2 border-b border-slate-100">7. 다음에 볼 문서</h2>
        
        {/* 관련 문서 카드 - 여백 4px 늘리고 텍스트 키움 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div onClick={() => setActiveItem('문의 관리')} className="group cursor-pointer p-6 bg-white border border-slate-200/80 hover:border-blue-400 rounded-2xl shadow-sm hover:shadow-md transition-all flex justify-between items-center h-full hover:-translate-y-0.5">
            <div>
              <h5 className="font-bold text-slate-950 text-[16px] group-hover:text-blue-600 transition-colors mb-1.5">문의 관리</h5>
              <p className="text-[14px] text-slate-600 leading-relaxed mt-0.5">상담 담당자가 문의를 실시간으로 확인하고 세심한 답변을 기입합니다.</p>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all shrink-0 ml-3" />
          </div>

          <div onClick={() => setActiveItem('설정 관리')} className="group cursor-pointer p-6 bg-white border border-slate-200/80 hover:border-blue-400 rounded-2xl shadow-sm hover:shadow-md transition-all flex justify-between items-center h-full hover:-translate-y-0.5">
            <div>
              <h5 className="font-bold text-slate-950 text-[16px] group-hover:text-blue-600 transition-colors mb-1.5">설정 관리</h5>
              <p className="text-[14px] text-slate-600 leading-relaxed mt-0.5">문의 유형, 입력 필수란 지정, 그리고 담당 멤버 권한을 지정합니다.</p>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all shrink-0 ml-3" />
          </div>

          <div onClick={() => setActiveItem('실시간 채팅 상담')} className="group cursor-pointer p-6 bg-white border border-slate-200/80 hover:border-blue-400 rounded-2xl shadow-sm hover:shadow-md transition-all flex justify-between items-center h-full hover:-translate-y-0.5">
            <div>
              <h5 className="font-bold text-slate-950 text-[16px] group-hover:text-blue-600 transition-colors mb-1.5">실시간 채팅 상담</h5>
              <p className="text-[14px] text-slate-600 leading-relaxed mt-0.5">고객과 상담 멤버가 실시간으로 소통하며 즉각 해결하는 상담 기법입니다.</p>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all shrink-0 ml-3" />
          </div>

          <div onClick={() => setActiveItem('문제 해결')} className="group cursor-pointer p-6 bg-white border border-slate-200/80 hover:border-blue-400 rounded-2xl shadow-sm hover:shadow-md transition-all flex justify-between items-center h-full hover:-translate-y-0.5">
            <div>
              <h5 className="font-bold text-slate-950 text-[16px] group-hover:text-blue-600 transition-colors mb-1.5">문제 해결</h5>
              <p className="text-[14px] text-slate-600 leading-relaxed mt-0.5">문의 미적재, 답글 비노출 등 예외 상황 발생 시 신속히 복원하는 체크리스트입니다.</p>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all shrink-0 ml-3" />
          </div>
        </div>
      </section>

    </div>
  );
};

const LiveChatDoc = ({ setActiveItem }: { setActiveItem: (item: string) => void }) => {
  return (
    <div className="max-w-3xl">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-6 font-medium">
        <Link to="/" className="hover:text-gray-900 transition-colors">홈</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-gray-900">가이드 문서</span>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-blue-600 font-semibold">실시간 채팅 상담</span>
      </div>

      <div className="mb-6 flex items-start justify-between">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 pt-2">
          실시간 채팅 상담
        </h1>
        <span className="mt-3 px-2 py-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-[0.7rem] font-bold rounded shadow-sm flex items-center gap-1 leading-none uppercase tracking-wider">
          Pro Plan
        </span>
      </div>
      
      <p className="text-[0.95rem] text-gray-600 leading-relaxed mb-12">
        상담 담당자가 대기 중인 동안 사이트 방문자와 즉시 대화를 나눌 수 있는 최고 효율의 실시간 소통 채널입니다. 긴급 확인, 상담 연결성 및 확실한 클로징이 필요한 비즈니스 협의에 추천합니다.
      </p>

      {/* Section 1 */}
      <section id="intro" className="mb-14 scroll-mt-[120px] guide-section">
        <h2 className="text-2xl font-bold text-gray-900 mb-5 pb-2 border-b border-gray-100">1. 실시간 채팅 상담이란?</h2>
        <p className="text-[0.95rem] text-gray-600 leading-relaxed mb-6">
          실시간 채팅은 동일 시간대에 고객과 담당자가 직접적으로 쌍방향 소통하며 신속히 응대하는 강력한 솔루션입니다.
          비동기식 게시판 채팅과는 다르게, 실시간 매칭이 이뤄진 기점부터 채팅창에서 곧바로 일대일 집중 상담이 실시됩니다.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
            <h3 className="font-bold text-gray-900 text-[16px] mb-3 flex items-center gap-2">
               🖥️ 데스크탑/모바일 고객
            </h3>
            <ul className="text-[14.5px] text-gray-650 leading-relaxed space-y-2 list-disc list-inside">
              <li>사이트에 접속해 플로팅 버튼 클릭</li>
              <li>상담 담당자가 온라인일 경우 실시간 채팅 시작</li>
              <li>궁금한 점을 메신저처럼 즉시 대화</li>
              <li>상담 종료 시 이전 대화 내역 조회 가능</li>
            </ul>
          </div>
          <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-5">
            <h3 className="font-bold text-blue-900 text-[16px] mb-3 flex items-center gap-2">
               🎧 상담 담당자
            </h3>
            <ul className="text-[14.5px] text-gray-650 leading-relaxed space-y-2 list-disc list-inside">
              <li>대시보드에서 '실시간 상담 가능' 전환 대기</li>
              <li>알림음과 동시에 들어온 요청방 확인 및 진입</li>
              <li>참여하여 고객 요청에 명쾌히 양방향 피드백</li>
              <li>상담을 종료하고 관련 핵심 사항 내부 정리</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Section 2 */}
      <section id="customer-start" className="mb-14 scroll-mt-[120px] guide-section">
        <h2 className="text-2xl font-bold text-gray-900 mb-5 pb-2 border-b border-gray-100">2. 고객은 어떻게 상담을 시작하나요?</h2>
        <p className="text-[0.95rem] text-gray-600 leading-relaxed mb-6">
          인위적인 절차나 불필요한 번거로움 없이 고객이 채널의 흐름을 시작하는 과정은 다음과 같이 직관적입니다.
        </p>
        
        <div className="space-y-4">
          <div className="flex gap-4 p-5 bg-white border border-gray-200 rounded-xl shadow-xs">
            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-bold flex items-center justify-center shrink-0 text-sm">1</div>
            <div>
              <h4 className="font-bold text-gray-950 text-[15.5px] mb-1">상담 위젯 활성화</h4>
              <p className="text-[14.5px] text-gray-500 leading-relaxed m-0">
                도메인 화면 우측 하단의 플로팅 아이콘을 누르면, 현재 개설되어 운영 중인 소통 창이 부드러운 모션과 함께 열립니다.
              </p>
            </div>
          </div>
          <div className="flex gap-4 p-5 bg-white border border-gray-200 rounded-xl shadow-xs">
            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-bold flex items-center justify-center shrink-0 text-sm">2</div>
            <div>
              <h4 className="font-bold text-gray-950 text-[15.5px] mb-1">실시간 대화 버튼 선택</h4>
              <p className="text-[14.5px] text-gray-500 leading-relaxed m-0">
                게시물 형태의 비동기 접수와 다른 '실시간 일대일 채팅 상담 시작' 전용 버튼을 선택하여 바로 세션을 형성합니다.
              </p>
            </div>
          </div>
          <div className="flex gap-4 p-5 bg-white border border-gray-200 rounded-xl shadow-xs">
            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-bold flex items-center justify-center shrink-0 text-sm">3</div>
            <div>
              <h4 className="font-bold text-gray-950 text-[15.5px] mb-1">안내 확인 및 대화 진행</h4>
              <p className="text-[14.5px] text-gray-500 leading-relaxed m-0">
                접수 대기가 활성화되고, 대시보드 안의 상담 담당자가 방을 수용한 뒤 본격적이고 유기적인 대화가 개시됩니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3 */}
      <section id="agent-response" className="mb-14 scroll-mt-[120px] guide-section">
        <h2 className="text-2xl font-bold text-gray-900 mb-5 pb-2 border-b border-gray-100">3. 상담 담당자는 어떻게 응대하나요?</h2>
        <p className="text-[0.95rem] text-gray-650 leading-relaxed mb-6">
          상담방에는 기본적으로 고객과 상담 담당자 1명이 참여합니다.<br/>
          상담 내용에 따라 다른 상담 담당자가 같은 상담방에 함께 참여할 수 있으며, 여러 상담 담당자가 고객 응대를 함께 진행할 수 있습니다.<br/>
          또한 상담 담당자끼리는 고객에게 보이지 않는 내부 대화를 통해 응대 방향이나 확인이 필요한 내용을 공유할 수 있습니다.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-5 bg-white border border-gray-200 rounded-xl shadow-xs flex items-start gap-3.5 hover:border-gray-300 transition-colors">
            <div className="w-9 h-9 rounded bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 text-lg font-semibold">📥</div>
            <div>
              <h4 className="font-bold text-gray-950 text-[15.5px] mb-1.5">상담방 참여</h4>
              <p className="text-[14.5px] text-gray-500 leading-relaxed m-0">상담 담당자는 고객 상담방에 입장해 실시간으로 답변합니다.</p>
            </div>
          </div>

          <div className="p-5 bg-white border border-gray-200 rounded-xl shadow-xs flex items-start gap-3.5 hover:border-gray-300 transition-colors">
            <div className="w-9 h-9 rounded bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 text-lg font-semibold">👥</div>
            <div>
              <h4 className="font-bold text-gray-950 text-[15.5px] mb-1.5">다중 상담 참여</h4>
              <p className="text-[14.5px] text-gray-500 leading-relaxed m-0">필요한 경우 다른 상담 담당자가 같은 상담방에 함께 참여할 수 있습니다.</p>
            </div>
          </div>

          <div className="p-5 bg-white border border-gray-200 rounded-xl shadow-xs flex items-start gap-3.5 hover:border-gray-300 transition-colors">
            <div className="w-9 h-9 rounded bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 text-lg font-semibold">🔒</div>
            <div>
              <h4 className="font-bold text-gray-950 text-[15.5px] mb-1.5">내부 대화</h4>
              <p className="text-[14.5px] text-gray-500 leading-relaxed m-0">상담 담당자끼리 고객에게 보이지 않는 내부 대화를 나눌 수 있습니다.</p>
            </div>
          </div>

          <div className="p-5 bg-white border border-gray-200 rounded-xl shadow-xs flex items-start gap-3.5 hover:border-gray-300 transition-colors">
            <div className="w-9 h-9 rounded bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 text-lg font-semibold">🔍</div>
            <div>
              <h4 className="font-bold text-gray-950 text-[15.5px] mb-1.5">고객 정보 확인</h4>
              <p className="text-[14.5px] text-gray-500 leading-relaxed m-0">상담 중 필요한 고객 정보와 이전 상담 이력을 확인합니다.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4 */}
      <section id="features" className="mb-14 scroll-mt-[120px] guide-section">
        <h2 className="text-2xl font-bold text-gray-900 mb-5 pb-2 border-b border-gray-100">4. 상담 중 사용할 수 있는 기능</h2>
        <p className="text-[0.95rem] text-gray-650 leading-relaxed mb-6">
          고객 응대와 상담의 능률을 동시에 격상하는 전문화된 도구들을 제공합니다.
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-5 bg-white border border-gray-200 rounded-xl shadow-xs flex items-start gap-3.5 hover:border-gray-300 transition-colors">
            <div className="w-9 h-9 rounded bg-sky-50 text-sky-600 flex items-center justify-center shrink-0 text-lg">💬</div>
            <div>
              <h4 className="font-bold text-gray-950 text-[15.5px] mb-1.5">채팅 메시지 전송</h4>
              <p className="text-[14.5px] text-gray-500 leading-relaxed m-0">고객에게 텍스트 메시지를 보냅니다.</p>
            </div>
          </div>

          <div className="p-5 bg-white border border-gray-200 rounded-xl shadow-xs flex items-start gap-3.5 hover:border-gray-300 transition-colors">
            <div className="w-9 h-9 rounded bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 text-lg">📁</div>
            <div>
              <h4 className="font-bold text-gray-950 text-[15.5px] mb-1.5">이미지/파일 확인</h4>
              <p className="text-[14.5px] text-gray-500 leading-relaxed m-0">고객이 보낸 이미지나 파일을 확인합니다.</p>
            </div>
          </div>

          <div className="p-5 bg-white border border-gray-200 rounded-xl shadow-xs flex items-start gap-3.5 hover:border-gray-300 transition-colors">
            <div className="w-9 h-9 rounded bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 text-lg">🔍</div>
            <div>
              <h4 className="font-bold text-gray-950 text-[15.5px] mb-1.5">고객 정보 확인</h4>
              <p className="text-[14.5px] text-gray-500 leading-relaxed m-0">상담 중 고객 정보를 함께 확인합니다.</p>
            </div>
          </div>

          <div className="p-5 bg-white border border-gray-200 rounded-xl shadow-xs flex items-start gap-3.5 hover:border-gray-300 transition-colors">
            <div className="w-9 h-9 rounded bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 text-lg">👥</div>
            <div>
              <h4 className="font-bold text-gray-950 text-[15.5px] mb-1.5">다중 상담 참여</h4>
              <p className="text-[14.5px] text-gray-500 leading-relaxed m-0">다른 상담 담당자가 같은 상담방에 참여해 함께 고객을 응대할 수 있습니다.</p>
            </div>
          </div>

          <div className="p-5 bg-white border border-gray-200 rounded-xl shadow-xs flex items-start gap-3.5 hover:border-gray-300 transition-colors">
            <div className="w-9 h-9 rounded bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 text-lg">🔒</div>
            <div>
              <h4 className="font-bold text-gray-950 text-[15.5px] mb-1.5">내부 대화</h4>
              <p className="text-[14.5px] text-gray-500 leading-relaxed m-0">상담 담당자끼리 고객에게 보이지 않는 대화를 나눌 수 있습니다.</p>
            </div>
          </div>

          <div className="p-5 bg-white border border-gray-200 rounded-xl shadow-xs flex items-start gap-3.5 hover:border-gray-300 transition-colors">
            <div className="w-9 h-9 rounded bg-teal-50 text-teal-600 flex items-center justify-center shrink-0 text-lg">⚙️</div>
            <div>
              <h4 className="font-bold text-gray-950 text-[15.5px] mb-1.5">상담 상태 변경</h4>
              <p className="text-[14.5px] text-gray-500 leading-relaxed m-0">상담 진행 상태를 변경합니다.</p>
            </div>
          </div>

          <div className="p-5 bg-white border border-gray-200 rounded-xl shadow-xs flex items-start gap-3.5 hover:border-gray-300 transition-colors">
            <div className="w-9 h-9 rounded bg-orange-50 text-orange-600 flex items-center justify-center shrink-0 text-lg">🔄</div>
            <div>
              <h4 className="font-bold text-gray-950 text-[15.5px] mb-1.5">상담 이관</h4>
              <p className="text-[14.5px] text-gray-500 leading-relaxed m-0">필요한 경우 상담을 다른 상담 담당자에게 넘길 수 있습니다.</p>
            </div>
          </div>

          <div className="p-5 bg-white border border-gray-200 rounded-xl shadow-xs flex items-start gap-3.5 hover:border-gray-300 transition-colors">
            <div className="w-9 h-9 rounded bg-pink-50 text-pink-600 flex items-center justify-center shrink-0 text-lg">📝</div>
            <div>
              <h4 className="font-bold text-gray-950 text-[15.5px] mb-1.5">내부 메모</h4>
              <p className="text-[14.5px] text-gray-500 leading-relaxed m-0">고객에게 보이지 않는 기록을 남길 수 있습니다.</p>
            </div>
          </div>
        </div>

        {/* '알아두면 좋아요' 안내 박스 */}
        <div className="mt-6 p-5 bg-gradient-to-r from-blue-50/70 to-indigo-50/50 border border-blue-100 rounded-2xl">
          <h4 className="font-bold text-blue-900 mb-2 flex items-center gap-2 text-[15.5px]">
            💡 알아두면 좋아요
          </h4>
          <p className="text-[14.5px] text-blue-800 leading-relaxed m-0">
            실시간 상담방에는 여러 상담 담당자가 함께 참여할 수 있습니다.<br />
            상담 담당자끼리 나누는 내부 대화는 <strong>고객에게 보이지 않으며</strong>, 고객 응대 방향을 맞추거나 추가 확인이 필요한 내용을 공유할 때 사용할 수 있습니다.
          </p>
        </div>
      </section>

      {/* Section 5 */}
      <section id="history" className="mb-14 scroll-mt-[120px] guide-section">
        <h2 className="text-2xl font-bold text-gray-900 mb-5 pb-2 border-b border-gray-100">5. 상담 종료와 이력 확인</h2>
        <p className="text-[15px] text-gray-600 leading-relaxed mb-6">
          다중 상담으로 진행된 상담도 하나의 상담 이력으로 남습니다.<br />
          상담 종료 후에는 고객과의 대화 내용뿐 아니라 상담 처리 과정에서 남긴 내부 기록을 확인할 수 있습니다.<br />
          단, 고객에게 보이지 않는 내부 대화와 내부 메모는 상담 담당자와 관리자 화면에서만 확인되는 정보로 구분되어야 합니다.
        </p>
      </section>

      {/* Section 6 */}
      <section id="try" className="mb-14 scroll-mt-[120px] guide-section">
        <h2 className="text-2xl font-bold text-gray-900 mb-5 pb-2 border-b border-gray-100">6. 실시간 상담 체험으로 미리 확인하기</h2>
        <p className="text-[0.95rem] text-gray-600 leading-relaxed mb-6">
          유료 플랜(Pro / Enterprise)에서 제공하는 실시간 채팅 기능을 무료로 체험해 볼 수 있습니다.<br/>
          체험 화면은 가상의 환경이므로, 실제 서비스 데이터에 영향을 주거나 요금이 결제되지 않습니다. 편하게 테스트해 보세요.
        </p>
        <Link to="/demo">
           <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg font-bold shadow-sm transition-all flex items-center gap-2 group transform hover:-translate-y-0.5">
             실시간 상담 체험하기
             <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
           </button>
        </Link>
      </section>

      {/* Section 7 */}
      <section id="next" className="mb-10 scroll-mt-[120px] guide-section">
        <h2 className="text-2xl font-bold text-gray-900 mb-5 pb-2 border-b border-gray-100">7. 다음에 볼 문서</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            '요금제 및 구독',
            '문의 관리'
          ].map((doc, idx) => (
            <div key={idx} onClick={() => setActiveItem(doc)} className="group cursor-pointer p-5 bg-white border border-gray-200 hover:border-blue-300 rounded-xl shadow-sm hover:shadow-md transition-all flex justify-between items-center">
               <span className="font-medium text-gray-800 text-sm group-hover:text-blue-700 transition-colors flex items-center gap-2">
                {doc}
              </span>
              <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

const InquiryManagementDoc = ({ setActiveItem }: { setActiveItem: (item: string) => void }) => {
  return (
    <div className="max-w-3xl">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-6 font-medium">
        <Link to="/" className="hover:text-gray-900 transition-colors">홈</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-gray-900">가이드 문서</span>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-blue-600 font-semibold">문의 관리</span>
      </div>

      <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 mb-6 pt-2">
        문의 관리 (대시보드)
      </h1>
      
      <p className="text-[0.95rem] text-gray-600 leading-relaxed mb-12">
        상담 담당자가 고객의 모든 문의를 확인하고 처리하는 컨트롤 타워입니다. 새 문의 확인, 담당자 지정, 상태 변경, 그리고 답변 등록까지 문의 관리의 전체 과정을 안내합니다.
      </p>

      {/* Section 1 */}
      <section id="dashboard" className="mb-14 scroll-mt-24 guide-section">
        <h2 className="text-2xl font-bold text-gray-900 mb-5 pb-2 border-b border-gray-100">1. 대시보드 구조 이해하기</h2>
        <p className="text-[0.95rem] text-gray-600 leading-relaxed mb-6">
          문의 관리 화면은 메일함이나 게시판과 유사한 직관적인 구조로 되어 있어 누구나 쉽게 적응할 수 있습니다.
        </p>

        <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm mb-6 bg-white">
          <div className="w-full h-[240px] bg-gray-50 border-b border-gray-100 flex items-center justify-center text-gray-400 font-medium">
            문의 관리 전체 화면 캡처 영역
          </div>
          <div className="p-5">
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold mt-0.5 shrink-0">1</span>
                <div>
                  <h4 className="font-bold text-[0.95rem] text-gray-900">검색 및 필터</h4>
                  <p className="text-[0.85rem] text-gray-600 leading-relaxed">접수된 문의를 유형별, 기간별, 담당자별로 빠르게 분류합니다.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold mt-0.5 shrink-0">2</span>
                <div>
                  <h4 className="font-bold text-[0.95rem] text-gray-900">문의 리스트</h4>
                  <p className="text-[0.85rem] text-gray-600 leading-relaxed">상담 대기 중인 목록과 처리된 목록을 최신순으로 정렬하여 보여줍니다.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold mt-0.5 shrink-0">3</span>
                <div>
                  <h4 className="font-bold text-[0.95rem] text-gray-900">상세 확인 영역</h4>
                  <p className="text-[0.85rem] text-gray-600 leading-relaxed">목록에서 클릭한 문의의 구체적인 내용과 첨부파일을 확인하고 답변을 작성하는 공간입니다.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Section 2 */}
      <section id="processing" className="mb-14 scroll-mt-24 guide-section">
        <h2 className="text-2xl font-bold text-gray-900 mb-5 pb-2 border-b border-gray-100">2. 문의를 처리하는 방법</h2>
        
        <p className="text-[0.95rem] text-gray-600 leading-relaxed mb-6">
          문의가 접수되었을 때 담당자가 확인하고 답변을 남기기까지의 3단계 흐름입니다.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
            <h3 className="font-bold text-blue-700 text-[1rem] mb-2">Step 1. 확인</h3>
            <h4 className="font-bold text-gray-900 text-[0.9rem] mb-2">접수 내용 파악하기</h4>
            <p className="text-[0.85rem] text-gray-600 leading-relaxed">
              목록에서 '접수 대기' 상태인 문의를 클릭하여 고객의 정보, 연락처, 문의 내용, 첨부파일을 확인합니다.
            </p>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
             <h3 className="font-bold text-blue-700 text-[1rem] mb-2">Step 2. 담당/상태</h3>
            <h4 className="font-bold text-gray-900 text-[0.9rem] mb-2">상태 변경 및 담당자 할당</h4>
            <p className="text-[0.85rem] text-gray-600 leading-relaxed">
              자신이나 다른 특정 상담 담당자에게 배정하고, 상태를 '확인 중'으로 변경하여 중복 응대를 방지합니다.
            </p>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
             <h3 className="font-bold text-blue-700 text-[1rem] mb-2">Step 3. 답변</h3>
            <h4 className="font-bold text-gray-900 text-[0.9rem] mb-2">답장 작성 및 완료 처리</h4>
            <p className="text-[0.85rem] text-gray-600 leading-relaxed">
              상세 창 하단의 에디터를 이용해 답변을 남기고, '답변 완료' 상태로 등록하여 작업을 마칩니다.
            </p>
          </div>
        </div>
      </section>

      {/* Section 3 */}
      <section id="status" className="mb-14 scroll-mt-24 guide-section">
        <h2 className="text-2xl font-bold text-gray-900 mb-5 pb-2 border-b border-gray-100">3. 효과적인 라벨 / 상태 분류</h2>
        <p className="text-[0.95rem] text-gray-600 leading-relaxed mb-6">
          팀원들이 헷갈리지 않고 체계적으로 일하려면 적절한 상태 라벨 관리가 필요합니다.
        </p>

        <div className="flex flex-wrap gap-3 mb-6">
          <div className="px-4 py-2 bg-gray-50 text-gray-700 rounded-lg text-sm font-medium border border-gray-200 shadow-sm flex items-center">
            <span className="w-2.5 h-2.5 rounded-full bg-red-400 inline-block mr-2"></span>접수
          </div>
          <div className="px-4 py-2 bg-gray-50 text-gray-700 rounded-lg text-sm font-medium border border-gray-200 shadow-sm flex items-center">
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-400 inline-block mr-2"></span>확인 중
          </div>
          <div className="px-4 py-2 bg-gray-50 text-gray-700 rounded-lg text-sm font-medium border border-gray-200 shadow-sm flex items-center">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block mr-2"></span>답변 완료
          </div>
        </div>
        
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 mb-6">
          <h4 className="font-bold text-blue-900 mb-2 flex items-center gap-2 text-[0.9rem]">
            💡 운영 팀을 위한 팁
          </h4>
          <p className="text-[0.85rem] text-blue-800 leading-relaxed">
            너무 많은 세부 상태는 혼란을 줍니다. 초기에는 '미확인/대기'와 '답변 완료' 두 가지 정도로 단순하게 운영하고, 규모가 커지면 세분화하는 것을 추천합니다.
          </p>
        </div>
      </section>

      {/* Section 4 */}
      <section id="next" className="mb-10 scroll-mt-24 guide-section">
        <h2 className="text-2xl font-bold text-gray-900 mb-5 pb-2 border-b border-gray-100">4. 다음에 볼 문서</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            '게시판형 채팅',
            '설정 관리'
          ].map((doc, idx) => (
            <div key={idx} onClick={() => setActiveItem(doc)} className="group cursor-pointer p-5 bg-white border border-gray-200 hover:border-blue-300 rounded-xl shadow-sm hover:shadow-md transition-all flex justify-between items-center">
               <span className="font-medium text-gray-800 text-sm group-hover:text-blue-700 transition-colors flex items-center gap-2">
                {doc}
              </span>
              <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export const SettingsManagementDoc = ({ setActiveItem }: { setActiveItem: (item: string) => void }) => {
  return (
    <div className="max-w-3xl">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-6 font-medium">
        <Link to="/" className="hover:text-gray-900 transition-colors">홈</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-gray-900">가이드 문서</span>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-blue-600 font-semibold">설정 관리</span>
      </div>

      <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 mb-6 pt-2">
        설정 및 권한 관리
      </h1>
      
      <p className="text-[0.95rem] text-gray-600 leading-relaxed mb-12">
        솔루션을 고객사 환경에 맞게 커스텀하고, 내부 팀원들의 권한을 세팅하는 관리자 전용 메뉴입니다. 설치를 완료한 직후 관리자가 가장 먼저 확인해야 할 필수 설정 항목을 안내합니다.
      </p>

      {/* Section 1 */}
      <section id="config" className="mb-14 scroll-mt-24 guide-section">
        <h2 className="text-2xl font-bold text-gray-900 mb-5 pb-2 border-b border-gray-100">1. 고객 노출 항목 설정</h2>
        <p className="text-[0.95rem] text-gray-600 leading-relaxed mb-6">
          사이트 방문자가 상담 창을 열었을 때 마주하게 되는 텍스트와 분류 기준입니다. 브랜드 톤앤매너에 맞게 수정해 주세요.
        </p>

        <div className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-start gap-4">
            <div className="w-full md:w-1/4">
              <h3 className="font-bold text-gray-900 text-[1rem]">타이틀 & 환영 인사</h3>
            </div>
            <div className="w-full md:w-3/4 p-4 bg-gray-50 rounded-lg text-sm text-gray-700 leading-relaxed border border-gray-100">
              채널 상단에 표시될 이름(예: '고객 센터', '무엇을 도와드릴까요?')과 챗봇이 첫 안내로 띄울 텍스트를 입력합니다.
            </div>
          </div>
          <div className="flex flex-col md:flex-row md:items-start gap-4">
            <div className="w-full md:w-1/4">
              <h3 className="font-bold text-gray-900 text-[1rem]">입력 항목 설정</h3>
            </div>
            <div className="w-full md:w-3/4 p-4 bg-gray-50 rounded-lg text-sm text-gray-700 leading-relaxed border border-gray-100">
              문의 접수 시 고객에게 필수로 받을 정보를 정의합니다. '이메일'이나 '연락처' 중 최소 1개는 필수로 설정하여 이탈된 고객에게도 추후 답변이 가능하도록 구성하는 것을 권장합니다.
            </div>
          </div>
          <div className="flex flex-col md:flex-row md:items-start gap-4">
            <div className="w-full md:w-1/4">
              <h3 className="font-bold text-gray-900 text-[1rem]">문의 유형(카테고리)</h3>
            </div>
            <div className="w-full md:w-3/4 p-4 bg-gray-50 rounded-lg text-sm text-gray-700 leading-relaxed border border-gray-100">
              고객이 자신의 문의 종류를 선택할 수 있게 메뉴를 구성합니다. 너무 세분화하면 고객이 고민하게 되므로, '요금 문의', '접속 장애', '기타' 처럼 5~7개 이내로 간결하게 유지하는 것이 좋습니다.
            </div>
          </div>
        </div>
      </section>

      {/* Section 2 */}
      <section id="permissions" className="mb-14 scroll-mt-24 guide-section">
        <h2 className="text-2xl font-bold text-gray-900 mb-5 pb-2 border-b border-gray-100">2. 팀원 권한 분리 및 초대</h2>
        <p className="text-[0.95rem] text-gray-600 leading-relaxed mb-6">
          보안과 업무 분장을 위해 접속하는 팀원마다 적절한 역할을 부여하세요.
        </p>

        <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm">
          <table className="w-full text-left text-[0.85rem]">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 font-semibold text-gray-800 border-r border-gray-200">권한 명칭</th>
                <th className="px-4 py-3 font-semibold text-gray-800 border-r border-gray-200">역할 범위</th>
                <th className="px-4 py-3 font-semibold text-gray-800">추천 대상</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              <tr>
                <td className="px-4 py-4 font-bold text-blue-700 border-r border-gray-100">관리자</td>
                <td className="px-4 py-4 text-gray-600 border-r border-gray-100">모든 설정 변경 권한, 계정 초대/제명, 요금제 관리, 모든 상담 내역 조회 및 답변 작성 가능.</td>
                <td className="px-4 py-4 text-gray-500">도입 총괄 책임자, CX 리더</td>
              </tr>
              <tr>
                <td className="px-4 py-4 font-bold text-green-600 border-r border-gray-100">상담 담당자</td>
                <td className="px-4 py-4 text-gray-600 border-r border-gray-100">접수된 문의 확인 및 응대, 상태 변경, 메모 작성 등 실제 고객 지원에 필요한 기능 사용 가능.</td>
                <td className="px-4 py-4 text-gray-500">실무 CS 요원, 운영팀</td>
              </tr>
              <tr>
                <td className="px-4 py-4 font-bold text-gray-600 border-r border-gray-100">읽기 전용</td>
                <td className="px-4 py-4 text-gray-600 border-r border-gray-100">모든 채팅 내역 열람은 가능하나, 설정 변경, 답변 전송, 메모 작성 등은 불가능.</td>
                <td className="px-4 py-4 text-gray-500">참조용 경영진, 외부 협력사</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Section 3 */}
      <section id="next" className="mb-10 scroll-mt-24 guide-section">
        <h2 className="text-2xl font-bold text-gray-900 mb-5 pb-2 border-b border-gray-100">3. 다음에 볼 문서</h2>
        
        <div className="flex flex-col gap-2">
          <div onClick={() => setActiveItem('요금제 및 구독')} className="group cursor-pointer py-4 px-2 hover:bg-gray-50 rounded-lg transition-colors flex justify-between items-center border-b border-transparent hover:border-gray-100">
             <span className="font-bold text-gray-800 text-[0.95rem] group-hover:text-blue-700 transition-colors">
              요금제 및 구독
            </span>
            <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-blue-500 transition-colors" />
          </div>
          <div onClick={() => setActiveItem('문제 해결')} className="group cursor-pointer py-4 px-2 hover:bg-gray-50 rounded-lg transition-colors flex justify-between items-center border-b border-transparent hover:border-gray-100">
             <span className="font-bold text-gray-800 text-[0.95rem] group-hover:text-blue-700 transition-colors">
              문제 해결
            </span>
            <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-blue-500 transition-colors" />
          </div>
        </div>
      </section>

    </div>
  );
};

export const PricingSubscriptionDoc = ({ setActiveItem }: { setActiveItem: (item: string) => void }) => {
  return (
    <div className="max-w-3xl">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-6 font-medium">
        <Link to="/" className="hover:text-gray-900 transition-colors">홈</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-gray-900">가이드 문서</span>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-blue-600 font-semibold">요금제 및 구독</span>
      </div>

      <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 mb-6 pt-2">
        요금제 및 구독
      </h1>
      
      <p className="text-[0.95rem] text-gray-600 leading-relaxed mb-12">
        GrowTalk을 실제 서비스에 도입하기 위한 구독 신청 플로우를 안내합니다. 요금제를 확인하고 결제를 진행한 뒤, 채팅 위젯을 띄울 수 있는 최종 설치 코드를 발급받는 일련의 과정을 확인해 보세요.
      </p>

      {/* Section 1 */}
      <section id="pricing" className="mb-14 scroll-mt-24 guide-section">
        <h2 className="text-2xl font-bold text-gray-900 mb-5 pb-2 border-b border-gray-100">1. 요금제 확인하기</h2>
        <p className="text-[0.95rem] text-gray-600 leading-relaxed mb-6">
          요금제 페이지에서는 GrowTalk에서 제공하는 서비스 구성과 구독 조건 옵션을 비교할 수 있습니다.<br/>
          (현재 UI에서는 실제 과금이 발생하지 않는 샘플 화면으로 제공됩니다.)
        </p>

        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm mb-6 flex flex-col items-center">
          <div className="w-full flex items-center justify-between p-4 border-b border-gray-100 last:border-0 hover:bg-gray-50 rounded-lg">
             <span className="font-bold text-gray-800 text-sm">기본 포함 항목 1</span>
             <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">제한 없음</span>
          </div>
          <div className="w-full flex items-center justify-between p-4 border-b border-gray-100 last:border-0 hover:bg-gray-50 rounded-lg">
             <span className="font-bold text-gray-800 text-sm">기본 포함 항목 2</span>
             <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">월 1,000건</span>
          </div>
          <div className="w-full flex items-center justify-between p-4 border-b border-gray-100 last:border-0 hover:bg-gray-50 rounded-lg">
             <span className="font-bold text-gray-800 text-sm">실시간 상담 기능</span>
             <span className="text-[0.65rem] font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded border border-blue-200">Pro Plan 전용</span>
          </div>
        </div>
      </section>

      {/* Section 2 */}
      <section id="subscribe" className="mb-14 scroll-mt-24 guide-section">
        <h2 className="text-2xl font-bold text-gray-900 mb-5 pb-2 border-b border-gray-100">2. 구독 신청 흐름</h2>
        <p className="text-[0.95rem] text-gray-600 leading-relaxed mb-6">
          상담 환경을 구축하고 코드를 발급받기 위한 전체 프로세스입니다.
        </p>

        <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center w-full">
          <div className="flex-1 bg-white p-4 rounded-xl border border-gray-200 text-center shadow-sm">
            <span className="block text-xs font-bold text-gray-400 mb-1">진입</span>
            <span className="text-sm font-semibold text-gray-800">플랜 선택</span>
          </div>
          <ChevronRight className="hidden md:block w-5 h-5 text-gray-300 shrink-0" />
          <ChevronDown className="md:hidden w-5 h-5 text-gray-300 mx-auto" />
          <div className="flex-1 bg-white p-4 rounded-xl border border-gray-200 text-center shadow-sm">
            <span className="block text-xs font-bold text-gray-400 mb-1">연동</span>
            <span className="text-sm font-semibold text-gray-800">결제 정보 등록</span>
          </div>
          <ChevronRight className="hidden md:block w-5 h-5 text-gray-300 shrink-0" />
          <ChevronDown className="md:hidden w-5 h-5 text-gray-300 mx-auto" />
          <div className="flex-1 bg-blue-50 p-4 rounded-xl border border-blue-100 text-center shadow-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-blue-400"></div>
            <span className="block text-xs font-bold text-blue-500 mb-1">인프라 할당</span>
            <span className="text-sm font-semibold text-blue-900">서버 환경 구축</span>
          </div>
          <ChevronRight className="hidden md:block w-5 h-5 text-gray-300 shrink-0" />
          <ChevronDown className="md:hidden w-5 h-5 text-gray-300 mx-auto" />
          <div className="flex-1 bg-green-50 p-4 rounded-xl border border-green-200 text-center shadow-sm">
            <span className="block text-xs font-bold text-green-600 mb-1">완료</span>
            <span className="text-sm font-semibold text-green-900">스크립트 발급</span>
          </div>
        </div>
      </section>

      {/* Section 3 */}
      <section id="setup" className="mb-14 scroll-mt-24 guide-section">
        <h2 className="text-2xl font-bold text-gray-900 mb-5 pb-2 border-b border-gray-100">3. 상담 환경 세팅 대기</h2>
        <p className="text-[0.95rem] text-gray-600 leading-relaxed mb-6">
          독립적인 채널 데이터베이스 및 클라우드 리소스를 할당 중인 상태입니다. 이 화면에서는 브라우저 탭을 닫거나 새로고침하지 않아야 합니다.
        </p>

        <div className="w-full bg-slate-900 rounded-xl mb-6 p-10 flex flex-col items-center justify-center shadow-lg relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/40 to-slate-900"></div>
          <div className="w-12 h-12 border-4 border-slate-700 border-t-blue-400 rounded-full animate-spin mb-6 relative z-10"></div>
          <h3 className="text-xl font-bold text-white mb-2 tracking-tight relative z-10">상담 인프라를 프로비저닝 중입니다</h3>
          <p className="text-[0.95rem] text-blue-200 font-medium relative z-10">약 1~2분 정도 소요됩니다. 창을 닫지 말아 주세요.</p>
        </div>
      </section>

      {/* Section 4 */}
      <section id="install-code" className="mb-14 scroll-mt-24 guide-section">
        <h2 className="text-2xl font-bold text-gray-900 mb-5 pb-2 border-b border-gray-100">4. 최종 설치 코드 발급</h2>
        <p className="text-[0.95rem] text-gray-600 leading-relaxed mb-6">
          환경 구축이 완료되면, 고객사 웹사이트 `&lt;head&gt;` 태그 내부에 삽입할 **JavaScript Snippet**이 생성됩니다. 이 코드를 복사하여 웹마스터나 개발팀에 전달해 주세요.
        </p>

        <div className="bg-gray-900 rounded-xl p-5 mb-6 overflow-x-auto shadow-md border border-gray-800">
          <pre className="text-[0.8rem] text-green-400 font-mono leading-relaxed">
            <code>
&lt;!-- GrowTalk Widget Script --&gt;
&lt;script&gt;
  (function(w, d, s, i) &#123;
    w._growtalk = w._growtalk || function() &#123; (w._growtalk.q = w._growtalk.q || []).push(arguments) &#125;;
    var c = d.createElement(s); c.async = true; c.src = "https://cdn.growtalk.io/widget.js";
    var t = d.getElementsByTagName(s)[0]; t.parentNode.insertBefore(c, t);
    w._growtalk('init', '&#123; i &#125;');
  &#125;)(window, document, 'script', 'PROJECT_ID_XYZ');
&lt;/script&gt;
&lt;!-- End GrowTalk Widget --&gt;
            </code>
          </pre>
        </div>

      </section>

      {/* Section 5 */}
      <section id="next" className="mb-10 scroll-mt-24 guide-section">
        <h2 className="text-2xl font-bold text-gray-900 mb-5 pb-2 border-b border-gray-100">5. 다음에 볼 문서</h2>
        
        <div className="flex flex-col gap-2">
          <div onClick={() => setActiveItem('설정 관리')} className="group cursor-pointer py-4 px-2 hover:bg-gray-50 rounded-lg transition-colors flex justify-between items-center border-b border-transparent hover:border-gray-100">
             <span className="font-bold text-gray-800 text-[0.95rem] group-hover:text-blue-700 transition-colors">
              설정 관리
            </span>
            <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-blue-500 transition-colors" />
          </div>
          <div onClick={() => setActiveItem('문제 해결')} className="group cursor-pointer py-4 px-2 hover:bg-gray-50 rounded-lg transition-colors flex justify-between items-center border-b border-transparent hover:border-gray-100">
             <span className="font-bold text-gray-800 text-[0.95rem] group-hover:text-blue-700 transition-colors">
              문제 해결
            </span>
            <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-blue-500 transition-colors" />
          </div>
        </div>
      </section>

    </div>
  );
};

const GuideAccordionItem = ({ title, children, defaultOpen = false }: { title: string, children: React.ReactNode, defaultOpen?: boolean }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <div className="border border-gray-200 rounded-xl mb-3 overflow-hidden bg-white shadow-sm">
      <button 
        className="w-full flex items-center justify-between p-5 text-left bg-white hover:bg-gray-50 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-semibold text-gray-900 text-[0.95rem]">{title}</span>
        <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className="p-5 border-t border-gray-100 bg-gray-50/50 text-[0.9rem] text-gray-600 leading-relaxed">
          {children}
        </div>
      )}
    </div>
  );
};

export const TroubleshootingDoc = ({ setActiveItem }: { setActiveItem: (item: string) => void }) => {
  return (
    <div className="max-w-3xl">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-6 font-medium">
        <Link to="/" className="hover:text-gray-900 transition-colors">홈</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-gray-900">가이드 문서</span>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-blue-600 font-semibold">문제 해결</span>
      </div>

      <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 mb-6 pt-2">
        문제 해결
      </h1>
      
      <p className="text-[0.95rem] text-gray-600 leading-relaxed mb-12">
        GrowTalk을 사용하는 중 문제가 발생했을 때 확인할 수 있는 기본 해결 방법을 안내합니다. 증상에 맞는 항목을 선택해 원인과 확인 방법을 확인해 보세요.
      </p>

      {/* Section 1 */}
      <section id="intro" className="mb-14 scroll-mt-24 guide-section">
        <h2 className="text-2xl font-bold text-gray-900 mb-5 pb-2 border-b border-gray-100">1. 문제 해결 안내</h2>
        <p className="text-[0.95rem] text-gray-600 leading-relaxed mb-6">
          문제가 발생했을 때는 먼저 화면 상태와 설정 상태를 확인하는 것이 좋습니다.<br/>
          아래 항목은 고객 화면, 문의 관리 화면, 설정 관리 화면에서 자주 확인해야 하는 기본 문제를 기준으로 정리했습니다.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 bg-white border border-gray-200 rounded-xl shadow-sm">
            <h3 className="font-bold text-gray-800 text-sm mb-2">고객 화면 확인</h3>
            <p className="text-[0.85rem] text-gray-600 leading-relaxed">
              플로팅 버튼, 문의 작성 화면, 답변 확인 화면이 정상적으로 보이는지 확인합니다.
            </p>
          </div>
          <div className="p-5 bg-white border border-gray-200 rounded-xl shadow-sm">
            <h3 className="font-bold text-gray-800 text-sm mb-2">문의 관리 확인</h3>
            <p className="text-[0.85rem] text-gray-600 leading-relaxed">
              접수된 문의가 문의 목록과 문의 상세 화면에 표시되는지 확인합니다.
            </p>
          </div>
          <div className="p-5 bg-white border border-gray-200 rounded-xl shadow-sm">
            <h3 className="font-bold text-gray-800 text-sm mb-2">설정 상태 확인</h3>
            <p className="text-[0.85rem] text-gray-600 leading-relaxed">
              채널, 문의 유형, 입력 항목, 담당자 권한 설정이 올바르게 적용되었는지 확인합니다.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2 */}
      <section id="widget" className="mb-14 scroll-mt-24 guide-section">
        <h2 className="text-2xl font-bold text-gray-900 mb-5 pb-2 border-b border-gray-100">2. 플로팅 문의 버튼이 보이지 않을 때</h2>
        
        <GuideAccordionItem title="설치 코드가 적용되었는지 확인해 주세요." defaultOpen={true}>
          웹사이트에 GrowTalk 설치 코드가 정상적으로 추가되어야 플로팅 문의 버튼이 표시됩니다.<br/>
          설치 코드가 누락되었거나 잘못 삽입된 경우 버튼이 보이지 않을 수 있습니다.
        </GuideAccordionItem>
        <GuideAccordionItem title="버튼 노출 설정을 확인해 주세요.">
          채널 또는 위젯 설정에서 플로팅 문의 버튼이 비활성화되어 있으면 고객 화면에 버튼이 표시되지 않을 수 있습니다.
        </GuideAccordionItem>
        <GuideAccordionItem title="브라우저 새로고침 또는 캐시를 확인해 주세요.">
          설정 변경 직후에는 브라우저 캐시나 배포 상태에 따라 반영이 늦게 보일 수 있습니다.<br/>
          새로고침 후 다시 확인해 주세요.
        </GuideAccordionItem>
      </section>

      {/* Section 3 */}
      <section id="inquiry" className="mb-14 scroll-mt-24 guide-section">
        <h2 className="text-2xl font-bold text-gray-900 mb-5 pb-2 border-b border-gray-100">3. 문의가 등록되지 않을 때</h2>
        
        <GuideAccordionItem title="필수 입력 항목이 모두 작성되었는지 확인해 주세요." defaultOpen={true}>
          문의 내용, 이름, 연락처 또는 이메일 등 필수 항목이 비어 있으면 문의가 등록되지 않을 수 있습니다.
        </GuideAccordionItem>
        <GuideAccordionItem title="문의 유형이 선택되었는지 확인해 주세요.">
          문의 유형을 필수 항목으로 설정한 경우, 고객이 문의 유형을 선택해야 문의를 등록할 수 있습니다.
        </GuideAccordionItem>
        <GuideAccordionItem title="첨부파일 용량이나 형식을 확인해 주세요.">
          첨부파일을 사용하는 경우 파일 용량이나 형식 제한으로 등록이 실패할 수 있습니다.<br/>
          첨부파일 없이 다시 등록해 보거나, 허용된 파일 형식을 확인해 주세요.
        </GuideAccordionItem>
      </section>

      {/* Section 4 */}
      <section id="reply" className="mb-14 scroll-mt-24 guide-section">
        <h2 className="text-2xl font-bold text-gray-900 mb-5 pb-2 border-b border-gray-100">4. 답변이 보이지 않을 때</h2>
        
        <GuideAccordionItem title="답변이 실제로 등록되었는지 확인해 주세요." defaultOpen={true}>
          상담 담당자가 답변을 작성했더라도 저장 또는 등록을 완료하지 않으면 고객 화면에 답변이 표시되지 않습니다.
        </GuideAccordionItem>
        <GuideAccordionItem title="고객이 같은 문의 상세 화면을 보고 있는지 확인해 주세요.">
          게시판형 채팅의 답변은 고객이 남긴 문의 상세 화면에서 확인합니다.<br/>
          다른 문의 화면을 보고 있으면 답변이 보이지 않을 수 있습니다.
        </GuideAccordionItem>
        <GuideAccordionItem title="비회원 문의인 경우 같은 기기와 브라우저인지 확인해 주세요.">
          비회원 문의는 현재 사용 중인 기기와 브라우저에서 작성한 문의만 다시 확인할 수 있습니다.<br/>
          다른 기기나 다른 브라우저에서는 이전 문의가 보이지 않을 수 있습니다.
        </GuideAccordionItem>
      </section>

      {/* Section 5 */}
      <section id="history" className="mb-14 scroll-mt-24 guide-section">
        <h2 className="text-2xl font-bold text-gray-900 mb-5 pb-2 border-b border-gray-100">5. 문의 이력이 보이지 않을 때</h2>
        
        <GuideAccordionItem title="비회원 문의인지 확인해 주세요." defaultOpen={true}>
          비회원은 로그인 없이 문의할 수 있지만, 문의 이력은 해당 기기와 브라우저 기준으로만 확인됩니다.
        </GuideAccordionItem>
        <GuideAccordionItem title="다른 기기에서 확인하려면 로그인 상태를 확인해 주세요.">
          회원은 로그인 후 어느 기기에서든 본인의 문의 목록과 답변을 확인할 수 있습니다.<br/>
          다른 기기에서 문의 이력을 확인하려면 동일한 계정으로 로그인해야 합니다.
        </GuideAccordionItem>
        <GuideAccordionItem title="브라우저 방문 기록 또는 저장 정보가 삭제되었는지 확인해 주세요.">
          비회원 문의는 브라우저 저장 정보에 영향을 받을 수 있습니다.<br/>
          브라우저 데이터가 삭제된 경우 이전 문의를 확인하기 어려울 수 있습니다.
        </GuideAccordionItem>
      </section>

      {/* Section 6 */}
      <section id="live-chat" className="mb-14 scroll-mt-24 guide-section">
        <h2 className="text-2xl font-bold text-gray-900 mb-5 pb-2 border-b border-gray-100">6. 실시간 상담이 시작되지 않을 때</h2>
        
        <GuideAccordionItem title="상담 담당자의 상담 가능 상태를 확인해 주세요." defaultOpen={true}>
          실시간 채팅 상담은 상담 담당자가 응대 가능한 상태일 때 가장 원활하게 동작합니다.<br/>
          상담 가능 상태가 꺼져 있으면 고객이 즉시 응답을 받기 어려울 수 있습니다.
        </GuideAccordionItem>
        <GuideAccordionItem title="고객이 실시간 상담 화면에 정상 진입했는지 확인해 주세요.">
          고객이 상담 버튼을 눌러 실시간 상담방에 진입해야 상담이 시작됩니다.
        </GuideAccordionItem>
        <GuideAccordionItem title="실시간 상담 체험과 실제 상담을 구분해 주세요.">
          실시간 상담 체험은 실제 상담 데이터가 저장되지 않는 샘플 체험 기능입니다.<br/>
          실제 상담 운영과는 구분해서 확인해야 합니다.
        </GuideAccordionItem>
      </section>

      {/* Section 7 */}
      <section id="setup" className="mb-14 scroll-mt-24 guide-section">
        <h2 className="text-2xl font-bold text-gray-900 mb-5 pb-2 border-b border-gray-100">7. 설정이 반영되지 않을 때</h2>
        
        <GuideAccordionItem title="설정 저장을 완료했는지 확인해 주세요." defaultOpen={true}>
          채널명, 문의 유형, 입력 항목, 권한 설정을 변경한 뒤 저장하지 않으면 변경 내용이 반영되지 않습니다.
        </GuideAccordionItem>
        <GuideAccordionItem title="적용 대상 채널을 확인해 주세요.">
          여러 채널을 사용하는 경우, 설정을 변경한 채널과 고객에게 노출되는 채널이 다를 수 있습니다.
        </GuideAccordionItem>
        <GuideAccordionItem title="담당자 권한을 확인해 주세요.">
          상담 담당자 권한이 제한되어 있으면 문의 확인이나 답변 등록 기능을 사용할 수 없을 수 있습니다.
        </GuideAccordionItem>
      </section>

      {/* Section 8 */}
      <section id="next" className="mb-10 scroll-mt-24 guide-section">
        <h2 className="text-2xl font-bold text-gray-900 mb-5 pb-2 border-b border-gray-100">8. 다음에 볼 문서</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            '게시판형 채팅',
            '문의 관리',
            '설정 관리',
            'FAQ'
          ].map((doc, idx) => (
            <div key={idx} onClick={() => setActiveItem(doc)} className="group cursor-pointer p-5 bg-white border border-gray-200 hover:border-blue-300 rounded-xl shadow-sm hover:shadow-md transition-all flex justify-between items-center">
               <span className="font-medium text-gray-800 text-[0.9rem] group-hover:text-blue-700 transition-colors flex items-center gap-2">
                {doc}
                {doc !== '설정 관리' && doc !== '게시판형 채팅' && doc !== '문의 관리' && (
                  <span className="px-1.5 py-0.5 rounded text-[0.65rem] font-medium bg-gray-100 text-gray-400 leading-none h-fit">준비 중</span>
                )}
              </span>
              <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export const FaqDoc = ({ setActiveItem }: { setActiveItem: (item: string) => void }) => {
  return (
    <div className="max-w-3xl">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-6 font-medium">
        <Link to="/" className="hover:text-gray-900 transition-colors">홈</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-gray-900">가이드 문서</span>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-blue-600 font-semibold">FAQ</span>
      </div>

      <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 mb-6 pt-2">
        FAQ
      </h1>
      
      <p className="text-[0.95rem] text-gray-600 leading-relaxed mb-12">
        GrowTalk을 처음 사용할 때 자주 궁금해할 수 있는 질문을 모았습니다. 서비스 구성, 게시판형 채팅, 실시간 채팅 상담, 회원/비회원 기준을 확인해 보세요.
      </p>

      {/* Section 1 */}
      <section id="intro" className="mb-14 scroll-mt-24 guide-section">
        <h2 className="text-2xl font-bold text-gray-900 mb-5 pb-2 border-b border-gray-100">1. FAQ 안내</h2>
        <p className="text-[0.95rem] text-gray-600 leading-relaxed mb-6">
          FAQ는 GrowTalk을 사용하면서 자주 헷갈릴 수 있는 기준을 정리한 문서입니다.<br/>
          문제가 발생했을 때의 해결 방법은 “문제 해결” 문서를 함께 확인해 주세요.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 bg-white border border-gray-200 rounded-xl shadow-sm">
            <h3 className="font-bold text-gray-800 text-sm mb-2">서비스 구조 확인</h3>
            <p className="text-[0.85rem] text-gray-600 leading-relaxed">
              GrowTalk의 게시판형 채팅과 실시간 채팅 상담의 차이를 확인합니다.
            </p>
          </div>
          <div className="p-5 bg-white border border-gray-200 rounded-xl shadow-sm">
            <h3 className="font-bold text-gray-800 text-sm mb-2">문의 확인 기준 확인</h3>
            <p className="text-[0.85rem] text-gray-600 leading-relaxed">
              회원과 비회원이 문의 이력을 확인하는 방식을 확인합니다.
            </p>
          </div>
          <div className="p-5 bg-white border border-gray-200 rounded-xl shadow-sm">
            <h3 className="font-bold text-gray-800 text-sm mb-2">구독 흐름 확인</h3>
            <p className="text-[0.85rem] text-gray-600 leading-relaxed">
              요금제 확인, 구독 신청, 상담 환경 준비 흐름을 확인합니다.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2 */}
      <section id="service" className="mb-14 scroll-mt-24 guide-section">
        <h2 className="text-2xl font-bold text-gray-900 mb-5 pb-2 border-b border-gray-100">2. 서비스 구성</h2>
        
        <GuideAccordionItem title="GrowTalk은 어떤 서비스인가요?" defaultOpen={true}>
          GrowTalk은 고객 문의를 접수하고 상담 담당자가 답변할 수 있도록 돕는 상담 채팅 솔루션입니다.<br/>
          기업의 상담 운영 방식에 따라 게시판형 채팅과 실시간 채팅 상담을 사용할 수 있습니다.
        </GuideAccordionItem>
        <GuideAccordionItem title="게시판형 채팅과 실시간 채팅 상담은 같은 기능인가요?">
          아니요. 두 기능은 상담 방식이 다릅니다.<br/>
          게시판형 채팅은 고객이 문의를 남기고 상담 담당자가 나중에 답변하는 방식입니다.<br/>
          실시간 채팅 상담은 고객과 상담 담당자가 동시에 접속해 바로 대화하는 방식입니다.
        </GuideAccordionItem>
        <GuideAccordionItem title="처음에는 무엇부터 확인하면 좋나요?">
          처음 사용하는 경우 게시판형 채팅부터 확인하는 것이 좋습니다.<br/>
          고객이 문의를 남기고, 상담 담당자가 문의 관리 화면에서 확인 후 답변하는 기본 흐름을 먼저 이해하면 됩니다.<br/>
          실시간 응대가 필요한 경우 실시간 채팅 상담 문서를 이어서 확인해 주세요.
        </GuideAccordionItem>
      </section>

      {/* Section 3 */}
      <section id="board-chat" className="mb-14 scroll-mt-24 guide-section">
        <h2 className="text-2xl font-bold text-gray-900 mb-5 pb-2 border-b border-gray-100">3. 게시판형 채팅</h2>
        
        <GuideAccordionItem title="게시판형 채팅은 실시간 상담인가요?" defaultOpen={true}>
          아니요. 게시판형 채팅은 실시간 상담이 아니라 문의 접수와 답변 확인을 위한 채팅형 문의 방식입니다.<br/>
          고객은 채팅창에서 문의를 남기고, 상담 담당자가 확인 후 답변을 등록합니다.
        </GuideAccordionItem>
        <GuideAccordionItem title="고객은 답변을 어디에서 확인하나요?">
          고객은 자신이 남긴 문의 상세 화면에서 답변을 확인할 수 있습니다.<br/>
          게시판형 채팅에서는 답변을 같은 문의창 또는 문의 상세 화면에서 확인하는 구조로 안내합니다.
        </GuideAccordionItem>
        <GuideAccordionItem title="문의 유형은 왜 셀렉트박스로 제공하나요?">
          고객사마다 문의 유형의 개수와 종류가 많아질 수 있기 때문입니다.<br/>
          칩이나 버튼으로 모두 나열하면 화면이 복잡해질 수 있어, 문의 유형은 선택형 입력 방식으로 제공하는 것이 좋습니다.
        </GuideAccordionItem>
        <GuideAccordionItem title="게시판형 채팅은 어떤 문의에 적합한가요?">
          일반 문의, 견적 문의, A/S 문의, 제휴 문의처럼 내용을 확인한 뒤 답변해야 하는 문의에 적합합니다.<br/>
          상담 담당자가 항상 실시간으로 대기하기 어려운 경우에도 사용할 수 있습니다.
        </GuideAccordionItem>
      </section>

      {/* Section 4 */}
      <section id="live-chat" className="mb-14 scroll-mt-24 guide-section">
        <h2 className="text-2xl font-bold text-gray-900 mb-5 pb-2 border-b border-gray-100">4. 실시간 채팅 상담</h2>
        
        <GuideAccordionItem title="실시간 채팅 상담은 언제 사용하나요?" defaultOpen={true}>
          고객과 상담 담당자가 바로 대화해야 하는 경우 사용합니다.<br/>
          구매 직전 문의, 긴급 문의, 빠른 응대가 필요한 상담에 적합합니다.
        </GuideAccordionItem>
        <GuideAccordionItem title="실시간 상담 체험은 실제 상담과 같은 건가요?">
          실시간 상담 체험은 실제 도입 전 상담사 화면과 고객 화면을 미리 확인하는 샘플 체험 기능입니다.<br/>
          체험 화면에서 입력한 내용은 실제 상담 데이터로 저장되지 않습니다.
        </GuideAccordionItem>
        <GuideAccordionItem title="상단의 &quot;실시간 상담 체험&quot; 버튼은 무엇인가요?">
          실시간 채팅 상담을 실제로 도입하기 전에 상담사 화면과 고객 화면을 함께 확인할 수 있는 체험 기능입니다.<br/>
          로그인, 구독 신청, 상담 환경 생성 없이 샘플 화면으로 상담 흐름을 확인하는 용도입니다.
        </GuideAccordionItem>
        <GuideAccordionItem title="실시간 채팅 상담을 사용하려면 상담 담당자가 항상 대기해야 하나요?">
          실시간 채팅 상담은 상담 담당자가 응대 가능한 상태일 때 가장 효과적으로 운영됩니다.<br/>
          상담 담당자가 항상 대기하기 어렵다면 게시판형 채팅을 함께 사용하는 것이 좋습니다.
        </GuideAccordionItem>
      </section>

      {/* Section 5 */}
      <section id="member-guest" className="mb-14 scroll-mt-24 guide-section">
        <h2 className="text-2xl font-bold text-gray-900 mb-5 pb-2 border-b border-gray-100">5. 회원/비회원 문의</h2>
        
        <GuideAccordionItem title="비회원도 문의를 남길 수 있나요?" defaultOpen={true}>
          네. 비회원도 문의를 남길 수 있습니다.<br/>
          다만 비회원 문의는 현재 사용 중인 기기와 브라우저에서 작성한 문의만 다시 확인할 수 있습니다.
        </GuideAccordionItem>
        <GuideAccordionItem title="회원과 비회원은 화면이 다른가요?">
          기본 화면 구조는 크게 다르지 않습니다.<br/>
          차이는 문의 이력을 확인할 수 있는 범위입니다.<br/>
          비회원은 해당 기기와 브라우저 기준으로 확인하고, 회원은 로그인 후 어느 기기에서든 본인 문의를 확인할 수 있습니다.
        </GuideAccordionItem>
        <GuideAccordionItem title="다른 기기에서도 문의 이력을 확인하려면 어떻게 해야 하나요?">
          로그인 후 문의를 남기면 어느 기기에서든 본인 문의 목록과 답변을 확인할 수 있습니다.<br/>
          비회원으로 남긴 문의는 다른 기기에서 확인이 제한될 수 있습니다.
        </GuideAccordionItem>
        <GuideAccordionItem title="비회원 문의 이력 안내는 어디에 보여주는 게 좋나요?">
          회원/비회원 상태 문구를 모든 화면에 계속 노출하기보다는, 문의 작성 진입 시점에 짧게 안내하는 것이 좋습니다.<br/>
          고객이 문의 이력 확인 범위를 이해할 수 있을 정도로만 간단히 안내합니다.
        </GuideAccordionItem>
      </section>

      {/* Section 6 */}
      <section id="subscription" className="mb-14 scroll-mt-24 guide-section">
        <h2 className="text-2xl font-bold text-gray-900 mb-5 pb-2 border-b border-gray-100">6. 요금제 및 구독</h2>
        
        <GuideAccordionItem title="요금제 페이지에서는 무엇을 확인하나요?" defaultOpen={true}>
          요금제 페이지에서는 GrowTalk 서비스 구성과 구독 신청 흐름을 확인할 수 있습니다.<br/>
          구체적인 결제 정책, 환불, 세금계산서 기준은 확정 후 별도로 안내합니다.
        </GuideAccordionItem>
        <GuideAccordionItem title="구독 신청 후 바로 사용할 수 있나요?">
          구독 신청 후에는 상담 환경을 준비하는 과정이 필요할 수 있습니다.<br/>
          상담 환경이 준비되면 설치 코드를 확인하고 고객사 웹사이트에 적용할 수 있습니다.
        </GuideAccordionItem>
        <GuideAccordionItem title="상담 환경 준비 중 화면은 왜 필요한가요?">
          구독 신청 후 상담 환경을 생성하는 시간이 걸릴 수 있기 때문입니다.<br/>
          이 과정에서는 창을 닫거나 새로고침하지 않도록 안내하는 화면을 보여주는 것이 좋습니다.
        </GuideAccordionItem>
        <GuideAccordionItem title="설치 코드는 어디에 사용하나요?">
          설치 코드는 고객사 웹사이트에 GrowTalk 위젯을 표시하기 위해 사용합니다.<br/>
          직접 삽입이 어렵다면 담당 개발자에게 설치 코드를 전달하면 됩니다.
        </GuideAccordionItem>
      </section>

      {/* Section 7 */}
      <section id="next" className="mb-10 scroll-mt-24 guide-section">
        <h2 className="text-2xl font-bold text-gray-900 mb-5 pb-2 border-b border-gray-100">7. 다음에 볼 문서</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            '처음 시작하기',
            '게시판형 채팅',
            '실시간 채팅 상담',
            '문제 해결'
          ].map((doc, idx) => (
            <div key={idx} onClick={() => setActiveItem(doc)} className="group cursor-pointer p-5 bg-white border border-gray-200 hover:border-blue-300 rounded-xl shadow-sm hover:shadow-md transition-all flex justify-between items-center">
               <span className="font-medium text-gray-800 text-[0.9rem] group-hover:text-blue-700 transition-colors flex items-center gap-2">
                {doc}
              </span>
              <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
