import { App } from '../'
import { Router } from './helpers/router'

describe('运行App.router', () => {
    it('测试JsxElement加载模块', () => {
        App.router(Router)
        expect(typeof App.JsxElement.type).toEqual('function');
    })


})