import dynamic from "next/dynamic"

const Example = dynamic(() => import("@/components/Example"), {
  loading: () => (
    <div className="p-4 bg-blue-100 rounded-lg animate-pulse">
      <div className="h-8 w-48 bg-blue-200 rounded mb-4"></div>
      <div className="h-4 w-64 bg-blue-200 rounded"></div>
    </div>
  ),
})

export default function Homepage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Dynamic Import Demo</h1>
      <Example />
    </div>
  )
}