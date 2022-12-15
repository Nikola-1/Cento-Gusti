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
var url = window.location.pathname;
console.log(url);


//Dinamicka drop down lista




//Dinamicki napravljena galerija
if(url == "/Cento-Gusti/galerija.html"){
var nizSlika =new Array("bootstrap-5.1.3-dist/assets/img/pexels-arthouse-studio-4344577.jpg","bootstrap-5.1.3-dist/assets/img/pexels-igor-starkov-914388.jpg","bootstrap-5.1.3-dist/assets/img/pexels-roman-odintsov-5902954.jpg","bootstrap-5.1.3-dist/assets/img/pexels-igor-starkov-1307698 (1).jpg","bootstrap-5.1.3-dist/assets/img/pexels-yelena-odintsova-10556713.jpg","bootstrap-5.1.3-dist/assets/img/pexels-volkan-vardar-6968828.jpg");
var nizAlt = new Array("Unutrasnjošt restorana na zvezdari","Unutrašnjost restorana na vračaru","Pica na tanjiru ispred restorana","Unutrašnjost restorana na Dušanovcu","Spoljašnjost restorana na Novom Beogradu","Unutrašnjost restorana na novom Beogradu",);
var Section1 =document.getElementById("section_1");
var Section2 =document.getElementById('section_2');
var Section3 =document.getElementById('section_3');
for(var i=0;i <2;i++){
    var slika=document.createElement("img");
    slika.setAttribute("src",nizSlika[i]);
    slika.setAttribute("alt",nizAlt[i]);
    slika.setAttribute("class","w-100 shadow-1-strong rounded mb-4")
    Section1.appendChild(slika);
}
for(var i=2;i < 4;i++){
    var slika=document.createElement("img");
    slika.setAttribute("src",nizSlika[i]);
    slika.setAttribute("alt",nizAlt[i]);
    slika.setAttribute("class","w-100 shadow-1-strong rounded mb-4")
    Section2.appendChild(slika);
}
for(var i=4;i < 6;i++){
    var slika=document.createElement("img");
    slika.setAttribute("src",nizSlika[i]);
    slika.setAttribute("alt",nizAlt[i]);
    slika.setAttribute("class","w-100 shadow-1-strong rounded mb-4")
    Section3.appendChild(slika);
}
}
// *Regularni izrazi




    //Dinamicka drop down lista
    if(url =="/Cento-Gusti/rezervacija.html"){
    var Mesta =new Array("Vračar","Dušanovac","Zvezdara","Novi Beograd");
var MestaValue=new Array("Vračar","Dušanovac","Zvezdara","Novi Beograd")
 
var selectTag = document.createElement("select");
selectTag.setAttribute("id","DropLista");
selectTag.setAttribute("class","form-floating mb-3 col-md-6 w-100  rounded form-control pt-0 pb-0");


var optionTagPrvi = document.createElement("option");
optionTagPrvi.setAttribute("value","0");
var sadrzajPrvogOptionTaga =document.createTextNode("Izaberite");
selectTag.appendChild(optionTagPrvi);
optionTagPrvi.appendChild(sadrzajPrvogOptionTaga);


for(i=0;i<Mesta.length;i++){
    var ostaliOptionTagovi =document.createElement("option");
    var sadrzajOstalih = document.createTextNode(Mesta[i]);
    ostaliOptionTagovi.appendChild(sadrzajOstalih);
    selectTag.appendChild(ostaliOptionTagovi);
    ostaliOptionTagovi.setAttribute("value",MestaValue[i]);
    
    
    
}

var z=document.getElementById("padajuca_lista1");
z.appendChild(selectTag);
}
//Provera


//Polja
    var objPol =document.getElementsByName("flexRadioDefault");
    var objIme =document.getElementById("floatingInputIme");
    var objPrezime =document.getElementById("floatingInputPrezime");
    var objEmail =document.getElementById("floatingInputEmail");
    var objTekstualnoPolje =document.getElementById("floatingTextarea3");
    var objTelefon =document.getElementById("floatingInputNumber");
    var objDatum =document.getElementById("floatingInputDate");
    var objVreme=document.getElementById("floatingInputTime");
    var objGosti=document.getElementById("floatingInputGuests");
    
    var nizGreske=[];
    var nizPodaci=[];
    
    //Regularni izrazi
    var RegExZaEmail=/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    var RegExZaIme=/^[A-ZŽĐŠČĆ]{1}[a-zžđščć]{2,12}$/
    var RegExZaTelefon=/^[0-9]{8,16}$/
    var RegExZaDatum= /^([1]|[1-2][0-9]|[3][0-1]).([1-9]|[1][0-2]).2022$/
    var RegExZaPrezime=/^[A-ZŽĐŠČĆ]{1}[a-zžđščć]{2,12}$/
    var RegExZaVreme=/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/
    var RegExZaGoste=/^([1-9]|1[0-9]|20)$/

    


