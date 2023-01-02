import '../../styles/popup.css'

const FormPopup = (props) => {
    const {
        outsideBg = { opacity: 0 },
        insideBg = { opacity: 0 },
        onClickBg = () => { },
        onSubmit = () => { },
        children = []
    } = props;

    const outsideOpacity = outsideBg.opacity >= 0 && outsideBg.opacity <= 1
        ? outsideBg.opacity
        : 0.7;
    const outsideStyle = {
        backgroundColor: 'rgba(0, 0, 0, ' + outsideOpacity + ')'
    }
    const bg = <div className='popup-background' style={outsideStyle} onClick={onClickBg}></div>

    const insideOpacity = insideBg.opacity >= 0 && insideBg.opacity <= 1
        ? insideBg.opacity
        : 0.7;
    const insideStyle = {
        backgroundColor: 'rgba(255, 255, 255, ' + insideOpacity + ')'
    }

    return (
        <div className={"popup"} >
            {outsideBg && bg}
            <form className='popup-content' style={insideStyle} onSubmit={onSubmit}>
                {children}
            </form>
        </div>
    )
}

export default FormPopup;