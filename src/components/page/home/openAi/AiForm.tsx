"use client";

import { openAi } from "@/services/openAiService";
import { useState } from "react";

export default function AiForm() {
  // const [loading, setLoading] = useState(false);
  // const [aiResult, setAiResult] = useState(null);
  const [preference, setPreference] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    const res = await openAi({ preference });
    console.log("AI form", res);
    setResult(res.data);
    setLoading(false);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="border p-2 rounded w-full"
          placeholder="e.g., vegetarian, spicy, kebab"
          value={preference}
          onChange={(e) => setPreference(e.target.value)}
        />

        <button
          type="submit"
          className="bg-blue-600 text-white p-2 rounded w-full"
        >
          {loading ? "Finding..." : "Find Dish"}
        </button>
      </form>

      {result && (
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
