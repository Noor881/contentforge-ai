"use client";

import { useState } from "react";
import Card, { CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import toast from "react-hot-toast";
import { Sparkles, Copy, Save } from "lucide-react";

export default function SocialMediaGenerator() {
  const [formData, setFormData] = useState({
    topic: "",
    platform: "twitter",
    tone: "friendly",
    includeHashtags: true,
    includeEmojis: true,
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
          type: "social_media",
          params: formData,
          prompt: `Create a ${formData.platform} post about "${formData.topic}" in a ${formData.tone} tone. ${formData.includeHashtags ? "Include relevant hashtags." : ""} ${formData.includeEmojis ? "Include emojis." : ""}`,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (res.status === 429) {
          toast.error(`Usage limit reached!`);
        } else {
          toast.error(data.error || "Failed to generate content");
        }
        return;
      }

      setGeneratedContent(data.content);
      toast.success("Post generated successfully!");
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSave = async () => {
    if (!generatedContent) return;

    try {
      const res = await fetch("/api/content/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "social_media",
          title: `${formData.platform} - ${formData.topic}`,
          content: generatedContent,
          prompt: formData.topic,
          metadata: formData,
        }),
      });

      if (res.ok) toast.success("Saved to library!");
      else toast.error("Failed to save");
    } catch (error) {
      toast.error("An error occurred");
    }
  };

  const getPlatformCharLimit = () => {
    const limits: Record<string, number> = {
      twitter: 280,
      linkedin: 3000,
      instagram: 2200,
      facebook: 63206,
    };
    return limits[formData.platform] || 0;
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-3">
          <Sparkles className="h-8 w-8 text-purple-600" />
          Social Media Content Creator
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Generate platform-optimized posts for all major social networks
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <Card variant="default">
          <CardHeader>
            <CardTitle>Post Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleGenerate} className="space-y-6">
              <Input
                label="Topic or Message"
                required
                placeholder="e.g., Launching our new AI product"
                value={formData.topic}
                onChange={(e) =>
                  setFormData({ ...formData, topic: e.target.value })
                }
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Platform
                </label>
                <select
                  value={formData.platform}
                  onChange={(e) =>
                    setFormData({ ...formData, platform: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/20 focus:outline-none"
                >
                  <option value="twitter">Twitter / X</option>
                  <option value="linkedin">LinkedIn</option>
                  <option value="instagram">Instagram</option>
                  <option value="facebook">Facebook</option>
                </select>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Character limit: {getPlatformCharLimit()}
                </p>
              </div>

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
                  <option value="friendly">Friendly</option>
                  <option value="enthusiastic">Enthusiastic</option>
                  <option value="inspirational">Inspirational</option>
                </select>
              </div>

              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.includeHashtags}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        includeHashtags: e.target.checked,
                      })
                    }
                    className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Include hashtags
                  </span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.includeEmojis}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        includeEmojis: e.target.checked,
                      })
                    }
                    className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Include emojis
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
                Generate Post
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card variant="bordered">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Generated Post</CardTitle>
              {generatedContent && (
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(generatedContent);
                      toast.success("Copied!");
                    }}
                    className="p-2 text-gray-600 dark:text-gray-400 hover:text-primary-600"
                  >
                    <Copy className="h-5 w-5" />
                  </button>
                  <button
                    onClick={handleSave}
                    className="p-2 text-gray-600 dark:text-gray-400 hover:text-primary-600"
                  >
                    <Save className="h-5 w-5" />
                  </button>
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {generatedContent ? (
              <div>
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border-2 border-gray-200 dark:border-gray-700">
                  <div className="whitespace-pre-wrap text-gray-800 dark:text-gray-200">
                    {generatedContent}
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 text-sm text-gray-500 dark:text-gray-400">
                    Character count: {generatedContent.length}/
                    {getPlatformCharLimit()}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                <Sparkles className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Your social media post will appear here</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
