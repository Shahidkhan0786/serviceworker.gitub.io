//register serviceworker file

//check service worker is suported in browser

if('serviceWorker' in navigator){
    //register serviceworker when window loads
    window.addEventListener('load' , ()=>{
        navigator.serviceWorker.register('../sw_cached_response.js')
        .then( reg =>{
            console.log('serviceWorker : Registered')
        })
        .catch(err =>{
            console.log(`serviceWorker error : ${err}`)
        })
    })
}