import TodoContainer from "@/components/TodoContainer"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 py-8 px-4">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-8">Todo List App</h1>
        <TodoContainer />
      </div>
    </main>
  )
}
