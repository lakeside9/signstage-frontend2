"use client"

import { useEffect, useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { EventContent, EventListResponse, EventSearchParams } from "@/types/event"
import { Search, RotateCcw, ChevronLeft, ChevronRight } from "lucide-react"

export default function EventPage() {
  const router = useRouter()
  const [user, setUser] = useState<{ userId: string; userNm: string } | null>(null)
  
  // 상태 관리
  const [events, setEvents] = useState<EventContent[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchParams, setSearchParams] = useState<EventSearchParams>({
    id: "",
    eventTitle: "",
    eventPlace: "",
    page: 0,
    size: 10,
  })
  const [totalPages, setTotalPages] = useState(0)
  const [totalElements, setTotalElements] = useState(0)

  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    const accessToken = localStorage.getItem("accessToken")

    if (!accessToken || !storedUser) {
      router.push("/login")
      return
    }

    try {
      setUser(JSON.parse(storedUser))
    } catch (error) {
      console.error("Failed to parse user data:", error)
      router.push("/login")
    }
  }, [router])

  const fetchEvents = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api"
      const accessToken = localStorage.getItem("accessToken")
      
      const queryParams = new URLSearchParams()
      if (searchParams.id) queryParams.append("id", searchParams.id)
      if (searchParams.eventTitle) queryParams.append("eventTitle", searchParams.eventTitle)
      if (searchParams.eventPlace) queryParams.append("eventPlace", searchParams.eventPlace)
      queryParams.append("page", (searchParams.page || 0).toString())
      queryParams.append("size", (searchParams.size || 10).toString())

      const response = await fetch(`${apiUrl}/v1/events?${queryParams.toString()}`, {
        headers: {
          "Authorization": `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      })

      if (response.ok) {
        const result: EventListResponse = await response.json()
        setEvents(result.data.content)
        setTotalPages(result.data.totalPages)
        setTotalElements(result.data.totalElements)
      } else {
        const errorData = await response.json().catch(() => ({}))
        setError(errorData.message || "이벤트 목록을 불러오는데 실패했습니다.")
      }
    } catch (err) {
      console.error("Fetch events error:", err)
      setError("서버와 통신 중 오류가 발생했습니다.")
    } finally {
      setLoading(false)
    }
  }, [searchParams])

  useEffect(() => {
    if (user) {
      fetchEvents()
    }
  }, [user, fetchEvents])

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setSearchParams(prev => ({
      ...prev,
      [name]: value,
      page: 0, // 검색 시 첫 페이지로 이동
    }))
  }

  const handleReset = () => {
    setSearchParams({
      id: "",
      eventTitle: "",
      eventPlace: "",
      page: 0,
      size: 10,
    })
  }

  const handlePageChange = (newPage: number) => {
    setSearchParams(prev => ({
      ...prev,
      page: newPage,
    }))
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  if (!user) {
    return null
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Event 목록</h1>
        <Button onClick={() => router.push("/event/register")}>이벤트 등록</Button>
      </div>

      {/* 검색 필터 */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-1.5">
            <label htmlFor="id" className="text-sm font-medium text-gray-700">ID</label>
            <Input
              id="id"
              name="id"
              placeholder="ID 입력"
              value={searchParams.id}
              onChange={handleSearchChange}
            />
          </div>
          <div className="space-y-1.5">
            <label htmlFor="eventTitle" className="text-sm font-medium text-gray-700">이벤트 제목</label>
            <Input
              id="eventTitle"
              name="eventTitle"
              placeholder="이벤트 제목 입력"
              value={searchParams.eventTitle}
              onChange={handleSearchChange}
            />
          </div>
          <div className="space-y-1.5">
            <label htmlFor="eventPlace" className="text-sm font-medium text-gray-700">이벤트 장소</label>
            <Input
              id="eventPlace"
              name="eventPlace"
              placeholder="이벤트 장소 입력"
              value={searchParams.eventPlace}
              onChange={handleSearchChange}
            />
          </div>
        </div>
        <div className="mt-4 flex justify-end gap-2">
          <Button variant="outline" onClick={handleReset} className="flex items-center gap-1">
            <RotateCcw className="h-4 w-4" />
            초기화
          </Button>
          <Button onClick={() => fetchEvents()} className="flex items-center gap-1">
            <Search className="h-4 w-4" />
            검색
          </Button>
        </div>
      </div>

      {/* 목록 테이블 */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">제목</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">장소</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">시작 일시</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">종료 일시</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">생성자</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-10 text-center text-gray-500">로딩 중...</td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan={6} className="px-6 py-10 text-center text-red-500">{error}</td>
                </tr>
              ) : events.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-10 text-center text-gray-500">조회된 데이터가 없습니다.</td>
                </tr>
              ) : (
                events.map((event) => (
                  <tr
                    key={event.id}
                    className="hover:bg-gray-50 transition-colors cursor-pointer"
                    onClick={() => router.push(`/event/${event.id}`)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{event.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{event.eventTitle}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{event.eventPlace}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(event.eventFromDt)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(event.eventEndDt)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{event.createId}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* 페이지네이션 */}
        {!loading && !error && events.length > 0 && (
          <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
            <div className="flex-1 flex justify-between sm:hidden">
              <Button
                variant="outline"
                onClick={() => handlePageChange(Math.max(0, (searchParams.page || 0) - 1))}
                disabled={searchParams.page === 0}
              >
                이전
              </Button>
              <Button
                variant="outline"
                onClick={() => handlePageChange(Math.min(totalPages - 1, (searchParams.page || 0) + 1))}
                disabled={searchParams.page === totalPages - 1}
              >
                다음
              </Button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  총 <span className="font-medium">{totalElements}</span>개 중{" "}
                  <span className="font-medium">{(searchParams.page || 0) * (searchParams.size || 10) + 1}</span>부터{" "}
                  <span className="font-medium">
                    {Math.min(((searchParams.page || 0) + 1) * (searchParams.size || 10), totalElements)}
                  </span>
                  개 표시
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <Button
                    variant="outline"
                    className="rounded-r-none"
                    onClick={() => handlePageChange(Math.max(0, (searchParams.page || 0) - 1))}
                    disabled={searchParams.page === 0}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  {[...Array(totalPages)].map((_, i) => (
                    <Button
                      key={i}
                      variant={searchParams.page === i ? "default" : "outline"}
                      className="rounded-none hidden md:inline-flex"
                      onClick={() => handlePageChange(i)}
                    >
                      {i + 1}
                    </Button>
                  ))}
                  <Button
                    variant="outline"
                    className="rounded-l-none"
                    onClick={() => handlePageChange(Math.min(totalPages - 1, (searchParams.page || 0) + 1))}
                    disabled={searchParams.page === totalPages - 1}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </nav>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
