import React, { useState, useContext, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, User, CreditCard, Check, LogOut, ExternalLink, Receipt, ArrowLeft, Loader2 } from "lucide-react";
import { FlowContext } from "./FlowModals";

interface PlanManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentPlan: "free" | "subscribed";
  setCurrentPlan: (plan: "free" | "subscribed") => void;
  initialTab?: "plan" | "account";
  checkoutMode?: "settings" | "free" | "subscribed";
  setCheckoutMode?: (mode: "settings" | "free" | "subscribed") => void;
}

export const PlanManagerModal = ({
  isOpen,
  onClose,
  currentPlan,
  setCurrentPlan,
  initialTab = "plan",
  checkoutMode = "settings",
  setCheckoutMode,
}: PlanManagerModalProps) => {
  const { isLoggedIn, setIsLoggedIn } = useContext(FlowContext);
  const [activeTab, setActiveTab] = useState<"plan" | "account">(initialTab);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);

  // States for Checkout Form
  const [companyName, setCompanyName] = useState("그로우톡 주식회사");
  const [managerName, setManagerName] = useState("홍길동");
  const [emailAddress, setEmailAddress] = useState("gohakuss@gmail.com");
  const [phoneNumber, setPhoneNumber] = useState("010-1234-5678");
  const [websiteUrl, setWebsiteUrl] = useState("https://www.example.com");
  const [paymentMethod, setPaymentMethod] = useState<"card" | "easypay">("card");

  // Provisioning animation states
  const [isProvisioning, setIsProvisioning] = useState(false);
  const [progressIndex, setProgressIndex] = useState(0);
  const [isProvisioningComplete, setIsProvisioningComplete] = useState(false);

  const provisioningSteps = [
    "회사 정보 가입 등록 확인",
    "상담 솔루션 기초 데이터베이스 구성",
    "실시간 상담 알림 및 메신저 모듈 활성화",
    "보안 전송 계층 및 API 보안키 발급",
    "운영 매니저 권한 인증 및 연동 최적화"
  ];

  const provisioningStepsFree = [
    "회사 정보 가입 등록 확인",
    "게시판형 상담 솔루션 및 데이터베이스 구성",
    "문의 등록 알림 및 게시판 모듈 활성화",
    "기본 설정 적용 및 운영 환경 동기화",
    "운영 관리 화면 준비 완료"
  ];

  const getProgressPercent = () => {
    if (isProvisioningComplete) return 100;
    switch (progressIndex) {
      case 0: return 20;
      case 1: return 40;
      case 2: return 60;
      case 3: return 80;
      case 4: return 95;
      default: return 99;
    }
  };

  const handleProceedCheckout = () => {
    if (!companyName.trim() || !managerName.trim() || !emailAddress.trim() || !phoneNumber.trim()) {
      alert("필수 항목(회사명, 담당자명, 이메일, 연락처)을 모두 입력해주세요.");
      return;
    }
    
    setIsProvisioning(true);
    setProgressIndex(0);
    setIsProvisioningComplete(false);
  };

  // Provisioning progress timer
  useEffect(() => {
    if (!isProvisioning) return;
    
    // Prevent beforeunload
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", handleBeforeUnload);

    const stepsCount = 5;
    let currentIdx = 0;
    const interval = setInterval(() => {
      currentIdx += 1;
      if (currentIdx < stepsCount) {
        setProgressIndex(currentIdx);
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setIsProvisioningComplete(true);
          setCurrentPlan(checkoutMode === "free" ? "free" : "subscribed");
        }, 1000);
      }
    }, 1200);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      clearInterval(interval);
    };
  }, [isProvisioning, checkoutMode, setCurrentPlan]);

  // Sync activeTab with initialTab when opened
  useEffect(() => {
    if (isOpen) {
      setActiveTab(initialTab);
      // Reset provisioning states on reopen
      setIsProvisioning(false);
      setProgressIndex(0);
      setIsProvisioningComplete(false);
    }
  }, [isOpen, initialTab]);

  // Lock body scroll of parent page when modal is active
  useEffect(() => {
    if (isOpen) {
      const originalStyleOver = document.body.style.overflow;
      const originalStyleOverBehavior = document.body.style.overscrollBehavior;
      document.body.style.overflow = "hidden";
      document.body.style.overscrollBehavior = "contain";
      
      return () => {
        document.body.style.overflow = originalStyleOver;
        document.body.style.overscrollBehavior = originalStyleOverBehavior;
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleLogout = () => {
    setIsLoggedIn(false);
    onClose();
  };

  const activePlanLabel = currentPlan === "subscribed" 
    ? "실시간 채팅 솔루션" 
    : "게시판형 채팅 솔루션";
  
  const activePlanType = currentPlan === "subscribed"
    ? "구독형 플랜"
    : "무료 플랜";

  return (
    <div id="plan-manager-overlay" className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      {/* Dim backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={isProvisioning ? undefined : onClose}
        className="absolute inset-0 bg-black/55 backdrop-blur-xs cursor-pointer"
      />

      {/* Main Modal Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 20 }}
        className="relative bg-white rounded-[24px] shadow-2xl w-full max-w-[calc(100vw-80px)] md:max-w-[1140px] lg:max-w-[1240px] h-[88vh] md:h-[750px] max-h-[calc(100vh-60px)] overflow-hidden flex flex-col md:flex-row border border-slate-200 z-10 overscroll-contain"
      >
        {/* Close Button */}
        {!isProvisioning && (
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100/80 transition-colors z-20 rounded-full cursor-pointer"
            id="plan-manager-close-btn"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        {/* Sidebar Left Pane */}
        <div className="w-full md:w-[245px] bg-slate-50 border-b md:border-b-0 md:border-r border-slate-200/60 p-6 flex flex-col justify-between shrink-0">
          <div>
            <div className="pt-2 pb-5 mb-5 border-b border-slate-200/50">
              <h3 className="text-[17px] font-semibold text-slate-900 leading-tight">GrowTalk</h3>
              <p className="text-[12px] text-slate-500 font-normal mt-0.5">계정 및 플랜 관리</p>
            </div>

            <p className="text-[11px] font-semibold text-slate-400 tracking-wider uppercase mb-3 px-2">설정 및 관리</p>
            <nav className="space-y-1">
              <button
                onClick={isProvisioning ? undefined : () => setActiveTab("account")}
                disabled={isProvisioning}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[14px] transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${
                  activeTab === "account"
                    ? "bg-[#274236] text-white font-medium shadow-xs"
                    : "text-slate-600 hover:bg-slate-200/50 hover:text-slate-900 font-normal"
                }`}
                id="tab-account-btn"
              >
                <User className="w-4.5 h-4.5 shrink-0" />
                계정 정보
              </button>

              <button
                onClick={isProvisioning ? undefined : () => setActiveTab("plan")}
                disabled={isProvisioning}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[14px] transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${
                  activeTab === "plan"
                    ? "bg-[#274236] text-white font-medium shadow-xs"
                    : "text-slate-600 hover:bg-slate-200/50 hover:text-slate-900 font-normal"
                }`}
                id="tab-plan-btn"
              >
                <CreditCard className="w-4.5 h-4.5 shrink-0" />
                플랜 관리
              </button>
            </nav>
          </div>

          {/* Bottom user settings */}
          <div className="pt-5 border-t border-slate-200/50">
            <div className="px-2 mb-4">
              <p className="text-[11px] uppercase font-semibold text-slate-400 tracking-wider">이메일 계정</p>
              <p className="text-[13.5px] font-medium text-slate-700 truncate mt-1" title="user@example.com">user@example.com</p>
            </div>
            <button
              onClick={isProvisioning ? undefined : handleLogout}
              disabled={isProvisioning}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-[13px] font-medium text-red-650 hover:bg-red-50/60 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              id="plan-manager-logout-btn"
            >
              <LogOut className="w-4 h-4" />
              로그아웃
            </button>
          </div>
        </div>

        {/* Content Right Pane */}
        <div className="flex-1 overflow-y-auto pt-7 pb-8 pl-6 pr-14 md:pt-8 md:pb-8 md:pl-10 md:pr-20 flex flex-col overscroll-contain">
          <div className="space-y-5">
            {activeTab === "plan" ? (
              // Active Tab: Plan Management
              checkoutMode !== "settings" ? (
                // --- Checkout Screen ---
                isProvisioning ? (
                  // Step 3 & success: Provisioning / Preparation Screen
                  <div className="space-y-6">
                    <div className="text-center py-6">
                      <h2 className="text-[23px] font-bold text-slate-950 tracking-tight flex items-center justify-center gap-2.5">
                        {!isProvisioningComplete && <Loader2 className="w-6 h-6 animate-spin text-[#274236]" />}
                        {isProvisioningComplete ? "상담 환경이 준비되었습니다!" : "상담 환경을 준비하고 있어요"}
                      </h2>
                      <p className="text-[14px] text-slate-500 mt-2 max-w-[500px] mx-auto leading-relaxed break-keep">
                        {isProvisioningComplete 
                          ? "입력해주신 회사 정보로 독립적인 상담 통로 개설을 완료했습니다. 이제 관리 화면에서 첫 응대를 시작해보세요."
                          : "이용하실 솔루션을 설정하고 안정적인 상담 채널을 개설하는 중입니다. 생성이 완료될 때까지 창을 닫거나 새로고침하지 말아주세요."}
                      </p>
                    </div>

                    <div className="bg-[#FAFBF9] border border-[#E5E8DF] rounded-[20px] p-6 max-w-[620px] mx-auto shadow-xs">
                      <div className="mb-5 flex items-center justify-between">
                        <span className="font-bold text-slate-900 text-[14px]">전체 환경 준비 진행률</span>
                        <span className="font-extrabold text-[#274236] text-[15px]">{getProgressPercent()}%</span>
                      </div>
                      <div className="w-full h-2.5 bg-slate-100 rounded-full mb-6 overflow-hidden border border-slate-200/50">
                        <div 
                          className="h-full bg-[#274236] rounded-full transition-all duration-500 ease-out" 
                          style={{ width: `${getProgressPercent()}%` }}
                        />
                      </div>

                      <div className="space-y-3">
                        {(checkoutMode === "free" ? provisioningStepsFree : provisioningSteps).map((st, idx) => {
                          const isDone = isProvisioningComplete || idx < progressIndex;
                          const isActive = !isProvisioningComplete && idx === progressIndex;
                          
                          return (
                            <div 
                              key={idx} 
                              className={`flex items-center justify-between p-3.5 rounded-xl transition-all ${
                                isActive 
                                  ? "bg-white shadow-xs border border-[#E5E8DF]" 
                                  : "bg-transparent border border-transparent"
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                                  isDone 
                                    ? "bg-[#274236] text-white" 
                                    : isActive 
                                      ? "bg-emerald-50 text-[#274236] border border-[#C8DCD0]" 
                                      : "bg-slate-100 text-slate-400 border border-slate-200/40"
                                }`}>
                                  {isDone ? (
                                    <Check className="w-3.5 h-3.5" />
                                  ) : isActive ? (
                                    <span className="relative flex h-2 w-2">
                                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#274236] opacity-75"></span>
                                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#274236]"></span>
                                    </span>
                                  ) : (
                                    <span className="text-[11px] font-bold">{idx + 1}</span>
                                  )}
                                </div>
                                <span className={`text-[13.5px] font-semibold ${
                                  isDone ? "text-slate-900" : isActive ? "text-[#274236]" : "text-slate-400"
                                }`}>
                                  {st}
                                </span>
                              </div>
                              <span className={`text-[11px] font-bold px-2 py-0.5 rounded ${
                                isDone 
                                  ? "bg-emerald-55/60 text-emerald-800" 
                                  : isActive 
                                    ? "bg-[#274236]/5 text-[#274236] animate-pulse" 
                                    : "bg-slate-100 text-slate-400"
                              }`}>
                                {isDone ? "완료" : isActive ? "진행 중" : "대기"}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {isProvisioningComplete ? (
                      <div className="flex flex-col items-center gap-3 pt-4">
                        <button 
                          onClick={() => {
                            setIsProvisioning(false);
                            onClose();
                            window.location.href = "/experience";
                          }}
                          className="px-8 py-3.5 bg-[#274236] hover:bg-[#1C3027] text-white font-bold rounded-xl transition-all shadow-md text-[14.5px] flex items-center justify-center gap-2 cursor-pointer"
                        >
                          상담원/관리자 페이지로 이동
                        </button>
                      </div>
                    ) : (
                      <div className="bg-amber-50/60 border border-amber-100 rounded-xl p-4 text-center max-w-[620px] mx-auto">
                        <p className="text-[12.5px] text-amber-800 font-semibold break-keep leading-relaxed">
                          * 생성 프로세스가 안전하게 진행되고 있습니다. 잠시만 기다려주세요.
                        </p>
                      </div>
                    )}
                  </div>
                ) : (
                  // Checkout Input/Payment screen itself
                  <div className="space-y-6">
                    {/* Header with back button */}
                    <div className="flex items-start gap-3">
                      <button 
                        onClick={() => setCheckoutMode?.("settings")}
                        className="p-1.5 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-700 transition-colors cursor-pointer mt-0.5"
                        title="이전으로"
                      >
                        <ArrowLeft className="w-5 h-5" />
                      </button>
                      <div className="text-left">
                        <h2 className="text-[20px] font-semibold text-slate-950 tracking-tight">구독 플랜 관리</h2>
                        <p className="text-[13.5px] text-slate-600 mt-1 leading-relaxed font-normal">
                          선택한 상담 솔루션과 결제 정보를 확인한 뒤 구독을 진행합니다.
                        </p>
                      </div>
                    </div>

                    {/* Section 1: 선택한 플랜 */}
                    <div className="space-y-2 text-left">
                      <h3 className="text-[13px] font-semibold text-slate-500 tracking-wider uppercase">1. 선택한 플랜</h3>
                      <div className="bg-[#FAFBF9] border border-[#E5E8DF] rounded-[16px] p-5 shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div className="space-y-1.5 max-w-[80%]">
                          <div className="flex items-center gap-2">
                            <span className="text-[11px] font-medium text-[#274236] bg-[#EEF2EB] px-2 py-0.5 rounded-md border border-[#D5DCD0]/40">선택한 플랜</span>
                            <h4 className="text-[15px] font-semibold text-slate-900 leading-tight">
                              {checkoutMode === "subscribed" ? "실시간 채팅 솔루션" : "게시판형 채팅 솔루션"}
                            </h4>
                          </div>
                          <p className="text-[13.5px] text-slate-600 leading-relaxed break-keep font-normal">
                            {checkoutMode === "subscribed" 
                              ? "고객과 상담원이 실시간으로 대화하며 상담 이력과 고객 정보를 함께 관리하는 솔루션입니다."
                              : "채팅처럼 문의를 남기고 답변은 같은 문의창에서 확인하는 문의 접수형 솔루션입니다."}
                          </p>
                        </div>
                        <div className="text-left md:text-right shrink-0">
                          <div className="text-[18px] font-semibold text-slate-900">
                            {checkoutMode === "subscribed" ? "190,000원" : "무료 (0원)"}
                          </div>
                          <span className="text-[12px] text-slate-500 font-normal">{checkoutMode === "subscribed" ? "/ 월" : "/ 제한없음"}</span>
                        </div>
                      </div>
                    </div>

                    {/* Section 2: 회사 정보 확인 */}
                    <div className="space-y-3 text-left">
                      <h3 className="text-[13px] font-semibold text-slate-500 tracking-wider uppercase">2. 회사 정보 확인</h3>
                      <div className="border border-slate-200 bg-slate-50/40 rounded-[16px] p-5 space-y-4 shadow-2xs">
                        <p className="text-[13.5px] text-slate-600 font-normal break-keep">
                          회사 정보를 검토하고 알맞은 독립 상담 환경을 매핑할 수 있도록 입력해주세요.
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="sm:col-span-2">
                            <label className="block text-[12px] font-semibold text-slate-700 mb-1.5">회사명 <span className="text-red-500">*</span></label>
                            <input 
                              type="text" 
                              value={companyName}
                              onChange={(e) => setCompanyName(e.target.value)}
                              placeholder="예: 구글 코리아"
                              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#274236] transition-shadow text-[13.5px] font-normal" 
                            />
                          </div>
                          <div>
                            <label className="block text-[12px] font-semibold text-slate-700 mb-1.5">담당자명 <span className="text-red-500">*</span></label>
                            <input 
                              type="text" 
                              value={managerName}
                              onChange={(e) => setManagerName(e.target.value)}
                              placeholder="예: 홍길동"
                              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#274236] transition-shadow text-[13.5px] font-normal" 
                            />
                          </div>
                          <div>
                            <label className="block text-[12px] font-semibold text-slate-700 mb-1.5">이메일 <span className="text-red-500">*</span></label>
                            <input 
                              type="email" 
                              value={emailAddress}
                              onChange={(e) => setEmailAddress(e.target.value)}
                              placeholder="hello@company.com"
                              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#274236] transition-shadow text-[13.5px] font-normal" 
                            />
                          </div>
                          <div>
                            <label className="block text-[12px] font-semibold text-slate-700 mb-1.5">연락처 <span className="text-red-500">*</span></label>
                            <input 
                              type="text" 
                              value={phoneNumber}
                              onChange={(e) => setPhoneNumber(e.target.value)}
                              placeholder="010-0000-0000"
                              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#274236] transition-shadow text-[13.5px] font-normal" 
                            />
                          </div>
                          <div>
                            <label className="block text-[12px] font-semibold text-slate-700 mb-1.5">설치할 사이트 URL <span className="text-slate-500 font-normal ml-0.5">(선택)</span></label>
                            <input 
                              type="text" 
                              value={websiteUrl}
                              onChange={(e) => setWebsiteUrl(e.target.value)}
                              placeholder="https://www.example.com"
                              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#274236] transition-shadow text-[13.5px] font-normal" 
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Section 3: 결제수단 선택 (Only if subscribed) */}
                    {checkoutMode === "subscribed" && (
                      <div className="space-y-3 text-left">
                        <h3 className="text-[13px] font-semibold text-slate-500 tracking-wider uppercase">3. 결제수단 선택</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {/* Option 1: Card */}
                          <div 
                            onClick={() => setPaymentMethod("card")}
                            className={`p-4 border rounded-[14px] cursor-pointer transition-all flex items-center justify-between ${
                              paymentMethod === "card"
                                ? "border-[#274236] bg-[#274236]/[0.02] shadow-2xs"
                                : "border-slate-200 bg-white hover:border-slate-300"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <span className="shrink-0 text-xl">💳</span>
                              <div className="text-left">
                                <span className="block text-[14px] font-semibold text-slate-900">카드 결제</span>
                                <span className="block text-[11.5px] text-slate-500 font-normal mt-0.5">VISA · MasterCard · 국내카드</span>
                              </div>
                            </div>
                            <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                              paymentMethod === "card" ? "border-[#274236] bg-[#274236]" : "border-slate-300 bg-white"
                            }`}>
                              {paymentMethod === "card" && <Check className="w-2.5 h-2.5 text-white stroke-[3.5]" />}
                            </div>
                          </div>

                          {/* Option 2: Easypay */}
                          <div 
                            onClick={() => setPaymentMethod("easypay")}
                            className={`p-4 border rounded-[14px] cursor-pointer transition-all flex items-center justify-between ${
                              paymentMethod === "easypay"
                                ? "border-[#274236] bg-[#274236]/[0.02] shadow-2xs"
                                : "border-slate-200 bg-white hover:border-slate-300"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <span className="shrink-0 text-xl">📱</span>
                              <div className="text-left">
                                <span className="block text-[14px] font-semibold text-slate-900">간편결제</span>
                                <span className="block text-[11.5px] text-slate-500 font-normal mt-0.5">카카오페이 또는 간편결제</span>
                              </div>
                            </div>
                            <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                              paymentMethod === "easypay" ? "border-[#274236] bg-[#274236]" : "border-slate-300 bg-white"
                            }`}>
                              {paymentMethod === "easypay" && <Check className="w-2.5 h-2.5 text-white stroke-[3.5]" />}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Section 4: 결제 요약 */}
                    {checkoutMode === "subscribed" && (
                      <div className="space-y-3 text-left">
                        <h3 className="text-[13px] font-semibold text-slate-500 tracking-wider uppercase">4. 결제 요약</h3>
                        <div className="bg-slate-50 border border-slate-200/60 rounded-[14px] p-4.5 flex justify-between items-center text-xs font-sans">
                          <div className="text-left">
                            <span className="block text-[13.5px] font-semibold text-slate-900">실시간 채팅 솔루션 구독형 플랜</span>
                            <span className="block text-[11.5px] text-slate-500 font-normal mt-0.5">결제 후 상담 환경 준비가 시작됩니다.</span>
                          </div>
                          <div className="text-right">
                            <span className="text-[16px] font-semibold text-[#274236]">190,000원</span>
                            <span className="text-[11px] text-slate-500 font-normal ml-0.5">/ 월</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Section 5: 하단 버튼 */}
                    <div className="pt-4 border-t border-slate-100 flex justify-end gap-3 text-xs font-semibold font-sans">
                      <button 
                        onClick={() => setCheckoutMode?.("settings")}
                        className="px-5 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-colors cursor-pointer text-[13.5px] font-medium"
                      >
                        취소
                      </button>
                      <button 
                        onClick={handleProceedCheckout}
                        className="px-6 py-3 bg-[#274236] hover:bg-[#1C3027] text-white rounded-xl transition-all shadow-xs text-[13.5px] font-medium cursor-pointer"
                      >
                        {checkoutMode === "subscribed" ? "구독 결제 진행" : "무료로 시작하기"}
                      </button>
                    </div>
                  </div>
                )
              ) : (
                // --- Standard Management Screen ---
                <>
                  {/* Heading / Header */}
                  <div className="text-left">
                    <h2 className="text-[20px] font-semibold text-slate-950 tracking-tight">구독 플랜 관리</h2>
                    <p className="text-[13.5px] text-slate-600 mt-1 leading-relaxed font-normal">GrowTalk 서비스의 라이센스 변경 및 결제 세부 정보를 점검합니다.</p>
                  </div>

                  {/* Section 1: 현재 플랜 */}
                  <div className="bg-[#FAFBF9] border border-[#E5E8DF] rounded-[16px] p-5 shadow-xs text-left">
                    <div className="flex justify-between items-start">
                      <span className="text-[11.5px] font-medium text-[#274236] bg-[#EEF2EB] px-2.5 py-0.5 rounded-md border border-[#D5DCD0]/40">현재 이용 중</span>
                    </div>
                    <div className="mt-3 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                      <div>
                        <h4 className="text-[16px] font-semibold text-slate-900 leading-snug">
                          {activePlanLabel}
                        </h4>
                        <p className="text-[13.5px] text-slate-600 mt-1 font-normal">
                          솔루션 분류: <span className="text-slate-800 font-medium">{activePlanType}</span>
                        </p>
                      </div>
                      <div className="text-left sm:text-right">
                        <span className="text-[18px] font-semibold text-slate-900">
                          {currentPlan === "subscribed" ? "190,000원" : "0원"}
                        </span>
                        <span className="text-[13px] text-slate-500 font-normal ml-0.5">/ 월</span>
                      </div>
                    </div>
                    <div className="h-px bg-slate-200/50 my-3.5" />
                    <p className="text-[13.5px] text-slate-600 leading-relaxed font-normal">
                      현재 이용 중인 상담 솔루션과 구독 상태를 확인할 수 있습니다.
                    </p>
                  </div>

                  {/* Section 2: 플랜 변경 */}
                  <div className="space-y-2.5 text-left">
                    <h3 className="text-[13px] font-semibold text-slate-500 tracking-wider uppercase mb-1">이용 가능 플랜 목록</h3>
                    
                    {/* Plan Card 1 */}
                    <div className={`p-5 md:p-6 bg-white border border-slate-200 rounded-[16px] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 transition-all hover:border-slate-300 hover:shadow-2xs ${
                      currentPlan === "free" 
                        ? "border-[#274236] bg-[#274236]/[0.01]" 
                        : ""
                    }`}>
                      <div className="space-y-1 max-w-[75%]">
                        <div className="flex items-center gap-2">
                          <h4 className="text-[15px] font-semibold text-slate-900">게시판형 채팅 솔루션</h4>
                          <span className="text-[11.5px] font-medium text-slate-600 bg-slate-100/90 px-2 py-0.5 rounded-md border border-slate-200/40">무료</span>
                        </div>
                        <p className="text-[13.5px] text-slate-600 leading-relaxed font-normal">
                          채팅처럼 문의를 남기고 답변은 같은 문의창에서 확인하는 문의 접수형 솔루션입니다.
                        </p>
                      </div>
                      <div className="shrink-0">
                        {currentPlan === "free" ? (
                          <span className="w-[146px] h-10 bg-[#EEF2EB] border border-[#D5DCD0]/40 text-[#274236] font-medium text-[13px] rounded-[10px] inline-flex items-center justify-center gap-1.5 whitespace-nowrap">
                            <Check className="w-4 h-4 stroke-[2.5]" />
                            이용하는 중
                          </span>
                        ) : (
                          <button
                            onClick={() => setCheckoutMode?.("free")}
                            className="w-[146px] h-10 bg-white hover:bg-slate-50 rounded-[10px] border border-slate-300 text-[13px] font-medium text-slate-705 inline-flex items-center justify-center transition-colors shadow-2xs cursor-pointer whitespace-nowrap"
                          >
                            무료 플랜으로 변경
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Plan Card 2 */}
                    <div className={`p-5 md:p-6 bg-white border border-slate-200 rounded-[16px] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 transition-all hover:border-slate-300 hover:shadow-2xs ${
                      currentPlan === "subscribed" 
                        ? "border-[#274236] bg-[#274236]/[0.01]" 
                        : ""
                    }`}>
                      <div className="space-y-1 max-w-[75%]">
                        <div className="flex items-center gap-2">
                          <h4 className="text-[15px] font-semibold text-slate-900">실시간 채팅 솔루션</h4>
                          <span className="text-[11.5px] font-medium text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-100/50">가장 인기</span>
                        </div>
                        <p className="text-[13.5px] text-slate-600 leading-relaxed font-normal">
                          고객과 상담원이 실시간으로 대화하며 상담 이력과 고객 정보를 함께 관리하는 솔루션입니다.
                        </p>
                      </div>
                      <div className="shrink-0">
                        {currentPlan === "subscribed" ? (
                          <span className="w-[146px] h-10 bg-[#EEF2EB] border border-[#D5DCD0]/40 text-[#274236] font-medium text-[13px] rounded-[10px] inline-flex items-center justify-center gap-1.5 whitespace-nowrap">
                            <Check className="w-4 h-4 stroke-[2.5]" />
                            구독 사용 중
                          </span>
                        ) : (
                          <button
                            onClick={() => setCheckoutMode?.("subscribed")}
                            className="w-[146px] h-10 bg-[#274236] hover:bg-[#1C3027] text-white text-[13px] font-medium rounded-[10px] inline-flex items-center justify-center transition-colors shadow-2xs cursor-pointer whitespace-nowrap"
                          >
                            구독 신청하기 / 플랜 변경
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Plan Card 3 */}
                    <div className="p-5 md:p-6 bg-white border border-slate-200 rounded-[16px] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:border-slate-300 hover:shadow-2xs transition-all">
                      <div className="space-y-1 max-w-[75%]">
                        <div className="flex items-center gap-2">
                          <h4 className="text-[15px] font-semibold text-slate-900">기업 맞춤 도입 상담</h4>
                          <span className="text-[11.5px] font-medium text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-md border border-blue-100/50">엔터프라이즈</span>
                        </div>
                        <p className="text-[13.5px] text-slate-600 leading-relaxed font-normal">
                          상담원 수, 운영 방식, 권한 구조, 구축 범위에 맞춘 개별 견적 및 전문 기술 지원이 가능합니다.
                        </p>
                      </div>
                      <div className="shrink-0">
                        <button
                          onClick={() => {
                            onClose();
                            const floatingEl = document.getElementById("growtalk-floating-btn");
                            if (floatingEl) floatingEl.click();
                          }}
                          className="w-[146px] h-10 bg-slate-900 hover:bg-slate-800 text-white text-[13px] font-medium rounded-[10px] inline-flex items-center justify-center transition-all shadow-2xs cursor-pointer whitespace-nowrap"
                        >
                          도입 문의하기
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Section 3: 결제 내역 */}
                  <div className="space-y-3 pt-4 border-t border-slate-100 text-left">
                    <h3 className="text-[13px] font-semibold text-slate-500 tracking-wider uppercase mb-1 flex items-center gap-2">
                      <Receipt className="w-4 h-4 text-slate-450" />
                      결제 내역
                    </h3>

                    {currentPlan === "free" ? (
                      <div className="bg-slate-50/50 rounded-xl p-5 text-center border border-slate-200/50">
                        <p className="text-[14px] font-medium text-slate-705">결제 내역이 없습니다.</p>
                        <p className="text-[13px] text-slate-500 mt-1 font-normal">아직 결제된 내역이 없습니다.</p>
                      </div>
                    ) : (
                      <div className="border border-slate-200 rounded-[12px] overflow-hidden bg-white shadow-xs">
                        <div className="divide-y divide-slate-100 text-[13.5px]">
                          <div className="p-3.5 flex justify-between items-center bg-slate-50/50">
                            <div className="flex items-center gap-3">
                              <span className="font-medium text-slate-500">2026.06.01</span>
                              <span className="font-medium text-slate-805">실시간 채팅 솔루션 구독형 플랜</span>
                            </div>
                            <span className="px-2.5 py-0.5 text-[11.5px] font-medium text-emerald-700 bg-emerald-50 rounded-md border border-emerald-110/60">결제 완료</span>
                          </div>
                          <div className="p-3.5 flex justify-between items-center bg-white">
                            <div className="flex items-center gap-3">
                              <span className="font-medium text-slate-500">2026.05.01</span>
                              <span className="font-medium text-slate-805">실시간 채팅 솔루션 구독형 플랜</span>
                            </div>
                            <span className="px-2.5 py-0.5 text-[11.5px] font-medium text-emerald-700 bg-emerald-50 rounded-md border border-emerald-110/60">결제 완료</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Section 4: 구독 해지 */}
                  {currentPlan === "subscribed" && (
                    <div className="pt-5 border-t border-red-100 mt-2 text-left">
                      <div className="p-4.5 border border-red-100 bg-red-50/10 rounded-[16px] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div className="max-w-[75%]">
                          <h4 className="text-[15px] font-semibold text-red-950">구독 해지</h4>
                          <p className="text-[13.5px] text-slate-600 leading-relaxed mt-1 font-normal">
                            구독을 해지하면 다음 결제일부터 자동 결제가 중단됩니다.
                            해지 후에도 남은 이용 기간 동안은 서비스를 계속 사용할 수 있습니다.
                          </p>
                        </div>
                        <div className="shrink-0">
                          <button
                            onClick={() => setShowCancelConfirm(true)}
                            className="w-[146px] h-10 bg-white hover:bg-red-50 text-red-650 border border-red-200 hover:border-red-300 rounded-[10px] text-[13px] font-medium inline-flex items-center justify-center transition-all shadow-2xs whitespace-nowrap cursor-pointer"
                            id="plan-cancel-trigger-btn"
                          >
                            구독 해지하기
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )
            ) : (
              // Active Tab: Account Info Tab
              <>
                <div className="text-left">
                  <h2 className="text-[20px] font-semibold text-slate-950 tracking-tight">계정 설정 안내</h2>
                  <p className="text-[13.5px] text-slate-600 mt-1 leading-relaxed font-normal">회원님의 기본 인증 상태와 가입 정보를 알려드립니다.</p>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-[16px] p-5 space-y-5 shadow-xs text-left">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <span className="block text-[11.5px] font-semibold text-slate-500 uppercase tracking-wider">이메일 주소</span>
                      <span className="block text-slate-900 font-medium mt-1 text-[14.5px]">user@example.com</span>
                    </div>
                    <div>
                      <span className="block text-[11.5px] font-semibold text-slate-500 uppercase tracking-wider">가입/로그인 방식</span>
                      <span className="block text-slate-800 font-medium mt-1 text-[14.5px]">IAM 연동 계정 (Google ID 포함)</span>
                    </div>
                  </div>

                  <div className="h-px bg-slate-200/80" />

                  <div className="space-y-1">
                    <span className="block text-[11.5px] font-semibold text-slate-500 uppercase tracking-wider">안내사항</span>
                    <p className="text-[13.5px] text-slate-600 leading-relaxed font-normal">
                      비밀번호 변경, 계정 탈퇴, 2단계 인증 등과 관련된 세부 보안 설정은 연동된 외부 자격 IAM 시스템에서 안전하게 일괄적으로 관리됩니다.
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-left">
                  <div className="max-w-[75%]">
                    <h4 className="font-semibold text-[15px] text-slate-900">IAM 계정 관리 포털</h4>
                    <p className="text-[13px] text-slate-500 mt-1 leading-relaxed font-normal">
                      연동된 사내 통합 인증(SSO) 및 소셜 계정 정책에 따라 자격 식별을 추가 조정하고 최신으로 동기화합니다.
                    </p>
                  </div>
                  <div className="shrink-0">
                    <button
                      onClick={() => {
                        const redirectUrl = encodeURIComponent(window.location.href);
                        window.location.href = `https://iam.drvalue.co.kr?redirect_uri=${redirectUrl}`;
                      }}
                      className="w-[176px] h-10 bg-[#274236] hover:bg-[#1C3027] text-white rounded-[10px] text-[13px] font-medium transition-all shadow-2xs flex items-center justify-center gap-1.5 whitespace-nowrap cursor-pointer"
                      id="iam-portal-btn"
                    >
                      IAM 계정 관리로 이동
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </motion.div>

      {/* Subscription Cancellation Secondary Confirmation Modal */}
      <AnimatePresence>
        {showCancelConfirm && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowCancelConfirm(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-xs cursor-pointer"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative bg-white rounded-2xl shadow-xl w-full max-w-md p-6 text-left border border-slate-200 z-10"
              id="plan-cancel-confirm-dialog"
            >
              <h3 className="text-base font-semibold text-slate-950 tracking-tight">구독을 해지하시겠어요?</h3>
              <p className="text-[13.5px] text-slate-600 leading-relaxed mt-2.5 font-normal animate-fade-in">
                해지 후 다음 결제일부터 자동 결제가 중단됩니다.
                남은 이용 기간 동안은 기존 기능(실시간 채팅 솔루션 등)을 제한 없이 사용할 수 있으니 안심하셔도 됩니다.
              </p>

              <div className="mt-6 flex justify-end gap-2 text-xs font-semibold font-sans">
                <button
                  onClick={() => setShowCancelConfirm(false)}
                  className="w-20 h-10 bg-slate-105 hover:bg-slate-200 text-slate-700 rounded-[10px] text-[13px] font-medium inline-flex items-center justify-center transition-colors cursor-pointer"
                  id="cancel-dismiss-btn"
                >
                  취소
                </button>
                <button
                  onClick={() => {
                    setCurrentPlan("free");
                    setShowCancelConfirm(false);
                  }}
                  className="w-24 h-10 bg-red-600 hover:bg-red-700 text-white rounded-[10px] text-[13px] font-medium inline-flex items-center justify-center transition-all shadow-2xs cursor-pointer"
                  id="cancel-confirm-btn"
                >
                  구독 해지
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
