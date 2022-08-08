
const popCta =  () => {
    var ctaBtn = document.querySelector(".cta");
    ctaBtn.addEventListener('click',()=>{
        document.location = 'login.html';
    });
}

const popup = (text) => {
    const dom = document.querySelector("body");
    dom.insertAdjacentHTML("afterbegin", '<div class="popup_wrapper"><div class="popup_content"><h1 class="popup_text">'+text+'</h1><div class="cta">Re-Start</div></div></div>');
    popCta();
}


export default popup;