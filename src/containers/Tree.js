import { connect } from 'react-redux';

import { updateNode, deleteNode, insertNode, deleteInfo, getById, getTop, getChild, deleteChild } from '../store/actions/actions';
import Tree from '../components/Tree';

function mapStateToProps(state) {
    return {
        nodes: state.node.nodes
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getChild: (id) => dispatch(getChild(id)),
        deleteChild: (targer) => dispatch(deleteChild(targer)),
        getTop: () => dispatch(getTop()),
        getById: (id, onSuccess) => dispatch(getById(id, onSuccess)),
        deleteInfo: () => dispatch(deleteInfo()),
        insertNode: (data, countChild, onSuccess) => dispatch(insertNode(data, countChild, onSuccess)),
        deleteNode: (data) => dispatch(deleteNode(data)),
        updateNode: (data) => dispatch(updateNode(data)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tree);