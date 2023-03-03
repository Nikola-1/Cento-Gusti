/*<Div class=" d-md-flex d-block w-100 m-auto col-12 red1">
              <div class="img-container d-block h2boja text-center col-md-3 col-12">
              <img src="bootstrap-5.1.3-dist/assets/img/pexels-gilly-topicha-10779657.jpg" alt="jelo Pica alpino" class="img-fluid">
              <h3>Pica alpino</h3>
              <p>Koziji sir,persun,pelat</p>
              <a href="#" class="btn btn-lg dugmeBoja">990 din</a>
            </div>
            <div class="img-container d-block h2boja text-center col-md-3 col-12">
                <img src="bootstrap-5.1.3-dist/assets/img/pexels-engin-akyurt-2260200.jpg" alt="jelo Pica vezuvio" class="img-fluid">
                <h3>Pica vezuvio</h3>
                <p>Kulen,dimljena kobasica,sir,pelat</p>
                <a href="#" class="btn btn-lg dugmeBoja">980 din</a>
              </div>
              <div class="img-container d-block h2boja text-center col-md-3 col-12">
                <img src="bootstrap-5.1.3-dist/assets/img/pexels-alberta-studios-10337724.jpg" alt="jelo Pica Grekos" class="img-fluid">
                <h3>Pica grekos</h3>
                <p>Masline,Caciki sos,persun,pelat.</p>
                <a href="#" class="btn btn-lg dugmeBoja">840 din</a>
              </div>
          </Div>*/

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
                kreirajChekBoxSort(nizOpcija,"chSort","Sortiraj");
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
            $(document).on("change","#VrsteDDL",function(){
                var VrstaId=$('#VrsteDDL').val();
                filtriranje(VrstaId,x);
                
            })
            $(document).on("change","#Sort",function(){
                var SortVal=$('#Sort').val();
                sortiranje(SortVal,x);
               
            })
            
            $(document).on("change",".Cekboks",function(){
                var Jela = dohvatiIzLS("SvaJela");
                Jela=filtriranje(Jela);
                ispisJela(Jela);
                $(document).on("change",".Cekboks1",function(){
                    Jela1 =Jela
                   console.log(Jela);
                   Jela= Sortiranje(Jela,"Cekboks1");
                   
                   ispisJela(Jela);
               });
                
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
        
        
    }



    function KreirajPadajucuListu(id,labela,niz,idListe){
        var ispis=`<label class="drop_lista_labela col-4 col-md-1 m-3">${labela}</label><select id=${idListe} class="drop_lista col-md-7 col-6"><option value=0>Izaberite...</option>`;
        niz.forEach(el =>{
            ispis+=`<option value="${el.vrstaID}">${el.naziv}</option>`;
        });
        ispis+=`</select>`
        document.getElementById(`${id}`).innerHTML=ispis;
    }
    function kreirajChekBoxSort(niz,div,naslov){
        var ispis=`<div class='d-flex flex-column flex-lg-row w-100 ChOmotoac'><div><p class="ChNaslov p-1">${naslov}<p></div>`;
        niz.forEach(el=>{
            ispis+=`<Div class="d-flex justify-content-start m-1"><input type="checkbox" class="Cekboks1" name="VrstaCH" value="${el.naziv}"><label class="ChLabel">${el.naziv}</label></Div>`
        })
        ispis+="</div>";
        document.getElementById(`${div}`).innerHTML=ispis;
        
        
    }
    function kreirajChekBoxFilter(niz,div,naslov,klasa,val){
        var ispis=`<div class='d-flex flex-column flex-lg-row w-100 ChOmotoac'><div><p class="ChNaslov p-1">${naslov}<p></div>`;
        niz.forEach(el=>{
            ispis+=`<Div class="d-flex justify-content-start m-1"><input type="checkbox" class="Cekboks" name="VrstaCH" value="${el.vrstaID}"><label class="ChLabel">${el.naziv}</label></Div>`
        })
        ispis+="</div>";
        document.getElementById(`${div}`).innerHTML=ispis;
        
        
    }
   /* function ispisJela(niz,tip){
            var ispis='<Div class=" d-md-flex d-block w-100 m-auto col-12 red1">';
            for(var obj of niz){
                ispis+=`<div class="img-container d-block h2boja text-center col-md-3 col-12">
                <img src="${obj.slika}" alt="${obj.alt}" class="img-fluid">
                <h3>${obj.Naziv}</h3>
                <p>${ispisSastojaka(obj.sastojci)}</p>
                <a href="#" class="btn btn-lg dugmeBoja">990 din</a>
              </div>`
            }
            ispis+=" </Div>";
            if(tip=="pica"){
                document.getElementById("ispisPice").innerHTML=ispis;
            }
            if(tip=="testenina"){
                document.getElementById("ispisTestenine").innerHTML=ispis;
            }
            if(tip=="lazanja"){
                document.getElementById("ispisLazanje").innerHTML=ispis;
            }
            if(tip=="dezert"){
                document.getElementById("ispisDezerta").innerHTML=ispis;
            }
    }*/
    var ispisPice,ispisTestenine,ispisLazanje,ispisDezerti;
    function ispisJela(niz,tip){
        var ispis=`<Div class=" d-md-flex flex-wrap d-block w-100 m-auto col-12 red1">`;
        for(var obj of niz){
            
            ispis+=`<div class="img-container flex-basis33 d-block h2boja text-center col-md-3 col-12">
                <img src="${obj.slika}" alt="${obj.alt}" class="img-fluid">
                <h3>${obj.Naziv}</h3>
                <p>${ispisSastojaka(obj.sastojci)}</p>
                <a href="#" class="btn btn-lg dugmeBoja">${obj.cena.trenutna}</a>
              </div>`;
        }
        
        
        ispis+=`</Div>`;
        document.getElementById("ispisJela").innerHTML=ispis;
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
        console.log(filtrirani);
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
        
        console.log(Jela);
        
        Jela=filtriranje(Jela);
        Jela= Sortiranje(Jela);
        ispisJela(Jela);
        
        
    }



function Sortiranje(niz,ch){
    console.log(niz);
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
    console.log(novi);
    return novi
}