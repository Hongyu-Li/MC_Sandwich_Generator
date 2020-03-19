import React, { Component } from 'react';
import InputText from '../Components/InputText';
import { webApi } from '../utils/webApi';
import "./Generator.scss";
import Modal from '../Components/Modal';
import { validateMode, validateLength, validatePrefix, validatePattern } from '../utils/validator';
import {isMobileBrowser} from '../utils/userAgent';


const defaultState = {
    prefix: '争执不断',
    length: '4',
    mode: 'Rhyme',
    rhyme_pattern: 'ABAB',
    output: '',
    loading: false,
    hasError: true,
    // hasModeError: false,
    // hasLengthError: false,
    // hasPatternError: false,
    // hasPrefixError: false,
    // modeErrMsg: '',
    // lengthErrMsg: '',
    // patternErrMsg: '',
    // prefixErrMsg: ''
}

class Genertor extends Component {
    constructor(props) {
        super(props)
        this.state = { ...defaultState }
        this.getGeneratedRap = this.getGeneratedRap.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    validateInput(mode, length, rhyme_pattern, prefix) {
        if (!validateMode(mode) && !validateLength(length)
            && !validatePrefix(prefix) && !validatePattern(mode, length, rhyme_pattern)) {
            this.setState({ hasError: false })
        } else {
            // if (validateMode(mode)){
            //     this.setState({hasModeError: true})
            //     this.setState({modeErrMsg: validateMode(mode)})
            // }
            // if (validateLength(length)){
            //     this.setState({hasLengthError: true})
            //     this.setState({lengthErrMsg: validateLength(length)})
            // }
            // if (validatePattern(mode, length, rhyme_pattern)){
            //     this.setState({hasPatternError: true})
            //     this.setState({patternErrMsg: validatePattern(mode, length, rhyme_pattern)})
            // }
            // if (validatePrefix(prefix)){
            //     this.setState({hasPrefixError: true})
            //     this.setState({prefixErrMsg: validatePrefix(prefix)})
            // }
            const errorMsg = validateMode(mode) || validateLength(length) ||
                validatePattern(mode, length, rhyme_pattern) ||
                validatePrefix(prefix)
            this.setState({ output: '输入错误🙅：' + errorMsg })
        }
    }

    getGeneratedRap() {
        const params = {
            prefix: this.state.prefix,
            length: this.state.length,
            mode: this.state.mode,
            rhyme_pattern: this.state.rhyme_pattern
        }
        this.validateInput(params.mode, params.length, params.rhyme_pattern, params.prefix)
        if (!this.state.hasError) {
            const response = webApi('/api/generate', 'POST', params);
            this.setState({ loading: true }, () => {
                response.then((res) => {
                    if (res.ok) {
                        res.json().then((data) => {
                            // this.setState({ ...defaultState })
                            this.setState({ output: data.data })
                        })
                    } else if (res.status === 400) {
                        // this.setState({ ...defaultState })
                        this.setState({
                            output:
                                '输入好像有错哦！检查看看～'
                        })
                    } else if (res.status === 411) {
                        this.setState({
                            output:
                                '你的条件真的很严格\n\n不如试试I am Lucky模式或者换个开头吧～'
                        })
                    }
                    this.setState({ loading: false })
                })
            })
        }
    }

    handleChange(e) {
        this.setState({ [e.target.id]: e.target.value })
    }

    render() {
        const BUTTON_MENU = !isMobileBrowser() ? 
        [{ value: "Lucky", text: "I'm lucky" },{ value: "Rhyme", text: "Gimme rhyme" }]:
        [{ value: "Lucky", text: "Lucky" },{ value: "Rhyme", text: "Rhyme" }] 
        const LOADING_CONTENT = !isMobileBrowser() ?
        [
            "拿了一个三明治",
            "加入了韵脚调料包",
            "尝了下味道...",
            "觉得有点淡，加点盐～",
            "Yay! 再尝一下～",
            "嗷，这次太咸了！",
            "丢掉，再做一个～"
        ]:
        [
            "Cooking"
        ]
        return (
            <div className='generator-container'>
                <span className='title-left'>MC SANDWICH</span>
                <div className='description-container'>
                    <div className='description-right'>Rap Generator - Thoughtworks出品</div>
                    <div className='description-right'>这里是三明治先生帮你制作嘻哈歌词的地方</div>
                    <div className='description-right'>欢迎调戏～</div>
                </div>

                <div className='main-container'>
                    <section className='input-container'>
                        <span className='block-title'>你想要押韵吗?</span>
                        <div className='mode-container'>
                            {BUTTON_MENU.map((rec) => {
                                let style = rec.value === this.state.mode ?
                                    { backgroundColor: 'whitesmoke', color: 'black' } : { backgroundColor: 'black', color: 'whitesmoke' };
                                return (<button value={rec.value} id='mode'
                                    onClick={(e) => this.handleChange(e)}
                                    style={style}>
                                    {rec.text}
                                </button>)
                            })}
                        </div>
                        <div className="parameter-container">
                            <InputText title='想唱几句呢?' placeholder='请输入生成歌词的句数'
                                value={this.state.length}
                                id='length'
                                handleChange={(e) => this.handleChange(e)} />
                            {this.state.mode === 'Lucky' ?
                                <InputText title='给个韵式呗?' placeholder='比如ABAB,长度要和句数一致哦'
                                    value={this.state.rhyme_pattern}
                                    id='rhyme_pattern'
                                    handleChange={(e) => this.handleChange(e)}
                                    disable={true} /> :
                                <InputText title='给个韵式呗?' placeholder='比如ABAB,长度要和句数一致哦'
                                    value={this.state.rhyme_pattern}
                                    id='rhyme_pattern'
                                    handleChange={(e) => this.handleChange(e)}
                                    disable={false} />
                            }
                            <span className='block-title'>最后一步啦, 给个开头吧:</span>
                            <textarea value={this.state.prefix} onChange={(e) => this.handleChange(e)}
                                id='prefix' rows='5' />
                        </div>
                        <button onClick={this.getGeneratedRap}
                            className='btn-generate'>Generate</button>
                    </section>

                    <section className="output-container">
                        <span className='block-title'>三明治先生为你写的说唱:</span>
                        <textarea id='output-area' value={this.state.output}/>
                    </section>

                    <section className="features-container">
                        <span className='feature-title'>三明治先生的Freestyle</span>
                        <hr/>
                        <button className='btn-features'>
                            <a href='https://github.com/Hongyu-Li/RapGenerator_GPT2' 
                                style={{textDecoration: "none",color: "black"}}>
                                关于三明治先生的更多秘密
                            </a>
                        </button>
                        <button className='btn-features-disable'>分享帮助三明治先生出道</button>
                        <button className='btn-features-disable'>有请谷歌小姐登台演唱</button>
                        <button className='btn-features-disable'>等待开发</button>
                    </section>
                </div>
                {this.state.loading ? <Modal content={LOADING_CONTENT} /> : null}
                <footer className='footer'>&copy; Background Photo by Matthew Henry on Unsplash</footer>
            </div>
        )
    }
}

export default Genertor;