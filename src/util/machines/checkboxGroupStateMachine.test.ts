import { describe, expect, it } from 'vitest';
import { createActor } from 'xstate';
import { checkboxGroupStateMachine } from './checkboxGroupStateMachine';

describe('checkboxGroup actor', async () => {
  const labels = ['a', 'b', 'c', 'a1', 'b2', 'c1'];
  const checkboxItems = labels.map((item) => ({
    label: item,
    checked: true,
  }));

  const actor = createActor(checkboxGroupStateMachine, {
    input: { items: checkboxItems },
  });

  actor.start();

  it('should be in state idle actor', () => {
    expect(actor.getSnapshot().value).toEqual('idle');
  });

  it('should deselect all items on event "DESELECT_ALL"', () => {
    actor.send({ type: 'DESELECT_ALL' });

    actor
      .getSnapshot()
      .context.items.forEach((item) => expect(item.checked).toBe(false));
  });

  it('should select all items on event "SELECT_ALL"', () => {
    actor.send({ type: 'SELECT_ALL' });

    actor
      .getSnapshot()
      .context.items.forEach((item) => expect(item.checked).toBe(true));
  });

  it('should deselect all items where the label contains "1" when all items are selected', () => {
    actor.send({ type: 'SELECT_ALL' });
    actor.send({ type: 'TOGGLE_LABEL_CONTAINING', element: '1' });

    const countSelectedItems = actor
      .getSnapshot()
      .context.items.filter((item) => item.checked).length;

    expect(countSelectedItems).toBe(4);
  });

  it('should select all items where the label contains "1" when all items are unselected', () => {
    actor.send({ type: 'DESELECT_ALL' });
    actor.send({ type: 'TOGGLE_LABEL_CONTAINING', element: '1' });

    const countSelectedItems = actor
      .getSnapshot()
      .context.items.filter((item) => item.checked).length;

    expect(countSelectedItems).toBe(2);
  });
});
