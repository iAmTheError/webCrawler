const { crawlPage } = require('./crawl.js')
function main(){
if(process.argv.length<3){
    console.log("URL not provided")
}
if(process.argv.length>3){
    console.log("Too many arguments")
}
const baseUrl = process.argv[2]
console.log(`Crawling URL: ${baseUrl}`)
crawlPage(baseUrl)
}
main()
