function bindActionCreator(actionCreator, dispatch) {
    return function() {
        return dispatch(actionCreator.apply(this, arguments));
    };
}

export default function bindAction(actionCreators, dispatch) {
    if (typeof actionCreators === 'function') {
        return bindActionCreator(actionCreators, dispatch);
    }
  
    if (typeof actionCreators !== 'object' || actionCreators === null) {
        throw new Error(
            `bindActionCreators expected an object or a function, instead received ${
                actionCreators === null ? 'null' : typeof actionCreators
            }. ` +
          'Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?'
        );
    }
 
    return bindActionCreator(() =>actionCreators, dispatch);
}
  
/*
import bindAction from '../../../woox/bindAction';

const mapDispatchToProps = dispatch => ({
    getDashboardAsync: bindAction({type: 'getDashboardAsync'},dispatch)
}); 
*/