import React, { PropTypes, Component } from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import '../../../static/styles/common.less'

import Privilege from './privilege'

// 组装 home 组件
class Home extends Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    render() {
        return (
            <div>
            	首页
                <Privilege />
            </div>
        )
    }
}

export default Home
