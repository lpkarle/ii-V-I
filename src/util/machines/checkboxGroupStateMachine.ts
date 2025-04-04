import { assign, setup } from 'xstate';
import { CheckboxItem } from '../types';

export const checkboxGroupStateMachine = setup({
  types: {
    context: {} as {
      items: CheckboxItem[];
    },

    input: {} as {
      items: CheckboxItem[];
    },

    events: {} as
      | { type: 'TOGGLE_ITEM'; label: string }
      | { type: 'SELECT_ALL' }
      | { type: 'DESELECT_ALL' },
  },
}).createMachine({
  id: 'checkbox',
  systemId: 'checkbox',

  context: ({ input }) => ({
    items: input.items,
  }),

  initial: 'idle',

  states: {
    idle: {
      on: {
        TOGGLE_ITEM: {
          actions: assign({
            items: ({ context, event }) =>
              context.items.map((item) =>
                item.label === event.label
                  ? { ...item, checked: !item.checked }
                  : item
              ),
          }),
        },

        SELECT_ALL: {
          actions: assign({
            items: (context) =>
              context.context.items.map((item) => ({
                ...item,
                checked: true,
              })),
          }),
        },

        DESELECT_ALL: {
          actions: assign({
            items: (context) =>
              context.context.items.map((item) => ({
                ...item,
                checked: false,
              })),
          }),
        },
      },
    },
  },
});
