import React from 'react';
import './index.scss';

const InputText = (props) => {
    const { disable } = props;
    return (
        <div className="text-container">
            <label>{props.title}</label>
            {disable ?
                <input type="text" defaultValue='Lucky模式下就不用给格式啦～'
                    value='Lucky模式下就不用给格式啦～' id={props.id} disabled style={{backgroundColor:'grey'}}/> :
                <input type="text" placeholder={props.placeholder}
                    value={props.value} onChange={props.handleChange}
                    id={props.id}/>
            }
        </div>
    )
}

export default InputText;