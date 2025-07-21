'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { CiMicrophoneOn, CiMicrophoneOff } from 'react-icons/ci';

export default function VoiceNumberSearch() {
  const [lang, setLang] = useState('en-IN');
  const [listening, setListening] = useState(false);
  const [supported, setSupported] = useState(true);
  const recognitionRef = useRef(null);
  const timerRef = useRef(null);
  const lastTranscriptRef = useRef('');
  const router = useRouter();

  // 1) Initialize once
  useEffect(() => {
    const WebSpeech = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!WebSpeech) {
      setSupported(false);
      return;
    }
    const recog = new WebSpeech();
    recog.continuous = false;
    recog.interimResults = false;

    recog.onresult = (e) => {
      const text = e.results[0][0].transcript.toLowerCase();
      lastTranscriptRef.current = text;

      // clear any existing 3s timer
      clearTimeout(timerRef.current);
      // set new 3s timer to process it
      timerRef.current = setTimeout(() => {
        handleTranscript(text);
        setListening(false);
      }, 3000);
    };

    recog.onerror = () => {
      clearTimeout(timerRef.current);
      setListening(false);
    };

    recognitionRef.current = recog;
    return () => {
      clearTimeout(timerRef.current);
      if (recog) recog.stop();
    };
  }, []);

  // 2) Parse & navigate
  const handleTranscript = (t) => {
    const start_with  = (t.match(/start(?:s)? with\s*(\d+)/)    || [])[1] || '';
    const end_with    = (t.match(/end(?:s)? with\s*(\d+)/)      || [])[1] || '';
    const contains    = (t.match(/contain(?:s)?\s*(\d+)/)      || [])[1] || '';
    const not_contain = (t.match(/not contain(?:s)?\s*(\d+)/) || [])[1] || '';
    let any_where = '';
    if (!start_with && !end_with && !contains && !not_contain) {
      const all = t.match(/\d+/g);
      any_where = all ? all.join('') : '';
    }

    if (start_with||end_with||contains||not_contain||any_where) {
      const q = new URLSearchParams({
        type:        'advanced',
        start_with, any_where, end_with, contains, not_contain,
        callCount:   '0', searchBy:'digit', comingsoon:'yes', star_status:'true'
      }).toString();
      router.push(`/search-results?${q}`);
    }
  };

  // 3) Start/stop listening
  const toggle = () => {
    const recog = recognitionRef.current;
    if (!recog) {
      alert('Sorry, your browser does not support voice search.');
      return;
    }
    if (listening) {
      recog.stop();
      clearTimeout(timerRef.current);
      setListening(false);
    } else {
      clearTimeout(timerRef.current);
      recog.lang = lang;
      recog.start();
      setListening(true);
    }
  };

  // 4) Fallback UI
  if (!supported) {
    return (
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-yellow-100 p-3 rounded shadow">
        <p className="text-yellow-800">⚠️ Voice search not supported in this browser.</p>
      </div>
    );
  }

  // 5) Render controls
  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 flex items-center space-x-3 bg-white p-4 rounded-full shadow-lg">
      <select
        value={lang}
        onChange={e => setLang(e.target.value)}
        className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
      >
        <option value="en-IN">English</option>
        <option value="hi-IN">हिन्दी</option>
      </select>
      <button
        onClick={toggle}
        className={`w-12 h-12 flex items-center justify-center rounded-full transition-transform ${
          listening ? 'bg-red-500 scale-110' : 'bg-[#ffce00] hover:scale-105'
        }`}
        aria-label={listening ? 'Stop listening' : 'Start voice search'}
      >
        {listening
          ? <CiMicrophoneOff className="text-white text-2xl" />
          : <CiMicrophoneOn className="text-white text-2xl" />}
      </button>
    </div>
  );
}
