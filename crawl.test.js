const { normalizeURL } = require('./crawl.js')
const { getURLsfromHTML } = require('./crawl.js')
const { test,expect } = require('@jest/globals')

test('normalizeURL strip protocol',()=>{
    const input = 'https://google.com/heyyou'
    const actual = normalizeURL(input)
    const expected = 'google.com/heyyou'
    expect(actual).toEqual(expected)
})
test('normalizeURL remove /',()=>{
    const input = 'https://google.com/heyyou/'
    const actual = normalizeURL(input)
    const expected = 'google.com/heyyou'
    expect(actual).toEqual(expected)
})
test('normalizeURL remove capitalisation',()=>{
    const input = 'https://google.com/heyyou/'
    const actual = normalizeURL(input)
    const expected = 'google.com/heyyou'
    expect(actual).toEqual(expected)
})
test('normalizeURL strip http',()=>{
    const input = 'http://google.com/heyyou/'
    const actual = normalizeURL(input)
    const expected = 'google.com/heyyou'
    expect(actual).toEqual(expected)
})
test('Extract absolute Url from Html',()=>{
    const inputHtml = `
    <html>
        <body>
            <a href="https://google.com/heyyou/">
        </body>
    </html>
    `
    const baseURL = "https://google.com/heyyou"
    const actual = getURLsfromHTML(inputHtml,baseURL)
    const expected = ['https://google.com/heyyou/']
    expect(actual).toEqual(expected)
})
test('Extract realative Url from Html',()=>{
    const inputHtml = `
    <html>
        <body>
            <a href="/heyyou/">
        </body>
    </html>
    `
    const baseURL = "https://google.com"
    const actual = getURLsfromHTML(inputHtml,baseURL)
    const expected = ['https://google.com/heyyou/']
    expect(actual).toEqual(expected)
})
test('Extract absolute and realative Url from Html',()=>{
    const inputHtml = `
    <html>
        <body>
            <a href="/heyyou/">
            <a href="https://google.com/heyyou2/">
        </body>
    </html>
    `
    const baseURL = "https://google.com"
    const actual = getURLsfromHTML(inputHtml,baseURL)
    const expected = ['https://google.com/heyyou/','https://google.com/heyyou2/']
    expect(actual).toEqual(expected)
})
test('getURLsfromHtml invlid url',()=>{
    const inputHtml = `
    <html>
        <body>
            <a href="invalid">
        </body>
    </html>
    `
    const baseURL = "https://google.com"
    const actual = getURLsfromHTML(inputHtml,baseURL)
    const expected = []
    expect(actual).toEqual(expected)
})