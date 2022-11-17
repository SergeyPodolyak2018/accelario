import entriesReducer, {
  IEntriesState,
} from './entriesSlice';

describe('counter reducer', () => {
  const initialState: IEntriesState = {
    data: [],
    status: 'idle',
    count: 0,
  };
  it('should handle initial state', () => {
    expect(entriesReducer(undefined, { type: 'unknown' })).toEqual({
      data: [],
      status: 'idle',
      count: 0,
    });
  });

});
