const { JSDOM } = require('jsdom')
async function crawlPage(currentUrl) {
    try{
        console.log(`Actively crawlig ${currentUrl}`)
        const resp = await fetch(currentUrl)
        if(resp.status>399){
            console.log(`Valid Url not provided status code: ${resp.status}`)
            return
        }
        const contentType = resp.headers.get("content-type")
        if(!contentType.includes("text/html")){
            console.log(`Invalid format of Data: ${contentType}`)
            return
        }
        console.log(await resp.text())
        //console.log(resp.status)
    }
    catch(err){
        console.log(`Invalid URL: ${err.message}`)
    }
    
    
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