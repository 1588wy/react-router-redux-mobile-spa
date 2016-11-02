/*
 * @file 首页热卖商品卡片列表组件
 */
import React, { PropTypes, Component } from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import SellCard from './SellCard';
import MessageTip from './MessageTip';

import './index.less'

// 组装 CardList 组件
class CardList extends Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    render() {
        let length = this.props.cardlist && this.props.cardlist.length || 0;
        return (
            <div className="sellcard-wrap">
                {
                    length && this.props.cardlist.map((item, index) => 
                        <SellCard key = {item.privilege_id} card = {item}/>)
                }
                <MessageTip tip = {'更多惊喜敬请期待...'}/>
            </div>
        )
    }
}

export default CardList
