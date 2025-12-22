"use client"

import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SignupRequest, SignupResponse } from "@/types/auth"

export default function RegisterPage() {
  const router = useRouter()
  const [formData, setFormData] = useState<SignupRequest>({
    userId: "",
    userNm: "",
    password: "",
    termsAgreeYn: "N",
    eventAgreeYn: "N",
  })
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        [name]: checked ? "Y" : "N",
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // 간단한 유효성 검사
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.userId)) {
      setError("올바른 이메일 형식을 입력해주세요.")
      return
    }

    if (!formData.userNm) {
      setError("이름을 입력해주세요.")
      return
    }

    if (formData.password.length < 4) {
      setError("비밀번호는 4자 이상이어야 합니다.")
      return
    }

    if (formData.password !== confirmPassword) {
      setError("비밀번호가 일치하지 않습니다.")
      return
    }

    if (formData.termsAgreeYn !== "Y") {
      setError("이용약관에 동의해야 합니다.")
      return
    }

    setIsLoading(true)

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api"
      const response = await fetch(`${apiUrl}/v1/user/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        alert("회원가입이 완료되었습니다. 로그인해주세요.")
        router.push("/login")
      } else {
        const errorData: SignupResponse = await response.json().catch(() => ({}))
        setError(errorData.message || "회원가입에 실패했습니다.")
      }
    } catch (err) {
      console.error("Signup error:", err)
      setError("서버와 통신 중 오류가 발생했습니다.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <div>
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
          회원가입
        </h2>
      </div>
      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="space-y-4 rounded-md shadow-sm">
          <div>
            <label htmlFor="userId" className="block text-sm font-medium text-gray-700">
              이메일 (아이디)
            </label>
            <Input
              id="userId"
              name="userId"
              type="email"
              required
              placeholder="email@example.com"
              value={formData.userId}
              onChange={handleChange}
              className="mt-1"
            />
          </div>
          <div>
            <label htmlFor="userNm" className="block text-sm font-medium text-gray-700">
              사용자명
            </label>
            <Input
              id="userNm"
              name="userNm"
              type="text"
              required
              placeholder="홍길동"
              value={formData.userNm}
              onChange={handleChange}
              className="mt-1"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              비밀번호
            </label>
            <Input
              id="password"
              name="password"
              type="password"
              required
              placeholder="비밀번호"
              value={formData.password}
              onChange={handleChange}
              className="mt-1"
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              비밀번호 확인
            </label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              required
              placeholder="비밀번호 확인"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mt-1"
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center">
            <input
              id="termsAgreeYn"
              name="termsAgreeYn"
              type="checkbox"
              checked={formData.termsAgreeYn === "Y"}
              onChange={handleChange}
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <label htmlFor="termsAgreeYn" className="ml-2 block text-sm text-gray-900">
              이용약관 동의 (필수)
            </label>
          </div>
          <div className="flex items-center">
            <input
              id="eventAgreeYn"
              name="eventAgreeYn"
              type="checkbox"
              checked={formData.eventAgreeYn === "Y"}
              onChange={handleChange}
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <label htmlFor="eventAgreeYn" className="ml-2 block text-sm text-gray-900">
              이벤트 정보 수신 동의 (선택)
            </label>
          </div>
        </div>

        {error && (
          <div className="text-sm text-red-600 text-center">
            {error}
          </div>
        )}

        <div className="flex flex-col space-y-4">
          <div className="flex gap-4">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => router.push("/login")}
            >
              취소
            </Button>
            <Button
              type="submit"
              className="flex-1"
              disabled={isLoading}
            >
              {isLoading ? "가입 중..." : "회원가입"}
            </Button>
          </div>
          
          <div className="text-center">
            <Link 
              href="/login" 
              className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
            >
              이미 계정이 있으신가요? 로그인으로 이동
            </Link>
          </div>
        </div>
      </form>
    </>
  )
}
