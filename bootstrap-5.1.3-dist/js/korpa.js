$(document).ready(function (){
    dohvatiPodatke('/bootstrap-5.1.3-dist/js/jela.json',function(x){
            console.log(x);
            ubaciLS(x,"Jela");
           
    });
   //ispis broja jela u korpi
        printCartLength();
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
//funkcija za ucitavanje proizvoda

    
       
    
    
    $(document).on('click',".dodaj-u-korpu",addToCart)

//funkcija za dodavanje proizvoda u korpu
function addToCart(){
    let id=$(this).data('id');
   
    var JelaIzKorpe=UcitajIzLS('JelaUKorpi');
   
    if(JelaIzKorpe){
        if(JeloSeNalaziUKorpi()){
            updateQuantity();
            
        }
        else{
            addToLocalStorage();
            printCartLength();
        }
    }
    else{
        addFirstItemToCart();
        printCartLength();
    }

//funkcija za dodavanje prvog proizvoda u korpu
function addFirstItemToCart(){
    let Jela =[];
    Jela[0]={
        "id":id,
        "kolicina" : 1
    };
    ubaciLS(Jela,"JelaUKorpi");
}

// funkcija koja proverava da li proizvod vec postoji u korpi

    function JeloSeNalaziUKorpi(){
        return JelaIzKorpe.filter(x=>x.id == id).length;
    }
    //funkcija koja povecava kolicinu
    function updateQuantity(){
        
        let JelaIzKorpe = dohvatiIzLS("JelaUKorpi");
        for(let i in JelaIzKorpe){
            if(JelaIzKorpe[i].id==id){
                JelaIzKorpe[i].kolicina++;
                break;
            }
            
        }
        
        ubaciLS(JelaIzKorpe,"JelaUKorpi");
    }
    //funkcija za dodavanje novog proizvoda u korpu koja vec ima neke proizvode

    function addToLocalStorage(){
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

function printCartLength(){
    var productsFromLS = UcitajIzLS("JelaUKorpi");

    //console.log(productsFromLS)
    if(productsFromLS != null){
            let numberOfProducts = productsFromLS.length;
            
           $('#broj-proizvoda').html(`${numberOfProducts}`);
    }
    else{
        ('#broj-proizvoda').html(`0 proizvoda`);
    }
}
