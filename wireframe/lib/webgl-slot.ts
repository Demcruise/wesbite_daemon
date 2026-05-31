const MAX_ACTIVE = 6;

let active = 0;
const queue: Array<() => void> = [];

function drainQueue(): void {
  while (active < MAX_ACTIVE && queue.length > 0) {
    active += 1;
    const next = queue.shift();
    next?.();
  }
}

/** Run WebGL init when a context slot is free. Returns cleanup that releases the slot. */
export function withWebGLSlot(init: () => () => void): () => void {
  let cleanup: (() => void) | undefined;
  let started = false;
  let cancelled = false;
  let queued: (() => void) | undefined;

  const release = (): void => {
    if (!started) return;
    started = false;
    cleanup?.();
    cleanup = undefined;
    active = Math.max(0, active - 1);
    drainQueue();
  };

  const start = (): void => {
    if (cancelled) {
      active = Math.max(0, active - 1);
      drainQueue();
      return;
    }
    started = true;
    cleanup = init();
  };

  if (active < MAX_ACTIVE) {
    active += 1;
    start();
  } else {
    queued = start;
    queue.push(start);
  }

  return () => {
    cancelled = true;
    if (queued) {
      const index = queue.indexOf(queued);
      if (index >= 0) queue.splice(index, 1);
      queued = undefined;
    }
    release();
  };
}
