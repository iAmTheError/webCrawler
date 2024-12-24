const { crawlPage } = require('./crawl.js')
async function main(){
if(process.argv.length<3){
    console.log("URL not provided")
}
if(process.argv.length>3){
    console.log("Too many arguments")
}
const baseUrl = process.argv[2]
console.log(`Crawling URL: ${baseUrl}`)
const pages = await crawlPage(baseUrl,baseUrl,{})
for(pge of Object.entries(pages)){
    console.log(pge)
}
}
main()
