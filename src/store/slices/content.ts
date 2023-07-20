import type { PlaneTree } from '@/types/plane';

const enum UPDATE_CONTENT {
  PLANE_TREE = 'PLANE_TREE',
  HREF = 'HREF',
}

export interface ContentState {
  planeTree: PlaneTree;
  currentHref: string;
}

interface ContentAction {
  type: UPDATE_CONTENT;
  planeTree?: PlaneTree;
  currentHref?: string;
}

const initialState: ContentState = {
  planeTree: { data: [], child: [], $root: null, zIndex: 0 },
  currentHref: '',
};

const content = (
  state: ContentState = initialState,
  action: ContentAction
): ContentState => {
  switch (action.type) {
    case UPDATE_CONTENT.HREF: {
      if (!action.currentHref) {
        return state;
      }

      return { ...state, currentHref: action.currentHref };
    }
    case UPDATE_CONTENT.PLANE_TREE: {
      if (!action.planeTree) {
        return state;
      }

      return { ...state, planeTree: action.planeTree };
    }
    default: {
      return state;
    }
  }
};

export const updateCurrentHref = (currentHref: string) => ({
  type: UPDATE_CONTENT.HREF,
  currentHref,
});

export const updatePlaneTree = (planeTree: PlaneTree) => ({
  type: UPDATE_CONTENT.PLANE_TREE,
  planeTree,
});

export default content;
