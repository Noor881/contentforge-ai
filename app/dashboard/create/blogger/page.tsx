"use client";

import { useState } from "react";
import Card, { CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import toast from "react-hot-toast";
import { Sparkles, Copy, Download, Save } from "lucide-react";
import TTSPlayer from "@/components/TTSPlayer";
import ImagePromptsDisplay from "@/components/ImagePromptsDisplay";
import { ImagePrompt } from "@/lib/image-prompts";

export default function AdvancedBlogger() {
  const [formData, setFormData] = useState({
    topic: "",
    keywords: "",
    tone: "professional",
    targetAudience: "",
    wordCount: "2500",
    includeResearch: false,
    includeCitations: false,
  });
  const [generatedContent, setGeneratedContent] = useState("");
  const [imagePrompts, setImagePrompts] = useState<ImagePrompt[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);

    try {
      const prompt = `Write a comprehensive, long-form article about "${formData.topic}" with the following specifications:

- Word Count: ${formData.wordCount} words
- Tone: ${formData.tone}
- Target Audience:${formData.targetAudience || "general audience"}
- Keywords to include: ${formData.keywords}
${formData.includeResearch ? "- Include research-backed content with [Citation #] placeholders" : ""}
${formData.includeCitations ? "- Add a References section at the end with numbered citations" : ""}

Structure the article with:
1. Engaging introduction with a hook
2. Table of contents
3. Multiple H2 and H3 sections
4. Deep dive into each topic
5. Examples and case studies
6. Actionable takeaways
7. Strong conclusion with CTA

Make it SEO-optimized, engaging, and valuable for readers.`;

      const res = await fetch("/api/content/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "article",
          params: formData,
          prompt,
          includeImagePrompts: true,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (res.status === 429) {
          toast.error(
            `Usage limit reached! ${data.current}/${data.limit} used.`,
          );
        } else {
          toast.error(data.error || "Failed to generate article");
        }
        return;
      }

      setGeneratedContent(data.content);
      if (data.imagePrompts) {
        setImagePrompts(data.imagePrompts);
      }
      toast.success("Article generated successfully!");
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSave = async () => {
    if (!generatedContent) return;

    setIsSaving(true);
    try {
      const res = await fetch("/api/content/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "article",
          title: formData.topic,
          content: generatedContent,
          prompt: formData.topic,
          metadata: { ...formData, imagePrompts },
        }),
      });

      if (res.ok) {
        toast.success("Content saved to library!");
      } else {
        toast.error("Failed to save content");
      }
    } catch (error) {
      toast.error("An error occurred");
    } finally {
      setIsSaving(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedContent);
    toast.success("Copied to clipboard!");
  };

  const handleDownload = () => {
    const blob = new Blob([generatedContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${formData.topic.replace(/[^a-z0-9]/gi, "-").toLowerCase()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Downloaded!");
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-3">
          <Sparkles className="h-8 w-8 text-primary-600" />
          Advanced Blogger
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Create comprehensive, research-backed long-form articles (2000-5000
          words)
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Input Form */}
        <Card variant="default">
          <CardHeader>
            <CardTitle>Article Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleGenerate} className="space-y-6">
              <Input
                label="Article Topic"
                required
                placeholder="e.g., The Complete Guide to Remote Work in 2026"
                value={formData.topic}
                onChange={(e) =>
                  setFormData({ ...formData, topic: e.target.value })
                }
              />

              <Input
                label="Target Keywords (comma-separated)"
                placeholder="e.g., remote work, productivity, work-life balance"
                value={formData.keywords}
                onChange={(e) =>
                  setFormData({ ...formData, keywords: e.target.value })
                }
              />

              <Input
                label="Target Audience"
                placeholder="e.g., professionals, marketers, entrepreneurs"
                value={formData.targetAudience}
                onChange={(e) =>
                  setFormData({ ...formData, targetAudience: e.target.value })
                }
              />

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
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/20 focus:outline-none"
                  >
                    <option value="professional">Professional</option>
                    <option value="casual">Casual</option>
                    <option value="authoritative">Authoritative</option>
                    <option value="conversational">Conversational</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Word Count
                  </label>
                  <select
                    value={formData.wordCount}
                    onChange={(e) =>
                      setFormData({ ...formData, wordCount: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/20 focus:outline-none"
                  >
                    <option value="2000">2000 words</option>
                    <option value="2500">2500 words</option>
                    <option value="3000">3000 words</option>
                    <option value="4000">4000 words</option>
                    <option value="5000">5000 words</option>
                  </select>
                </div>
              </div>

              <div className="space-y-3">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.includeResearch}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        includeResearch: e.target.checked,
                      })
                    }
                    className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Research Mode (with citation placeholders)
                  </span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.includeCitations}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        includeCitations: e.target.checked,
                      })
                    }
                    className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Include References Section
                  </span>
                </label>
              </div>

              <Button
                type="submit"
                className="w-full"
                size="lg"
                isLoading={isGenerating}
              >
                <Sparkles className="mr-2 h-5 w-5" />
                Generate Long-Form Article
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Generated Content */}
        <div className="space-y-6">
          <Card variant="glass">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Generated Article</CardTitle>
                {generatedContent && (
                  <div className="flex gap-2">
                    <button
                      onClick={handleCopy}
                      className="p-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                      title="Copy"
                    >
                      <Copy className="h-5 w-5" />
                    </button>
                    <button
                      onClick={handleDownload}
                      className="p-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                      title="Download"
                    >
                      <Download className="h-5 w-5" />
                    </button>
                    <button
                      onClick={handleSave}
                      disabled={isSaving}
                      className="p-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors disabled:opacity-50"
                      title="Save"
                    >
                      <Save className="h-5 w-5" />
                    </button>
                  </div>
                )}
              </div>
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
                  <Sparkles className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Your long-form article will appear here</p>
                </div>
              )}
            </CardContent>
          </Card>

          {imagePrompts.length > 0 && (
            <ImagePromptsDisplay prompts={imagePrompts} />
          )}

          {generatedContent && (
            <TTSPlayer text={generatedContent.slice(0, 4096)} />
          )}
        </div>
      </div>
    </div>
  );
}
