"use client"

import type { FilterType } from "./TodoContainer"

interface FilterButtonsProps {
  activeFilter: FilterType
  onFilterChange: (filter: FilterType) => void
}

export default function FilterButtons({ activeFilter, onFilterChange }: FilterButtonsProps) {
  const filters: FilterType[] = ["all", "active", "completed"]

  return (
    <div className="flex justify-center space-x-2 mb-4">
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => onFilterChange(filter)}
          className={`px-3 py-1 text-sm rounded-md transition-colors ${
            activeFilter === filter
              ? "bg-blue-500 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
          }`}
        >
          {filter.charAt(0).toUpperCase() + filter.slice(1)}
        </button>
      ))}
    </div>
  )
}
