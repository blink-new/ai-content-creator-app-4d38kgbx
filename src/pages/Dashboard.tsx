import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Layout from '@/components/Layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  BookOpen, 
  Lightbulb, 
  PenTool, 
  Calendar, 
  BarChart3,
  TrendingUp,
  Users,
  Heart,
  MessageCircle,
  ArrowRight,
  Sparkles,
  CheckCircle,
  Clock
} from 'lucide-react'

export default function Dashboard() {
  const [stats] = useState({
    totalPosts: 24,
    engagement: 8.5,
    followers: 1247,
    likes: 892
  })

  const [recentContent] = useState([
    {
      id: 1,
      title: "5 Tips for Better Social Media Engagement",
      platform: "Instagram",
      status: "published",
      engagement: "12.3%",
      date: "2 hours ago"
    },
    {
      id: 2,
      title: "Behind the Scenes: Our Creative Process",
      platform: "LinkedIn",
      status: "scheduled",
      engagement: "-",
      date: "Tomorrow 9:00 AM"
    },
    {
      id: 3,
      title: "Quick Tutorial: Content Planning Made Easy",
      platform: "TikTok",
      status: "draft",
      engagement: "-",
      date: "Draft"
    }
  ])

  const quickActions = [
    {
      title: "Create Brand Guide",
      description: "Set up your brand voice and style",
      icon: BookOpen,
      href: "/brand-guide",
      color: "bg-blue-500"
    },
    {
      title: "Generate Ideas",
      description: "Get AI-powered content suggestions",
      icon: Lightbulb,
      href: "/content-ideas",
      color: "bg-yellow-500"
    },
    {
      title: "Create Content",
      description: "Write captions and create posts",
      icon: PenTool,
      href: "/content-creation",
      color: "bg-green-500"
    },
    {
      title: "Schedule Posts",
      description: "Plan your content calendar",
      icon: Calendar,
      href: "/content-calendar",
      color: "bg-purple-500"
    }
  ]

  return (
    <Layout>
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Sparkles className="h-6 w-6 text-primary" />
            <h1 className="text-3xl font-bold text-foreground">Welcome back!</h1>
          </div>
          <p className="text-muted-foreground">
            Let's create amazing content that resonates with your audience
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalPosts}</div>
              <p className="text-xs text-muted-foreground">
                +12% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Engagement Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.engagement}%</div>
              <p className="text-xs text-muted-foreground">
                +2.1% from last week
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Followers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.followers.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                +47 this week
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Likes</CardTitle>
              <Heart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.likes}</div>
              <p className="text-xs text-muted-foreground">
                +18% engagement
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>
                  Jump into your content creation workflow
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {quickActions.map((action) => (
                    <Link key={action.title} to={action.href}>
                      <div className="p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors cursor-pointer group">
                        <div className="flex items-start gap-3">
                          <div className={`p-2 rounded-lg ${action.color}`}>
                            <action.icon className="h-4 w-4 text-white" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium text-foreground group-hover:text-primary transition-colors">
                              {action.title}
                            </h3>
                            <p className="text-sm text-muted-foreground mt-1">
                              {action.description}
                            </p>
                          </div>
                          <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Content */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Recent Content</CardTitle>
                <CardDescription>
                  Your latest posts and drafts
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentContent.map((content) => (
                  <div key={content.id} className="flex items-start gap-3 p-3 rounded-lg border border-border">
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm text-foreground truncate">
                        {content.title}
                      </h4>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="secondary" className="text-xs">
                          {content.platform}
                        </Badge>
                        <div className="flex items-center gap-1">
                          {content.status === 'published' && (
                            <CheckCircle className="h-3 w-3 text-green-500" />
                          )}
                          {content.status === 'scheduled' && (
                            <Clock className="h-3 w-3 text-blue-500" />
                          )}
                          {content.status === 'draft' && (
                            <PenTool className="h-3 w-3 text-gray-500" />
                          )}
                          <span className="text-xs text-muted-foreground capitalize">
                            {content.status}
                          </span>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {content.engagement !== '-' && `${content.engagement} engagement • `}
                        {content.date}
                      </p>
                    </div>
                  </div>
                ))}
                
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/content-calendar">
                    View All Content
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Content Performance */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>This Week's Performance</CardTitle>
              <CardDescription>
                Track your content's impact across platforms
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm font-medium">Instagram</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-muted-foreground">8 posts</span>
                    <div className="w-24">
                      <Progress value={75} className="h-2" />
                    </div>
                    <span className="text-sm font-medium">7.5%</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm font-medium">LinkedIn</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-muted-foreground">5 posts</span>
                    <div className="w-24">
                      <Progress value={60} className="h-2" />
                    </div>
                    <span className="text-sm font-medium">6.2%</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span className="text-sm font-medium">TikTok</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-muted-foreground">3 posts</span>
                    <div className="w-24">
                      <Progress value={90} className="h-2" />
                    </div>
                    <span className="text-sm font-medium">12.1%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  )
}