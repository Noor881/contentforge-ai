"use client";

import { useState } from "react";
import Card, { CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import toast from "react-hot-toast";
import { Sparkles, Copy, Download, Save, Mail } from "lucide-react";
import TTSPlayer from "@/components/TTSPlayer";

export default function CoverLetterGenerator() {
  const [formData, setFormData] = useState({
    name: "",
    jobTitle: "",
    company: "",
    background: "",
    tone: "professional",
    length: "standard",
  });
  const [generatedContent, setGeneratedContent] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);

    try {
      const prompt = `Write a compelling cover letter for:
Job Title: ${formData.jobTitle}
Company: ${formData.company}
Applicant: ${formData.name}

Background/Experience: ${formData.background}

Requirements:
- Tone: ${formData.tone}
- Length: ${formData.length === "short" ? "2-3 paragraphs" : formData.length === "standard" ? "3-4 paragraphs" : "4-5 paragraphs"}
- Show enthusiasm for the role
- Highlight relevant experience
- Explain why you're a great fit
- Professional closing

Make it personalized and compelling.`;

      const res = await fetch("/api/content/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "cover_letter",
          params: formData,
          prompt,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Failed to generate cover letter");
        return;
      }

      setGeneratedContent(data.content);
      toast.success("Cover letter generated!");
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
          <Mail className="h-8 w-8 text-primary-600" />
          Cover Letter Generator
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Create personalized, professional cover letters
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <Card variant="default">
          <CardHeader>
            <CardTitle>Details</CardTitle>
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
                label="Job Title"
                required
                placeholder="e.g., Marketing Manager"
                value={formData.jobTitle}
                onChange={(e) =>
                  setFormData({ ...formData, jobTitle: e.target.value })
                }
              />
              <Input
                label="Company Name"
                required
                value={formData.company}
                onChange={(e) =>
                  setFormData({ ...formData, company: e.target.value })
                }
              />
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Your Background
                </label>
                <textarea
                  value={formData.background}
                  onChange={(e) =>
                    setFormData({ ...formData, background: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/20 focus:outline-none"
                  rows={5}
                  placeholder="Brief summary of your relevant experience..."
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Tone
                  </label>
                  <select
                    value={formData.tone}
                    onChange={(e) =>
                      setFormData({ ...formData, tone: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:border-primary-500 focus:outline-none"
                  >
                    <option value="professional">Professional</option>
                    <option value="enthusiastic">Enthusiastic</option>
                    <option value="formal">Formal</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Length
                  </label>
                  <select
                    value={formData.length}
                    onChange={(e) =>
                      setFormData({ ...formData, length: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:border-primary-500 focus:outline-none"
                  >
                    <option value="short">Short</option>
                    <option value="standard">Standard</option>
                    <option value="detailed">Detailed</option>
                  </select>
                </div>
              </div>
              <Button
                type="submit"
                className="w-full"
                size="lg"
                isLoading={isGenerating}
              >
                <Sparkles className="mr-2 h-5 w-5" />
                Generate Cover Letter
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card variant="bordered">
            <CardHeader>
              <CardTitle>Generated Letter</CardTitle>
            </CardHeader>
            <CardContent>
              {generatedContent ? (
                <div className="prose dark:prose-invert max-w-none">
                  <div className="whitespace-pre-wrap text-gray-800 dark:text-gray-200">
                    {generatedContent}
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                  <Mail className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Your cover letter will appear here</p>
                </div>
              )}
            </CardContent>
          </Card>
          {generatedContent && <TTSPlayer text={generatedContent} />}
        </div>
      </div>
    </div>
  );
}
