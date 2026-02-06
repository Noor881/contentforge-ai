"use client";

import { useState } from "react";
import Card, { CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import toast from "react-hot-toast";
import { Sparkles, Feather } from "lucide-react";
import TTSPlayer from "@/components/TTSPlayer";

export default function PoemGenerator() {
  const [formData, setFormData] = useState({
    style: "free-verse",
    theme: "",
    mood: "contemplative",
    lines: "12",
  });
  const [generatedContent, setGeneratedContent] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);

    try {
      const prompt = `Write a ${formData.style} poem about "${formData.theme}":
- Style: ${formData.style}
- Mood: ${formData.mood}
- Approximate lines: ${formData.lines}

${formData.style === "haiku" ? "Follow 5-7-5 syllable pattern" : ""}
${formData.style === "sonnet" ? "Follow 14-line iambic pentameter with ABAB CDCD EFEF GG rhyme scheme" : ""}
${formData.style === "limerick" ? "Follow AABBA rhyme scheme, humorous tone" : ""}
${formData.style === "free-verse" ? "Use natural rhythm and imagery, no strict form" : ""}

Make it evocative, meaningful, and well-crafted.`;

      const res = await fetch("/api/content/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "poem", params: formData, prompt }),
      });

      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || "Failed to generate");
        return;
      }

      setGeneratedContent(data.content);
      toast.success("Poem generated!");
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
          <Feather className="h-8 w-8 text-primary-600" />
          Poem Generator
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Create beautiful poetry in various styles
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <Card variant="default">
          <CardHeader>
            <CardTitle>Poem Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleGenerate} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Style
                </label>
                <select
                  value={formData.style}
                  onChange={(e) =>
                    setFormData({ ...formData, style: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:border-primary-500 focus:outline-none"
                >
                  <option value="free-verse">Free Verse</option>
                  <option value="haiku">Haiku</option>
                  <option value="sonnet">Sonnet</option>
                  <option value="limerick">Limerick</option>
                  <option value="acrostic">Acrostic</option>
                  <option value="ballad">Ballad</option>
                </select>
              </div>
              <Input
                label="Theme/Subject"
                required
                placeholder="e.g., nature, love, time, change"
                value={formData.theme}
                onChange={(e) =>
                  setFormData({ ...formData, theme: e.target.value })
                }
              />
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Mood
                  </label>
                  <select
                    value={formData.mood}
                    onChange={(e) =>
                      setFormData({ ...formData, mood: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:border-primary-500 focus:outline-none"
                  >
                    <option value="contemplative">Contemplative</option>
                    <option value="joyful">Joyful</option>
                    <option value="melancholic">Melancholic</option>
                    <option value="passionate">Passionate</option>
                    <option value="peaceful">Peaceful</option>
                    <option value="dark">Dark</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Approx. Lines
                  </label>
                  <select
                    value={formData.lines}
                    onChange={(e) =>
                      setFormData({ ...formData, lines: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:border-primary-500 focus:outline-none"
                  >
                    <option value="8">8 lines</option>
                    <option value="12">12 lines</option>
                    <option value="14">14 lines</option>
                    <option value="16">16 lines</option>
                    <option value="20">20 lines</option>
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
                Generate Poem
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card variant="default">
            <CardHeader>
              <CardTitle>Generated Poem</CardTitle>
            </CardHeader>
            <CardContent>
              {generatedContent ? (
                <div className="prose dark:prose-invert max-w-none">
                  <div className="whitespace-pre-wrap text-gray-800 dark:text-gray-200 font-serif italic text-center">
                    {generatedContent}
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                  <Feather className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Your poem will appear here</p>
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
