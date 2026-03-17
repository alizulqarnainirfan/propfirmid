'use client'
import { useState } from 'react'
import { FaSearch, FaFilter } from 'react-icons/fa'

interface AdminSearchFilterProps {
  onSearch: (query: string) => void
  onFilter: (filters: any) => void
  placeholder?: string
  filters?: Array<{
    key: string
    label: string
    options: Array<{ value: string; label: string }>
  }>
}

export default function AdminSearchFilter({ 
  onSearch, 
  onFilter, 
  placeholder = "Search...",
  filters = []
}: AdminSearchFilterProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeFilters, setActiveFilters] = useState<any>({})
  const [showFilters, setShowFilters] = useState(false)

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    onSearch(query)
  }

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...activeFilters, [key]: value }
    setActiveFilters(newFilters)
    onFilter(newFilters)
  }

  const clearFilters = () => {
    setActiveFilters({})
    onFilter({})
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-4 mb-6">
      <div className="flex gap-4 items-center">
        {/* Search Input */}
        <div className="flex-1 relative">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder={placeholder}
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-primary-600"
          />
        </div>

        {/* Filter Toggle */}
        {filters.length > 0 && (
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
              showFilters 
                ? 'bg-primary-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <FaFilter />
            Filters
          </button>
        )}
      </div>

      {/* Filter Options */}
      {showFilters && filters.length > 0 && (
        <div className="mt-4 pt-4 border-t">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {filters.map((filter) => (
              <div key={filter.key}>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {filter.label}
                </label>
                <select
                  value={activeFilters[filter.key] || ''}
                  onChange={(e) => handleFilterChange(filter.key, e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-primary-600 focus:border-primary-600"
                >
                  <option value="">All</option>
                  {filter.options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
          
          {Object.keys(activeFilters).some(key => activeFilters[key]) && (
            <div className="mt-4">
              <button
                onClick={clearFilters}
                className="text-sm text-primary-600 hover:text-primary-700 font-medium"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}