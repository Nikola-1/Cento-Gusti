$(document).ready(function() {
    let JelaUKorpi = getItemFromLocalStorage("JelaUKorpi");

    if(JelaUKorpi == 0){
        showEmptyCart();
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

function showEmptyCart(){
    $("#content").html("<h1>Korpa je prazna! </h1>");
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
    <td>${jela.kolicina}</td>
    <td>${jela.cena.trenutna * jela.kolicina}din</td>
    <td><input type="button" value="Izbrisi" onclick='removeFromCart(${jela.JeloID})'></td>
  </tr>`;
  }
  html+=`</table>`;
  document.getElementById('tabela').innerHTML=html;
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
                console.log(ukupnaCena);
                html+=`<p class="text-boja UkupnaCena">Ukupna cena:${ukupnaCena}din</p>`;
                document.getElementById('ukupnaCena').innerHTML=html;
            })
       
    
    
      
}

function dohvatiIzLS(naziv){
    return JSON.parse(localStorage.getItem(naziv))
}