'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { CiMicrophoneOn, CiMicrophoneOff } from 'react-icons/ci';

export default function VoiceNumberSearch() {
  const [recording, setRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [chunks, setChunks] = useState([]);
  const router = useRouter();
  const audioStreamRef = useRef(null);

  // 1. User clicks to start or stop recording
  const toggleRecording = async () => {
    if (recording) {
      // stop
      mediaRecorder.stop();
      setRecording(false);
    } else {
      // start: request mic
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioStreamRef.current = stream;
      const recorder = new MediaRecorder(stream);
      setMediaRecorder(recorder);
      setChunks([]);

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) setChunks((prev) => [...prev, e.data]);
      };

      recorder.onstop = handleStop;
      recorder.start();
      setRecording(true);
    }
  };

  // 2. When recording stops, send to Whisper and navigate
  const handleStop = async () => {
    // stop all tracks
    audioStreamRef.current.getTracks().forEach((t) => t.stop());

    const blob = new Blob(chunks, { type: 'audio/webm' });
    const form = new FormData();
    form.append('audio', blob, 'voice.webm');

    // call your /api/whisper endpoint
    const res = await fetch('/api/whisper', { method: 'POST', body: form });
    const { text } = await res.json(); // full transcript

    // parse filters
    const t = text.toLowerCase();
    const start_with  = (t.match(/start(?:s)? with\s*(\d+)/)    || [])[1] || '';
    const end_with    = (t.match(/end(?:s)? with\s*(\d+)/)      || [])[1] || '';
    const contains    = (t.match(/contain(?:s)?\s*(\d+)/)      || [])[1] || '';
    const not_contain = (t.match(/not contain(?:s)?\s*(\d+)/) || [])[1] || '';
    let any_where = '';
    if (!start_with && !end_with && !contains && !not_contain) {
      const all = t.match(/\d+/g);
      any_where = all ? all.join('') : '';
    }

    // if any filter present, navigate
    if (start_with||end_with||contains||not_contain||any_where) {
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
        star_status: 'true'
      }).toString();
      router.push(`/search-results?${q}`);
    }
  };

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 flex items-center space-x-4 bg-white p-4 rounded-full shadow-lg">
      <button
        onClick={toggleRecording}
        className={`p-4 rounded-full transition-transform ${
          recording ? 'bg-red-500 scale-110' : 'bg-[#ffce00] hover:scale-105'
        }`}
      >
        {recording
          ? <CiMicrophoneOff className="text-white text-2xl" />
          : <CiMicrophoneOn className="text-white text-2xl" />}
      </button>
      <span>{recording ? 'Recording…' : 'Tap to speak'}</span>
    </div>
  );
}
