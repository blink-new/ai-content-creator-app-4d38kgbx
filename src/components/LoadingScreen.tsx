import { Loader2 } from 'lucide-react'

export default function LoadingScreen() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-4" />
        <h2 className="text-lg font-medium text-foreground">Loading AI Content Creator...</h2>
        <p className="text-sm text-muted-foreground mt-2">Preparing your creative workspace</p>
      </div>
    </div>
  )
}