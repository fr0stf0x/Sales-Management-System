import React from "react";
import {connect} from 'react-redux'
import Products from "../Products/Products";
class ItemsHot extends React.Component {

    render() {
        let {tasks} =this.props;
        const listItemsHOT = tasks.map((item, index)  => {
            if (item.isHot === true ) {
                return (
                    <div key={index}>
                        <Products
                            key ={index}
                            id ={item.id}
                            name ={item.tensp}
                            image ={item.hinhanh}
                            price = {item.gia}
                            brand = {item.brand}
                            mota ={item.mota}
                            size = {item.size}
                            sale ={item.Sale}
                            isSale={item.isSale}
                            isHot = {item.isHot}
                        />
                    </div>
                );
            }

        });
        return (
            <div className="row">
                <div className="panel-body" style={{fontFamily: 'sans-serif'}}>
                    <h1 className="w3-text">Sản Phẩm HOT</h1>
                    <hr/>
                </div>
                {listItemsHOT}
            </div>
        );
    }
}
const listProducts = state =>{
    return {
        tasks : state.tasks,
    }

};


export default connect(listProducts,null)  (ItemsHot);





