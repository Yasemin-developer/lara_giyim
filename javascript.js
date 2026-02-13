
const hamburger = document.querySelector(".hamburger");
const mobileMenu = document.querySelector(".navbar_mobile");
const kategoriBtn = document.querySelector(".navbar_mobile .dropdown-button");
const dropdown = document.querySelector(".navbar_mobile .dropdown-content");

/*kategorilere basınca divi açıyor ürün seçenekleri alt alta diziliyor .
active classını toggle eder varsa kaldırır yoksa ekler
*/
  if(kategoriBtn){
    kategoriBtn.addEventListener("click", function(){
    dropdown.classList.toggle("active");
});
  }

/*hamburger menüye basınca yan menü açılıp kapanır,active ve no_scroll sınıfları aktifleşip pasifleşir,no_scroll sadece body nin kaymasını engeller */
 if(hamburger){
  hamburger.addEventListener("click", function(){
   mobileMenu.classList.toggle("active");
   document.body.classList.toggle("no_scroll");
});
 }



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

/*************************************************** */



const paketBilgileri = {
   temel:{
      ad:"Temel Paket",
      ozellikler:["1 T-shirt","1 Pantalon","1 Kazak"],
      max_urun:{tshirt:1,pantalon:1,kazak:1,aksesuar:0,ayakkabı:0,
        ceket:0
      }
   },
   stil_sahibi:{
      ad:"Stil Sahibi",
      ozellikler:["2 T-shirt","1 Pantalon","2 Kazak"],
      max_urun:{tshirt:2,pantalon:1,kazak:2,aksesuar:2,ayakkabı:1,
        ceket:0
      }
   },
   premium:{
    ad:"Premium",
    ozellikler:["sınırsız T-shirt","sınırsız Pantalon","sınırsız Kazak","sınırsız Aksesuar","sınırsız Ayakkabı","sınırsız Ceket"],
     max_urun:{tshirt:Infinity,pantalon:Infinity,kazak:Infinity,aksesuar:Infinity,ayakkabı:Infinity,
        ceket:Infinity
      }
   }
}


/*********************************************** */

let checkboxlar=document.querySelectorAll('input[type="checkbox"]')
let urun_adeti=document.querySelector('input[type="number"]')

//tıklanan chekcboxlar hesapla fonksiyonuna gönderiliyor
checkboxlar.forEach((box)=>{
  box.addEventListener('change',hesapla)
})

//tıklanan inputlar hesapla fonksiyonuna gönderiliyor
document.querySelectorAll('input[type="number"]').forEach(inp=>{
    inp.addEventListener('input', hesapla)
})


//seçilen ürün ve ürün adedine göre fiyatı hesplıyor
function hesapla(){

    let toplam = 0;

    checkboxlar.forEach(box=>{

        if(box.checked){

            let fiyat = Number(box.dataset.price)

            let urun = box.nextElementSibling
            let adet = Number(
                urun.querySelector('input[type="number"]').value
            )

            toplam += fiyat * adet
        }

    })

    document.querySelector('.cbfiyat h1:last-child').textContent =
    toplam + " TL"
}
