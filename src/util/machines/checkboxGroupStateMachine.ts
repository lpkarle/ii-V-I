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
      | { type: 'DESELECT_ALL' }
      | { type: 'TOGGLE_LABEL_CONTAINING'; element: string },
  },
}).createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QGMAWZkGsBGB7AHgHQCWEANmAMQAqA8gOL0AyAogPoCS1LAsgNoAGALqJQAB1yxiAF2K4AdqJD5EAFgCshAIwBOdQGYBADgBs+gEw7VWgOw3VAGhABPROZv7CJ9SfPrVJgL6huYmAL5hTmgYOAQk5FQAyiysAMLUbACCTEyCIkggElKyCkoqCOrmhAI6+vYmtf465obqTq4IWuoChH42Ri3BWloCw0YRUehYeESkFJQAIizJaRnZucJKRTJyigXlqlUjXepW+k0tAm0uaj2WJkbNV0aPOvYRkSDyuBBwStHTAhbSQ7Ur7RAAWk0jyMqlUVxMGgENga1w6ENUNl6QRGNiswwEAlCExAANiswSwOKuzKiFhhCM6i6ZnM5kZqjqaMQdVUhA8HI8nO61g+YSAA */
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
            items: ({ context }) =>
              context.items.map((item) => ({
                ...item,
                checked: true,
              })),
          }),
        },

        DESELECT_ALL: {
          actions: assign({
            items: ({ context }) =>
              context.items.map((item) => ({
                ...item,
                checked: false,
              })),
          }),
        },

        TOGGLE_LABEL_CONTAINING: {
          actions: assign({
            items: ({ context, event }) =>
              context.items.map((item) =>
                item.label.includes(event.element)
                  ? { ...item, checked: !item.checked }
                  : item
              ),
          }),
        },
      },
    },
  },
});
