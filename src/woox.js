import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import { Provider } from 'react-redux';

import createSagaMiddleware from 'redux-saga';
import { fork, take, select, call, all, put, race, takeEvery, takeLatest } from 'redux-saga/effects';

class Woox {
    constructor() {
        this.isDebug =false;
        this.middleware=[]; //所有中间件
        this.sagaMiddleware = {}; //sagas中间件
        this.appReducers = {}; //reducers集合
        this.appActions = []; //actions集合
        this.appEffects = {}; //副作用集合
        this.JsxElement = {}; //Jsx元素
        this.errorFn = void 233; //异常抛出
        this._store = null; //store集合
        this.moduleName = {}; //记录模块位置
    }   

    //错误收集
    onError(fn) {
        this.errorFn = fn;
    }

    //任务加载
    *rootWatcher() {
        while(1){
            const { type, ...others } = yield take(this.appActions);
            if (this.isDebug) {
                console.info(`[saga-action-types]:  '${type}' in model '${this.moduleName[type]}'`,'payload:',others );
            }

            const fn = this.appEffects[type];

            if (fn !== void 233) {
                try {
                    yield call(fn, { fork, take, select, call, put, race, takeEvery, takeLatest }, others);
                } catch (e) {
                    this.errorFn(e);
                }
            }
        }
    }

    //任务监控   
    *rootSaga() {
        yield all([fork(this.rootWatcher.bind(this))]);
    }
 
    //core，聚合模板
    model(Modules) {
        const models = Modules;
        Object.keys(models).forEach(key=>{
            const current = models[key];
            
            const modelstate = current.state || {};

            const namespace = current.namespace;

            if (namespace === void 233) {
                throw new SyntaxError('module needs a namespace');
            }
            if (this.appReducers[namespace]) {
                throw new SyntaxError(`module for name '${namespace}' exist`);
            }

            const reducer = (state = modelstate, { type, payload }) => {
                const func = current.reducer[type];
                if (func) {
                    return func(state, { type, payload });
                }
                return state;
            };

            this.appReducers[namespace] = reducer;

            Object.keys(current.effects).forEach(key => {
                this.appActions.push(key);
                this.appEffects[key] = current.effects[key];
                this.moduleName[key] = namespace;
            });
        });
    }

    //创建store
    injectRun(JsxElement) {
        const store = createStore(combineReducers(this.appReducers), applyMiddleware(this.sagaMiddleware));
        this.sagaMiddleware.run(this.rootSaga.bind(this));

        return <Provider store={store}>{JsxElement}</Provider>;
    }

    //加载router
    router(RouterModel) {
        this.JsxElement = <RouterModel />;
    }

    run(DOMNode, isDebug) {
        if (isDebug === true) {
            this.middleware.push(createLogger());
            this.isDebug = true;
        }

        this.sagaMiddleware = createSagaMiddleware(this.rootSaga);
        this.middleware.push(this.sagaMiddleware);
        const store = createStore(combineReducers(this.appReducers), applyMiddleware(...this.middleware));
        this._store = store;
        this.sagaMiddleware.run(this.rootSaga.bind(this));
        ReactDOM.render(<Provider store={store}>{this.JsxElement}</Provider>, DOMNode);
    }
}

export default new Woox();