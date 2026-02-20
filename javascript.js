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






/*********************************************** */

let checkboxlar=document.querySelectorAll('input[type="checkbox"]')


//tıklanan chekcboxlar hesapla fonksiyonuna gönderiliyor
checkboxlar.forEach((box)=>{
  box.addEventListener('change',hesapla)
})

//tıklanan inputlar hesapla fonksiyonuna gönderiliyor
document.querySelectorAll('input[type="number"]').forEach(inp=>{
    inp.addEventListener('input', hesapla)
})


//seçilen ürün ve ürün adedine göre fiyatı hesaplıyor
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

/***************************************************** */


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

  let suankiurunadedi={
    tshirt:0,
    pantalon:0,
    kazak:0,
    aksesuar:0,
    ayakkabı:0,
    ceket:0
  }
  
  let sepettekiUrunler=[]  // Ürünleri array'de saklayacağız


  const kartlar=document.querySelectorAll('.card,.card-popular')
   
  

  let secilenkart=null
  let secilenPaket=null
   let secilenpaketbilgileri=null

    const paketsecmebtn=document.querySelectorAll('.card-footer .btn')
    
  const kazak_container=document.querySelector('.kazak_container')
  const tshirt_container=document.querySelector('.tshirt_container')
  const pantalon_container=document.querySelector('.pantalon_container')
  const aksesuar_container=document.querySelector('.ak_container')
  const ayakkabı_container=document.querySelector('.ay_container')
  const ceket_container=document.querySelector('.ceket_container')  

    const uruncontainerleri=[
      tshirt_container,
      pantalon_container,
      kazak_container,
      aksesuar_container,
      ayakkabı_container,
      ceket_container
    ]
    
    
  const sepetcontainer=document.querySelector('.sepetcontainer') 
  const uruncontainer=document.querySelector('.uruncontainer')
  const fotocontainer=document.querySelector('.fotocontainer')
  const urunfoto=document.querySelector('.urunfoto')
  const urunaciklama=document.querySelector('.urunaciklama')

const fiyatkutu=document.querySelector('.fiyatkutu')
let toplamtutarcontainer=document.querySelector('.toplamtutarcontainer')
let toplamtutar=0

let mode_toggle_btn=document.querySelector('#mode-toggle')
let mode=false

