import React, { useState, useEffect, useContext } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, ArrowUp, ChevronLeft, Paperclip, ChevronRight, Home, List as ListIcon, Check, Info, Link as LinkIcon } from 'lucide-react';
import { FlowContext } from './FlowModals';

type ViewState = 'home' | 'write' | 'success' | 'list' | 'detail';

interface Inquiry {
  id: string;
  type: string;
  content: string;
  status: '접수' | '확인 중' | '답변 완료';
  date: string;
  answer?: string;
  linkedInquiryId?: string;
}

const DUMMY_INQUIRIES: Inquiry[] = [
  {
    id: '1',
    type: '요금제 문의',
    content: '현재 팀즈 플랜을 사용 중인데 인원이 늘어서 결제 관련 문의드립니다. 추가 인원당 비용이 어떻게 되나요?',
    status: '답변 완료',
    date: '2023.10.15 14:30',
    answer: '안녕하세요 고객님, 팀즈 플랜의 경우 기본 제공 인원 외 추가 인원당 월 5,000원이 과금됩니다. 결제 설정 페이지에서 추가 인원을 등록하시면 자동 정산됩니다.',
    linkedInquiryId: 'prev-123'
  },
  {
    id: '2',
    type: '일반 문의',
    content: '위젯 디자인을 커스텀할 수 있나요?',
    status: '확인 중',
    date: '1시간 전'
  },
  {
    id: '3',
    type: '이용 장애',
    content: '모바일에서 문의 등록 버튼이 가끔 안 눌리는 현상이 있습니다.',
    status: '접수',
    date: '방금 전'
  }
];

