import '../css/bootstrap.css'
import Notiflix from 'notiflix'

      Notiflix.Confirm.init({
        className: 'notiflix-confirm',
        width: '20rem',
        zindex: 4003,
        position: 'top',
        distance: '0rem',
        backgroundColor: '#F3F7FF',
        borderRadius: '10px',
        backOverlay: true,
        backOverlayColor: 'rgba(0,0,0,0.5)',
        rtl: false,
        fontFamily: 'inter',
        cssAnimation: true,
        cssAnimationDuration: 300,
        cssAnimationStyle: 'fade',
        plainText: true,
        titleColor: '#000000',
        titleFontSize: '1.2rem',
        titleMaxLength: 34,
        messageColor: '#000000',
        messageFontSize: '1rem',
        messageMaxLength: 110,
        buttonsFontSize: '1rem',
        buttonsMaxLength: 34,
        okButtonColor: '#ffffff',
        okButtonBackground: '#4B82FB',
        cancelButtonColor: '#000000',
        cancelButtonBackground: '#ffffff',
      })


