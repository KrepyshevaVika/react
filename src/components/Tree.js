import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import FormWithFields from './FormWithFields';
import Header from './Header';

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      infoAboutNode: {}
    }

    this.handleToLoad = this.handleToLoad.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.update = this.update.bind(this);
  }

  componentDidMount() {
    this.getNodes();
  }

  getNodes() {
    this.props.getTop();
  }

  toLoad(id) {
    this.props.getChild(id);
  }

  targetElem(menuNodes, id) { 
    for (let elem of menuNodes) {
      if ((elem.id === id) && (elem.children && elem.children.length > 0)) {
        return elem;    
      }
      if (elem.children && elem.children.length > 0) {
        let tmp = this.targetElem(elem.children, id);
        if(tmp)
          return tmp;
      }     
    }
  }

  handleToLoad(elem) {
    if(!elem.id) return;
    
    this.handleOpenInfo(elem.id);

    if (elem.children) {
        this.props.deleteChild(elem);
    } else 
        this.toLoad(elem.id);
  }

  handleInsert(targetNode, e) {
    let data ={
      node_id: targetNode ? targetNode.id : null,
      name: "defaultName",
      type_id: 3,
    }

    this.props.insertNode(data, targetNode ? targetNode.count_child : null, this.update);

    e.stopPropagation();
  }

  update(data) {
    this.setState({ infoAboutNode: data });
  }

  handleDelete(data, e) {
    this.props.deleteNode(data);
    this.update({});
    e.stopPropagation();
  }

  handleUpdate(data) {
    this.props.updateNode(data);
    this.update({});
  }

  handleOpenInfo(id) {
    this.props.getById(id, this.update);
  }

  isEmpty(obj) {
    for (var key in obj) {
      return false;
    }
    return true;
  }

  handleClose() {
    this.props.deleteInfo();
    this.update({});
  }

  liItem = (menuNodes) => 
    menuNodes.map((elem) => {

        let childElems;
        if(elem.children && elem.children.length > 0) {
            childElems = this.liItem(elem.children);
        }

        return (
        <li key={elem.id}  className="li">
            <div  tabIndex={elem.id} data-id={elem.id} 
                  onClick={elem.count_child > 0 ? (e) => this.handleToLoad(elem, e) : (e) => this.handleOpenInfo(elem.id, e)}
                  className={(this.selectedNode === elem.id) ? "item line" : "item"}>

                <div>
                  <FontAwesomeIcon  className={(elem.count_child > 0 ? childElems ? "icon active" : "icon" : "icon disable") } icon={faAngleRight} />
                </div>
                
                <div className="text">
                  {elem.name}
                </div>

                <div className="btn-group">
                  <button type="button" 
                          className={(elem.node_type.is_endpoint) ? "btn btn-success" : "btn btn-success btnCanOpen"} 
                          onClick={(e) => this.handleInsert(elem, e)}>+
                  </button>
                  <button type="button" 
                          className="btn btn-danger btnCanOpen"
                          onClick={(e) => this.handleDelete(elem, e)} >&ndash;
                  </button>
                </div>
                   
            </div>  

            {childElems && 
            (
            <ul>
                {childElems} 
            </ul>
            )}        
        </li>
        
        );
  }); 

  render() {
    this.selectedNode = !this.isEmpty(this.state.infoAboutNode) ? this.state.infoAboutNode.id : null;
 
    return (
      <div>

        <Header active="Main"/>

        <div className="main-component">
          <div className="inner-main">
              <li className="type-none">
                <button type="button" className="btn btn-success" onClick={(e) => this.handleInsert(null, e)}  >+</button>  
              </li>

              <ul className="inner-ul">
                {this.liItem(this.props.nodes)} 
              </ul>   
          </div>

          <div className="inner-main">
            {!this.isEmpty(this.state.infoAboutNode) &&
              (<FormWithFields onSubmit={this.handleUpdate} 
                              onClose={this.handleClose}
                              data={this.state.infoAboutNode}
                              />) }
            
          </div>
        </div>

      </div>
    );
  }
}

export default Main;