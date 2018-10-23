import { connect } from 'react-redux';

import { getAll, updateNode, sortNodes } from '../store/actions/actions';
import Masonry from '../components/Masonry';

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

export default connect(mapStateToProps, mapDispatchToProps)(Masonry);