"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Upload, CheckCircle } from "lucide-react"
import { useRouter } from "next/navigation"

interface FormData {
  // Step 1: Contact Information
  companyName: string
  founderNames: string
  email: string
  phone: string
  
  // Step 2: Traction
  stage: string
  
  // Step 3: Fundraise
  fundingSought: string
  
  // Step 4: Business & Founder Description
  problemStatement: string
  solution: string
  founderDescription: string
  
  // Step 5: File Upload
  additionalMaterials: File | null
}

export default function SubmitStartup() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    companyName: "",
    founderNames: "",
    email: "",
    phone: "",
    stage: "",
    fundingSought: "",
    problemStatement: "",
    solution: "",
    founderDescription: "",
    additionalMaterials: null
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const updateFormData = (field: keyof FormData, value: string | File | null) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    updateFormData('additionalMaterials', file)
  }

  const nextStep = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Only allow submission at step 5
    if (currentStep !== 5) {
      return
    }
    
    setIsSubmitting(true)
    
    try {
      // Create FormData for file upload
      const submitData = new FormData()
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null && value !== "") {
          submitData.append(key, value)
        }
      })

      const response = await fetch('/api/submit-startup', {
        method: 'POST',
        body: submitData
      })

      if (response.ok) {
        setIsSubmitted(true)
      } else {
        alert('Failed to submit. Please try again.')
      }
    } catch (error) {
      console.error('Error submitting:', error)
      alert('Failed to submit. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const getStepTitle = (step: number) => {
    switch (step) {
      case 1: return "Contact Information"
      case 2: return "Traction"
      case 3: return "Fundraise"
      case 4: return "Business & Founder Description"
      case 5: return "Additional Materials"
      default: return ""
    }
  }

  const getStepDescription = (step: number) => {
    switch (step) {
      case 1: return "Tell us how to reach you"
      case 2: return "What stage is your company at?"
      case 3: return "What funding are you seeking?"
      case 4: return "Describe your business and team"
      case 5: return "Upload any additional materials (optional)"
      default: return ""
    }
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Thank You!</h2>
            <p className="text-gray-600 mb-6">
              Your startup submission has been received. We&apos;ll review your information and get back to you soon.
            </p>
            <Button onClick={() => router.push('/?tab=research')} className="w-full">
              Back to Research
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.back()}
              className="rounded-full"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Submit Your Startup</h1>
              <p className="text-gray-600">Step {currentStep} of 5</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            {[1, 2, 3, 4, 5].map((step) => (
              <div
                key={step}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step <= currentStep
                    ? 'bg-[hsl(212,74%,15%)] text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                {step}
              </div>
            ))}
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-[hsl(212,74%,15%)] h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / 5) * 100}%` }}
            />
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl">{getStepTitle(currentStep)}</CardTitle>
            <p className="text-gray-600">{getStepDescription(currentStep)}</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Step 1: Contact Information */}
              {currentStep === 1 && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="companyName">Company Name *</Label>
                    <Input
                      id="companyName"
                      value={formData.companyName}
                      onChange={(e) => updateFormData('companyName', e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="founderNames">Founder Name(s) *</Label>
                    <Input
                      id="founderNames"
                      value={formData.founderNames}
                      onChange={(e) => updateFormData('founderNames', e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => updateFormData('email', e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => updateFormData('phone', e.target.value)}
                    />
                  </div>
                </div>
              )}

              {/* Step 2: Traction */}
              {currentStep === 2 && (
                <div>
                  <Label htmlFor="stage">Stage *</Label>
                  <Select value={formData.stage} onValueChange={(value) => updateFormData('stage', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your stage" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="idea">Idea</SelectItem>
                      <SelectItem value="mvp">MVP</SelectItem>
                      <SelectItem value="revenue-under-250k">Revenue (&lt;$250k per year)</SelectItem>
                      <SelectItem value="revenue-250k-1m">Revenue ($250k to $1M per year)</SelectItem>
                      <SelectItem value="revenue-over-1m">Revenue ($1M+ per year)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              {/* Step 3: Fundraise */}
              {currentStep === 3 && (
                <div>
                  <Label htmlFor="fundingSought">Funding Sought *</Label>
                  <Select value={formData.fundingSought} onValueChange={(value) => updateFormData('fundingSought', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select funding amount" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="50k-500k">$50K-$500K</SelectItem>
                      <SelectItem value="500k-2m">$500K-$2M</SelectItem>
                      <SelectItem value="2m-5m">$2M-$5M</SelectItem>
                      <SelectItem value="5m-plus">$5M+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              {/* Step 4: Business & Founder Description */}
              {currentStep === 4 && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="problemStatement">Problem Statement *</Label>
                    <Textarea
                      id="problemStatement"
                      value={formData.problemStatement}
                      onChange={(e) => updateFormData('problemStatement', e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault()
                        }
                      }}
                      placeholder="What problem are you solving?"
                      rows={4}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="solution">Solution *</Label>
                    <Textarea
                      id="solution"
                      value={formData.solution}
                      onChange={(e) => updateFormData('solution', e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault()
                        }
                      }}
                      placeholder="How are you solving this problem?"
                      rows={4}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="founderDescription">Founder Description/LinkedIn *</Label>
                    <Textarea
                      id="founderDescription"
                      value={formData.founderDescription}
                      onChange={(e) => updateFormData('founderDescription', e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault()
                        }
                      }}
                      placeholder="Tell us about your team and experience"
                      rows={4}
                      required
                    />
                  </div>
                </div>
              )}

              {/* Step 5: File Upload */}
              {currentStep === 5 && (
                <div>
                  <Label htmlFor="additionalMaterials">Additional Materials (Optional)</Label>
                  <div className="mt-2">
                    <input
                      id="additionalMaterials"
                      type="file"
                      onChange={handleFileUpload}
                      accept=".pdf,.ppt,.pptx,.doc,.docx,.xls,.xlsx,.mp4,.mov,.avi"
                      className="hidden"
                      disabled={isSubmitting}
                    />
                    <label
                      htmlFor="additionalMaterials"
                      className={`cursor-pointer block border-2 border-dashed border-gray-300 rounded-lg p-6 text-center ${
                        isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:border-gray-400 hover:bg-gray-50'
                      }`}
                    >
                      <div className="space-y-2">
                        <Upload className="w-8 h-8 mx-auto text-gray-400" />
                        <div className="text-sm font-medium text-gray-900">
                          {formData.additionalMaterials ? formData.additionalMaterials.name : 'Click to upload files'}
                        </div>
                        <div className="text-xs text-gray-500">
                          Pitch deck, financial model, demo video, etc. (max 10MB)
                        </div>
                        {formData.additionalMaterials && (
                          <div className="text-xs text-green-600">
                            ✓ File selected: {formData.additionalMaterials.name}
                          </div>
                        )}
                      </div>
                    </label>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={(e) => prevStep(e)}
                  disabled={currentStep === 1}
                >
                  Previous
                </Button>
                
                {currentStep < 5 ? (
                  <Button
                    type="button"
                    onClick={(e) => nextStep(e)}
                    disabled={
                      (currentStep === 1 && (!formData.companyName || !formData.founderNames || !formData.email)) ||
                      (currentStep === 2 && !formData.stage) ||
                      (currentStep === 3 && !formData.fundingSought) ||
                      (currentStep === 4 && (!formData.problemStatement || !formData.solution || !formData.founderDescription))
                    }
                  >
                    Next
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-[hsl(212,74%,15%)] hover:bg-[hsl(212,74%,25%)] text-white"
                  >
                    {isSubmitting ? "Submitting..." : "Submit Application"}
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 