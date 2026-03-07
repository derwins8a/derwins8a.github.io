"use client"

import { useState, ReactNode } from "react"
import { Button } from "@/components/ui/button"

interface PaginatedListProps {
  items: ReactNode[]
  pageSize?: number
  gridClassName?: string
}

export function PaginatedList({ 
  items, 
  pageSize = 6,
  gridClassName = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
}: PaginatedListProps) {
  const [currentPage, setCurrentPage] = useState(1)
  
  const totalPages = Math.ceil(items.length / pageSize)
  const startIndex = (currentPage - 1) * pageSize
  const visibleItems = items.slice(startIndex, startIndex + pageSize)

  if (items.length === 0) {
    return <div className="py-12 text-center text-muted-foreground text-lg">No items found.</div>
  }

  return (
    <div className="space-y-8 mt-8">
      <div className={gridClassName}>
        {visibleItems.map((item, index) => (
          <div key={index}>
            {item}
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 pt-8">
          <Button 
            variant="outline" 
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
          >
            Previous
          </Button>
          <div className="text-sm text-muted-foreground px-4">
            Page {currentPage} of {totalPages}
          </div>
          <Button 
            variant="outline" 
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  )
}
