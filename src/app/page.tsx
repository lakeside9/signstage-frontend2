import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">SignStage Project</h1>
      <p className="text-xl mb-8 text-muted-foreground">
        Next.js + shadcn/ui 기본 프로젝트 설정이 완료되었습니다.
      </p>
      <div className="flex gap-4">
        <Button>시작하기</Button>
        <Button variant="outline">더 알아보기</Button>
      </div>
    </div>
  );
}
