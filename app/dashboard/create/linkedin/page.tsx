"use client";

import { useState } from "react";
import Card, { CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import toast from "react-hot-toast";
import { Sparkles, Linkedin } from "lucide-react";

export default function LinkedInOptimizer() {
  const [formData, setFormData] = useState({
    name: "",
    currentRole: "",
    industry: "",
    experience: "",
    skills: "",
    targetAudience: "",
    goals: "",
  });
  const [generated, setGenerated] = useState({
    headline: "",
    about: "",
    experienceDesc: "",
  });
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);

    try {
      const prompt = `Optimize a LinkedIn profile for:
Name: ${formData.name}
Current Role: ${formData.currentRole}
Industry: ${formData.industry}
Experience: ${formData.experience}
Key Skills: ${formData.skills}
Target Audience: ${formData.targetAudience}
Career Goals: ${formData.goals}

Generate:
1. HEADLINE (220 characters max, include role, value prop, keywords)
2. ABOUT SECTION (2600 characters max, compelling story, achievements, CTA)
3. EXPERIENCE DESCRIPTION (for current role, achievement-focused with metrics)

Make it SEO-optimized for LinkedIn search, engaging, and professional.`;

      const res = await fetch("/api/content/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "linkedin", params: formData, prompt }),
      });

      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || "Failed to generate");
        return;
      }

      // Parse the response
      const content = data.content;
      const headlineMatch = content.match(
        /HEADLINE[:\s]*(.*?)(?=\n\n|ABOUT)/is,
      );
      const aboutMatch = content.match(
        /ABOUT SECTION[:\s]*(.*?)(?=\n\nEXPERIENCE|$)/is,
      );
      const expMatch = content.match(/EXPERIENCE DESCRIPTION[:\s]*(.*?)$/is);

      setGenerated({
        headline: headlineMatch ? headlineMatch[1].trim() : "",
        about: aboutMatch ? aboutMatch[1].trim() : "",
        experienceDesc: expMatch ? expMatch[1].trim() : "",
      });
      toast.success("LinkedIn profile optimized!");
    } catch (error) {
      toast.error("An error occurred");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-3">
          <Linkedin className="h-8 w-8 text-primary-600" />
          LinkedIn Profile Optimizer
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Optimize your LinkedIn profile for maximum visibility
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <Card variant="default">
          <CardHeader>
            <CardTitle>Profile Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleGenerate} className="space-y-6">
              <Input
                label="Your Name"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
              <Input
                label="Current Role"
                required
                placeholder="e.g., Senior Product Manager"
                value={formData.currentRole}
                onChange={(e) =>
                  setFormData({ ...formData, currentRole: e.target.value })
                }
              />
              <Input
                label="Industry"
                placeholder="e.g., SaaS, Marketing, Finance"
                value={formData.industry}
                onChange={(e) =>
                  setFormData({ ...formData, industry: e.target.value })
                }
              />
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Experience Summary
                </label>
                <textarea
                  value={formData.experience}
                  onChange={(e) =>
                    setFormData({ ...formData, experience: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:border-primary-500 focus:outline-none"
                  rows={3}
                  placeholder="Brief overview of your experience..."
                />
              </div>
              <Input
                label="Key Skills"
                placeholder="e.g., Leadership, Data Analysis, Strategy"
                value={formData.skills}
                onChange={(e) =>
                  setFormData({ ...formData, skills: e.target.value })
                }
              />
              <Input
                label="Target Audience"
                placeholder="e.g., Recruiters, Clients, Industry Peers"
                value={formData.targetAudience}
                onChange={(e) =>
                  setFormData({ ...formData, targetAudience: e.target.value })
                }
              />
              <Input
                label="Career Goals"
                placeholder="e.g., Leadership roles, Consulting opportunities"
                value={formData.goals}
                onChange={(e) =>
                  setFormData({ ...formData, goals: e.target.value })
                }
              />
              <Button
                type="submit"
                className="w-full"
                size="lg"
                isLoading={isGenerating}
              >
                <Sparkles className="mr-2 h-5 w-5" />
                Optimize Profile
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="space-y-6">
          {generated.headline && (
            <Card>
              <CardHeader>
                <CardTitle>✨ Headline (220 chars)</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-800 dark:text-gray-200">
                  {generated.headline}
                </p>
              </CardContent>
            </Card>
          )}
          {generated.about && (
            <Card>
              <CardHeader>
                <CardTitle>📝 About Section</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="whitespace-pre-wrap text-gray-800 dark:text-gray-200">
                  {generated.about}
                </div>
              </CardContent>
            </Card>
          )}
          {generated.experienceDesc && (
            <Card>
              <CardHeader>
                <CardTitle>💼 Experience Description</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="whitespace-pre-wrap text-gray-800 dark:text-gray-200">
                  {generated.experienceDesc}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
