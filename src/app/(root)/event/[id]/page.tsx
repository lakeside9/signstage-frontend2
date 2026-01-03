"use client"

import { useState, useEffect, use } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Edit } from "lucide-react"
import { EventContent } from "@/types/event"

export default function EventDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const resolvedParams = use(params)
  const id = resolvedParams.id
  
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [event, setEvent] = useState<EventContent | null>(null)
  const [activeTab, setActiveTab] = useState("info")

  useEffect(() => {
    const fetchEventDetail = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api"
        const accessToken = localStorage.getItem("accessToken")

        const response = await fetch(`${apiUrl}/v1/events/${id}`, {
          headers: {
            "Authorization": `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        })

        if (response.ok) {
          const result = await response.json()
          setEvent(result.data)
        } else {
          setError("이벤트 정보를 불러오는데 실패했습니다.")
        }
      } catch (err) {
        console.error("Fetch event detail error:", err)
        setError("서버와 통신 중 오류가 발생했습니다.")
      } finally {
        setLoading(false)
      }
    }

    fetchEventDetail()
  }, [id])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <p className="text-gray-500">로딩 중...</p>
      </div>
    )
  }

  if (error || !event) {
    return (
      <div className="p-6 text-center">
        <p className="text-red-500">{error || "이벤트를 찾을 수 없습니다."}</p>
        <Button variant="outline" className="mt-4" onClick={() => router.push("/event")}>
          목록으로 돌아가기
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={() => router.push("/event")}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold text-gray-900">{event.eventTitle}</h1>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab("info")}
            className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === "info"
                ? "border-primary text-primary"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            이벤트 정보
          </button>
          <button
            onClick={() => setActiveTab("forms")}
            className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === "forms"
                ? "border-primary text-primary"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            양식 목록
          </button>
          <button
            onClick={() => setActiveTab("contracts")}
            className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === "contracts"
                ? "border-primary text-primary"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            계약 목록
          </button>
        </nav>
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {activeTab === "info" && (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>기본 정보</CardTitle>
              <Button onClick={() => router.push(`/event/${id}/edit`)} className="flex items-center gap-1">
                <Edit className="h-4 w-4" />
                수정
              </Button>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">이벤트 제목</p>
                  <p className="text-base text-gray-900">{event.eventTitle}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">이벤트 장소</p>
                  <p className="text-base text-gray-900">{event.eventPlace}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">시작 일시</p>
                  <p className="text-base text-gray-900">{formatDate(event.eventFromDt)}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">종료 일시</p>
                  <p className="text-base text-gray-900">{formatDate(event.eventEndDt)}</p>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-500">이벤트 설명</p>
                <p className="text-base text-gray-900 whitespace-pre-wrap">{event.eventDescription}</p>
              </div>
              <div className="pt-4 border-t border-gray-100 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">등록일</p>
                  <p className="text-sm text-gray-700">{formatDate(event.createDt)} ({event.createId})</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">수정일</p>
                  <p className="text-sm text-gray-700">{formatDate(event.modifyDt)} ({event.modifyId})</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === "forms" && (
          <div className="bg-white p-12 rounded-lg border border-dashed border-gray-300 text-center">
            <p className="text-gray-500">등록된 양식이 없습니다.</p>
          </div>
        )}

        {activeTab === "contracts" && (
          <div className="bg-white p-12 rounded-lg border border-dashed border-gray-300 text-center">
            <p className="text-gray-500">등록된 계약이 없습니다.</p>
          </div>
        )}
      </div>
    </div>
  )
}
