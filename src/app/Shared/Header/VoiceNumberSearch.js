'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { CiMicrophoneOn, CiMicrophoneOff } from 'react-icons/ci';

export default function VoiceNumberSearch() {
  const [lang, setLang] = useState('en-IN');
  const [listeningActive, setListeningActive] = useState(false);
  const router = useRouter();
  const { transcript, listening, resetTranscript } = useSpeechRecognition();

  const parseParams = (text) => {
    const t = text.toLowerCase();
    const start_with  = (t.match(/start with.*?(\d+)/)    || [])[1] || '';
    const end_with    = (t.match(/end with.*?(\d+)/)      || [])[1] || '';
    const contains    = (t.match(/contain(?:s)?.*?(\d+)/) || [])[1] || '';
    const not_contain = (t.match(/not contain(?:s)?.*?(\d+)/) || [])[1] || '';
    let any_where = '';
    if (!start_with && !end_with && !contains && !not_contain) {
      const allDigits = t.match(/\d+/g);
      any_where = allDigits ? allDigits.join('') : '';
    }
    return { start_with, end_with, contains, not_contain, any_where };
  };

  useEffect(() => {
    if (!transcript) return;
    const { start_with, end_with, contains, not_contain, any_where } = parseParams(transcript);
    if (start_with || end_with || contains || not_contain || any_where) {
      const query = new URLSearchParams({
        type: 'advanced',
        start_with,
        any_where,
        end_with,
        contains,
        not_contain,
        callCount: '0',
        searchBy: 'digit',
        comingsoon: 'yes',
        star_status: 'true',
      }).toString();
      router.push(`/search-results?${query}`);
      SpeechRecognition.stopListening();
      resetTranscript();
      setListeningActive(false);
    }
  }, [transcript, router, resetTranscript]);

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return <p className="text-red-600">Your browser does not support voice search.</p>;
  }

  const toggleListening = () => {
    if (listening) {
      SpeechRecognition.stopListening();
      setListeningActive(false);
    } else {
      resetTranscript();
      SpeechRecognition.startListening({ continuous: false, interimResults: false, language: lang });
      setListeningActive(true);
    }
  };

  // Siri-style colors
  const barColors = [
    '#30FFAE', // mint
    '#2AB7EC', // cyan
    '#FF2AE0', // magenta
    '#FFAB00', // amber
    '#8A2BE2', // violet
  ];

  return (
    <>
      {/* Siri-style overlay loader */}
      {listeningActive && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="flex items-end space-x-1">
            {barColors.map((color, i) => (
              <span
                key={i}
                className="block w-2 rounded-full animate-wave"
                style={{
                  backgroundColor: color,
                  animationDelay: `${i * 120}ms`,
                  height: '1rem',
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Controls */}
      <div className="flex items-center space-x-4 p-1 bg-white shadow-lg rounded-full">
        <select
          value={lang}
          onChange={(e) => setLang(e.target.value)}
          className=" rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
        >
          <option value="en-IN">English</option>
          <option value="hi-IN">हिन्दी</option>
        </select>

        <button
          onClick={toggleListening}
          className={`flex items-center justify-center w-7 h-7 rounded-full transition-transform 
            ${listening ? 'bg-gradient-to-br from-indigo-500 to-purple-600 scale-110' 
                       : 'bg-primary from-gray-300 to-gray-400 hover:scale-105'}`}
          aria-label={listening ? 'Stop listening' : 'Start voice search'}
        >
          {listening ? (
            <CiMicrophoneOn className="text-white text-3xl" />
          ) : (
            <CiMicrophoneOff className="text-white text-3xl" />
          )}
        </button>
      </div>

      <style jsx>{`
        @keyframes wave {
          0%, 100% { transform: scaleY(0.5); }
          50%      { transform: scaleY(1.8); }
        }
        .animate-wave {
          animation: wave 600ms ease-in-out infinite;
        }
      `}</style>
    </>
  );
}
