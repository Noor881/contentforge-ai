"use client";

import { useState } from "react";
import Card, { CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import toast from "react-hot-toast";
import { Sparkles, Copy, Music2 } from "lucide-react";
import TTSPlayer from "@/components/TTSPlayer";

export default function SongLyricsGenerator() {
  const [formData, setFormData] = useState({
    genre: "pop",
    theme: "",
    emotion: "happy",
    structure: "verse-chorus",
  });
  const [generatedContent, setGeneratedContent] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);

    try {
      const prompt = `Write song lyrics with these specifications:
Genre: ${formData.genre}
Theme/Topic: ${formData.theme}
Emotion/Mood: ${formData.emotion}
Structure: ${formData.structure}

${formData.structure === "verse-chorus" ? "Include: Verse 1, Chorus, Verse 2, Chorus, Bridge, Final Chorus" : ""}
${formData.structure === "verse-chorus-verse" ? "Include: Verse 1, Chorus, Verse 2, Chorus, Verse 3, Chorus" : ""}
${formData.structure === "aaba" ? "Include: A section (8 bars), A section (8 bars), B section/Bridge (8 bars), A section (8 bars)" : ""}

Make it:
- Rhythmic and singable
- Use appropriate rhyme schemes
- Match the ${formData.emotion} emotion
- Authentic to ${formData.genre} genre
- Memorable and catchy`;

      const res = await fetch("/api/content/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "song_lyrics", params: formData, prompt }),
      });

      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || "Failed to generate lyrics");
        return;
      }

      setGeneratedContent(data.content);
      toast.success("Lyrics generated!");
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
          <Music2 className="h-8 w-8 text-primary-600" />
          Song Lyrics Generator
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Create original song lyrics for any genre
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <Card variant="default">
          <CardHeader>
            <CardTitle>Song Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleGenerate} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Genre
                </label>
                <select
                  value={formData.genre}
                  onChange={(e) =>
                    setFormData({ ...formData, genre: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:border-primary-500 focus:outline-none"
                >
                  <option value="pop">Pop</option>
                  <option value="rock">Rock</option>
                  <option value="hip-hop">Hip-Hop/Rap</option>
                  <option value="country">Country</option>
                  <option value="r&b">R&B</option>
                  <option value="edm">EDM</option>
                  <option value="indie">Indie</option>
                  <option value="folk">Folk</option>
                </select>
              </div>
              <Input
                label="Theme/Topic"
                required
                placeholder="e.g., heartbreak, celebration, summer love"
                value={formData.theme}
                onChange={(e) =>
                  setFormData({ ...formData, theme: e.target.value })
                }
              />
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Emotion
                </label>
                <select
                  value={formData.emotion}
                  onChange={(e) =>
                    setFormData({ ...formData, emotion: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:border-primary-500 focus:outline-none"
                >
                  <option value="happy">Happy/Uplifting</option>
                  <option value="sad">Sad/Melancholic</option>
                  <option value="energetic">Energetic/Powerful</option>
                  <option value="romantic">Romantic</option>
                  <option value="angry">Angry/Rebellious</option>
                  <option value="nostalgic">Nostalgic</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Structure
                </label>
                <select
                  value={formData.structure}
                  onChange={(e) =>
                    setFormData({ ...formData, structure: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:border-primary-500 focus:outline-none"
                >
                  <option value="verse-chorus">Verse-Chorus-Bridge</option>
                  <option value="verse-chorus-verse">Verse-Chorus-Verse</option>
                  <option value="aaba">AABA Format</option>
                </select>
              </div>
              <Button
                type="submit"
                className="w-full"
                size="lg"
                isLoading={isGenerating}
              >
                <Sparkles className="mr-2 h-5 w-5" />
                Generate Lyrics
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card variant="bordered">
            <CardHeader>
              <CardTitle>Generated Lyrics</CardTitle>
            </CardHeader>
            <CardContent>
              {generatedContent ? (
                <div className="prose dark:prose-invert max-w-none">
                  <div className="whitespace-pre-wrap text-gray-800 dark:text-gray-200 font-serif italic">
                    {generatedContent}
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                  <Music2 className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Your song lyrics will appear here</p>
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
