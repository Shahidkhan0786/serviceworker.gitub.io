//service worker file
const cacheName  = "v2";
const cacheAsserts = [
    'index.html',
    'contact.html',
    './js/main.js'
];
//call install event

//attach event listener to the worker
self.addEventListener('install' , (event)=>{
    console.log('serviceWorker : installd')

    //waituntil tell our brower waint until the promise is resolved
    event.waitUntil(
        caches
        .open(cacheName)
        .then(cache=>{
            console.log("serviceWorker : cacheing files")
            cache.addAll(cacheAsserts)
        })
        .then(()=> self.skipWaiting()) 
    );
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
        fetch(e.request).catch(e=> {
            console.log('logggg', document.getElementById("offlinebtn"))
            caches.match(e.request)
        })
    )
})
