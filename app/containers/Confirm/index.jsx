/*
 * @file Confirm 组件, 提交订单页
 */
import React, { PropTypes, Component } from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import './index.less'

import TitleBar from '../../components/TitleBar'
import Access from '../../components/Access'
import RadioList from '../../components/RadioList'
import DialogModal from '../../components/DialogModal'

import * as globalActions from '../../actions/globalVal'
import * as cardActions from '../../actions/card'

const mapStateToProps = state => {
    return {
        confirm: state.confirm,
        globalVal: state.globalVal
    }
}
const mapDispatchToProps = dispatch => {
    return {
        globalActions: bindActionCreators(globalActions, dispatch),
        cardActions: bindActionCreators(cardActions, dispatch)
    }
}
// React & Redux 绑定
@connect(mapStateToProps,mapDispatchToProps)
export default class Confirm extends Component {
    static propTypes = {
        globalActions: PropTypes.object.isRequired,
        cardActions: PropTypes.object.isRequired
    }
    constructor(props, context) {
        super(props, context)
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
        this.changePeriod = this.changePeriod.bind(this)
        this.state = {
            selectCityId: 0,
            selectCityName: '北京市',
            lastCityId: 0,
            laseCityName: '北京市',
            accessTitle: '本卡权益',
            period: 0,
            show: true // 城市提示框
        }
    }
    compontentWillMount() {
        // 展示loading状态 todo
        // loading()
    }
    componentDidMount () {
        let {confirm, cardActions, globalActions} = this.props
        console.log(!confirm.data);
        !confirm.data && cardActions.getConfirmInfo()
        globalActions.addressUpdate({
            lat: '1111',
            lng: '22222'
        })
    }

    changePeriod (period) {
        this.setState({
            period: period
        })
    }
    sendPayInfo() {
        // 生成支付订单
    }
    changeCity () {
        // 调端内更改地址API
    }
    render() {
        let {confirm} = this.props
        let accessList = {}, radioList = []
        if (confirm.errno === 0) {
            let data = confirm.data
            let cityName = data.city_name
            this.state.accessTitle = `本卡权益（${cityName}）`
            accessList = data.privilege_rule
            radioList = data.prices
            this.state.period === 0 && (this.state.period =  radioList[0].period)
        } else {
            // todo
        }
        // 隐藏loading状态 todo
        // loading(0)
        // 更新全局数据
        // globalActions.addressUpdate({
        //     isVip: card.isVip
        // })
        return (
            <div className = "confirm-page">
                <TitleBar type = "access-title" title = {this.state.accessTitle}/>
                <Access accessList = {accessList}/>
                <TitleBar type = "period-title" title = "有效期" />
                <RadioList radioList = {radioList} selected = {this.state.period} onSelectedValueChanged = {this.changePeriod}/>
                <div className = "agree-wrap">
                    <div className = "radio"></div>
                    同意并接受<Link to = "rule">《百度外卖购卡协议》</Link>
                </div>
                <div className = "buy-card">去支付 ￥{this.state.period}不对</div>
                <DialogModal show = {this.state.show} el = 'city-tip-dialog' title = '温馨提示' closeOnOuterClick = {false}>
                    <div className="tipmsg-wrap">
                        <p>您当前开通享有权益的城市是<span>北京</span>，</p>
                        <p>如需更换请到首页更改定位</p>
                    </div>
                    <footer>
                        <a href="javascript:;" onClick = {this.changeCity}>更改城市</a>
                        <a href="javascript:;" onClick = {this.sendPayInfo}>确认</a>
                    </footer>
                </DialogModal>
            </div>
        )
    }
}

export default Confirm
