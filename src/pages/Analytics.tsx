import { useState } from 'react'
import Layout from '@/components/Layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown,
  Users, 
  Heart, 
  MessageCircle,
  Share,
  Eye,
  Instagram,
  Linkedin,
  Twitter,
  Video,
  Calendar,
  Download,
  Clock,
  Hash
} from 'lucide-react'

export default function Analytics() {
  const [timeRange, setTimeRange] = useState('7d')
  const [selectedPlatform, setSelectedPlatform] = useState('all')

  const timeRanges = [
    { value: '7d', label: 'Last 7 days' },
    { value: '30d', label: 'Last 30 days' },
    { value: '90d', label: 'Last 90 days' },
    { value: '1y', label: 'Last year' }
  ]

  const platforms = [
    { value: 'all', label: 'All Platforms' },
    { value: 'instagram', label: 'Instagram' },
    { value: 'linkedin', label: 'LinkedIn' },
    { value: 'twitter', label: 'Twitter' },
    { value: 'tiktok', label: 'TikTok' }
  ]

  const overallStats = [
    {
      title: 'Total Reach',
      value: '24.5K',
      change: '+12.5%',
      trend: 'up',
      icon: Eye
    },
    {
      title: 'Engagement Rate',
      value: '8.7%',
      change: '+2.1%',
      trend: 'up',
      icon: Heart
    },
    {
      title: 'New Followers',
      value: '342',
      change: '+18.2%',
      trend: 'up',
      icon: Users
    },
    {
      title: 'Total Posts',
      value: '28',
      change: '+16.7%',
      trend: 'up',
      icon: BarChart3
    }
  ]

  const platformStats = [
    {
      platform: 'Instagram',
      icon: Instagram,
      color: 'bg-pink-500',
      posts: 12,
      reach: '15.2K',
      engagement: '9.2%',
      followers: '+89',
      topPost: '5 Tips for Better Engagement'
    },
    {
      platform: 'LinkedIn',
      icon: Linkedin,
      color: 'bg-blue-600',
      posts: 8,
      reach: '6.8K',
      engagement: '7.1%',
      followers: '+156',
      topPost: 'Industry Trends Analysis'
    },
    {
      platform: 'Twitter',
      icon: Twitter,
      color: 'bg-blue-400',
      posts: 5,
      reach: '2.1K',
      engagement: '5.8%',
      followers: '+67',
      topPost: 'Quick Productivity Tips'
    },
    {
      platform: 'TikTok',
      icon: Video,
      color: 'bg-black',
      posts: 3,
      reach: '8.4K',
      engagement: '12.3%',
      followers: '+234',
      topPost: 'Behind the Scenes Video'
    }
  ]

  const topPosts = [
    {
      id: 1,
      title: '5 Tips for Better Social Media Engagement',
      platform: 'Instagram',
      type: 'Carousel',
      reach: '5.2K',
      engagement: '12.3%',
      likes: 642,
      comments: 89,
      shares: 23,
      date: '2024-01-15'
    },
    {
      id: 2,
      title: 'Behind the Scenes: Our Creative Process',
      platform: 'TikTok',
      type: 'Video',
      reach: '8.1K',
      engagement: '15.7%',
      likes: 1274,
      comments: 156,
      shares: 89,
      date: '2024-01-14'
    },
    {
      id: 3,
      title: 'Industry Trends That Will Shape 2024',
      platform: 'LinkedIn',
      type: 'Article',
      reach: '3.8K',
      engagement: '8.9%',
      likes: 342,
      comments: 67,
      shares: 45,
      date: '2024-01-13'
    }
  ]

  const engagementData = [
    { day: 'Mon', instagram: 8.2, linkedin: 6.5, twitter: 4.8, tiktok: 11.2 },
    { day: 'Tue', instagram: 9.1, linkedin: 7.2, twitter: 5.3, tiktok: 12.8 },
    { day: 'Wed', instagram: 7.8, linkedin: 6.9, twitter: 4.9, tiktok: 10.5 },
    { day: 'Thu', instagram: 10.3, linkedin: 8.1, twitter: 6.2, tiktok: 13.9 },
    { day: 'Fri', instagram: 11.7, linkedin: 7.8, twitter: 5.7, tiktok: 15.2 },
    { day: 'Sat', instagram: 9.4, linkedin: 5.2, twitter: 4.1, tiktok: 12.1 },
    { day: 'Sun', instagram: 8.9, linkedin: 4.8, twitter: 3.9, tiktok: 11.8 }
  ]

  const getPlatformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'instagram': return Instagram
      case 'linkedin': return Linkedin
      case 'twitter': return Twitter
      case 'tiktok': return Video
      default: return BarChart3
    }
  }

  return (
    <Layout>
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <BarChart3 className="h-6 w-6 text-primary" />
                <h1 className="text-3xl font-bold text-foreground">Analytics</h1>
              </div>
              <p className="text-muted-foreground">
                Track your content performance and audience engagement
              </p>
            </div>
            <div className="flex gap-2">
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {timeRanges.map((range) => (
                    <SelectItem key={range.value} value={range.value}>
                      {range.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedPlatform} onValueChange={setSelectedPlatform}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {platforms.map((platform) => (
                    <SelectItem key={platform.value} value={platform.value}>
                      {platform.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </div>

        {/* Overall Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {overallStats.map((stat) => (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="flex items-center gap-1 text-xs">
                  {stat.trend === 'up' ? (
                    <TrendingUp className="h-3 w-3 text-green-500" />
                  ) : (
                    <TrendingDown className="h-3 w-3 text-red-500" />
                  )}
                  <span className={stat.trend === 'up' ? 'text-green-500' : 'text-red-500'}>
                    {stat.change}
                  </span>
                  <span className="text-muted-foreground">from last period</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Platform Performance */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Platform Performance</CardTitle>
                <CardDescription>
                  Compare performance across different social media platforms
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {platformStats.map((platform) => (
                    <div key={platform.platform} className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${platform.color}`}>
                            <platform.icon className="h-4 w-4 text-white" />
                          </div>
                          <div>
                            <h4 className="font-medium">{platform.platform}</h4>
                            <p className="text-sm text-muted-foreground">
                              {platform.posts} posts this period
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{platform.engagement}</p>
                          <p className="text-sm text-muted-foreground">engagement</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Reach</p>
                          <p className="font-medium">{platform.reach}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">New Followers</p>
                          <p className="font-medium text-green-600">{platform.followers}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Top Post</p>
                          <p className="font-medium truncate">{platform.topPost}</p>
                        </div>
                      </div>
                      
                      <Progress value={parseFloat(platform.engagement)} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Engagement Trends */}
            <Card>
              <CardHeader>
                <CardTitle>Engagement Trends</CardTitle>
                <CardDescription>
                  Daily engagement rates across platforms
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {engagementData.map((day) => (
                    <div key={day.day} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium">{day.day}</span>
                        <span className="text-muted-foreground">
                          Avg: {((day.instagram + day.linkedin + day.twitter + day.tiktok) / 4).toFixed(1)}%
                        </span>
                      </div>
                      <div className="grid grid-cols-4 gap-2">
                        <div className="space-y-1">
                          <div className="flex items-center gap-1">
                            <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                            <span className="text-xs">IG</span>
                          </div>
                          <Progress value={day.instagram} className="h-1" />
                          <span className="text-xs text-muted-foreground">{day.instagram}%</span>
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center gap-1">
                            <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                            <span className="text-xs">LI</span>
                          </div>
                          <Progress value={day.linkedin} className="h-1" />
                          <span className="text-xs text-muted-foreground">{day.linkedin}%</span>
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center gap-1">
                            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                            <span className="text-xs">TW</span>
                          </div>
                          <Progress value={day.twitter} className="h-1" />
                          <span className="text-xs text-muted-foreground">{day.twitter}%</span>
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center gap-1">
                            <div className="w-2 h-2 bg-black rounded-full"></div>
                            <span className="text-xs">TT</span>
                          </div>
                          <Progress value={day.tiktok} className="h-1" />
                          <span className="text-xs text-muted-foreground">{day.tiktok}%</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Top Performing Posts */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Top Performing Posts</CardTitle>
                <CardDescription>
                  Your best content from this period
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {topPosts.map((post, index) => {
                  const PlatformIcon = getPlatformIcon(post.platform)
                  
                  return (
                    <div key={post.id} className="p-4 border border-border rounded-lg">
                      <div className="flex items-start gap-3 mb-3">
                        <div className="flex items-center justify-center w-6 h-6 bg-primary text-primary-foreground rounded-full text-xs font-bold">
                          {index + 1}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sm line-clamp-2 mb-1">
                            {post.title}
                          </h4>
                          <div className="flex items-center gap-2 mb-2">
                            <PlatformIcon className="h-3 w-3" />
                            <span className="text-xs text-muted-foreground">
                              {post.platform} • {post.type}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-2 text-xs">
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Reach</span>
                          <span className="font-medium">{post.reach}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Engagement</span>
                          <span className="font-medium text-green-600">{post.engagement}</span>
                        </div>
                        
                        <div className="flex items-center justify-between pt-2 border-t border-border">
                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1">
                              <Heart className="h-3 w-3 text-red-500" />
                              <span>{post.likes}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MessageCircle className="h-3 w-3 text-blue-500" />
                              <span>{post.comments}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Share className="h-3 w-3 text-green-500" />
                              <span>{post.shares}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </CardContent>
            </Card>

            {/* Quick Insights */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Quick Insights</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <TrendingUp className="h-4 w-4 text-green-600" />
                    <span className="text-sm font-medium text-green-800">Best Day</span>
                  </div>
                  <p className="text-xs text-green-700">
                    Friday posts get 23% more engagement
                  </p>
                </div>
                
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <Clock className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-medium text-blue-800">Best Time</span>
                  </div>
                  <p className="text-xs text-blue-700">
                    Post between 2-4 PM for maximum reach
                  </p>
                </div>
                
                <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <Hash className="h-4 w-4 text-purple-600" />
                    <span className="text-sm font-medium text-purple-800">Top Hashtag</span>
                  </div>
                  <p className="text-xs text-purple-700">
                    #contentcreator drives 34% more reach
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  )
}