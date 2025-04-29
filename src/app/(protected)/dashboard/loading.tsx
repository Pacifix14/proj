import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="mx-auto max-w-7xl space-y-6 p-6">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <Skeleton className="h-8 w-[250px]" />
        <Skeleton className="h-10 w-[150px]" />
      </div>

      {/* Search and Filter Bar */}
      <div className="mb-8 flex gap-4">
        <Skeleton className="h-10 w-[220px]" />
        <Skeleton className="h-10 w-[150px]" />
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="space-y-4 rounded-lg border p-6">
            {/* Project Header */}
            <div className="flex items-center justify-between">
              <Skeleton className="h-6 w-[120px]" />
              <Skeleton className="h-6 w-[100px]" />
            </div>

            {/* Project Details */}
            <div className="space-y-3">
              {/* Contact Person */}
              <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-4" />
                <Skeleton className="h-4 w-[200px]" />
              </div>

              {/* Email */}
              <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-4" />
                <Skeleton className="h-4 w-[220px]" />
              </div>

              {/* Date Range */}
              <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-4" />
                <Skeleton className="h-4 w-[180px]" />
              </div>

              {/* Total Budgets */}
              <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-4" />
                <Skeleton className="h-4 w-[100px]" />
              </div>

              {/* Status Indicators */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-4 w-4" />
                  <Skeleton className="h-4 w-[80px]" />
                </div>
                <div className="flex items-center gap-2">
                  <Skeleton className="h-4 w-4" />
                  <Skeleton className="h-4 w-[80px]" />
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-4">
              <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-4" />
                <Skeleton className="h-4 w-[120px]" />
              </div>
              <Skeleton className="h-4 w-[50px]" />
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-8 flex items-center justify-center gap-4">
        <Skeleton className="h-10 w-[100px]" />
        <div className="flex gap-2">
          <Skeleton className="h-10 w-10" />
          <Skeleton className="h-10 w-10" />
        </div>
        <Skeleton className="h-10 w-[100px]" />
      </div>
    </div>
  );
}
