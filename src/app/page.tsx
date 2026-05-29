import { redirect } from "next/navigation";

// 홈(/) 경로로 진입 시 메인 서비스인 '생활계획표(/life-plan)' 페이지로 리다이렉트 처리
export default function Home() {
  redirect("/life-plan");
}

