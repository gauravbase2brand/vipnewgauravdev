'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { CiMicrophoneOn, CiMicrophoneOff } from 'react-icons/ci';

export default function VoiceNumberSearch() {
  const [lang, setLang] = useState('en-IN');
  const [active, setActive] = useState(false);
  const router = useRouter();
  const { transcript, listening, resetTranscript } = useSpeechRecognition();
  const debounceRef = useRef();

  // parse your filters
  const parseParams = (t) => {
    t = t.toLowerCase();
    const start_with  = (t.match(/start(?:s)? with\s*(\d+)/)    || [])[1] || '';
    const end_with    = (t.match(/end(?:s)? with\s*(\d+)/)      || [])[1] || '';
    const contains    = (t.match(/contain(?:s)?\s*(\d+)/)      || [])[1] || '';
    const not_contain = (t.match(/not contain(?:s)?\s*(\d+)/) || [])[1] || '';
    let any_where = '';
    if (!start_with && !end_with && !contains && !not_contain) {
      const all = t.match(/\d+/g);
      any_where = all ? all.join('') : '';
    }
    return { start_with, end_with, contains, not_contain, any_where };
  };

  // whenever final transcript changes, debounce then fire URL
  useEffect(() => {
    if (!transcript) return;
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      const { start_with, end_with, contains, not_contain, any_where } = parseParams(transcript);
      if (start_with || end_with || contains || not_contain || any_where) {
        const q = new URLSearchParams({
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
        router.push(`/search-results?${q}`);
      }
      // reset for next phrase
      resetTranscript();
    }, 800);
    return () => clearTimeout(debounceRef.current);
  }, [transcript, router, resetTranscript]);

  // When listening stops, immediately restart if we’re “active”
  useEffect(() => {
    if (!listening && active) {
      SpeechRecognition.startListening({
        continuous:     true,
        interimResults: false,
        language:       lang,
      });
    }
  }, [listening, active, lang]);

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return <p className="text-red-600">Your browser doesn’t support voice search.</p>;
  }

  // Called only once: initial tap to grant permission & kick off continuous listening
  const activateVoice = () => {
    resetTranscript();
    SpeechRecognition.startListening({
      continuous:     true,
      interimResults: false,
      language:       lang,
    });
    setActive(true);
  };

  const barColors = ['#30FFAE','#2AB7EC','#FF2AE0','#FFAB00','#8A2BE2'];

  return (
    <>
      {/* Loader whenever actually listening */}
      {listening && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="flex items-end space-x-1">
            {barColors.map((c,i) => (
              <span
                key={i}
                className="block w-2 rounded-full animate-wave"
                style={{ backgroundColor: c, animationDelay: `${i*120}ms`, height:'1rem' }}
              />
            ))}
          </div>
        </div>
      )}

      {/* One-time activation button */}
      {!active && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2">
          <button
            onClick={activateVoice}
            className="bg-[#ffce00] p-4 rounded-full shadow-lg hover:scale-105 transition"
            aria-label="Enable voice search"
          >
            <CiMicrophoneOn className="text-white text-3xl" />
          </button>
        </div>
      )}

      {/* Language selector (optional) */}
      <select
        value={lang}
        onChange={(e) => setLang(e.target.value)}
        className="fixed bottom-6 right-6 border border-gray-300 rounded px-2 py-1 bg-white"
      >
        <option value="en-IN">English</option>
        <option value="hi-IN">हिन्दी</option>
      </select>

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
