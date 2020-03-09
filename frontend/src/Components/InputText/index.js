import React from 'react';
import './index.scss';

const InputText = (props) => {
    const { disable } = props;
    return (
        <div className="text-container">
            <label>{props.title}</label>
            {disable ?
                <input type="text" placeholder='Lucky模式下就不用给格式啦～'
                    value={props.value} id={props.id} disabled/> :
                <input type="text" placeholder={props.placeholder}
                    value={props.value} onChange={props.handleChange}
                    id={props.id}/>
            }
        </div>
    )
}

export default InputText;