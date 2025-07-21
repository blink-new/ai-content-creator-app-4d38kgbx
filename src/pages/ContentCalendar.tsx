import { useState } from 'react'
import Layout from '@/components/Layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Calendar } from '@/components/ui/calendar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { 
  Calendar as CalendarIcon, 
  Clock, 
  CheckCircle, 
  Edit, 
  Trash2,
  Instagram,
  Linkedin,
  Twitter,
  Video,
  Plus,
  Filter,
  MoreHorizontal,
  Grid3X3,
  List,
  Eye,
  TrendingUp,
  Users,
  Heart,
  MessageCircle,
  Share,
  BarChart3
} from 'lucide-react'

interface ContentPost {
  id: string
  title: string
  platform: string
  contentType: string
  status: 'draft' | 'scheduled' | 'published'
  scheduledDate: string
  scheduledTime: string
  engagement?: string
  likes?: number
  comments?: number
  shares?: number
  reach?: number
  thumbnail?: string
}

const platforms = [
  { id: 'all', name: 'All Platforms', icon: Grid3X3, color: 'bg-gray-500' },
  { id: 'instagram', name: 'Instagram', icon: Instagram, color: 'bg-gradient-to-r from-purple-500 to-pink-500' },
  { id: 'linkedin', name: 'LinkedIn', icon: Linkedin, color: 'bg-blue-600' },
  { id: 'twitter', name: 'Twitter', icon: Twitter, color: 'bg-blue-400' },
  { id: 'tiktok', name: 'TikTok', icon: Video, color: 'bg-black' },
]

