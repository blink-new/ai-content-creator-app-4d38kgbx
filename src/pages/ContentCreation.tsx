import { useState } from 'react'
import Layout from '@/components/Layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'
import { 
  PenTool, 
  Sparkles, 
  Hash, 
  Copy, 
  Save, 
  Send,
  Image,
  Video,
  Calendar,
  Instagram,
  Linkedin,
  Twitter,
  Wand2,
  RefreshCw
} from 'lucide-react'
import { blink } from '@/blink/client'

export default function ContentCreation() {
  const [loading, setLoading] = useState(false)
  const [generatingCaption, setGeneratingCaption] = useState(false)
  const [generatingHashtags, setGeneratingHashtags] = useState(false)
  
  const [contentData, setContentData] = useState({
    title: '',
    platform: 'Instagram',
    contentType: 'Post',
    captionStyle: 'storytelling',
    caption: '',
    hashtags: '',
    scheduledDate: '',
    scheduledTime: ''
  })

  const platforms = [
    { value: 'Instagram', label: 'Instagram', icon: Instagram, color: 'bg-pink-500' },
    { value: 'LinkedIn', label: 'LinkedIn', icon: Linkedin, color: 'bg-blue-600' },
    { value: 'Twitter', label: 'Twitter', icon: Twitter, color: 'bg-blue-400' },
    { value: 'TikTok', label: 'TikTok', icon: Video, color: 'bg-black' }
  ]

  const contentTypes = [
    'Post', 'Story', 'Reel', 'Carousel', 'Video', 'Live'
  ]

  const captionStyles = [
    { value: 'storytelling', label: 'Storytelling', description: 'Narrative-driven with personal anecdotes' },
    { value: 'educational', label: 'Educational', description: 'Informative and instructional content' },
    { value: 'short', label: 'Short & Punchy', description: 'Brief, impactful messages' },
    { value: 'long', label: 'Long-form', description: 'Detailed, comprehensive posts' },
    { value: 'humorous', label: 'Humorous', description: 'Light-hearted and entertaining' },
    { value: 'inspirational', label: 'Inspirational', description: 'Motivational and uplifting' }
  ]

  const generateCaption = async () => {
    if (!contentData.title) return

    setGeneratingCaption(true)
    try {
      const styleDescription = captionStyles.find(s => s.value === contentData.captionStyle)?.description || 'engaging'
      
      const prompt = `Write a ${styleDescription} social media caption for ${contentData.platform} about: "${contentData.title}"
      
      Style: ${contentData.captionStyle}
      Platform: ${contentData.platform}
      Content Type: ${contentData.contentType}
      
      Make it engaging, on-brand, and optimized for ${contentData.platform}. Include relevant emojis and call-to-action.`

      const { text } = await blink.ai.generateText({
        prompt,
        maxTokens: 300
      })

      setContentData(prev => ({ ...prev, caption: text }))
    } catch (error) {
      console.error('Error generating caption:', error)
    } finally {
      setGeneratingCaption(false)
    }
  }

  const generateHashtags = async () => {
    if (!contentData.title && !contentData.caption) return

    setGeneratingHashtags(true)
    try {
      const content = contentData.caption || contentData.title
      const prompt = `Generate relevant hashtags for this ${contentData.platform} post: "${content}"
      
      Platform: ${contentData.platform}
      Content Type: ${contentData.contentType}
      
      Provide a mix of:
      - Popular hashtags (high reach)
      - Niche hashtags (targeted audience)
      - Branded hashtags
      
      Format as a single line with hashtags separated by spaces.`

      const { text } = await blink.ai.generateText({
        prompt,
        maxTokens: 200
      })

      setContentData(prev => ({ ...prev, hashtags: text }))
    } catch (error) {
      console.error('Error generating hashtags:', error)
    } finally {
      setGeneratingHashtags(false)
    }
  }

  const saveContent = async () => {
    setLoading(true)
    try {
      await blink.db.contentPosts.create({
        title: contentData.title,
        platform: contentData.platform,
        contentType: contentData.contentType,
        captionStyle: contentData.captionStyle,
        caption: contentData.caption,
        hashtags: contentData.hashtags,
        scheduledDate: contentData.scheduledDate,
        scheduledTime: contentData.scheduledTime,
        status: 'draft',
        userId: (await blink.auth.me()).id,
        createdAt: new Date()
      })
      
      alert('Content saved successfully!')
    } catch (error) {
      console.error('Error saving content:', error)
      alert('Error saving content. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    alert('Copied to clipboard!')
  }

  return (
    <Layout>
      <div className="p-8 max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <PenTool className="h-6 w-6 text-primary" />
            <h1 className="text-3xl font-bold text-foreground">Create Content</h1>
          </div>
          <p className="text-muted-foreground">
            Generate AI-powered captions and hashtags for your social media content
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Content Setup */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Content Setup</CardTitle>
                <CardDescription>
                  Configure your content details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="title">Content Title/Topic</Label>
                  <Input
                    id="title"
                    value={contentData.title}
                    onChange={(e) => setContentData(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="What's your content about?"
                  />
                </div>

                <div>
                  <Label htmlFor="platform">Platform</Label>
                  <Select value={contentData.platform} onValueChange={(value) => setContentData(prev => ({ ...prev, platform: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {platforms.map((platform) => (
                        <SelectItem key={platform.value} value={platform.value}>
                          <div className="flex items-center gap-2">
                            <platform.icon className="h-4 w-4" />
                            {platform.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="contentType">Content Type</Label>
                  <Select value={contentData.contentType} onValueChange={(value) => setContentData(prev => ({ ...prev, contentType: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {contentTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="captionStyle">Caption Style</Label>
                  <Select value={contentData.captionStyle} onValueChange={(value) => setContentData(prev => ({ ...prev, captionStyle: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {captionStyles.map((style) => (
                        <SelectItem key={style.value} value={style.value}>
                          <div>
                            <div className="font-medium">{style.label}</div>
                            <div className="text-xs text-muted-foreground">{style.description}</div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Media Upload */}
            <Card>
              <CardHeader>
                <CardTitle>Media Upload</CardTitle>
                <CardDescription>
                  Add images or videos to your post
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                  <Image className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-sm text-muted-foreground mb-2">
                    Drag and drop your media files here
                  </p>
                  <Button variant="outline" size="sm">
                    Choose Files
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Content Creation */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="caption" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="caption">Caption</TabsTrigger>
                <TabsTrigger value="hashtags">Hashtags</TabsTrigger>
                <TabsTrigger value="schedule">Schedule</TabsTrigger>
              </TabsList>

              <TabsContent value="caption">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Caption Generation</CardTitle>
                        <CardDescription>
                          AI-powered caption writing based on your brand voice
                        </CardDescription>
                      </div>
                      <Button 
                        onClick={generateCaption}
                        disabled={!contentData.title || generatingCaption}
                        size="sm"
                      >
                        {generatingCaption ? (
                          <>
                            <Sparkles className="h-4 w-4 mr-2 animate-spin" />
                            Generating...
                          </>
                        ) : (
                          <>
                            <Wand2 className="h-4 w-4 mr-2" />
                            Generate Caption
                          </>
                        )}
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="caption">Caption</Label>
                      <Textarea
                        id="caption"
                        value={contentData.caption}
                        onChange={(e) => setContentData(prev => ({ ...prev, caption: e.target.value }))}
                        placeholder="Your AI-generated caption will appear here..."
                        rows={8}
                        className="resize-none"
                      />
                    </div>
                    
                    {contentData.caption && (
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => copyToClipboard(contentData.caption)}
                        >
                          <Copy className="h-4 w-4 mr-2" />
                          Copy Caption
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={generateCaption}
                          disabled={generatingCaption}
                        >
                          <RefreshCw className="h-4 w-4 mr-2" />
                          Regenerate
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="hashtags">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Hashtag Generation</CardTitle>
                        <CardDescription>
                          Strategic hashtags to maximize your reach
                        </CardDescription>
                      </div>
                      <Button 
                        onClick={generateHashtags}
                        disabled={(!contentData.title && !contentData.caption) || generatingHashtags}
                        size="sm"
                      >
                        {generatingHashtags ? (
                          <>
                            <Sparkles className="h-4 w-4 mr-2 animate-spin" />
                            Generating...
                          </>
                        ) : (
                          <>
                            <Hash className="h-4 w-4 mr-2" />
                            Generate Hashtags
                          </>
                        )}
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="hashtags">Hashtags</Label>
                      <Textarea
                        id="hashtags"
                        value={contentData.hashtags}
                        onChange={(e) => setContentData(prev => ({ ...prev, hashtags: e.target.value }))}
                        placeholder="Your AI-generated hashtags will appear here..."
                        rows={4}
                        className="resize-none"
                      />
                    </div>
                    
                    {contentData.hashtags && (
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => copyToClipboard(contentData.hashtags)}
                        >
                          <Copy className="h-4 w-4 mr-2" />
                          Copy Hashtags
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={generateHashtags}
                          disabled={generatingHashtags}
                        >
                          <RefreshCw className="h-4 w-4 mr-2" />
                          Regenerate
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="schedule">
                <Card>
                  <CardHeader>
                    <CardTitle>Schedule Post</CardTitle>
                    <CardDescription>
                      Choose when to publish your content
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="scheduledDate">Date</Label>
                        <Input
                          id="scheduledDate"
                          type="date"
                          value={contentData.scheduledDate}
                          onChange={(e) => setContentData(prev => ({ ...prev, scheduledDate: e.target.value }))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="scheduledTime">Time</Label>
                        <Input
                          id="scheduledTime"
                          type="time"
                          value={contentData.scheduledTime}
                          onChange={(e) => setContentData(prev => ({ ...prev, scheduledTime: e.target.value }))}
                        />
                      </div>
                    </div>
                    
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <h4 className="font-medium mb-2">Optimal Posting Times</h4>
                      <div className="text-sm text-muted-foreground space-y-1">
                        <p><strong>Instagram:</strong> 11 AM - 1 PM, 7 PM - 9 PM</p>
                        <p><strong>LinkedIn:</strong> 8 AM - 10 AM, 12 PM - 2 PM</p>
                        <p><strong>Twitter:</strong> 9 AM - 10 AM, 7 PM - 9 PM</p>
                        <p><strong>TikTok:</strong> 6 AM - 10 AM, 7 PM - 9 PM</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Action Buttons */}
            <div className="flex gap-4 mt-6">
              <Button onClick={saveContent} disabled={loading} className="flex-1">
                {loading ? (
                  <>
                    <Sparkles className="h-4 w-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Save Draft
                  </>
                )}
              </Button>
              <Button variant="outline" className="flex-1">
                <Calendar className="h-4 w-4 mr-2" />
                Schedule Post
              </Button>
              <Button variant="outline" className="flex-1">
                <Send className="h-4 w-4 mr-2" />
                Publish Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}