$(window).on('scroll',function(){
    if($(window).scrollTop()){
       header.classList.add('border-bottom-color');
    }
    else{
       header.classList.remove('border-bottm-color');
    }
})