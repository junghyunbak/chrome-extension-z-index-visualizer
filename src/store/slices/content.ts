import type { Plane } from '../../types/Plane';

const enum UPDATE_CONTENT {
  PLANES = 'PLANES',
}

export interface ContentState {
  planes: Plane[];
}

interface ContentAction {
  type: UPDATE_CONTENT;
  planes: Plane[];
}

const initialState: ContentState = {
  planes: [],
};

const content = (
  state: ContentState = initialState,
  action: ContentAction
): ContentState => {
  switch (action.type) {
    case UPDATE_CONTENT.PLANES: {
      return { planes: action.planes };
    }
    default: {
      return state;
    }
  }
};

export const updatePlanes = (planes: Plane[]) => ({
  type: UPDATE_CONTENT.PLANES,
  planes,
});

export default content;
