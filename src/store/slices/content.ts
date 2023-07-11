import type { Plane } from '@/types/Plane';

const enum UPDATE_CONTENT {
  PLANES = 'PLANES',
  CLICK_LIST = 'CLICK_LIST',
  HREF = 'HREF',
}

export interface ContentState {
  planes: Plane[];
  clickedList: number[];
  currentHref: string;
}

interface ContentAction {
  type: UPDATE_CONTENT;
  planes?: Plane[];
  clickedList?: number[];
  currentHref?: string;
}

const initialState: ContentState = {
  planes: [],
  clickedList: [],
  currentHref: '',
};

const content = (
  state: ContentState = initialState,
  action: ContentAction
): ContentState => {
  switch (action.type) {
    case UPDATE_CONTENT.PLANES: {
      if (!action.planes) {
        return state;
      }

      return { ...state, planes: action.planes };
    }
    case UPDATE_CONTENT.CLICK_LIST: {
      if (!action.clickedList) {
        return state;
      }

      return { ...state, clickedList: action.clickedList };
    }
    case UPDATE_CONTENT.HREF: {
      if (!action.currentHref) {
        return state;
      }

      return { ...state, currentHref: action.currentHref };
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

export const updateClickedList = (clickedList: number[]) => ({
  type: UPDATE_CONTENT.CLICK_LIST,
  clickedList,
});

export const updateCurrentHref = (currentHref: string) => ({
  type: UPDATE_CONTENT.HREF,
  currentHref,
});

export default content;
