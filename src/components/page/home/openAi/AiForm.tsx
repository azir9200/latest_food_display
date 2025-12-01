"use client";

import { openAi } from "@/services/openAiService";
import { useState } from "react";

export default function HeroForm() {
  const [loading, setLoading] = useState(false);
  const [aiResult, setAiResult] = useState(null);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    const symptoms = formData.get("symptoms");

    const data = {
      symptoms,
    };

    const result = await openAi(data); 
    setAiResult(result);
    setLoading(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="text-[11.9px] text-gray-700">
            What are your Food choice?
          </label>
          <input
            name="symptoms"
            placeholder="e.g., vegeterian, fish, spanish"
            className="h-[49.787px] w-full rounded-xl border-gray-300 p-3"
          />
        </div>

        <button
          type="submit"
          className="h-[59.986px] w-full rounded-xl bg-blue-600 text-[15.3px] hover:bg-blue-700"
        >
          {loading ? "Generating..." : "Get AI Recommendations"}
        </button>
      </form>

      {aiResult && (
        <div className="mt-4 rounded-xl bg-gray-100 p-4 text-sm">
          <pre>{JSON.stringify(aiResult, null, 2)}</pre>
        </div>
      )}
    </>
  );
}
