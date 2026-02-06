"use client";

import { useState } from "react";
import Card, { CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import toast from "react-hot-toast";
import { Sparkles, Copy } from "lucide-react";

export default function SEOMetaGenerator() {
  const [formData, setFormData] = useState({
    pageTitle: "",
    keywords: "",
    pageContent: "",
  });
  const [generatedContent, setGeneratedContent] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);

    try {
      const res = await fetch("/api/content/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "seo_meta",
          params: formData,
          prompt: `Create an SEO meta description for a page titled "${formData.pageTitle}" about ${formData.pageContent}. Include keywords: ${formData.keywords}. Keep it under 160 characters.`,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || "Failed to generate meta description");
        return;
      }

      setGeneratedContent(data.content);
      toast.success("Meta description generated!");
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
          <Sparkles className="h-8 w-8 text-cyan-600" />
          SEO Meta Description Tool
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Generate keyword-rich meta descriptions that boost rankings
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <Card variant="default">
          <CardHeader>
            <CardTitle>Page Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleGenerate} className="space-y-6">
              <Input
                label="Page Title"
                required
                placeholder="e.g., Best AI Writing Tools 2026"
                value={formData.pageTitle}
                onChange={(e) =>
                  setFormData({ ...formData, pageTitle: e.target.value })
                }
              />

              <Input
                label="Target Keywords"
                required
                placeholder="e.g., AI writing, content generation"
                value={formData.keywords}
                onChange={(e) =>
                  setFormData({ ...formData, keywords: e.target.value })
                }
                helpText="Comma-separated keywords to include"
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Page Content Summary
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.pageContent}
                  onChange={(e) =>
                    setFormData({ ...formData, pageContent: e.target.value })
                  }
                  placeholder="Brief summary of what the page is about..."
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/20 focus:outline-none"
                />
              </div>

              <Button
                type="submit"
                className="w-full"
                size="lg"
                isLoading={isGenerating}
              >
                <Sparkles className="mr-2 h-5 w-5" />
                Generate Meta Description
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card variant="glass">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Generated Meta Description</CardTitle>
              {generatedContent && (
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(generatedContent);
                    toast.success("Copied!");
                  }}
                  className="p-2 text-gray-600 dark:text-gray-400 hover:text-primary-600"
                >
                  <Copy className="h-5 w-5" />
                </button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {generatedContent ? (
              <div>
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 mb-4">
                  <div className="text-gray-800 dark:text-gray-200">
                    {generatedContent}
                  </div>
                </div>
                <div className="text-sm space-y-2">
                  <div className="flex justify-between text-gray-600 dark:text-gray-400">
                    <span>Character count:</span>
                    <span
                      className={
                        generatedContent.length > 160
                          ? "text-red-600"
                          : "text-green-600"
                      }
                    >
                      {generatedContent.length}/160
                    </span>
                  </div>
                  {generatedContent.length > 160 && (
                    <p className="text-orange-600 text-xs">
                      ⚠️ Meta description is too long. Google typically displays
                      155-160 characters.
                    </p>
                  )}
                  {generatedContent.length < 120 &&
                    generatedContent.length > 0 && (
                      <p className="text-blue-600 text-xs">
                        ℹ️ Consider making it slightly longer for better SEO
                        impact.
                      </p>
                    )}
                </div>

                {/* Preview */}
                <div className="mt-6">
                  <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Google Search Preview:
                  </h4>
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                    <div className="text-blue-600 text-lg mb-1">
                      {formData.pageTitle}
                    </div>
                    <div className="text-green-700 dark:text-green-500 text-xs mb-2">
                      https://example.com
                    </div>
                    <div className="text-gray-600 dark:text-gray-400 text-sm">
                      {generatedContent}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                <Sparkles className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Your meta description will appear here</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
