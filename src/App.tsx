import { motion, AnimatePresence } from "motion/react";
import { MessageSquare, MessageCircle, CalendarSync, BarChart3, ShieldCheck, ChevronRight, Menu, X, ArrowRight, Check, Zap, Paperclip } from "lucide-react";
import React, { useState, useEffect } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import { FloatingWidget } from "./components/FloatingWidget";
import { Logo } from "./components/Logo";
import { FeaturesPage } from "./pages/FeaturesPage";
import { ExperiencePage } from "./pages/ExperiencePage";
import { GuidePage } from "./pages/GuidePage";
import { PricingPage } from "./pages/PricingPage";

// --- Components ---

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { startDemoFlow, setCurrentFlow } = React.useContext(FlowContext);
  const location = useLocation();
  const isPricingPage = location.pathname === '/pricing';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/80 backdrop-blur-md border-b border-gray-200/50 py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8 flex justify-between items-center">
        <div className="flex items-center gap-12">
          <Logo />
          <nav className="hidden md:flex gap-6 text-[0.95rem] font-semibold text-black">
            <Link to="/features" className="hover:opacity-70 transition-opacity">기능</Link>
            <Link to="/pricing" className="hover:opacity-70 transition-opacity">요금제</Link>
            <Link to="/guide" className="hover:opacity-70 transition-opacity">가이드 문서</Link>
          </nav>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <button 
            onClick={() => setCurrentFlow('login')}
            className={`text-sm font-medium ${isPricingPage ? 'text-gray-900 border border-gray-200 hover:bg-gray-50 rounded-full px-5 py-2.5 bg-white shadow-sm transition-all' : 'text-gray-700 hover:text-black transition-colors px-4 py-2'}`}
          >
            로그인
          </button>
          {!isPricingPage && (
            <button 
              onClick={() => startDemoFlow()}
              className="text-sm font-medium bg-[#274236] text-white px-5 py-2.5 rounded-full hover:bg-[#1C3027] transition-colors shadow-sm"
            >
              실시간 상담 체험
            </button>
          )}
        </div>

        <button 
          className="md:hidden p-2 -mr-2 text-gray-600"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-gray-200 py-4 px-6 flex flex-col gap-4 shadow-xl">
          <Link to="/features" className="text-lg font-medium" onClick={() => setMobileMenuOpen(false)}>기능</Link>
          <Link to="/pricing" className="text-lg font-medium" onClick={() => setMobileMenuOpen(false)}>요금제</Link>
          <Link to="/guide" className="text-lg font-medium" onClick={() => setMobileMenuOpen(false)}>가이드 문서</Link>
          <div className="h-px bg-gray-100 my-2" />
          <button className="w-full text-left text-lg font-medium" onClick={() => { setMobileMenuOpen(false); setCurrentFlow('login'); }}>로그인</button>
          {!isPricingPage && (
            <button className="w-full bg-[#274236] text-white text-center rounded-xl py-3 font-medium mt-2" onClick={() => { setMobileMenuOpen(false); startDemoFlow(); }}>실시간 상담 체험</button>
          )}
        </div>
      )}
    </header>
  );
};

