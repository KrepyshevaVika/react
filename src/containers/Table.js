import { connect } from 'react-redux';

import { getAll, updateNode, sortNodes } from '../store/actions/actions';
import Table from '../components/Table';
import MyTable from '../components/MyTable';

function mapStateToProps(state) {
    return {
        nodes: state.node.nodes,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getAll: () => dispatch(getAll()),
        updateNode: (data) => dispatch(updateNode(data)),
        sortNodes: (data) => dispatch(sortNodes(data)),
    }
}

export const TableContainer = connect(mapStateToProps, mapDispatchToProps)(Table);
export const MyTableContainer = connect(mapStateToProps, mapDispatchToProps)(MyTable);
