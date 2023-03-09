


    window.onload = function(){
        $(document).ready(function(){
            $(".img-container:nth-child(1) ").animate({
               opacity:"100%"
                         
               
            },500);
            $(".img-container:nth-child(2) ").delay(900).animate({
                opacity:"100%"
                          
                
             },500);
    
             $(".img-container:nth-child(3) ").delay(1400).animate({
                opacity:"100%"
                          
                
             },3500);
    
             
             $(".prvi-slajd ").delay(500).animate({
                opacity:"100%"
                          
                
             },900);
               
         })
         
    }
var nizJela=[];
    window.onload=function(){
   
        dohvatiPodatke("jela.json",function(x){
            nizJela=x;
            sacuvajLS("SvaJela",nizJela);
            dohvatiPodatke("vrsta.json",function(y){
                nizVrsta=y;
                sacuvajLS("SveVrste",nizVrsta);
                ispisJela(x,"pica");
                
                kreirajChekBoxFilter(nizVrsta,"chVrsta","Filtriraj");
            })
           dohvatiPodatke("sort.json",function(z){
                nizOpcija=z;
                sacuvajLS("SveOpcije",nizOpcija);
                kreirajRadioSort(nizOpcija,"chSort","Sortiraj");
            })
           
           
         
            $(document).on("change",".Cekboks",function(){
                
                var Jela = dohvatiIzLS("SvaJela");
                Jela=filtriranje(Jela);
                ispisJela(Jela);
                $(document).on("change",".Cekboks1",function(){
                   
                 
                   Jela= Sortiranje(Jela,"Cekboks1");
                   
                   ispisJela(Jela);
               });
                
            });
            $(document).on("change",".Cekboks1",function(){
            
              
                Jela= Sortiranje(nizJela,"Cekboks1");
                
                ispisJela(Jela);
            });
            
        })
      
    }


    function sacuvajLS(naziv,vrednost){
        localStorage.setItem(naziv,JSON.stringify(vrednost))
    }
    function dohvatiIzLS(naziv){
        return JSON.parse(localStorage.getItem(naziv))
    }

    function dohvatiPodatke(url,funk){
        $.ajax({
            url:url,
            method:"get",
            dataType:"json",
            success:funk,
            error:function(xhr,err){
                var err = '';
                if (xhr.status === 0) {
                err = 'Not connect.\n Verify Network.';
                } else if (xhr.status == 404) {
                    err = 'Requested page not found. [404]';
                } else if (xhr.status == 500) {
                    err = 'Internal Server Error [500].';
                } else if (exception === 'parsererror') {
                    err = 'Requested JSON parse failed.';
                } else if (exception === 'timeout') {
                    err = 'Time out error.';
                } else if (exception === 'abort') {
                    err = 'Ajax request aborted.';
                } else {
                err = 'Uncaught Error.\n' + xhr.responseText;
                }
                greske(err);
            }
            
        });
        $('.dodaj-u-korpu').click(addToCart);
        
    }

    function greske(error){
            var ispis="";
          
                ispis+=`<li>${error}</li>`;
            
            document.getElementById('errori').innerHTML=ispis;
            
    }
   

        //funkcija za kreiranje radio-buttona liste za sort
    function kreirajRadioSort(niz,div,naslov){
        var ispis=`<div class='d-flex flex-column flex-lg-row w-100 ChOmotoac'><div><p class="ChNaslov p-1">${naslov}<p></div>`;
        niz.forEach(el=>{
            ispis+=`<Div class="d-flex justify-content-start m-1"><input type="radio" class="Cekboks1" name="VrstaCH" value="${el.naziv}"><label class="ChLabel">${el.vrednost}</label></Div>`
        })
        ispis+="</div>";
        document.getElementById(`${div}`).innerHTML=ispis;
        
        
    }
    //funkcija za kreiranje checkbox liste za filtere
    function kreirajChekBoxFilter(niz,div,naslov){
        var ispis=`<div class='d-flex flex-column flex-lg-row w-100 ChOmotoac'><div><p class="ChNaslov p-1">${naslov}<p></div>`;
        niz.forEach(el=>{
            ispis+=`<Div class="d-flex justify-content-start m-1"><input type="checkbox" class="Cekboks" name="VrstaCH" value="${el.vrstaID}"><label class="ChLabel">${el.naziv}</label></Div>`
        })
        ispis+="</div>";
        document.getElementById(`${div}`).innerHTML=ispis;
        
        
    }



  



    var ispisPice,ispisTestenine,ispisLazanje,ispisDezerti;
    function ispisJela(niz){
        var ispis=`<Div class=" d-md-flex flex-wrap d-block w-100 m-auto col-12 red1">`;
        for(var obj of niz){
            
            ispis+=`<div class="img-container flex-basis33 d-block h2boja text-center col-md-3 col-12">
                <img src="${obj.slika}" alt="${obj.alt}" class="img-fluid">
                <h3>${obj.Naziv}</h3>
                <p>${ispisSastojaka(obj.sastojci)}</p>
                <p class="h4 text-boja">${ispisCene(obj.cena)}</p>
                
               <input type="button" class="btn btn-lg dugmeBoja dodaj-u-korpu" data-id=${obj.JeloID} value="Dodaj u korpu"/>
              </div>`;
        }
        
        
        ispis+=`</Div>`;
        document.getElementById("ispisJela").innerHTML=ispis;
}

function ispisCene(obj){
    var ispis="";
    
        if(obj.stara != null){
            ispis+=`<del>${obj.stara}din</del></br>${obj.trenutna}din`;
        }
        else{
            ispis+=`${obj.trenutna}din`
        }
    
    return ispis;
}

    function ispisSastojaka(obj){
        var ispis="";
        var noviIspis="";
        for(var sastojak of obj){
           ispis+=`${sastojak.naziv},`;
             noviIspis=ispis.substring(0,ispis.length-1);
        }
        return noviIspis;
    }
    var dugmad=document.getElementsByName('VrstaCH');
    
    function filtriranje(niz){
        var filtrirani=[];
        $(".Cekboks:checked").each(function(el){
            filtrirani.push(parseInt($(this).val()))
            
        })
      
        if(filtrirani.length !=0){
            return niz.filter(x=> filtrirani.includes(x.vrsta))
           
        }
        
        if(filtrirani.length ==0){
             niz=dohvatiIzLS('SvaJela');
        }
        return niz;
    }
    
    function provera(){
        var Jela = dohvatiIzLS("SvaJela");
        
        
        
        Jela=filtriranje(Jela);
        Jela= Sortiranje(Jela);
        ispisJela(Jela);
        
        
    }


function Sortiranje(niz,rb){
    
    //novi niz u koji smestamo jela
    var novi = [];
    var val = $(`.${rb}:checked`).val();
    
   
        
        novi=niz.sort(function(a,b){
            if(val == "cena-asc"){
                return a.cena.trenutna - b.cena.trenutna
            
            }
            if(val == "cena-desc"){
                return b.cena.trenutna - a.cena.trenutna
            }
            if(val == "naziv-asc"){
                if(a.Naziv < b.Naziv){
                    return -1
                }
                else if(a.Naziv > b.Naziv){
                    return 1
                }
                else return 0
            }
            if(val == "naziv-desc"){
                if(a.Naziv < b.Naziv){
                    return 1
                }
                else if(a.Naziv > b.Naziv){
                    return -1
                }
                else return 0;
            }
           
        })
      
    
    console.log(val);
    return novi
}