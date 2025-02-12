import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function MainHelper() {
  const router = useRouter();
  const [role, setRole] = useState("");
  const [selectedTab, setSelectedTab] = useState<Tab | null>(null);
  const [selectedRecord, setSelectedRecord] = useState<Record | null>(null);
  const [exceptionMessage, setExceptionMessage] = useState("");
  const tabs: Tab[] = [
    {
      name: "김다지",
      dates: [
        {
          date: "2025년 1월 1일(목)",
          records: [
            {
              topic: "주제 1",
              summary: "TV 내용",
              recommendation: " ~ ~ 대화 내용 추천",
            },
          ],
        },
        {
          date: "2025년 1월 2일(금)",
          records: [
            {
              topic: "주제 2",
              summary: "영화 감상",
              recommendation: " ~ ~ 대화 내용 추천",
            },
          ],
        },
      ],
    },
    {
      name: "이다지",
      dates: [],
    },
  ];
  useEffect(() => {
    const storedRole = sessionStorage.getItem("role");
    if (storedRole) {
      setRole(storedRole);
      if (!tabs) {
        handleException(1);
        return;
      }
      if (!selectedTab) return;
      if (selectedTab.dates.length > 0) {
        setSelectedRecord(selectedTab.dates[0]);
        handleException(0);
      } else {
        setSelectedRecord(null);
        handleException(2);
      }
    } else {
      router.push("/"); // 역할이 없으면 로그인 페이지로 이동
    }
  }, [router, selectedTab]);

  const handleException = (sig: number): void => {
    if (sig === 0) setExceptionMessage("");
    else if (sig === 1) setExceptionMessage("등록된 어르신이 없습니다.");
    else if (sig === 2) setExceptionMessage("등록된 기록이 없습니다.");
  };
  const logoutButtonClick = () => {
    sessionStorage.removeItem("role");
    router.push("/");
  };

  const settingsPageButtonClick = () => {
    router.push("/settings_helper");
  };

  return (
    <>
      <div className="p-8">
        <header className="flex justify-end space-x-2 mb-4">
          <h2 className="text-2xl font-bold text-gray-800">소담</h2>
          <div>
            <button
              onClick={settingsPageButtonClick}
              className="border px-4 py-2 rounded-lg shadow-sm"
            >
              계정 관리
            </button>
            <button
              onClick={logoutButtonClick}
              className="bg-gray-200 px-4 py-2 rounded-lg shadow-sm"
            >
              로그아웃
            </button>
          </div>
        </header>
        <div className="border rounded-lg shadow-md overflow-hidden">
          <div className="grid grid-cols-2 bg-gray-300">
            {tabs.map((tab) => (
              <button
                key={tab.name}
                onClick={() => setSelectedTab(tab)}
                className={`py-3 px-4 ${
                  selectedTab?.name === tab.name
                    ? "bg-gray-500 text-white"
                    : "bg-gray-100"
                }`}
              >
                {tab.name} 어르신
              </button>
            ))}
          </div>
          <div className="p-4">
            {selectedTab && selectedTab.dates.length > 0 ? (
              <div className="border-t py-4">
                <h3 className="font-bold">기록일</h3>
                {selectedTab.dates.map((record) => (
                  <button
                    key={record.date}
                    onClick={() => setSelectedRecord(record)}
                    className="block w-full text-left py-2 border-b font-medium hover:bg-gray-100"
                  >
                    {record.date}
                  </button>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">{exceptionMessage}</p>
            )}
          </div>
        </div>
        {selectedRecord && (
          <div className="mt-4">
            {selectedRecord.records.map((record, index) => (
              <div
                key={index}
                className="p-4 bg-yellow-300 rounded-lg shadow-md mb-4"
              >
                <h3 className="font-bold">{record.topic}</h3>
                <p>{record.summary}</p>
                <p className="text-red-500 font-medium">📌 추천 대화 주제</p>
                <p>{record.recommendation}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

interface Tab {
  name: string;
  dates: Record[];
}

interface Record {
  date: string;
  records: RecordEntry[];
}

interface RecordEntry {
  topic: string;
  summary: string;
  recommendation: string;
}
