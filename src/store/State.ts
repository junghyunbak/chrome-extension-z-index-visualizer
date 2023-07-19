import type { ContentState } from './slices/content';
import type { SizeState } from './slices/size';

export interface State {
  content: ContentState;
  size: SizeState;
}
