import React, { Component } from 'react';

class FormWithFields extends Component {
    constructor(props) {
        super(props);

        this.handleChangeField = this.handleChangeField.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    handleChangeField(e) {
        e.preventDefault();   
        
        const nameNode = this.refs.nameNode.value,
            IPadress = this.refs.IPadress.value,
            WebPort = this.refs.WebPort.value,
            nodeType = this.refs.nodeType.value,
            description = this.refs.descriptionNode.value

        if (!+nodeType) {
            this.refs.error.className = "alert alert-danger";
            return;
        }

        this.refs.error.className = "hidden";

        let data = {
            id: this.props.data.id,
            name: nameNode,
            ip_adress: IPadress || null,
            web_port: WebPort || null,
            type_id: nodeType,
            node_id: this.props.data.node_id,
            description: description || null,
        };

        this.refs.form.style.display = "none"; 

        this.props.onSubmit(data);
        this.handleClose();

        return false;
    }

    handleClose() {
        this.props.onClose();
    }

    render() {
        return (
            <form onSubmit={this.handleChangeField} ref="form">

                <ul className="modal-body">

                    <li className="modal-li" key={this.props.data.name}>
                        <label htmlFor="nameNode">Имя узла:</label>
                        <input type="text" id="nameNode" className="form-control" placeholder="Имя узла" ref="nameNode" 
                            defaultValue={this.props.data.name || ""} required
                            /> 
                    </li>

                    <li className="modal-li" key={this.props.data.ip_adress || "IPadress"}>
                        <label htmlFor="IPadress">IP-адрес:</label>
                        <input type="text" id="IPadress" className="form-control" placeholder="IP-адрес" ref="IPadress" 
                            pattern="((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)"
                            title="четыре чисела от 0 до 255, разделённых точками, например, 192.168.0.3"
                            defaultValue={this.props.data.ip_adress || ""}
                            />
                    </li>

                    <li className="modal-li" key={this.props.data.web_port || "WebPort"}>
                        <label htmlFor="WebPort">Web-порт:</label>
                        <input type="text" id="WebPort" className="form-control" placeholder="Web-порт" ref="WebPort"
                            pattern="^(([0-9]{1,4})|([1-5][0-9]{4})|(6[0-4][0-9]{3})|(65[0-4][0-9]{2})|(655[0-2][0-9])|(6553[0-5]))$"
                            title="от 0 до 65535"
                            defaultValue={this.props.data.web_port || ""}
                            />      
                    </li>

                    <li className="modal-li" key={this.props.data.type_id}>
                        <label htmlFor="nodeType">Тип узла:</label>
                        <select className="form-control" id="nodeType" defaultValue={this.props.data.type_id || 0} ref="nodeType">
                            <option value="0">выбрать тип узла...</option>
                            <option value="1">control node</option>
                            <option value="2">storage node</option>
                            <option value="3">render node</option>
                            <option value="4">node js</option>
                            <option value="5">pacs</option>
                            <option value="6">nginx</option>
                        </select>
                    </li>   

                    <li className="modal-li" key={this.props.data.description}>
                        <label htmlFor="descriptionNode">Описание:</label>
                        <textarea type="text" id="descriptionNode" className="form-control" placeholder="Описание" ref="descriptionNode" 
                            defaultValue={this.props.data.description || ""} 
                            /> 
                    </li>  

                    {/*error validate*/}
                    <li className="modal-li">
                        <div className="hidden" ref="error">Не выбран тип узла!</div>
                    </li>

                </ul>

                <div className="modal-footer">
                    <button type="submit" className="btn btn-primary" >Сохранить</button>
                    <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={this.handleClose}>Отмена</button>
                </div>
            </form>
        );
    }
}

export default FormWithFields;