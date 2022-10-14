import { MultiBar, Presets } from 'cli-progress';

export const progressBar = new MultiBar(
  { emptyOnZero: true, hideCursor: true },
  Presets.rect,
);
