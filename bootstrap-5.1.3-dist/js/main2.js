

    /*$.ajax({
        url:"bootstrap-5.1.3-dist/js/pice.json",
        method:"get",
        dataType:'json',
        success:function(data){
            ispisJela(data,"pica");
        },
        error:function(err){
            console.log(err);
        }
        
    })
    $.ajax({
        url:"bootstrap-5.1.3-dist/js/Testenina.json",
        method:"get",
        dataType:'json',
        success:function(data){
            ispisJela(data,"testenina");
        },
        error:function(err){
            console.log(err);
        }
        
    })
    $.ajax({
        url:"bootstrap-5.1.3-dist/js/Lazanje.json",
        method:"get",
        dataType:'json',
        success:function(data){
            ispisJela(data,"lazanja");
        },
        error:function(err){
            console.log(err);
        }
        
    })
    $.ajax({
        url:"bootstrap-5.1.3-dist/js/Dezerti.json",
        method:"get",
        dataType:'json',
        success:function(data){
            ispisJela(data,"dezert");
            
        },
        error:function(err){
            console.log(err);
        }
        
    })*/
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
   
        dohvatiPodatke("bootstrap-5.1.3-dist/js/jela.json",function(x){
            nizJela=x;
            sacuvajLS("SvaJela",nizJela);
            dohvatiPodatke("bootstrap-5.1.3-dist/js/vrsta.json",function(y){
                nizVrsta=y;
                sacuvajLS("SveVrste",nizVrsta);
                ispisJela(x,"pica");
                
                kreirajChekBoxFilter(nizVrsta,"chVrsta","Filtriraj");
            })
           dohvatiPodatke("bootstrap-5.1.3-dist/js/sort.json",function(z){
                nizOpcija=z;
                sacuvajLS("SveOpcije",nizOpcija);
                kreirajRadioSort(nizOpcija,"chSort","Sortiraj");
            })
           /* dohvatiPodatke("kategorije.json",function(z){
                    nizKategorija=z;
                    ispisProizvoda(x)
                    KreirajPadajucuListu('listaKategorije',"Kategorije",nizKategorija,"KategorijaDDL")
                    
                    
            })*/
            
           
            /*$(document).on("change","#KategorijaDDL",function(){
                var KatId=$('#KategorijaDDL').val();
                filtriranje(KatId,"kat");
                
            })
            $(document).on("change","#BrendovDDL",function(){
                var KatId=$('#BrendovDDL').val();
                filtriranje(KatId,"brend",x);
                
            })
            $(document).on("change","#Sort",function(){
                var SortVal=$('#Sort').val();
                sortiranje(SortVal,x);
               
            })*/
           
         
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
       // document.getElementById("search").addEventListener("blur",Pretraga);
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
            error:function(err){
                console.log(err)
            }
        });
        $('.dodaj-u-korpu').click(addToCart);
        
    }

   

    
    function kreirajRadioSort(niz,div,naslov){
        var ispis=`<div class='d-flex flex-column flex-lg-row w-100 ChOmotoac'><div><p class="ChNaslov p-1">${naslov}<p></div>`;
        niz.forEach(el=>{
            ispis+=`<Div class="d-flex justify-content-start m-1"><input type="radio" class="Cekboks1" name="VrstaCH" value="${el.naziv}"><label class="ChLabel">${el.vrednost}</label></Div>`
        })
        ispis+="</div>";
        document.getElementById(`${div}`).innerHTML=ispis;
        
        
    }
    function kreirajChekBoxFilter(niz,div,naslov){
        var ispis=`<div class='d-flex flex-column flex-lg-row w-100 ChOmotoac'><div><p class="ChNaslov p-1">${naslov}<p></div>`;
        niz.forEach(el=>{
            ispis+=`<Div class="d-flex justify-content-start m-1"><input type="checkbox" class="Cekboks" name="VrstaCH" value="${el.vrstaID}"><label class="ChLabel">${el.naziv}</label></Div>`
        })
        ispis+="</div>";
        document.getElementById(`${div}`).innerHTML=ispis;
        
        
    }



    //<a href="#" class="btn btn-lg dugmeBoja dodaj-u-korpu" data-id=${obj.JeloID}>Dodaj u korpu</a>



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
        for(var sastojak of obj){
           ispis+=`${sastojak.naziv},`;
        }
        return ispis;
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



function Sortiranje(niz,ch){
    console.log(niz);
    if(niz==undefined){console.log("undefined")}
    var novi = [];
    var val = $(`.${ch}:checked`).val();
    if(val == undefined){
        novi = niz
    }
    else{
        
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
      
    }
    console.log(val);
    return novi
}