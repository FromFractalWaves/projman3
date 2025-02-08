// src/app/notepad/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { Save } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { Button } from '@/components/ui/button';

export default function NotepadPage() {
  const [text, setText] = useState('');
  const [savedText, setSavedText] = useState('');
  const [showSaved, setShowSaved] = useState(false);

  // Load saved content from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('notepad-content');
    if (saved) {
      setText(saved);
      setSavedText(saved);
    }
  }, []);

  // Handle text changes
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    setShowSaved(false);
  };

  // Save content to localStorage
  const handleSave = () => {
    localStorage.setItem('notepad-content', text);
    setSavedText(text);
    setShowSaved(true);
    setTimeout(() => setShowSaved(false), 2000);
  };

  // Handle keyboard shortcuts
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.ctrlKey && e.key === 's') {
      e.preventDefault();
      handleSave();
    }
  };

  return (
    <div className="min-h-screen bg-black p-6">
      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-white">Notepad</CardTitle>
          <Button 
            onClick={handleSave}
            className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
          >
            <Save className="h-4 w-4" />
            Save
          </Button>
        </CardHeader>
        <CardContent>
          {showSaved && (
            <div className="mb-4 p-2 bg-emerald-900/50 text-emerald-400 rounded-md border border-emerald-800">
              Changes saved successfully!
            </div>
          )}

          <textarea
            className="w-full p-4 bg-zinc-800 border border-zinc-700 rounded-md resize-none 
                     focus:outline-none focus:ring-2 focus:ring-blue-500 text-zinc-100 font-mono
                     min-h-[calc(100vh-16rem)]"
            value={text}
            onChange={handleTextChange}
            onKeyDown={handleKeyDown}
            spellCheck={true}
            placeholder="Start typing... (Ctrl+S to save)"
          />

          <div className="mt-4 text-sm text-zinc-400 flex justify-between">
            <span>{text.length} characters</span>
            <span>{text.split(/\s+/).filter(Boolean).length} words</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}