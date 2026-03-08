import { stderr as chalk } from 'chalk';
import cliProgress from 'cli-progress';

// Detect if we have a real TTY
const isTTY = process.stdout.isTTY && process.stderr.isTTY;

// Create a no-op bar for environments without TTY
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

let multibar: cliProgress.MultiBar | null = null;

// Try to create a real multibar only if we have a TTY
if (isTTY) {
  try {
    multibar = new cliProgress.MultiBar(
      {
        clearOnComplete: true,
        hideCursor: true,
        stream: process.stderr,
        format: [
          '{description}',
          chalk.grey('{bar}'),
          chalk.bold('{percentage}%'),
          chalk.grey('[{value}/{total}]'),
        ].join(' '),
      },
      cliProgress.Presets.shades_classic
    );
  } catch (e) {
    // Failed to create multibar, will use no-op
  }
}

// Export a getMultibar that returns null if no TTY
export const getMultibar = (): cliProgress.MultiBar | null => multibar;
export { isTTY };

// Use real bars when possible, no-op when not
export const createBar = (
  total: number,
  current: number,
  options: any
): cliProgress.SingleBar => {
  // If no TTY, always use no-op
  if (!isTTY || !multibar) {
    return createNoOpBar(total, current, options);
  }
  try {
    return multibar.create(total, current, options);
  } catch (e) {
    console.error('Warning: Failed to create progress bar, continuing without');
    return createNoOpBar(total, current, options);
  }
};

export const barOptions = (description: string, emoji: string) => ({
  description: description.padEnd(15) + emoji,
});

export const exit = (error?: Error) => {
  try {
    multibar?.stop();
  } catch (e) {
    // Ignore
  }
  if (error) {
    console.error(error.stack);
  }
  process.exit(1);
};

// Keep multibar exported for backward compatibility
export { multibar };