export default function ContentCalendar() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [viewMode, setViewMode] = useState<'calendar' | 'list' | 'grid'>('grid')
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(['all'])
  
  const [contentPosts] = useState<ContentPost[]>([
    {
      id: '1',
      title: '5 Tips for Better Social Media Engagement',
      platform: 'Instagram',
      contentType: 'Carousel',
      status: 'published',
      scheduledDate: '2024-01-15',
      scheduledTime: '09:00',
      engagement: '12.3%',
      likes: 1240,
      comments: 89,
      shares: 45,
      reach: 8500,
      thumbnail: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=400&fit=crop'
    },
    {
      id: '2',
      title: 'Behind the Scenes: Our Creative Process',
      platform: 'LinkedIn',
      contentType: 'Video',
      status: 'scheduled',
      scheduledDate: '2024-01-16',
      scheduledTime: '14:00',
      thumbnail: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=400&fit=crop'
    },
    {
      id: '3',
      title: 'Quick Tutorial: Content Planning Made Easy',
      platform: 'TikTok',
      contentType: 'Video',
      status: 'draft',
      scheduledDate: '2024-01-17',
      scheduledTime: '18:00',
      thumbnail: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=400&fit=crop'
    },
    {
      id: '4',
      title: 'Customer Success Story Spotlight',
      platform: 'Instagram',
      contentType: 'Story',
      status: 'scheduled',
      scheduledDate: '2024-01-18',
      scheduledTime: '11:00',
      thumbnail: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=400&fit=crop'
    },
    {
      id: '5',
      title: 'Industry Trends for 2024',
      platform: 'Twitter',
      contentType: 'Thread',
      status: 'draft',
      scheduledDate: '2024-01-19',
      scheduledTime: '10:00'
    },
    {
      id: '6',
      title: 'Team Building Workshop Highlights',
      platform: 'LinkedIn',
      contentType: 'Post',
      status: 'published',
      scheduledDate: '2024-01-14',
      scheduledTime: '16:00',
      engagement: '8.7%',
      likes: 567,
      comments: 34,
      shares: 23,
      reach: 4200,
      thumbnail: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=400&fit=crop'
    }
  ])

  const getPlatformIcon = (platform: string) => {
    const platformData = platforms.find(p => p.name === platform)
    return platformData?.icon || Instagram
  }

  const getPlatformColor = (platform: string) => {
    const platformData = platforms.find(p => p.name === platform)
    return platformData?.color || 'bg-gray-500'
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-emerald-500'
      case 'scheduled': return 'bg-blue-500'
      case 'draft': return 'bg-amber-500'
      default: return 'bg-gray-500'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'published': return CheckCircle
      case 'scheduled': return Clock
      case 'draft': return Edit
      default: return Edit
    }
  }

  const filteredPosts = contentPosts.filter(post => {
    if (selectedPlatforms.includes('all')) return true
    return selectedPlatforms.some(platform => 
      platforms.find(p => p.id === platform)?.name === post.platform
    )
  })

  const getPostsForDate = (date: Date) => {
    const dateString = date.toISOString().split('T')[0]
    return filteredPosts.filter(post => post.scheduledDate === dateString)
  }

  const upcomingPosts = filteredPosts
    .filter(post => post.status === 'scheduled')
    .sort((a, b) => new Date(a.scheduledDate + ' ' + a.scheduledTime).getTime() - new Date(b.scheduledDate + ' ' + b.scheduledTime).getTime())

  const draftPosts = filteredPosts.filter(post => post.status === 'draft')
  const publishedPosts = filteredPosts.filter(post => post.status === 'published')

  const totalEngagement = publishedPosts.reduce((sum, post) => {
    return sum + (post.likes || 0) + (post.comments || 0) + (post.shares || 0)
  }, 0)

  const totalReach = publishedPosts.reduce((sum, post) => sum + (post.reach || 0), 0)

  return (
    <Layout>
      <div className="p-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <CalendarIcon className="h-6 w-6 text-primary" />
                </div>
                <h1 className="text-3xl font-bold text-foreground">Content Calendar</h1>
              </div>
              <p className="text-muted-foreground">
                Plan, schedule, and track your content across all platforms
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                Filter
              </Button>
              <Button className="gap-2 bg-primary hover:bg-primary/90">
                <Plus className="h-4 w-4" />
                Create Content
              </Button>
            </div>
          </div>
        </div>

        {/* Platform Filter */}
        <div className="mb-6">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-sm font-medium text-foreground">Platforms:</span>
            <ToggleGroup 
              type="multiple" 
              value={selectedPlatforms} 
              onValueChange={(value) => {
                if (value.includes('all')) {
                  setSelectedPlatforms(['all'])
                } else if (value.length === 0) {
                  setSelectedPlatforms(['all'])
                } else {
                  setSelectedPlatforms(value.filter(v => v !== 'all'))
                }
              }}
              className="gap-2"
            >
              {platforms.map((platform) => {
                const Icon = platform.icon
                const isSelected = selectedPlatforms.includes(platform.id)
                
                return (
                  <ToggleGroupItem
                    key={platform.id}
                    value={platform.id}
                    className={`gap-2 px-4 py-2 rounded-lg border transition-all ${
                      isSelected 
                        ? 'bg-primary text-primary-foreground border-primary' 
                        : 'bg-background hover:bg-muted border-border'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {platform.name}
                  </ToggleGroupItem>
                )
              })}
            </ToggleGroup>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Clock className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{upcomingPosts.length}</p>
                  <p className="text-sm text-muted-foreground">Scheduled</p>
                </div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-amber-100 rounded-lg">
                  <Edit className="h-4 w-4 text-amber-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{draftPosts.length}</p>
                  <p className="text-sm text-muted-foreground">Drafts</p>
                </div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-100 rounded-lg">
                  <TrendingUp className="h-4 w-4 text-emerald-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{totalEngagement.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">Total Engagement</p>
                </div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Users className="h-4 w-4 text-purple-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{totalReach.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">Total Reach</p>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* View Toggle */}
        <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as 'calendar' | 'list' | 'grid')} className="mb-6">
          <TabsList className="grid w-fit grid-cols-3">
            <TabsTrigger value="grid" className="gap-2">
              <Grid3X3 className="h-4 w-4" />
              Grid
            </TabsTrigger>
            <TabsTrigger value="calendar" className="gap-2">
              <CalendarIcon className="h-4 w-4" />
              Calendar
            </TabsTrigger>
            <TabsTrigger value="list" className="gap-2">
              <List className="h-4 w-4" />
              List
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Content Views */}
        {viewMode === 'grid' && (
          <div className="space-y-8">
            {/* Scheduled Posts Grid */}
            {upcomingPosts.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Clock className="h-5 w-5 text-blue-500" />
                  Scheduled Posts
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {upcomingPosts.map((post) => {
                    const PlatformIcon = getPlatformIcon(post.platform)
                    
                    return (
                      <Card key={post.id} className="group hover:shadow-lg transition-all duration-200 overflow-hidden">
                        <div className="relative">
                          {post.thumbnail ? (
                            <img 
                              src={post.thumbnail} 
                              alt={post.title}
                              className="w-full h-48 object-cover"
                            />
                          ) : (
                            <div className="w-full h-48 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                              <PlatformIcon className="h-12 w-12 text-primary/60" />
                            </div>
                          )}
                          
                          {/* Platform Badge */}
                          <div className={`absolute top-3 left-3 p-1.5 rounded-lg ${getPlatformColor(post.platform)}`}>
                            <PlatformIcon className="h-3 w-3 text-white" />
                          </div>
                          
                          {/* Status Badge */}
                          <div className="absolute top-3 right-3">
                            <Badge className={`${getStatusColor(post.status)} text-white border-0`}>
                              <Clock className="h-3 w-3 mr-1" />
                              Scheduled
                            </Badge>
                          </div>
                          
                          {/* Hover Actions */}
                          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                            <Button size="sm" variant="secondary">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="secondary">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="secondary">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        
                        <CardContent className="p-4">
                          <h4 className="font-medium text-foreground mb-2 line-clamp-2">
                            {post.title}
                          </h4>
                          <div className="flex items-center justify-between text-sm text-muted-foreground">
                            <span>{post.platform}</span>
                            <span>{new Date(post.scheduledDate + ' ' + post.scheduledTime).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-xs text-muted-foreground">{post.scheduledTime}</span>
                            <Badge variant="outline" className="text-xs">
                              {post.contentType}
                            </Badge>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Published Posts Grid */}
            {publishedPosts.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-emerald-500" />
                  Published Posts
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {publishedPosts.map((post) => {
                    const PlatformIcon = getPlatformIcon(post.platform)
                    
                    return (
                      <Card key={post.id} className="group hover:shadow-lg transition-all duration-200 overflow-hidden">
                        <div className="relative">
                          {post.thumbnail ? (
                            <img 
                              src={post.thumbnail} 
                              alt={post.title}
                              className="w-full h-48 object-cover"
                            />
                          ) : (
                            <div className="w-full h-48 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                              <PlatformIcon className="h-12 w-12 text-primary/60" />
                            </div>
                          )}
                          
                          {/* Platform Badge */}
                          <div className={`absolute top-3 left-3 p-1.5 rounded-lg ${getPlatformColor(post.platform)}`}>
                            <PlatformIcon className="h-3 w-3 text-white" />
                          </div>
                          
                          {/* Status Badge */}
                          <div className="absolute top-3 right-3">
                            <Badge className="bg-emerald-500 text-white border-0">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Published
                            </Badge>
                          </div>
                          
                          {/* Hover Actions */}
                          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                            <Button size="sm" variant="secondary">
                              <BarChart3 className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="secondary">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="secondary">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        
                        <CardContent className="p-4">
                          <h4 className="font-medium text-foreground mb-2 line-clamp-2">
                            {post.title}
                          </h4>
                          <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                            <span>{post.platform}</span>
                            <span>{new Date(post.scheduledDate).toLocaleDateString()}</span>
                          </div>
                          
                          {/* Engagement Stats */}
                          <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <div className="flex items-center gap-3">
                              {post.likes && (
                                <div className="flex items-center gap-1">
                                  <Heart className="h-3 w-3" />
                                  {post.likes}
                                </div>
                              )}
                              {post.comments && (
                                <div className="flex items-center gap-1">
                                  <MessageCircle className="h-3 w-3" />
                                  {post.comments}
                                </div>
                              )}
                              {post.shares && (
                                <div className="flex items-center gap-1">
                                  <Share className="h-3 w-3" />
                                  {post.shares}
                                </div>
                              )}
                            </div>
                            {post.engagement && (
                              <Badge variant="outline" className="text-emerald-600 border-emerald-200">
                                {post.engagement}
                              </Badge>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Draft Posts Grid */}
            {draftPosts.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Edit className="h-5 w-5 text-amber-500" />
                  Draft Posts
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {draftPosts.map((post) => {
                    const PlatformIcon = getPlatformIcon(post.platform)
                    
                    return (
                      <Card key={post.id} className="group hover:shadow-lg transition-all duration-200 overflow-hidden border-dashed">
                        <div className="relative">
                          {post.thumbnail ? (
                            <img 
                              src={post.thumbnail} 
                              alt={post.title}
                              className="w-full h-48 object-cover opacity-60"
                            />
                          ) : (
                            <div className="w-full h-48 bg-gradient-to-br from-amber/20 to-orange/20 flex items-center justify-center">
                              <PlatformIcon className="h-12 w-12 text-amber-500/60" />
                            </div>
                          )}
                          
                          {/* Platform Badge */}
                          <div className={`absolute top-3 left-3 p-1.5 rounded-lg ${getPlatformColor(post.platform)} opacity-80`}>
                            <PlatformIcon className="h-3 w-3 text-white" />
                          </div>
                          
                          {/* Status Badge */}
                          <div className="absolute top-3 right-3">
                            <Badge className="bg-amber-500 text-white border-0">
                              <Edit className="h-3 w-3 mr-1" />
                              Draft
                            </Badge>
                          </div>
                          
                          {/* Hover Actions */}
                          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                            <Button size="sm" variant="secondary">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="secondary">
                              <Clock className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="secondary">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        
                        <CardContent className="p-4">
                          <h4 className="font-medium text-foreground mb-2 line-clamp-2">
                            {post.title}
                          </h4>
                          <div className="flex items-center justify-between text-sm text-muted-foreground">
                            <span>{post.platform}</span>
                            <Badge variant="outline" className="text-xs">
                              {post.contentType}
                            </Badge>
                          </div>
                          <Button size="sm" className="w-full mt-3" variant="outline">
                            Continue Editing
                          </Button>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {viewMode === 'calendar' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Calendar */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Content Calendar</CardTitle>
                  <CardDescription>
                    Click on a date to see scheduled content
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="rounded-md border"
                  />
                </CardContent>
              </Card>
            </div>

            {/* Selected Date Content */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>
                    {selectedDate ? selectedDate.toLocaleDateString() : 'Select a date'}
                  </CardTitle>
                  <CardDescription>
                    Scheduled content for this day
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {selectedDate ? (
                    <div className="space-y-4">
                      {getPostsForDate(selectedDate).length === 0 ? (
                        <div className="text-center py-8">
                          <CalendarIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                          <p className="text-muted-foreground">No content scheduled for this day</p>
                          <Button variant="outline" size="sm" className="mt-2">
                            <Plus className="h-4 w-4 mr-2" />
                            Add Content
                          </Button>
                        </div>
                      ) : (
                        getPostsForDate(selectedDate).map((post) => {
                          const PlatformIcon = getPlatformIcon(post.platform)
                          const StatusIcon = getStatusIcon(post.status)
                          
                          return (
                            <div key={post.id} className="p-3 border border-border rounded-lg">
                              <div className="flex items-start justify-between mb-2">
                                <div className="flex items-center gap-2">
                                  <div className={`p-1 rounded ${getPlatformColor(post.platform)}`}>
                                    <PlatformIcon className="h-3 w-3 text-white" />
                                  </div>
                                  <span className="text-xs font-medium">{post.platform}</span>
                                </div>
                                <Badge variant="outline" className="text-xs">
                                  {post.scheduledTime}
                                </Badge>
                              </div>
                              
                              <h4 className="font-medium text-sm mb-2 line-clamp-2">
                                {post.title}
                              </h4>
                              
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-1">
                                  <StatusIcon className={`h-3 w-3 ${post.status === 'published' ? 'text-emerald-500' : post.status === 'scheduled' ? 'text-blue-500' : 'text-amber-500'}`} />
                                  <span className="text-xs text-muted-foreground capitalize">
                                    {post.status}
                                  </span>
                                </div>
                                <Button variant="ghost" size="sm">
                                  <MoreHorizontal className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          )
                        })
                      )}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <CalendarIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">Select a date to view content</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {viewMode === 'list' && (
          <div className="space-y-6">
            {/* Upcoming Posts */}
            {upcomingPosts.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-blue-500" />
                    Upcoming Posts ({upcomingPosts.length})
                  </CardTitle>
                  <CardDescription>
                    Content scheduled to be published
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {upcomingPosts.map((post) => {
                      const PlatformIcon = getPlatformIcon(post.platform)
                      
                      return (
                        <div key={post.id} className="flex items-center gap-4 p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                          {post.thumbnail ? (
                            <img 
                              src={post.thumbnail} 
                              alt={post.title}
                              className="w-16 h-16 object-cover rounded-lg"
                            />
                          ) : (
                            <div className={`w-16 h-16 rounded-lg ${getPlatformColor(post.platform)} flex items-center justify-center`}>
                              <PlatformIcon className="h-6 w-6 text-white" />
                            </div>
                          )}
                          
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-foreground truncate">
                              {post.title}
                            </h4>
                            <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                              <span>{post.platform}</span>
                              <span>•</span>
                              <span>{post.contentType}</span>
                              <span>•</span>
                              <span>{new Date(post.scheduledDate + ' ' + post.scheduledTime).toLocaleString()}</span>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                              Scheduled
                            </Badge>
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Published Posts */}
            {publishedPosts.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-emerald-500" />
                    Published Posts ({publishedPosts.length})
                  </CardTitle>
                  <CardDescription>
                    Recently published content and performance
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {publishedPosts.map((post) => {
                      const PlatformIcon = getPlatformIcon(post.platform)
                      
                      return (
                        <div key={post.id} className="flex items-center gap-4 p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                          {post.thumbnail ? (
                            <img 
                              src={post.thumbnail} 
                              alt={post.title}
                              className="w-16 h-16 object-cover rounded-lg"
                            />
                          ) : (
                            <div className={`w-16 h-16 rounded-lg ${getPlatformColor(post.platform)} flex items-center justify-center`}>
                              <PlatformIcon className="h-6 w-6 text-white" />
                            </div>
                          )}
                          
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-foreground truncate">
                              {post.title}
                            </h4>
                            <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                              <span>{post.platform}</span>
                              <span>•</span>
                              <span>{post.contentType}</span>
                              {post.engagement && (
                                <>
                                  <span>•</span>
                                  <span className="text-emerald-600 font-medium">{post.engagement} engagement</span>
                                </>
                              )}
                            </div>
                            {(post.likes || post.comments || post.shares) && (
                              <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                                {post.likes && (
                                  <div className="flex items-center gap-1">
                                    <Heart className="h-3 w-3" />
                                    {post.likes.toLocaleString()}
                                  </div>
                                )}
                                {post.comments && (
                                  <div className="flex items-center gap-1">
                                    <MessageCircle className="h-3 w-3" />
                                    {post.comments}
                                  </div>
                                )}
                                {post.shares && (
                                  <div className="flex items-center gap-1">
                                    <Share className="h-3 w-3" />
                                    {post.shares}
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <Badge variant="default" className="bg-emerald-100 text-emerald-700">
                              Published
                            </Badge>
                            <Button variant="ghost" size="sm">
                              <BarChart3 className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Draft Posts */}
            {draftPosts.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Edit className="h-5 w-5 text-amber-500" />
                    Draft Posts ({draftPosts.length})
                  </CardTitle>
                  <CardDescription>
                    Content that needs to be completed
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {draftPosts.map((post) => {
                      const PlatformIcon = getPlatformIcon(post.platform)
                      
                      return (
                        <div key={post.id} className="flex items-center gap-4 p-4 border border-dashed border-border rounded-lg hover:bg-muted/50 transition-colors">
                          {post.thumbnail ? (
                            <img 
                              src={post.thumbnail} 
                              alt={post.title}
                              className="w-16 h-16 object-cover rounded-lg opacity-60"
                            />
                          ) : (
                            <div className={`w-16 h-16 rounded-lg ${getPlatformColor(post.platform)} opacity-60 flex items-center justify-center`}>
                              <PlatformIcon className="h-6 w-6 text-white" />
                            </div>
                          )}
                          
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-foreground truncate">
                              {post.title}
                            </h4>
                            <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                              <span>{post.platform}</span>
                              <span>•</span>
                              <span>{post.contentType}</span>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-amber-600 border-amber-200">
                              Draft
                            </Badge>
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>
    </Layout>
  )
}