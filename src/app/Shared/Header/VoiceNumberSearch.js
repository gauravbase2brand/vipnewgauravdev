'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { CiMicrophoneOn, CiMicrophoneOff } from 'react-icons/ci';

export default function VoiceNumberSearch() {
  const [lang, setLang] = useState('en-IN');
  const [listening, setListening] = useState(false);
  const [supported, setSupported] = useState(true);
  const recogRef = useRef(null);
  const router = useRouter();

  // 1) Initialize SpeechRecognition once
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
      const transcript = e.results[0][0].transcript;
      // show alert with exactly what you said:
      alert(`You said: "${transcript}"`);
      const t = transcript.toLowerCase();
      processTranscript(t);
      setListening(false);
    };
    recog.onerror = () => {
      setListening(false);
    };
    recogRef.current = recog;
  }, []);

  // 2) Parse filters and navigate
  const processTranscript = (t) => {
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
      const query = new URLSearchParams({
        type:        'advanced',
        start_with, any_where,
        end_with, contains, not_contain,
        callCount:   '0',
        searchBy:    'digit',
        comingsoon:  'yes',
        star_status: 'true',
      }).toString();
      router.push(`/search-results?${query}`);
    }
  };

  // 3) Toggle listening
  const onMicClick = () => {
    const recog = recogRef.current;
    if (!recog) {
      return alert('Voice search not supported.');
    }
    if (listening) {
      recog.stop();
      setListening(false);
    } else {
      recog.lang = lang;
      recog.start();
      setListening(true);
    }
  };

  if (!supported) {
    return (
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-yellow-100 p-3 rounded shadow">
        <p className="text-yellow-800 text-sm">⚠️ Voice search not supported.</p>
      </div>
    );
  }

  return (
    <>
      {/* Loader while mic is open */}
      {listening && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 pointer-events-none">
          <div className="flex items-end space-x-1">
            {['#30FFAE','#2AB7EC','#FF2AE0','#FFAB00','#8A2BE2'].map((c,i) => (
              <span
                key={i}
                className="w-2 rounded-full animate-wave"
                style={{ backgroundColor:c, animationDelay:`${i*120}ms`, height:'1rem' }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Control */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-white shadow-lg rounded-full px-4 py-2 flex items-center space-x-3">
        <select
          value={lang}
          onChange={e => setLang(e.target.value)}
          className="border rounded px-2 py-1 text-sm"
        >
          <option value="en-IN">English</option>
          <option value="hi-IN">हिन्दी</option>
        </select>
        <button
          onClick={onMicClick}
          className={`w-12 h-12 flex items-center justify-center rounded-full transition-transform ${
            listening
              ? 'bg-gradient-to-br from-indigo-500 to-purple-600 scale-110'
              : 'bg-[#ffce00] hover:scale-105'
          }`}
          aria-label={listening ? 'Stop listening' : 'Start voice search'}
        >
          {listening
            ? <CiMicrophoneOff className="text-white text-2xl" />
            : <CiMicrophoneOn  className="text-white text-2xl" />}
        </button>
      </div>

      <style jsx>{`
        @keyframes wave {
          0%,100% { transform: scaleY(0.5); }
          50%      { transform: scaleY(1.8); }
        }
        .animate-wave { animation: wave 600ms ease-in-out infinite; }
      `}</style>
    </>
  );
}
