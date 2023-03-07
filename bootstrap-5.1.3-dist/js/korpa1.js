$(document).ready(function() {
    let JelaUKorpi = getItemFromLocalStorage("JelaUKorpi");

    if(JelaUKorpi == 0){
        PraznaKorpa();
    }
    else{
        displayCartData();
    }
    var cena=0;
    dohvatiPodatke("bootstrap-5.1.3-dist/js/jela.json",function(x){
        
      ukupnaCena(x);
    });
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
    var praznaKorpa='<h1>Korpa je prazna!</h1>';
    document.getElementById('tabela').innerHTML=praznaKorpa;
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

