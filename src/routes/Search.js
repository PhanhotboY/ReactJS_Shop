import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';

import SearchPage from 'containers/SearchPage';

class Search extends Component {
    constructor(props) {
        super(props);
    }

    async componentDidMount() {
        const header = document.querySelector('header');
        header.style.position = 'relative';
    }

    componentWillUnmount() {
        const header = document.querySelector('header');
        header.style.position = '';
    }

    render() {
        return (
            <div className='user-container grid'>
                <Switch>
                    <Route path='/search' exact component={SearchPage} />

                    <Route
                        component={() => {
                            return <Redirect to='/' />;
                        }}
                    />
                </Switch>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
