import React from 'react';
import { motion } from 'framer-motion';
import { Check, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { FlowContext } from '../components/FlowModals';

export const PricingPage = () => {
  const { startBoardFlow, startDemoFlow, startEnterpriseFlow, startSubscribeFlow, setIsWidgetOpen } = React.useContext(FlowContext);

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-32 pb-24 px-6 bg-[#f8fafc] min-h-screen">
      <div className="max-w-[1024px] mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-[2.5rem] md:text-[3rem] font-bold tracking-tight text-gray-900 mb-4 font-sans">
            요금제
          </h1>
          <p className="text-[1.1rem] text-gray-500 font-medium break-keep">
            게시판형 문의부터 실시간 채팅 상담까지<br />
            운영 방식에 맞는 플랜을 비교해보세요.
          </p>
        </div>

        {/* Plan Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {/* Board */}
          <div className="bg-white rounded-[1.5rem] p-8 lg:p-10 border border-black/[0.06] shadow-sm flex flex-col hover:shadow-md transition-shadow">
            <div className="mb-8 flex-1">
              <h4 className="text-[1.15rem] font-medium text-gray-900 mb-3">게시판형 채팅 솔루션</h4>
              <div className="text-[2.2rem] font-bold text-gray-900 mb-4 tracking-tight">무료</div>
              <p className="text-gray-600 text-[0.9rem] leading-[1.65] font-medium mb-6 break-keep">
                고객이 채팅처럼 문의를 남기고, 답변은 같은 문의창에서 확인하는 문의 접수형 솔루션입니다.
              </p>
              <ul className="space-y-3 text-[0.9rem] text-gray-600 font-medium">
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>채팅형 문의 접수</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>문의 상태 관리</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>답변 등록 및 확인</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>문의 이력 확인</span>
                </li>
              </ul>
            </div>
            <button 
              onClick={() => startBoardFlow()}
              className="w-full py-3.5 rounded-xl border border-gray-200 bg-white text-gray-900 text-[0.95rem] font-bold hover:bg-gray-50 transition-colors shadow-sm"
            >
              무료로 시작하기
            </button>
          </div>

          {/* Realtime (Recommended) */}
          <div className="bg-gradient-to-b from-[#ECFDF5] via-[#F0FDF4] to-[#FFFFFF] rounded-[1.5rem] p-8 lg:p-10 border border-[#A7F3D0] shadow-[0_4px_20px_-5px_rgba(16,185,129,0.15)] flex flex-col relative overflow-hidden">
            <div className="absolute top-8 right-8 lg:top-10 lg:right-10 bg-[#D1FAE5] text-emerald-700 font-bold text-[0.7rem] py-1 px-3 rounded-full">추천</div>
            <div className="mb-8 flex-1 pr-12">
              <h4 className="text-[1.15rem] font-medium text-gray-900 mb-3">실시간 채팅 솔루션</h4>
              <div className="text-[2.2rem] font-bold text-gray-900 mb-6 tracking-tight leading-[1.2] break-keep">구독형 플랜</div>
              <div className="mb-6">
                <p className="text-gray-600 text-[0.95rem] leading-[1.6] font-medium break-keep mb-2">
                  고객과 상담원이 실시간으로 대화하며,<br />상담 이력과 고객 정보를 함께 관리하는 상담 솔루션입니다.
                </p>
                <p className="text-emerald-700 text-[0.85rem] font-bold tracking-tight">
                  * 실시간 상담 체험 후 구독 신청이 가능합니다.
                </p>
              </div>
              <ul className="space-y-3 text-[0.9rem] text-gray-600 font-medium">
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>실시간 메시지 응대</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>상담 목록 관리</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>고객 정보 확인</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>상담 이력 저장</span>
                </li>
              </ul>
            </div>
            <div className="flex flex-col gap-2.5">
              <button 
                onClick={() => startSubscribeFlow()}
                className="w-full py-3.5 rounded-xl bg-emerald-600 text-white text-[0.95rem] font-bold hover:bg-emerald-700 transition-colors shadow-sm"
              >
                구독 신청하기
              </button>
              <button 
                onClick={() => startDemoFlow()}
                className="w-full py-3.5 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 text-[0.95rem] font-bold hover:bg-emerald-100 transition-colors"
              >
                실시간 상담 체험
              </button>
            </div>
          </div>

          {/* Custom */}
          <div className="bg-white rounded-[1.5rem] p-8 lg:p-10 border border-black/[0.06] shadow-sm flex flex-col hover:shadow-md transition-shadow">
            <div className="mb-8 flex-1">
              <h4 className="text-[1.15rem] font-medium text-gray-900 mb-3">기업 맞춤 도입</h4>
              <div className="text-[2.2rem] font-bold text-gray-900 mb-4 tracking-tight">문의 필요</div>
              <p className="text-gray-600 text-[0.9rem] leading-[1.65] font-medium mb-6 break-keep">
                상담원 수, 운영 방식, 권한 구조, 구축 범위 등 기업 환경에 맞춰 도입 방식을 상담할 수 있습니다.
              </p>
              <ul className="space-y-3 text-[0.9rem] text-gray-600 font-medium">
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>운영 방식 상담</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>권한 설정 검토</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>도입 범위 협의</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>맞춤 적용 가능</span>
                </li>
              </ul>
            </div>
            <button 
              onClick={() => startEnterpriseFlow()}
              className="w-full py-3.5 rounded-xl border border-gray-200 bg-white text-gray-900 text-[0.95rem] font-bold hover:bg-gray-50 transition-colors shadow-sm"
            >
              도입 문의하기
            </button>
          </div>
        </div>

        {/* Custom Introduction Bar */}
        <div className="bg-white rounded-[1.25rem] p-6 lg:p-8 flex flex-col md:flex-row items-center justify-between border border-black/[0.06] shadow-[0_4px_16px_-4px_rgba(0,0,0,0.02)] mb-20 gap-6">
          <div className="text-center md:text-left">
            <h5 className="text-[1.1rem] font-bold text-gray-900 mb-1">기업 맞춤 도입이 필요하신가요?</h5>
            <p className="text-[0.95rem] text-gray-500 font-medium">운영 방식, 권한 구조, 구축 범위까지 맞춤 상담이 가능합니다.</p>
          </div>
          <button 
            onClick={() => startEnterpriseFlow()}
            className="w-full md:w-auto px-6 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 text-[0.95rem] font-bold hover:bg-gray-50 transition-colors shadow-sm shrink-0 whitespace-nowrap"
          >
            도입 문의하기
          </button>
        </div>

        {/* Comparison Tables */}
        <div className="mb-24 space-y-16">
          
          {/* Section 1 */}
          <div>
            <h4 className="text-[1.2rem] font-bold text-gray-900 mb-6 px-2">플랜 핵심 비교</h4>
            <div className="w-full overflow-x-auto rounded-[1rem] border border-gray-200 bg-white shadow-[0_4px_16px_-4px_rgba(0,0,0,0.02)]">
              <table className="w-full min-w-[800px] text-left text-[0.95rem]">
                <thead>
                  <tr className="border-b border-gray-200 bg-[#f8fafc]">
                    <th className="py-5 px-6 font-bold text-gray-700 w-1/4">구분</th>
                    <th className="py-5 px-6 font-bold text-gray-900 w-1/4">게시판형 채팅 솔루션</th>
                    <th className="py-5 px-6 font-bold text-gray-900 w-1/4">실시간 채팅 솔루션</th>
                    <th className="py-5 px-6 font-bold text-gray-900 w-1/4">기업 맞춤 도입</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-gray-600 font-medium">
                  <tr className="hover:bg-gray-50/50 transition-colors">
                    <td className="py-5 px-6 font-semibold text-gray-800 bg-[#fefefe]">도입 방식</td>
                    <td className="py-5 px-6">무료 시작</td>
                    <td className="py-5 px-6 text-emerald-700 font-bold">체험 후 구독도입</td>
                    <td className="py-5 px-6">별도 문의</td>
                  </tr>
                  <tr className="hover:bg-gray-50/50 transition-colors">
                    <td className="py-5 px-6 font-semibold text-gray-800 bg-[#fefefe]">상담 방식</td>
                    <td className="py-5 px-6">문의 등록 후 답변 확인</td>
                    <td className="py-5 px-6">고객과 실시간 대화</td>
                    <td className="py-5 px-6">고객사 운영 방식에 맞춤</td>
                  </tr>
                  <tr className="hover:bg-gray-50/50 transition-colors">
                    <td className="py-5 px-6 font-semibold text-gray-800 bg-[#fefefe]">고객 화면</td>
                    <td className="py-5 px-6">플로팅 문의 위젯</td>
                    <td className="py-5 px-6">실시간 채팅창</td>
                    <td className="py-5 px-6">맞춤 적용</td>
                  </tr>
                  <tr className="hover:bg-gray-50/50 transition-colors">
                    <td className="py-5 px-6 font-semibold text-gray-800 bg-[#fefefe]">관리자 화면</td>
                    <td className="py-5 px-6">문의 목록, 문의 상세, 답변 등록</td>
                    <td className="py-5 px-6">상담 목록, 대화 화면, 고객 정보 패널</td>
                    <td className="py-5 px-6">맞춤 관리자 구성</td>
                  </tr>
                  <tr className="hover:bg-gray-50/50 transition-colors">
                    <td className="py-5 px-6 font-semibold text-gray-800 bg-[#fefefe]">추천 대상</td>
                    <td className="py-5 px-6 text-gray-500 break-keep">간단한 문의 접수와 답변 관리가 필요한 기업</td>
                    <td className="py-5 px-6 text-gray-500 break-keep">빠른 실시간 응대가 필요한 상담 조직</td>
                    <td className="py-5 px-6 text-gray-500 break-keep">상담원 수, 권한, 운영 정책이 복잡한 기업</td>
                  </tr>
                  <tr className="hover:bg-gray-50/50 transition-colors bg-[#f8fafc]/50">
                    <td className="py-5 px-6 font-semibold text-gray-800 bg-[#fefefe]">주요 CTA</td>
                    <td className="py-5 px-6">
                      <span onClick={() => startBoardFlow()} className="inline-flex items-center text-sm font-bold text-gray-900 border-b border-gray-900 hover:text-emerald-600 hover:border-emerald-600 transition-colors cursor-pointer pb-0.5">무료로 시작하기 <ChevronRight className="w-3.5 h-3.5 ml-1" /></span>
                    </td>
                    <td className="py-5 px-6">
                      <span onClick={() => startDemoFlow()} className="inline-flex items-center text-sm font-bold text-emerald-600 border-b border-emerald-600 hover:text-emerald-700 hover:border-emerald-700 transition-colors cursor-pointer pb-0.5">실시간 상담 체험 <ChevronRight className="w-3.5 h-3.5 ml-1" /></span>
                    </td>
                    <td className="py-5 px-6">
                      <span onClick={() => startEnterpriseFlow()} className="inline-flex items-center text-sm font-bold text-gray-900 border-b border-gray-900 hover:text-gray-600 hover:border-gray-600 transition-colors cursor-pointer pb-0.5">도입 문의하기 <ChevronRight className="w-3.5 h-3.5 ml-1" /></span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Section 2 */}
          <div>
            <h4 className="text-[1.2rem] font-bold text-gray-900 mb-6 px-2">상담 운영 기능 비교</h4>
            <div className="w-full overflow-x-auto rounded-[1rem] border border-gray-200 bg-white shadow-[0_4px_16px_-4px_rgba(0,0,0,0.02)]">
              <table className="w-full min-w-[800px] text-left text-[0.95rem]">
                <thead>
                  <tr className="border-b border-gray-200 bg-[#f8fafc]">
                    <th className="py-5 px-6 font-bold text-gray-700 w-1/4">구분</th>
                    <th className="py-5 px-6 font-bold text-gray-900 w-1/4">게시판형 채팅 솔루션</th>
                    <th className="py-5 px-6 font-bold text-gray-900 w-1/4">실시간 채팅 솔루션</th>
                    <th className="py-5 px-6 font-bold text-gray-900 w-1/4">기업 맞춤 도입</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-gray-600 font-medium">
                  <tr className="hover:bg-gray-50/50 transition-colors">
                    <td className="py-5 px-6 font-semibold text-gray-800 bg-[#fefefe]">고객 문의 접수</td>
                    <td className="py-5 px-6">지원</td>
                    <td className="py-5 px-6">지원</td>
                    <td className="py-5 px-6">지원</td>
                  </tr>
                  <tr className="hover:bg-gray-50/50 transition-colors">
                    <td className="py-5 px-6 font-semibold text-gray-800 bg-[#fefefe]">실시간 대화</td>
                    <td className="py-5 px-6 text-gray-400">미지원</td>
                    <td className="py-5 px-6 font-semibold text-emerald-700">지원</td>
                    <td className="py-5 px-6">지원</td>
                  </tr>
                  <tr className="hover:bg-gray-50/50 transition-colors">
                    <td className="py-5 px-6 font-semibold text-gray-800 bg-[#fefefe]">답변 등록</td>
                    <td className="py-5 px-6">지원</td>
                    <td className="py-5 px-6">지원</td>
                    <td className="py-5 px-6">지원</td>
                  </tr>
                  <tr className="hover:bg-gray-50/50 transition-colors">
                    <td className="py-5 px-6 font-semibold text-gray-800 bg-[#fefefe]">답변 확인</td>
                    <td className="py-5 px-6 break-keep">같은 문의창/문의목록에서 확인</td>
                    <td className="py-5 px-6 break-keep">실시간 대화창에서 확인</td>
                    <td className="py-5 px-6 break-keep">고객사 정책에 맞춤</td>
                  </tr>
                  <tr className="hover:bg-gray-50/50 transition-colors">
                    <td className="py-5 px-6 font-semibold text-gray-800 bg-[#fefefe]">문의/상담 목록</td>
                    <td className="py-5 px-6">지원</td>
                    <td className="py-5 px-6">지원</td>
                    <td className="py-5 px-6">지원</td>
                  </tr>
                  <tr className="hover:bg-gray-50/50 transition-colors">
                    <td className="py-5 px-6 font-semibold text-gray-800 bg-[#fefefe]">문의/상담 상세</td>
                    <td className="py-5 px-6">지원</td>
                    <td className="py-5 px-6">지원</td>
                    <td className="py-5 px-6">지원</td>
                  </tr>
                  <tr className="hover:bg-gray-50/50 transition-colors">
                    <td className="py-5 px-6 font-semibold text-gray-800 bg-[#fefefe]">상태 관리</td>
                    <td className="py-5 px-6">접수 / 확인중 / 답변완료</td>
                    <td className="py-5 px-6">대기중 / 진행중 / 완료 등</td>
                    <td className="py-5 px-6">맞춤 설정</td>
                  </tr>
                  <tr className="hover:bg-gray-50/50 transition-colors">
                    <td className="py-5 px-6 font-semibold text-gray-800 bg-[#fefefe]">보류/차단 관리</td>
                    <td className="py-5 px-6 text-gray-500 break-keep">관리자 정책에 따라 검토</td>
                    <td className="py-5 px-6 text-gray-500 break-keep">운영 정책에 따라 적용 가능</td>
                    <td className="py-5 px-6 text-gray-500 break-keep">맞춤 설정</td>
                  </tr>
                  <tr className="hover:bg-gray-50/50 transition-colors">
                    <td className="py-5 px-6 font-semibold text-gray-800 bg-[#fefefe]">재문의 연결</td>
                    <td className="py-5 px-6">지원</td>
                    <td className="py-5 px-6">상담 이력 기반 확인</td>
                    <td className="py-5 px-6">맞춤 설정</td>
                  </tr>
                  <tr className="hover:bg-gray-50/50 transition-colors">
                    <td className="py-5 px-6 font-semibold text-gray-800 bg-[#fefefe]">상담 이력 관리</td>
                    <td className="py-5 px-6">문의 단위 이력</td>
                    <td className="py-5 px-6">고객별 상담 이력</td>
                    <td className="py-5 px-6 text-gray-500">외부 시스템 연계 협의</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Section 3 */}
          <div>
            <h4 className="text-[1.2rem] font-bold text-gray-900 mb-6 px-2">관리 기능 비교</h4>
            <div className="w-full overflow-x-auto rounded-[1rem] border border-gray-200 bg-white shadow-[0_4px_16px_-4px_rgba(0,0,0,0.02)]">
              <table className="w-full min-w-[800px] text-left text-[0.95rem]">
                <thead>
                  <tr className="border-b border-gray-200 bg-[#f8fafc]">
                    <th className="py-5 px-6 font-bold text-gray-700 w-1/4">구분</th>
                    <th className="py-5 px-6 font-bold text-gray-900 w-1/4">게시판형 채팅 솔루션</th>
                    <th className="py-5 px-6 font-bold text-gray-900 w-1/4">실시간 채팅 솔루션</th>
                    <th className="py-5 px-6 font-bold text-gray-900 w-1/4">기업 맞춤 도입</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-gray-600 font-medium">
                  <tr className="hover:bg-gray-50/50 transition-colors">
                    <td className="py-5 px-6 font-semibold text-gray-800 bg-[#fefefe]">문의 유형 관리</td>
                    <td className="py-5 px-6">지원</td>
                    <td className="py-5 px-6">지원 가능</td>
                    <td className="py-5 px-6">맞춤 설정</td>
                  </tr>
                  <tr className="hover:bg-gray-50/50 transition-colors">
                    <td className="py-5 px-6 font-semibold text-gray-800 bg-[#fefefe]">첨부자료 확인</td>
                    <td className="py-5 px-6">문의 첨부 중심</td>
                    <td className="py-5 px-6 break-keep">사진, 동영상, 파일, 링크 모아보기</td>
                    <td className="py-5 px-6">맞춤 설정</td>
                  </tr>
                  <tr className="hover:bg-gray-50/50 transition-colors">
                    <td className="py-5 px-6 font-semibold text-gray-800 bg-[#fefefe]">고객 정보 확인</td>
                    <td className="py-5 px-6 text-gray-500">기본 정보 중심</td>
                    <td className="py-5 px-6 text-emerald-700 font-bold">상담 중 고객 정보 확인</td>
                    <td className="py-5 px-6 text-gray-500 break-keep">고객사 DB 연계 협의</td>
                  </tr>
                  <tr className="hover:bg-gray-50/50 transition-colors">
                    <td className="py-5 px-6 font-semibold text-gray-800 bg-[#fefefe]">상담원 관리</td>
                    <td className="py-5 px-6">기본 관리</td>
                    <td className="py-5 px-6">상담원 목록/상태 확인</td>
                    <td className="py-5 px-6">조직/권한 맞춤</td>
                  </tr>
                  <tr className="hover:bg-gray-50/50 transition-colors">
                    <td className="py-5 px-6 font-semibold text-gray-800 bg-[#fefefe]">내부 공유</td>
                    <td className="py-5 px-6 text-gray-400">제한적</td>
                    <td className="py-5 px-6 text-emerald-700 font-bold">내부 대화/내부 전송</td>
                    <td className="py-5 px-6">조직별 협업 구조 가능</td>
                  </tr>
                  <tr className="hover:bg-gray-50/50 transition-colors">
                    <td className="py-5 px-6 font-semibold text-gray-800 bg-[#fefefe]">회사명 표시</td>
                    <td className="py-5 px-6">설정 가능</td>
                    <td className="py-5 px-6">설정 가능</td>
                    <td className="py-5 px-6">맞춤 브랜딩</td>
                  </tr>
                  <tr className="hover:bg-gray-50/50 transition-colors">
                    <td className="py-5 px-6 font-semibold text-gray-800 bg-[#fefefe]">설치 방식</td>
                    <td className="py-5 px-6">플로팅 문의 위젯 설치</td>
                    <td className="py-5 px-6 text-emerald-700 font-bold">실시간 채팅 위젯 설치</td>
                    <td className="py-5 px-6">고객사 환경에 맞춤</td>
                  </tr>
                  <tr className="hover:bg-gray-50/50 transition-colors">
                    <td className="py-5 px-6 font-semibold text-gray-800 bg-[#fefefe]">구독/생성 방식</td>
                    <td className="py-5 px-6 font-semibold text-gray-900 break-keep">로그인 후 상담 환경 생성</td>
                    <td className="py-5 px-6 font-semibold text-emerald-700 break-keep">구독 결제 후 상담 환경 생성</td>
                    <td className="py-5 px-6 font-semibold text-gray-900">별도 협의 후 구성</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="bg-white rounded-[1.5rem] p-10 md:p-16 text-center border border-gray-200 shadow-[0_12px_40px_-12px_rgba(0,0,0,0.05)]">
          <h3 className="text-[1.8rem] md:text-[2rem] font-bold text-gray-900 mb-4 tracking-tight">
            우리 팀에 맞는 상담 솔루션이 궁금하신가요?
          </h3>
          <p className="text-[1.05rem] text-gray-500 font-medium mb-10 max-w-lg mx-auto leading-relaxed break-keep">
            게시판형 문의부터 실시간 채팅, 맞춤 도입까지<br className="hidden md:block" />
            운영 방식에 맞는 구성을 함께 확인해보세요.
          </p>
          <div className="flex justify-center">
            <button 
              onClick={() => startEnterpriseFlow()}
              className="px-10 py-3.5 rounded-xl bg-gray-900 text-white text-[1rem] font-bold hover:bg-gray-800 transition-all shadow-sm"
            >
              도입 문의하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
