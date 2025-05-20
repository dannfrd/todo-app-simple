"use client"

import { useState } from "react"
import TodoForm from "./TodoForm"
import TodoItem from "./TodoItem"
import FilterButtons from "./FilterButtons"
import { useLocalStorage } from "@/hooks/useLocalStorage"
import { AnimatePresence } from "framer-motion"

export type Todo = {
  id: string
  text: string
  completed: boolean
}

export type FilterType = "all" | "active" | "completed"

export default function TodoContainer() {
  const [todos, setTodos] = useLocalStorage<Todo[]>("todos", [])
  const [filter, setFilter] = useState<FilterType>("all")
  const [editingId, setEditingId] = useState<string | null>(null)

  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: Date.now().toString(),
      text,
      completed: false,
    }
    setTodos([...todos, newTodo])
  }

  const toggleTodo = (id: string) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)))
  }

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  const startEditing = (id: string) => {
    setEditingId(id)
  }

  const updateTodo = (id: string, newText: string) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, text: newText } : todo)))
    setEditingId(null)
  }

  const cancelEditing = () => {
    setEditingId(null)
  }

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed
    if (filter === "completed") return todo.completed
    return true
  })

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <TodoForm onAddTodo={addTodo} />

      <FilterButtons activeFilter={filter} onFilterChange={setFilter} />

      <div className="mt-4 space-y-2">
        <AnimatePresence>
          {filteredTodos.length > 0 ? (
            filteredTodos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
                onEdit={startEditing}
                onUpdate={updateTodo}
                isEditing={editingId === todo.id}
                onCancelEdit={cancelEditing}
              />
            ))
          ) : (
            <p className="text-center text-gray-500 dark:text-gray-400 py-4">No todos to display</p>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-4 text-sm text-gray-500 dark:text-gray-400 text-center">
        {todos.length} {todos.length === 1 ? "item" : "items"} • {todos.filter((t) => !t.completed).length} remaining
      </div>
    </div>
  )
}