//Ispis 
function proveraImena(){
if(url== "/Cento-Gusti/index.html" ){
    var poruka="<p class='text-white d-flex'>"
    }
    else{
        var poruka ="<p class='text-danger d-flex'>"
    }

if(!RegExZaIme.test(objIme.value) && objIme.value !=""){
    objIme.nextElementSibling.innerHTML = "Telefon moze imati samo brojeve.Primer(063445511)";
    nizGreske.push("ime");
}
else{
    objIme.nextElementSibling.innerHTML ="";
   
    
}


if(objIme.value==""){
    poruka +="Morate uneti ime u polje.";
    document.querySelector("#ispis1").innerHTML=poruka;
    poruka=poruka.replace("Morate uneti ime u polje.","");
    nizGreske.push("ime");
}
else{
    document.querySelector("#ispis1").innerHTML="";
    nizPodaci.push(objIme.value);
}
}

//Provera Mesta
function ProveraMesta(){
    var ObjMesto = document.querySelector("#DropLista");
    var ObjMestoValue=ObjMesto.options[ObjMesto.selectedIndex].value;
    var poruka="<p class='text-danger d-flex'>"
    if(url =="/Cento-Gusti/rezervacija.html"){
        //Obrada drop liste
       
        if(ObjMestoValue =="0"){
            poruka +="Morate izabrati mesto.";
            
            document.querySelector("#ispis9").innerHTML=poruka;
            poruka=poruka.replace("Morate izabrati mesto.","");
            nizGreske.push("mesto");
            
        }
        else{
            
            document.querySelector("#ispis9").innerHTML="";
            nizPodaci.push(ObjMesto.options[ObjMesto.options.selectedIndex].text);
            
        }
    }
}
function ProveraPrezimena(){
    if(url== "/Cento-Gusti/index.html" ){
        var poruka="<p class='text-white d-flex'>"
        }
        else{
            var poruka ="<p class='text-danger d-flex'>"
        }
    
    if(!RegExZaPrezime.test(objPrezime.value) && objPrezime.value !=""){
        objPrezime.nextElementSibling.innerHTML = "Prvo slovo prezimena mora biti veliko";
        nizGreske.push("prezime");
    }
     
    else{
        objPrezime.nextElementSibling.innerHTML ="";
    }


    if(objPrezime.value==""){
        poruka +="Morate uneti prezime u polje.";
       
        document.querySelector("#ispis2").innerHTML=poruka;
        poruka=poruka.replace("Morate uneti prezime u polje.","");
        nizGreske.push("prezime");
    }
    else{
        document.querySelector("#ispis2").innerHTML="";
        nizPodaci.push(objPrezime.value);
    }
}
function ProveraEmail(){
    
    if(url== "/Cento-Gusti/index.html" ){
        var poruka="<p class='text-white d-flex'>"
        }
        else{
            var poruka ="<p class='text-danger d-flex'>"
        }
    if(!RegExZaEmail.test(objEmail.value) && objEmail.value !=""){
        objEmail.nextElementSibling.innerHTML = "Email mora sadrzati @!(primer:pera@gmail.com)";
        nizGreske.push("Email");
     }
     else{
         objEmail.nextElementSibling.innerHTML ="";
         
     }
    
    if(objEmail.value==""){
        poruka +="Morate uneti email u polje!";
        document.querySelector("#ispis3").innerHTML=poruka;
        poruka=poruka.replace("Morate uneti email u polje!","");
        nizGreske.push("email");
    }
    else{
        document.querySelector("#ispis3").innerHTML="";
        nizPodaci.push(objEmail.value);
        
    }
}
    function ProveraTelefona(){
        var poruka="<p class='text-danger d-flex'>"
        if(!RegExZaTelefon.test(objTelefon.value) && objTelefon.value !=""){
            objTelefon.nextElementSibling.innerHTML = "Prvo slovo mora biti veliko";
            nizGreske.push("telefon");
        }
        else{
            objTelefon.nextElementSibling.innerHTML ="";
        }

if(objTelefon.value==""){
    poruka +="Morate uneti broj telefona u polje!";
    document.querySelector("#ispis5").innerHTML=poruka;
    poruka=poruka.replace("Morate uneti broj telefona u polje!","");
    nizGreske.push("Telefon");
}
else{
    document.querySelector("#ispis5").innerHTML="";
    nizPodaci.push(objTelefon.value);
}
    }


