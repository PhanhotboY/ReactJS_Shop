import { connect } from 'react-redux';
import { Component } from 'react';

import style from './ShopHeader.module.scss';
import { FormattedMessage } from 'react-intl';
import ShopAvatar from './Section/ShopAvatar';
import ShopNavigation from './Section/ShopNavigation';

class ShopHeader extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userInfo: this.props.userInfo,
        };
    }

    async componentDidMount() {
        this.setState({ userInfo: this.props.userInfo });
    }

    componentDidUpdate(prevProps) {
        if (this.props.userInfo !== prevProps.userInfo) {
            this.setState({ userInfo: this.props.userInfo });
        }
    }

    render() {
        const userInfo = this.state.userInfo;

        return (
            <div className={`${style.header} bg-white`}>
                <div className='grid'>
                    <div className={`row ${style.shop_info}`}>
                        <ShopAvatar userInfo={userInfo} />

                        <ShopSubInfoLeft />

                        <ShopSubInfoRight />
                    </div>

                    <ShopNavigation navigators={navigators} />
                </div>
            </div>
        );
    }
}

const ShopSubInfoLeft = ({}) => {
    return (
        <div className={`${style.subinfo} col-4`}>
            <span>
                <i className='fa-solid fa-store'></i>
                <FormattedMessage id='shop.products' />
                {': '}
                <span>{78}</span>
            </span>
            <span>
                <i className='fa-solid fa-user-plus'></i>
                <FormattedMessage id='shop.following' />
                {': '}
                <span>{78}</span>
            </span>
            <span>
                <i className='fa-solid fa-comment-dots'></i>
                <FormattedMessage id='shop.chat-performance' />
                {': '}
                <span>{'78%'}</span>
            </span>
        </div>
    );
};

const ShopSubInfoRight = ({}) => {
    return (
        <div className={`${style.subinfo} col-4`}>
            <span>
                <i className='fa-solid fa-user-group'></i>
                <FormattedMessage id='shop.follower' />
                {': '}
                <span>{78}</span>
            </span>
            <span>
                <i className='fa-regular fa-star'></i>
                <FormattedMessage id='shop.rating' />
                {': '}
                <span>{78}</span>
            </span>
            <span>
                <i className='fa-solid fa-user-check'></i>
                <FormattedMessage id='shop.joined' />
                {': '}
                <span>
                    {78} <FormattedMessage id='shop.years-ago' />
                </span>
            </span>
        </div>
    );
};

const navigators = [
    { name: 'shop.home', link: '#' },
    { name: 'shop.all-products', link: '#product-list' },
];

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ShopHeader);
