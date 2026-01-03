"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { ArrowLeft } from "lucide-react"

export default function EventRegisterPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    eventTitle: "",
    eventPlace: "",
    eventFromDt: "",
    eventEndDt: "",
    eventDescription: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api"
      const accessToken = localStorage.getItem("accessToken")

      const response = await fetch(`${apiUrl}/v1/events`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          eventFromDt: new Date(formData.eventFromDt).toISOString(),
          eventEndDt: new Date(formData.eventEndDt).toISOString(),
        }),
      })

      if (response.ok) {
        router.push("/event")
        router.refresh()
      } else {
        const errorData = await response.json().catch(() => ({}))
        setError(errorData.message || "이벤트 등록에 실패했습니다.")
      }
    } catch (err) {
      console.error("Register event error:", err)
      setError("서버와 통신 중 오류가 발생했습니다.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold text-gray-900">이벤트 등록</h1>
      </div>

      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>이벤트 정보 입력</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="eventTitle">이벤트 제목</Label>
              <Input
                id="eventTitle"
                name="eventTitle"
                placeholder="이벤트 제목을 입력하세요"
                value={formData.eventTitle}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="eventPlace">이벤트 장소</Label>
              <Input
                id="eventPlace"
                name="eventPlace"
                placeholder="이벤트 장소를 입력하세요"
                value={formData.eventPlace}
                onChange={handleChange}
                required
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="eventFromDt">시작 일시</Label>
                <Input
                  id="eventFromDt"
                  name="eventFromDt"
                  type="datetime-local"
                  value={formData.eventFromDt}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="eventEndDt">종료 일시</Label>
                <Input
                  id="eventEndDt"
                  name="eventEndDt"
                  type="datetime-local"
                  value={formData.eventEndDt}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="eventDescription">이벤트 설명</Label>
              <Textarea
                id="eventDescription"
                name="eventDescription"
                placeholder="이벤트에 대한 설명을 입력하세요"
                rows={5}
                value={formData.eventDescription}
                onChange={handleChange}
                required
              />
            </div>
            {error && <p className="text-sm text-red-500 font-medium">{error}</p>}
          </CardContent>
          <CardFooter className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => router.back()}>
              취소
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "등록 중..." : "등록하기"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
