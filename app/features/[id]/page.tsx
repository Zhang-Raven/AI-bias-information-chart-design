import FeaturePage from "./FeaturePage"

// All five feature pages are known at build time, so Pages can serve static files.
export function generateStaticParams() {
  return Array.from({ length: 5 }, (_, id) => ({ id: String(id) }))
}

export default function Page() {
  return <FeaturePage />
}
