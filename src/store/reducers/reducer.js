import { SORT, CHANGE_SUCCESS, DELETE_SUCCESS, INSERT_SUCCESS, HIDDEN_INFO_SUCCESS, GET_SUCCESS, SHOW_CHILD_SUCCESS, HIDDEN_CHILD_SUCCESS, MESSAGE_ERROR } from '../actions/actions';

const initialState = {
    nodes: [],
    messageError: "",
}

export default function itemReducer(state = initialState, action) {
    switch (action.type) {
        case GET_SUCCESS:
            return { ...state, nodes: action.nodes, messageError: "" }
        case HIDDEN_INFO_SUCCESS:
            return { ...state, messageError: "" }
        case SHOW_CHILD_SUCCESS:
        {
            let nodes = state.nodes.slice();
            return {    
                        ...state, 
                        nodes: updateState(nodes, action.nodes, action.targerId), 
                        messageError: "" 
                    }
        }
        case INSERT_SUCCESS:
        {
            let nodes = state.nodes.slice();
            updateStateAfterInsert(nodes,  action.node);
            return { 
                        ...state, 
                        nodes: nodes,
                        messageError: "" 
                    };
        }
        case DELETE_SUCCESS: 
        {
            let nodes = state.nodes.slice();
            updateStateAfterDelete(nodes, action.node);
            return { 
                        ...state, 
                        nodes: nodes, 
                        messageError: "" 
                    };
        }
        case CHANGE_SUCCESS: 
        {
            let nodes = state.nodes.slice();
            updateStateAfterChange(nodes, action.node);
            return {    
                        ...state, 
                        nodes: nodes, 
                        messageError: "" 
                    }
        }
        case SORT:
            return { ...state, nodes: action.nodes }
        case MESSAGE_ERROR:
            return { ...state, messageError: action.messageError }
        case HIDDEN_CHILD_SUCCESS:
        {
            let nodes = state.nodes.slice();
            return { ...state, nodes: updateStateAfterHiddenChildren(nodes, action.elem.id), messageError: "" }
        }
        default:
            return state;
    }
}
// -----------------hidden children-------------------------------------
function updateStateAfterHiddenChildren(nodes, id) {
    let newNodes = nodes.map((node) => {
        if ((node.id === id) && (node.children && node.children.length > 0)) {
            return updateTreeStateAfterHidden(node);
        }
        else if(node.children && node.children.length > 0) {
            let children = updateStateAfterHiddenChildren(node.children, id);
            return updateTreeState(node, children);
        }
        return node;
    });
    return newNodes;
}

function updateTreeStateAfterHidden(node) {
    let target = {...node};
    delete target.children;
    return target; 
}
// -----------------insert-------------------------------------
function updateStateAfterInsert(nodes, newNode) {
    let stop = false;
    let inner = (nodes, newNode) => {
        
        for (let node of nodes) {
            if(!newNode.node_id){
                nodes.push(newNode);
                return true;
            }
            else if (newNode.node_id === node.id) {
                if (node.count_child === 0)
                    node.children = [];
                node.children.push(newNode);
                node.count_child++;
                return true;       
            }
            else if (node.children && node.children.length > 0) {
                stop = inner(node.children, newNode);
            }
            
            if(stop) return stop;
        }
        
        return
    };
    inner(nodes, newNode);
}
// -----------------update-------------------------------------
function updateStateAfterChange(nodes, newNode) {
    let stop = false;
    let inner = (nodes, newNode) => {
        
        for (let node of nodes) {
            if (newNode.id === node.id) {
                nodes.splice(nodes.indexOf(node), 1, newNode);
                return true;       
            }
            else if (node.children && node.children.length > 0) {
                stop = inner(node.children, newNode);
            }
            
            if(stop) return stop;
        }
        
        return
    };
    inner(nodes, newNode);
}
// -----------------delete-------------------------------------
function updateStateAfterDelete(nodes, newNode) {
    let stop = {
        delete: false,
        lowChild: false
    }
    let inner = (nodes, newNode) => {
        
        for (let node of nodes) {
            if (newNode.id === node.id) {
                nodes.splice(nodes.indexOf(node), 1);
                stop.delete = true;
                return stop;       
            }
            else if (node.children && node.children.length > 0) {
                stop = inner(node.children, newNode);
                if (stop.delete && !stop.lowChild) {
                    node.count_child--;
                    stop.lowChild = true;
                    return stop;
                }
            }
            if(stop.delete && stop.lowChild) return stop;
        }
        
        return stop;
    };
    inner(nodes, newNode);
}
// -----------------show child-------------------------------------
function updateState(nodes, data, id) {
    let newNodes = nodes.map((node) => {
        if (node.id === id) return updateTreeState(node, data);
        if(node.children && node.children.length > 0) {
            let children = updateState(node.children, data, id);
            return updateTreeState(node, children);
        }
        return node;
    });
    return newNodes;
}

function updateTreeState(node, data) {
    node = {...node, children: data, count_child: data.length};
    return node;
}
