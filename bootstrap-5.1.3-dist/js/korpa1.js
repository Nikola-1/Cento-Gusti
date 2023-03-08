$(document).ready(function() {
    let JelaUKorpi = getItemFromLocalStorage("JelaUKorpi");
    console.log(JelaUKorpi);
    if(JelaUKorpi == 0 || JelaUKorpi == null){
        PraznaKorpa();
        displayCartData();
    }
    else{
        displayCartData();
    }
    var cena=0;
    dohvatiPodatke("bootstrap-5.1.3-dist/js/jela.json",function(x){
        
      ukupnaCena(x);
      
    });
    ispisModala()
    ispisModala2()
});

function dohvatiPodatke(url,funk){
    $.ajax({
        url:url,
        method:"get",
        dataType:"json",
        success:funk,
        error:function(err){
            console.log(err)
        }
    });
    
    
}

function getItemFromLocalStorage(name){
    return JSON.parse(localStorage.getItem(name));
}

//funkcija za prikaz prazne korpe

function PraznaKorpa(){
    var html="<h1>Korpa je prazna! </h1>";
    document.getElementById('poruka').innerHTML=html;
   
}
function displayCartData(){
    let productsFromCartLS = getItemFromLocalStorage("JelaUKorpi");
    if(productsFromCartLS != null){
    dohvatiPodatke("bootstrap-5.1.3-dist/js/jela.json",function(data){
            let ProductsForDisplay = [];
           
            ProductsForDisplay = data.filter(p=>{
                for(let prod of productsFromCartLS){
                    if(p.JeloID == prod.id){
                        p.kolicina = prod.kolicina;
                        return true;
                    }
                }
                return false;
                
            });
        
        
            console.log(ProductsForDisplay);
            generateTable(ProductsForDisplay);
            ukupnaCena(data);
    })
}
else{
    var praznaKorpa='';
    var poruka="<h1>Korpa je prazna!</h1>";
    document.getElementById('tabela').innerHTML=praznaKorpa;
    document.getElementById('poruka').innerHTML=poruka;
    ukloniDugme();
    document.getElementById('ukupnaCena').innerHTML=praznaKorpa;
}
}
function generateTable(jela){
    var html= `
   
    <table class="d-flex justify-content-center">
    <tr class="table-header">
      <th>Naziv</th>
      <th>Slika</th>
      <th>Kolicina</th>
      <th>Cena</th>
       
    </tr>
    
    
   
  `;

  for(let j of jela){
    
     
     
    html+=generateTr(j);
    

  }
  
 
  function generateTr(jela){
    
    return `<tr class="table-rows">
   
    <td>${jela.Naziv}</td>
    <td><img src="${jela.slika}" class="img-fluid slika-korpa" ></td>
    <td><input type="number" id="inputKolicina" class="kolicinaJela"  name="quantity" data-id="${jela.JeloID}" value="${jela.kolicina}" min="1" max="99" readonly><button id="povecaj" class="dugme-smanji">+</button><button id="smanji" class="dugme-smanji">-</button></td>
    <td>${jela.cena.trenutna * jela.kolicina}din</td>
    <td><input type="button" value="Izbrisi" onclick='removeFromCart(${jela.JeloID})'></td>
    
  </tr>`;
  
  }
  
  html+=`</table>`;
  
  document.getElementById('tabela').innerHTML=html;
  
  var brRedova=document.getElementsByClassName('table-rows').length;
  console.log(brRedova);
  if(brRedova == 0){
    var praznaKorpa='';
    document.getElementById('tabela').innerHTML=praznaKorpa;
    document.getElementById('poruka').innerHTML="<h1>Korpa je prazna!</h1>";
    ukloniDugme();
  }
  else{
    dugmePlacanje();
  }
}
function removeFromCart(id){
 let jela = getItemFromLocalStorage("JelaUKorpi");
 let NovaKorpa = jela.filter(j=> j.id !=id);
 
 localStorage.setItem("JelaUKorpi",JSON.stringify(NovaKorpa));

 displayCartData();
 printCartLength()
}
function ukupnaCena(){
       var html="";
       var ukupnaCena=0;
        var JelaKorpa=dohvatiIzLS('JelaUKorpi');
       
        if(JelaKorpa !=null){
            dohvatiPodatke("bootstrap-5.1.3-dist/js/jela.json",function(data){
                
                var NizJelaUKorpi=[];
                
                NizJelaUKorpi=data.filter(j=>{
          
                    for(let Jelo of JelaKorpa){
                        if(j.JeloID == Jelo.id){
                        j.kolicina=Jelo.kolicina;
                        return true;
                    }
                   
                }
              return false;
                });
                for(var jelo of NizJelaUKorpi){
                    ukupnaCena+=jelo.cena.trenutna*jelo.kolicina;
                }
                
                html+=`<p class="text-boja UkupnaCena">Ukupna cena:${ukupnaCena}din</p>`;
                document.getElementById('ukupnaCena').innerHTML=html;
                
                if(JelaKorpa == 0){
                    html=``;
                    document.getElementById('ukupnaCena').innerHTML=html;
                   }
            })
       
        }
        else{
            html=``;
                    document.getElementById('ukupnaCena').innerHTML=html;
        }
    
      
}

