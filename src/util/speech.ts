const synth = window.speechSynthesis;

let voices: SpeechSynthesisVoice[] = [];

function loadVoices(): Promise<SpeechSynthesisVoice[]> {
  return new Promise((resolve) => {
    voices = synth.getVoices();

    if (voices.length > 0) {
      voices.sort(function (a, b) {
        const aName = a.name.toUpperCase();
        const bName = b.name.toUpperCase();

        if (aName < bName) {
          return -1;
        } else if (aName == bName) {
          return 0;
        } else {
          return +1;
        }
      });

      const filtered = voices.filter((voice) => voice.lang === "en-US");

      resolve(filtered);
      return;
    }
  });
}

function speak(voice: SpeechSynthesisVoice | null, text: string) {
  if (synth.speaking) {
    console.error("speechSynthesis.speaking");
    return;
  }

  if (!text || text.length === 0) {
    return;
  }

  const utterThis = new SpeechSynthesisUtterance(text);

  utterThis.voice = voice;
  utterThis.pitch = 1;
  utterThis.rate = 0.8;
  synth.speak(utterThis);
}

export { loadVoices, speak };
