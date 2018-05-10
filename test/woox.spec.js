import { App } from '../'
import { Router } from './helpers/router'
import Models from './helpers/models';

describe('运行App.onError', () => {
    it('测试errorFn', () => {
        expect(App.errorFn).toEqual(undefined);
        App.onError(e => { return e })
        expect(typeof App.errorFn).toEqual('function');
        expect(App.errorFn('error')).toEqual('error');
    })
})

describe('检测App.model参数', () => {
    it('测试model不为对象或数组', () => {
        expect(() => App.model(1)).toThrow(SyntaxError)
        expect(() => App.model(null)).toThrow(SyntaxError)
    })
    it('测试model为对象或数组', () => {
        expect(() => App.model([])).not.toThrow(SyntaxError)
        expect(() => App.model({})).not.toThrow(SyntaxError)
    })
})

describe('运行App.model参数', () => {
    it('model不存在namespace', () => {
        expect(() => App.model([{}, {}])).toThrow(SyntaxError)
    })

    it('model重复namespace', () => {
        const model = { namespace: 'test', reducer: {}, effects: {} }
        expect(() => App.model([model, model])).toThrow(SyntaxError)
    })

    it('model中appReducers记录', () => {
        App.model(Models)
        expect(Object.keys(App.appReducers).length).toBe(2)
        expect(typeof App.appReducers.model).toEqual('function');
    })

    it('model中appActions记录', () => {
        expect(App.appActions.length).toBe(1)
        expect(App.appActions[0]).toEqual('modelRequest');
    })

    it('model中effects记录', () => {
        expect(Object.keys(App.appEffects).length).toBe(1)
        expect(typeof App.appEffects.modelRequest).toEqual('function');
    })

    it('组件加载injectRun', () => {
        App.injectRun(Router);
        expect(typeof App.JsxElement.type).toEqual('function');
    })

})