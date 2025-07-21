"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { CiMicrophoneOn, CiMicrophoneOff } from "react-icons/ci";

export default function VoiceNumberSearch() {
  const [searchQuery, setSearchQuery] = useState("");
  const [lang, setLang] = useState("en-IN");
  const router = useRouter();
  const { transcript, listening, resetTranscript } = useSpeechRecognition();

  const handleSearch = (number) => {
    if (!number) return;
    router.push(
      `/search-results?type=global&number=${number}&callCount=0&searchBy=digit&comingsoon=yes&star_status=true`
    );
    setSearchQuery("");
  };

  useEffect(() => {
    if (transcript) {
      const digits = transcript.replace(/\D/g, "");
      if (digits) {
        handleSearch(digits);
        SpeechRecognition.stopListening();
        resetTranscript();
      }
    }
  }, [transcript, resetTranscript]);

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    alert("Your browser does not support voice search.");
  }

  return (
    <div className="w-full mr-1">
      <div className="flex items-center">
        <select
          value={lang}
          onChange={(e) => setLang(e.target.value)}
          className="border rounded"
        >
          <option value="en-IN">English</option>
          <option value="hi-IN">हिन्दी</option>
        </select>
        <button
          className="text-2xl p-1"
          onClick={() =>
            listening
              ? SpeechRecognition.stopListening()
              : SpeechRecognition.startListening({
                  continuous: true,
                  language: lang,
                })
          }
          aria-label={listening ? "Stop listening" : "Start voice search"}
        >
          {listening ? <CiMicrophoneOn /> : <CiMicrophoneOff />}
        </button>
      </div>
    </div>
  );
}
