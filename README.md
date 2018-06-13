# woox

<p align="center">
<a href="https://travis-ci.org/WoolYang/woox">
  <img src="https://travis-ci.org/WoolYang/woox.svg?branch=master" alt="Travis CI Status"/></a>
<a href="https://codecov.io/gh/WoolYang/woox">
  <img src="https://codecov.io/gh/WoolYang/woox/branch/master/graph/badge.svg" />
</a>
<a href="https://www.npmjs.com/package/woox">
  <img src="https://img.shields.io/npm/v/woox.svg" alt="Version">
  </a>
</p> 

轻量便捷数据流封装管理库，基于react+redux-saga

## 1.安装
 npm install woox --save
 
## 2.使用
 
 ```js
  //index.js
   import { App } from 'woox';
   import * as Models from './models/index';
   App.model(Models);
   
   App.run(Routes,document.getElementById('app'), true);
 ```
 woox集成react+redux-sagas完成大量配置工作,运行woox仅需引入App，调用model API加载models，run挂载组件即可。
 
 ```js
import { getCheckLogin } from '../../api/api';
export default {
    namespace:'login',
    state:  {
        data: null,     
        fetching: false,
        fetched: false,
        error: null
    },
    reducer: {
        loginStart(state) {
            return { ...state, fetching: true };
        },
        loginSuccess(state, { payload }) {
            return { ...state, fetching: false, fetched: true, data: payload };
        },
        loginFailure(state, { payload }) {
            return { ...state, fetching: false, error: payload };
        }
    },
    effects: {
        *loginRequest({ call, put }, { payload }) {
            try {
                yield put({ type: 'loginStart' });
                const data = yield call(getCheckLogin, { ...payload });
                yield put({ type: 'loginSuccess', payload: data });
            } catch (e) {
                yield put({ type: 'loginFailure', payload:e });
            }
        }
    }
};
 ```
 model文件整合了reducer和effects，减少胶水代码的同时保证了redux原汁原味的开发体验。
