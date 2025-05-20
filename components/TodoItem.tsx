"use client"

import type React from "react"

import { useState } from "react"
import type { Todo } from "./TodoContainer"
import { Check, Pencil, Save, Trash, X } from "lucide-react"
import { motion } from "framer-motion"

interface TodoItemProps {
  todo: Todo
  onToggle: (id: string) => void
  onDelete: (id: string) => void
  onEdit: (id: string) => void
  onUpdate: (id: string, text: string) => void
  isEditing: boolean
  onCancelEdit: () => void
}

export default function TodoItem({
  todo,
  onToggle,
  onDelete,
  onEdit,
  onUpdate,
  isEditing,
  onCancelEdit,
}: TodoItemProps) {
  const [editText, setEditText] = useState(todo.text)

  const handleUpdate = () => {
    if (editText.trim()) {
      onUpdate(todo.id, editText)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleUpdate()
    } else if (e.key === "Escape") {
      onCancelEdit()
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, height: 0, marginBottom: 0 }}
      transition={{ duration: 0.2 }}
      className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 shadow-sm"
    >
      {isEditing ? (
        <div className="flex items-center">
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-grow px-3 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
            autoFocus
          />
          <button
            onClick={handleUpdate}
            className="ml-2 p-1 text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300"
            aria-label="Save"
          >
            <Save className="w-5 h-5" />
          </button>
          <button
            onClick={onCancelEdit}
            className="ml-1 p-1 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
            aria-label="Cancel"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      ) : (
        <div className="flex items-center">
          <button
            onClick={() => onToggle(todo.id)}
            className={`p-1 rounded-full border ${
              todo.completed
                ? "bg-green-100 border-green-300 dark:bg-green-900 dark:border-green-700"
                : "bg-white border-gray-300 dark:bg-gray-600 dark:border-gray-500"
            } mr-3 flex-shrink-0`}
            aria-label={todo.completed ? "Mark as incomplete" : "Mark as complete"}
          >
            {todo.completed && <Check className="w-4 h-4 text-green-600 dark:text-green-400" />}
          </button>
          <span
            className={`flex-grow ${
              todo.completed ? "line-through text-gray-500 dark:text-gray-400" : "text-gray-800 dark:text-white"
            }`}
          >
            {todo.text}
          </span>
          <button
            onClick={() => onEdit(todo.id)}
            className="ml-2 p-1 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
            aria-label="Edit"
          >
            <Pencil className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(todo.id)}
            className="ml-1 p-1 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
            aria-label="Delete"
          >
            <Trash className="w-4 h-4" />
          </button>
        </div>
      )}
    </motion.div>
  )
}
