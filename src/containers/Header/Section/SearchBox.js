import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { push } from 'connected-react-router';

import { PATH } from 'utils';
import { history } from '../../../redux';
import style from './SearchBox.module.scss';

class SearchBox extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isFocusInput: false,
            searchInputText: '',
        };
    }

    componentDidMount() {
        this.unlisten = history.listen((location) => {
            if (location.pathname === '/') {
                this.setState({ searchInputText: '' });
            }
        });
    }

    componentWillUnmount() {
        if (this.unlisten) this.unlisten();
    }

    handleSubmitForm(event) {
        event.preventDefault();
        const encodedSearchInput = encodeURIComponent(this.state.searchInputText);
        const { navigate } = this.props;
        const redirectPath = `/search?keyword=${encodedSearchInput}`;
        navigate(`${redirectPath}`);
    }

    handleOnChangeInput(event) {
        this.setState({ searchInputText: event.target.value });
    }

    toggleRecentList() {
        this.setState({ isFocusInput: true });
        document.body.addEventListener('click', () => this.setState({ isFocusInput: false }));
    }

    render() {
        return (
            <div className={style.search_container}>
                <div className={style['searchBox']}>
                    <SearchInput
                        handleSubmitForm={this.handleSubmitForm.bind(this)}
                        isFocus={this.state.isFocusInput}
                    >
                        <FormattedMessage id='header.signup-get-voucher'>
                            {(trans) => (
                                <input
                                    type='text'
                                    name='keyword'
                                    placeholder={trans}
                                    autoComplete='off'
                                    value={this.state.searchInputText}
                                    onChange={this.handleOnChangeInput.bind(this)}
                                    onFocus={this.toggleRecentList.bind(this)}
                                    onClick={(event) => event.stopPropagation()}
                                />
                            )}
                        </FormattedMessage>
                    </SearchInput>

                    <button type='submit' form='search_form'>
                        <i className='fa-solid fa-magnifying-glass'></i>
                    </button>

                    {this.state.isFocusInput && <RecentSearchList />}
                </div>

                {this.props.hiddenSubInfo || <TrendingSearchList />}
            </div>
        );
    }
}

export const SearchInput = ({ children, isFocus, handleSubmitForm }) => {
    return (
        <form
            id='search_form'
            action={PATH.SEARCH}
            className={isFocus ? style.input_outline : ''}
            onSubmit={handleSubmitForm}
        >
            {children}
        </form>
    );
};

const RecentSearchList = ({ keywords = ['recently', 'searched', 'keywords'] }) => {
    return (
        <div className={style.recent_search_list}>
            <FormattedMessage id='header.signup-get-voucher'>
                {(trans) => (
                    <Link to={`/search?keyword=${trans}`}>
                        <span>{trans}</span>
                        <img
                            src='https://cf.shopee.vn/file/e92ab33ccea0695b22219c8a152d9f61'
                            height='24'
                        />
                    </Link>
                )}
            </FormattedMessage>

            {keywords.map((keyword, index) => (
                <RecentSearchKeyword keyword={keyword} key={index} />
            ))}
        </div>
    );
};

const RecentSearchKeyword = ({ keyword }) => {
    return (
        <Link to={`/search?keyword=${keyword}`}>
            <span>{keyword}</span>
        </Link>
    );
};

const TrendingSearchList = ({ trendingSearches = ['trending', 'keywords'] }) => {
    return (
        <div className={style['trending_search_list']}>
            {trendingSearches.map((keyword, index) => (
                <Link to={`/search?keyword=${keyword}`} key={index}>
                    {keyword}
                </Link>
            ))}
        </div>
    );
};

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {
        navigate: (path) => dispatch(push(path)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBox);