function dohvatiIzLS(naziv){
    return JSON.parse(localStorage.getItem(naziv))
}


$(document).on('change','#inputKolicina',function(){
    var JelaIzKorpe=dohvatiIzLS('JelaUKorpi');
})
 function dohvatiKolicinu(){
    var inputTag=$('input[name=inputKolicina]').val();
   
    
    
    return inputTag;
}
var br=0

$(document).on('change',`#input${br++}`,function(){
    console.log(dohvatiKolicinu());
});
//stavljam u niz sve inpute sa atributom name="quantity"
var inputi=document.getElementsByName('quantity');
console.log(inputi);

$(document).on('click')


var JelaUKorpi=dohvatiIzLS('JelaUKorpi');

$(document).on('change','#inputKolicina',updateQuantity1);
function updateQuantity1(){
    let id=$(this).data('id');
    let kolicina=$(this).val();
    var jelaUkorpi=dohvatiIzLS('JelaUKorpi');
    for(var i in jelaUkorpi){
        if(jelaUkorpi[i].id==id){
            jelaUkorpi[i].kolicina=parseInt(kolicina);
            break;
        }
    }
    ubaciLS(jelaUkorpi,"JelaUKorpi");
    displayCartData();
        
    
}
//kod za dugme povecaj
$(document).on('click','#povecaj',function(){
    let id=$(this).prev().data('id');
    let kolicina=$(this).prev().val();
    var povecanje=++kolicina;
    kolicina=$(this).prev().val(povecanje);
   console.log(povecanje);
    var jelaUkorpi=dohvatiIzLS('JelaUKorpi');
    for(var i in jelaUkorpi){
        
        if(jelaUkorpi[i].id==id){
            if(jelaUkorpi[i].kolicina !=99){
                jelaUkorpi[i].kolicina=povecanje;
                }
            break;
        }
    }
    ubaciLS(jelaUkorpi,"JelaUKorpi");
    displayCartData();
})

//kod za dugme smanji
$(document).on('click','#smanji',function(){
    let id=$(this).prev().prev().data('id');
    let kolicina=$(this).prev().prev().val();
    var umanjenje=--kolicina;
    kolicina=$(this).prev().prev().val(umanjenje);
   
    var jelaUkorpi=dohvatiIzLS('JelaUKorpi');
    for(var i in jelaUkorpi){
        
        if(jelaUkorpi[i].id==id){
            if(jelaUkorpi[i].kolicina !=1){
            jelaUkorpi[i].kolicina=umanjenje;
            }
            break;
        }
    }
    ubaciLS(jelaUkorpi,"JelaUKorpi");
    displayCartData();
    
    
})

//dugme za placanje

function dugmePlacanje(){
    var ispis="<button class='dugmePlacanje' id='placanje1'>Kupi</button>";
    document.getElementById('dugmePlacanje').innerHTML=ispis;
}
function ukloniDugme(){
    var ispis="";
    document.getElementById('dugmePlacanje').innerHTML=ispis;
}

