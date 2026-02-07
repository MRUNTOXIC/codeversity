"use client";

import { useEffect, useState } from "react";
import { useSpeech } from "@/hooks/useSpeech";

export default function VoiceSelector() {
  const { getAvailableVoices, setPreferredVoice, speak } = useSpeech();
  const [voices, setVoices] = useState([]);
  const [selected, setSelected] = useState("");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let mounted = true;

    const load = () => {
      const v = getAvailableVoices();
      if (!mounted) return;
      // Avoid setting state if identical
      setVoices(prev => {
        const voicesList = v || [];
        if (JSON.stringify(prev.map(x => x.name || x.voiceURI)) === JSON.stringify(voicesList.map(x => x.name || x.voiceURI))) {
          return prev;
        }
        return voicesList;
      });

      if ((v || []).length > 0) {
        const defaultVoice = v.find(vo => /(samantha|zira|victoria|google|wave|neural|female|woman)/i.test((vo.name || '') + ' ' + (vo.voiceURI || '')));
        const candidate = (defaultVoice && (defaultVoice.name || defaultVoice.voiceURI)) || (v[0] && (v[0].name || v[0].voiceURI)) || "";
        setSelected(prev => prev || candidate);
        setLoaded(true);
      }
    };

    // initial load
    load();
    // voiceschanged event fires when voices are loaded asynchronously
    const onVoicesChanged = () => load();
    window.speechSynthesis?.addEventListener('voiceschanged', onVoicesChanged);
    return () => {
      mounted = false;
      window.speechSynthesis?.removeEventListener('voiceschanged', onVoicesChanged);
    };
    // intentionally no dependencies: getAvailableVoices is stable enough to call here
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e) => {
    setSelected(e.target.value);
    setPreferredVoice(e.target.value);
  };

  const handlePreview = () => {
    const sample = "Hi, I'm here to listen. Take a breath and tell me what's on your mind.";
    // Speak using currently selected voice
    speak(sample);
  };

  return (
    <div className="voice-selector flex items-center gap-2">
      <label className="text-xs" style={{ color: 'var(--text-muted)' }}>Voice</label>
      <select
        value={selected}
        onChange={handleChange}
        className="text-sm p-1 rounded"
        style={{ background: 'var(--bg-secondary)', color: 'var(--text-primary)', border: '1px solid var(--border)' }}
      >
        {!loaded && <option>Loading...</option>}
        {voices.map((v, i) => (
          <option key={i} value={v.name || v.voiceURI}>{v.name} {v.lang ? `(${v.lang})` : ''}</option>
        ))}
      </select>
      <button
        onClick={handlePreview}
        className="text-xs px-2 py-1 rounded"
        style={{ background: 'var(--accent)', color: 'white' }}
      >
        Preview
      </button>
    </div>
  );
}
