"use client";

import { useState } from "react";
import Card, { CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import toast from "react-hot-toast";
import { Sparkles, Package } from "lucide-react";

export default function ProductDescriptionGenerator() {
  const [formData, setFormData] = useState({
    productName: "",
    category: "",
    features: "",
    benefits: "",
    targetAudience: "",
    tone: "professional",
  });
  const [generatedContent, setGeneratedContent] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);

    try {
      const prompt = `Create an e-commerce product description for:
Product Name: ${formData.productName}
Category: ${formData.category}
Key Features: ${formData.features}
Benefits: ${formData.benefits}
Target Audience: ${formData.targetAudience}
Tone: ${formData.tone}

Include:
1. Attention-grabbing headline
2. Compelling opening paragraph
3. Feature bullets (5-7 key product features)
4. Benefits section (how it helps the customer)
5. Technical specifications (if applicable)
6. Strong call-to-action

Optimize for e-commerce, SEO, and conversions. Make it persuasive and customer-focused.`;

      const res = await fetch("/api/content/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "product", params: formData, prompt }),
      });

      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || "Failed to generate");
        return;
      }

      setGeneratedContent(data.content);
      toast.success("Product description generated!");
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
          <Package className="h-8 w-8 text-primary-600" />
          Product Description Generator
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Create compelling e-commerce product descriptions
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <Card variant="default">
          <CardHeader>
            <CardTitle>Product Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleGenerate} className="space-y-6">
              <Input
                label="Product Name"
                required
                placeholder="e.g., Wireless Bluetooth Headphones Pro"
                value={formData.productName}
                onChange={(e) =>
                  setFormData({ ...formData, productName: e.target.value })
                }
              />
              <Input
                label="Category"
                placeholder="e.g., Electronics, Fashion, Home & Garden"
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
              />
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Key Features
                </label>
                <textarea
                  value={formData.features}
                  onChange={(e) =>
                    setFormData({ ...formData, features: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:border-primary-500 focus:outline-none"
                  rows={4}
                  placeholder="List main features, one per line..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Key Benefits
                </label>
                <textarea
                  value={formData.benefits}
                  onChange={(e) =>
                    setFormData({ ...formData, benefits: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:border-primary-500 focus:outline-none"
                  rows={3}
                  placeholder="How does this product help the customer?"
                />
              </div>
              <Input
                label="Target Audience"
                placeholder="e.g., Professionals, Athletes, Parents"
                value={formData.targetAudience}
                onChange={(e) =>
                  setFormData({ ...formData, targetAudience: e.target.value })
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
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:border-primary-500 focus:outline-none"
                >
                  <option value="professional">Professional</option>
                  <option value="casual">Casual/Friendly</option>
                  <option value="luxury">Luxury/Premium</option>
                  <option value="energetic">Energetic/Exciting</option>
                </select>
              </div>
              <Button
                type="submit"
                className="w-full"
                size="lg"
                isLoading={isGenerating}
              >
                <Sparkles className="mr-2 h-5 w-5" />
                Generate Description
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card variant="glass">
            <CardHeader>
              <CardTitle>Generated Description</CardTitle>
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
                  <Package className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Your product description will appear here</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
