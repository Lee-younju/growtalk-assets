import React, { useState } from 'react';
import { MessageSquare, Paperclip, X, User, Clock, AlertCircle, Inbox, Send, FileText, ChevronRight } from 'lucide-react';

export const ExperiencePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'live' | 'board'>('live');
  const [activeFocus, setActiveFocus] = useState<'agent' | 'customer'>('agent');
  
  // Live Chat State
  const [liveMessages, setLiveMessages] = useState([
    { type: 'customer', text: '실시간 상담은 어떻게 이용하나요?', time: '오전 10:42' },
    { type: 'agent', text: '안녕하세요. 지금은 실시간 상담 체험 화면입니다.', time: '오전 10:45' },
    { type: 'customer', text: '상담 이력도 확인할 수 있나요?', time: '오전 10:46' },
    { type: 'agent', text: '네, 상담사 화면에서 고객 정보와 이전 상담 이력을 함께 확인할 수 있습니다.', time: '오전 10:47' }
  ]);
  const [liveCustomerInput, setLiveCustomerInput] = useState('');
  const [liveAgentInput, setLiveAgentInput] = useState('');

  // Board Chat State
  const [boardCustomerInput, setBoardCustomerInput] = useState('');
  const [boardAgentInput, setBoardAgentInput] = useState('');
  const [boardInquiry, setBoardInquiry] = useState<{ title: string; body: string; answer?: string; time: string } | null>(
    {
      title: '결제 수단 변경 방법 문의',
      body: '안녕하세요, 현재 카드로 자동결제 중인데 다른 카드로 변경하고 싶습니다. 설정 메뉴 어디서 바꿀 수 있나요?',
      answer: '안녕하세요 김고객님,\n\n결제 수단 변경은 [설정 > 결제 정보 > 결제 수단 관리] 메뉴에서 진행하실 수 있습니다.\n만약 해당 메뉴가 보이지 않으신다면 다시 문의 남겨주세요.',
      time: '2023.10.26 10:42'
    }
  );

  const handleLiveCustomerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!liveCustomerInput.trim()) return;
    setLiveMessages([...liveMessages, { type: 'customer', text: liveCustomerInput, time: '방금 전' }]);
    setLiveCustomerInput('');
  };

  const handleLiveAgentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!liveAgentInput.trim()) return;
    setLiveMessages([...liveMessages, { type: 'agent', text: liveAgentInput, time: '방금 전' }]);
    setLiveAgentInput('');
  };

  const handleBoardCustomerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!boardCustomerInput.trim()) return;
    setBoardInquiry({
      title: '새로운 시스템 문의',
      body: boardCustomerInput,
      time: '방금 전'
    });
    setBoardCustomerInput('');
  };

  const handleBoardAgentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!boardAgentInput.trim() || !boardInquiry) return;
    setBoardInquiry({
      ...boardInquiry,
      answer: boardAgentInput
    });
    setBoardAgentInput('');
  };

  const handleClose = () => {
    if (window.opener) {
      window.close();
    } else {
      window.history.back();
    }
  };

  return (
    <div className="h-screen bg-slate-50 flex flex-col font-sans overflow-hidden">
      {/* Unified Top Banner & Header */}
      <div className="bg-slate-900 text-white flex flex-col flex-none z-20 shadow-sm">
        {/* Top Row: Warning & Close button */}
        <div className="px-6 py-2.5 flex items-center justify-between border-b border-white/10 bg-black/20">
          <div className="flex items-center gap-2.5">
            <div className="w-5 h-5 rounded-full bg-indigo-500/20 flex items-center justify-center">
              <AlertCircle className="w-3.5 h-3.5 text-indigo-300 shrink-0" />
            </div>
            <span className="text-[0.8rem] font-medium text-slate-200 tracking-wide">샘플 체험 화면입니다. 입력한 내용은 저장되지 않으며, 창을 닫으면 체험이 종료됩니다.</span>
          </div>
          <button 
            onClick={handleClose}
            className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-md text-[0.75rem] font-bold transition-colors flex items-center gap-1.5 shrink-0"
          >
            <X className="w-3.5 h-3.5" /> 체험 종료
          </button>
        </div>
        
        {/* Title, Description & Tabs */}
        <div className="px-6 py-5 flex flex-col items-center shrink-0 bg-slate-900">
          <h1 className="text-xl font-extrabold text-white mb-2 tracking-tight">각 솔루션별 상세 기능 살펴보기</h1>
          <p className="text-slate-400 mb-5 text-[0.85rem] font-medium">팀의 상황과 상담 성격에 맞는 솔루션의 세부 화면을 확인해보세요.</p>
          
          {/* Segmented Control */}
          <div className="inline-flex bg-slate-800/80 p-1.5 rounded-xl shadow-inner border border-slate-700/50">
            <button 
              onClick={() => setActiveTab('live')}
              className={`px-8 py-2 rounded-lg text-[0.85rem] font-bold transition-all duration-200 flex items-center gap-2 ${
                activeTab === 'live' 
                  ? 'bg-indigo-500 text-white shadow-md ring-1 ring-indigo-400' 
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
              }`}
            >
              <MessageSquare className={`w-4 h-4 ${activeTab === 'live' ? 'text-indigo-100' : 'text-slate-500'}`} />
              실시간 채팅 솔루션
            </button>
            <button 
              onClick={() => setActiveTab('board')}
              className={`px-8 py-2 rounded-lg text-[0.85rem] font-bold transition-all duration-200 flex items-center gap-2 ${
                activeTab === 'board' 
                  ? 'bg-teal-600 text-white shadow-md ring-1 ring-teal-500' 
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
              }`}
            >
              <FileText className={`w-4 h-4 ${activeTab === 'board' ? 'text-teal-100' : 'text-slate-500'}`} />
              게시판형 채팅 솔루션
            </button>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="w-full px-4 py-4 md:px-6 md:py-6 flex-1 flex flex-col min-h-0 overflow-hidden bg-slate-100/50">
        
        {/* Mobile/Tablet Screen Switcher */}
        <div className="lg:hidden flex bg-slate-200/60 p-1 rounded-xl mb-4 w-full max-w-sm mx-auto shadow-inner border border-slate-300/30 shrink-0">
          <button 
            type="button"
            onClick={() => setActiveFocus('agent')}
            className={`flex-1 py-2 rounded-lg font-bold text-xs transition-all duration-200 ${activeFocus === 'agent' ? 'bg-white shadow text-slate-900 border border-slate-200/50' : 'text-slate-500 hover:text-slate-700'}`}
          >
            상담원 화면 보기 (기본)
          </button>
          <button 
            type="button"
            onClick={() => setActiveFocus('customer')}
            className={`flex-1 py-2 rounded-lg font-bold text-xs transition-all duration-200 ${activeFocus === 'customer' ? 'bg-white shadow text-slate-900 border border-slate-200/50' : 'text-slate-500 hover:text-slate-700'}`}
          >
            고객 화면 보기
          </button>
        </div>

        <div className="w-full h-full grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_340px] gap-6 items-stretch min-h-0">
          
          {activeTab === 'live' ? (
            <>
              {/* === LIVE CHAT: LEFT (AGENT) === */}
              <div 
                className={`flex flex-col min-w-0 h-full min-h-0 cursor-pointer group relative ${activeFocus === 'agent' ? 'flex' : 'hidden lg:flex'}`}
                onClick={() => setActiveFocus('agent')}
              >
                <div className="mb-2.5 px-1 flex-none flex items-center justify-between">
                  <div className={`text-[0.95rem] font-extrabold flex items-center gap-2 transition-colors ${activeFocus === 'agent' ? 'text-indigo-950' : 'text-slate-400'}`}>
                    <span className={`w-1.5 h-3.5 rounded-full transition-colors ${activeFocus === 'agent' ? 'bg-indigo-600' : 'bg-slate-300'}`}></span>
                    상담원 화면(관리자)
                    {activeFocus === 'agent' && (
                      <div className="flex items-center gap-1.5 px-2.5 py-1 bg-indigo-100 text-indigo-700 text-[0.7rem] font-bold rounded-full border border-indigo-200 shadow-sm animate-pulse ml-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div>
                        현재 체험 중
                      </div>
                    )}
                  </div>
                </div>
                
                <div className={`flex-1 flex flex-col rounded-2xl overflow-hidden min-h-0 transition-all duration-300 ${
                  activeFocus === 'agent' 
                    ? 'bg-white border-2 border-indigo-500 shadow-[0_8px_30px_-4px_rgba(99,102,241,0.15)] ring-4 ring-indigo-50' 
                    : 'bg-white/60 border border-slate-200 shadow-sm opacity-50 hover:opacity-80 scale-[0.98]'
                }`}>
                  <div className={`flex-1 flex overflow-hidden min-h-0 ${activeFocus !== 'agent' && 'pointer-events-none'}`}>
                  {/* Sidebar (List) */}
                  <div className="w-[200px] xl:w-[260px] border-r border-slate-100 flex-col hidden lg:flex shrink-0 bg-slate-50/50">
                    <div className="px-4 py-3 border-b border-slate-200 font-bold text-[0.8rem] text-slate-500 flex-none bg-white flex items-center justify-between">
                      진행 중인 상담
                      <span className="bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full text-[0.65rem]">1</span>
                    </div>
                    <div className="p-4 border-l-4 bg-indigo-50/40 border-indigo-500 cursor-pointer flex-none">
                      <div className="flex justify-between items-center mb-1.5">
                        <span className="font-bold text-[0.85rem] text-slate-900 flex items-center gap-1.5">
                          김고객 <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
                        </span>
                        <span className="text-[0.65rem] font-medium text-indigo-400">방금 전</span>
                      </div>
                      <div className="text-[0.8rem] text-slate-600 truncate">{liveMessages[liveMessages.length-1]?.text || '...'}</div>
                    </div>
                  </div>

                  {/* Chat Area */}
                  <div className="flex-1 flex flex-col relative min-h-0 bg-white">
                    <div className="px-5 py-3.5 border-b border-slate-100 bg-white flex items-center justify-between shrink-0 z-10 flex-none">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center border border-indigo-100">
                          <User className="w-5 h-5 text-indigo-500" />
                        </div>
                        <div>
                          <div className="font-extrabold text-[0.95rem] text-slate-900 mb-0.5">김고객</div>
                          <div className="text-[0.7rem] font-bold text-slate-500 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>온라인
                          </div>
                        </div>
                      </div>
                      <button className="px-3.5 py-1.5 text-[0.75rem] font-bold text-slate-600 bg-white border border-slate-200 shadow-sm rounded-lg hover:bg-slate-50 focus:ring-2 focus:ring-slate-200 outline-none transition-all">
                        상담 종료
                      </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-4 bg-slate-50/50">
                      {liveMessages.map((msg, i) => (
                        <div key={i} className={`flex items-start gap-3 ${msg.type === 'agent' ? 'flex-row-reverse' : ''}`}>
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-bold shadow-sm ${msg.type === 'agent' ? 'bg-indigo-600 text-white' : 'bg-white border border-slate-200 text-slate-600'}`}>
                            {msg.type === 'agent' ? '상담' : '김'}
                          </div>
                          <div className={`flex flex-col ${msg.type === 'agent' ? 'items-end' : 'items-start'}`}>
                            <div className={`flex items-center gap-1.5 mb-1.5 text-[0.7rem] text-slate-500 ${msg.type === 'agent' ? 'flex-row-reverse' : ''}`}>
                              <span className="font-bold text-slate-700">{msg.type === 'agent' ? '김상담 매니저' : '김고객'}</span>
                              <span>{msg.time}</span>
                            </div>
                            <div className={`px-4 py-2.5 rounded-2xl max-w-[85%] text-[0.9rem] leading-relaxed break-keep shadow-sm ${
                              msg.type === 'agent' ? 'bg-indigo-600 text-white rounded-tr-sm' : 'bg-white border border-slate-200 rounded-tl-sm text-slate-800'
                            }`}>
                              {msg.text}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="p-4 bg-white shrink-0 shadow-[0_-4px_10px_rgba(0,0,0,0.02)]">
                      <form onSubmit={handleLiveAgentSubmit} className="border border-slate-200 rounded-xl overflow-hidden transition-all flex flex-col bg-white focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500">
                        <textarea 
                          value={liveAgentInput}
                          onChange={(e) => setLiveAgentInput(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                              e.preventDefault();
                              handleLiveAgentSubmit(e);
                            }
                          }}
                          className="w-full px-4 py-3 text-[0.85rem] text-slate-800 resize-none outline-none flex-1 min-h-[60px] bg-transparent font-medium" 
                          placeholder="고객에게 보낼 답변을 입력해주세요..."
                          disabled={activeFocus !== 'agent'}
                        />
                        <div className="p-2 flex justify-between items-center shrink-0 border-t border-slate-100 bg-slate-50">
                          <div className="flex gap-2">
                             <button type="button" className="p-1.5 text-slate-400 hover:text-slate-600 rounded-md hover:bg-slate-200 transition-colors"><Paperclip className="w-4 h-4" /></button>
                          </div>
                          <button type="submit" disabled={activeFocus !== 'agent'} className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-[0.8rem] font-bold rounded-lg transition-colors shadow-sm flex items-center gap-1.5">
                            <Send className="w-3 h-3" /> 전송
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                  
                  {/* Right Info Panel (LG only) */}
                  <div className="w-[200px] xl:w-[260px] border-l border-slate-100 bg-slate-50/30 hidden xl:flex flex-col shrink-0">
                     <div className="p-4 border-b border-slate-100 bg-white">
                        <h4 className="font-extrabold text-[0.8rem] text-slate-800">상담 정보</h4>
                     </div>
                     <div className="p-5 space-y-6">
                       <div className="bg-white p-3 rounded-xl border border-slate-100 shadow-sm">
                         <div className="text-[0.7rem] font-bold text-slate-400 mb-2">현재 상태</div>
                         <span className="px-2.5 py-1 text-[0.75rem] font-bold rounded-md bg-indigo-50 border border-indigo-100 text-indigo-700 inline-block">온라인 상담중</span>
                       </div>
                       <div className="bg-white p-3 rounded-xl border border-slate-100 shadow-sm">
                         <div className="text-[0.7rem] font-bold text-slate-400 mb-2">담당자</div>
                         <div className="flex items-center gap-2.5">
                           <div className="w-7 h-7 rounded-full flex items-center justify-center font-bold text-[0.65rem] bg-indigo-100 text-indigo-700">김</div>
                           <span className="text-[0.85rem] font-bold text-slate-900">김상담 매니저</span>
                         </div>
                       </div>
                     </div>
                  </div>
                </div>
              </div>
            </div>

              {/* === LIVE CHAT: RIGHT (CUSTOMER) === */}
              <div 
                className={`flex flex-col shrink-0 w-full h-full min-h-0 cursor-pointer group relative ${activeFocus === 'customer' ? 'flex' : 'hidden lg:flex'}`}
                onClick={() => setActiveFocus('customer')}
              >
                <div className="mb-2.5 px-1 flex-none flex items-center justify-between">
                  <div className={`text-[0.95rem] font-extrabold flex items-center gap-2 transition-colors ${activeFocus === 'customer' ? 'text-indigo-950' : 'text-slate-400'}`}>
                    <span className={`w-1.5 h-3.5 rounded-full transition-colors ${activeFocus === 'customer' ? 'bg-indigo-600' : 'bg-slate-300'}`}></span>
                    고객 화면(위젯)
                    {activeFocus === 'customer' && (
                      <div className="flex items-center gap-1.5 px-2.5 py-1 bg-indigo-100 text-indigo-700 text-[0.7rem] font-bold rounded-full border border-indigo-200 shadow-sm animate-pulse ml-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div>
                        현재 체험 중
                      </div>
                    )}
                  </div>
                </div>
                <div className={`flex-1 flex flex-col rounded-2xl overflow-hidden relative min-h-0 transition-all duration-300 ${
                  activeFocus === 'customer' 
                    ? 'bg-white border-2 border-indigo-500 shadow-[0_8px_30px_-4px_rgba(99,102,241,0.15)] ring-4 ring-indigo-50' 
                    : 'bg-white/60 border border-slate-200 shadow-sm opacity-50 hover:opacity-80 scale-[0.98]'
                }`}>
                  <div className={`flex-1 overflow-hidden relative flex flex-col items-center min-h-0 bg-slate-100/50 ${activeFocus !== 'customer' && 'pointer-events-none'}`}>
                   
                   {/* Floating Widget Mockup */}
                   <div className="w-full h-full bg-white flex flex-col shadow-inner relative z-10 min-h-0 border-x border-slate-100">
                      {/* Widget Header */}
                      <div className="bg-indigo-900 px-5 py-4 text-white shrink-0 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/30 rounded-full blur-2xl -mt-10 -mr-10 pointer-events-none"></div>
                        <div className="font-extrabold text-[1.1rem] mb-1 flex items-center justify-between tracking-tight">
                          <span>GrowTalk 상담</span>
                          <button className="text-white/60 hover:text-white transition-colors bg-white/10 rounded-full p-1"><X className="w-4 h-4" /></button>
                        </div>
                        <div className="text-[0.8rem] font-medium text-indigo-200">무엇을 도와드릴까요?</div>
                      </div>

                      {/* Widget Chat Area */}
                      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 bg-slate-50/50">
                         <div className="flex justify-center my-1">
                            <span className="px-3 py-1 bg-slate-200/50 text-slate-500 text-[0.7rem] font-bold rounded-full">상담이 시작되었습니다.</span>
                         </div>
                         {liveMessages.map((msg, i) => (
                           <div key={i} className={`flex items-start gap-2.5 ${msg.type === 'customer' ? 'flex-row-reverse' : ''}`}>
                             {msg.type === 'agent' && (
                               <div className="w-8 h-8 rounded-full bg-indigo-900 text-white flex items-center justify-center text-[0.65rem] font-bold shrink-0 shadow-sm">
                                 상담
                               </div>
                             )}
                             <div className={`flex flex-col ${msg.type === 'customer' ? 'items-end' : 'items-start'}`}>
                               <div className="flex items-center gap-1.5 mb-1.5 text-[0.65rem] text-slate-400 font-bold">
                                 <span>{msg.type === 'agent' ? '김상담' : null}</span>
                                 <span>{msg.time}</span>
                               </div>
                               <div className={`px-4 py-2.5 rounded-2xl max-w-[240px] text-[0.85rem] leading-relaxed break-keep shadow-sm ${
                                 msg.type === 'customer' ? 'bg-indigo-900 text-white rounded-tr-sm' : 'bg-white border border-slate-200 rounded-tl-sm text-slate-800'
                               }`}>
                                 {msg.text}
                               </div>
                             </div>
                           </div>
                         ))}
                      </div>

                      {/* Widget Input Area */}
                      <div className="p-3 border-t border-slate-100 bg-white shrink-0 shadow-[0_-4px_10px_rgba(0,0,0,0.02)]">
                         <form onSubmit={handleLiveCustomerSubmit} className="flex gap-2">
                           <input 
                             type="text"
                             value={liveCustomerInput}
                             onChange={(e) => setLiveCustomerInput(e.target.value)}
                             placeholder={activeFocus === 'customer' ? "메시지를 입력하세요..." : "클릭하여 활성화..."}
                             className={`flex-1 px-4 py-2.5 border rounded-full text-[0.85rem] font-medium outline-none transition-all ${activeFocus === 'customer' ? 'bg-slate-50 border-slate-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500' : 'bg-slate-50 border-slate-200'}`}
                             disabled={activeFocus !== 'customer'}
                           />
                           <button 
                              type="submit" 
                              disabled={activeFocus !== 'customer'}
                              className={`w-[2.6rem] h-[2.6rem] rounded-full flex items-center justify-center shrink-0 shadow-md transition-all ${activeFocus === 'customer' ? 'bg-indigo-900 text-white hover:bg-slate-900 hover:scale-[1.05]' : 'bg-slate-300 text-white'}`}
                           >
                              <Send className="w-4 h-4 ml-0.5" />
                           </button>
                         </form>
                      </div>
                   </div>
                </div>
              </div>
            </div>
            </>
          ) : (
            <>
              {/* === BOARD CHAT: LEFT (AGENT) === */}
              <div 
                className={`flex flex-col min-w-0 h-full min-h-0 cursor-pointer group relative ${activeFocus === 'agent' ? 'flex' : 'hidden lg:flex'}`}
                onClick={() => setActiveFocus('agent')}
              >
                <div className="mb-2.5 px-1 flex-none flex items-center justify-between">
                  <div className={`text-[0.95rem] font-extrabold flex items-center gap-2 transition-colors ${activeFocus === 'agent' ? 'text-[#274236]' : 'text-slate-400'}`}>
                    <span className={`w-1.5 h-3.5 rounded-full transition-colors ${activeFocus === 'agent' ? 'bg-[#8A9A86]' : 'bg-slate-300'}`}></span>
                    상담원 화면(관리자)
                    {activeFocus === 'agent' && (
                      <div className="flex items-center gap-1.5 px-2.5 py-1 bg-[#F4F5F0] text-[#274236] text-[0.7rem] font-bold rounded-full border border-[#E5E8DF] shadow-sm animate-pulse ml-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#8A9A86]"></div>
                        현재 체험 중
                      </div>
                    )}
                  </div>
                </div>
                <div className={`flex-1 flex flex-col rounded-2xl overflow-hidden min-h-0 transition-all duration-300 ${
                  activeFocus === 'agent' 
                    ? 'bg-white border-2 border-[#8A9A86]/40 shadow-lg ring-4 ring-[#F4F5F0]' 
                    : 'bg-white/60 border border-slate-200 shadow-sm opacity-50 hover:opacity-80 scale-[0.98]'
                }`}>
                  <div className={`flex-1 flex overflow-hidden min-h-0 ${activeFocus !== 'agent' && 'pointer-events-none'}`}>
                  {/* Sidebar (List) */}
                  <div className="w-[200px] xl:w-[260px] border-r border-slate-100 flex-col hidden lg:flex shrink-0 bg-slate-50/50">
                    <div className="px-4 py-3 border-b border-slate-200 font-bold text-[0.8rem] text-slate-500 flex-none bg-white flex items-center justify-between">
                      접수된 문의 
                      <span className="bg-[#F4F5F0] text-[#274236] px-2 py-0.5 rounded-full text-[0.65rem] border border-[#E5E8DF]">2</span>
                    </div>
                    
                    <div className="p-4 border-l-4 bg-[#F4F5F0]/50 border-[#8A9A86] cursor-pointer flex-none">
                      <div className="flex justify-between items-center mb-2.5">
                        <span className="px-2 py-0.5 bg-yellow-50 text-yellow-700 border border-yellow-200 text-[0.65rem] font-bold rounded">확인 중</span>
                        <span className="text-[0.65rem] font-bold text-slate-400">방금 전</span>
                      </div>
                      <div className="font-extrabold text-[0.85rem] text-slate-900 mb-1.5 truncate">{boardInquiry?.title || '문의 내역이 없습니다.'}</div>
                      <div className="text-[0.75rem] text-slate-500 truncate">{boardInquiry?.body || ''}</div>
                    </div>

                    <div className="p-4 border-b border-slate-100 cursor-pointer hover:bg-slate-50 transition-colors opacity-60">
                      <div className="flex justify-between items-center mb-2.5">
                        <span className="px-2 py-0.5 bg-slate-200 text-slate-600 text-[0.65rem] font-bold rounded">답변 완료</span>
                        <span className="text-[0.65rem] font-medium text-slate-400">1일 전</span>
                      </div>
                      <div className="font-extrabold text-[0.85rem] text-slate-900 mb-1.5 truncate">비밀번호 재설정 관련</div>
                      <div className="text-[0.75rem] text-slate-500 truncate">계정 비밀번호를 분실했는데 어떻게...</div>
                    </div>
                  </div>

                  {/* Board Detail Area */}
                  <div className="flex-1 flex flex-col relative min-h-0 bg-white">
                    <div className="px-5 py-3.5 border-b border-slate-100 bg-white flex items-center justify-between shrink-0 z-10 flex-none">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-500 text-sm border border-slate-200">
                          김
                        </div>
                        <div>
                          <div className="font-extrabold text-[0.95rem] text-slate-900 mb-0.5">김고객</div>
                          <div className="text-[0.7rem] font-bold text-slate-400">test@example.com</div>
                        </div>
                      </div>
                      <button className="px-3.5 py-1.5 text-[0.75rem] font-bold text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 focus:ring-2 focus:ring-slate-200 outline-none transition-all shadow-sm">
                        답변 완료 처리
                      </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-6 md:p-8 flex flex-col gap-6 bg-[#FAFBF9]">
                      {boardInquiry ? (
                        <>
                          {/* Inquiry Body */}
                          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
                            <div className="flex items-center gap-2 mb-3.5">
                              <span className="px-2.5 py-1 bg-slate-100 text-slate-600 text-[0.7rem] font-bold rounded-md">결제 문의</span>
                              <div className="font-extrabold text-[1.1rem] text-slate-900 tracking-tight">{boardInquiry.title}</div>
                            </div>
                            <div className="text-[0.75rem] font-bold text-slate-400 mb-5 pb-4 border-b border-slate-100 flex items-center gap-2">
                              <Clock className="w-3.5 h-3.5" /> {boardInquiry.time} 접수
                            </div>
                            <div className="text-[0.9rem] text-slate-700 leading-[1.7] font-medium whitespace-pre-wrap">
                              {boardInquiry.body}
                            </div>
                          </div>

                          {/* Answer Area */}
                          {boardInquiry.answer ? (
                            <div className="bg-[#F4F5F0]/50 border border-[#E5E8DF] rounded-xl p-6 shadow-sm relative">
                               <div className="absolute top-6 right-6 text-[0.75rem] font-bold text-slate-400">방금 전 작성</div>
                               <div className="flex items-center gap-2 mb-5">
                                  <div className="w-8 h-8 rounded-full bg-[#274236] flex items-center justify-center font-bold text-white text-[0.65rem] shadow-sm">상담</div>
                                  <span className="font-extrabold text-[0.95rem] text-[#274236]">김상담 매니저의 답변</span>
                               </div>
                               <div className="text-[0.9rem] text-slate-800 leading-[1.7] font-medium bg-white p-5 rounded-lg border border-[#E5E8DF] shadow-sm whitespace-pre-wrap">
                                 {boardInquiry.answer}
                               </div>
                            </div>
                          ) : (
                            <div className="bg-white border-2 text-center border-dashed border-slate-200 rounded-xl p-10 mt-2 shadow-sm">
                              <div className="w-12 h-12 bg-[#FAFBF9] rounded-full flex items-center justify-center mx-auto mb-4 border border-[#E5E8DF]">
                                <FileText className="w-5 h-5 text-slate-300" />
                              </div>
                              <div className="text-slate-500 font-bold text-[0.9rem]">아직 답변이 등록되지 않았습니다.</div>
                              <div className="text-slate-400 font-medium text-[0.8rem] mt-1.5">아래 입력창에서 고객에게 보낼 답변을 작성해주세요.</div>
                            </div>
                          )}
                        </>
                      ) : (
                        <div className="flex-1 flex justify-center items-center text-slate-400 font-bold">
                          선택된 문의가 없습니다.
                        </div>
                      )}
                    </div>

                    {!boardInquiry?.answer && boardInquiry && (
                      <div className="p-4 bg-white border-t border-slate-100 shrink-0 shadow-[0_-4px_10px_rgba(0,0,0,0.02)]">
                        <form onSubmit={handleBoardAgentSubmit} className="border border-slate-200 rounded-xl overflow-hidden transition-all flex flex-col bg-white focus-within:border-[#8A9A86] focus-within:ring-1 focus-within:ring-[#8A9A86]">
                          <textarea 
                            value={boardAgentInput}
                            onChange={(e) => setBoardAgentInput(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                handleBoardAgentSubmit(e);
                              }
                            }}
                            className="w-full px-4 py-4 text-[0.85rem] text-slate-800 font-medium resize-none outline-none flex-1 min-h-[90px] bg-transparent" 
                            placeholder="본문 형태의 답변을 상세히 작성해주세요..."
                            disabled={activeFocus !== 'agent'}
                          />
                          <div className="p-2 flex justify-between items-center shrink-0 border-t border-slate-100 bg-slate-50">
                            <div className="flex gap-2">
                               <button type="button" className="px-3.5 py-1.5 text-xs font-bold text-slate-600 bg-white border border-slate-200 shadow-sm rounded-lg flex items-center gap-1.5 hover:bg-slate-50 transition-colors"><Paperclip className="w-3.5 h-3.5" /> 파일 첨부</button>
                            </div>
                            <button type="submit" disabled={activeFocus !== 'agent'} className="px-6 py-1.5 bg-[#274236] hover:bg-[#1C3027] text-white text-[0.8rem] font-bold rounded-lg transition-colors shadow-sm">
                              답변 등록
                            </button>
                          </div>
                        </form>
                      </div>
                    )}
                  </div>
                  
                  {/* Right Info Panel (LG only) */}
                  <div className="w-[200px] xl:w-[260px] border-l border-slate-100 bg-[#FAFBF9] hidden xl:flex flex-col shrink-0">
                     <div className="p-4 border-b border-slate-100 bg-white">
                        <h4 className="font-extrabold text-[0.8rem] text-slate-800">문의 정보</h4>
                     </div>
                     <div className="p-5 space-y-6">
                       <div className="bg-white p-3 rounded-xl border border-slate-100 shadow-sm">
                         <div className="text-[0.7rem] font-bold text-slate-400 mb-2">처리 상태</div>
                         {boardInquiry?.answer ? (
                           <span className="px-2.5 py-1 bg-slate-100 border border-slate-200 text-slate-700 text-[0.75rem] font-bold rounded-md inline-block">답변 완료</span>
                         ) : (
                           <span className="px-2.5 py-1 bg-yellow-50 border border-yellow-200 text-yellow-700 text-[0.75rem] font-bold rounded-md inline-block">확인 중</span>
                         )}
                       </div>
                       {boardInquiry?.answer && (
                         <div className="bg-white p-3 rounded-xl border border-slate-100 shadow-sm">
                           <div className="text-[0.7rem] font-bold text-slate-400 mb-2">담당자</div>
                           <div className="flex items-center gap-2.5">
                             <div className="w-7 h-7 rounded-full bg-[#F4F5F0] flex items-center justify-center font-bold text-[#274236] text-[0.65rem] border border-[#E5E8DF]">김</div>
                             <span className="text-[0.85rem] font-bold text-slate-900">김상담 매니저</span>
                           </div>
                         </div>
                       )}
                     </div>
                  </div>
                </div>
              </div>
            </div>

              {/* === BOARD CHAT: RIGHT (CUSTOMER) === */}
              <div 
                className={`flex flex-col shrink-0 w-full h-full min-h-0 cursor-pointer group relative ${activeFocus === 'customer' ? 'flex' : 'hidden lg:flex'}`}
                onClick={() => setActiveFocus('customer')}
              >
                <div className="mb-2.5 px-1 flex-none flex items-center justify-between">
                  <div className={`text-[0.95rem] font-extrabold flex items-center gap-2 transition-colors ${activeFocus === 'customer' ? 'text-[#274236]' : 'text-slate-400'}`}>
                    <span className={`w-1.5 h-3.5 rounded-full transition-colors ${activeFocus === 'customer' ? 'bg-[#8A9A86]' : 'bg-slate-300'}`}></span>
                    고객 화면(위젯)
                    {activeFocus === 'customer' && (
                      <div className="flex items-center gap-1.5 px-2.5 py-1 bg-[#F4F5F0] text-[#274236] text-[0.7rem] font-bold rounded-full border border-[#E5E8DF] shadow-sm animate-pulse ml-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#8A9A86]"></div>
                        현재 체험 중
                      </div>
                    )}
                  </div>
                </div>
                <div className={`flex-1 flex flex-col rounded-2xl overflow-hidden relative min-h-0 transition-all duration-300 ${
                  activeFocus === 'customer' 
                    ? 'bg-white border-2 border-[#8A9A86]/40 shadow-lg ring-4 ring-[#F4F5F0]' 
                    : 'bg-white/60 border border-slate-200 shadow-sm opacity-50 hover:opacity-80 scale-[0.98]'
                }`}>
                  <div className={`flex-1 overflow-hidden relative flex flex-col items-center min-h-0 bg-[#FAFBF9] ${activeFocus !== 'customer' && 'pointer-events-none'}`}>
                   
                   {/* Floating Widget Mockup */}
                   <div className="w-full h-full bg-white flex flex-col shadow-inner relative z-10 border-x border-slate-100 overflow-y-auto min-h-0">
                      {/* Widget Header */}
                      <div className="bg-white border-b border-slate-100 p-5 shrink-0 flex items-center justify-between sticky top-0 z-20 shadow-sm">
                        <div className="font-extrabold text-slate-800 text-[1.1rem] tracking-tight">GrowTalk</div>
                        <button className="text-slate-400 hover:text-slate-600 transition-colors p-1 bg-slate-50 hover:bg-slate-100 rounded-full"><X className="w-4 h-4" /></button>
                      </div>

                      <div className="p-5 flex-1 bg-[#FAFBF9]">
                        <div className="font-extrabold text-[0.8rem] text-slate-800 mb-4 px-1">최근 문의 내역</div>
                        
                        {/* List -> Detail View Mock */}
                        {boardInquiry ? (
                          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden mb-8 shadow-sm">
                             <div className="p-4 border-b border-slate-100 bg-white flex items-center justify-between cursor-pointer group hover:bg-[#F4F5F0]/30 transition-colors">
                               <div className="flex items-center gap-2 overflow-hidden">
                                 {boardInquiry.answer ? (
                                   <span className="px-2 py-0.5 bg-slate-100 border border-slate-200 text-slate-600 text-[0.65rem] font-bold rounded shrink-0">답변 완료</span>
                                 ) : (
                                   <span className="px-2 py-0.5 bg-yellow-50 border border-yellow-200 text-yellow-700 text-[0.65rem] font-bold rounded shrink-0">확인 중</span>
                                 )}
                                 <div className="font-extrabold text-[0.85rem] text-slate-900 truncate tracking-tight">{boardInquiry.title}</div>
                               </div>
                               <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-900 shrink-0 ml-2" />
                             </div>
                             <div className="p-5 bg-white text-[0.85rem]">
                                <div className="text-slate-700 mb-5 pb-5 border-b border-slate-100 font-medium whitespace-pre-wrap leading-relaxed">{boardInquiry.body}</div>
                                
                                {boardInquiry.answer ? (
                                  <div className="bg-[#F4F5F0]/50 border border-[#E5E8DF] p-5 rounded-xl text-[0.85rem]">
                                    <div className="text-[0.7rem] font-extrabold text-[#274236] mb-2.5 flex items-center gap-1.5"><Inbox className="w-3.5 h-3.5" /> GrowTalk 답변</div>
                                    <div className="text-slate-800 font-medium whitespace-pre-wrap leading-[1.7]">{boardInquiry.answer}</div>
                                  </div>
                                ) : (
                                  <div className="text-center font-bold text-slate-400 text-[0.75rem] py-3 bg-[#FAFBF9] rounded-lg border border-[#E5E8DF]/50">답변을 기다리고 있습니다.</div>
                                )}
                             </div>
                          </div>
                        ) : null}

                        {/* New Inquiry Form */}
                        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
                          <h4 className="font-extrabold text-[0.85rem] text-slate-900 mb-3.5">새 문의 남기기</h4>
                          <form onSubmit={handleBoardCustomerSubmit}>
                            <textarea
                              onClick={() => {if(activeFocus !== 'customer') setActiveFocus('customer')}}
                              value={boardCustomerInput}
                              onChange={(e) => setBoardCustomerInput(e.target.value)}
                              placeholder={activeFocus === 'customer' ? "문의 내용을 남겨주시면 확인 후 답변을 달아드립니다." : "클릭하여 활성화..."}
                              className={`w-full text-[0.85rem] bg-white rounded-xl p-4 min-h-[120px] resize-none outline-none transition-all mb-4 font-medium ${activeFocus === 'customer' ? 'border border-slate-300 focus:border-[#8A9A86] focus:ring-1 focus:ring-[#8A9A86] shadow-sm' : 'border border-slate-200 cursor-not-allowed bg-slate-50'}`}
                              disabled={activeFocus !== 'customer'}
                            />
                            <button 
                              type="submit" 
                              disabled={activeFocus !== 'customer'}
                              className={`w-full py-3 text-white text-[0.85rem] font-bold rounded-xl transition-all shadow-sm ${activeFocus === 'customer' ? 'bg-[#274236] hover:bg-[#1C3027] hover:shadow-md' : 'bg-slate-300 cursor-not-allowed'}`}
                            >
                              문의 등록하기
                            </button>
                          </form>
                        </div>
                      </div>
                   </div>
                </div>
              </div>
            </div>
            </>
          )}

        </div>
      </div>
    </div>
  );
};
