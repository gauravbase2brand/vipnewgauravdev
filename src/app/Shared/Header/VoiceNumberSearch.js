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

  // Split on “and”/“aur”/commas, then detect each filter
  const parseParams = (text) => {
    const t = text.toLowerCase();
    let start_with = '', end_with = '', contains = '', not_contain = '', any_where = '';
    const segments = t.split(/\s+and\s+|\s+aur\s+|,/);

    segments.forEach(seg => {
      let m;
      if (!start_with && (m = seg.match(/start with.*?(\d+)/))) {
        start_with = m[1];
      } else if (!end_with && (m = seg.match(/end with.*?(\d+)/))) {
        end_with = m[1];
      } else if (!contains && (m = seg.match(/contain(?:s)?.*?(\d+)/))) {
        contains = m[1];
      } else if (!not_contain && (m = seg.match(/not contain(?:s)?.*?(\d+)/))) {
        not_contain = m[1];
      } else if (!any_where && (m = seg.match(/\d+/g))) {
        any_where = m.join('');
      }
    });

    return { start_with, end_with, contains, not_contain, any_where };
  };

  // On transcript update → parse, navigate if any filter, then clean up
  useEffect(() => {
    if (!transcript) return;
    const { start_with, end_with, contains, not_contain, any_where } = parseParams(transcript);
    const hasFilter = start_with || end_with || contains || not_contain || any_where;

    if (hasFilter) {
      const query = new URLSearchParams({
        type:        'advanced',
        start_with,
        any_where,
        end_with,
        contains,
        not_contain,
        callCount:   '0',
        searchBy:    'digit',
        comingsoon:  'yes',
        star_status: 'true',
      }).toString();

      router.push(`/search-results?${query}`);
    }

    // always stop listening & hide loader
    SpeechRecognition.stopListening();
    setListeningActive(false);
    resetTranscript();
  }, [transcript, router, resetTranscript]);

  // If listening stops (on silence) without a transcript match, hide loader
  useEffect(() => {
    if (!listening && listeningActive) {
      setListeningActive(false);
      resetTranscript();
    }
  }, [listening, listeningActive, resetTranscript]);

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return <p className="text-red-600">Your browser does not support voice search.</p>;
  }

  const toggleListening = () => {
    if (listening) {
      SpeechRecognition.stopListening();
      setListeningActive(false);
    } else {
      resetTranscript();
      SpeechRecognition.startListening({
        continuous:     false,
        interimResults: false,
        language:       lang,
      });
      setListeningActive(true);
    }
  };

  // Siri-style gradient bars
  const barColors = ['#30FFAE','#2AB7EC','#FF2AE0','#FFAB00','#8A2BE2'];

  return (
    <>
      {/* Loader overlay */}
      {listeningActive && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 pointer-events-none">
          <div className="flex items-end space-x-1">
            {barColors.map((c,i) => (
              <span
                key={i}
                className="block w-2 rounded-full animate-wave"
                style={{ backgroundColor: c, animationDelay: `${i * 120}ms`, height: '1rem' }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Control pill */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-white shadow-xl rounded-full px-4 py-2 flex items-center space-x-3">
        <select
          value={lang}
          onChange={e => setLang(e.target.value)}
          className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
        >
          <option value="en-IN">English</option>
          <option value="hi-IN">हिन्दी</option>
        </select>

        <button
          onClick={toggleListening}
          className={`flex items-center justify-center w-12 h-12 rounded-full transition-transform ${
            listening
              ? 'bg-gradient-to-br from-indigo-500 to-purple-600 scale-110'
              : 'bg-[#ffce00] hover:scale-105'
          }`}
          aria-label={listening ? 'Stop listening' : 'Start voice search'}
        >
          {listening
            ? <CiMicrophoneOn className="text-white text-2xl" />
            : <CiMicrophoneOff className="text-white text-2xl" />}
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
