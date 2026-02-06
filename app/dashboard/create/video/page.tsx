"use client";

import { useState } from "react";
import Card, { CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import toast from "react-hot-toast";
import { Sparkles, Copy, Save } from "lucide-react";

export default function VideoScriptGenerator() {
  const [formData, setFormData] = useState({
    topic: "",
    duration: "1min",
    style: "educational",
    targetAudience: "",
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
          type: "video_script",
          params: formData,
          prompt: `Write a ${formData.duration} ${formData.style} video script about "${formData.topic}" for ${formData.targetAudience}. Include hooks, timing cues, and calls-to-action.`,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || "Failed to generate script");
        return;
      }

      setGeneratedContent(data.content);
      toast.success("Video script generated!");
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
          <Sparkles className="h-8 w-8 text-red-600" />
          Video Script Writer
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Write professional video scripts with perfect structure and timing
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <Card variant="default">
          <CardHeader>
            <CardTitle>Script Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleGenerate} className="space-y-6">
              <Input
                label="Video Topic"
                required
                placeholder="e.g., How to Start a Podcast"
                value={formData.topic}
                onChange={(e) =>
                  setFormData({ ...formData, topic: e.target.value })
                }
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Duration
                </label>
                <select
                  value={formData.duration}
                  onChange={(e) =>
                    setFormData({ ...formData, duration: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/20 focus:outline-none"
                >
                  <option value="30sec">30 seconds</option>
                  <option value="1min">1 minute</option>
                  <option value="3min">3 minutes</option>
                  <option value="5min">5 minutes</option>
                  <option value="10min">10 minutes</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Style
                </label>
                <select
                  value={formData.style}
                  onChange={(e) =>
                    setFormData({ ...formData, style: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/20 focus:outline-none"
                >
                  <option value="educational">Educational</option>
                  <option value="entertaining">Entertaining</option>
                  <option value="promotional">Promotional</option>
                  <option value="tutorial">Tutorial</option>
                </select>
              </div>

              <Input
                label="Target Audience"
                placeholder="e.g., beginners, professionals"
                value={formData.targetAudience}
                onChange={(e) =>
                  setFormData({ ...formData, targetAudience: e.target.value })
                }
              />

              <Button
                type="submit"
                className="w-full"
                size="lg"
                isLoading={isGenerating}
              >
                <Sparkles className="mr-2 h-5 w-5" />
                Generate Script
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card variant="bordered">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Generated Script</CardTitle>
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
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                <div className="whitespace-pre-wrap text-gray-800 dark:text-gray-200 font-mono text-sm">
                  {generatedContent}
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                <Sparkles className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Your video script will appear here</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
