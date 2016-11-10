/*
 * @file Home组件, 展示首页
 */
import React, { PropTypes, Component } from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link, hashHistory } from 'react-router'
import { get } from '../../fetch/request'

import Utils from '../../util/util.js'
import localStorage from '../../util/localStorage.js'

import './title.less'
import './index.less'

import Mime from './Mime'
import Onsell from './Onsell'
import ImgTip from '../../components/ImgTip'
import DialogModal from '../../components/DialogModal'

import * as demoActions from '../../actions/demo'
import * as userInfoActions from '../../actions/userinfo'
import * as globalActions from '../../actions/globalVal'
import * as cardActions from '../../actions/card'

const mapStateToProps = state => {
    return {
        card: state.card,
        globalVal: state.globalVal
    }
}
const mapDispatchToProps = dispatch => {
    return {
        demoActions: bindActionCreators(demoActions, dispatch),
        globalActions: bindActionCreators(globalActions, dispatch),
        cardActions: bindActionCreators(cardActions, dispatch)
    }
}
// React & Redux 绑定
@connect(mapStateToProps,mapDispatchToProps)
export default class Home extends Component {
    static propTypes = {
        globalActions: PropTypes.object.isRequired,
        cardActions: PropTypes.object.isRequired,
        demoActions: PropTypes.object.isRequired
    }
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
        this.hideDialog = this.hideDialog.bind(this)
        this.clickBtn = this.clickBtn.bind(this)
        this.state = {
            show: false
        }
    }
    componentWillMount() {
        // 展示loading
        Utils.loading()
        // 获取支付状态
        let {globalVal, card} = this.props
        if (globalVal.payResult === 'success') {
            this.state.show = true
        }
        // 点击返回直接关闭
        Utils.setBack({type: 1})
        Utils.setTitleBar({
            titleText: '小度商城'
        })
    }
    componentDidMount() {
        let {card, cardActions, globalActions} = this.props
        // if(card.loading) {
        //     Utils.loading()
        // }
        // 获取定位等基础信息
        window.WMAppReady(function() {
            let lng = window.WMApp.location.getLocLng() || '1.295948313E7',
                lat = window.WMApp.location.getLocLat() || '4849489.98',
                cityId = window.WMApp.location.getCityId() || '131',
                app_ver = window.WMApp.device.getAppVersion() || '4.1.0',
                getFrom = window.WMApp.device.getFrom() || 'na-iphone'
            globalActions.addressUpdate({
                city_id: cityId,
                lng: lng,
                lat: lat,
                app_ver: app_ver,
                from: getFrom
            })
            cardActions.getHomeCard()
            localStorage.setItem('city_id', cityId)
        })
    }

    componentDidUpdate() {
        let {card} = this.props
        localStorage.setItem('is_login', card.isLogin && card.isLogin === true ? 1 : 0)
        localStorage.setItem('is_new', card.isNew && card.isNew === true ? 1 : 0)
    }

    hideDialog() {
        window.location.reload()
        // this.setState({
        //     show: false
        // })
        // 关闭对话框不代表页面最新 应该重新加载并且关掉对话框
    }

    // 统一管理点击按钮
    clickBtn(type, privilege_no, toastText) {
        let {card} = this.props
        if (card.isLogin) {
            if (type === 'buy' || type === 'renew') {
                // 通用: 开通或续费 跳到提单页
                hashHistory.push(`/confirm/${privilege_no}`)
            } else if (type === 'delete') {
                // 已购卡: 用户删除已下架卡片
                get('/wmall/privilege/del?display=json').then(res => {
                    return res.json()
                }).then(json => {
                    let result = Number.parseInt(json.result)
                    if (result === 1) {
                        Utils.showToast('删除成功~')
                    }
                })
            } else {
                // 热卖中: 不可开通或不可续费 提示原因 dialog
                Utils.showToast(toastText)
            }
        } else {
            window.WMAppReady(() => {
                window.WMApp.account.login(data => {
                    if (data.status) {   // 1表示成功，0表示登录取消，登录失败NA会处理
                        window.location.reload()
                    }else {
                        console.log('登录取消')
                    }
                })
            })
        }
    }

    render() {
        let {card} = this.props
        if (!card.loading) {
            Utils.loading(0)
        }
        return (
            <div>
                { card.userPrivileges && <Mime cardList = {card.userPrivileges} isVip = {card.isVip} clickBtn = {this.clickBtn}/> }
                { card.cityPrivileges && <Onsell cardList = {card.cityPrivileges} cityName = {card.cityName} clickBtn = {this.clickBtn}/> }
                <Link className = "to-rule" to = "rule">配送折扣卡规则</Link>
                <DialogModal show = {this.state.show} el='pay-success-dialog' title = '购买成功' closeOnOuterClick = {false}>
                    <div className = "pay-success-img"></div>
                    <div className = "pay-success-msg">购买成功，享受权益</div>
                    <footer>
                        <a href = "javascript:;" onClick = {this.hideDialog}>关闭</a>
                    </footer>
                </DialogModal>
            </div>
        )
    }
}
