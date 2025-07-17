import { useState } from 'react'
import Layout from '@/components/Layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Calendar } from '@/components/ui/calendar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
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
  MoreHorizontal
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
}

export default function ContentCalendar() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [viewMode, setViewMode] = useState<'calendar' | 'list'>('calendar')
  
  const [contentPosts] = useState<ContentPost[]>([
    {
      id: '1',
      title: '5 Tips for Better Social Media Engagement',
      platform: 'Instagram',
      contentType: 'Carousel',
      status: 'published',
      scheduledDate: '2024-01-15',
      scheduledTime: '09:00',
      engagement: '12.3%'
    },
    {
      id: '2',
      title: 'Behind the Scenes: Our Creative Process',
      platform: 'LinkedIn',
      contentType: 'Video',
      status: 'scheduled',
      scheduledDate: '2024-01-16',
      scheduledTime: '14:00'
    },
    {
      id: '3',
      title: 'Quick Tutorial: Content Planning Made Easy',
      platform: 'TikTok',
      contentType: 'Video',
      status: 'draft',
      scheduledDate: '2024-01-17',
      scheduledTime: '18:00'
    },
    {
      id: '4',
      title: 'Customer Success Story Spotlight',
      platform: 'Instagram',
      contentType: 'Story',
      status: 'scheduled',
      scheduledDate: '2024-01-18',
      scheduledTime: '11:00'
    },
    {
      id: '5',
      title: 'Industry Trends for 2024',
      platform: 'Twitter',
      contentType: 'Thread',
      status: 'draft',
      scheduledDate: '2024-01-19',
      scheduledTime: '10:00'
    }
  ])

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'Instagram': return Instagram
      case 'LinkedIn': return Linkedin
      case 'Twitter': return Twitter
      case 'TikTok': return Video
      default: return Instagram
    }
  }

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'Instagram': return 'bg-pink-500'
      case 'LinkedIn': return 'bg-blue-600'
      case 'Twitter': return 'bg-blue-400'
      case 'TikTok': return 'bg-black'
      default: return 'bg-gray-500'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-500'
      case 'scheduled': return 'bg-blue-500'
      case 'draft': return 'bg-gray-500'
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

  const getPostsForDate = (date: Date) => {
    const dateString = date.toISOString().split('T')[0]
    return contentPosts.filter(post => post.scheduledDate === dateString)
  }

  const upcomingPosts = contentPosts
    .filter(post => post.status === 'scheduled')
    .sort((a, b) => new Date(a.scheduledDate + ' ' + a.scheduledTime).getTime() - new Date(b.scheduledDate + ' ' + b.scheduledTime).getTime())

  const draftPosts = contentPosts.filter(post => post.status === 'draft')
  const publishedPosts = contentPosts.filter(post => post.status === 'published')

  return (
    <Layout>
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <CalendarIcon className="h-6 w-6 text-primary" />
                <h1 className="text-3xl font-bold text-foreground">Content Calendar</h1>
              </div>
              <p className="text-muted-foreground">
                Plan, schedule, and track your content across all platforms
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                New Content
              </Button>
            </div>
          </div>
        </div>

        {/* View Toggle */}
        <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as 'calendar' | 'list')} className="mb-6">
          <TabsList>
            <TabsTrigger value="calendar">Calendar View</TabsTrigger>
            <TabsTrigger value="list">List View</TabsTrigger>
          </TabsList>
        </Tabs>

        {viewMode === 'calendar' ? (
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
                                  <StatusIcon className={`h-3 w-3 ${post.status === 'published' ? 'text-green-500' : post.status === 'scheduled' ? 'text-blue-500' : 'text-gray-500'}`} />
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

              {/* Quick Stats */}
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>This Week</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Scheduled</span>
                    <Badge variant="secondary">{upcomingPosts.length}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Drafts</span>
                    <Badge variant="outline">{draftPosts.length}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Published</span>
                    <Badge variant="default">{publishedPosts.length}</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        ) : (
          /* List View */
          <div className="space-y-6">
            {/* Upcoming Posts */}
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
                {upcomingPosts.length === 0 ? (
                  <div className="text-center py-8">
                    <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No upcoming posts scheduled</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {upcomingPosts.map((post) => {
                      const PlatformIcon = getPlatformIcon(post.platform)
                      
                      return (
                        <div key={post.id} className="flex items-center gap-4 p-4 border border-border rounded-lg">
                          <div className={`p-2 rounded-lg ${getPlatformColor(post.platform)}`}>
                            <PlatformIcon className="h-4 w-4 text-white" />
                          </div>
                          
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
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Draft Posts */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Edit className="h-5 w-5 text-gray-500" />
                  Draft Posts ({draftPosts.length})
                </CardTitle>
                <CardDescription>
                  Content that needs to be completed
                </CardDescription>
              </CardHeader>
              <CardContent>
                {draftPosts.length === 0 ? (
                  <div className="text-center py-8">
                    <Edit className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No draft posts</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {draftPosts.map((post) => {
                      const PlatformIcon = getPlatformIcon(post.platform)
                      
                      return (
                        <div key={post.id} className="flex items-center gap-4 p-4 border border-border rounded-lg">
                          <div className={`p-2 rounded-lg ${getPlatformColor(post.platform)}`}>
                            <PlatformIcon className="h-4 w-4 text-white" />
                          </div>
                          
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
                            <Badge variant="outline" className="text-gray-600">
                              Draft
                            </Badge>
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Published Posts */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
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
                      <div key={post.id} className="flex items-center gap-4 p-4 border border-border rounded-lg">
                        <div className={`p-2 rounded-lg ${getPlatformColor(post.platform)}`}>
                          <PlatformIcon className="h-4 w-4 text-white" />
                        </div>
                        
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
                                <span className="text-green-600 font-medium">{post.engagement} engagement</span>
                              </>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Badge variant="default" className="bg-green-100 text-green-700">
                            Published
                          </Badge>
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
          </div>
        )}
      </div>
    </Layout>
  )
}