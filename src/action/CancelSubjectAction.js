import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import subjectListReducer from '../reducer/subjectListReducer';

const mapStateToProps = state => state.subjectListReducer;

const mapDispatchToProps = dispatch => ({
  checkSubject: ()=> dispatch({type: "CHECK_SUBJECT"}),
  addSubject: (subject) => dispatch({type: "ADD_CANCEL_SUBJECT", subject}),
  removeSubject: (subject) => dispatch({type: "REMOVE_CANCEL_SUBJECT", subject})
});