mode_toggle_btn.addEventListener('click',()=>{
   document.body.classList.toggle('dark-mode')
   mode=document.body.classList.contains('dark-mode')
  localStorage.setItem('darkMode',mode)
})

   /* sayfa yüklendiğinde kaydedilen verileri geri yükler */
  function kaydedilenverileriYukle(){
   
    //mode'u restore et
    mode=JSON.parse(localStorage.getItem('darkMode') || "false")
    if(mode){
      document.body.classList.add('dark-mode')
    }else{
      document.body.classList.remove('dark-mode')
    }
      

    // Paket ve kart seçimlerini restore et
     secilenPaket=JSON.parse(localStorage.getItem('secilenPaket') || 'null')

     secilenkart=JSON.parse(localStorage.getItem('secilenkart') || 'null')

    
     if(secilenPaket){
       secilenpaketbilgileri=paketBilgileri[secilenPaket]
     }

     const suankiurunadedi=JSON.parse(localStorage.getItem('suankiurunadedi') || "0")

     toplamtutar=JSON.parse(localStorage.getItem('toplamtutar') || "0")

   // Sepet ürünlerini restore et
  const sepeturunleri=JSON.parse(localStorage.getItem('sepettekiUrunler') || '[]')

   if(sepeturunleri.length>0 && sepetcontainer){
    sepettekiUrunler=sepeturunleri
    sepetcontainer.innerHTML='' // Önceki içeriği temizle 
    
    // Her ürün için container oluştur ve sepete ekle
    sepettekiUrunler.forEach((urun)=>{
      const yenifoto=document.createElement('img')
      const yeniaciklama=document.createElement('div')
      const yenifotocontainer=document.createElement('div')
      const yeniuruncontainer=document.createElement('div')
      
      yenifoto.classList.add('urunfoto')
      yeniaciklama.classList.add('urunaciklama')
      yenifotocontainer.classList.add('fotocontainer')
      yeniuruncontainer.classList.add('uruncontainer')
    
      yenifoto.src=urun["foto"]
   
      yeniaciklama.innerHTML=`
       <h1>${urun["ad"]}</h1>
       <h2 class="tutargoster">${urun["fiyat"]*urun["adet"]} TL</h2>
      `

       //her ürün için sayaç oluştur
     const yeniSayacContainer=document.createElement('div')
     const arttirBtn=document.createElement('button')
     const azaltBtn=document.createElement('button')
     const sayac=document.createElement('div')
     yeniSayacContainer.classList.add('sayaccontainer')
    arttirBtn.classList.add('arttir')
    azaltBtn.classList.add('azalt')
    sayac.classList.add('sayac')  
    arttirBtn.textContent="+"
    azaltBtn.textContent="-"
    sayac.textContent=urun["adet"]
    yeniSayacContainer.appendChild(azaltBtn)
    yeniSayacContainer.appendChild(sayac)
    yeniSayacContainer.appendChild(arttirBtn)
   yeniuruncontainer.appendChild(yeniSayacContainer)

      yenifotocontainer.appendChild(yenifoto)
      yeniuruncontainer.appendChild(yenifotocontainer)
      yeniuruncontainer.appendChild(yeniaciklama)
      
      

     arttirBtn.addEventListener('click',()=>{
        const urunKategorisi =urun["ad"].toLowerCase()
        // Paket bilgilerini her tıklamada yeniden yükle
        const aktifPaket = JSON.parse(localStorage.getItem('secilenPaket') || 'null')
        const aktifPaketBilgileri = paketBilgileri[aktifPaket]
        
        if(aktifPaketBilgileri && suankiurunadedi[urunKategorisi]<aktifPaketBilgileri.max_urun[urunKategorisi]){
          sayac.textContent=Number(sayac.textContent)+1
          suankiurunadedi[urunKategorisi]++ //kategoriye göre adet artır
          urun.adet++ //ürün bilgisindeki adeti de artır
          
          // Toplam fiyatı güncelle
          yeniaciklama.querySelector('.tutargoster').innerHTML=`${urun["fiyat"]*urun["adet"]} TL`
          
          localStorage.setItem('suankiurunadedi',JSON.stringify(suankiurunadedi))
          localStorage.setItem('sepettekiUrunler',JSON.stringify(sepettekiUrunler))

          tutarhesapla() // Her artırma işleminden sonra toplam tutarı güncelle
           localStorage.setItem('toplamtutar',JSON.stringify(toplamtutar))
        }else{
          alert(`Bu pakette maksimum ${aktifPaketBilgileri.max_urun[urunKategorisi]} adet ${urun.ad} ekleyebilirsiniz!`)
        }
     })


      // Azalt butonuna tıklandığında ürün adedini azaltır, adet 0 olursa ürünü sepetten kaldırır
     azaltBtn.addEventListener('click',()=>{
        if(Number(sayac.textContent)>=1){
          const urunKategorisi =  urun.ad.toLowerCase()
          sayac.textContent=Number(sayac.textContent)-1
          suankiurunadedi[urunKategorisi]--
          urun.adet--
          
          // Toplam fiyatı güncelle
          if(urun.adet > 0){
            yeniaciklama.querySelector('.tutargoster').innerHTML=` ${urun["fiyat"]*urun["adet"]} TL`
          }
          
          if(urun.adet === 0){
            sepetcontainer.removeChild(yeniuruncontainer)
            const urunIndex=sepettekiUrunler.findIndex((u)=> u.id===urun.id)
           if(urunIndex !== -1){
             sepettekiUrunler.splice(urunIndex,1)
           }
          }
          localStorage.setItem('suankiurunadedi',JSON.stringify(suankiurunadedi))
          localStorage.setItem('sepettekiUrunler',JSON.stringify(sepettekiUrunler)) 

          tutarhesapla() // Her azaltma işleminden sonra toplam tutarı güncelle
           localStorage.setItem('toplamtutar',JSON.stringify(toplamtutar))
        }
     })

      sepetcontainer.appendChild(yeniuruncontainer)
    })

    sepetcontainer.style.visibility="visible"
   }
     
     // Seçili kartı restore et 
     if(secilenPaket && kartlar.length > 0){
      kartlar.forEach(kart=>{
        const kartpaket=kart.querySelector('button').dataset.paket
        if(kartpaket === secilenPaket){
          kart.classList.add('selected')
          kart.style.opacity="1"
        }else{
          kart.style.opacity="0.5"
          kart.classList.remove('selected')
        }
      })
     }
     tutarhesapla()
}






 function paketsec(e){
      kaydedilenverileriYukle()
     
      
   for(let urun in suankiurunadedi){
    suankiurunadedi[urun]=0
   }

     secilenPaket=e.target.dataset.paket
     secilenpaketbilgileri=paketBilgileri[secilenPaket]
    if(secilenPaket==="stil_sahibi"){
      secilenkart=e.target.closest('.card-popular')
      console.log(secilenPaket)
    }else{
      secilenkart=e.target.closest('.card')
       console.log(secilenPaket)
    }

    kartlar.forEach(kart=>{
      if(kart===secilenkart){
        kart.classList.add('selected')
        kart.style.opacity="1"
      }else{
         kart.style.opacity="0.5"
        kart.classList.remove('selected')
       
      }
    })
  
     localStorage.setItem('secilenPaket',JSON.stringify(secilenPaket))

     localStorage.setItem('secilenkart',JSON.stringify(secilenkart))
     
     // Yeni paket seçilince sepeti temizle
     sepettekiUrunler=[]

     localStorage.setItem('suankiurunadedi',JSON.stringify(suankiurunadedi))
     localStorage.setItem('sepettekiUrunler',JSON.stringify(sepettekiUrunler))

     
     if(sepetcontainer){
       sepetcontainer.innerHTML=''
       sepetcontainer.style.visibility="hidden"
     }

     tutarhesapla() // Paket seçildikten sonra toplam tutarı güncelle
    localStorage.setItem('toplamtutar',JSON.stringify(toplamtutar))

  }

   

  function sepeteEkle(e){

      kaydedilenverileriYukle()

    // Paket bilgilerini ve eski ürünleri yükle
    secilenPaket=JSON.parse(localStorage.getItem('secilenPaket') || 'null')
    if(secilenPaket){
      secilenpaketbilgileri=paketBilgileri[secilenPaket]
    }
    const suankiurunadedi=JSON.parse(localStorage.getItem('suankiurunadedi') || "0")
    
    

    // Eski ürünleri yükle
    const eskiUrunler=JSON.parse(localStorage.getItem('sepettekiUrunler') || '[]')
    if(eskiUrunler.length > 0){
      sepettekiUrunler=eskiUrunler
    }








    if(!secilenpaketbilgileri){
      alert("Lütfen önce bir paket seçiniz!")
      return;
    }

   const sepeteeklebtn=e.target.closest('button')
   if(!sepeteeklebtn) return;

   const urunadi=sepeteeklebtn.dataset.productname
   const max_urunadedi=secilenpaketbilgileri["max_urun"][urunadi]
   const urunid=sepeteeklebtn.dataset.id

   if(suankiurunadedi[urunadi]<max_urunadedi){
     // Bu ürün sepette var mı kontrol et
     const mevcutUrun = sepettekiUrunler.find(u => u.id === urunid)
     
     if(mevcutUrun){
       // Ürün zaten sepette, adet artır
       mevcutUrun.adet++
       alert(`${mevcutUrun.ad} adedi artırıldı! Toplam: ${mevcutUrun.adet}`)
       
       // localStorage güncelle
       localStorage.setItem('sepettekiUrunler',JSON.stringify(sepettekiUrunler))
       suankiurunadedi[urunadi]++
       localStorage.setItem('suankiurunadedi',JSON.stringify(suankiurunadedi))
       return
     }

     // Yeni ürün ekle
     const sepeteeklenecekurun=sepeteeklebtn.closest('div')
     
     const yeniuruncontainer=document.createElement('div')
     yeniuruncontainer.classList.add('uruncontainer')
     
     const yeniFotoContainer=document.createElement('div')
     yeniFotoContainer.classList.add('fotocontainer')
     
     const yeniurunfoto=document.createElement('img')
     yeniurunfoto.classList.add('urunfoto')
     yeniurunfoto.src=sepeteeklenecekurun.querySelector('img').src

     // Sayaç oluştur
     const yeniSayacContainer=document.createElement('div')
     const arttirBtn=document.createElement('button')
     const azaltBtn=document.createElement('button')
     const sayac=document.createElement('div')
     yeniSayacContainer.classList.add('sayaccontainer')
     arttirBtn.classList.add('arttir')
     azaltBtn.classList.add('azalt')
     sayac.classList.add('sayac')  
     arttirBtn.textContent="+"
     azaltBtn.textContent="-"
     sayac.textContent="1"  // İlk eklendiğinde adet 1
     yeniSayacContainer.appendChild(azaltBtn)
     yeniSayacContainer.appendChild(sayac)
     yeniSayacContainer.appendChild(arttirBtn)
     yeniuruncontainer.appendChild(yeniSayacContainer)

     yeniFotoContainer.appendChild(yeniurunfoto)
     
  
     const yeniurunaciklama=document.createElement('div')
     yeniurunaciklama.classList.add('urunaciklama')
     yeniurunaciklama.innerHTML=`
      <h1>${sepeteeklebtn.dataset.productname.toUpperCase()}</h1>
      <h2 class="tutargoster">${sepeteeklebtn.dataset.price} TL</h2>
     `
     
      yeniuruncontainer.appendChild(yeniFotoContainer)
      yeniuruncontainer.appendChild(yeniurunaciklama)
      
      // Ürün bilgisini oluştur
      const urunBilgisi={
        ad:sepeteeklebtn.dataset.productname.toUpperCase(),
        fiyat:sepeteeklebtn.dataset.price,
        foto:sepeteeklenecekurun.querySelector('img').src,
        id:urunid,
        adet:1  // İlk eklendiğinde 1
      }
      
     
      arttirBtn.addEventListener('click',()=>{
        if(suankiurunadedi[urunadi]<max_urunadedi){
          sayac.textContent=Number(sayac.textContent)+1
          suankiurunadedi[urunadi]++
          
          // Array'deki ürünü bul ve güncelle
          const urunIndex = sepettekiUrunler.findIndex(u => u.id === urunid)
          if(urunIndex !== -1){
            sepettekiUrunler[urunIndex].adet++
          }
          
          // Toplam fiyatı güncelle
          const yeniAdet = Number(sayac.textContent)
          const birimFiyat = Number(sepeteeklebtn.dataset.price)
          yeniurunaciklama.querySelector('.tutargoster').innerHTML = `${birimFiyat * yeniAdet} TL`
          
          localStorage.setItem('suankiurunadedi',JSON.stringify(suankiurunadedi))
          localStorage.setItem('sepettekiUrunler',JSON.stringify(sepettekiUrunler))

          tutarhesapla() // Her artırma işleminden sonra toplam tutarı güncelle
           localStorage.setItem('toplamtutar',JSON.stringify(toplamtutar))
        }
      })

      azaltBtn.addEventListener('click',()=>{
          const urunIndex = sepettekiUrunler.findIndex(u => u.id === urunid)

        if(Number(sayac.textContent)>=1){
          sayac.textContent=Number(sayac.textContent)-1
          suankiurunadedi[urunadi]--
          
          // Array'deki ürünü bul ve güncelle
        
          if(urunIndex !== -1){
            sepettekiUrunler[urunIndex].adet--
          }
          
          // Toplam fiyatı güncelle
          const yeniAdet = Number(sayac.textContent)
          const birimFiyat = Number(sepeteeklebtn.dataset.price)
          yeniurunaciklama.querySelector('.tutargoster').innerHTML = `${birimFiyat * yeniAdet} TL`
        
            if(sepettekiUrunler[urunIndex].adet === 0){
            sepetcontainer.removeChild(yeniuruncontainer) // Ve görsel olarak da kaldır
             sepettekiUrunler.splice(urunIndex,1) // Ürün adeti 0 ise array'den çıkar
          }
          
          localStorage.setItem('suankiurunadedi',JSON.stringify(suankiurunadedi))
          localStorage.setItem('sepettekiUrunler',JSON.stringify(sepettekiUrunler))

          tutarhesapla()
           localStorage.setItem('toplamtutar',JSON.stringify(toplamtutar))
        }
      })

      sepettekiUrunler.push(urunBilgisi)
      localStorage.setItem('sepettekiUrunler',JSON.stringify(sepettekiUrunler))
      
      if(sepetcontainer){
        sepetcontainer.appendChild(yeniuruncontainer)
        sepetcontainer.style.visibility="visible"
      }else{
        alert('Ürün sepete eklendi! Sepet sayfasını ziyaret et.')
      }
      suankiurunadedi[urunadi]++

   }else{

    alert(`Bu pakette en fazla ${max_urunadedi} adet ${urunadi} seçebilirsiniz.`)
   }

   localStorage.setItem('suankiurunadedi',JSON.stringify(suankiurunadedi))
   localStorage.setItem('sepettekiUrunler',JSON.stringify(sepettekiUrunler))

   tutarhesapla() // Ürün sepete eklendikten sonra toplam tutarı güncelle
   localStorage.setItem('toplamtutar',JSON.stringify(toplamtutar))
  }



 // Paket seçme butonlarına tıklandığında paketsec fonksiyonunu çağırır
 paketsecmebtn.forEach(btn=>{
  btn.addEventListener('click',paketsec)
 })

 // Ürün ekleme butonlarına tıklandığında sepeteEkle fonksiyonunu çağırır
 uruncontainerleri.forEach(container=>{
  if(container){
    container.addEventListener('click',sepeteEkle)
  }
 })


 function tutarhesapla(){
  toplamtutar=0
  
  // toplamtutarcontainer yoksa oluştur
  let fiyatkutu= document.createElement('div')
  fiyatkutu.classList.add('fiyatkutu')

  if(!toplamtutarcontainer){
    toplamtutarcontainer = document.createElement('div')
    toplamtutarcontainer.classList.add('toplamtutarcontainer')
  
    fiyatkutu.appendChild(toplamtutarcontainer) 
    // Sepet container'ının sonuna ekle
    if(sepetcontainer && sepetcontainer.parentElement){
      sepetcontainer.parentElement.appendChild(fiyatkutu)
    }
  }
  
  // Toplam tutarı hesapla
  sepettekiUrunler.forEach(urun=>{
    toplamtutar += urun["fiyat"]*urun["adet"]
  })
  
  // Göster
  if(sepettekiUrunler.length > 0){
    toplamtutarcontainer.style.visibility="visible"
    toplamtutarcontainer.style.display="block"
    toplamtutarcontainer.innerHTML=`Toplam Tutar: ${toplamtutar} TL`
  }else{
    toplamtutarcontainer.style.display="none"
  }
  
  localStorage.setItem('toplamtutar',JSON.stringify(toplamtutar))
 }


 // Sayfa yüklendiğinde kaydedilen verileri geri yükle
 kaydedilenverileriYukle()
