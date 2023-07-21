const enum UPDATE_SIZE {
  DECREASE_PLANE_RATIO = 'DECREASE_PLANE_RATIO',
  INCREASE_PLANE_RATIO = 'INCREASE_PLANE_RATIO',
}

export interface SizeState {
  planeRatio: number;
}

interface SizeAction {
  type: UPDATE_SIZE;
  planeRatio?: number;
}

const initialState: SizeState = {
  planeRatio: 0.35,
};

const content = (
  state: SizeState = initialState,
  action: SizeAction
): SizeState => {
  switch (action.type) {
    case UPDATE_SIZE.DECREASE_PLANE_RATIO: {
      const { planeRatio } = state;

      const nextPlaneRatio = Math.round((planeRatio - 0.05) * 100) / 100;

      if (nextPlaneRatio < 0.1) {
        return state;
      }

      return { ...state, planeRatio: nextPlaneRatio };
    }
    case UPDATE_SIZE.INCREASE_PLANE_RATIO: {
      const { planeRatio } = state;

      const nextPlaneRatio = Math.round((planeRatio + 0.05) * 100) / 100;

      if (nextPlaneRatio > 1) {
        return state;
      }

      return { ...state, planeRatio: nextPlaneRatio };
    }
    default: {
      return state;
    }
  }
};

export const decreasePlaneRatio = () => ({
  type: UPDATE_SIZE.DECREASE_PLANE_RATIO,
});

export const increasePlaneRatio = () => ({
  type: UPDATE_SIZE.INCREASE_PLANE_RATIO,
});

export default content;
