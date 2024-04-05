import ChatContainer from "./components/ChatContainer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Inteliflora",
  description: "Inteliflora chatbot",
};


export default function Home() {
  return (
    <>
    <main className="flex flex-col items-center justify-center w-full min-h-screen px-2 py-4 sm:p-4 gap-4 md:flex-row md:p-8">
      <div className="w-full max-w-5xl mx-auto">
        <div className="card bg-white p-0 sm:p-2 border border-gray-200 rounded-lg h-[85vh]">
          <ChatContainer />
        </div>
      </div>
    </main>
    </>
  );
}
