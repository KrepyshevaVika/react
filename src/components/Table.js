import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import React, { Component } from 'react';
import Header from './Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortAmountDown } from '@fortawesome/free-solid-svg-icons';

const namesColumn = [
    {
        id: 1,
        name: 'Имя узла',
        type: 'name'
    }, 
    {
        id: 2,
        name: 'Ip-адрес',
        type: 'ip_adress'
    }, 
    {
        id: 3,
        name: 'Web-порт',
        type: 'web_port'
    }, 
    {
        id: 4,
        name: 'Тип узла',
        type: 'type_id'
    },
    {
        id: 5,
        name: 'Описание узла',
        type: 'description'
    }
];

const cellEditProp = {
    mode: 'click'
  };

class Table extends Component {
    constructor(props) {
        super(props);

        this.sort = true;
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

    handleCellEdit(row, fieldName, value) {
        row[fieldName] = value;
        this.props.updateNode(row);
    }

    handleSortChange(sortName, sortOrder) {
        switch (sortOrder) {
            case 'asc':
                this.sort = true;
                break;
            case 'desc':
                this.sort = false;
                break;
            default:
                throw Error("sortOrder is undefined")
        }
        let arr = this.props.nodes.slice();
        arr = this.sortWithParam(sortName, arr, this.sort);
        this.props.sortNodes(arr);
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

    tableHead = (namesHeaderColumn) => {
        return namesHeaderColumn.map((elem) => {
            return (
                <TableHeaderColumn dataField={elem.type} 
                                    key={elem.id}
                                    dataSort={ true }>
                    {elem.name}
                    <FontAwesomeIcon className={(this.sort ? "icon-sort" : "icon-sort active")} icon={faSortAmountDown} />
                </TableHeaderColumn>
            )
        })
    }

    render() {
        console.log(this.props.nodes);
        return (
            <div>
                <Header active="Table"/>

                <BootstrapTable data={this.props.nodes} 
                                cellEdit={ cellEditProp }
                                remote={ true }
                                options={ { onCellEdit: (row, fieldName, value) => this.handleCellEdit(row, fieldName, value),
                                            onSortChange: (sortName, sortOrder) => this.handleSortChange(sortName, sortOrder) } }
                                height='60'
                                >
                    <TableHeaderColumn isKey 
                                        dataField='id'
                                        dataSort={ true }>
                        #
                        <FontAwesomeIcon className={(this.sort ? "icon-sort" : "icon-sort active")} icon={faSortAmountDown} />
                    </TableHeaderColumn>
                    {this.tableHead(namesColumn)}
                </BootstrapTable>
            </div>
        );
    }
}

export default Table;