function ispisModala(){
    var ispis=`<Div class="modalKorpa">
    <h2 class="text-boja ">Unesite podatke</h2>
    <form id="MyForm" name="Rezervacija" class="d-flex flex-column w-100"/>

            <div class="form-floating mb-3 col-md-6 w-100">
              <input type="text" class="form-control" value="" id="floatingInputIme" placeholder="name@example.com"/>
              <p class="text-danger"></p>
              <div id="ispis1"></div>
              <label for="floatingInput" class="ps-3">Ime</label>

            </div>
            <div class="form-floating mb-3 col-md-6 w-100">

              <input type="text" class="form-control" id="floatingInputPrezime" placeholder="Password"/>
              <p class="text-danger"></p>
              <div id="ispis2"></div>
              <label for="floatingPassword" class="ps-3">Prezime</label>

            </div>
    
            <div class="form-floating mb-3 col-md-6 w-100">

              <input type="text" class="form-control" value="" id="floatingInputGrad" placeholder="name@example.com"/>
              <p class="text-danger"></p>
              <div id="ispis3"></div>
              <label for="floatingInput" class="ps-3">Grad</label>

            </div>
            <div class="form-floating mb-3 col-md-6 w-100">

              <input type="text" class="form-control" value="" id="floatingInputAdresa" placeholder="Password"/>
              <p class="text-danger"></p>
              <div id="ispis4"></div>
              <label for="floatingPassword" class="ps-3">Adresa</label>

            </div>
            <div class="form-floating mb-3 col-md-6 w-100">
            <div class="d-flex flex-row">
            <input type="radio" id="radio1"name="placanje" />
            <label>Placanje po uzecu</label>
            <p class="text-danger"></p>
            </div>
          </div>
          <div class="form-floating mb-3 col-md-6 ">
            <div class="d-flex flex-row">
            <input type="radio"  id="radio2" name="placanje"/>
            <label>Placanje karticom</label>
            <p class="text-danger"></p>
            </div>
          </form>
    
  </Div><button id="close" class="dugmeModal text-center">
  Posalji
 </button>`;
  document.getElementById('modal_container').innerHTML=ispis;

  //regEx
 

  
 
  
}var nizPodaci=[];
var nizGreske=[];
function proveraImena(){
    var poruka="";
    var objIme=$('#floatingInputIme');
    var objImeVal =$('#floatingInputIme').val();
    var RegExZaIme=/^[A-ZŽĐŠČĆ]{1}[a-zžđščć]{2,12}$/
        
      
    if(!RegExZaIme.test(objImeVal) && objImeVal !=""){
        objIme.next().html("Ime mora početi velikim slovom!");
        if(!nizGreske.includes("ime")){
        nizGreske.push("ime");
        }
    }
    else{
        objIme.next().html("");
        if(objImeVal !=""){
        nizPodaci.push(objImeVal);
        }
    }
    if(objImeVal==""){
        poruka +="Morate uneti ime u polje.";
        $('#ispis1').html(poruka);
        poruka=poruka.replace("Morate uneti ime u polje.","");
        if(!nizGreske.includes("ime")){
        nizGreske.push("ime");
        }
    }
    else{
        
      $('#ispis1').html("");
      
    }
}

