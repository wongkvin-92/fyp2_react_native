const CONNECT_SERVER = "CONNECT_SERVER";
const DISCONNECT_SERVER = "DISCONNECT_SERVER";

export const actions = dispatch => ({
  connectServer: () => dispatch({type:"CONNECT_SERVER"}),
  disconnectServer: ()=>dispatch({type:"DISCONNECT_SERVER"})
});

/*
const exp = {
    CONNECT_SERVER,
    DISCONNECT_SERVER,
    actions
};*/

export default actions;
