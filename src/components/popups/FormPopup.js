import '../../styles/popup.css'

const FormPopup = (props = {
    outsideBg: true, insideBg: true,
    onClickBg: () => { },
    onSubmit: () => { }
}) => {
    const outsideOpacity = props.outsideBg.opacity || props.outsideBg.opacity === 0
        ? props.outsideBg.opacity
        : 0.7;
    const outsideStyle = {
        backgroundColor: 'rgba(0, 0, 0, ' + outsideOpacity + ')'
    }
    const bg = <div className='popup-background' style={outsideStyle} onClick={props.onClickBg}></div>

    const insideOpacity = props.insideBg.opacity || props.insideBg.opacity === 0
        ? props.insideBg.opacity
        : 0.7;
    const insideStyle = {
        backgroundColor: 'rgba(255, 255, 255, ' + insideOpacity + ')'
    }

    return (
        <div className={"popup"} >
            {props.outsideBg && bg}
            <form className='popup-content' style={insideStyle} onSubmit={props.onSubmit}>
                {props.children}
            </form>
        </div>
    )
}

export default FormPopup;