import { App } from '../'
import { Router } from './helpers/router'
import * as Models from './helpers/models';

describe('运行App.router', () => {
    it('测试JsxElement加载模块', () => {
        App.router(Router)
        expect(typeof App.JsxElement.type).toEqual('function');
    })
})

describe('运行App.onError', () => {
    it('测试errorFn', () => {
        expect(App.errorFn).toEqual(undefined);
        App.onError(e => { return e })
        expect(typeof App.errorFn).toEqual('function');
        expect(typeof App.errorFn).toEqual('function');
        expect(App.errorFn('error')).toEqual('error');
    })
})

describe('运行App.model', () => {
    it('测试model不为对象或数组', () => {
        App.model({})
        //expect(App.model(1)).toThrow()
    })
})