function ProveraDatuma(){
    var poruka="<p class='text-danger d-flex'>"
    if(!RegExZaDatum.test(objDatum.value) && objDatum.value !=""){
        objDatum.nextElementSibling.innerHTML = "Pogresan unos.Godina mora biti tekuca.";
    }
    else{
        objDatum.nextElementSibling.innerHTML ="";
        
        
    }

if(objDatum.value==""){
poruka +="Morate uneti datum u polje!";
document.querySelector("#ispis6").innerHTML=poruka;
poruka=poruka.replace("Morate uneti datum u polje!","");
nizGreske.push("datum");
}
else{
document.querySelector("#ispis6").innerHTML="";
nizPodaci.push(objDatum.value);
}
}

function ProveraVremena(){
    var poruka="<p class='text-danger d-flex'>"
    if(!RegExZaVreme.test(objVreme.value) && objVreme.value !=""){
        objVreme.nextElementSibling.innerHTML = "Pogresan unos.Primer(23:24)";
        nizGreske.push("vreme");
        
    }
    else{
        objVreme.nextElementSibling.innerHTML ="";
        
    }


    if(objVreme.value==""){
        poruka +="Morate uneti vreme u polje!";
        document.querySelector("#ispis7").innerHTML=poruka;
        poruka=poruka.replace("Morate uneti vreme u polje!","");
        nizGreske.push("vreme");
    }
    else{
        document.querySelector("#ispis7").innerHTML="";
        nizPodaci.push(objVreme.value);
    }
}
function ProveraBrojaGostiju(){
    var poruka="<p class='text-danger d-flex'>"
    if(!RegExZaGoste.test(objGosti.value) && objGosti.value !=""){
        objGosti.nextElementSibling.innerHTML = "Ne moze vise od 20 osoba.";
        nizGreske.push("Gosti");
       
    }
    else{
        objGosti.nextElementSibling.innerHTML ="";
       
    }
    if(objGosti.value==""){
        poruka +="Morate uneti broj gostiju u polje!";
        document.querySelector("#ispis8").innerHTML=poruka;
        poruka=poruka.replace("Morate uneti broj gostiju u polje!","");
        nizGreske.push("Gosti");
    }
    else{
        document.querySelector("#ispis8").innerHTML="";
        nizPodaci.push(objGosti.value);
    }
}

function ProveraTekstualnogPolja(){
    if(url== "/Cento-Gusti/index.html" ){
        var poruka="<p class='text-white d-flex'>"
        }
        else{
            var poruka ="<p class='text-danger d-flex'>"
        }
    if(objTekstualnoPolje.value==""){
        poruka +="Tekstualno polje ne moze da bude prazno.";
        document.querySelector("#ispis4").innerHTML=poruka;
        nizGreske.push("Tekstualno polje");
        
    }
    else{
        document.querySelector("#ispis4").innerHTML="";
        nizPodaci.push(objTekstualnoPolje.value);
    }
}

