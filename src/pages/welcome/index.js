import './style.css'

import Img from 'assets/avatar-marek-wasyluk.png'
import React from 'react'

const WelcomePage = () => {
    return (
        <div className='welcome-page'>
            <div className='welcome-section'>
                <div className='image-con'>
                    <img alt="Marek Wasyluk" src={Img}></img>
                </div>
                <div className='text-con'>
                    <span style={{ fontSize: '1.2em', fontWeight: '500' }}>Cześć, :user_firstName:,</span><br />
                    nazywam się Marek Wasyluk i jestem autorem tej strony. W pierwszej kolejności pragnę powitać Cię w społeczności
                    <span style={{ fontSize: '1.1em', fontWeight: '500' }}> OuRoom!</span> 🤗 <br />
                    Chciałbym również ostrzec Cię przed zagrożeniami. Strona nie jest jeszcze zabezpieczona w pełni możliwości.
                    Nie musisz martwić się o swoje hasło czy adres e-mail, natomiast treści wysyłane przez użytkowników to zupełnie inna historia... <br />
                    Serwer nie jest aktualnie zdolny do wykrycia potencjalnie niebezpiecznych linków, niecenzuralnych treści, czy przeciwdziałać wewnętrznemu spamowi. <br />
                    Będę Ci bardzo wdzięczny za informacje o wszelkich naruszeniach i błędach w samej aplikacji. <br />
                    <span style={{ fontWeight: '500' }}>Witaj na pokładzie! Teraz jesteś jednym z nas</span> 👨‍👩‍👦🥳
                </div>
            </div>
            <div className='cookies-section'>
                <div className='text-con'>
                    Aby aplikacja mogła sprawnie działać w twojej przeglądarce musisz zaakceptować poniższe zgody:
                </div>
                <div className='consents-con'>
                    <div className='consent'>
                        <input id='consent1' type='checkbox'></input><label htmlFor='consent1'>Wyrażam zgodę na ... ciasteczkacias teczkaciaste czkaciasteczka ciasteczka ciasteczka ciasteczkaciasteczka ciasteczka ciasteczka ciasteczka</label>
                    </div>
                </div>
                <div className='confirm-con'>
                    <button className='our-button' onClick={() => console.log("Confirmation button pressed")}>Zatwierdź</button>
                </div>
            </div>
            <div className='footer'>
                Zapraszam Cię rówież do zajrzenia na mojego bloga 👉 <a target='_blank' rel="noreferrer" style={{ color: '#ccc' }} href='https://www.mwasyluk.pl'>MWasyluk.pl</a>
            </div>
        </div >
    )
}

export default WelcomePage;