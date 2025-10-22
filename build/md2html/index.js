const ejs = require('ejs'); // 导入ejs库，用于渲染模板
const fs = require('node:fs'); // 导入fs模块，用于文件系统操作
const path = require('node:path'); 
const marked = require('marked'); // 导入marked库，用于将Markdown转换为HTML
const browserSync = require('browser-sync'); // 导入browser-sync库，用于实时预览和同步浏览器
const url  = path.resolve(__dirname, './template/README.md')
const readme = fs.readFileSync(url); // 读取README.md文件的内容
const openBrowser =  () => {
    const browser = browserSync.create()
    const baseDir = path.join(__dirname, '/template')
    browser.init({
        server: {
            baseDir,
            index: './index.html',
        }
    })
    return browser
}

ejs.renderFile('build/md2html/template/template.ejs', { //ejs它可以帮助我们在HTML中嵌入动态内容
    content: marked.parse(readme.toString()),
    title:'markdown to html'
},(err,data)=>{
    if(err){
        console.log(err)
    }
    const basename = './index.html'
    const url = path.join(__dirname, '/template')
    const baseDir = path.resolve(url, basename)
    let writeStream = fs.createWriteStream(baseDir)
    writeStream.write(data)
    writeStream.close()
    writeStream.on('finish',()=>{
        openBrowser()
    })
})     

// const baseUrl = '/build/md2html/template'
// console.log(__dirname)
// const url  = path.resolve(baseUrl,'./index.js')
// console.log("🚀 ~ :44 ~ url:", url)
