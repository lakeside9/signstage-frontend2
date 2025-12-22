"use client"

import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { LoginResponse } from "@/types/auth"

export default function LoginPage() {
  const router = useRouter()
  const [userId, setUserId] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // 간단한 이메일 유효성 검사
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(userId)) {
      setError("올바른 이메일 형식을 입력해주세요.")
      return
    }

    if (!password) {
      setError("비밀번호를 입력해주세요.")
      return
    }

    setIsLoading(true)

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api"
      const response = await fetch(`${apiUrl}/v1/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, password }),
      })

      if (response.ok) {
        const result: LoginResponse = await response.json()
        console.log("Login success:", result)
        
        // 토큰 저장 (localStorage 사용)
        localStorage.setItem("accessToken", result.data.accessToken)
        localStorage.setItem("refreshToken", result.data.refreshToken)
        localStorage.setItem("user", JSON.stringify({
          id: result.data.id,
          userId: result.data.userId,
          userNm: result.data.userNm
        }))

        // 성공 처리 및 리다이렉션
        router.push("/dashboard")
      } else {
        const errorData = await response.json().catch(() => ({}))
        setError(errorData.message || "로그인에 실패했습니다. 아이디 또는 비밀번호를 확인해주세요.")
      }
    } catch (err) {
      console.error("Login error:", err)
      if (err instanceof TypeError && err.message === "Failed to fetch") {
        setError("서버에 연결할 수 없습니다. 서버가 실행 중인지 확인해주세요.")
      } else {
        setError("서버와 통신 중 오류가 발생했습니다.")
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <div>
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
          로그인
        </h2>
      </div>
      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="space-y-4 rounded-md shadow-sm">
          <div className="space-y-1.5">
            <label htmlFor="userId" className="text-sm font-medium text-gray-700">
              이메일
            </label>
            <Input
              id="userId"
              name="userId"
              type="email"
              autoComplete="email"
              required
              placeholder="이메일 (userId)"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            />
          </div>
          <div className="space-y-1.5">
            <label htmlFor="password" className="text-sm font-medium text-gray-700">
              비밀번호
            </label>
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        {error && (
          <div className="text-sm text-red-600 text-center">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <div className="flex gap-4">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => router.back()}
            >
              취소
            </Button>
            <Button
              type="submit"
              className="flex-1"
              disabled={isLoading}
            >
              {isLoading ? "로그인 중..." : "로그인"}
            </Button>
          </div>
          
          <div className="text-center">
            <Link 
              href="/register" 
              className="text-sm font-medium text-blue-600 hover:text-blue-500"
            >
              아직 계정이 없으신가요? 회원가입
            </Link>
          </div>
        </div>
      </form>
    </>
  )
}
