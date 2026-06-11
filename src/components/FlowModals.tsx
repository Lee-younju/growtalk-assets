import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2 } from 'lucide-react';

export type FlowType = 'none' | 'login' | 'board-create' | 'demo-request' | 'subscribe' | 'success';

interface FlowContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: (v: boolean) => void;
  currentFlow: FlowType;
  setCurrentFlow: (flow: FlowType) => void;
  pendingFlow: FlowType;
  setPendingFlow: (flow: FlowType) => void;
  startBoardFlow: () => void;
  startDemoFlow: () => void;
  startEnterpriseFlow: () => void;
  startSubscribeFlow: () => void;
  isWidgetOpen: boolean;
  setIsWidgetOpen: (v: boolean) => void;
  currentPlan: 'free' | 'subscribed';
  setCurrentPlan: (plan: 'free' | 'subscribed') => void;
  openPlanModal: (tab: 'plan' | 'account') => void;
}

export const FlowContext = React.createContext<FlowContextType>({} as FlowContextType);

const WizardFlow = ({ flowType, onClose, setIsProcessing }: { flowType: 'board-create' | 'demo-request' | 'subscribe', onClose: () => void, setIsProcessing?: (v: boolean) => void }) => {
  const [step, setStep] = useState(1);
  const [progressIndex, setProgressIndex] = useState(0);

  useEffect(() => {
    if (setIsProcessing) {
      setIsProcessing(step === 3);
    }
    
    if (step === 3) {
      const handleBeforeUnload = (e: BeforeUnloadEvent) => {
        e.preventDefault();
        e.returnValue = '';
      };
      window.addEventListener('beforeunload', handleBeforeUnload);
      return () => window.removeEventListener('beforeunload', handleBeforeUnload);
    }
  }, [step, setIsProcessing]);

  const [formData, setFormData] = useState({
    company: '',
    manager: '',
    email: '',
    phone: '',
    siteUrl: '',
    solution: flowType === 'board-create' ? '게시판형 채팅 솔루션' : flowType === 'demo-request' ? '실시간 상담 체험' : '구독 플랜'
  });

  const getStepsList = () => {
    if (flowType === 'board-create') {
      return ['회사 정보 확인', '게시판형 상담 환경 생성', '문의 유형 기본 설정', '관리 화면 준비'];
    }
    if (flowType === 'demo-request') {
      return ['회사 정보 확인', '실시간 채팅 체험 화면 생성', '상담 화면 기본 설정', '관리 화면 준비'];
    }
    return ['회사 정보 확인', '구독 플랜 확인', '상담 환경 생성', '기본 설정 적용', '관리 화면 준비'];
  };

  const stepsList = getStepsList();

  const startProvisioning = () => {
    setStep(3);
    let currentIdx = 0;
    const interval = setInterval(() => {
      currentIdx += 1;
      setProgressIndex(currentIdx);
      if (currentIdx >= stepsList.length) {
        clearInterval(interval);
        setTimeout(() => setStep(4), 800);
      }
    }, 1200);
  };

  const handleNextFromForm = () => {
    if (!formData.company || !formData.manager || !formData.email || !formData.phone) {
      alert('필수 항목을 모두 입력해주세요.');
      return;
    }
    if (flowType === 'subscribe') {
      setStep(2);
    } else {
      startProvisioning();
    }
  };

  const getStatus = (idx: number) => {
    if (idx < progressIndex) return '완료';
    if (idx === progressIndex) return '진행 중';
    return '대기';
  };

  if (step === 1) {
    return (
      <div className="p-8 md:p-10">
        <div className="mb-8">
          <h3 className="text-[1.4rem] font-bold text-gray-900 mb-2 tracking-tight">우리 회사 상담 환경 만들기</h3>
          <p className="text-gray-500 text-[0.95rem] leading-relaxed break-keep">회사 정보를 입력하면<br/>고객 문의창과 상담 관리 화면이 준비됩니다.</p>
        </div>

        <div className="space-y-5 mb-8 text-left">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="md:col-span-2">
              <label className="block text-[0.85rem] font-bold text-gray-700 mb-2">회사명 <span className="text-red-500">*</span></label>
              <input value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})} type="text" placeholder="예: 구글 코리아" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#274236] transition-shadow text-[0.95rem]" />
              <p className="text-[0.75rem] text-gray-400 mt-2 tracking-tight">입력한 회사명은 고객 문의창과 상담 관리 화면에 표시됩니다.</p>
            </div>
            <div>
              <label className="block text-[0.85rem] font-bold text-gray-700 mb-2">담당자명 <span className="text-red-500">*</span></label>
              <input value={formData.manager} onChange={e => setFormData({...formData, manager: e.target.value})} type="text" placeholder="예: 홍길동" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#274236] transition-shadow text-[0.95rem]" />
            </div>
            <div>
              <label className="block text-[0.85rem] font-bold text-gray-700 mb-2">이메일 <span className="text-red-500">*</span></label>
              <input value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} type="email" placeholder="hello@company.com" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#274236] transition-shadow text-[0.95rem]" />
            </div>
            <div>
              <label className="block text-[0.85rem] font-bold text-gray-700 mb-2">연락처 <span className="text-red-500">*</span></label>
              <input value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} type="text" placeholder="010-0000-0000" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#274236] transition-shadow text-[0.95rem]" />
            </div>
            <div>
              <label className="block text-[0.85rem] font-bold text-gray-700 mb-2">설치할 사이트 URL <span className="text-gray-400 font-normal ml-1">(선택)</span></label>
              <input value={formData.siteUrl} onChange={e => setFormData({...formData, siteUrl: e.target.value})} type="text" placeholder="https://www.example.com" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#274236] transition-shadow text-[0.95rem]" />
            </div>
            <div className="md:col-span-2">
               <label className="block text-[0.85rem] font-bold text-gray-700 mb-2">관심 솔루션</label>
               <select value={formData.solution} onChange={e => setFormData({...formData, solution: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#274236] transition-shadow text-[0.95rem] bg-white appearance-none cursor-pointer">
                  <option value="게시판형 채팅 솔루션">게시판형 채팅 솔루션</option>
                  <option value="실시간 채팅 솔루션 체험">실시간 채팅 솔루션 체험</option>
                  <option value="기업 맞춤 도입 상담">기업 맞춤 도입 상담</option>
               </select>
            </div>
          </div>
        </div>

        <button 
          onClick={handleNextFromForm}
           className="w-full py-4 bg-[#274236] text-white font-bold rounded-xl hover:bg-[#1C3027] transition-all shadow-[0_4px_14px_0_rgba(39,66,54,0.2)] text-[1.05rem]"
        >
          {flowType === 'subscribe' ? '다음 단계 (결제)' : '상담 환경 생성하기'}
        </button>
      </div>
    );
  }

  if (step === 2 && flowType === 'subscribe') {
    return (
      <div className="p-8 md:p-12 text-left">
        <div className="mb-10 text-center">
          <h3 className="text-[1.6rem] font-bold text-gray-900 mb-2 tracking-tight">구독 결제</h3>
          <p className="text-gray-500 text-[0.95rem] leading-relaxed break-keep">
            선택한 플랜으로 구독을 시작합니다.<br/>결제 프로그램은 추후 연동될 예정입니다.
          </p>
        </div>

        <div className="bg-[#F8FAFC] border border-gray-100 rounded-[1.5rem] p-6 mb-8">
          <div className="space-y-4 text-[0.95rem]">
            <div className="flex justify-between items-center pb-4 border-b border-gray-200">
              <span className="text-gray-500 font-medium">선택한 플랜</span>
              <span className="text-gray-900 font-bold">실시간 채팅 솔루션 (구독형)</span>
            </div>
            <div className="flex justify-between items-center pb-4 border-b border-gray-200">
              <span className="text-gray-500 font-medium">결제 금액</span>
              <span className="text-gray-900 font-bold">190,000원 <span className="text-gray-400 text-[0.8rem] font-medium ml-1">/ 월</span></span>
            </div>
            <div className="flex justify-between items-center pb-4 border-b border-gray-200">
              <span className="text-gray-500 font-medium">결제 수단</span>
              <span className="text-gray-900 font-bold">샘플 카드 (0000-****)</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500 font-medium">구독 시작일</span>
              <span className="text-emerald-700 font-bold">결제 즉시 등록</span>
            </div>
          </div>
        </div>

        <div className="bg-emerald-50/50 border border-emerald-100 rounded-xl p-4 text-center mb-8">
          <p className="text-[0.85rem] text-emerald-800 font-medium break-keep leading-relaxed">
            * 실제 결제는 진행되지 않습니다. (프로토타입 샘플 화면)
          </p>
        </div>

        <button 
          onClick={startProvisioning}
          className="w-full py-4 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 transition-all shadow-[0_4px_14px_0_rgba(16,185,129,0.2)] text-[1.05rem]"
        >
          샘플 결제 완료하기
        </button>
      </div>
    );
  }

  if (step === 3) {
    const progressPercent = Math.min(100, Math.round((progressIndex / stepsList.length) * 100));
    
    return (
      <div className="p-8 md:p-12 text-left">
        <div className="mb-10 text-center">
          <h3 className="text-[1.6rem] font-bold text-gray-900 mb-3 tracking-tight">상담 환경을 준비하고 있어요</h3>
          <p className="text-gray-500 text-[0.95rem] leading-relaxed break-keep">
            생성이 완료될 때까지 창을 닫거나 새로고침하지 말아주세요.
          </p>
        </div>

        <div className="bg-[#F8FAFC] border border-gray-100 rounded-[1.5rem] p-6 md:p-8 mb-8">
          <div className="mb-6 flex items-center justify-between">
            <span className="font-bold text-gray-900">전체 진행률</span>
            <span className="font-bold text-[#274236]">{progressPercent}%</span>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full mb-8 overflow-hidden">
            <div className="h-full bg-[#274236] rounded-full transition-all duration-500 ease-out" style={{ width: `${progressPercent}%` }}></div>
          </div>

          <div className="space-y-4">
            {stepsList.map((st, idx) => {
              const status = getStatus(idx);
              const isActive = idx === progressIndex;
              const isDone = idx < progressIndex;
              return (
                <div key={idx} className={`flex items-center justify-between p-3 rounded-xl transition-all ${isActive ? 'bg-white shadow-sm border border-gray-100' : 'bg-transparent border border-transparent'}`}>
                  <div className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${isDone ? 'bg-[#274236] text-white' : isActive ? 'bg-emerald-100 text-[#274236]' : 'bg-gray-200 text-gray-400'}`}>
                      {isDone ? <CheckCircle2 className="w-4 h-4" /> : isActive ? <div className="w-2 h-2 rounded-full bg-[#274236] animate-pulse"></div> : <span className="text-[0.6rem] font-bold">{idx + 1}</span>}
                    </div>
                    <span className={`text-[0.95rem] font-medium ${isDone ? 'text-gray-900' : isActive ? 'text-[#274236] font-bold' : 'text-gray-400'}`}>{st}</span>
                  </div>
                  <span className={`text-[0.8rem] font-bold ${isDone ? 'text-[#274236]' : isActive ? 'text-emerald-600' : 'text-gray-400'}`}>{status}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-amber-50/50 border border-amber-100 rounded-xl p-4 text-center">
          <p className="text-[0.85rem] text-amber-800 font-medium break-keep leading-relaxed">
            환경 설정이 완료되면 자동으로 상담원/관리자 페이지로 이동합니다.
          </p>
        </div>
      </div>
    );
  }

  const isBoard = flowType === 'board-create';
  
  return (
    <div className="p-8 md:p-12 text-center flex flex-col items-center">
      <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="w-20 h-20 bg-[#EEF5F0] rounded-full flex items-center justify-center mb-8 border border-[#DCE6E0]">
        <CheckCircle2 className="w-10 h-10 text-[#274236]" />
      </motion.div>
      <h3 className="text-[1.6rem] font-bold text-gray-900 mb-4 tracking-tight">
        상담 환경이 준비되었습니다
      </h3>
      <p className="text-gray-500 text-[1rem] leading-relaxed break-keep mb-10">
        {flowType === 'demo-request' ? (
          <>실시간 채팅 체험 화면이 준비되었습니다.<br/>상담 화면과 운영 흐름을 확인해보세요.</>
        ) : flowType === 'board-create' ? (
          <>게시판형 상담 환경이 준비되었습니다.<br/>이제 문의를 접수하고 답변을 관리할 수 있습니다.</>
        ) : (
          <>우리 회사 상담 환경이 준비되었습니다.<br/>이제 상담원/관리자 페이지에서 운영을 시작할 수 있습니다.</>
        )}
      </p>

      <div className="w-full flex justify-center bg-gray-50 py-4 rounded-xl border border-gray-100 mb-10 text-[0.9rem] text-gray-600 font-medium">
        <span className="text-gray-400 mr-2">생성된 회사:</span> <span className="text-gray-900 font-bold ml-1">{formData.company}</span>
      </div>

      <div className="flex flex-col gap-3 w-full justify-center">
        <button onClick={onClose} className="px-6 py-3.5 bg-[#274236] text-white font-bold rounded-xl hover:bg-[#1C3027] transition-all shadow-[0_4px_14px_0_rgba(39,66,54,0.2)] text-[1.05rem] flex items-center justify-center gap-2">
          상담원/관리자 페이지로 이동
        </button>
      </div>
    </div>
  );
};

export const FlowModals = () => {
  const { currentFlow, setCurrentFlow, isLoggedIn, setIsLoggedIn, pendingFlow, setPendingFlow } = React.useContext(FlowContext);
  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Reset tab when modal opens/closes
  React.useEffect(() => {
    if (currentFlow === 'login') {
      setIsSignUpMode(false);
    }
  }, [currentFlow]);

  const closeModal = () => {
    setCurrentFlow('none');
    setPendingFlow('none');
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    if (pendingFlow !== 'none') {
      setCurrentFlow(pendingFlow);
      setPendingFlow('none');
    } else {
      closeModal();
    }
  };

  const handleSignUp = () => {
    setIsLoggedIn(true);
    if (pendingFlow !== 'none') {
      setCurrentFlow(pendingFlow);
      setPendingFlow('none');
    } else {
      closeModal();
    }
  };

  const isWizardActive = currentFlow === 'board-create' || currentFlow === 'demo-request' || currentFlow === 'subscribe';

  return (
    <AnimatePresence>
      {currentFlow !== 'none' && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={isProcessing ? undefined : closeModal}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className={`relative bg-white rounded-2xl shadow-xl w-full ${isWizardActive ? 'max-w-2xl' : 'max-w-md'} max-h-[90vh] overflow-y-auto z-10`}
          >
            {!isProcessing && (
              <button 
                onClick={closeModal}
                className="absolute top-5 right-5 p-2 text-gray-400 hover:text-gray-600 transition-colors z-20 bg-white/50 rounded-full backdrop-blur-sm"
              >
                <X className="w-5 h-5" />
              </button>
            )}

            {currentFlow === 'login' && (
              <div className="p-8 md:p-10 text-left">
                {!isSignUpMode ? (
                  <>
                    <h3 className="text-[1.4rem] font-bold text-gray-900 mb-2 tracking-tight">로그인</h3>
                    <p className="text-gray-500 text-[0.95rem] mb-6 break-keep">
                      {pendingFlow === 'demo-request' 
                        ? '실시간 상담 체험은 로그인 없이 바로 체험 페이지에서 확인하실 수 있습니다.'
                        : pendingFlow === 'board-create'
                        ? '게시판형 채팅을 무료로 시작하려면 로그인이 필요해요. 로그인 후 게시판형 상담 환경을 준비해드립니다.'
                        : pendingFlow === 'subscribe'
                        ? '구독을 진행하려면 로그인이 필요해요. 로그인 후 구독 신청 및 상담 환경을 준비해드립니다.'
                        : '진행을 위해 먼저 로그인을 완료해주세요.'}
                    </p>
                    <div className="space-y-4">
                      <input type="email" placeholder="이메일 주소" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#274236] transition-shadow text-[0.95rem]" />
                      <input type="password" placeholder="비밀번호" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#274236] transition-shadow text-[0.95rem]" />
                      <div className="pt-2">
                        <button 
                          onClick={handleLogin}
                          className="w-full py-4 bg-[#274236] text-white font-bold rounded-xl hover:bg-[#1C3027] transition-all shadow-[0_4px_14px_0_rgba(39,66,54,0.2)] text-[1.05rem] mb-3"
                        >
                          {pendingFlow === 'demo-request' 
                            ? '로그인하고 실시간 상담 체험'
                            : pendingFlow === 'board-create'
                            ? '로그인하고 시작하기'
                            : pendingFlow === 'subscribe'
                            ? '로그인하고 구독 신청하기'
                            : '로그인'}
                        </button>
                        <button 
                          onClick={() => setIsSignUpMode(true)}
                          className="w-full py-4 bg-white text-gray-900 font-bold rounded-xl border border-gray-200 hover:bg-gray-50 transition-all text-[1.05rem]"
                        >
                          {pendingFlow !== 'none' ? '회원가입하기' : '회원가입'}
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <h3 className="text-[1.4rem] font-bold text-gray-900 mb-2 tracking-tight">회원가입</h3>
                    <p className="text-gray-500 text-[0.95rem] mb-6 break-keep">
                      {pendingFlow === 'demo-request' 
                        ? '실시간 상담 체험은 가입 없이 체험 페이지에서 확인하실 수 있습니다.'
                        : pendingFlow === 'board-create'
                        ? '게시판형 채팅을 무료로 시작하려면 회원가입이 필요해요.'
                        : pendingFlow === 'subscribe'
                        ? '구독을 진행하려면 회원가입이 필요해요.'
                        : '서비스 이용을 위해 회원가입을 완료해주세요.'}
                    </p>
                    <div className="space-y-4">
                      <input type="text" placeholder="이름" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#274236] transition-shadow text-[0.95rem]" />
                      <input type="email" placeholder="이메일 주소" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#274236] transition-shadow text-[0.95rem]" />
                      <input type="password" placeholder="비밀번호" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#274236] transition-shadow text-[0.95rem]" />
                      <input type="password" placeholder="비밀번호 확인" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#274236] transition-shadow text-[0.95rem]" />
                      <div className="pt-2">
                        <button 
                          onClick={handleSignUp}
                          className="w-full py-4 bg-[#274236] text-white font-bold rounded-xl hover:bg-[#1C3027] transition-all shadow-[0_4px_14px_0_rgba(39,66,54,0.2)] text-[1.05rem] mb-4"
                        >
                          회원가입 완료
                        </button>
                        <div className="text-center text-[0.95rem] text-gray-600">
                          이미 계정이 있으신가요?{' '}
                          <button 
                            onClick={() => setIsSignUpMode(false)}
                            className="text-[#274236] font-bold hover:underline"
                          >
                            로그인
                          </button>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}

            {isWizardActive && (
              <WizardFlow flowType={currentFlow} onClose={closeModal} setIsProcessing={setIsProcessing} />
            )}

            {currentFlow === 'success' && (
              <div className="p-10 text-center flex flex-col items-center">
                <div className="w-20 h-20 bg-[#EEF5F0] rounded-full flex items-center justify-center mb-6 border border-[#DCE6E0]">
                  <CheckCircle2 className="w-10 h-10 text-[#274236]" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">완료되었습니다</h3>
                <button 
                  onClick={closeModal}
                  className="w-full py-3.5 bg-gray-100 text-gray-900 font-bold rounded-xl hover:bg-gray-200 transition-colors"
                >
                  확인
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
