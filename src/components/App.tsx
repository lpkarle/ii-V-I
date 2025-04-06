import { BaseSyntheticEvent, useEffect } from 'react';
import { notesAll } from '../util/musicConst';
import Checkbox from './UI/Checkbox';
import { useMachine } from '@xstate/react';
import { checkboxGroupStateMachine } from '../util/machines/checkboxGroupStateMachine';
import { fretboardNotesStateMachine } from '../util/machines/fretboardNotesStateMachine';
import Navigation from './Layout/Navigation';
import Footer from './Layout/Footer';

function App() {
  const [stateNotes, sendNotes] = useMachine(checkboxGroupStateMachine, {
    input: {
      items: notesAll.map((note) => ({
        label: note,
        checked: true,
      })),
    },
  });

  const [stateStrings, sendStrings] = useMachine(checkboxGroupStateMachine, {
    input: {
      items: ['E', 'A', 'D', 'G', 'B', 'high E'].map((s) => ({
        label: s,
        checked: true,
      })),
    },
  });

  const [stateTts, sendTts] = useMachine(fretboardNotesStateMachine, {
    input: {
      notes: stateNotes.context.items,
      strings: stateStrings.context.items,
    },
  });

  useEffect(() => {
    console.log('Some checkbox state canged!');

    sendTts({
      type: 'UPDATE_NOTES_STRINGS',
      notes: stateNotes.context.items,
      strings: stateStrings.context.items,
    });
  }, [stateNotes.context.items, stateStrings.context.items, sendTts]);

  const handleCheckboxOnChangeNotes = (event: BaseSyntheticEvent) => {
    const label: string = event.target.value;
    sendNotes({ type: 'TOGGLE_ITEM', label });
  };

  const handleCheckboxOnChangeStrings = (event: BaseSyntheticEvent) => {
    const label: string = event.target.value;
    sendStrings({ type: 'TOGGLE_ITEM', label });
  };

  return (
    <>
      <Navigation />

      <main className="grid md:grid-cols-2 grid-cols-1 gap-4 content-lg my-4">
        <div className="card border-1 border-gray-300">
          <div className="card-body p-4">
            <h2 className="card-title">Select Notes</h2>
            <div className="flex flex-wrap gap-2">
              {stateNotes.context.items.map((item, index) => (
                <Checkbox
                  key={index}
                  id={item.label}
                  title={item.label}
                  checked={item.checked}
                  onChange={handleCheckboxOnChangeNotes}
                  className="w-15"
                />
              ))}
            </div>
            <div className="card-actions justify-start mt-2">
              <button
                className="btn"
                onClick={() => sendNotes({ type: 'SELECT_ALL' })}
              >
                Select All
              </button>
              <button
                className="btn"
                onClick={() => sendNotes({ type: 'DESELECT_ALL' })}
              >
                Deselect All
              </button>
              <button
                className="btn"
                onClick={() =>
                  sendNotes({
                    type: 'TOGGLE_LABEL_CONTAINING',
                    element: '♯',
                  })
                }
              >
                Toggle ♯
              </button>
              <button
                className="btn"
                onClick={() =>
                  sendNotes({
                    type: 'TOGGLE_LABEL_CONTAINING',
                    element: '♭',
                  })
                }
              >
                Toggle ♭
              </button>
            </div>
          </div>
        </div>

        <div className="card border-1 border-gray-300">
          <div className="card-body p-4">
            <h2 className="card-title">Select Strings</h2>
            <div className="flex flex-wrap gap-2">
              {stateStrings.context.items.map((item, index) => (
                <Checkbox
                  key={index}
                  id={item.label}
                  title={item.label}
                  checked={item.checked}
                  onChange={handleCheckboxOnChangeStrings}
                  className="w-15"
                />
              ))}
            </div>
            <div className="card-actions justify-start mt-2">
              <button
                className="btn"
                onClick={() => sendStrings({ type: 'SELECT_ALL' })}
              >
                Select All
              </button>
              <button
                className="btn"
                onClick={() => sendStrings({ type: 'DESELECT_ALL' })}
              >
                Deselect All
              </button>
            </div>
          </div>
        </div>

        <fieldset className="fieldset">
          <legend className="fieldset-legend">Select speaker</legend>
          <select
            id="select-voices"
            className="select"
            value={
              stateTts.context.voices
                ? stateTts.context.voices[stateTts.context.voiceIndex].name
                : undefined
            }
            onChange={(e) =>
              sendTts({ type: 'UPDATE_VOICE', voiceName: e.target.value })
            }
            disabled={stateTts.value !== 'ready'}
          >
            <option value="" disabled>
              Stimme wählen...
            </option>
            {stateTts.context.voices?.map((voice) => (
              <option key={voice.name} value={voice.name}>
                {voice.name} ({voice.lang})
              </option>
            ))}
          </select>
        </fieldset>

        <div>
          <h2>
            <span>'SELECTED' VOICE: </span>
            <span className="font-semibold">
              {stateTts.context.voices
                ? stateTts.context.voices[0].name +
                  ' ' +
                  stateTts.context.voices[0].lang
                : ''}
            </span>
          </h2>

          <div>
            <button
              className={`btn mr-2 ${
                stateTts.value == 'loading' ? 'btn-disabled' : 'btn-accent'
              }`}
              onClick={() => sendTts({ type: 'START' })}
            >
              Start
            </button>
            <button
              className={`btn mr-2 ${
                stateTts.value == 'loading' ? 'btn-disabled' : 'btn-warning'
              }`}
              onClick={() => sendTts({ type: 'STOP' })}
            >
              Stop
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default App;
