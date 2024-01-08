// Arayüz işlemlerini ve html'den aldığımız elemaları
// çağırıdğımız dosya

//! HTML'den çağrılan elemanlar
export const ele = {
    menu: document.querySelector('#menu'),
    nav: document.querySelector('nav'),
    mailsArea: document.querySelector('.mails'),
    modal: document.querySelector('.modal-wrapper'),
    createBtn: document.querySelector('.create'),
    closeBtn: document.querySelector('.close-modal'),
    modalForm: document.querySelector('.modal'),
  };
  
  //! ekrana mailleri basar
  // mailData: ekrana basılacak olan mailler
  export const renderMails = (mailData) => {
    // mailData dizisidneki her bir mail için bir
    // mail html'i oluştur ve mail_html dizisine aktar
    const mail_html = mailData.map((mail) => {
      return `
            <div class="mail"  data-id="${mail.id}">
              <div class="info">
                <input type="checkbox" />
                <i id="star" class="bi ${
                  mail.isStared ? 'bi-star-fill' : 'bi-star'
                }"></i>
                <b>${mail.sender}</b>
              </div>
  
              <div class="content">
                <p class="title">${mail.title}</p>
                <p class="desc">
                  ${mail.message}
                </p>
              </div>
  
              <p class="time">${mail.date}</p>
             
              <div id="button-wrapper">
                <button id="delete">Sil</button>
              </div>
            </div>
    `;
    });
  
    // join > dizi olarak tanımlanmış olan
    // html değişkenini stringe çevirdi
    // html deki mail alanına oluştuduğumuz strngi gönderme
    ele.mailsArea.innerHTML = mail_html.join(' ');
  };
  
  // ! modalı göster gizle
  // aldığı parametre true ise modal'I gösteriri false ise gizler
  export const toggleModal = (willOpen) => {
    // will open değeri true ise dispaly grid değilse none yapıcaz
    ele.modal.style.display = willOpen === true ? 'grid' : 'none';
  };