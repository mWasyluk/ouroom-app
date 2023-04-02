import './CenterBand.css'

const CenterBand = (props) => {
    const {
        header,
        center,
        footer
    } = props;


    return (
        <div className='center-band'>
            <div className='band-content'>
                {header && <div className='header-group'>{header}</div>}
                {center && <div className='center-group'>{center}</div>}
                {footer && <div className='footer-group'>{footer}</div>}
            </div>
        </div>
    )
}

export default CenterBand;