import React from "react";
import {connect} from 'react-redux';
import * as actions from '../../actions/index';
import callApi from "../../utils/apiCall";

class Version extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            gia: '',
            size: '',
            mota: '',
            hinhanh: '',
            Sale: '',
            version: '',
            nameProduct: '',
            isHot: false,
            isSale: false,
            tasks: []
        }
    }

    onChange = (event) => {
        let target = event.target;
        let name = target.name;
        let value;
        if (target.type === 'checkbox') {
            value = target.checked;
        }
        else if (target.type === 'file' && event.target.files[0]) {
            value = target.value;
        }
        else {
            value = target.value;
        }
        this.setState({
            [name]: value,
        });
    };

    onClear = () => {
        this.setState({
            id: '',
            version: '',
            nameProduct: '',
            gia: '',
            size: '',
            mota: '',
            hinhanh: '',
            Sale: '',
            isHot: false,
            isSale: false,
        });
    };

    closeForm = () => {
        this.props.closeForm();
    };

    onSubmit = (event) => {
        event.preventDefault();
        let version = {
            id: this.state.id,
            version: this.state.version,
            nameProduct: this.state.nameProduct,
            Sale: this.state.Sale,
            gia: this.state.gia,
            size: this.state.size,
            mota: this.state.mota,
            hinhanh: this.state.hinhanh,
            isHot: this.state.isHot,
            isSale: this.state.isSale,
        };
        if (this.state.id) {
            this.props.onUpdateVersion(version);
            this.onClear();
            this.closeForm();
        } else {
            this.props.addVersion(version);
            this.onClear();
            this.closeForm();
        }

        this.onClear();
        this.closeForm();
    };

    componentWillMount() {
        if (this.props.EditVersion && this.props.EditVersion.id !== null) {
            this.setState({
                id: this.props.EditVersion.id,
                version: this.props.EditVersion.version,
                nameProduct: this.props.EditVersion.nameProduct,
                gia: this.props.EditVersion.gia,
                size: this.props.EditVersion.size,
                mota: this.props.EditVersion.mota,
                hinhanh: this.props.editProduct.hinhanh,
                isHot: this.props.EditVersion.isHot,
                isSale: this.props.EditVersion.isSale,
                Sale: this.props.EditVersion.Sale,

            });
        }
        else {
            this.onClear();
        }
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps && nextProps.editProduct) {
            this.setState({
                id: nextProps.EditVersion.id,
                nameProduct: nextProps.EditVersion.nameProduct,
                version: nextProps.EditVersion.version,
                gia: nextProps.EditVersion.gia,
                size: nextProps.EditVersion.size,
                mota: nextProps.EditVersion.mota,
                hinhanh: nextProps.editProduct.hinhanh,
                Sale: nextProps.EditVersion.Sale,
                isHot: nextProps.EditVersion.isHot,
                isSale: nextProps.EditVersion.isSale,
            });
        }
        else {
            this.onClear();
        }
    };

    componentDidMount() {
        callApi('products', 'GET', null).then(res => {
            this.setState({
                tasks: res.data,
            });
            // console.log(res.data)
        });

    }

    render() {
        let {tasks} = this.state;
        const option = tasks.map((task, index) => {
            return (
                <option key={index} value={task.tensp}> {task.tensp}</option>
            );
        });
        return (
            <div className={!this.state.id ? 'panel panel-info' : 'panel panel-danger'}>
                <div className="panel-heading">
                    <h2 className="panel-title">
                        {!this.state.id ? 'Thêm Version' : 'Cập Nhật Sản Phẩm'}
                    </h2>
                </div>

                <form className="panel-body" onSubmit={this.onSubmit}>
                    <div className="form-group col-md-6">
                        <label>Version:</label>
                        <input type="text"
                               className="form-control"
                               id="input1"
                               required
                               name="version"
                               value={this.state.version}
                               onChange={this.onChange}
                        />
                    </div>
                    <div className="form-group col-md-6">
                        <label>Tên:</label>
                        <select
                            className="form-control"
                            name="nameProduct"
                            required
                            value={this.state.nameProduct}
                            onChange={this.onChange}
                        >
                            <option defaultValue="0">Chọn Sản Phẩm:</option>
                            {option}
                        </select>
                    </div>

                    <div className="form-group col-md-6">
                        <label>Giá:</label>
                        <input type="text"
                               className="form-control"
                               id="input3"
                               required
                               name="gia"
                               value={this.state.gia}
                               onChange={this.onChange}
                        />
                    </div>
                    <div className="form-group col-md-6">
                        <label>Size:</label>
                        <select
                            className="form-control"
                            name="size"
                            required
                            value={this.state.size}
                            onChange={this.onChange}
                        >
                            <option defaultValue="0">Chọn Size:</option>
                            <option value="38">38</option>
                            <option value="39">39</option>
                            <option value="40">40</option>
                            <option value="41">41</option>
                            <option value="42">42</option>
                            <option value="43">43</option>
                        </select>
                    </div>
                    <div className="form-group col-md-6">
                        <label>Mô Tả:</label>
                        <textarea
                            className="form-control"
                            name="mota"
                            id="input5"
                            required
                            value={this.state.mota}
                            onChange={this.onChange}
                        />
                    </div>
                    <div className="form-group col-md-6">
                        <label>Hình Ảnh:</label>
                        <input type="file"
                               className="form-control"
                               id="input6"
                            //required
                               name="hinhanh"
                               value={this.state.hinhanh}
                               onChange={this.onChange}
                        />
                    </div>

                    <div className="form-group col-md-6">
                        <button id="btnCheck" type="submit" className="btn btn-success "> Lưu</button>
                    </div>

                </form>

            </div>

        );

    }

}


const mapStateToProps = state => {
    return {
        tasks: state.tasks,
        Version: state.Version,
        editProduct: state.editProduct,
        displayForm: state.displayForm,
        EditVersion: state.EditVersion,


    }
};
const mapDispatchToProps = (dispatch, props) => {
    return {
        addProduct: (task) => {
            dispatch(actions.addProduct(task))
        },
        addVersion: (version) => {
            dispatch(actions.addVersionRequest(version))
        },
        closeForm: () => {
            dispatch(actions.closeForm())
        },
        onUpdateVersion: (version) => {
            dispatch(actions.updateVersionRequest(version))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Version);



