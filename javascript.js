  const hamburger = document.querySelector(".hamburger");
const mobileMenu = document.querySelector(".navbar_mobile");
const kategoriBtn = document.querySelector(".navbar_mobile .dropdown-button");
const dropdown = document.querySelector(".navbar_mobile .dropdown-content");

/*kategorilere basınca divi açıyor ürün seçenekleri alt alta diziliyor .
active classını toggle eder varsa kaldırır yoksa ekler
*/
kategoriBtn.addEventListener("click", function(){
    dropdown.classList.toggle("active");
});

/*hamburger menüye basınca yan menü açılıp kapanır,active ve no_scroll sınıfları aktifleşip pasifleşir,no_scroll sadece body nin kaymasını engeller */
hamburger.addEventListener("click", function(){
   mobileMenu.classList.toggle("active");
   document.body.classList.toggle("no_scroll");
});



const cards = document.querySelectorAll(
  ".card1_container, .card2_container, .card3_container"
);

cards.forEach(card => {
  card.addEventListener("click", function() {

    //kartların herhangi birine tıklayınca diğer açık kartları kapatır 
    cards.forEach(c => {
      if(c !== card){
        c.classList.remove("active");
      }
    });

    // tıklanan kartı aç / kapa
    card.classList.toggle("active");
  });
});