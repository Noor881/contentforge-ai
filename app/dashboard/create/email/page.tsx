"use client";

import { useState } from "react";
import Card, { CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import toast from "react-hot-toast";
import { Sparkles, Copy, Save } from "lucide-react";

export default function EmailGenerator() {
  const [formData, setFormData] = useState({
    subject: "",
    purpose: "marketing",
    audience: "",
    tone: "professional",
    cta: "",
  });
  const [generatedContent, setGeneratedContent] = useState({
    subject: "",
    body: "",
  });
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);

    try {
      const res = await fetch("/api/content/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "email",
          params: formData,
          prompt: `Create a ${formData.purpose} email about "${formData.subject}" for ${formData.audience} in a ${formData.tone} tone. CTA: ${formData.cta}`,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Failed to generate email");
        return;
      }

      // Parse the content to extract subject and body
      const content = data.content;
      const subjectMatch = content.match(/Subject:(.*?)(\n|$)/i);
      const subject = subjectMatch ? subjectMatch[1].trim() : formData.subject;
      const body = content.replace(/Subject:.*?(\n|$)/i, "").trim();

      setGeneratedContent({ subject, body });
      toast.success("Email generated successfully!");
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
          <Sparkles className="h-8 w-8 text-green-600" />
          Email Template Generator
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Craft compelling email campaigns that drive conversions
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <Card variant="default">
          <CardHeader>
            <CardTitle>Email Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleGenerate} className="space-y-6">
              <Input
                label="Email Topic/Subject"
                required
                placeholder="e.g., New Product Launch"
                value={formData.subject}
                onChange={(e) =>
                  setFormData({ ...formData, subject: e.target.value })
                }
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Purpose
                </label>
                <select
                  value={formData.purpose}
                  onChange={(e) =>
                    setFormData({ ...formData, purpose: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/20 focus:outline-none"
                >
                  <option value="marketing">Marketing</option>
                  <option value="newsletter">Newsletter</option>
                  <option value="welcome">Welcome Email</option>
                  <option value="promotion">Promotion</option>
                  <option value="announcement">Announcement</option>
                </select>
              </div>

              <Input
                label="Target Audience"
                placeholder="e.g., existing customers, new subscribers"
                value={formData.audience}
                onChange={(e) =>
                  setFormData({ ...formData, audience: e.target.value })
                }
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Tone
                </label>
                <select
                  value={formData.tone}
                  onChange={(e) =>
                    setFormData({ ...formData, tone: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/20 focus:outline-none"
                >
                  <option value="professional">Professional</option>
                  <option value="friendly">Friendly</option>
                  <option value="casual">Casual</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>

              <Input
                label="Call-to-Action"
                placeholder="e.g., Shop Now, Learn More, Sign Up"
                value={formData.cta}
                onChange={(e) =>
                  setFormData({ ...formData, cta: e.target.value })
                }
              />

              <Button
                type="submit"
                className="w-full"
                size="lg"
                isLoading={isGenerating}
              >
                <Sparkles className="mr-2 h-5 w-5" />
                Generate Email
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card variant="glass">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Generated Email</CardTitle>
              {generatedContent.body && (
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(
                        `Subject: ${generatedContent.subject}\n\n${generatedContent.body}`,
                      );
                      toast.success("Copied!");
                    }}
                    className="p-2 text-gray-600 dark:text-gray-400 hover:text-primary-600"
                  >
                    <Copy className="h-5 w-5" />
                  </button>
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {generatedContent.body ? (
              <div className="space-y-4">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                    Subject:
                  </div>
                  <div className="font-semibold text-gray-900 dark:text-white">
                    {generatedContent.subject}
                  </div>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                  <div className="whitespace-pre-wrap text-gray-800 dark:text-gray-200">
                    {generatedContent.body}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                <Sparkles className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Your email template will appear here</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
