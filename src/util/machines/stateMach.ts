import { assign, fromPromise, not, setup } from 'xstate';
import { CheckboxItem } from '../types';
import { loadVoices, speak } from '../speech';

// Fisher-Yates Shuffle Algorithmus
const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array]; // Kopie erstellen, um Original zu bewahren
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; // Swap
  }
  return shuffled;
};

export const ttsStateMachine = setup({
  types: {
    context: {} as {
      notes: CheckboxItem[];
      strings: CheckboxItem[];
      questionsToAske: (
        | {
            question: string;
            asked: boolean;
          }
        | undefined
      )[];
      voices?: SpeechSynthesisVoice[];
      waitingTimeInSeconds: number;
    },

    input: {} as {
      notes: CheckboxItem[];
      strings: CheckboxItem[];
    },

    events: {} as
      | { type: 'START' }
      | { type: 'STOP' }
      | {
          type: 'UPDATE_NOTES_STRINGS';
          notes: CheckboxItem[];
          strings: CheckboxItem[];
        },
  },

  delays: {
    timeout: ({ context }) => {
      return context.waitingTimeInSeconds * 1000;
    },
  },

  actions: {
    calculateQuestions: assign({
      questionsToAske: ({ context }) => {
        const noteStringCombinations = context.notes
          .filter((n) => n.checked)
          .flatMap((n) =>
            context.strings
              .filter((s) => s.checked)
              .map((s) => ({
                question: "'" + n.label + "' on '" + s.label + "'",
                asked: false,
              }))
          );
        console.log(noteStringCombinations);
        const shuffeld = shuffleArray(noteStringCombinations);
        console.log(shuffeld);

        return shuffeld;
      },
    }),
  },

  actors: {
    loadVoices: fromPromise(async () => {
      const voices = await loadVoices();
      console.log(voices);
      return voices;
    }),
  },

  guards: {
    questionsLeft: ({ context }) => {
      const qLeft = context.questionsToAske.some((q) => !q?.asked);
      console.log('questionsLeft', qLeft);

      return qLeft;
    },
  },
}).createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QBdmwHQBsD2BDCAlgHZQDEE2RY6xAbtgNbU74Bq2BAxnANoAMAXUSgADtlgFkBSsJABPRAGYALMvQBWADQgAHksUB2DQCYAnMr7LFx44r4A2RYoC+z7agwAnMPjmkAygAqAIIASoH8QkggYhJSMtF6COoAjIro9nym9qbGABx56pnqptoKCMp5Kejmxo42hgZ8Ra7uaOjevqQAqgAKACLBgQCiAPoAcgDyI-6jQaEAkuMA4v6RsrGS0kSySSl8eegpxgbqzQaKOQZ5lmWIyvbqR5V59tem6nlWBq0gHuicXCYTgARQArnB4kRYKR1tFNlDdogDPY1OYXp88tkscY7gg3odrsZ1BZ7PZiRdfv9cLAGODIdsAoFJr04aJxFsEqAkpd7BpTGk6nwVHU3njPulzCllB8cuTUqYqe0aXSIbAoT0BkMxlMZnNAosVmtBBsOYjEoh9odjqdzpdTNdbvJEPL0KcBXxPXl8ikDMolRgVfT1YydOrcMhqLgAGaRzwACikAFswNgwcgAJSkam04NQtkxM3bJEIFSmdAFKoOoq+8z2PGvdJfZQGFKpdQqZr+tx-doAd1wkgAYthPMFoX2wJ5YSb4UWubpEKl0p9TJZvfYseS8g3UfyW04DLKGgH0APh6Px7BJ9OeCkouy4sWLQhrtUqilTGucsd1DY8dcTYpKiZYtgYNh5K4PZENgEBwLIHimk+C5JAAtHkRivMcxgOAYKKmJcBh4sSfJfl+eSKJ+ZKFCkp4sIQJBIZyOwvqhijllhNi4fhvL1s6paqBop6dBA5SPsxJaXIcOEOA6VqpAcyh4i2TxfGu1hpAc+y0T2-yAsCebbPAc7ISx3LInwRitsoq6FFk3qlPxNnGOgZZ8MB7nesclmnkGarmuJAWLqWlyuSRHwdoof6pHx5StocJQOg80rKNKnynueyAjmOE5TkxQU8io6D5GS1gCrkqS4vxHwuYoXxHnhf42c0UHOEAA */
  id: 'tts',
  systemId: 'tts',

  context: ({ input }) => ({
    notes: input.notes,
    strings: input.strings,
    questionsToAske: [],
    voices: undefined,
    waitingTimeInSeconds: 10,
  }),

  initial: 'loading',

  states: {
    loading: {
      invoke: {
        id: 'loadVoices',
        src: 'loadVoices',
        onDone: {
          target: 'ready',
          actions: assign({
            voices: ({ event }) => event.output,
          }),
        },
      },
    },

    ready: {
      on: {
        START: 'calcQuestions',
        UPDATE_NOTES_STRINGS: {
          // TODO in setup auslagern
          actions: assign({
            notes: ({ event }) => event.notes,
            strings: ({ event }) => event.strings,
          }),
        },
      },
    },

    calcQuestions: {
      entry: ['calculateQuestions'],
      always: { target: 'askQuestion' },
    },

    askQuestion: {
      entry: assign({
        questionsToAske: ({ context }) => {
          console.log(context.questionsToAske);

          const firstUnaskedQuestionIndex = context.questionsToAske.findIndex(
            (q) => !q?.asked
          );
          console.log(firstUnaskedQuestionIndex);

          const voice = context.voices ? context.voices[0] : null;
          const question = context.questionsToAske[firstUnaskedQuestionIndex]
            ? context.questionsToAske[firstUnaskedQuestionIndex].question
            : '';
          console.log('!!! Question:', question);

          speak(voice, question);

          return context.questionsToAske.map((q, i) =>
            i === firstUnaskedQuestionIndex
              ? { ...q, asked: true, question: q?.question || '' }
              : q
          );
        },
      }),
      after: {
        timeout: { target: 'waitForAnswer' },
      },
      on: {
        STOP: 'ready',
        UPDATE_NOTES_STRINGS: {
          // TODO in setup auslagern
          actions: assign({
            notes: ({ event }) => event.notes,
            strings: ({ event }) => event.strings,
          }),
        },
      },
    },

    waitForAnswer: {
      always: [
        { guard: 'questionsLeft', target: 'askQuestion' },
        { guard: not('questionsLeft'), target: 'calcQuestions' },
      ],
    },
  },
});