if(url == "/Cento-Gusti/index.html" || url =="/Cento-Gusti/rezervacija.html" ){
    document.querySelector("#floatingInputIme").addEventListener("blur",proveraImena);
    if(url =="/Cento-Gusti/rezervacija.html"){
    document.querySelector("#DropLista").addEventListener("blur",ProveraMesta);
}
    document.querySelector("#floatingInputPrezime").addEventListener("blur",ProveraPrezimena);
    document.querySelector("#floatingInputEmail").addEventListener("blur",ProveraEmail);
    if(url =="/Cento-Gusti/rezervacija.html"){
    document.querySelector("#floatingInputNumber").addEventListener("blur",ProveraTelefona);
    document.querySelector("#floatingInputDate").addEventListener("blur",ProveraDatuma);
    document.querySelector("#floatingInputTime").addEventListener("blur",ProveraVremena);
    document.querySelector("#floatingInputGuests").addEventListener("blur",ProveraBrojaGostiju);
}
    document.querySelector("#floatingTextarea3").addEventListener("blur",ProveraTekstualnogPolja);
    document.querySelector("#buttonRegEx").addEventListener("click",Provera);
    document.querySelector("#buttonRegEx").addEventListener("click",modal);
      function Provera(){
        //Promenljive
        var objPol,objIme,objPrezime,objEmail,objTekstualnoPolje,objTelefon,objDatum,objVreme,objGosti,ObjMesto,nizGreske,nizPodaci

    objPol =document.getElementsByName("flexRadioDefault");
    objIme =document.getElementById("floatingInputIme");
    objPrezime =document.getElementById("floatingInputPrezime");
    objEmail =document.getElementById("floatingInputEmail");
    objTekstualnoPolje =document.getElementById("floatingTextarea3");
    objTelefon =document.getElementById("floatingInputNumber");
    objDatum =document.getElementById("floatingInputDate");
    objVreme=document.getElementById("floatingInputTime");
    objGosti=document.getElementById("floatingInputGuests");
    if(  url =="/Cento-Gusti/rezervacija.html"){
    ObjMesto = document.querySelector("#DropLista");
    var ObjMestoValue=ObjMesto.options[ObjMesto.selectedIndex].value;}
    nizGreske=[];
    nizPodaci=[];
    

    //Regularni izrazi

    var RegExZaEmail=/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    var RegExZaIme=/^[A-ZŽĐŠČĆ]{1}[a-zžđščć]{2,12}$/
    var RegExZaTelefon=/^[0-9]{8,16}$/
    var RegExZaDatum= /^([1]|[1-2][0-9]|[3][0-1]).([1-9]|[1][0-2]).2022$/
    var RegExZaPrezime=/^[A-ZŽĐŠČĆ]{1}[a-zžđščć]{2,12}$/
    var RegExZaVreme=/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/
    var RegExZaGoste=/^([1-9]|1[0-9]|20)$/
    //Obrada drop down lsite
   
    
    
    //Obrada imena
    if(url== "/Cento-Gusti/index.html" ){
        var poruka="<p class='text-white d-flex'>"
        }
        else{
            var poruka ="<p class='text-danger d-flex'>"
        }
    
    if(!RegExZaIme.test(objIme.value) && objIme.value !=""){
        objIme.nextElementSibling.innerHTML = "Prvo slovo mora biti veliko!";
        nizGreske.push("ime");
    }
    else{
        objIme.nextElementSibling.innerHTML ="";
       
        
    }
    
    
    if(objIme.value==""){
        poruka +="Morate uneti ime u polje.";
        document.querySelector("#ispis1").innerHTML=poruka;
        poruka=poruka.replace("Morate uneti ime u polje.","");
        nizGreske.push("ime");
    }
    else{
        document.querySelector("#ispis1").innerHTML="";
        nizPodaci.push(objIme.value);
    }
    
if(url =="/Cento-Gusti/rezervacija.html"){
    //Obrada drop liste
    if(ObjMestoValue =="0"){
        poruka +="Morate izabrati mesto.";
        
        document.querySelector("#ispis9").innerHTML=poruka;
        poruka=poruka.replace("Morate izabrati mesto.","");
        nizGreske.push("mesto");
       
    }
    else{
        document.querySelector("#ispis9").innerHTML="";
        nizPodaci.push(ObjMesto.options[ObjMesto.options.selectedIndex].text);
        
    }
}
    //Obrada prezimena
    
    
    
    

    if(!RegExZaPrezime.test(objPrezime.value) && objPrezime.value !=""){
        objPrezime.nextElementSibling.innerHTML = "Prvo slovo prezimena mora biti veliko";
        nizGreske.push("prezime");
    }
     
    else{
        objPrezime.nextElementSibling.innerHTML ="";
    }


    if(objPrezime.value==""){
        poruka +="Morate uneti prezime u polje.";
       
        document.querySelector("#ispis2").innerHTML=poruka;
        poruka=poruka.replace("Morate uneti prezime u polje.","");
        nizGreske.push("prezime");
    }
    else{
        document.querySelector("#ispis2").innerHTML="";
        nizPodaci.push(objPrezime.value);
    }
    
    //Obrada Emaila
    if(!RegExZaEmail.test(objEmail.value) && objEmail.value !=""){
        objEmail.nextElementSibling.innerHTML = "Email mora sadrzati @!(primer:pera@gmail.com)";
        nizGreske.push("Email");
     }
     else{
         objEmail.nextElementSibling.innerHTML ="";
         
     }
    
     if(objEmail.value==""){
        poruka +="Morate uneti email u polje!";
        document.querySelector("#ispis3").innerHTML=poruka;
        poruka=poruka.replace("Morate uneti email u polje!","");
        
    }
    else{
        document.querySelector("#ispis3").innerHTML="";
        nizPodaci.push(objEmail.value);
    }
    if(url =="/Cento-Gusti/rezervacija.html"){
    //Obrada telefona

    
            
            if(!RegExZaTelefon.test(objTelefon.value) && objTelefon.value !=""){
                objTelefon.nextElementSibling.innerHTML = "Prvo slovo mora biti veliko";
                nizGreske.push("telefon");
            }
            else{
                objTelefon.nextElementSibling.innerHTML ="";
            }

    if(objTelefon.value==""){
        poruka +="Morate uneti broj telefona u polje!";
        document.querySelector("#ispis5").innerHTML=poruka;
        poruka=poruka.replace("Morate uneti broj telefona u polje!","");
        nizGreske.push("Telefon");
    }
    else{
        document.querySelector("#ispis5").innerHTML="";
        nizPodaci.push(objTelefon.value);
    }
    //Obrada datuma

    
                if(!RegExZaDatum.test(objDatum.value) && objDatum.value !=""){
                    objDatum.nextElementSibling.innerHTML = "Pogresan unos.Godina mora biti tekuca.";
                }
                else{
                    objDatum.nextElementSibling.innerHTML ="";
                    
                    
                }

    if(objDatum.value==""){
        poruka +="Morate uneti datum u polje!";
        document.querySelector("#ispis6").innerHTML=poruka;
        poruka=poruka.replace("Morate uneti datum u polje!","");
        nizGreske.push("datum");
    }
    else{
        document.querySelector("#ispis6").innerHTML="";
        nizPodaci.push(objDatum.value);
    }
    //Obrada vremena 
    
    if(!RegExZaVreme.test(objVreme.value) && objVreme.value !=""){
        objVreme.nextElementSibling.innerHTML = "Pogresan unos.Primer(23:24)";
        nizGreske.push("vreme");
        
    }
    else{
        objVreme.nextElementSibling.innerHTML ="";
        
    }


    if(objVreme.value==""){
        poruka +="Morate uneti vreme u polje!";
        document.querySelector("#ispis7").innerHTML=poruka;
        poruka=poruka.replace("Morate uneti vreme u polje!","");
        nizGreske.push("vreme");
    }
    else{
        document.querySelector("#ispis7").innerHTML="";
        nizPodaci.push(objVreme.value);
    }
    //obrada Broja Gostiju
    if(!RegExZaGoste.test(objGosti.value) && objGosti.value !=""){
        objGosti.nextElementSibling.innerHTML = "Ne moze vise od 20 osoba.";
        nizGreske.push("Gosti");
       
    }
    else{
        objGosti.nextElementSibling.innerHTML ="";
       
    }
    if(objGosti.value==""){
        poruka +="Morate uneti broj gostiju u polje!";
        document.querySelector("#ispis8").innerHTML=poruka;
        poruka=poruka.replace("Morate uneti broj gostiju u polje!","");
        nizGreske.push("Gosti");
    }
    else{
        document.querySelector("#ispis8").innerHTML="";
        nizPodaci.push(objGosti.value);
    }
   
}
    //obrada Tekstualnog polja
    
    
    if(objTekstualnoPolje.value==""){
        poruka +="Tekstualno polje ne moze da bude prazno.";
        document.querySelector("#ispis4").innerHTML=poruka;
        nizGreske.push("Tekstualno polje");
        
    }
    else{
        document.querySelector("#ispis4").innerHTML="";
        nizPodaci.push(objTekstualnoPolje.value);
    }
    //Obrada pola
    if(url == "/Cento-Gusti/index.html"){
    var vrednostPol="";
    for(let i =0;i <objPol.length;i++){
        if(objPol[i].checked){
            vrednostPol=objPol[i].value;
            break;
        }
    }
    var poruka = "<p class='text-white'>";
    if(vrednostPol==""){
        poruka+="Morate uneti pol"
        nizGreske.push("Morate izabrati pol.")
    }
    else{
        
        nizPodaci.push(vrednostPol);
        
    }

    poruka += "</p>";
    document.querySelector("#ispis").innerHTML = poruka;
    
}
console.log(nizPodaci);



    if(nizGreske.length !=0){
        console.log("Ima gresaka");
    }
    
    
console.log(nizPodaci);





}
function modal(){
if(nizPodaci.length = 9 && (url =="/Cento-Gusti/rezervacija.html" || url== "/Cento-Gusti/index.html")){
    const open=document.getElementById("buttonRegEx");
const modal_container=document.getElementById("modal_container");
const close = document.getElementById("close");

open.addEventListener('click',() => {
    modal_container.classList.add('show');
});

close.addEventListener('click',() => {
    modal_container.classList.remove('show');
});
}
    }
}