export const FloatingWidget = () => {
  const { isWidgetOpen, setIsWidgetOpen } = useContext(FlowContext);
  const [view, setView] = useState<ViewState>('home');
  const [inquiryType, setInquiryType] = useState('이용 방법 문의');
  const [content, setContent] = useState('');
  const [showTopButton, setShowTopButton] = useState(false);
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setShowTopButton(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetForm = () => {
    setContent('');
    setInquiryType('이용 방법 문의');
  };

  const handleOpen = () => {
    if (!isWidgetOpen) {
      setView('home');
    }
    setIsWidgetOpen(!isWidgetOpen);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim()) {
      setView('success');
    }
  };

  const getStatusChip = (status: string) => {
    switch (status) {
      case '접수': return <span className="px-2 py-0.5 bg-gray-100 text-gray-700 text-[0.7rem] font-bold rounded">접수</span>;
      case '확인 중': return <span className="px-2 py-0.5 bg-yellow-50 text-yellow-700 border border-yellow-100 text-[0.7rem] font-bold rounded">확인 중</span>;
      case '답변 완료': return <span className="px-2 py-0.5 bg-blue-50 text-blue-700 border border-blue-100 text-[0.7rem] font-bold rounded">답변 완료</span>;
      default: return null;
    }
  };

  const renderHome = () => (
    <motion.div
      key="home"
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -10 }}
      transition={{ duration: 0.2 }}
      className="flex-1 overflow-y-auto bg-gray-50 flex flex-col"
    >
      <div className="bg-white p-6 border-b border-gray-100 flex flex-col items-center text-center">
         <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center mb-3">
           <MessageSquare className="w-6 h-6 text-gray-400" />
         </div>
         <h3 className="text-xl font-bold text-gray-900 mb-1">GlowTalk Support</h3>
         <p className="text-[0.75rem] text-gray-500 font-mono tracking-tight">평일 10:00 - 18:00 (주말/공휴일 휴무)</p>
      </div>
      
      <div className="p-5 flex-1 flex flex-col">
         <div className="bg-white p-5 rounded-xl border border-gray-200 mb-6 text-[0.85rem] text-gray-700 leading-relaxed font-medium shadow-sm">
           궁금한 내용을 채팅처럼 남겨주세요.<br/>
           담당자가 확인 후 답변드립니다.<br/>
           답변은 같은 문의창에서 확인할 수 있습니다.
         </div>

         <div className="flex flex-col gap-2.5 mt-auto mb-6">
           <button onClick={() => setView('write')} className="w-full bg-blue-600 text-white rounded-lg p-3.5 text-[0.95rem] font-bold shadow-sm hover:bg-blue-700 transition-colors flex justify-center items-center gap-2">
             문의 작성하기
           </button>
           <button onClick={() => setView('list')} className="w-full bg-white text-gray-700 border border-gray-200 rounded-lg p-3.5 text-[0.95rem] font-bold shadow-sm hover:bg-gray-50 transition-colors flex justify-center items-center">
             내 문의 확인하기
           </button>
         </div>
      </div>
    </motion.div>
  );

  const renderWrite = () => (
    <motion.div
      key="write"
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 10 }}
      transition={{ duration: 0.2 }}
      className="flex-1 overflow-y-auto bg-white flex flex-col"
    >
      <div className="px-4 py-3 border-b border-gray-100 flex items-center shrink-0 sticky top-0 bg-white z-10">
        <button onClick={() => setView('home')} className="p-1 -ml-1 text-gray-400 hover:text-gray-900 transition-colors">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <span className="font-bold text-[0.95rem] ml-2 text-gray-900">새 문의 작성</span>
      </div>
      <div className="p-5 flex-1 flex flex-col">
        <form onSubmit={handleSubmit} className="flex flex-col gap-5 flex-1">
          <div className="bg-gray-50 p-3 rounded-lg text-[0.75rem] text-gray-500 leading-relaxed break-keep">
            비회원으로 남긴 문의는 현재 기기에서만 확인할 수 있어요.<br />
            로그인한 회원은 문의목록에서 내 문의를 확인할 수 있습니다.
          </div>
          
          <div className="flex flex-col gap-2">
            <label className="text-[0.85rem] font-bold text-gray-700">문의 유형 <span className="text-red-500">*</span></label>
            <div className="relative">
              <select 
                value={inquiryType}
                onChange={(e) => setInquiryType(e.target.value)}
                className="w-full border border-gray-200 rounded-lg h-[48px] px-4 pr-10 text-[0.9rem] font-medium bg-white focus:outline-none focus:border-[#1e293b] focus:ring-1 focus:ring-[#1e293b] transition-all appearance-none cursor-pointer hover:border-gray-300 shadow-sm"
              >
                <option>일반 문의</option>
                <option>이용 방법</option>
                <option>결제/환불</option>
                <option>오류 제보</option>
                <option>기타 문의</option>
              </select>
              <div className="absolute top-1/2 right-3.5 -translate-y-1/2 pointer-events-none text-gray-500 flex items-center justify-center">
                <ChevronRight className="w-4 h-4 rotate-90" />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2 flex-1 relative">
            <label className="text-[0.85rem] font-bold text-gray-700">문의 내용 <span className="text-red-500">*</span></label>
            <textarea 
              required
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="상세한 문의 내용을 남겨주시면 더 빠르고 정확하게 답변해 드릴 수 있습니다."
              className="w-full border border-gray-200 rounded-lg p-3.5 text-[0.9rem] bg-white flex-1 min-h-[160px] resize-none focus:outline-none focus:border-[#1e293b] focus:ring-1 focus:ring-[#1e293b] transition-all leading-relaxed"
            />
            <div className="absolute bottom-3 right-3 flex gap-2">
              <button type="button" className="p-2 border border-gray-200 bg-white rounded flex items-center justify-center text-gray-500 hover:text-gray-900 transition-colors shadow-sm">
                <Paperclip className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="mt-2 shrink-0">
            <button 
              type="submit"
              className="w-full bg-[#1e293b] text-white rounded-lg p-3.5 text-[0.95rem] font-bold shadow-md hover:bg-black transition-colors"
            >
              문의 등록하기
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );

  const renderSuccess = () => (
    <motion.div
      key="success"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className="flex-1 overflow-y-auto bg-white p-6 flex flex-col justify-center text-center"
    >
      <div className="flex justify-center mb-6">
        <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
           <Check className="w-8 h-8" />
        </div>
      </div>
      <h4 className="text-[1.2rem] font-bold text-gray-900 mb-2">
         문의가 접수되었습니다.
      </h4>
      <p className="text-[0.9rem] text-gray-500 leading-relaxed mb-auto">
        담당자가 내용을 확인한 후,<br/>이 문의창에서 답변을 남겨드릴 예정이에요.
      </p>

      <div className="flex flex-col gap-2 mt-auto">
        <button 
          onClick={() => { resetForm(); setView('list'); }}
          className="w-full bg-[#1e293b] text-white rounded-lg p-3.5 text-[0.95rem] font-bold shadow-md hover:bg-black transition-colors"
        >
          내 문의 확인하기
        </button>
        <button 
          onClick={() => { resetForm(); setView('home'); }}
          className="w-full bg-white text-gray-700 border border-gray-200 rounded-lg p-3.5 text-[0.95rem] font-bold shadow-sm hover:bg-gray-50 transition-colors"
        >
          홈으로 돌아가기
        </button>
      </div>
    </motion.div>
  );

  const renderList = () => (
    <motion.div
      key="list"
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 10 }}
      transition={{ duration: 0.2 }}
      className="flex-1 overflow-y-auto bg-[#F3F4F6] flex flex-col"
    >
      <div className="bg-white px-5 py-3.5 border-b border-gray-100 flex items-center shrink-0 sticky top-0 z-10 shadow-sm">
        <span className="font-bold text-[1rem] text-gray-900">내 문의 목록</span>
      </div>
      
      <div className="p-4 flex flex-col gap-3">
        {DUMMY_INQUIRIES.map(item => (
          <div 
            key={item.id} 
            onClick={() => { setSelectedInquiry(item); setView('detail'); }}
            className="bg-white border border-gray-200 rounded-xl p-4 cursor-pointer hover:border-gray-300 hover:shadow-sm transition-all"
          >
            <div className="flex items-center justify-between mb-2">
              {getStatusChip(item.status)}
              <div className="text-[0.75rem] text-gray-400 font-mono tracking-wide">{item.date}</div>
            </div>
            <h5 className="font-bold text-[0.95rem] text-gray-900 mb-2">{item.type}</h5>
            <p className="text-[0.85rem] text-gray-600 line-clamp-2 leading-relaxed">{item.content}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );

  const renderDetail = () => {
    if (!selectedInquiry) return null;
    return (
      <motion.div
        key="detail"
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 10 }}
        transition={{ duration: 0.2 }}
        className="flex-1 overflow-y-auto bg-[#F3F4F6] flex flex-col relative"
      >
        <div className="bg-white px-4 py-3 border-b border-gray-100 flex items-center sticky top-0 z-10 shadow-sm shrink-0">
          <button onClick={() => setView('list')} className="p-1 -ml-1 text-gray-400 hover:text-gray-900 transition-colors">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <span className="font-bold text-[1rem] ml-2 text-gray-900">문의 상세</span>
        </div>

        <div className="p-4 flex-1 flex flex-col gap-4">
          {/* User Inquiry */}
          <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              {getStatusChip(selectedInquiry.status)}
              <span className="font-mono text-[0.75rem] text-gray-400">{selectedInquiry.date}</span>
            </div>
            <h5 className="font-bold text-gray-900 text-[1rem] mb-2">{selectedInquiry.type}</h5>
            <p className="text-[0.9rem] text-gray-800 leading-relaxed whitespace-pre-wrap break-keep">{selectedInquiry.content}</p>
          </div>

          {/* Connect to previous logic */}
          {selectedInquiry.linkedInquiryId && (
            <div className="bg-blue-50/50 border border-blue-100 rounded-lg p-3 flex flex-col gap-1.5">
               <span className="text-[0.7rem] font-bold text-blue-600 flex items-center gap-1"><LinkIcon className="w-3 h-3"/> 연결된 이전 문의</span>
               <p className="text-[0.8rem] text-gray-700 truncate line-clamp-1">결제 시스템 오류건 관련 추가 문의</p>
               <button className="text-[0.7rem] text-gray-500 hover:text-gray-900 text-left mt-1 underline underline-offset-2 w-max">원문 확인하기</button>
            </div>
          )}

          {/* Answer */}
          {selectedInquiry.status === '답변 완료' && selectedInquiry.answer ? (
            <div className="bg-white rounded-xl border border-blue-200 shadow-sm overflow-hidden flex flex-col">
              <div className="bg-blue-50 px-4 py-3 border-b border-blue-100 flex items-center gap-2">
                <div className="w-7 h-7 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-[0.55rem] font-bold text-white">답변</span>
                </div>
                <div>
                  <div className="text-[0.85rem] font-bold text-gray-900">상담 매니저</div>
                  <div className="text-[0.7rem] text-gray-500 font-mono mt-0.5">2023.10.15 15:10</div>
                </div>
              </div>
              <div className="p-4 text-[0.9rem] text-gray-800 leading-relaxed whitespace-pre-wrap break-keep bg-white">
                {selectedInquiry.answer}
              </div>
              <div className="px-4 py-4 border-t border-gray-100 bg-gray-50 text-center flex flex-col items-center">
                 <p className="text-[0.8rem] text-gray-600 mb-3">추가로 궁금한 점이 있으신가요?</p>
                 <button onClick={() => setView('write')} className="text-[0.85rem] font-bold text-[#1e293b] border border-gray-300 bg-white px-5 py-2.5 rounded-lg shadow-sm hover:bg-gray-100 transition-colors">새로운 문의 등록</button>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 flex flex-col items-center text-center justify-center min-h-[160px]">
               <MessageSquare className="w-6 h-6 text-gray-300 mb-3" />
               <h6 className="text-[0.95rem] font-bold text-gray-700 mb-1.5">아직 답변이 없습니다</h6>
               <p className="text-[0.85rem] text-gray-500 leading-relaxed">담당자가 내용을 확인한 후<br/>답변을 남겨드릴 예정입니다.</p>
            </div>
          )}
        </div>
      </motion.div>
    );
  };

  return (
    <>
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 flex flex-col items-end gap-2.5 md:gap-3"
      >
        <AnimatePresence>
          {isWidgetOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="mb-0 md:mb-4 w-full h-[100dvh] md:h-[640px] md:w-[420px] bg-white md:rounded-2xl shadow-none md:shadow-2xl md:border border-gray-200 overflow-hidden flex flex-col fixed md:relative bottom-0 right-0 max-h-none md:max-h-[85vh]"
              style={{ zIndex: 100 }}
            >
              <div className="bg-[#1e293b] text-white p-4 flex justify-between items-center shrink-0">
                <div className="font-bold text-[1.05rem] ml-1">
                  고객상담센터
                </div>
                <button onClick={() => setIsWidgetOpen(false)} className="text-gray-300 hover:text-white transition-colors p-1">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-hidden relative flex flex-col bg-gray-50">
                <AnimatePresence mode="wait">
                  {view === 'home' && renderHome()}
                  {view === 'write' && renderWrite()}
                  {view === 'success' && renderSuccess()}
                  {view === 'list' && renderList()}
                  {view === 'detail' && renderDetail()}
                </AnimatePresence>
              </div>

              {/* Bottom Nav Tab */}
              {(view === 'home' || view === 'list' || view === 'detail' || view === 'success') && (
                <div className="bg-white border-t border-gray-200 flex shrink-0 pb-safe md:pb-0">
                  <button 
                    onClick={() => setView('home')} 
                    className={`flex-1 py-3 flex flex-col items-center justify-center gap-1.5 transition-colors ${view === 'home' ? 'text-gray-900' : 'text-gray-400 hover:text-gray-600'}`}
                  >
                    <Home className="w-5 h-5" />
                    <span className="text-[0.65rem] font-bold">홈</span>
                  </button>
                  <button 
                    onClick={() => setView('list')} 
                    className={`flex-1 py-3 flex flex-col items-center justify-center gap-1.5 transition-colors ${view === 'list' || view === 'detail' ? 'text-gray-900' : 'text-gray-400 hover:text-gray-600'}`}
                  >
                    <ListIcon className="w-5 h-5" />
                    <span className="text-[0.65rem] font-bold">문의목록</span>
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Inquiry Circular Button with Hover Badge */}
        <div className="relative group z-50">
          <div className="absolute right-[76px] top-1/2 -translate-y-1/2 whitespace-nowrap bg-white text-slate-900 px-3.5 py-2 rounded-xl shadow-lg border border-gray-100 text-xs md:text-sm font-semibold tracking-tight opacity-0 pointer-events-none group-hover:opacity-100 scale-90 group-hover:scale-100 transition-all duration-200 origin-right hidden md:block select-none">
            문의 남기기 ☺
          </div>

          <button
            onClick={handleOpen}
            className={`w-[52px] h-[52px] md:w-[60px] md:h-[60px] rounded-full bg-[#0F172A] hover:bg-black text-white flex items-center justify-center shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative ${isWidgetOpen ? 'hidden md:flex shrink-0' : 'flex shrink-0'}`}
          >
            {isWidgetOpen ? (
              <X className="w-6 h-6 text-white"/>
            ) : (
              <img 
                src="https://raw.githubusercontent.com/Lee-younju/growtalk-assets/main/Growtalk_logo3.png" 
                alt="GrowTalk Logo" 
                className="w-8 h-8 md:w-10 md:h-10 object-contain rounded-full"
                referrerPolicy="no-referrer"
              />
            )}
          </button>
        </div>

        {/* Scroll To Top Button */}
        <AnimatePresence>
          {showTopButton && (
            <motion.button
              onClick={scrollToTop}
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 10 }}
              transition={{ duration: 0.2 }}
              className="hidden lg:flex w-12 h-12 md:w-[52px] md:h-[52px] bg-[#0F172A] hover:bg-black text-white rounded-full items-center justify-center shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 shrink-0 cursor-pointer"
              aria-label="최상단으로 이동"
            >
              <ArrowUp className="w-5 h-5" />
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
};

