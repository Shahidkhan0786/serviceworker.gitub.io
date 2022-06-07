//service worker file
const cacheName  = "v1";
// const cacheAsserts = [
//     'index.html',
//     'contact.html',
//     'about.html',
//     './js/main.js'
// ];
//call install event

//attach event listener to the worker
self.addEventListener('install' , (event)=>{
    console.log('serviceWorker : installd')
})

//call activate the eveent
self.addEventListener('activate' , (event)=>{
    console.log('serviceWorker : activate')
    //remove unwanted cache
    console.log(caches.keys())
    event.waitUntil(
        caches.keys().then(cacheNames =>{
            return Promise.all(
                cacheNames.map(cache=>{
                    if(cache !== cacheName){
                        console.log("serviceWorkwer : clearing old cache")
                        caches.delete(cache)
                    }
                })
            )
        })
    )

})

// call fetch event

self.addEventListener('fetch' , e=>{
    console.log("serviceWorker: fetched")
    // console.log('///////',e.request)
    e.respondWith(
        fetch(e.request).then(res=>{
            //make a copy/clone of response
            const resclone = res.clone();
            //open cache
            caches.open(cacheName)
            .then(cache=>{
                cache.put(e.request,resclone)
            }) 
            return res;
        }).catch(e=> caches.match(e.request).then(res=>res))
    )
})
