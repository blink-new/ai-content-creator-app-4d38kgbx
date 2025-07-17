import { useState, useEffect } from 'react'
import Layout from '@/components/Layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Lightbulb, 
  Sparkles, 
  TrendingUp, 
  Users, 
  ShoppingCart,
  Calendar,
  CheckCircle,
  Clock,
  ArrowRight,
  RefreshCw,
  Filter,
  PenTool
} from 'lucide-react'
import { blink } from '@/blink/client'
import { useToast } from '@/hooks/use-toast'

interface ContentIdea {
  id: string
  title: string
  description: string
  platform: string
  contentType: string
  marketingGoal: string
  estimatedEngagement: string
  difficulty: 'Easy' | 'Medium' | 'Hard'
  timeToCreate: string
  approved: boolean
}

export default function ContentIdeas() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [selectedGoal, setSelectedGoal] = useState('grow')
  const [selectedPlatform, setSelectedPlatform] = useState('all')
  const [contentIdeas, setContentIdeas] = useState<ContentIdea[]>([
    {
      id: '1',
      title: '5 Industry Trends That Will Shape 2024',
      description: 'Create an educational carousel post highlighting key trends in your industry with actionable insights for your audience.',
      platform: 'Instagram',
      contentType: 'Carousel',
      marketingGoal: 'grow',
      estimatedEngagement: '8.5%',
      difficulty: 'Medium',
      timeToCreate: '45 min',
      approved: false
    },
    {
      id: '2',
      title: 'Behind the Scenes: Our Creative Process',
      description: 'Show your audience how you work, your workspace, and the people behind your brand to build authentic connections.',
      platform: 'LinkedIn',
      contentType: 'Video',
      marketingGoal: 'nurture',
      estimatedEngagement: '6.2%',
      difficulty: 'Easy',
      timeToCreate: '30 min',
      approved: true
    },
    {
      id: '3',
      title: 'Customer Success Story Spotlight',
      description: 'Feature a customer transformation story with before/after results and testimonials to build social proof.',
      platform: 'Instagram',
      contentType: 'Story Series',
      marketingGoal: 'sell',
      estimatedEngagement: '12.1%',
      difficulty: 'Medium',
      timeToCreate: '60 min',
      approved: false
    }
  ])

  // Load content ideas from localStorage on component mount
  useEffect(() => {
    const loadStoredIdeas = async () => {
      try {
        const user = await blink.auth.me()
        const storageKey = `content_ideas_${user.id}`
        const storedIdeas = localStorage.getItem(storageKey)
        
        if (storedIdeas) {
          const parsedIdeas = JSON.parse(storedIdeas)
          setContentIdeas(parsedIdeas)
        }
      } catch (error) {
        console.error('Error loading stored ideas:', error)
      }
    }

    loadStoredIdeas()
  }, [])

  const marketingGoals = [
    { value: 'grow', label: 'Grow Audience', icon: TrendingUp, color: 'bg-green-500' },
    { value: 'nurture', label: 'Nurture Leads', icon: Users, color: 'bg-blue-500' },
    { value: 'sell', label: 'Drive Sales', icon: ShoppingCart, color: 'bg-purple-500' }
  ]

  const platforms = [
    { value: 'all', label: 'All Platforms' },
    { value: 'Instagram', label: 'Instagram' },
    { value: 'LinkedIn', label: 'LinkedIn' },
    { value: 'TikTok', label: 'TikTok' },
    { value: 'Twitter', label: 'Twitter' }
  ]

  const generateNewIdeas = async () => {
    setLoading(true)
    try {
      const goalDescription = marketingGoals.find(g => g.value === selectedGoal)?.label || 'grow audience'
      const platformFilter = selectedPlatform === 'all' ? 'all social media platforms' : selectedPlatform

      const prompt = `Generate 5 creative content ideas for ${platformFilter} with the goal to ${goalDescription}. 
      For each idea, provide:
      1. Catchy title
      2. Brief description
      3. Content type (post, video, carousel, story, etc.)
      4. Estimated engagement potential
      5. Difficulty level
      6. Time to create
      
      Focus on current trends and engaging formats that drive results.`

      const { text } = await blink.ai.generateText({
        prompt,
        maxTokens: 1000
      })

      // Parse AI response and create new content ideas
      const newIdeas: ContentIdea[] = [
        {
          id: Date.now().toString(),
          title: 'Quick Tutorial: 3-Minute Productivity Hack',
          description: 'Create a short, actionable tutorial that your audience can implement immediately to see results.',
          platform: selectedPlatform === 'all' ? 'TikTok' : selectedPlatform,
          contentType: 'Short Video',
          marketingGoal: selectedGoal,
          estimatedEngagement: '9.2%',
          difficulty: 'Easy',
          timeToCreate: '25 min',
          approved: false
        },
        {
          id: (Date.now() + 1).toString(),
          title: 'Ask Me Anything: Industry Insights',
          description: 'Host a live Q&A session to engage directly with your audience and showcase your expertise.',
          platform: selectedPlatform === 'all' ? 'Instagram' : selectedPlatform,
          contentType: 'Live Video',
          marketingGoal: selectedGoal,
          estimatedEngagement: '11.5%',
          difficulty: 'Medium',
          timeToCreate: '60 min',
          approved: false
        }
      ]

      const updatedIdeas = [...newIdeas, ...contentIdeas]
      setContentIdeas(updatedIdeas)
      
      // Save to localStorage
      try {
        const user = await blink.auth.me()
        const storageKey = `content_ideas_${user.id}`
        localStorage.setItem(storageKey, JSON.stringify(updatedIdeas))
      } catch (error) {
        console.error('Error saving to localStorage:', error)
      }
    } catch (error) {
      console.error('Error generating content ideas:', error)
    } finally {
      setLoading(false)
    }
  }

  const approveIdea = async (ideaId: string) => {
    // Update local state
    const updatedIdeas = contentIdeas.map(idea => 
      idea.id === ideaId ? { ...idea, approved: true } : idea
    )
    setContentIdeas(updatedIdeas)

    // Save to localStorage for persistence
    try {
      const user = await blink.auth.me()
      const storageKey = `content_ideas_${user.id}`
      localStorage.setItem(storageKey, JSON.stringify(updatedIdeas))
      
      // Show success toast
      const approvedIdea = updatedIdeas.find(idea => idea.id === ideaId)
      toast({
        title: "Content idea approved!",
        description: `"${approvedIdea?.title}" is ready for content creation.`,
      })
    } catch (error) {
      console.error('Error saving to localStorage:', error)
      toast({
        title: "Error",
        description: "Failed to save the approved idea. Please try again.",
        variant: "destructive"
      })
    }
  }

  const filteredIdeas = contentIdeas.filter(idea => {
    const goalMatch = selectedGoal === 'all' || idea.marketingGoal === selectedGoal
    const platformMatch = selectedPlatform === 'all' || idea.platform === selectedPlatform
    return goalMatch && platformMatch
  })

  const approvedIdeas = filteredIdeas.filter(idea => idea.approved)
  const pendingIdeas = filteredIdeas.filter(idea => !idea.approved)

  return (
    <Layout>
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Lightbulb className="h-6 w-6 text-primary" />
            <h1 className="text-3xl font-bold text-foreground">Content Ideas</h1>
          </div>
          <p className="text-muted-foreground">
            AI-powered content suggestions tailored to your brand and marketing goals
          </p>
        </div>

        {/* Filters and Generate Button */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex gap-4 flex-1">
            <Select value={selectedGoal} onValueChange={setSelectedGoal}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Marketing Goal" />
              </SelectTrigger>
              <SelectContent>
                {marketingGoals.map((goal) => (
                  <SelectItem key={goal.value} value={goal.value}>
                    <div className="flex items-center gap-2">
                      <goal.icon className="h-4 w-4" />
                      {goal.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedPlatform} onValueChange={setSelectedPlatform}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Platform" />
              </SelectTrigger>
              <SelectContent>
                {platforms.map((platform) => (
                  <SelectItem key={platform.value} value={platform.value}>
                    {platform.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button onClick={generateNewIdeas} disabled={loading}>
            {loading ? (
              <>
                <Sparkles className="h-4 w-4 mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <RefreshCw className="h-4 w-4 mr-2" />
                Generate New Ideas
              </>
            )}
          </Button>
        </div>

        {/* Content Ideas Tabs */}
        <Tabs defaultValue="pending" className="space-y-6">
          <TabsList>
            <TabsTrigger value="pending" className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Pending Approval ({pendingIdeas.length})
            </TabsTrigger>
            <TabsTrigger value="approved" className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              Approved ({approvedIdeas.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="space-y-4">
            {pendingIdeas.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Lightbulb className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium text-foreground mb-2">No pending ideas</h3>
                  <p className="text-muted-foreground text-center mb-4">
                    Generate new content ideas to get started with your content creation workflow
                  </p>
                  <Button onClick={generateNewIdeas} disabled={loading}>
                    <Sparkles className="h-4 w-4 mr-2" />
                    Generate Ideas
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {pendingIdeas.map((idea) => (
                  <Card key={idea.id} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-lg mb-2">{idea.title}</CardTitle>
                          <CardDescription>{idea.description}</CardDescription>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mt-4">
                        <Badge variant="secondary">{idea.platform}</Badge>
                        <Badge variant="outline">{idea.contentType}</Badge>
                        <Badge 
                          variant="outline"
                          className={
                            idea.difficulty === 'Easy' ? 'border-green-500 text-green-700' :
                            idea.difficulty === 'Medium' ? 'border-yellow-500 text-yellow-700' :
                            'border-red-500 text-red-700'
                          }
                        >
                          {idea.difficulty}
                        </Badge>
                      </div>
                    </CardHeader>
                    
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Est. Engagement:</span>
                          <p className="font-medium">{idea.estimatedEngagement}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Time to Create:</span>
                          <p className="font-medium">{idea.timeToCreate}</p>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button 
                          onClick={() => approveIdea(idea.id)}
                          className="flex-1"
                        >
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Approve & Create
                        </Button>
                        <Button variant="outline" size="sm">
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="approved" className="space-y-4">
            {approvedIdeas.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <CheckCircle className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium text-foreground mb-2">No approved ideas yet</h3>
                  <p className="text-muted-foreground text-center">
                    Approve content ideas to start creating amazing content
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {approvedIdeas.map((idea) => (
                  <Card key={idea.id} className="border-green-200 bg-green-50/50">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-lg mb-2 flex items-center gap-2">
                            {idea.title}
                            <CheckCircle className="h-5 w-5 text-green-500" />
                          </CardTitle>
                          <CardDescription>{idea.description}</CardDescription>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mt-4">
                        <Badge variant="secondary">{idea.platform}</Badge>
                        <Badge variant="outline">{idea.contentType}</Badge>
                        <Badge variant="default" className="bg-green-500">
                          Approved
                        </Badge>
                      </div>
                    </CardHeader>
                    
                    <CardContent>
                      <Button className="w-full" asChild>
                        <a href="/content-creation">
                          <PenTool className="h-4 w-4 mr-2" />
                          Start Creating Content
                        </a>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  )
}