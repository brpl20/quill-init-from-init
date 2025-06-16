'use client';
import dynamic from 'next/dynamic';
import React, { useRef, useState } from 'react';

const RichTextEditor = dynamic(() => import('@/app/component/RichTextEditor'), { 
  ssr: false 
});

// Define the RichTextEditorHandle type
type RichTextEditorHandle = {
  getContent: () => string;
  getDelta: () => any; // Changed from JSON to any
};

export default function Home() {
  const editorRef = useRef<RichTextEditorHandle>(null);
  const [editorContent, setEditorContent] = useState<string>('');
  const [deltaContent, setDeltaContent] = useState<any>(); // Changed from JSON to any

  const handleGetContent = () => {
    if (editorRef.current) {
      const content = editorRef.current.getContent();
      const delta = editorRef.current.getDelta();
      setEditorContent(content);
      setDeltaContent(delta); // Fixed: Now setting delta content to state
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-center font-bold my-5 text-xl">Rich Text Editor</h1>
      <div>
        <RichTextEditor ref={editorRef} />
      </div>
      <button
        onClick={handleGetContent}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Show Content
      </button>
      <div className="mt-4">
        <h2 className="font-bold text-lg">Editor Content (HTML):</h2>
        <div
          className="border p-4 rounded bg-gray-50 text-black"
          dangerouslySetInnerHTML={{ __html: editorContent }}
        />
      </div>
      <div className="mt-4">
        <h2 className="font-bold text-lg">Editor content (Delta):</h2>
        <pre className="border p-4 rounded bg-gray-50 whitespace-pre-wrap text-black">
          {deltaContent ? JSON.stringify(deltaContent, null, 2) : ''}
        </pre>
      </div>
    </div>
  );
}