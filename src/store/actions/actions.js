import { getAllNodes, update, remove, insert, getNodeChildren, getNodeById, getTopNodes } from '../../services/service';

export const GET_SUCCESS = 'GET_SUCCESS';
export const HIDDEN_INFO_SUCCESS = 'HIDDEN_INFO_SUCCESS';

export const SHOW_CHILD_SUCCESS = 'SHOW_CHILD_SUCCESS';
export const HIDDEN_CHILD_SUCCESS = 'HIDDEN_CHILD_SUCCESS';

export const MESSAGE_ERROR = 'MESSAGE_ERROR';

export const CHANGE_SUCCESS = 'CHANGE_SUCCESS';
export const INSERT_SUCCESS = 'INSERT_SUCCESS';
export const DELETE_SUCCESS = 'DELETE_SUCCESS';

export const SORT = 'SORT';

export function sort(data) {
    return {
        type: SORT,
        nodes: data,
    }
}

export function updateData(data) {
    return {
        type: CHANGE_SUCCESS,
        node: data,
    }
}

export function receiveData(data) {
    return {
        type: GET_SUCCESS,
        nodes: data
    }
}

export function showChild(data, id) {
    return {
        type: SHOW_CHILD_SUCCESS,
        nodes: data,
        targerId: id,
    }
}

export function hiddenChild(data) {
    return {
        type: HIDDEN_CHILD_SUCCESS,
        elem: data,
    }
}

export function removeData(data) {
    return {
        type: DELETE_SUCCESS,
        node: data,
    }
}

export function createData(data) {
    return {
        type: INSERT_SUCCESS,
        node: data,
    }
}

export function hiddenInfo() {
    return {
        type: HIDDEN_INFO_SUCCESS,
    }
}

export function errorReceive(err) {
    return {
        type: MESSAGE_ERROR,
        messageError: err
    }
}

//----------------------------------------------------------
export function getTop() {
    return (dispatch) => {

        getTopNodes().then((data) => {
            dispatch(receiveData(data));
        }).catch((error) => {
            dispatch(errorReceive(error));
        });
    }
}

export function getById(id, onSuccess) {
    return (dispatch) => {

        getNodeById(id).then((data) => {
            onSuccess(data);
        }).catch((error) => {
            dispatch(errorReceive(error));
        });
    }
}

export function getChild(id) {
    return (dispatch) => {

        getNodeChildren(id).then((data) => {
            dispatch(showChild(data, id));
        }).catch((error) => {
            dispatch(errorReceive(error));
        });
    }
}

export function deleteChild(target) {

    return (dispatch) => {
        dispatch(hiddenChild(target));
    };
}

export function deleteInfo() {

    return (dispatch) => {
        dispatch(hiddenInfo());
    };
}

export function insertNode(data, countChild, onSuccess) {

    return (dispatch) => {

        insert(data).then((data) => {
            if (countChild > 0)  //если имеет дочернии, но они не подгружены
            {
                getNodeChildren(data.node_id).then((children) => {
                    dispatch(showChild(children, data.node_id));
                }).catch((error) => {
                    dispatch(errorReceive(error));
                });
            } else
            {
                getNodeById(data.id).then((data) => {
                    dispatch(createData(data));
                }).catch((error) => {
                    dispatch(errorReceive(error));
                });
            }
            return data;
        }).then((data) => {
            onSuccess(data);
        }).catch((error) => {
            dispatch(errorReceive(error));
        });
    };
}

export function deleteNode(data) {

    return (dispatch) => {

        remove(data.id).then(() => {
            dispatch(removeData(data));
        }).catch((error) => {
            dispatch(errorReceive(error));
        });
    };
}

export function updateNode(data) {

    return (dispatch) => {

        update(data).then(() => {
            getNodeById(data.id).then((data) => {
                dispatch(updateData(data));
            }).catch((error) => {
                dispatch(errorReceive(error));
            });
        }).catch((error) => {
            dispatch(errorReceive(error));
        });
    };
}

export function getAll() {
    return (dispatch) => {

        getAllNodes().then((data) => {
            dispatch(receiveData(data));
        }).catch((error) => {
            dispatch(errorReceive(error));
        });
    }
}

export function sortNodes(data) {

    return (dispatch) => {
        dispatch(sort(data));
    };
}