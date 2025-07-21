'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CiMicrophoneOn, CiMicrophoneOff } from 'react-icons/ci';

export default function VoiceNumberSearch() {
  const [lang, setLang] = useState('en-IN');
  const [listening, setListening] = useState(false);
  const router = useRouter();
  let recognition = null;

  useEffect(() => {
    const WebSpeech = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!WebSpeech) return;
    recognition = new WebSpeech();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.onresult = (e) => {
      const text = e.results[0][0].transcript.toLowerCase();
      handleTranscript(text);
      setListening(false);
    };
    recognition.onerror = () => setListening(false);
  }, []);

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

  const toggle = () => {
    if (!recognition) { alert('Browser does not support voice.'); return; }
    if (listening) {
      recognition.stop();
      setListening(false);
    } else {
      recognition.lang = lang;
      recognition.start();
      setListening(true);
    }
  };

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 flex items-center space-x-3 bg-white p-4 rounded-full shadow">
      <select
        value={lang}
        onChange={e => setLang(e.target.value)}
        className="border rounded px-2 py-1 text-sm"
      >
        <option value="en-IN">English</option>
        <option value="hi-IN">हिन्दी</option>
      </select>
      <button
        onClick={toggle}
        className={`w-12 h-12 flex items-center justify-center rounded-full ${
          listening ? 'bg-red-500' : 'bg-[#ffce00]'
        }`}
      >
        {listening
          ? <CiMicrophoneOff className="text-white text-2xl"/>
          : <CiMicrophoneOn className="text-white text-2xl"/>}
      </button>
    </div>
  );
}
