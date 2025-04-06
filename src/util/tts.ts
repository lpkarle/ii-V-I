const speechSynth = window.speechSynthesis;
console.log('TTS speechSynth', speechSynth);

let voices: SpeechSynthesisVoice[] = [];

function getVoices(): Promise<SpeechSynthesisVoice[]> {
  return new Promise((resolve, reject) => {
    console.log('TTS getVoices() speechSynth', speechSynth);

    voices = speechSynth.getVoices();

    if (voices.length > 0) {
      resolve(sortVoices(voices));
    }

    const handleVoicesChanged = () => {
      voices = speechSynth.getVoices();
      resolve(sortVoices(voices));
      speechSynth.removeEventListener('voiceschanged', handleVoicesChanged);
      return;
    };

    speechSynth.addEventListener('voiceschanged', handleVoicesChanged);

    setTimeout(() => {
      reject(new Error('Stimmen konnten nicht geladen werden'));
      speechSynth.removeEventListener('voiceschanged', handleVoicesChanged);
    }, 5000);
  });
}

function sortVoices(voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice[] {
  return voices.sort((a, b) => a.name.localeCompare(b.name));
}

function speak(voice: SpeechSynthesisVoice | null, text: string) {
  if (speechSynth.speaking) {
    console.error('speechSynthesis.speaking');
    return;
  }

  if (!text || text.length === 0) {
    return;
  }

  const utterThis = new SpeechSynthesisUtterance(text);

  utterThis.voice = voice;
  utterThis.pitch = 1;
  utterThis.rate = 0.8;
  speechSynth.speak(utterThis);
}

export { getVoices, speak };
