import { stderr as chalk } from 'chalk';
import cliProgress from 'cli-progress';

// Always use no-op bars to avoid TTY/stream issues in various environments
// This ensures the tool works in CI, containers, and other non-interactive contexts

// Create a no-op bar for all environments
const createNoOpBar = (_total: number, _current: number, _options: any): cliProgress.SingleBar => {
  const noOp = {
    start: () => {},
    update: function(_current: number | object, _payload?: object) {},
    increment: (_delta?: number) => {},
    setTotal: (_total: number) => {},
    stop: () => {},
    calculateETA: (_tick: number) => 0,
    updateETA: (_tick: number) => noOp,
    formatTime: (_seconds: number) => '',
    getTotal: () => 0,
    getValue: () => 0,
    getProgress: () => 0,
    isActive: () => false,
    pause: () => noOp,
    resume: () => noOp,
    render: (_force?: boolean) => {},
    stopTimer: () => {},
  } as any;
  return noOp;
};

// Export a getMultibar that always returns null (to trigger no-op)
export const getMultibar = (): cliProgress.MultiBar | null => null;

// Use no-op bars everywhere
export const createBar = (
  total: number,
  current: number,
  options: any
): cliProgress.SingleBar => createNoOpBar(total, current, options);

export const barOptions = (description: string, emoji: string) => ({
  description: description.padEnd(15) + emoji,
});

export const exit = (error?: Error) => {
  if (error) {
    console.error(error.stack);
  }
  process.exit(1);
};

// Keep multibar exported for backward compatibility (but it's null)
export const multibar = null as any;
