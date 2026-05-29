import React from 'react';
import { Link } from 'react-router-dom';
import { FlowContext } from '../components/FlowModals';
import { 
  MessageSquare, 
  HelpCircle,
  Inbox,
  CheckSquare,
  RefreshCw,
  Clock,
  MessageCircle,
  Users,
  Activity,
  FileBox,
  Share2,
  UserCheck,
  ChevronRight,
  MonitorSmartphone,
  Paperclip,
  CheckCircle2
} from 'lucide-react';
import { motion } from 'motion/react';

export const FeaturesPage: React.FC = () => {
  const { startDemoFlow } = React.useContext(FlowContext);

  return (
    <main className="pt-32 pb-20 bg-white">
      {/* Hero Section */}
      <section className="px-6 lg:px-8 text-center max-w-4xl mx-auto mb-20 md:mb-32">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 mb-6 leading-tight">
          상담 방식에 맞는<br />기능을 확인해보세요
        </h1>
        <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
          게시판형 문의 접수부터 실시간 채팅 상담까지<br />운영 방식에 맞는 상담 기능을 제공합니다.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link 
            to="/pricing" 
            className="w-full sm:w-auto px-8 py-3.5 rounded-full text-gray-900 font-semibold border border-gray-200 hover:bg-gray-50 transition-colors"
          >
            요금제 보기
          </Link>
          <button 
            onClick={() => startDemoFlow()}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#274236] text-white font-semibold hover:bg-[#1C3027] transition-colors shadow-sm"
          >
            실시간 상담 체험
          </button>
        </div>
      </section>

      {/* Section 1: Two Solutions */}
      <section className="max-w-[1200px] mx-auto px-6 lg:px-8 mb-32">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-4">두 가지 상담 방식으로 운영할 수 있습니다</h2>
          <p className="text-gray-600">
            GrowTalk은 문의를 접수하고 답변하는 게시판형 채팅 방식과,<br className="hidden sm:block"/>
            고객과 상담원이 실시간으로 대화하는 실시간 채팅 방식을 제공합니다.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Board-style Card */}
          <div className="bg-[#FAFBF9] border border-[#E5E8DF] rounded-3xl p-8 lg:p-12 hover:shadow-md transition-shadow group relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10 blur-xl transform translate-x-1/4 -translate-y-1/4 group-hover:opacity-20 transition-opacity">
              <div className="w-64 h-64 bg-[#4F5E4D] rounded-full"></div>
            </div>
            <div className="relative z-10">
              <div className="w-14 h-14 bg-[#F4F5F0] rounded-2xl flex items-center justify-center mb-6 border border-[#E5E8DF]">
                <Inbox className="w-7 h-7 text-[#4F5E4D]" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">게시판형 채팅 솔루션</h3>
              <p className="text-gray-600 mb-8 leading-relaxed h-[80px]">
                고객이 채팅처럼 문의를 남기고, 상담자는 문의 단위로 확인한 뒤 
                답변을 등록하는 문의 접수형 상담 방식입니다.
              </p>
              <ul className="space-y-3">
                {['플로팅 문의 위젯', '문의 작성', '문의 목록 확인', '답변 등록 및 확인', '재문의 연결', '문의 이력 관리'].map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm font-medium text-gray-800">
                    <CheckCircle2 className="w-5 h-5 text-[#8A9A86]" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Real-time Card */}
          <div className="bg-emerald-50 border border-emerald-100 rounded-3xl p-8 lg:p-12 hover:shadow-md transition-shadow group relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-20 blur-xl transform translate-x-1/4 -translate-y-1/4 group-hover:opacity-30 transition-opacity">
              <div className="w-64 h-64 bg-emerald-400 rounded-full"></div>
            </div>
            <div className="relative z-10">
              <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center mb-6 border border-emerald-200">
                <MessageSquare className="w-7 h-7 text-emerald-700" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">실시간 채팅 솔루션</h3>
              <p className="text-gray-600 mb-8 leading-relaxed h-[80px]">
                고객과 상담원이 실시간으로 대화하며, 상담 목록, 고객 정보, 
                이전 상담 이력을 함께 관리하는 실시간 상담 방식입니다.
              </p>
              <ul className="space-y-3">
                {['실시간 메시지 응대', '상담 목록 관리', '상담 상태 관리', '고객 정보 확인', '이전 상담 이력 확인', '내부 공유'].map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm font-medium text-gray-800">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Agent Screen Structure */}
      <section className="bg-gray-50/50 py-24 mb-32 border-y border-gray-100">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-4">같은 구조에서 상담 방식만 다르게 운영합니다</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              상담원 화면은 왼쪽 목록, 가운데 상담 내용, 오른쪽 정보 패널 구조를 기반으로 운영되며, 
              게시판형과 실시간 채팅의 핵심은 <strong>가운데 상담 내용 영역의 차이</strong>입니다.
            </p>
          </div>

          {/* Simple Visual Represenation */}
          <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12 max-w-5xl mx-auto">
            
            {/* Board Structure Concept */}
            <div className="flex-1 w-full bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
              <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4 flex items-center justify-center gap-2">
                <Inbox className="w-4 h-4" /> 게시판형 화면 구조
              </h4>
              <div className="flex gap-2 h-[220px]">
                <div className="w-[20%] bg-gray-50 rounded-lg border border-gray-100 flex flex-col p-2 gap-2">
                  <div className="w-full h-2 bg-gray-200 rounded"></div>
                  <div className="w-3/4 h-2 bg-gray-200 rounded"></div>
                  <div className="w-full h-2 bg-gray-200 rounded mt-2"></div>
                </div>
                <div className="flex-1 bg-[#FAFBF9] rounded-lg border border-[#E5E8DF] p-3 flex flex-col gap-3 relative">
                  <div className="text-[0.6rem] text-gray-400 font-bold">1. 문의 상세 (게시글형)</div>
                  <div className="bg-white rounded p-2 border border-gray-100 h-1/2">
                    <div className="w-1/2 h-2 bg-gray-300 rounded mb-2"></div>
                    <div className="w-full h-1.5 bg-gray-100 rounded mb-1"></div>
                    <div className="w-4/5 h-1.5 bg-gray-100 rounded"></div>
                  </div>
                  <div className="text-[0.6rem] text-gray-400 font-bold">2. 답변 영역 (게시글형)</div>
                  <div className="bg-[#F4F5F0] rounded p-2 border border-[#E5E8DF] flex-1">
                    <div className="w-full h-1.5 bg-[#4F5E4D]/20 rounded mb-1"></div>
                    <div className="w-3/4 h-1.5 bg-[#4F5E4D]/20 rounded"></div>
                  </div>
                </div>
                <div className="w-[25%] bg-gray-50 rounded-lg border border-gray-100 flex flex-col p-2 gap-3">
                  <div className="w-1/2 h-2 bg-gray-300 rounded"></div>
                  <div className="w-full h-12 bg-white border border-gray-100 rounded"></div>
                </div>
              </div>
            </div>

            <div className="hidden lg:block w-px h-24 bg-gray-200"></div>

            {/* Live Chat Structure Concept */}
            <div className="flex-1 w-full bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
              <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4 flex items-center justify-center gap-2">
                <MessageCircle className="w-4 h-4" /> 실시간 화면 구조
              </h4>
              <div className="flex gap-2 h-[220px]">
                <div className="w-[20%] bg-gray-50 rounded-lg border border-gray-100 flex flex-col p-2 gap-2">
                  <div className="w-full h-2 bg-gray-200 rounded"></div>
                  <div className="w-3/4 h-2 bg-gray-200 rounded"></div>
                  <div className="w-full h-2 bg-gray-200 rounded mt-2"></div>
                </div>
                <div className="flex-1 bg-slate-50 rounded-lg border border-emerald-100 p-3 flex flex-col gap-2 relative">
                  <div className="text-[0.6rem] text-gray-400 font-bold text-center">대화 내역 (버블형)</div>
                  <div className="flex-1 flex flex-col gap-2 p-1 overflow-hidden">
                    <div className="self-end w-2/3 h-6 bg-emerald-100 rounded-lg rounded-tr-none"></div>
                    <div className="self-start w-3/4 h-10 bg-white border border-gray-200 rounded-lg rounded-tl-none"></div>
                    <div className="self-end w-1/2 h-6 bg-emerald-100 rounded-lg rounded-tr-none"></div>
                  </div>
                  <div className="h-8 bg-white border border-gray-200 rounded mt-auto flex items-center px-2">
                    <div className="w-20 h-1.5 bg-gray-100 rounded"></div>
                  </div>
                </div>
                <div className="w-[25%] bg-gray-50 rounded-lg border border-gray-100 flex flex-col p-2 gap-3">
                  <div className="w-1/2 h-2 bg-gray-300 rounded"></div>
                  <div className="w-full h-12 bg-white border border-gray-100 rounded"></div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Section 3: Board Features */}
      <section className="max-w-[1200px] mx-auto px-6 lg:px-8 mb-32">
        <div className="mb-12 border-b border-gray-200 pb-6 flex items-center gap-3">
          <Inbox className="w-8 h-8 text-[#4F5E4D]" />
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">게시판형 채팅 솔루션 기능</h2>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: "1. 플로팅 문의 위젯",
              desc: "고객사 홈페이지 우측 하단에서 문의를 남길 수 있는 고객용 문의창입니다.",
              icon: <MessageSquare className="w-5 h-5" />
            },
            {
              title: "2. 문의 작성",
              desc: "고객은 문의 유형을 선택하고 내용을 입력해 문의를 등록할 수 있습니다.",
              icon: <FileBox className="w-5 h-5" />
            },
            {
              title: "3. 문의 목록",
              desc: "고객은 작성한 문의와 답변 상태를 문의 목록에서 확인할 수 있습니다.",
              icon: <Inbox className="w-5 h-5" />
            },
            {
              title: "4. 문의 상세",
              desc: "문의 내용과 상담자의 답변을 같은 문의 상세 화면에서 확인할 수 있습니다.",
              icon: <MonitorSmartphone className="w-5 h-5" />
            },
            {
              title: "5. 답변 등록",
              desc: "상담자는 접수된 문의를 확인하고 답변을 등록할 수 있습니다.",
              icon: <CheckSquare className="w-5 h-5" />
            },
            {
              title: "6. 재문의 연결",
              desc: "추가 문의가 필요한 경우 이전 문의와 연결된 재문의로 관리할 수 있습니다.",
              icon: <RefreshCw className="w-5 h-5" />
            }
          ].map((item, idx) => (
            <div key={idx} className="bg-[#FAFBF9] border border-[#E5E8DF] rounded-2xl p-6 hover:shadow-sm transition-shadow">
              <div className="w-10 h-10 bg-white border border-[#E5E8DF] rounded-xl flex items-center justify-center text-[#4F5E4D] mb-4">
                {item.icon}
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 4: Live Chat Features */}
      <section className="max-w-[1200px] mx-auto px-6 lg:px-8 mb-32">
        <div className="mb-12 border-b border-gray-200 pb-6 flex items-center gap-3">
          <MessageCircle className="w-8 h-8 text-emerald-600" />
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">실시간 채팅 솔루션 기능</h2>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: "1. 실시간 메시지 응대",
              desc: "고객과 상담원이 실시간으로 메시지를 주고받을 수 있습니다.",
              icon: <MessageCircle className="w-5 h-5" />
            },
            {
              title: "2. 상담 목록 관리",
              desc: "대기중, 진행중, 완료 등 상담 상태별로 상담 목록을 확인할 수 있습니다.",
              icon: <Inbox className="w-5 h-5" />
            },
            {
              title: "3. 상담 상태 관리",
              desc: "상담 진행 상황을 상태별로 구분해 운영할 수 있습니다.",
              icon: <Activity className="w-5 h-5" />
            },
            {
              title: "4. 고객 정보 확인",
              desc: "상담 중 고객 정보와 상담 정보를 함께 확인할 수 있습니다.",
              icon: <UserCheck className="w-5 h-5" />
            },
            {
              title: "5. 이전 상담 이력",
              desc: "고객의 이전 상담 이력을 확인해 상담 맥락을 이어갈 수 있습니다.",
              icon: <Clock className="w-5 h-5" />
            },
            {
              title: "6. 첨부자료 모아보기",
              desc: "상담 중 주고받은 사진, 파일, 링크를 한곳에서 확인할 수 있습니다.",
              icon: <Paperclip className="w-5 h-5" />
            },
            {
              title: "7. 내부 공유",
              desc: "고객 응대와 별도로 상담원 간 내부 공유 메시지를 남길 수 있습니다.",
              icon: <Share2 className="w-5 h-5" />
            },
            {
              title: "8. 상담원 관리",
              desc: "상담원 목록과 담당 상태를 확인할 수 있습니다.",
              icon: <Users className="w-5 h-5" />
            }
          ].map((item, idx) => (
            <div key={idx} className="bg-emerald-50/50 border border-emerald-100/60 rounded-2xl p-6 hover:shadow-sm transition-shadow">
              <div className="w-10 h-10 bg-white border border-emerald-100 rounded-xl flex items-center justify-center text-emerald-600 mb-4">
                {item.icon}
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-[0.85rem] text-gray-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 5: Comparison */}
      <section className="bg-gray-50 py-24 mb-20 border-y border-gray-100">
        <div className="max-w-[1000px] mx-auto px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-center text-gray-900 mb-12">우리 팀에는 어떤 상담 방식이 맞을까요?</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="bg-white border text-center border-gray-200 rounded-3xl p-8 lg:p-10 shadow-sm relative overflow-hidden">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                <Inbox className="w-6 h-6 text-gray-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-6">게시판형 채팅 솔루션</h3>
              <ul className="space-y-4 text-left">
                {[
                  "문의를 남기고 답변을 기다리는 방식", 
                  "간단한 문의 접수와 답변 관리에 적합", 
                  "실시간 응대가 어려운 팀에 적합", 
                  "무료로 시작 가능"
                ].map((text, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#8A9A86] shrink-0 mt-0.5" />
                    <span className="text-gray-700 font-medium">{text}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-white border text-center border-emerald-100 rounded-3xl p-8 lg:p-10 shadow-sm relative overflow-hidden ring-1 ring-emerald-500/10">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                <MessageCircle className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-6">실시간 채팅 솔루션</h3>
              <ul className="space-y-4 text-left">
                {[
                  "고객과 상담원이 실시간으로 대화하는 방식", 
                  "빠른 응대가 필요한 상담 조직에 적합", 
                  "고객 정보와 상담 이력을 함께 확인해야 하는 팀에 적합", 
                  "실시간 상담 체험 또는 구독으로 이용 가능"
                ].map((text, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="text-gray-700 font-medium">{text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="px-6 lg:px-8 py-16 text-center max-w-3xl mx-auto">
        <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-gray-900 mb-6">우리 팀에 맞는 상담 방식을 선택해보세요</h2>
        <p className="text-[1.1rem] text-gray-600 mb-10 leading-relaxed">
          게시판형 문의부터 실시간 상담까지<br />운영 방식에 맞는 기능과 요금제를 확인할 수 있습니다.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link 
            to="/pricing" 
            className="w-full sm:w-auto px-8 py-3.5 rounded-full text-gray-900 font-semibold border border-gray-200 hover:bg-gray-50 transition-colors"
          >
            요금제 보기
          </Link>
          <button 
            onClick={() => startDemoFlow()}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#274236] text-white font-semibold hover:bg-[#1C3027] transition-colors shadow-sm"
          >
            실시간 상담 체험
          </button>
        </div>
      </section>
    </main>
  );
};
