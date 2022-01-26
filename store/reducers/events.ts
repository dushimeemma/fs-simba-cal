import { types } from '../actions/types';
import { EventTypes } from '../types';

const initialState: EventTypes = {
  isLoading: false,
  eventTypes: [],
  eventType: null,
};

const GetEventTypes = (
  state = initialState,
  action: { type: string; payload: any }
) => {
  switch (action.type) {
    case types.GET_ALL_EVENT_TYPES:
      return {
        ...state,
        isLoading: false,
        eventTypes: action.payload.data,
      };
    case types.GET_SINGLE_EVENT_TYPE:
      return {
        ...state,
        eventType: action.payload.data,
        isLoading: false,
      };
    case types.START_GET_ALL_EVENT_TYPES:
      return {
        ...state,
        isLoading: true,
      };
    default:
      return state;
  }
};

export default GetEventTypes;
