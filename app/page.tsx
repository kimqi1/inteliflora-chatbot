import ChatContainer from "./components/ChatContainer";

export default function Home() {
  return (
    <main
      className="flex flex-col items-center justify-center w-full min-h-screen p-4 gap-4 md:flex-row md:p-8"
    >
      <div className="w-full max-w-5xl mx-auto">
        <div className="card bg-white p-2 border border-gray-200 rounded-lg h-[85vh]">
          <ChatContainer />
        </div>
      </div>
    </main>
  );
}
