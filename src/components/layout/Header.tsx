"use client"

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Menu, User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header = ({ toggleSidebar }: HeaderProps) => {
  const router = useRouter();
  const [user, setUser] = useState<{ userId: string; userNm: string } | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse user data:", error);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    router.push("/login");
  };

  return (
    <header className="h-16 border-b bg-white flex items-center px-4 sticky top-0 z-10">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={toggleSidebar} className="hover:bg-gray-100">
          <Menu className="w-5 h-5" />
        </Button>
        <div className="font-bold text-xl">SignStage</div>
      </div>
      
      <div className="ml-auto flex items-center gap-4">
        {user && (
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-700 hidden sm:inline">
              <span className="font-medium text-gray-900">{user.userNm}</span> ({user.userId})님
            </span>
            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center border">
              <User className="w-4 h-4 text-gray-500" />
            </div>
            <Button variant="outline" size="sm" onClick={handleLogout} className="flex items-center gap-2">
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">로그아웃</span>
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
