import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { ChangeEvent } from "react";

export default function DailyRecord() {
  const router = useRouter();
  const [topicNumber, setTopicNumber] = useState(1);
  const [topic, setTopic] = useState(
    "요즘 시청 중인 TV 프로그램에서 가장 재미있었던 부분에 대해 말씀해주세요."
  );
  const [recordStart, setRecordStart] = useState(false);
  const [answer, setAnswer] = useState("");
  const question1Options = ["옵션 1", "옵션 2", "옵션 3"];
  const question2Options = ["옵션 A", "옵션 B", "옵션 C"];
  const handleNextQuestion = useCallback(() => {
    if (topicNumber < 3) setTopicNumber(topicNumber + 1);
  }, []);
  const handleSkipQuestion = useCallback(() => {}, []);
  const handleSubmit = () => {
    // alert(`입력한 답변: ${answer}`);
    router.push("/complete_user");
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === " " && topicNumber < 3) {
        event.preventDefault(); // 스페이스바의 기본 동작(스크롤)을 막음
        handleNextQuestion();
      } else {
        router.push("/complete_user"); // 제출
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [topicNumber, handleNextQuestion]);

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen bg-white">
        <div className="w-full max-w-4xl px-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2 border-l-4 border-yellow-400 pl-3">
              <p className="text-lg font-semibold text-gray-800">
                {topicNumber}번째 주제
              </p>
            </div>
            <button
              onClick={handleSkipQuestion}
              className="border border-gray-500 px-4 py-2 rounded-lg shadow-md hover:bg-gray-100 flex items-center"
            >
              다른 주제로 넘어가기
              <Image src="" alt="" className="w-3 h-3" />
            </button>
          </div>
          <div className="text-center text-lg font-semibold text-gray-800 mb-8">
            {topic}
          </div>
          {!recordStart ? (
            <div className="flex justify-center">
              <button className="w-16 h-16 bg-gray-700 text-white text-sm rounded-full flex items-center justify-center shadow-lg border-4 border-gray-300 hover:bg-gray-800">
                입력 시작
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <Image src="" alt="" className="w-12 h-12" />
              <p className="text-gray-600 mt-2">듣고 있어요...</p>
            </div>
          )}
        </div>
        <div className="fixed bottom-0 w-full bg-gray-50 border-t border-gray-300 py-4 px-6">
          <div className="flex justify-between items-center max-w-4xl mx-auto">
            <div className="flex items-center gap-2">
              <Image src="" alt="" className="w-6 h-6" />
              <p className="text-gray-600">도움이 필요하신가요?</p>
            </div>
            <button className="bg-yellow-400 px-6 py-3 font-bold rounded-lg shadow-md hover:bg-yellow-500">
              입력 완료
            </button>
            <div className="flex items-center gap-2">
              <Image src="" alt="" className="w-6 h-6 text-red-500" />
              <p className="text-red-500">현재 마이크가 꺼져 있습니다</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
