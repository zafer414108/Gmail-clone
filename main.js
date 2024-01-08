import mailData from "./scripts/constants.js";
import { ele, renderMails, toggleModal } from "./scripts/ui.js";

// 1- navbar için acılma ve kapanma özelliği
// hamburger menusune tıklanma olayını izle
// tıklanınca nav menusune hide classı ekle.
// zaten kapalıysa hide classını kaldır

ele.menu.addEventListener("click", () => {
  ele.nav.classList.toggle("hide");
});

// 2 - listeleme özelliği
// kullanıcı projeye girme anında mailleri listelicez
//DOMContentLoaded tarayaıcıdaki htmlnin yuklenmesinin bitmesi

document.addEventListener("DOMContentLoaded", () => {
  renderMails(mailData);
});

if (window.innerWidth < 1200) {
  ele.nav.classList.add("hide");
}
// 3) Modal Açma Kapama
// - Oluştur butonuna tıklanınca modal'ı göster (display:grid)
// - X butonuna veya dışarıya tıklanınca modal'ı kapat (display:none)
ele.createBtn.addEventListener("click", () => toggleModal(true));
ele.closeBtn.addEventListener("click", () => toggleModal(false));

ele.modal.addEventListener("click", (e) => {
  // eğerki tıklanılan elemanın class'ında modal-wrapper varsa
  if (e.target.classList.contains("modal-wrapper")) {
    toggleModal(false);
  }
});

// 4) Mail Atma Özelliği
// açılan modaldaki formun gönderilme olayını izlyicez
// eğer bütün inpular doluysa yeni mail oluştur
// değilse kullanıcıya uyarı ver
ele.modalForm.addEventListener("submit", (e) => {
  // sayfayı yenilemeyi engelle
  e.preventDefault();

  // formdaki inputların verilerine erişme
  const receiver = e.target[1].value;
  const title = e.target[2].value;
  const message = e.target[3].value;

  // eğerki inputlar boşsa uyarı gönder
  if (!receiver || !title || !message) {
    alert("Lütfen bütün alanları doldurun");
  } else {
    // diziye eklemek için mail objesi oluştur
    const newMail = {
      id: new Date().getTime(),
      sender: "Ayse",
      receiver: receiver,
      title: title,
      message: message,
      date: "12 Aralık",
    };

    // yeni maili mailler dizisine ekledik
    mailData.unshift(newMail);

    // mailler disinin son halini local-storege'a kaydettik
    localStorage.setItem("mails", JSON.stringify(mailData));

    // mailler disinin son halini ekrana bastık
    renderMails(mailData);

    // modalı kapat
    toggleModal(false);
  }
});
// 5) Mail Silme Özeilliği
const handleClick = (e) => {
  const mail = e.target.closest(".mail");
  const mailId = mail.dataset.id;

  // tıklanılan elemanın ids'si delete ise maili sil
  if (e.target.id === "delete" && confirm("Maili silmek istiyor musnuz ?")) {
    // id'si siliceğimiz elemana eşit olamayan elemaları filtrele
    const updatedMailData = mailData.filter(
      (mail) => mail.id !== Number(mailId)
    );

    // lokali güncelle
    localStorage.setItem("mails", JSON.stringify(updatedMailData));

    // mail'i html'den kaldır
    mail.remove();

    // mailData değişkenini güncelle
    mailData = updatedMailData;
  }

  // tıklanılan eleman yıldız ise maili like'la
  if (e.target.id === "star") {
    // 1) id'sini bildiğimiz mail'in bütün bilgilerini al
    const found = mailData.find((item) => item.id === Number(mailId));

    // 2) objenin is_stared "yıldızlı" değerini tersine çevir
    found.isStared = !found.isStared;

    // 4) local'storage'ı güncelle
    localStorage.setItem("mails", JSON.stringify(mailData));

    // 5) arayüzü güncelle
    renderMails(mailData);
  }
};

ele.mailsArea.addEventListener("click", handleClick);

// 6) Navigasyon Menüsü Aktifliği
ele.nav.addEventListener("click", (e) => {
  // eğerki ikinci categorye yani "yıldızlı" kategoorisine tıklanırsa
  if (e.target.id === "cat2") {
    // dizi içerisnden sadece yıldı olanları al ve ekrana bas
    const filtred = mailData.filter((mail) => mail.isStared === true);
    renderMails(filtred);
  } else {
    // bütün diziyi ekrena bas
    renderMails(mailData);
  }
});