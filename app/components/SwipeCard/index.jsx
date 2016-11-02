import React, { PropTypes, Component } from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import ReactSwipe from 'react-swipe';

import CommonCard from './CommonCard';

import './index.less'

// 组装 SwipeCard 组件
class SwipeCard extends Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            curCard: 0
        }
    }
    swipeCallback(index, elem) {
        this.setState({
            curCard: index
        })
    }
    render() {
        let cardlist = this.props.cardlist
        let length = cardlist && cardlist.length || 0
        console.log(length);
        return (
            <div>
            {
                length === 1 ?
                <div className="swipe-wrap">
                    {cardlist.map((item, index) => <CommonCard key = {index} card = {item}/>)}
                </div>
                : <div></div>
            }
            </div>
        )
    }
}

export default SwipeCard