const Hero = () => {
  const [viewState, setViewState] = useState<'board' | 'live'>('board');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { startDemoFlow } = React.useContext(FlowContext);

  useEffect(() => {
    const timer = setInterval(() => {
      setViewState((prev) => (prev === 'board' ? 'live' : 'board'));
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  return (
    <section onMouseMove={handleMouseMove} className="relative pt-32 pb-20 md:pt-40 md:pb-32 px-6 bg-white overflow-hidden flex flex-col items-center justify-center min-h-[calc(100vh-64px)]">
      {/* Background with Faint Grid */}
      <div className="absolute inset-0 pointer-events-none">
         <div className="absolute inset-0 bg-[linear-gradient(to_right,#EEF1F5_1px,transparent_1px),linear-gradient(to_bottom,#EEF1F5_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:linear-gradient(to_bottom,#000_70%,transparent_100%)]"></div>
         <motion.div 
           className="hidden lg:block absolute w-[560px] h-[560px] rounded-full blur-[100px] bg-[#AEC9B9]/50 mix-blend-multiply"
           animate={{
             x: mousePosition.x - 280,
             y: mousePosition.y - 280 - window.scrollY,
           }}
           transition={{ type: "tween", ease: "easeOut", duration: 1.5 }}
         />
      </div>

      <div className="max-w-[1360px] w-full mx-auto relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-10">
        {/* Left Column: Copy */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="w-full lg:w-[40%] text-center lg:text-left pt-6 lg:pt-0 shrink-0 flex flex-col justify-center"
        >
          <h1 className="text-[2.2rem] md:text-[2.75rem] lg:text-[3rem] font-bold tracking-tight break-keep leading-[1.25] text-gray-900 mb-6 font-sans">
            고객 상담을 더 빠르게,<br />
            <span className="text-[2.1rem] md:text-[2.6rem] lg:text-[2.85rem] text-gray-400 mt-1 block">문의 관리는 더 체계적으로.</span>
          </h1>

          <p className="text-[1rem] md:text-[1.1rem] text-gray-500 max-w-[480px] mx-auto lg:mx-0 mb-9 break-keep leading-[1.65] font-medium">
            게시판형 문의와 실시간 채팅을<br className="hidden sm:block" />
            상담 방식에 맞게 선택해보세요.<br />
            문의 접수부터 답변, 이력 관리까지<br className="hidden sm:block" />
            상담 업무를 한곳에서 체계적으로 운영할 수 있습니다.
          </p>
          
          <div className="flex flex-col items-center lg:items-start gap-4">
            <button 
              onClick={() => startDemoFlow()}
              className="w-full sm:w-auto px-8 py-3.5 bg-[#274236] text-white rounded-xl font-semibold text-[1rem] hover:bg-[#1C3027] transition-all shadow-[0_4px_14px_0_rgba(39,66,54,0.2)] flex items-center justify-center">
              실시간 상담 체험
            </button>
          </div>
        </motion.div>

        {/* Right Column: Hero Asset */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="w-full lg:w-[62%] relative mt-16 lg:mt-0 flex justify-center py-4"
        >
          {/* Mobile Scale Wrapper to prevent cutoff */}
          <div className="w-full max-w-[100vw] overflow-hidden lg:overflow-visible flex justify-center sm:justify-start lg:justify-center">
            <div className="w-[880px] lg:w-full h-[600px] lg:h-[44rem] origin-top lg:origin-center scale-[0.4] sm:scale-[0.7] md:scale-[0.85] lg:scale-[1.0] transition-all duration-300 -mb-[360px] sm:-mb-[180px] md:-mb-[100px] lg:mb-0 flex-shrink-0">
              <div className="rounded-[1.25rem] bg-white border border-gray-200 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] overflow-hidden flex w-full h-full text-left relative z-10">
          
          {/* Left: Inquiry List */}
          <div className="w-[200px] sm:w-[26%] border-r border-gray-100 bg-[#fefefe] hidden sm:flex flex-col flex-shrink-0">
            <div className="h-[3.5rem] border-b border-gray-100 flex items-center px-4 flex-shrink-0">
              <div className="font-bold text-[0.9rem] text-gray-900">받은 문의</div>
              <div className="ml-2 bg-gray-100 text-gray-600 text-[0.6rem] font-bold px-2 py-0.5 rounded-full">3건</div>
            </div>
            <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-2 relative">
              <div className="bg-[#F4F5F0]/50 border border-[#E5E8DF] rounded-lg p-3 cursor-pointer mb-2 relative left-0 right-0">
                <div className="flex justify-between items-center mb-1.5">
                  <span className="px-1.5 py-0.5 bg-yellow-100 text-yellow-700 text-[0.65rem] font-bold rounded">확인 중</span>
                  <span className="text-[0.7rem] text-gray-400">방금 전</span>
                </div>
                <div className="font-bold text-sm text-gray-900 mb-1 truncate">결제 수단 변경 방법 문의</div>
                <div className="text-[0.8rem] text-gray-500 truncate">카드 등록을 새로 하고 싶은데...</div>
              </div>
              
              <div className="bg-white border border-gray-100 hover:border-gray-200 rounded-lg p-3 cursor-pointer transition-colors">
                <div className="flex justify-between items-center mb-1.5">
                  <span className="px-1.5 py-0.5 bg-gray-100 text-gray-600 text-[0.65rem] font-bold rounded">답변 완료</span>
                  <span className="text-[0.7rem] text-gray-400">10분 전</span>
                </div>
                <div className="font-medium text-sm text-gray-900 mb-1 truncate">환불 처리 요청</div>
                <div className="text-[0.8rem] text-gray-500 truncate">어제 결제한 건 취소 부탁드립니다.</div>
              </div>

              <div className="bg-white border border-gray-100 hover:border-gray-200 rounded-lg p-3 cursor-pointer transition-colors opacity-70">
                <div className="flex justify-between items-center mb-1.5">
                  <span className="px-1.5 py-0.5 bg-gray-100 text-gray-600 text-[0.65rem] font-bold rounded">답변 완료</span>
                  <span className="text-[0.7rem] text-gray-400">어제</span>
                </div>
                <div className="font-medium text-sm text-gray-900 mb-1 truncate">이용 방법 문의</div>
                <div className="text-[0.8rem] text-gray-500 truncate">로그인은 어디서 하나요?</div>
              </div>
            </div>
          </div>

          {/* Center: Chat/Inquiry Detail */}
          <div className="flex-1 flex flex-col bg-white min-w-0 overflow-hidden relative">
            <AnimatePresence mode="wait">
              {viewState === 'board' ? (
                <motion.div 
                  key="board-view"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 flex flex-col bg-[#FAFBF9]"
                >
                  <div className="h-[3.5rem] py-2 border-b border-gray-100 flex items-center justify-between px-5 bg-white flex-shrink-0">
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-500 text-xs">김</div>
                      <div>
                        <div className="font-bold text-[0.8rem] text-gray-900 whitespace-nowrap">김고객</div>
                        <div className="text-[0.65rem] text-gray-500 whitespace-nowrap">test@example.com</div>
                      </div>
                    </div>
                    <div className="flex gap-2 flex-shrink-0 ml-4 items-center">
                      <button className="px-3 py-1.5 min-w-[70px] text-[0.7rem] font-semibold text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors whitespace-nowrap">담당자 변경</button>
                      <button className="px-3 py-1.5 min-w-[80px] text-[0.7rem] font-semibold text-[#4F5E4D] bg-[#F4F5F0] border border-[#E5E8DF] rounded-lg hover:bg-[#E5E8DF] transition-colors whitespace-nowrap">답변 완료</button>
                    </div>
                  </div>
                  
                  <div className="flex-1 overflow-y-auto p-6 md:p-8 flex flex-col gap-6">
                    {/* Board Content */}
                    <div className="bg-white border border-[#E5E8DF] rounded-xl p-5 shadow-sm">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-[0.65rem] font-bold rounded">결제 문의</span>
                        <div className="font-bold text-[0.95rem] text-gray-900">결제 수단 변경 방법 문의</div>
                      </div>
                      <div className="text-[0.7rem] text-gray-400 mb-4 pb-4 border-b border-gray-100">2023.10.26 10:42 작성</div>
                      <div className="text-[0.85rem] text-gray-700 leading-relaxed font-medium">
                        안녕하세요, 현재 카드로 자동결제 중인데 다른 카드로 변경하고 싶습니다. 설정 메뉴 어디서 바꿀 수 있나요?
                      </div>
                    </div>

                    {/* Answer Content */}
                    <div className="bg-[#F4F5F0]/50 border border-[#E5E8DF] rounded-xl p-5 shadow-sm relative">
                       <div className="absolute top-5 right-5 text-[0.7rem] text-gray-400">2023.10.26 10:45 작성</div>
                       <div className="flex items-center gap-2 mb-4">
                          <div className="w-6 h-6 rounded-full bg-[#4F5E4D] flex items-center justify-center font-bold text-white text-[0.6rem]">상담</div>
                          <span className="font-bold text-[0.85rem] text-gray-900">김상담 매니저의 답변</span>
                       </div>
                       <div className="text-[0.85rem] text-gray-800 leading-relaxed font-medium bg-white/60 p-4 rounded-lg border border-[#E5E8DF]/50">
                         안녕하세요 김고객님,<br/><br/>결제 수단 변경은 <span className="font-bold text-[#3B4739] cursor-pointer">[설정 &gt; 결제 정보 &gt; 결제 수단 관리]</span> 메뉴에서 진행하실 수 있습니다.<br/>만약 해당 메뉴가 보이지 않으신다면 다시 문의 남겨주세요.
                       </div>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  key="live-view"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 flex flex-col bg-slate-50"
                >
                  <div className="h-[3.5rem] py-2 border-b border-gray-100 flex items-center justify-between px-5 bg-white flex-shrink-0">
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-500 text-xs">김</div>
                      <div>
                        <div className="font-bold text-[0.8rem] text-gray-900 whitespace-nowrap">김고객</div>
                        <div className="flex items-center gap-1.5 text-[0.65rem] text-gray-500 whitespace-nowrap">
                          <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>온라인
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 flex-shrink-0 ml-4 items-center">
                      <button className="px-3 py-1.5 min-w-[70px] text-[0.7rem] font-semibold text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors whitespace-nowrap">담당자 변경</button>
                      <button className="px-3 py-1.5 min-w-[80px] text-[0.7rem] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-lg hover:bg-emerald-100 transition-colors whitespace-nowrap">상담 종료</button>
                    </div>
                  </div>
                  
                  <div className="flex-1 overflow-y-auto p-5 bg-slate-50">
                    <div className="flex items-start gap-3 mb-6">
                      <div className="w-8 h-8 rounded-full bg-gray-200 shrink-0 flex items-center justify-center font-bold text-gray-500 text-xs">김</div>
                      <div className="flex-1 flex flex-col items-start">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-bold text-[0.8rem] text-gray-900">김고객</span>
                          <span className="text-[0.65rem] text-gray-400">오전 10:42</span>
                        </div>
                        <div className="bg-white border border-gray-200 rounded-2xl rounded-tl-none p-3.5 text-[0.85rem] text-gray-700 shadow-sm leading-relaxed inline-block max-w-[70%] text-left break-keep">
                          안녕하세요, 현재 카드로 자동결제 중인데 다른 카드로 변경하고 싶습니다. 설정 메뉴 어디서 바꿀 수 있나요?
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 flex-row-reverse mb-6">
                      <div className="w-8 h-8 rounded-full bg-emerald-600 shrink-0 flex items-center justify-center font-bold text-white text-xs">상담</div>
                      <div className="flex-1 flex flex-col items-end">
                        <div className="flex items-center gap-2 mb-1 flex-row-reverse">
                          <span className="font-bold text-[0.8rem] text-gray-900">상담 관리자</span>
                          <span className="text-[0.65rem] text-gray-400">오전 10:45</span>
                        </div>
                        <div className="bg-emerald-50 border border-emerald-100 rounded-2xl rounded-tr-none p-3.5 text-[0.85rem] text-emerald-900 shadow-sm leading-relaxed inline-block max-w-[70%] text-left break-keep">
                          안녕하세요 김고객님,<br/>결제 수단 변경은 <span className="font-bold cursor-pointer">[설정 &gt; 결제 정보 &gt; 결제 수단 관리]</span> 메뉴에서 진행하실 수 있습니다.<br/><br/>만약 해당 메뉴가 보이지 않으신다면 다시 문의 남겨주세요.
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-white border-t border-gray-100">
                    <div className="border border-gray-200 rounded-xl overflow-hidden focus-within:border-emerald-400 focus-within:ring-1 focus-within:ring-emerald-400 transition-all flex flex-col h-[4.5rem]">
                      <textarea 
                        className="w-full px-3 py-2 text-[0.85rem] text-gray-700 resize-none outline-none flex-1" 
                        placeholder="메시지를 입력하세요 (Shift + Enter로 줄바꿈)"
                      />
                      <div className="p-1.5 flex justify-between items-center shrink-0">
                        <div className="flex gap-2">
                          <button className="p-1 text-gray-400 hover:text-gray-600 rounded"><Paperclip className="w-4 h-4" /></button>
                        </div>
                        <button className="p-1.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"><MessageSquare className="w-4 h-4" /></button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right: Info Panel */}
          <div className="w-[180px] sm:w-[26%] border-l border-gray-100 bg-[#fefefe] hidden lg:flex flex-col p-4 flex-shrink-0">
            <h4 className="font-bold text-[0.8rem] text-gray-900 mb-4 uppercase tracking-wider">문의 정보</h4>
            <div className="space-y-4">
              <div className="space-y-4">
                <div>
                  <div className="text-[0.75rem] text-gray-400 mb-1">상태</div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 bg-yellow-100 text-yellow-700 text-[0.75rem] font-bold rounded">확인 중</span>
                  </div>
                </div>
                <div>
                  <div className="text-[0.75rem] text-gray-400 mb-1">담당자</div>
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-[#F4F5F0] flex items-center justify-center font-bold text-[#4F5E4D] text-[0.6rem]">상담</div>
                    <span className="text-[0.85rem] font-medium text-gray-900">김상담 매니저</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="h-px bg-gray-100 my-6"></div>

            <h4 className="font-bold text-[0.8rem] text-gray-900 mb-4 uppercase tracking-wider">고객 이전 이력</h4>
            <div className="space-y-3">
              <div className="p-2.5 bg-gray-50 border border-gray-100 rounded-lg cursor-pointer hover:bg-white transition-colors">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[0.7rem] font-bold text-gray-900">요금제 업그레이드</span>
                  <span className="text-[0.65rem] text-gray-400">2023.10.15</span>
                </div>
                <div className="text-[0.8rem] text-gray-500 truncate">팀즈 플랜으로 변경하고 싶습니다...</div>
              </div>
            </div>
          </div>
            </div>
          </div>
        </div>
        </motion.div>
      </div>
    </section>
  );
};

const FeatureItem = ({ 
  icon: Icon, 
  title, 
  description, 
  children, 
  delay = 0,
  hoverBg = '#f0fdf4',
  hoverBorder = '#a7f3d0',
  iconHoverBg = 'group-hover:bg-[#E0EBE4]',
  iconHoverText = 'group-hover:text-[#2E5242]',
  titleHoverText = 'group-hover:text-[#1F3B2E]',
  borderHover = 'group-hover:border-[#D5E3DB]'
}: { 
  icon: any, 
  title: string, 
  description: string, 
  children?: React.ReactNode, 
  delay?: number,
  hoverBg?: string,
  hoverBorder?: string,
  iconHoverBg?: string,
  iconHoverText?: string,
  titleHoverText?: string,
  borderHover?: string,
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -4, backgroundColor: hoverBg, borderColor: hoverBorder, transition: { duration: 0.15 } }}
      className="p-8 pb-10 rounded-[1.25rem] bg-white border border-gray-200 flex flex-col h-full shadow-[0_2px_8px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_24px_-8px_rgba(0,0,0,0.08)] transition-shadow group cursor-pointer"
    >
      <div className={`w-11 h-11 rounded-[0.85rem] bg-[#f4f4f5] ${iconHoverBg} transition-colors flex items-center justify-center mb-8`}>
        <Icon className={`w-[1.125rem] h-[1.125rem] text-[#18181B] ${iconHoverText} transition-colors`} strokeWidth={1.5} />
      </div>
      <h3 className={`text-[1.1rem] font-bold text-gray-900 mb-2 tracking-wide ${titleHoverText} transition-colors`}>{title}</h3>
      <p className="text-gray-500 text-[0.95rem] leading-[1.6]">
        {description}
      </p>
      {children && (
        <div className={`mt-8 pt-6 border-t border-gray-100 ${borderHover} flex-1 flex flex-col justify-end transition-colors`}>
          {children}
        </div>
      )}
    </motion.div>
  );
};

const Features = () => {
  return (
    <section id="features" className="py-24 bg-white px-6">
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">고객 상담을 관리하는 핵심 기능</h2>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">문의 접수부터 응대, 답변, 이력 관리까지<br/>기업 상담 업무에 필요한 핵심 기능을 제공합니다.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureItem 
            icon={MessageCircle}
            title="실시간 채팅 상담"
            description="고객과 상담원이 바로 대화하며 빠른 문의 응대를 지원합니다."
            delay={0.1}
            hoverBg="#F4F8F5"
            hoverBorder="#E3EBE6"
            iconHoverBg="group-hover:bg-[#EAF0EC]"
            iconHoverText="group-hover:text-[#184632]"
            titleHoverText="group-hover:text-[#184632]"
            borderHover="group-hover:border-[#E3EBE6]"
          >
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center bg-gray-50/80 rounded-lg p-2.5 border border-gray-100 group-hover:bg-white group-hover:border-[#E3EBE6] transition-colors">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-red-400 rounded-full animate-pulse"></div>
                  <span className="text-[0.8rem] font-bold text-gray-700 group-hover:text-[#184632] transition-colors">신규 문의 도착</span>
                </div>
                <span className="text-[0.7rem] font-bold text-gray-400">1분 전</span>
              </div>
              <div className="flex justify-between items-center bg-gray-50/80 rounded-lg p-2.5 border border-gray-100 group-hover:bg-white group-hover:border-[#E3EBE6] transition-colors">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                  <span className="text-[0.8rem] font-bold text-gray-700 group-hover:text-[#184632] transition-colors">상담 진행 중</span>
                </div>
                <span className="text-[0.7rem] font-bold text-gray-400">상담원 박지원</span>
              </div>
            </div>
          </FeatureItem>
          <FeatureItem 
            icon={MessageSquare}
            title="게시판형 문의 접수"
            description="고객은 채팅처럼 문의를 남기고 상담자는 1:1 문의로 처리합니다."
            delay={0.2}
            hoverBg="#FCFCF9"
            hoverBorder="#EAECE1"
            iconHoverBg="group-hover:bg-[#F0F2E6]"
            iconHoverText="group-hover:text-[#5E6B47]"
            titleHoverText="group-hover:text-[#3B452B]"
            borderHover="group-hover:border-[#E1E3D3]"
          >
            <div className="flex flex-col gap-2">
               <div className="flex items-center gap-2 text-[0.8rem] font-bold text-gray-600 group-hover:text-[#4A5538] transition-colors p-2 rounded-lg border border-gray-100 group-hover:border-[#EAECE1] group-hover:bg-white"><div className="w-5 h-5 rounded-full bg-white flex items-center justify-center shadow-sm text-gray-400 group-hover:text-[#5E6B47] transition-colors">1</div> 문의 접수</div>
               <div className="flex items-center gap-2 text-[0.8rem] font-bold text-gray-600 group-hover:text-[#4A5538] transition-colors p-2 rounded-lg border border-gray-100 group-hover:border-[#EAECE1] group-hover:bg-white"><div className="w-5 h-5 rounded-full bg-white flex items-center justify-center shadow-sm text-gray-400 group-hover:text-[#5E6B47] transition-colors">2</div> 답변 등록</div>
               <div className="flex items-center gap-2 text-[0.8rem] font-bold text-gray-600 group-hover:text-[#4A5538] transition-colors p-2 rounded-lg border border-gray-100 group-hover:border-[#EAECE1] group-hover:bg-white"><div className="w-5 h-5 rounded-full bg-white flex items-center justify-center shadow-sm text-gray-400 group-hover:text-[#5E6B47] transition-colors">3</div> 문의창에서 확인</div>
            </div>
          </FeatureItem>
          <FeatureItem 
            icon={CalendarSync}
            title="상담 이력 관리"
            description="상담 내용과 답변, 첨부자료를 고객별 이력으로 보관합니다."
            delay={0.3}
            hoverBg="#F7F9F8"
            hoverBorder="#E1E6E3"
            iconHoverBg="group-hover:bg-[#EAF0ED]"
            iconHoverText="group-hover:text-[#3B5246]"
            titleHoverText="group-hover:text-[#2D4538]"
            borderHover="group-hover:border-[#E1E6E3]"
          >
            <div className="space-y-3 bg-gray-50/50 rounded-xl p-3 border border-gray-100 group-hover:bg-white group-hover:border-[#E1E6E3] transition-colors">
               <div className="flex justify-between items-center text-[0.8rem] text-gray-500 border-b border-gray-100/50 pb-2 group-hover:border-[#EBF0EE] transition-colors">
                  <span className="font-bold text-gray-700">이전 문의</span>
                  <span className="truncate max-w-[100px] group-hover:text-[#3B5246] transition-colors font-medium">결제수단 변경 건</span>
               </div>
               <div className="flex justify-between items-center text-[0.8rem] text-gray-500 border-b border-gray-100/50 pb-2 group-hover:border-[#EBF0EE] transition-colors">
                  <span className="font-bold text-gray-700">첨부자료</span>
                  <div className="flex items-center gap-1 font-medium"><Paperclip className="w-3 h-3 text-gray-400 group-hover:text-[#3B5246] transition-colors"/>영수증.pdf</div>
               </div>
               <div className="flex justify-between items-center text-[0.8rem] text-gray-500">
                  <span className="font-bold text-gray-700">처리 상태</span>
                  <span className="px-1.5 py-0.5 bg-white border border-gray-200 rounded text-[0.7rem] font-bold text-gray-600 shadow-sm group-hover:bg-[#F0F2F1] group-hover:text-[#2D4538] group-hover:border-[#E1E6E3] transition-colors">완료됨</span>
               </div>
            </div>
          </FeatureItem>
        </div>

        {/* Solution Types Section */}
        <div id="solutions" className="mt-28 mb-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-gray-900">상담 방식에 맞춰 선택하는 두 가지 솔루션</h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">즉시 응대가 필요한 고객에게는 실시간 채팅 상담을,<br/>검토 후 답변이 필요한 문의에는 게시판형 채팅 상담을 사용할 수 있습니다.</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Card 1: Board */}
            <motion.div 
              id="solution-board"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="rounded-[2.5rem] bg-gray-50 border border-gray-200 p-10 md:p-12 flex flex-col overflow-hidden relative group h-[640px]"
            >
              <div className="relative z-10 lg:pr-10 mb-10">
                <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-4 text-gray-900">
                  문의 접수부터 답변까지<br />게시판형으로 체계적으로 관리하세요.
                </h3>
                <p className="text-gray-500 text-[1.05rem] leading-relaxed mb-8">
                  고객은 채팅처럼 문의를 남기고,<br/>상담자는 접수된 문의를 확인한 뒤 답변을 등록합니다.<br/>답변은 고객이 같은 문의창에서 확인할 수 있습니다.
                </p>
                <div className="grid grid-cols-2 gap-y-3 gap-x-4">
                  {['채팅형 문의 접수', '문의 상태 관리', '답변 등록 및 확인', '재문의와 원문의 연결'].map((item, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-white border border-gray-200 flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3 text-[#5E6B47] stroke-[3]" />
                      </div>
                      <span className="text-gray-600 text-sm font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="w-full relative bg-white border border-gray-200 rounded-2xl p-4 z-10 flex flex-1 shadow-sm overflow-hidden gap-4">
                 {/* Left List */}
                  <div className="w-[35%] flex flex-col gap-2">
                   <div className="bg-gray-50 border border-gray-100 rounded-lg p-3">
                     <div className="flex justify-between mb-2"><span className="px-1.5 py-0.5 bg-[#f0f2eb] text-[#5E6B47] text-[0.6rem] font-bold rounded">답변 완료</span></div>
                     <div className="text-[0.75rem] text-gray-900 font-bold truncate mb-0.5">이메일 변경 요청</div>
                   </div>
                   <div className="bg-white border border-gray-200 rounded-lg p-3 relative shadow-md">
                     <div className="absolute top-0 -left-1 bottom-0 w-1 bg-[#5E6B47] rounded-l"></div>
                     <div className="flex justify-between mb-2"><span className="px-1.5 py-0.5 bg-[#f9f4ea] text-[#8c7853] text-[0.6rem] font-bold rounded">확인 중</span></div>
                     <div className="text-[0.75rem] text-gray-900 font-bold truncate mb-0.5">결제 관련 문의</div>
                   </div>
                   <div className="bg-gray-50 border border-gray-100 rounded-lg p-3">
                     <div className="flex justify-between mb-2"><span className="px-1.5 py-0.5 bg-[#fcf2f2] text-[#b06161] text-[0.6rem] font-bold rounded">접수</span></div>
                     <div className="text-[0.75rem] text-gray-500 font-medium truncate mb-0.5">오류 제보</div>
                   </div>
                 </div>
                 {/* Right Detail */}
                 <div className="flex-1 flex flex-col min-w-0">
                   <div className="flex items-center gap-2 mb-3">
                     <span className="text-[0.85rem] font-bold text-gray-900 truncate">결제 관련 문의</span>
                   </div>
                   <div className="flex items-center gap-2 border border-gray-100 bg-gray-50 rounded-lg p-2 mb-3">
                      <span className="px-1.5 py-0.5 bg-gray-200 text-gray-600 text-[0.55rem] font-bold rounded shrink-0">원문의</span>
                      <span className="text-[0.65rem] text-gray-500 truncate">카드 등록 안내</span>
                   </div>
                   
                   <div className="bg-gray-50 border border-gray-100 rounded-lg p-3 mb-3">
                      <div className="flex items-center gap-1.5 mb-2">
                        <Check className="w-3 h-3 text-[#5E6B47] stroke-[3]"/>
                        <span className="text-[0.65rem] font-bold text-[#5E6B47]">상담 관리자가 답변을 등록했습니다.</span>
                      </div>
                      <div className="text-[0.7rem] text-gray-600 leading-relaxed">회원님, 결제 카드 분실 시 등록된 결제수단 변경은 설정 페이지 메뉴에서 처리하실 수 있습니다. 추가적인 도움이 필요하시면 다시 문의해 주세요.</div>
                   </div>

                   <div className="mt-auto border border-gray-200 bg-gray-50 rounded-lg overflow-hidden flex flex-col">
                      <div className="px-3 py-2.5 text-[0.65rem] text-gray-400 h-[64px]">고객에게 전달할 추가 답변을 작성해주세요...</div>
                      <div className="bg-white border-t border-gray-200 px-3 py-2 flex justify-between items-center">
                         <Paperclip className="w-3.5 h-3.5 text-gray-400" />
                         <div className="px-3 py-1.5 bg-gray-900 text-white text-[0.65rem] font-bold rounded flex items-center justify-center shadow-sm">답변 등록</div>
                      </div>
                   </div>
                 </div>
              </div>

              {/* Decor background elements */}
              <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#EAECE0]/80 blur-[80px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />
            </motion.div>

            {/* Card 2: Realtime */}
            <motion.div 
              id="solution-realtime"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="rounded-[2.5rem] bg-gray-50 border border-gray-200 p-10 md:p-12 flex flex-col overflow-hidden relative group h-[640px]"
            >
              <div className="relative z-10 lg:pr-10 mb-10">
                <h3 className="text-2xl md:text-3xl font-bold tracking-tight leading-tight mb-4 text-gray-900">
                  고객과 바로 연결되는<br />실시간 채팅 상담을 운영하세요.
                </h3>
                <p className="text-gray-500 text-[1.05rem] leading-relaxed mb-8">
                  상담원이 고객과 실시간으로 대화하며,<br/>상담 중 고객 정보와 이전 상담 이력을 함께 확인할 수 있습니다.
                </p>
                <div className="grid grid-cols-2 gap-y-3 gap-x-4">
                  {['실시간 메시지 응대', '상담원 배정', '고객 정보 확인', '상담 이력 저장'].map((item, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-white border border-gray-200 flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3 text-[#2E5242] stroke-[3]" />
                      </div>
                      <span className="text-gray-600 text-sm font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="w-full relative bg-white border border-gray-200 rounded-2xl p-4 z-10 flex flex-1 shadow-sm overflow-hidden gap-4">
                 {/* Left List */}
                 <div className="w-[30%] flex flex-col gap-2">
                   <div className="bg-[#EEF5F0] border border-[#C8DCD0] rounded-lg p-3 relative shadow-sm">
                     <div className="absolute top-0 -left-1 bottom-0 w-1 bg-[#2E5242] rounded-l"></div>
                     <div className="flex justify-between mb-1.5 items-center">
                        <div className="flex items-center gap-1.5">
                           <div className="w-6 h-6 rounded-full bg-[#E0EBE4] flex items-center justify-center text-[0.6rem] font-bold text-[#1F3B2E]">이</div>
                           <span className="text-[0.7rem] font-bold text-gray-900">이도현</span>
                        </div>
                     </div>
                     <span className="px-1.5 py-0.5 bg-[#E0EBE4] text-[#1F3B2E] text-[0.6rem] font-bold rounded inline-block mt-1">상담중</span>
                   </div>
                   <div className="bg-gray-50 border border-gray-100 rounded-lg p-3">
                     <div className="flex justify-between items-center">
                        <div className="flex items-center gap-1.5">
                           <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-[0.6rem] font-bold text-gray-600">김</div>
                           <span className="text-[0.7rem] font-bold text-gray-600">김지민</span>
                        </div>
                     </div>
                     <span className="px-1.5 py-0.5 bg-gray-200 text-gray-600 text-[0.6rem] font-bold rounded inline-block mt-2">종료</span>
                   </div>
                 </div>

                 {/* Center Chat */}
                 <div className="flex-1 flex flex-col bg-gray-50 rounded-lg border border-gray-200 relative min-w-0">
                    <div className="border-b border-gray-200 p-3 flex justify-between items-center bg-white rounded-t-lg shrink-0">
                       <span className="text-[0.75rem] font-bold text-gray-900">이도현 (진행중)</span>
                       <span className="px-2 py-1 bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-600 text-[0.6rem] font-bold rounded shadow-[0_1px_2px_rgba(0,0,0,0.05)] transition-colors cursor-pointer">상담 종료하기</span>
                    </div>
                    <div className="p-3 flex-1 flex flex-col gap-3 overflow-hidden">
                       <div className="bg-white border border-gray-200 rounded-xl rounded-tl-none p-3 text-[0.7rem] text-gray-700 w-[85%] shadow-sm leading-relaxed">결제했는데 포인트가 안 들어왔습니다. 확인 부탁드려요. 결제 영수증도 다 받았습니다.</div>
                       <div className="bg-[#2E5242] text-white rounded-xl rounded-tr-none p-3 text-[0.7rem] w-[85%] self-end shadow-sm leading-relaxed">안녕하세요 고객님! 현재 시스템 지연으로 포인트 충전이 지연되고 있습니다. 5분 내 정산될 예정입니다.</div>
                    </div>
                    <div className="m-3 mt-1 bg-white border border-gray-200 rounded p-2 text-[0.65rem] text-gray-400 h-10 flex items-center">메시지 입력...</div>
                 </div>

                 {/* Right Info */}
                 <div className="w-[28%] flex flex-col gap-3 border-l border-gray-100 pl-4 py-2 shrink-0 hidden sm:flex">
                    <div className="flex flex-col items-center border-b border-gray-100 pb-4 pt-1">
                       <div className="w-10 h-10 rounded-full bg-[#E0EBE4] mb-2 flex items-center justify-center text-sm font-bold text-[#1F3B2E] ring-2 ring-white shadow-sm">이</div>
                       <div className="text-[0.75rem] font-bold text-gray-900 mb-1">이도현</div>
                       <div className="text-[0.6rem] text-gray-500 font-medium">VIP 회원</div>
                    </div>
                    <div className="flex-1">
                       <div className="text-[0.65rem] text-gray-500 mb-2 font-bold uppercase tracking-wider">이전 상담 이력</div>
                       <div className="bg-gray-50 rounded-lg p-2.5 border border-gray-100 text-[0.65rem] text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer mb-2">
                         <div className="font-bold text-gray-900 mb-1 truncate">요금제 업그레이드 문의</div>
                         <div className="text-[0.6rem] text-gray-500">2023.10.15</div>
                       </div>
                    </div>
                 </div>
              </div>

              {/* Decor background elements */}
              <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#D5E3DB]/50 blur-[80px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

const SolutionShowcase = () => {
  const [activeTab, setActiveTab] = useState<'realtime' | 'board'>('realtime');

  return (
    <section className="py-24 bg-white px-6">
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center mb-16 relative z-20">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-gray-900">각 솔루션별 상세 기능 살펴보기</h2>
          <p className="text-lg text-gray-500 mb-10 max-w-2xl mx-auto">팀의 상황과 상담 성격에 맞는 솔루션의 세부 화면을 확인해보세요.</p>
          <div className="flex bg-[#f5f5f7] p-1 rounded-full w-max mx-auto shadow-inner">
            <button 
              onClick={() => setActiveTab('realtime')}
              className={`px-8 py-2.5 rounded-full font-medium text-[0.95rem] transition-all duration-300 ${activeTab === 'realtime' ? 'bg-white shadow text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
            >
              실시간 채팅 솔루션
            </button>
            <button 
              onClick={() => setActiveTab('board')}
              className={`px-8 py-2.5 rounded-full font-medium text-[0.95rem] transition-all duration-300 ${activeTab === 'board' ? 'bg-white shadow text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
            >
              게시판형 채팅 솔루션
            </button>
          </div>
        </div>

        <div className="relative min-h-[1700px] md:min-h-[900px]">
          <AnimatePresence mode="wait">
            {activeTab === 'realtime' && (
              <motion.div
                key="realtime"
                initial={{ opacity: 0, filter: "blur(4px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, filter: "blur(4px)" }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-12 gap-6 absolute inset-0 content-start"
              >
                {/* Card 1 */}
                <div className="md:col-span-7 bg-[#f6f7f9] rounded-[2rem] p-10 h-[450px] relative overflow-hidden group">
                  <div className="relative z-10">
                    <h3 className="text-[1.75rem] font-medium mb-2 tracking-tight text-gray-900">실시간 문의 응대</h3>
                    <p className="text-[#a1a1aa] text-[1.05rem] leading-[1.6]">고객 문의를 실시간으로 확인하고<br/>빠르게 답변할 수 있어요.</p>
                  </div>
                  {/* Abstract UI */}
                  <div className="absolute bottom-0 right-0 w-[85%] h-[60%] translate-x-8 translate-y-8 bg-white rounded-tl-[1.5rem] shadow-2xl border border-gray-200 p-5 flex transition-transform duration-700 ease-out group-hover:translate-x-4 group-hover:translate-y-4">
                    <div className="flex gap-4 h-full w-full">
                      {/* Left list */}
                      <div className="w-[40%] bg-gray-50 rounded-xl border border-gray-100 p-4 h-full flex flex-col gap-3 relative overflow-hidden hidden sm:flex">
                          <div className="flex justify-between items-center mb-2">
                             <div className="w-16 h-4 bg-gray-200 rounded-lg"></div>
                             <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-red-400 animate-pulse"></div><span className="text-[0.65rem] font-bold text-red-500">LIVE</span></div>
                          </div>
                          <div className="w-full bg-white rounded-lg shadow-sm border border-orange-100 p-3 ring-1 ring-orange-50">
                            <div className="flex justify-between mb-2 items-center">
                              <div className="w-12 h-3 bg-gray-200 rounded-full"></div>
                              <div className="px-1.5 py-0.5 bg-orange-100 text-orange-600 rounded text-[0.55rem] font-bold">대기중</div>
                            </div>
                            <div className="w-3/4 h-2 bg-gray-100 rounded-full"></div>
                          </div>
                           <div className="w-full bg-white rounded-lg border border-green-200 ring-1 ring-green-50 p-3 shadow-sm">
                            <div className="flex justify-between mb-2 items-center">
                              <div className="w-16 h-3 bg-gray-200 rounded-full"></div>
                              <div className="px-1.5 py-0.5 bg-green-100 text-green-600 rounded text-[0.55rem] font-bold">상담중</div>
                            </div>
                            <div className="w-2/3 h-2 bg-gray-100 rounded-full"></div>
                          </div>
                      </div>
                      {/* Right Chat */}
                      <div className="flex-1 bg-white rounded-xl border border-gray-100 overflow-hidden relative flex flex-col shadow-[0_5px_15px_rgba(0,0,0,0.02)]">
                        <div className="h-10 border-b border-gray-100 px-4 flex items-center bg-gray-50/50 gap-2">
                             <div className="w-5 h-5 rounded-full bg-gray-200"></div>
                             <div className="w-16 h-2 bg-gray-300 rounded-full"></div>
                        </div>
                        <div className="flex-1 p-4 flex flex-col gap-3 justify-end">
                           <div className="flex gap-2 w-[85%] self-start">
                             <div className="w-5 h-5 rounded-full bg-gray-100 shrink-0"></div>
                             <div className="p-2.5 bg-gray-100 rounded-xl rounded-tl-sm w-full"><div className="w-full h-2 bg-gray-300 rounded-full mb-1.5"></div><div className="w-2/3 h-2 bg-gray-300 rounded-full"></div></div>
                           </div>
                           <div className="flex gap-2 w-[85%] self-end flex-row-reverse">
                             <div className="p-2.5 bg-gray-900 rounded-xl rounded-tr-sm w-full"><div className="w-full h-2 bg-gray-600 rounded-full mb-1.5"></div><div className="w-3/4 h-2 bg-gray-600 rounded-full"></div></div>
                           </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card 2 */}
                <div className="md:col-span-5 bg-[#f6f3fc] rounded-[2rem] p-10 h-[450px] relative overflow-hidden group">
                  <div className="relative z-10">
                    <h3 className="text-[1.75rem] font-medium mb-2 tracking-tight text-gray-900">상담원 통합 화면</h3>
                    <p className="text-[#988cae] text-[1.05rem] leading-[1.6]">상담 목록과 대화, 고객 정보를<br/>한 화면에서 확인할 수 있어요.</p>
                  </div>
                  {/* Abstract UI */}
                  <div className="absolute bottom-0 right-0 w-[95%] left-1/2 -translate-x-1/2 translate-y-8 bg-white rounded-t-[1.25rem] shadow-[0_-10px_40px_rgba(0,0,0,0.05)] border border-[#ede9f6] p-3 flex gap-2 h-[60%] transition-transform duration-700 ease-out group-hover:translate-y-4">
                     {/* Left: List */}
                     <div className="w-[28%] h-full bg-gray-50 rounded-lg border border-gray-100 p-2 flex flex-col gap-2">
                       <div className="w-full h-8 bg-white rounded border border-gray-200 shadow-sm flex items-center px-2 gap-1.5"><div className="w-1.5 h-1.5 bg-green-400 rounded-full shrink-0"></div><div className="w-1/2 h-1.5 bg-gray-200 rounded-full"></div></div>
                       <div className="w-full h-8 bg-gray-200/50 rounded flex items-center px-2 gap-1.5"><div className="w-1.5 h-1.5 bg-gray-300 rounded-full shrink-0"></div><div className="w-1/2 h-1.5 bg-gray-300 rounded-full"></div></div>
                       <div className="w-full h-8 bg-gray-200/50 rounded flex items-center px-2 gap-1.5"><div className="w-1.5 h-1.5 bg-gray-300 rounded-full shrink-0"></div><div className="w-1/2 h-1.5 bg-gray-300 rounded-full"></div></div>
                     </div>
                     {/* Mid: Chat */}
                     <div className="flex-1 h-full bg-white rounded-lg border border-gray-100 flex flex-col relative shadow-sm">
                        <div className="h-4 border-b border-gray-100 m-2"></div>
                        <div className="flex-1 p-2 flex flex-col gap-2 justify-end">
                           <div className="w-2/3 h-5 bg-gray-100 rounded-md self-start"></div>
                           <div className="w-2/3 h-5 bg-gray-900 rounded-md self-end"></div>
                        </div>
                        <div className="h-6 border-t border-gray-100 m-2 mt-auto bg-gray-50 rounded flex items-center px-2">
                           <div className="w-12 h-1.5 bg-gray-200 rounded-full"></div>
                        </div>
                     </div>
                     {/* Right: Info */}
                     <div className="w-[28%] h-full bg-gray-50 rounded-lg border border-gray-100 p-2 flex flex-col gap-2 relative overflow-hidden">
                        <div className="flex flex-col items-center gap-1.5 mt-2 mb-1 border-b border-gray-200 pb-3">
                           <div className="w-8 h-8 rounded-full bg-gray-200"></div>
                           <div className="w-12 h-2 bg-gray-400 rounded-full"></div>
                           <div className="px-1.5 py-0.5 bg-purple-100 text-purple-700 rounded-[3px] text-[0.45rem] font-bold">VIP</div>
                        </div>
                        <div className="space-y-1.5">
                           <div className="w-full h-5 bg-white rounded border border-gray-200 flex items-center px-1.5"><div className="w-1/2 h-1.5 bg-gray-200 rounded-full"></div></div>
                           <div className="w-full h-5 bg-white rounded border border-gray-200 flex items-center px-1.5"><div className="w-1/2 h-1.5 bg-gray-200 rounded-full"></div></div>
                        </div>
                     </div>
                  </div>
                </div>

                {/* Card 3 */}
                <div className="md:col-span-5 bg-[#eef8f2] rounded-[2rem] p-10 h-[450px] relative overflow-hidden group">
                  <div className="relative z-10 mb-8">
                    <h3 className="text-[1.75rem] font-medium mb-2 tracking-tight text-gray-900">고객 정보 확인</h3>
                    <p className="text-[#84a993] text-[1.05rem] leading-[1.6]">채팅 중에도 고객 정보와<br/>상담 이력을 함께 볼 수 있어요.</p>
                  </div>
                  {/* Abstract UI */}
                  <div className="absolute bottom-0 left-0 w-[85%] h-[60%] left-1/2 -translate-x-1/2 bg-white rounded-t-[1.5rem] shadow-[0_-10px_40px_rgba(0,0,0,0.05)] border border-[#dfede4] p-5 transition-transform duration-700 ease-out group-hover:-translate-y-4 flex flex-col gap-4">
                     <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-xl border border-gray-100">
                       <div className="w-12 h-12 bg-gray-200 rounded-full border-2 border-white shadow-sm ring-1 ring-gray-100 shrink-0"></div>
                       <div className="flex-1">
                         <div className="flex items-center gap-2 mb-1.5">
                           <div className="text-[0.95rem] font-bold text-gray-900 tracking-tight">강지윤</div>
                           <div className="px-1.5 py-0.5 bg-purple-100 text-purple-700 rounded-[4px] text-[0.55rem] font-bold">VIP</div>
                         </div>
                         <div className="flex gap-1.5">
                           <div className="w-16 h-2 bg-gray-300 rounded-full"></div>
                           <div className="w-10 h-2 bg-gray-200 rounded-full"></div>
                         </div>
                       </div>
                     </div>

                     <div className="space-y-3">
                       <div className="text-[0.7rem] font-bold text-gray-400">최근 상담 이력</div>
                       <div className="bg-white border border-gray-100 rounded-lg p-3 shadow-sm border-l-2 border-l-green-400">
                         <div className="flex justify-between items-center mb-2">
                           <div className="px-1.5 py-0.5 bg-gray-100 text-gray-600 rounded text-[0.55rem] font-bold">결제/환불</div>
                           <div className="text-[0.6rem] text-gray-400 font-medium tracking-tight">3일 전</div>
                         </div>
                         <div className="w-full h-2 bg-gray-200 rounded-full mb-1.5"></div>
                         <div className="w-3/4 h-2 bg-gray-200 rounded-full"></div>
                       </div>
                       <div className="bg-white border border-gray-100 rounded-lg p-3 shadow-sm opacity-60">
                         <div className="flex justify-between items-center mb-2">
                           <div className="px-1.5 py-0.5 bg-gray-100 text-gray-400 rounded text-[0.55rem] font-bold">이용 문의</div>
                           <div className="text-[0.6rem] text-gray-400 font-medium tracking-tight">10일 전</div>
                         </div>
                       </div>
                     </div>
                  </div>
                </div>

                {/* Card 4 */}
                <div className="md:col-span-7 bg-[#f2f3f5] rounded-[2rem] p-10 h-[450px] relative overflow-hidden group">
                  <div className="relative z-10 w-[60%]">
                    <h3 className="text-[1.75rem] font-medium mb-2 tracking-tight text-gray-900">상담 이력 관리</h3>
                    <p className="text-[#a1a1aa] text-[1.05rem] leading-[1.6]">종료된 상담과 첨부자료를 보관해<br/>이전 문의를 다시 확인할 수 있어요.</p>
                  </div>
                  {/* Abstract UI */}
                  <div className="absolute bottom-8 right-8 w-[65%] max-w-[340px] bg-white rounded-2xl shadow-[0_15px_40px_rgba(0,0,0,0.06)] border border-gray-100 p-5 transition-transform duration-700 ease-out group-hover:scale-105 group-hover:-translate-y-2 origin-bottom-right">
                     <div className="flex justify-between items-center mb-4 border-b border-gray-50 pb-3">
                       <div className="text-[0.95rem] font-bold text-gray-900 tracking-tight">저장된 상담 이력</div>
                       <div className="w-6 h-6 rounded bg-gray-50 flex items-center justify-center">
                         <div className="w-3 h-1 bg-gray-200 rounded-sm"></div>
                       </div>
                     </div>

                     <div className="space-y-3">
                       <div className="bg-white border border-gray-100 shadow-sm rounded-xl p-3 flex flex-col gap-2">
                         <div className="flex justify-between items-start">
                           <div className="flex items-center gap-2">
                             <div className="w-7 h-7 rounded-full bg-gray-100"></div>
                             <div>
                               <div className="text-[0.7rem] font-bold text-gray-900">김지민</div>
                               <div className="text-[0.55rem] text-gray-400">2023.10.15</div>
                             </div>
                           </div>
                           <div className="px-1.5 py-0.5 bg-gray-100 text-gray-500 rounded text-[0.55rem] font-bold">보관됨</div>
                         </div>
                         <div className="bg-gray-50 rounded-lg p-2.5 flex items-center justify-between border border-gray-100/50">
                           <div className="flex flex-col gap-1.5">
                              <div className="w-32 h-1.5 bg-gray-300 rounded-full"></div>
                              <div className="w-20 h-1.5 bg-gray-200 rounded-full"></div>
                           </div>
                           <div className="w-7 h-7 rounded bg-white border border-gray-100 shadow-sm flex items-center justify-center shrink-0">
                             <Paperclip className="w-3.5 h-3.5 text-gray-400" />
                           </div>
                         </div>
                       </div>

                       <div className="bg-white border border-gray-100 shadow-sm rounded-xl p-3 flex flex-col gap-2 opacity-60">
                         <div className="flex justify-between items-start">
                           <div className="flex items-center gap-2">
                             <div className="w-7 h-7 rounded-full bg-gray-100"></div>
                             <div>
                               <div className="text-[0.7rem] font-bold text-gray-900">이도현</div>
                               <div className="text-[0.55rem] text-gray-400">2023.10.10</div>
                             </div>
                           </div>
                           <div className="px-1.5 py-0.5 bg-gray-100 text-gray-400 rounded text-[0.55rem] font-bold">종료</div>
                         </div>
                         <div className="bg-gray-50 rounded-lg p-2.5 flex flex-col gap-1.5 border border-gray-100/50">
                            <div className="w-28 h-1.5 bg-gray-300 rounded-full"></div>
                            <div className="w-16 h-1.5 bg-gray-200 rounded-full"></div>
                         </div>
                       </div>
                     </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'board' && (
              <motion.div
                key="board"
                initial={{ opacity: 0, filter: "blur(4px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, filter: "blur(4px)" }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-12 gap-6 absolute inset-0 content-start"
              >
                {/* Card 1 */}
                <div className="md:col-span-7 bg-[#f0f5fa] rounded-[2rem] p-10 h-[450px] relative overflow-hidden group">
                  <div className="relative z-10 w-[60%]">
                    <h3 className="text-[1.75rem] font-medium mb-2 tracking-tight text-gray-900">채팅형 문의 접수</h3>
                    <p className="text-[#8ba7c0] text-[1.05rem] leading-[1.6]">고객은 채팅처럼 문의를 남기고<br/>상담자는 1:1 문의로 접수해요.</p>
                  </div>
                  {/* Abstract UI */}
                  <div className="absolute bottom-0 right-0 w-[70%] h-[60%] translate-x-8 translate-y-4 bg-white rounded-tl-[1.5rem] shadow-2xl border border-gray-200 p-5 flex flex-col gap-3 transition-transform duration-700 ease-out group-hover:translate-x-4 group-hover:translate-y-2">
                     <div className="border border-gray-100 rounded-xl p-4 bg-gray-50 flex flex-col gap-3">
                       <div className="w-1/3 h-6 bg-white border border-gray-200 rounded text-[0.6rem] flex items-center px-2 text-gray-500 font-bold shadow-sm">문의 유형 선택 ▾</div>
                       <div className="w-full h-16 bg-white border border-gray-200 rounded p-2 text-[0.6rem] text-gray-400 font-medium">내용을 입력해주세요...</div>
                       <div className="flex justify-between items-center">
                         <div className="w-6 h-6 bg-white border border-gray-200 shadow-sm rounded flex items-center justify-center shrink-0">
                            <Paperclip className="w-3.5 h-3.5 text-gray-400" />
                         </div>
                         <div className="px-4 py-1.5 bg-gray-900 text-white rounded text-[0.65rem] font-bold shadow-sm">문의 등록</div>
                       </div>
                     </div>
                     <div className="bg-white border border-green-100 shadow-[0_5px_15px_rgba(0,0,0,0.04)] rounded-xl p-4 flex gap-3 items-center ring-1 ring-green-50 mt-1 relative overflow-hidden">
                        <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center shrink-0">
                          <Check className="w-4 h-4 text-green-500 stroke-[3]" />
                        </div>
                        <div>
                          <div className="text-[0.75rem] font-bold text-gray-900 mb-0.5 tracking-tight">문의 접수됨</div>
                          <div className="text-[0.6rem] text-gray-500 font-medium">순차적으로 확인 후 안내해 드릴게요.</div>
                        </div>
                     </div>
                  </div>
                </div>

                {/* Card 2 */}
                <div className="md:col-span-5 bg-[#f8f5f0] rounded-[2rem] p-10 h-[450px] relative overflow-hidden group">
                  <div className="relative z-10">
                    <h3 className="text-[1.75rem] font-medium mb-2 tracking-tight text-gray-900">문의 상태 관리</h3>
                    <p className="text-[#a09a8f] text-[1.05rem] leading-[1.6]">접수부터 답변 완료까지<br/>처리 상태를 단계별로 관리해요.</p>
                  </div>
                  {/* Abstract UI */}
                  <div className="absolute bottom-0 right-0 w-[95%] left-1/2 -translate-x-1/2 translate-y-8 bg-white rounded-t-[1.25rem] shadow-[0_-10px_40px_rgba(0,0,0,0.05)] border border-[#ece4da] p-5 flex flex-col gap-3 h-[60%] transition-transform duration-700 ease-out group-hover:translate-y-4">
                    <div className="flex justify-between items-center border-b border-gray-100 pb-3 mb-1">
                       <div className="text-[0.8rem] font-bold text-gray-900">전체 문의 목록</div>
                       <div className="w-5 h-5 bg-gray-50 rounded flex items-center justify-center border border-gray-100"><div className="w-2.5 h-0.5 bg-gray-300 rounded-sm"></div></div>
                    </div>
                    <div className="bg-white border border-gray-100 rounded-lg p-3.5 shadow-sm">
                      <div className="flex justify-between items-start mb-3">
                        <div className="w-[60%] h-2 bg-gray-300 rounded-full"></div>
                        <div className="px-1.5 py-0.5 bg-yellow-100 text-yellow-700 rounded text-[0.55rem] font-bold">접수</div>
                      </div>
                      <div className="w-1/3 h-1.5 bg-gray-200 rounded-full"></div>
                    </div>
                    <div className="bg-gray-50 border border-gray-100 rounded-lg p-3.5">
                      <div className="flex justify-between items-start mb-3">
                        <div className="w-[50%] h-2 bg-gray-300 rounded-full"></div>
                        <div className="px-1.5 py-0.5 bg-yellow-100 text-yellow-700 rounded text-[0.55rem] font-bold">확인 중</div>
                      </div>
                      <div className="w-1/4 h-1.5 bg-gray-200 rounded-full"></div>
                    </div>
                    <div className="bg-gray-50/50 border border-gray-100 rounded-lg p-3.5 opacity-60">
                      <div className="flex justify-between items-start mb-3">
                        <div className="w-[70%] h-2 bg-gray-300 rounded-full"></div>
                        <div className="px-1.5 py-0.5 bg-gray-200 text-gray-600 rounded text-[0.55rem] font-bold">답변 완료</div>
                      </div>
                      <div className="w-1/3 h-1.5 bg-gray-200 rounded-full"></div>
                    </div>
                  </div>
                </div>

                {/* Card 3 */}
                <div className="md:col-span-5 bg-gray-50 rounded-[2rem] p-10 h-[450px] relative overflow-hidden group border border-gray-100">
                  <div className="relative z-10 mb-8">
                    <h3 className="text-[1.75rem] font-medium mb-2 tracking-tight text-gray-900">답변 등록 및 확인</h3>
                    <p className="text-gray-500 text-[1.05rem] leading-[1.6]">상담자가 답변을 등록하면<br/>고객은 문의창에서 확인할 수 있어요.</p>
                  </div>
                  {/* Abstract UI */}
                  <div className="absolute bottom-0 left-0 w-[85%] h-[60%] left-1/2 -translate-x-1/2 bg-white rounded-t-[1.5rem] shadow-[0_-10px_40px_rgba(0,0,0,0.05)] border border-gray-200 p-5 transition-transform duration-700 ease-out group-hover:-translate-y-2 flex flex-col gap-3">
                     <div className="flex justify-between items-center mb-1">
                        <div className="text-[0.8rem] font-bold text-gray-900">문의 내역</div>
                     </div>
                     <div className="bg-gray-50 border border-gray-100 rounded-xl p-3 shrink-0">
                       <div className="text-[0.7rem] font-medium text-gray-700 mb-1">결제수단 변경 문의</div>
                       <div className="flex justify-between items-center">
                         <div className="text-[0.6rem] text-gray-400">오후 2:30</div>
                       </div>
                     </div>
                     <div className="bg-[#EEF5F0] border border-[#C8DCD0] rounded-xl p-3 shrink-0">
                       <div className="flex items-center gap-2 mb-1">
                         <div className="w-4 h-4 bg-[#6A7A66] rounded-full flex items-center justify-center shrink-0">
                           <Check className="w-2.5 h-2.5 text-white" />
                         </div>
                         <div className="text-[0.7rem] font-bold text-[#2A3B2A]">답변이 등록되었습니다</div>
                       </div>
                       <div className="text-[0.65rem] text-[#3B4A3B] leading-relaxed">
                         고객님, 결제수단 변경은 설정 페이지에서...
                       </div>
                     </div>
                  </div>
                </div>

                {/* Card 4 */}
                <div className="md:col-span-7 bg-[#EEF5F0]/50 rounded-[2rem] p-10 h-[450px] relative overflow-hidden group border border-[#Dcece3]">
                  <div className="relative z-10 w-[60%]">
                    <h3 className="text-[1.75rem] font-medium mb-2 tracking-tight text-gray-900">문의 이력 관리</h3>
                    <p className="text-gray-500 text-[1.05rem] leading-[1.6]">재문의가 새로 등록돼도<br/>이전 문의와 연결, 관리되어 확인할 수 있어요.</p>
                  </div>
                  {/* Abstract UI */}
                  <div className="absolute right-0 bottom-8 h-[60%] w-[65%] max-w-[380px] bg-white rounded-tl-[1.5rem] rounded-bl-[0.5rem] shadow-[-10px_0_40px_rgba(0,0,0,0.06)] border border-[#C8DCD0] border-r-0 p-6 flex flex-col justify-center transition-transform duration-700 ease-out group-hover:-translate-x-2">
                     <div className="flex items-center gap-2 mb-5">
                       <div className="px-1.5 py-0.5 bg-red-50 text-red-600 rounded text-[0.6rem] font-bold border border-red-100">재문의</div>
                       <div className="text-[0.95rem] font-bold text-gray-900 truncate">결제했는데 포인트가 안 들어왔어요</div>
                     </div>
                     <div className="bg-gray-50 rounded-xl p-4.5 mb-5 border border-gray-200/60 relative mt-3 shadow-sm pt-5">
                       <div className="absolute -top-[0.65rem] left-5 bg-white px-2 py-0.5 text-[0.6rem] font-bold text-gray-500 border border-gray-200 rounded-sm shadow-sm ring-2 ring-gray-50">연결된 원문의</div>
                       <div className="flex justify-between items-center mb-2.5">
                          <div className="text-[0.75rem] font-bold text-gray-700 truncate w-[70%]">포인트 충전 오류입니다</div>
                          <div className="px-1.5 py-0.5 bg-gray-200 text-gray-600 rounded text-[0.55rem] font-bold">답변 완료</div>
                       </div>
                       <div className="text-[0.65rem] text-gray-500 line-clamp-1 mb-4">고객님, 시스템 오류로 처리가 지연되고 있습니다...</div>
                       <div className="w-full h-7 bg-white border border-gray-200 rounded text-[0.65rem] font-bold text-gray-600 flex items-center justify-center shadow-sm hover:bg-gray-50 transition-colors">원문의 확인하기</div>
                     </div>
                     <div className="flex justify-between items-center px-1">
                        <div className="flex items-center gap-2.5">
                           <div className="w-7 h-7 rounded-full bg-gray-200 border-2 border-white shadow-sm ring-1 ring-gray-100"></div>
                           <div className="w-20 h-2 bg-gray-300 rounded-full"></div>
                        </div>
                        <div className="w-12 h-1.5 bg-gray-200 rounded-full"></div>
                     </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  return (
    <section id="pricing" className="py-24 px-6 bg-[#f5f5f5]">
      <div className="max-w-[1024px] mx-auto">
        <div className="mb-12">
          <h2 className="text-[2.5rem] font-bold tracking-tight text-gray-900 mb-2">요금제</h2>
          <p className="text-[1.1rem] text-gray-500">
            게시판형 문의부터 실시간 채팅 상담까지<br />
            운영 방식에 맞는 플랜을 확인해보세요.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Board */}
          <div className="bg-white rounded-[1.5rem] p-8 lg:p-10 border border-black/[0.04] shadow-sm hover:shadow-[0_12px_30px_-10px_rgba(0,0,0,0.05)] hover:-translate-y-1 transition-all duration-300 flex flex-col">
            <div className="mb-8 flex-1">
              <h4 className="text-[1.15rem] font-medium text-gray-900 mb-3">게시판형 채팅 솔루션</h4>
              <div className="text-[2.5rem] font-bold text-gray-900 leading-none tracking-tight mb-6">무료</div>
              <p className="text-gray-500 text-[0.95rem] leading-[1.6]">
                우측 하단 문의창에서 게시판형 채팅 솔루션을 직접 체험할 수 있습니다.
              </p>
            </div>
            <div className="mt-auto">
              <Link 
                to="/pricing"
                className="block text-center w-full py-3.5 rounded-xl border border-gray-200 bg-white text-gray-900 text-[0.95rem] font-bold hover:bg-gray-50 transition-colors shadow-sm"
              >
                무료 플랜 보기
              </Link>
            </div>
          </div>

          {/* Realtime */}
          <div className="bg-gradient-to-b from-[#EEF5F0] via-[#F6F8F5] to-[#FFFFFF] rounded-[1.5rem] p-8 lg:p-10 border border-[#C8DCD0] shadow-[0_4px_20px_-5px_rgba(39,66,54,0.1)] hover:shadow-[0_12px_30px_-10px_rgba(39,66,54,0.15)] hover:-translate-y-1 transition-all duration-300 flex flex-col relative overflow-hidden">
            <div className="absolute top-8 right-8 lg:top-10 lg:right-10 bg-[#DCE6E0] text-[#1D3222] font-bold text-[0.7rem] py-1 px-3 rounded-full">추천</div>
            <div className="mb-8 relative z-10 flex-1 pr-12">
              <h4 className="text-[1.15rem] font-medium text-gray-900 mb-3">실시간 채팅 솔루션</h4>
              <div className="text-[2.5rem] font-bold text-gray-900 leading-none tracking-tight mb-6">실시간 상담 체험</div>
              <p className="text-gray-500 text-[0.95rem] leading-[1.6]">
                실시간 상담 화면과 운영 방식을 체험 화면으로 확인할 수 있습니다.
              </p>
            </div>
            <div className="mt-auto relative z-10">
              <Link 
                to="/pricing"
                className="block text-center w-full py-3.5 rounded-xl bg-[#274236] text-white text-[0.95rem] font-bold hover:bg-[#1C3027] transition-colors shadow-sm cursor-pointer"
              >
                체험 화면 보기
              </Link>
            </div>
          </div>

          {/* Custom */}
          <div className="bg-white rounded-[1.5rem] p-8 lg:p-10 border border-black/[0.04] shadow-sm hover:shadow-[0_12px_30px_-10px_rgba(0,0,0,0.05)] hover:-translate-y-1 transition-all duration-300 flex flex-col relative">
            <div className="mb-8 relative z-10 flex-1">
              <h4 className="text-[1.15rem] font-medium text-gray-900 mb-3">기업 맞춤 도입</h4>
              <div className="text-[2.5rem] font-bold text-gray-900 leading-none tracking-tight mb-6">문의 필요</div>
              <p className="text-gray-500 text-[0.95rem] leading-[1.6]">
                다중 채널 연동, 사내 보안 모드, 전용 서버 구축 등 기업 규모와 환경에 맞는 최적의 솔루션을 제공합니다.
              </p>
            </div>
            <div className="mt-auto relative z-10">
              <Link 
                to="/pricing"
                className="block text-center w-full py-3.5 rounded-xl bg-white text-gray-900 border border-gray-200 text-[0.95rem] font-bold hover:bg-gray-50 transition-colors shadow-sm"
              >
                맞춤 도입 보기
              </Link>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

const CTA = () => {
  const { startDemoFlow } = React.useContext(FlowContext);

  return (
    <section id="contact" className="py-32 px-6 bg-gray-50 overflow-hidden relative flex items-center justify-center min-h-[600px] border-t border-gray-200">
      {/* Perspective Grid Background */}
      <div className="absolute inset-0 pointer-events-none flex justify-center items-center text-[#5E6B47]">
        <svg className="w-full h-full min-w-[1200px] opacity-[0.1]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid slice">
          <defs>
            <radialGradient id="gridGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.8"/>
              <stop offset="100%" stopColor="currentColor" stopOpacity="0"/>
            </radialGradient>
            <mask id="fadeMask">
               <rect width="1000" height="600" fill="url(#gridGlow)" />
            </mask>
          </defs>
          <g stroke="currentColor" strokeWidth="1" fill="none" mask="url(#fadeMask)">
            {/* Floor & Ceiling vanishing lines */}
            {[...Array(11)].map((_, i) => {
              const x = 350 + i * 30;
              const dx = x - 500;
              return (
                <React.Fragment key={`v-${i}`}>
                  {/* Ceiling */}
                  <line x1={x} y1="200" x2={500 + 7 * dx} y2="-400" />
                  {/* Floor */}
                  <line x1={x} y1="400" x2={500 + 7 * dx} y2="1000" />
                </React.Fragment>
              );
            })}
            
            {/* Left & Right Wall vanishing lines */}
            {[...Array(7)].map((_, i) => {
              const y = 200 + i * (200 / 6);
              const dy = y - 300;
              return (
                <React.Fragment key={`h-${i}`}>
                  {/* Left */}
                  <line x1="350" y1={y} x2="-550" y2={300 + 7 * dy} />
                  {/* Right */}
                  <line x1="650" y1={y} x2="1550" y2={300 + 7 * dy} />
                </React.Fragment>
              );
            })}

            {/* Depth slices */}
            {[1, 1.4, 2, 3, 4.5, 7].map((scale, i) => {
              const w = 300 * scale;
              const h = 200 * scale;
              const x = 500 - w / 2;
              const y = 300 - h / 2;
              return <rect key={`rect-${i}`} x={x} y={y} width={w} height={h} />
            })}
            
            {/* Back wall grid */}
            {[...Array(11)].map((_, i) => (
              <line key={`bw-v-${i}`} x1={350 + i * 30} y1="200" x2={350 + i * 30} y2="400" />
            ))}
            {[...Array(7)].map((_, i) => (
              <line key={`bw-h-${i}`} x1="350" y1={200 + i * (200 / 6)} x2="650" y2={200 + i * (200 / 6)} />
            ))}
          </g>
        </svg>
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h2 className="text-3xl md:text-[3rem] font-medium tracking-tight mb-6 text-gray-900 leading-[1.2] font-sans">
          실시간 채팅 솔루션이 궁금하신가요?
        </h2>
        <p className="text-gray-500 text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
          실시간 상담 체험으로 화면과 운영 방식을 먼저 확인해보세요.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-3">
          <button 
            onClick={() => startDemoFlow()}
            className="w-full sm:w-auto px-8 py-3.5 bg-[#274236] text-white rounded-xl font-semibold text-[1.05rem] hover:bg-[#1C3027] transition-colors shadow-sm"
          >
            실시간 상담 체험
          </button>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  const { startDemoFlow, setIsWidgetOpen } = React.useContext(FlowContext);

  return (
    <footer className="bg-white border-t border-gray-200 pt-16 pb-8 px-6 lg:px-8">
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-start gap-10 mb-16">
        <div>
          <Logo className="mb-6" isFooter={true} />
          <p className="text-gray-500 max-w-xs text-sm">
            고객 상담을 더 빠르게,<br/>문의 관리는 더 체계적으로.
          </p>
        </div>
        <div className="flex flex-wrap gap-12 md:gap-24">
          <div>
            <h4 className="font-bold text-gray-900 mb-6 tracking-tight text-sm">제품</h4>
            <ul className="space-y-4 text-sm text-gray-500 font-medium">
              <li><a href="/#solution-board" className="hover:text-gray-900 transition-colors">게시판형 채팅 솔루션</a></li>
              <li><a href="/#solution-realtime" className="hover:text-gray-900 transition-colors">실시간 채팅 솔루션</a></li>
              <li><Link to="/pricing" className="hover:text-gray-900 transition-colors">요금제</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-gray-900 mb-6 tracking-tight text-sm">지원</h4>
            <ul className="space-y-4 text-sm text-gray-500 font-medium">
              <li><Link to="/guide" className="hover:text-gray-900 transition-colors">가이드 문서</Link></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); setIsWidgetOpen(true); }} className="hover:text-gray-900 transition-colors">문의 남기기</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); startDemoFlow(); }} className="hover:text-gray-900 transition-colors">실시간 상담 체험</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-gray-900 mb-6 tracking-tight text-sm">회사</h4>
            <ul className="space-y-4 text-sm text-gray-500 font-medium">
              <li><a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo(0, 0); }} className="hover:text-gray-900 transition-colors">서비스 소개</a></li>
              <li><a href="#" onClick={(e) => e.preventDefault()} className="hover:text-gray-900 transition-colors">이용약관</a></li>
              <li><a href="#" onClick={(e) => e.preventDefault()} className="hover:text-gray-900 transition-colors">개인정보처리방침</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="max-w-[1400px] mx-auto pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
        <p>© {new Date().getFullYear()} GrowTalk Inc. All rights reserved.</p>
      </div>
    </footer>
  );
};

const LandingPage = () => {
  return (
    <main>
      <Hero />
      <Features />
      <SolutionShowcase />
      <Pricing />
      <CTA />
    </main>
  );
};

import { FlowContext, FlowModals, FlowType } from './components/FlowModals';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentFlow, setCurrentFlow] = useState<FlowType>('none');
  const [pendingFlow, setPendingFlow] = useState<FlowType>('none');
  const [isWidgetOpen, setIsWidgetOpen] = useState(false);
  
  const location = useLocation();
  const isExperiencePage = location.pathname === '/experience';

  const startBoardFlow = () => {
    if (isLoggedIn) {
      setCurrentFlow('board-create');
    } else {
      setPendingFlow('board-create');
      setCurrentFlow('login');
    }
  };

  const startDemoFlow = () => {
    window.open('/experience', '_blank');
  };

  const startEnterpriseFlow = () => {
    setIsWidgetOpen(true);
  };

  const startSubscribeFlow = () => {
    if (isLoggedIn) {
      setCurrentFlow('subscribe');
    } else {
      setPendingFlow('subscribe');
      setCurrentFlow('login');
    }
  };

  return (
    <FlowContext.Provider value={{
      isLoggedIn, setIsLoggedIn,
      currentFlow, setCurrentFlow,
      pendingFlow, setPendingFlow,
      startBoardFlow, startDemoFlow, startEnterpriseFlow, startSubscribeFlow,
      isWidgetOpen, setIsWidgetOpen
    }}>
      <div className="min-h-screen font-sans selection:bg-[#E8ECE5]">
        {!isExperiencePage && <Header />}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/features" element={<FeaturesPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/guide/*" element={<GuidePage />} />
          <Route path="/experience" element={<ExperiencePage />} />
        </Routes>
        {!isExperiencePage && (
          <>
            <Footer />
            <FloatingWidget />
            <FlowModals />
          </>
        )}
      </div>
    </FlowContext.Provider>
  );
}
