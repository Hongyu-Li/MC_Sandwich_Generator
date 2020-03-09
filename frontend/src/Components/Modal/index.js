import React, { Component } from 'react';
import './index.scss';
import sandwich from '../../images/sandwich_loading.png';

class Modal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loadingText: props.content[0]
        }
        let idx = 1;
        this.timeId = setInterval(() => {
            this.setState({ loadingText: props.content[idx % props.content.length] })
            idx += 1
        }, 1000)
    }

    componentWillUnmount() {
        clearInterval(this.timeId)
    }

    render() {
        return (
            <div className="mask">
                <div className='custom-modal'>
                    <img src={sandwich} alt="MC SANDWICH" className='loading-img'/>
                    {this.state.loadingText}
                </div>
            </div>
        )
    }
}

export default Modal;