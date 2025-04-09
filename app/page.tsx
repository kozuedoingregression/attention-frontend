'use client';

import { useState } from 'react';

export default function Home() {
  const [germanText, setGermanText] = useState('');
  const [translation, setTranslation] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleTranslate = async () => {
    if (!germanText.trim()) {
      setError('Please enter some German text.');
      return;
    }

    setLoading(true);
    setError('');
    setTranslation('');

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/translate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: germanText }),
      });

      if (!res.ok) throw new Error('Translation failed. Please try again.');

      const data = await res.json();
      setTranslation(data.translation);
    } catch (err: any) {
      setError(err.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-white text-gray-900">
      <h1 className="text-3xl font-bold mb-6">German to English Translator 🇩🇪➡️🇺🇸</h1>

      <textarea
        rows={4}
        className="w-full max-w-md p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={germanText}
        onChange={(e) => setGermanText(e.target.value)}
        placeholder="Geben Sie hier den deutschen Text ein"
      />

      <button
        className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition disabled:opacity-50"
        onClick={handleTranslate}
        disabled={loading}
      >
        {loading ? 'Translating...' : 'Translate'}
      </button>

      {error && (
        <div className="mt-4 text-red-600 font-medium">
          {error}
        </div>
      )}

      {translation && (
        <div className="mt-6 w-full max-w-md p-4 border rounded bg-gray-100 shadow-sm">
          <h2 className="font-semibold mb-2">Translation:</h2>
          <p>{translation}</p>
        </div>
      )}
    </main>
  );
}
