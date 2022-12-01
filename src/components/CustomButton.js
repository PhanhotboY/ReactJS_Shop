import { Component } from 'react';
import { FormattedMessage } from 'react-intl';

import './CustomButton.scss';

class CustomButton extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <button className='custom_button' onClick={this.props.onClickHandler}>
                <FormattedMessage id={this.props.action} />
            </button>
        );
    }
}

export default CustomButton;
