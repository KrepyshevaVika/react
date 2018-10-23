import React, { Component } from 'react';
import Header from './Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortAmountDown } from '@fortawesome/free-solid-svg-icons';

class MyTable extends Component {
    constructor(props) {
        super(props);

        this.sort = true;
        this.handleUpdate = this.handleUpdate.bind(this);
    }

    componentDidMount() {
        this.getNodes();
    }
    
    getNodes() {
        this.props.getAll();
    }

    handleUpdate(data) {
        this.props.updateNode(data);
    }

    handleKeyPress(type, id, e) {
        if (e.key === 'Enter') {
            let data = {
                id: id,
            }
            data[type] = e.target.value;

            this.handleUpdate(data);
        }
    }

    sortWithParam (sortParameter, nodes, type) {
        function compare(a, b) {
            if (a[sortParameter] < b[sortParameter]) 
                return (type) ? -1 : 1;
            if (a[sortParameter] > b[sortParameter])
                return (type) ? 1 : -1;
            return 0;
       }
       nodes.sort(compare);
       return nodes;
    }

    handleSort(nodes) {
        let arr = nodes.slice();
        arr = this.sortWithParam('name', arr, this.sort);
        this.sort = !this.sort;
        this.props.sortNodes(arr);
    }

    trNode = (nodes) => {
        let count = 0;
        return nodes.map((elem) => {
            return (
                <tr key={elem.id}>
                    <th scope="row">{++count}</th>
                    <td key={elem.name}>
                        <input type="text" id="nameNode" className="form-control" ref="nameNode" 
                            defaultValue={elem.name} required
                            onKeyPress={(e) => this.handleKeyPress("name", elem.id, e)}/> 
                    </td>
                    <td key={elem.ip_adress || "IPadress"}>
                        <input type="text" id="IPadress" className="form-control" placeholder="IP-адрес" ref="IPadress" 
                            pattern="((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)"
                            title="четыре чисела от 0 до 255, разделённых точками, например, 192.168.0.3"
                            defaultValue={elem.ip_adress || ""}
                            onKeyPress={(e) => this.handleKeyPress("ip_adress", elem.id, e)}/>
                    </td>
                    <td key={elem.web_port || "WebPort"}>
                        <input type="text" id="WebPort" className="form-control" placeholder="Web-порт" ref="WebPort"
                            pattern="^(([0-9]{1,4})|([1-5][0-9]{4})|(6[0-4][0-9]{3})|(65[0-4][0-9]{2})|(655[0-2][0-9])|(6553[0-5]))$"
                            title="от 0 до 65535"
                            defaultValue={elem.web_port || ""}
                            onKeyPress={(e) => this.handleKeyPress("web_port", elem.id, e)}/> 
                    </td>
                    <td key={elem.type_id}>
                        <select className="form-control" id="nodeType" defaultValue={elem.type_id || 0} ref="nodeType" onKeyPress={(e) => this.handleKeyPress("type_id", elem.id, e)}>
                            <option value="0">выбрать тип узла...</option>
                            <option value="1">control node</option>
                            <option value="2">storage node</option>
                            <option value="3">render node</option>
                            <option value="4">node js</option>
                            <option value="5">pacs</option>
                            <option value="6">nginx</option>
                        </select>
                    </td>
                </tr>  
            );
        }); 
    }

    render() {
        console.log(this.props.nodes);
        return (
            <div>
                <Header active="MyTable"/>
                <table className="table">

                    <thead className="head">
                        <tr>
                            <th  scope="col">
                                <span>#</span>
                                <FontAwesomeIcon className="icon-sort" icon={faSortAmountDown} />
                            </th>
                            <th scope="col" onClick={(e) => this.handleSort(this.props.nodes, e)}>
                                <span>Имя узла</span>
                                <FontAwesomeIcon className={(this.sort ? "icon-sort" : "icon-sort active")} icon={faSortAmountDown} />
                            </th>
                            <th scope="col">
                                <span>Ip-адрес</span>
                                <FontAwesomeIcon className="icon-sort" icon={faSortAmountDown} />
                            </th>
                            <th scope="col">
                                <span>Web-порт</span>
                                <FontAwesomeIcon className="icon-sort" icon={faSortAmountDown} />
                            </th>
                            <th scope="col">
                                <span>Тип узла</span>
                                <FontAwesomeIcon className="icon-sort" icon={faSortAmountDown} /> 
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {this.trNode(this.props.nodes)}
                    </tbody>

                </table>
            </div>
        );
    }
}

export default MyTable;