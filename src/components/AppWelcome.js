import { appTitle } from '../Root'

const AppWelcome = () => {
    const style = {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center'
    }

    return (
        <div style={style}>
            <h2 style={{ color: '#3340d9' }}>Witaj w aplikacji <strong>{appTitle}!</strong></h2>
            <span style={{ fontSize: '1.2em' }}>Funkcje, które są aktualnie dostępne to:</span>
            <ul style={{ fontSize: '1.1em' }}>
                <li>Tworzenie nowych konwersacji</li>
                <li>Dodawanie uczestników do konwersacji</li>
                <li>Wysyłanie wiadomości</li>
                <li>Odbieranie nowych wiadomości w czasie rzeczywistym</li>
            </ul>
        </div>
    )
}

export default AppWelcome;