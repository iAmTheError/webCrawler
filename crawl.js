const { JSDOM } = require('jsdom')
async function crawlPage(currentUrl,baseUrl,pages) {
    const baseUrlObj = new URL(baseUrl)
    const currentUrlObj = new URL(currentUrl)
    if(baseUrlObj.hostname!==currentUrlObj.hostname){
        return pages
    }
    const normalizeCurrentUrlObj = normalizeURL(currentUrl)
    if(pages[normalizeCurrentUrlObj]>0){
        pages[normalizeCurrentUrlObj]++
        return pages
    }
    
    pages[normalizeCurrentUrlObj]=1
    

    try{
        console.log(`Actively crawlig ${currentUrl}`)
        const resp = await fetch(currentUrl)
        if(resp.status>399){
            console.log(`Valid Url not provided status code: ${resp.status}`)
            return pages
        }
        const contentType = resp.headers.get("content-type")
        if(!contentType.includes("text/html")){
            console.log(`Invalid format of Data: ${contentType}`)
            return pages
        }
        const htmlBody = await resp.text()
        const nextUrls = getURLsfromHTML(htmlBody,baseUrl)  
        for(const nextUrl of nextUrls){
            pages = await crawlPage(nextUrl,baseUrl,pages)
        }      //console.log(resp.status)
    }
    catch(err){
        console.log(`Invalid URL: ${err.message}`)
    }
    return pages
    
}
function getURLsfromHTML(Htmlscript,baseUrl){
    const urls = []
    const dom = new JSDOM(Htmlscript)
    const aElements = dom.window.document.querySelectorAll('a')
    for(const aElement of aElements ){
        if(aElement.href.slice(0,1)==='/')
        {
            try{
                const url = new URL(`${baseUrl}${aElement.href}`)
                urls.push(url.href)
            }
            catch(err){
                console.log("invalid URL")
            }
        }
        else
        {
            try{
                const url = new URL(aElement.href)
                urls.push(aElement.href)
            }
            catch(err)
            {
                console.log("invalid URL")
            }
            
        }
    }
    return urls
}
function normalizeURL(urlString){
    const urlObj = new URL(urlString)
    const absoluteUrl =  `${urlObj.hostname}${urlObj.pathname}` 
    if(absoluteUrl.length>0&&absoluteUrl.slice(-1)==='/')
    {
        return absoluteUrl.slice(0,-1)
    }
    else{
        return absoluteUrl
    }
   }

    module.exports= {
        normalizeURL,
        getURLsfromHTML,
        crawlPage
    }