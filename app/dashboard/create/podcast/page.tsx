"use client";

import { useState } from "react";
import Card, { CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import toast from "react-hot-toast";
import { Sparkles, Mic } from "lucide-react";
import TTSPlayer from "@/components/TTSPlayer";

export default function PodcastScriptGenerator() {
  const [formData, setFormData] = useState({
    episodeTitle: "",
    topic: "",
    duration: "30",
    format: "solo",
    guests: "",
    keyPoints: "",
  });
  const [generatedContent, setGeneratedContent] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);

    try {
      const prompt = `Create a podcast script with these specifications:
Episode Title: ${formData.episodeTitle}
Topic: ${formData.topic}
Duration: ${formData.duration} minutes
Format: ${formData.format}
${formData.guests ? `Guests: ${formData.guests}` : ""}
Key Points to Cover: ${formData.keyPoints || "Cover all important aspects of the topic"}

Include:
- Opening/Intro (hook, intro music cue, episode overview)
- Main segments with timestamps
- ${formData.format === "interview" ? "Interview questions and talking points" : "Host talking points and transitions"}
- ${formData.format === "interview" ? "Follow-up questions" : "Ad/sponsorship breaks (optional)"}
- Closing (recap, CTA, outro music cue)
- Show notes summary

Make it conversational, engaging, and well-paced for audio format.`;

      const res = await fetch("/api/content/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "podcast", params: formData, prompt }),
      });

      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || "Failed to generate");
        return;
      }

      setGeneratedContent(data.content);
      toast.success("Podcast script generated!");
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
          <Mic className="h-8 w-8 text-primary-600" />
          Podcast Script Generator
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Create engaging podcast scripts with timestamps
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <Card variant="default">
          <CardHeader>
            <CardTitle>Episode Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleGenerate} className="space-y-6">
              <Input
                label="Episode Title"
                required
                placeholder="e.g., The Future of AI in Marketing"
                value={formData.episodeTitle}
                onChange={(e) =>
                  setFormData({ ...formData, episodeTitle: e.target.value })
                }
              />
              <Input
                label="Topic/Theme"
                required
                placeholder="Main topic or theme of the episode"
                value={formData.topic}
                onChange={(e) =>
                  setFormData({ ...formData, topic: e.target.value })
                }
              />
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Duration
                  </label>
                  <select
                    value={formData.duration}
                    onChange={(e) =>
                      setFormData({ ...formData, duration: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:border-primary-500 focus:outline-none"
                  >
                    <option value="15">15 minutes</option>
                    <option value="30">30 minutes</option>
                    <option value="45">45 minutes</option>
                    <option value="60">60 minutes</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Format
                  </label>
                  <select
                    value={formData.format}
                    onChange={(e) =>
                      setFormData({ ...formData, format: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:border-primary-500 focus:outline-none"
                  >
                    <option value="solo">Solo/Monologue</option>
                    <option value="co-host">Co-hosted</option>
                    <option value="interview">Interview</option>
                    <option value="panel">Panel Discussion</option>
                  </select>
                </div>
              </div>
              {(formData.format === "interview" ||
                formData.format === "panel") && (
                  <Input
                    label="Guest Name(s)"
                    placeholder="Name and title of guest(s)"
                    value={formData.guests}
                    onChange={(e) =>
                      setFormData({ ...formData, guests: e.target.value })
                    }
                  />
                )}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Key Points to Cover
                </label>
                <textarea
                  value={formData.keyPoints}
                  onChange={(e) =>
                    setFormData({ ...formData, keyPoints: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:border-primary-500 focus:outline-none"
                  rows={4}
                  placeholder="List the main points you want to cover..."
                />
              </div>
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

        <div className="space-y-6">
          <Card variant="bordered">
            <CardHeader>
              <CardTitle>Generated Script</CardTitle>
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
                  <Mic className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Your podcast script will appear here</p>
                </div>
              )}
            </CardContent>
          </Card>
          {generatedContent && (
            <TTSPlayer text={generatedContent.slice(0, 4096)} />
          )}
        </div>
      </div>
    </div>
  );
}
