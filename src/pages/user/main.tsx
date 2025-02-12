import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Mainuser() {
  const router = useRouter();
  const [role, setRole] = useState("");
  const [userName, setUserName] = useState("아무개");
  const [currentTime, setCurrentTime] = useState("");
  const timeFormat: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  useEffect(() => {
    const storedRole = sessionStorage.getItem("role");
    if (storedRole) {
      setRole(storedRole);
      updateTime();
      const interval = setInterval(updateTime, 60000);
      return () => clearInterval(interval);
    } else {
      router.push("/"); // 역할이 없으면 로그인 페이지로 이동
    }
  }, [router]);
  const updateTime = () => {
    const now = new Date();
    const days = ["(일)", "(월)", "(화)", "(수)", "(목)", "(금)", "(토)"];
    const dayOfWeek = days[now.getDay()];
    const formattedTime = `${now.getFullYear()}년 ${
      now.getMonth() + 1
    }월 ${now.getDate()}일${dayOfWeek} ${now.getHours()}시 ${now.getMinutes()}분`;
    setCurrentTime(formattedTime);
  };
  const dailyRecordButtonClick = () => {
    router.push("/dailyRecord_user");
  };
  const logoutButtonClick = () => {
    sessionStorage.removeItem("role");
    router.push("/");
  };
  return (
    <>
      <header>
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800">소담</h2>1
          <button
            className="bg-white py-2 px-4 rounded-lg shadow-md"
            onClick={logoutButtonClick}
          >
            로그아웃
          </button>
        </div>
      </header>
      <div className="flex h-screen">
        <div className="w-1/2 flex flex-col justify-center px-20 bg-white">
          <div>
            <div className="text-gray-500 text-sm mb-4">{currentTime}</div>
            <div>
              <h2 className="text-2xl font-bold text-black">
                안녕하세요, {userName}!
              </h2>
              <h2 className="text-2xl font-bold text-black">
                오늘 하루는 어떠셨나요?
              </h2>
            </div>
          </div>
          <button
            className="mt-6 bg-yellow-400 text-black font-bold py-3 px-6 rounded-lg shadow-md flex items-center"
            onClick={dailyRecordButtonClick}
          >
            오늘 하루 전하러 가기
            <Image src="" alt="" />
          </button>
        </div>
        <div className="w-1/2 relative">
          <div className="absolute right-5 top-5"></div>
          <div className="h-full w-full bg-cover bg-center">
            <Image src="" alt="" />
          </div>
        </div>
      </div>
    </>
  );
}