function proveraPrezimena(){
    var poruka="";
    var objPrezime=$('#floatingInputPrezime');
    var objPrezimeVal =$('#floatingInputPrezime').val();
    var RegExZaPrezime=/^[A-ZŽĐŠČĆ]{1}[a-zžđščć]{2,12}$/
        
      
    if(!RegExZaPrezime.test(objPrezimeVal) && objPrezimeVal !=""){
        objPrezime.next().html("Prezime mora početi velikim slovom!");
        if(!nizGreske.includes("prezime")){
        nizGreske.push("prezime");
        }
    }
    else{
        objPrezime.next().html("");
        if(objPrezimeVal !=""){
            nizPodaci.push(objPrezimeVal);
            }
        
    }
    if(objPrezimeVal==""){
        poruka +="Morate uneti prezime u polje.";
        $('#ispis2').html(poruka);
        poruka=poruka.replace("Morate uneti prezime u polje.","");
        if(!nizGreske.includes("prezime")){
        nizGreske.push("prezime");
        }
    }
    else{
        
      $('#ispis2').html("");
     
    }
}
function proveraGrada(){
    var poruka="";
    var objGrad=$('#floatingInputGrad');
    var objGradVal =$('#floatingInputGrad').val();
    
        
      
  
    if(objGradVal==""){
        poruka +="Morate uneti grad u polje.";
        $('#ispis3').html(poruka);
        poruka=poruka.replace("Morate uneti grad u polje.","");
        if(!nizGreske.includes("Grad")){
        nizGreske.push("Grad");
        }
    }
    else{
        
      $('#ispis3').html("");
      if(objGradVal !=""){
        nizPodaci.push(objGradVal);
        }
    }
}
function proveraAdrese(){
    var poruka="";
    var objAdresa=$('#floatingInputAdresa');
    var objAdresaVal =$('#floatingInputAdresa').val();
    var RegExZaAdresu=/^[A-ZŽĐŠČĆ]{1}[a-zžđščć]{2,12}[1-9]{1,9}$/
        
    if(!RegExZaAdresu.test(objAdresaVal) && objAdresaVal !=""){
        objAdresa.next().html("Adresa mora poceti velikim slovom i sadrzati  cifru na kraju!");
        if(!nizGreske.includes("adresa")){
            nizGreske.push("adresa");
           
        }
       
        
    }
    else{
        objAdresa.next().html("");
        if(objAdresaVal !=""){
            nizPodaci.push(objAdresaVal);
            }
        
    }
  
    if(objAdresaVal==""){
        poruka +="Morate uneti adresu u polje.";
        $('#ispis4').html(poruka);
        poruka=poruka.replace("Morate uneti adresu u polje.","");
        if(!nizGreske.includes("adresa")){
            nizGreske.push("adresa");
           
        }
    }
    else{
        
      $('#ispis4').html("");
    }
    
}
function proveraPolja(){
   
   if( $('#radio1').is(':checked') || $('#radio2').is(':checked')){
    var poljeVr= $('input[name="placanje"]:checked').next().html();
    
    nizPodaci.push(poljeVr);
    
   }
   else{
    if(!nizGreske.includes("polje")){
    nizGreske.push("polje");
}
    modal_container.classList.add('show');
    
   }
}
function provera(){
   console.log(nizPodaci);
    console.log(nizGreske);
    if(nizPodaci.length ==5){
        
       
    }
    if(nizGreske.length != 0 ){
        modal_container.classList.add('show');
    }
    else{
        modal_container.classList.remove('show');
        modal_container2.classList.add('show');
           
             }
    nizPodaci=[];
    nizGreske=[];
}

$(document).on('click','#close',proveraImena);


$(document).on('click','#close',proveraPrezimena);


$(document).on('click','#close',proveraGrada);


$(document).on('click','#close',proveraAdrese);

$(document).on('click','#close',proveraPolja);
$(document).on('click','#close',provera);

$(document).on('click','#placanje1',function(){
   
    const open=document.getElementById("buttonRegEx");
const modal_container=document.getElementById("modal_container");
const close = document.getElementById("close");


    modal_container.classList.add('show');


    $(document).on('click','#close1',function(){
           
        
           
       
        
        
            modal_container2.classList.remove('show');
        
        localStorage.removeItem('JelaUKorpi');
        
        displayCartData();
      
        
            });

    


    });
    
var dugme=document.getElementById('placanje');
console.log(dugme);
var modal_container2=document.getElementById("modal_container2");



function ispisModala2(){
    
    var ispis=`<Div class="modal1">
    <h2 class="text-white ">Uspešno ste porucili hranu!</h2>
    <button id="close1" class="dugmeModal">
     Zatvori
    </button>
  </Div>`;
  document.getElementById('modal_container2').innerHTML=ispis;

  //regEx
 

  
 
  
}
