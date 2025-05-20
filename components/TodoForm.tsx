"use client"

import type React from "react"

import { useState } from "react"
import { PlusCircle } from "lucide-react"

interface TodoFormProps {
  onAddTodo: (text: string) => void
}

export default function TodoForm({ onAddTodo }: TodoFormProps) {
  const [text, setText] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (text.trim()) {
      onAddTodo(text.trim())
      setText("")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex items-center">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a new task..."
          className="flex-grow px-4 py-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-r-lg transition-colors duration-200 flex items-center"
          disabled={!text.trim()}
        >
          <PlusCircle className="w-5 h-5 mr-1" />
          Add
        </button>
      </div>
    </form>
  )
}
