export default {
    namespace: 'model',
    state: {
        data: [],
        error: null
    },
    reducer: {
        modelSuccess(state, { payload }) {
            return { ...state, data: payload };
        },
        modelFailure(state, { payload }) {
            return { ...state, error: payload };
        }
    },
    effects: {
        *modelRequest({ call, put }, { payload }) {
            try {
                const data = [1, 2, 3, 4];
                yield put({ type: 'modelSuccess', payload: data });
            } catch (e) {
                yield put({ type: 'modelFailure', payload: e });
            }
        }
    }
};
