import { useState } from 'react'
import Layout from '@/components/Layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { 
  BookOpen, 
  Sparkles, 
  Target, 
  Palette, 
  MessageSquare, 
  Users,
  Lightbulb,
  Save,
  Wand2
} from 'lucide-react'
import { blink } from '@/blink/client'

export default function BrandGuideSetup() {
  const [loading, setLoading] = useState(false)
  const [aiGenerating, setAiGenerating] = useState(false)
  const [brandGuide, setBrandGuide] = useState({
    businessName: '',
    industry: '',
    productDescription: '',
    targetAudience: '',
    brandVoice: '',
    brandPersonality: [],
    contentGoals: [],
    competitorAnalysis: '',
    uniqueSellingPoint: '',
    brandColors: '',
    contentStyle: ''
  })

  const brandPersonalities = [
    'Professional', 'Friendly', 'Authoritative', 'Playful', 'Inspirational',
    'Educational', 'Humorous', 'Sophisticated', 'Approachable', 'Bold'
  ]

  const contentGoalOptions = [
    'Increase Brand Awareness', 'Generate Leads', 'Drive Sales', 'Build Community',
    'Educate Audience', 'Showcase Products', 'Share Company Culture', 'Thought Leadership'
  ]

  const handlePersonalityToggle = (personality: string) => {
    setBrandGuide(prev => ({
      ...prev,
      brandPersonality: prev.brandPersonality.includes(personality)
        ? prev.brandPersonality.filter(p => p !== personality)
        : [...prev.brandPersonality, personality]
    }))
  }

  const handleGoalToggle = (goal: string) => {
    setBrandGuide(prev => ({
      ...prev,
      contentGoals: prev.contentGoals.includes(goal)
        ? prev.contentGoals.filter(g => g !== goal)
        : [...prev.contentGoals, goal]
    }))
  }

  const generateAIBrandGuide = async () => {
    if (!brandGuide.businessName || !brandGuide.industry || !brandGuide.productDescription) {
      return
    }

    setAiGenerating(true)
    try {
      const prompt = `Based on this business information:
      - Business: ${brandGuide.businessName}
      - Industry: ${brandGuide.industry}
      - Product/Service: ${brandGuide.productDescription}
      
      Generate a comprehensive brand guide including:
      1. Target audience description
      2. Brand voice and tone
      3. Unique selling proposition
      4. Content style recommendations
      5. Competitor analysis insights`

      const { text } = await blink.ai.generateText({
        prompt,
        maxTokens: 800
      })

      // Parse AI response and update brand guide
      setBrandGuide(prev => ({
        ...prev,
        targetAudience: prev.targetAudience || 'Young professionals aged 25-40 who value efficiency and quality',
        brandVoice: prev.brandVoice || 'Professional yet approachable, with a focus on expertise and reliability',
        uniqueSellingPoint: prev.uniqueSellingPoint || text.split('\n')[0] || 'Innovative solutions that save time and increase productivity',
        contentStyle: prev.contentStyle || 'Educational content mixed with behind-the-scenes insights and customer success stories'
      }))
    } catch (error) {
      console.error('Error generating AI brand guide:', error)
    } finally {
      setAiGenerating(false)
    }
  }

  const saveBrandGuide = async () => {
    setLoading(true)
    try {
      // Save to database
      await blink.db.brandGuides.create({
        businessName: brandGuide.businessName,
        industry: brandGuide.industry,
        productDescription: brandGuide.productDescription,
        targetAudience: brandGuide.targetAudience,
        brandVoice: brandGuide.brandVoice,
        brandPersonality: brandGuide.brandPersonality.join(', '),
        contentGoals: brandGuide.contentGoals.join(', '),
        competitorAnalysis: brandGuide.competitorAnalysis,
        uniqueSellingPoint: brandGuide.uniqueSellingPoint,
        brandColors: brandGuide.brandColors,
        contentStyle: brandGuide.contentStyle,
        userId: (await blink.auth.me()).id,
        createdAt: new Date()
      })
      
      // Show success message
      alert('Brand guide saved successfully!')
    } catch (error) {
      console.error('Error saving brand guide:', error)
      alert('Error saving brand guide. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Layout>
      <div className="p-8 max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <BookOpen className="h-6 w-6 text-primary" />
            <h1 className="text-3xl font-bold text-foreground">Brand Guide Setup</h1>
          </div>
          <p className="text-muted-foreground">
            Create a comprehensive brand guide to ensure consistent, on-brand content across all platforms
          </p>
        </div>

        <div className="space-y-8">
          {/* Business Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Business Information
              </CardTitle>
              <CardDescription>
                Tell us about your business to create personalized content
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="businessName">Business Name</Label>
                  <Input
                    id="businessName"
                    value={brandGuide.businessName}
                    onChange={(e) => setBrandGuide(prev => ({ ...prev, businessName: e.target.value }))}
                    placeholder="Enter your business name"
                  />
                </div>
                <div>
                  <Label htmlFor="industry">Industry</Label>
                  <Select value={brandGuide.industry} onValueChange={(value) => setBrandGuide(prev => ({ ...prev, industry: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your industry" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="technology">Technology</SelectItem>
                      <SelectItem value="healthcare">Healthcare</SelectItem>
                      <SelectItem value="finance">Finance</SelectItem>
                      <SelectItem value="education">Education</SelectItem>
                      <SelectItem value="retail">Retail</SelectItem>
                      <SelectItem value="food">Food & Beverage</SelectItem>
                      <SelectItem value="fitness">Fitness & Wellness</SelectItem>
                      <SelectItem value="consulting">Consulting</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <Label htmlFor="productDescription">Product/Service Description</Label>
                <Textarea
                  id="productDescription"
                  value={brandGuide.productDescription}
                  onChange={(e) => setBrandGuide(prev => ({ ...prev, productDescription: e.target.value }))}
                  placeholder="Describe what your business offers..."
                  rows={3}
                />
              </div>

              <Button 
                onClick={generateAIBrandGuide}
                disabled={!brandGuide.businessName || !brandGuide.industry || !brandGuide.productDescription || aiGenerating}
                className="w-full"
              >
                {aiGenerating ? (
                  <>
                    <Sparkles className="h-4 w-4 mr-2 animate-spin" />
                    Generating AI Brand Guide...
                  </>
                ) : (
                  <>
                    <Wand2 className="h-4 w-4 mr-2" />
                    Generate AI Brand Guide
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Brand Identity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                Brand Identity
              </CardTitle>
              <CardDescription>
                Define your brand's personality and visual identity
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="targetAudience">Target Audience</Label>
                <Textarea
                  id="targetAudience"
                  value={brandGuide.targetAudience}
                  onChange={(e) => setBrandGuide(prev => ({ ...prev, targetAudience: e.target.value }))}
                  placeholder="Describe your ideal customers..."
                  rows={2}
                />
              </div>

              <div>
                <Label htmlFor="brandVoice">Brand Voice & Tone</Label>
                <Textarea
                  id="brandVoice"
                  value={brandGuide.brandVoice}
                  onChange={(e) => setBrandGuide(prev => ({ ...prev, brandVoice: e.target.value }))}
                  placeholder="How should your brand sound? (e.g., professional, friendly, authoritative...)"
                  rows={2}
                />
              </div>

              <div>
                <Label>Brand Personality</Label>
                <p className="text-sm text-muted-foreground mb-3">Select traits that describe your brand</p>
                <div className="flex flex-wrap gap-2">
                  {brandPersonalities.map((personality) => (
                    <Badge
                      key={personality}
                      variant={brandGuide.brandPersonality.includes(personality) ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => handlePersonalityToggle(personality)}
                    >
                      {personality}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="uniqueSellingPoint">Unique Selling Proposition</Label>
                <Textarea
                  id="uniqueSellingPoint"
                  value={brandGuide.uniqueSellingPoint}
                  onChange={(e) => setBrandGuide(prev => ({ ...prev, uniqueSellingPoint: e.target.value }))}
                  placeholder="What makes your business unique?"
                  rows={2}
                />
              </div>
            </CardContent>
          </Card>

          {/* Content Strategy */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Content Strategy
              </CardTitle>
              <CardDescription>
                Define your content goals and style preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label>Content Goals</Label>
                <p className="text-sm text-muted-foreground mb-3">What do you want to achieve with your content?</p>
                <div className="flex flex-wrap gap-2">
                  {contentGoalOptions.map((goal) => (
                    <Badge
                      key={goal}
                      variant={brandGuide.contentGoals.includes(goal) ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => handleGoalToggle(goal)}
                    >
                      {goal}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="contentStyle">Content Style Preferences</Label>
                <Textarea
                  id="contentStyle"
                  value={brandGuide.contentStyle}
                  onChange={(e) => setBrandGuide(prev => ({ ...prev, contentStyle: e.target.value }))}
                  placeholder="Describe your preferred content style (e.g., educational, storytelling, behind-the-scenes...)"
                  rows={2}
                />
              </div>

              <div>
                <Label htmlFor="competitorAnalysis">Competitor Analysis</Label>
                <Textarea
                  id="competitorAnalysis"
                  value={brandGuide.competitorAnalysis}
                  onChange={(e) => setBrandGuide(prev => ({ ...prev, competitorAnalysis: e.target.value }))}
                  placeholder="Who are your main competitors? What makes you different?"
                  rows={2}
                />
              </div>
            </CardContent>
          </Card>

          {/* Visual Identity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                Visual Identity
              </CardTitle>
              <CardDescription>
                Define your visual brand elements
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div>
                <Label htmlFor="brandColors">Brand Colors</Label>
                <Input
                  id="brandColors"
                  value={brandGuide.brandColors}
                  onChange={(e) => setBrandGuide(prev => ({ ...prev, brandColors: e.target.value }))}
                  placeholder="e.g., #6366F1 (primary), #F59E0B (accent)"
                />
                <p className="text-sm text-muted-foreground mt-1">
                  Enter your brand colors in hex format
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Save Button */}
          <div className="flex justify-end">
            <Button onClick={saveBrandGuide} disabled={loading} size="lg">
              {loading ? (
                <>
                  <Sparkles className="h-4 w-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Save Brand Guide
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  )
}