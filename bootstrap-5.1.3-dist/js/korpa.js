$(document).ready(function (){
    dohvatiPodatke('/bootstrap-5.1.3-dist/js/jela.json',function(x){
            console.log(x);
            ubaciLS(x,"Jela");
           
    });
   //ispis broja jela u korpi
   kolicinaUKorpi();
});
console.log(nizJela);
function dohvatiPodatke(fajl,funk){
    $.ajax({
        url:fajl,
        method:"get",
        dataType:"json",
        success:funk,
        error:function(err){
            console.log(err);
        }
    })
}
//funkcija za skladistenje podataka u local storage

function ubaciLS(data,naziv){
    localStorage.setItem(naziv,JSON.stringify(data));
}


    
       
    
    
    $(document).on('click',".dodaj-u-korpu",addToCart)


function addToCart(){
    let id=$(this).data('id');
   
    var JelaIzKorpe=UcitajIzLS('JelaUKorpi');
   
    if(JelaIzKorpe){
        if(JeloSeNalaziUKorpi()){
            updateKolicina();
            
        }
        else{
            dodajJelouLS();
            kolicinaUKorpi();
        }
    }
    else{
        addFirstItemToCart();
        kolicinaUKorpi();
    }


function addFirstItemToCart(){
    let Jela =[];
    Jela[0]={
        "id":id,
        "kolicina" : 1
    };
    ubaciLS(Jela,"JelaUKorpi");
}



    function JeloSeNalaziUKorpi(){
        return JelaIzKorpe.filter(x=>x.id == id).length;
    }
    //funkcija koja povecava kolicinu
    function updateKolicina(){
        
        let JelaIzKorpe = dohvatiIzLS("JelaUKorpi");
        for(let i in JelaIzKorpe){
            if(JelaIzKorpe[i].id==id){
                JelaIzKorpe[i].kolicina++;
                break;
            }
            
        }
        
        ubaciLS(JelaIzKorpe,"JelaUKorpi");
    }
   

    function dodajJelouLS(){
        let JelaIzLS =UcitajIzLS('JelaUKorpi');
        JelaIzLS.push({
            "id":id,
            "kolicina" : 1
        });
        ubaciLS(JelaIzLS,"JelaUKorpi");
        
    }
   
}
function UcitajIzLS(naziv){
    return JSON.parse(localStorage.getItem(naziv));
}

function kolicinaUKorpi(){
    var jelaIzLS = UcitajIzLS("JelaUKorpi");

    
    if(jelaIzLS != null){
            let brojJela = jelaIzLS.length;
            document.getElementById('broj-jela').innerHTML=`${brojJela}`;
            
           
    }
    else{
        document.getElementById("broj-jela").innerHTML="0";
    }
}
