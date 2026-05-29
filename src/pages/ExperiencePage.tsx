import React, { useState } from 'react';
import { MessageSquare, Paperclip, X, User, Clock, AlertCircle, Inbox, Send, FileText, ChevronRight } from 'lucide-react';

export const ExperiencePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'live' | 'board'>('live');
  
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
    <div className="h-screen bg-[#F0F2F5] flex flex-col font-sans overflow-hidden">
      {/* Unified Top Banner & Header */}
      <div className="bg-[#274236] text-white flex flex-col flex-none z-20 shadow-md">
        {/* Top Row: Warning & Close button */}
        <div className="px-6 py-2.5 flex items-center justify-between border-b border-white/10">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-emerald-300 shrink-0" />
            <span className="text-[0.85rem] font-medium tracking-wide">샘플 체험 화면입니다. 입력한 내용은 저장되지 않으며, 창을 닫으면 체험이 종료됩니다.</span>
          </div>
          <button 
            onClick={handleClose}
            className="px-4 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-lg text-[0.85rem] font-bold transition-colors flex items-center gap-2 shrink-0"
          >
            <X className="w-4 h-4" /> 체험 종료
          </button>
        </div>
        
        {/* Title, Description & Tabs */}
        <div className="px-6 py-3 pb-4 flex flex-col items-center shrink-0">
          <h1 className="text-xl font-bold text-white mb-1">각 솔루션별 상세 기능 살펴보기</h1>
          <p className="text-white/80 mb-3 text-[0.85rem]">팀의 상황과 상담 성격에 맞는 솔루션의 세부 화면을 확인해보세요.</p>
          
          {/* Segmented Control */}
          <div className="inline-flex bg-black/20 p-1 rounded-full shadow-inner border border-white/10">
            <button 
              onClick={() => setActiveTab('live')}
              className={`px-5 py-1.5 rounded-full text-[0.8rem] font-bold transition-all duration-200 ${
                activeTab === 'live' 
                  ? 'bg-white text-[#274236] shadow-sm' 
                  : 'text-white/70 hover:text-white'
              }`}
            >
              실시간 채팅 솔루션
            </button>
            <button 
              onClick={() => setActiveTab('board')}
              className={`px-5 py-1.5 rounded-full text-[0.8rem] font-bold transition-all duration-200 ${
                activeTab === 'board' 
                  ? 'bg-white text-[#274236] shadow-sm' 
                  : 'text-white/70 hover:text-white'
              }`}
            >
              게시판형 채팅 솔루션
            </button>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="w-full px-6 py-5 flex-1 flex flex-col min-h-0 overflow-hidden">
        <div className="w-full h-full grid lg:grid-cols-[minmax(0,1fr)_340px] gap-6 items-stretch min-h-0">
          
          {activeTab === 'live' ? (
            <>
              {/* === LIVE CHAT: LEFT (AGENT) === */}
              <div className="flex flex-col min-w-0 h-full min-h-0">
                <div className="mb-2 px-1 flex-none">
                  <div className="text-[0.95rem] font-bold text-gray-800 flex items-center gap-2">
                    <span className="w-1.5 h-3.5 bg-emerald-500 rounded-full"></span>
                    상담원 화면(관리자)
                  </div>
                </div>
                <div className="flex-1 flex flex-col bg-white rounded-2xl shadow-sm border border-emerald-100 overflow-hidden min-h-0">
                  <div className="flex-1 flex overflow-hidden min-h-0">
                  {/* Sidebar (List) */}
                  <div className="w-[200px] xl:w-[240px] border-r border-gray-100 bg-white flex-col hidden lg:flex shrink-0">
                    <div className="p-3 border-b border-gray-100 font-bold text-sm text-gray-500 bg-slate-50/50 flex-none">진행 중인 상담 (1)</div>
                    <div className="p-4 bg-emerald-50/50 border-l-4 border-emerald-500 cursor-pointer flex-none">
                      <div className="flex justify-between items-center mb-1.5">
                        <span className="font-bold text-[0.85rem] text-gray-900">김고객</span>
                        <span className="text-[0.65rem] text-gray-400">방금 전</span>
                      </div>
                      <div className="text-[0.75rem] text-gray-500 truncate">{liveMessages[liveMessages.length-1]?.text || '...'}</div>
                    </div>
                  </div>

                  {/* Chat Area */}
                  <div className="flex-1 flex flex-col bg-slate-50 relative min-h-0">
                    <div className="p-4 border-b border-gray-100 bg-white flex items-center justify-between shrink-0 shadow-sm z-10 flex-none">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                          <User className="w-5 h-5 text-emerald-600" />
                        </div>
                        <div>
                          <div className="font-bold text-[0.9rem] text-gray-900">김고객</div>
                          <div className="text-[0.7rem] text-gray-500 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>온라인
                          </div>
                        </div>
                      </div>
                      <button className="px-3 py-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-lg hover:bg-emerald-100 transition-colors">
                        상담 종료
                      </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-4">
                      {liveMessages.map((msg, i) => (
                        <div key={i} className={`flex items-start gap-3 ${msg.type === 'agent' ? 'flex-row-reverse' : ''}`}>
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${msg.type === 'agent' ? 'bg-emerald-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
                            {msg.type === 'agent' ? '상담' : '김'}
                          </div>
                          <div className={`flex flex-col ${msg.type === 'agent' ? 'items-end' : 'items-start'}`}>
                            <div className={`flex items-center gap-1.5 mb-1 text-[0.65rem] text-gray-400 ${msg.type === 'agent' ? 'flex-row-reverse' : ''}`}>
                              <span className="font-bold text-gray-700">{msg.type === 'agent' ? '상담 관리자' : '김고객'}</span>
                              <span>{msg.time}</span>
                            </div>
                            <div className={`px-4 py-2.5 rounded-2xl max-w-[85%] text-[0.85rem] leading-relaxed shadow-sm break-keep ${
                              msg.type === 'agent' ? 'bg-emerald-50 border border-emerald-100 rounded-tr-none text-emerald-900' : 'bg-white border border-gray-200 rounded-tl-none text-gray-800'
                            }`}>
                              {msg.text}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="p-4 bg-white border-t border-gray-100 shrink-0">
                      <form onSubmit={handleLiveAgentSubmit} className="border border-gray-200 rounded-xl overflow-hidden focus-within:border-emerald-400 focus-within:ring-1 focus-within:ring-emerald-400 transition-all flex flex-col bg-white">
                        <textarea 
                          value={liveAgentInput}
                          onChange={(e) => setLiveAgentInput(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                              e.preventDefault();
                              handleLiveAgentSubmit(e);
                            }
                          }}
                          className="w-full px-3 py-3 text-[0.85rem] text-gray-700 resize-none outline-none flex-1 min-h-[60px]" 
                          placeholder="고객에게 보낼 답변을 입력해주세요..."
                        />
                        <div className="p-2 flex justify-between items-center shrink-0 border-t border-gray-50 bg-gray-50/50">
                          <div className="flex gap-2">
                             <button type="button" className="p-1.5 text-gray-400 hover:text-gray-600 rounded bg-white border border-gray-200 shadow-sm"><Paperclip className="w-3.5 h-3.5" /></button>
                          </div>
                          <button type="submit" className="px-4 py-1.5 bg-emerald-600 text-white text-[0.75rem] font-bold rounded-lg hover:bg-emerald-700 transition-colors shadow-sm flex items-center gap-1.5">
                            <Send className="w-3 h-3" /> 답변 전송
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                  
                  {/* Right Info Panel (LG only) */}
                  <div className="w-[200px] xl:w-[240px] border-l border-gray-100 bg-white hidden xl:flex flex-col shrink-0 p-5">
                     <h4 className="font-bold text-[0.7rem] text-gray-400 uppercase tracking-wider mb-5">상담 정보</h4>
                     <div className="space-y-5">
                       <div>
                         <div className="text-[0.75rem] text-gray-500 mb-1.5">상태</div>
                         <span className="px-2.5 py-1 bg-emerald-50 border border-emerald-100 text-emerald-700 text-[0.75rem] font-bold rounded-md">상담중</span>
                       </div>
                       <div>
                         <div className="text-[0.75rem] text-gray-500 mb-1.5">담당자</div>
                         <div className="flex items-center gap-2">
                           <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center font-bold text-emerald-700 text-[0.6rem]">상담</div>
                           <span className="text-[0.85rem] font-medium text-gray-900">김상담 매니저</span>
                         </div>
                       </div>
                     </div>
                  </div>
                </div>
              </div>
            </div>

              {/* === LIVE CHAT: RIGHT (CUSTOMER) === */}
              <div className="flex flex-col shrink-0 w-full h-full min-h-0">
                <div className="mb-2 px-1 flex-none">
                  <div className="text-[0.95rem] font-bold text-gray-800 flex items-center gap-2">
                    <span className="w-1.5 h-3.5 bg-gray-400 rounded-full"></span>
                    고객 화면(위젯)
                  </div>
                </div>
                <div className="flex-1 flex flex-col bg-slate-50 rounded-2xl shadow-sm border border-emerald-100 overflow-hidden relative min-h-0">
                  {/* Simulated Website Background */}
                  <div className="flex-1 bg-gray-100 overflow-hidden relative flex flex-col items-center min-h-0">
                   
                   {/* Floating Widget Mockup */}
                   <div className="w-full h-full bg-white flex flex-col shadow-inner relative z-10 min-h-0">
                      {/* Widget Header */}
                      <div className="bg-[#274236] px-4 py-4 text-white shrink-0 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl -mt-10 -mr-10 pointer-events-none"></div>
                        <div className="font-bold text-lg mb-1 flex items-center justify-between">
                          <span>GrowTalk 상담</span>
                          <X className="w-5 h-5 text-white/50" />
                        </div>
                        <div className="text-[0.75rem] font-medium text-white/80">무엇을 도와드릴까요?</div>
                      </div>

                      {/* Widget Chat Area */}
                      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 bg-slate-50">
                         <div className="flex justify-center mb-2">
                            <span className="px-3 py-1 bg-black/5 text-gray-500 text-[0.65rem] font-medium rounded-full">상담이 시작되었습니다.</span>
                         </div>
                         {liveMessages.map((msg, i) => (
                           <div key={i} className={`flex items-start gap-2 ${msg.type === 'customer' ? 'flex-row-reverse' : ''}`}>
                             {msg.type === 'agent' && (
                               <div className="w-8 h-8 rounded-full bg-[#274236] text-white flex items-center justify-center text-xs font-bold shrink-0 shadow-sm">
                                 상담
                               </div>
                             )}
                             <div className={`flex flex-col ${msg.type === 'customer' ? 'items-end' : 'items-start'}`}>
                               <div className="flex items-center gap-1.5 mb-1 text-[0.65rem] text-gray-400 font-medium">
                                 <span>{msg.time}</span>
                               </div>
                               <div className={`px-3.5 py-2.5 rounded-2xl max-w-[240px] text-[0.85rem] leading-relaxed shadow-sm break-keep ${
                                 msg.type === 'customer' ? 'bg-[#274236] text-white rounded-tr-none' : 'bg-white border border-gray-200 rounded-tl-none text-gray-800'
                               }`}>
                                 {msg.text}
                               </div>
                             </div>
                           </div>
                         ))}
                      </div>

                      {/* Widget Input Area */}
                      <div className="p-3 border-t border-gray-100 bg-white shrink-0">
                         <form onSubmit={handleLiveCustomerSubmit} className="flex gap-2">
                           <input 
                             type="text"
                             value={liveCustomerInput}
                             onChange={(e) => setLiveCustomerInput(e.target.value)}
                             placeholder="메시지를 입력하세요..."
                             className="flex-1 px-4 py-2 bg-gray-50 border border-gray-200 rounded-full text-[0.85rem] outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all font-medium"
                           />
                           <button type="submit" className="w-10 h-10 bg-[#274236] text-white rounded-full flex items-center justify-center hover:bg-[#1C3027] shrink-0 shadow-sm transition-transform hover:scale-105">
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
              <div className="flex flex-col min-w-0 h-full min-h-0">
                <div className="mb-2 px-1 flex-none">
                  <div className="text-[0.95rem] font-bold text-gray-800 flex items-center gap-2">
                    <span className="w-1.5 h-3.5 bg-[#8A9A86] rounded-full"></span>
                    상담원 화면(관리자)
                  </div>
                </div>
                <div className="flex-1 flex flex-col bg-white rounded-2xl shadow-sm border border-[#E5E8DF] overflow-hidden min-h-0">
                  <div className="flex-1 flex overflow-hidden min-h-0">
                  {/* Sidebar (List) */}
                  <div className="w-[200px] xl:w-[240px] border-r border-[#E5E8DF] bg-white flex-col hidden lg:flex shrink-0">
                    <div className="p-3 border-b border-[#E5E8DF] font-bold text-sm text-gray-600 bg-[#FAFBF9] flex-none">접수된 문의 (2)</div>
                    
                    <div className="p-4 bg-[#F4F5F0]/50 border-l-4 border-[#8A9A86] cursor-pointer flex-none">
                      <div className="flex justify-between items-center mb-2">
                        <span className="px-1.5 py-0.5 bg-yellow-100 text-yellow-700 text-[0.65rem] font-bold rounded">확인 중</span>
                        <span className="text-[0.65rem] text-gray-400">방금 전</span>
                      </div>
                      <div className="font-bold text-[0.85rem] text-gray-900 mb-1 truncate">{boardInquiry?.title || '문의 내역이 없습니다.'}</div>
                      <div className="text-[0.75rem] text-gray-500 truncate">{boardInquiry?.body || ''}</div>
                    </div>

                    <div className="p-4 border-b border-[#E5E8DF] cursor-pointer hover:bg-gray-50 transition-colors opacity-60">
                      <div className="flex justify-between items-center mb-2">
                        <span className="px-1.5 py-0.5 bg-gray-100 text-gray-600 text-[0.65rem] font-bold rounded">답변 완료</span>
                        <span className="text-[0.65rem] text-gray-400">1일 전</span>
                      </div>
                      <div className="font-bold text-[0.85rem] text-gray-900 mb-1 truncate">비밀번호 재설정 관련</div>
                      <div className="text-[0.75rem] text-gray-500 truncate">계정 비밀번호를 분실했는데 어떻게...</div>
                    </div>
                  </div>

                  {/* Board Detail Area */}
                  <div className="flex-1 flex flex-col bg-[#FAFBF9] relative min-h-0">
                    <div className="p-4 border-b border-[#E5E8DF] bg-white flex items-center justify-between shrink-0 shadow-sm z-10 flex-none">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-500 text-sm">
                          김
                        </div>
                        <div>
                          <div className="font-bold text-[0.9rem] text-gray-900">김고객</div>
                          <div className="text-[0.7rem] text-gray-500">test@example.com</div>
                        </div>
                      </div>
                      <button className="px-3 py-1.5 text-xs font-bold text-[#4F5E4D] bg-[#F4F5F0] border border-[#E5E8DF] rounded-lg hover:bg-[#E5E8DF] transition-colors">
                        답변 완료 처리
                      </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-6 md:p-8 flex flex-col gap-6">
                      {boardInquiry ? (
                        <>
                          {/* Inquiry Body */}
                          <div className="bg-white border border-[#E5E8DF] rounded-xl p-6 shadow-sm">
                            <div className="flex items-center gap-2 mb-3">
                              <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-[0.65rem] font-bold rounded">결제 문의</span>
                              <div className="font-bold text-[1.1rem] text-gray-900">{boardInquiry.title}</div>
                            </div>
                            <div className="text-[0.75rem] font-medium text-gray-400 mb-5 pb-4 border-b border-gray-100 flex items-center gap-2">
                              <Clock className="w-3.5 h-3.5" /> {boardInquiry.time} 접수
                            </div>
                            <div className="text-[0.9rem] text-gray-700 leading-relaxed font-medium whitespace-pre-wrap">
                              {boardInquiry.body}
                            </div>
                          </div>

                          {/* Answer Area */}
                          {boardInquiry.answer ? (
                            <div className="bg-[#F4F5F0]/50 border border-[#E5E8DF] rounded-xl p-6 shadow-sm relative">
                               <div className="absolute top-6 right-6 text-[0.75rem] font-medium text-gray-400">방금 전 작성</div>
                               <div className="flex items-center gap-2 mb-5">
                                  <div className="w-7 h-7 rounded-full bg-[#4F5E4D] flex items-center justify-center font-bold text-white text-[0.65rem] shadow-sm">상담</div>
                                  <span className="font-bold text-[0.95rem] text-gray-900">김상담 매니저의 답변</span>
                               </div>
                               <div className="text-[0.9rem] text-gray-800 leading-relaxed font-medium bg-white/70 p-5 rounded-lg border border-[#E5E8DF]/50 whitespace-pre-wrap">
                                 {boardInquiry.answer}
                               </div>
                            </div>
                          ) : (
                            <div className="bg-white border text-center border-dashed border-[#E5E8DF] rounded-xl p-10 mt-4 shadow-sm">
                              <FileText className="w-8 h-8 text-gray-300 mx-auto mb-3" />
                              <div className="text-gray-500 font-medium">아직 답변이 등록되지 않았습니다.</div>
                            </div>
                          )}
                        </>
                      ) : (
                        <div className="flex-1 flex justify-center items-center text-gray-500">
                          선택된 문의가 없습니다.
                        </div>
                      )}
                    </div>

                    {!boardInquiry?.answer && boardInquiry && (
                      <div className="p-4 bg-white border-t border-[#E5E8DF] shrink-0">
                        <form onSubmit={handleBoardAgentSubmit} className="border border-gray-200 rounded-xl overflow-hidden focus-within:border-[#8A9A86] focus-within:ring-1 focus-within:ring-[#8A9A86] transition-all flex flex-col bg-white">
                          <textarea 
                            value={boardAgentInput}
                            onChange={(e) => setBoardAgentInput(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                handleBoardAgentSubmit(e);
                              }
                            }}
                            className="w-full px-4 py-3 text-[0.85rem] text-gray-700 resize-none outline-none flex-1 min-h-[80px]" 
                            placeholder="본문 형태의 답변을 상세히 작성해주세요..."
                          />
                          <div className="p-2 flex justify-between items-center shrink-0 border-t border-gray-50 bg-gray-50/50">
                            <div className="flex gap-2">
                               <button type="button" className="px-3 py-1.5 text-xs font-bold text-gray-600 bg-white border border-gray-200 shadow-sm rounded-lg flex items-center gap-1.5"><Paperclip className="w-3.5 h-3.5" /> 파일 첨부</button>
                            </div>
                            <button type="submit" className="px-5 py-1.5 bg-[#274236] text-white text-[0.8rem] font-bold rounded-lg hover:bg-[#1C3027] transition-colors shadow-sm">
                              답변 등록
                            </button>
                          </div>
                        </form>
                      </div>
                    )}
                  </div>
                  
                  {/* Right Info Panel (LG only) */}
                  <div className="w-[200px] xl:w-[240px] border-l border-[#E5E8DF] bg-white hidden xl:flex flex-col shrink-0 p-5">
                     <h4 className="font-bold text-[0.7rem] text-gray-400 uppercase tracking-wider mb-5">문의 정보</h4>
                     <div className="space-y-5">
                       <div>
                         <div className="text-[0.75rem] text-gray-500 mb-1.5">상태</div>
                         {boardInquiry?.answer ? (
                           <span className="px-2.5 py-1 bg-gray-100 border border-gray-200 text-gray-600 text-[0.75rem] font-bold rounded-md flex inline-flex">답변 완료</span>
                         ) : (
                           <span className="px-2.5 py-1 bg-yellow-50 border border-yellow-200 text-yellow-700 text-[0.75rem] font-bold rounded-md flex inline-flex">확인 중</span>
                         )}
                       </div>
                       {boardInquiry?.answer && (
                         <div>
                           <div className="text-[0.75rem] text-gray-500 mb-1.5">담당자</div>
                           <div className="flex items-center gap-2">
                             <div className="w-6 h-6 rounded-full bg-[#F4F5F0] flex items-center justify-center font-bold text-[#4F5E4D] text-[0.6rem]">상담</div>
                             <span className="text-[0.85rem] font-medium text-gray-900">김상담 매니저</span>
                           </div>
                         </div>
                       )}
                     </div>
                  </div>
                </div>
              </div>
            </div>

              {/* === BOARD CHAT: RIGHT (CUSTOMER) === */}
              <div className="flex flex-col shrink-0 w-full h-full min-h-0">
                <div className="mb-2 px-1 flex-none">
                  <div className="text-[0.95rem] font-bold text-gray-800 flex items-center gap-2">
                    <span className="w-1.5 h-3.5 bg-gray-400 rounded-full"></span>
                    고객 화면(위젯)
                  </div>
                </div>
                <div className="flex-1 flex flex-col bg-[#FAFBF9] rounded-2xl shadow-sm border border-[#E5E8DF] overflow-hidden relative min-h-0">
                  <div className="flex-1 bg-gray-100 overflow-hidden relative flex flex-col items-center min-h-0">
                   
                   {/* Floating Widget Mockup */}
                   <div className="w-full h-full bg-white flex flex-col shadow-inner relative z-10 border border-[#E5E8DF] overflow-y-auto min-h-0">
                      {/* Widget Header */}
                      <div className="bg-white border-b border-gray-200 p-5 shrink-0 flex items-center justify-between sticky top-0 z-20">
                        <div className="font-extrabold text-[#274236] text-lg tracking-tight">GrowTalk</div>
                        <X className="w-5 h-5 text-gray-400" />
                      </div>

                      <div className="p-4">
                        <div className="font-bold text-sm text-gray-900 mb-4 px-1">최근 문의 내역</div>
                        
                        {/* List -> Detail View Mock */}
                        {boardInquiry ? (
                          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden mb-6 shadow-sm">
                             <div className="p-4 border-b border-gray-100 bg-gray-50 flex items-center justify-between cursor-pointer group">
                               <div className="flex items-center gap-2 overflow-hidden">
                                 {boardInquiry.answer ? (
                                   <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-[0.65rem] font-bold rounded shrink-0">답변 완료</span>
                                 ) : (
                                   <span className="px-2 py-0.5 bg-yellow-100 text-yellow-700 text-[0.65rem] font-bold rounded shrink-0">확인 중</span>
                                 )}
                                 <div className="font-bold text-[0.8rem] text-gray-900 truncate">{boardInquiry.title}</div>
                               </div>
                               <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-900 shrink-0 ml-2" />
                             </div>
                             <div className="p-4 bg-white text-[0.8rem]">
                                <div className="text-gray-700 mb-4 pb-4 border-b border-gray-100 font-medium whitespace-pre-wrap">{boardInquiry.body}</div>
                                
                                {boardInquiry.answer ? (
                                  <div className="bg-[#FAFBF9] border border-[#E5E8DF] p-4 rounded-lg">
                                    <div className="text-[0.7rem] font-bold text-gray-500 mb-2 flex items-center gap-1.5"><Inbox className="w-3.5 h-3.5" /> GrowTalk 답변</div>
                                    <div className="text-gray-800 font-medium whitespace-pre-wrap leading-relaxed">{boardInquiry.answer}</div>
                                  </div>
                                ) : (
                                  <div className="text-center text-gray-400 text-[0.75rem] py-2">답변을 기다리고 있습니다.</div>
                                )}
                             </div>
                          </div>
                        ) : null}

                        {/* New Inquiry Form */}
                        <div className="bg-white border border-[#E5E8DF] rounded-xl p-5 shadow-sm">
                          <h4 className="font-bold text-sm text-gray-900 mb-4">새 문의 남기기</h4>
                          <form onSubmit={handleBoardCustomerSubmit}>
                            <textarea
                              value={boardCustomerInput}
                              onChange={(e) => setBoardCustomerInput(e.target.value)}
                              placeholder="문의 내용을 남겨주시면 확인 후 답변을 달아드립니다."
                              className="w-full text-sm bg-gray-50 border border-gray-200 rounded-lg p-3 min-h-[100px] resize-none outline-none focus:border-[#8A9A86] focus:ring-1 focus:ring-[#8A9A86] transition-all mb-3 font-medium"
                            />
                            <button type="submit" className="w-full py-2.5 bg-[#274236] text-white text-[0.85rem] font-bold rounded-lg hover:bg-[#1C3027] transition-colors shadow-sm">
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
