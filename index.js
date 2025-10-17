// 都是在windows环境下测试

// const fs = require('node:fs')
const path = require('node:path')

// 单纯的文件名 + 扩展名
const res = path.basename('C:/temp/myfile.html'); // myfile.html
// 或者这样
path.win32.basename('C:/temp/myfile.html'); // myfile.html
console.log("🚀 ~ :4 ~ res:", res)

// 目录
const res1 = path.dirname('/aaaa/bbbb/cccc/index.html') // /aaaa/bbbb/cccc
console.log("🚀 ~ :7 ~ res1:", res1)

// 扩展名
// 如果有多个 . 返回最后一个 如果没有扩展名返回空
const res2 = path.extname('/aaaa/bbbb/cccc/index.html.ccc.ddd.aaa') // .aaa
console.log("🚀 ~ :12 ~ res2:", res2)

// join
const res3 = path.join('/foo','/cxk','/ikun') // \foo\cxk\ikun
console.log("🚀 ~ :18 ~ res3:", res3)
// 在 Windows 上分隔符是 \，所以不管你传入的是 / 还是 \，最终都会变成反斜杠。于是得到 \foo\cxk\ikun。
// 或者这样
const res4 = path.posix.join('/foo','/cxk','/ikun') // \foo\cxk\ikun
console.log("🚀 ~ :22 ~ res4:", res4)

// resolve
const res6 = path.resolve('/aaa','/bbb','/ccc') //  D:\ccc
const res5 = path.posix.resolve('/aaa','/bbb','/ccc') //   /ccc
console.log("🚀 ~ :27 ~ res6:", res6)
console.log("🚀 ~ :26 ~ res5:", res5)

const res7 = path.resolve(__dirname,'./index.js') // D:\project-node\node-Notes\index.js
console.log("🚀 ~ :34 ~ res7:", res7)

const res8 = path.resolve('./index.js') // 返回工作目录 + index.js  D:\project-node\node-Notes\index.js
console.log("🚀 ~ :39 ~ res8:", res8)

// path.parse path.format
// path.format 和 path.parse 正好互补
const res9 = path.parse('/home/user/dir/file.txt')
// console.log("🚀 ~ :45 ~ res9:", res9)
/* 
    {
    root: '/', 
    dir: '/home/user/dir',
    base: 'file.txt',
    ext: '.txt',
    name: 'file'
    } 
*/

/* 
    root：路径的根目录，即 /。
    dir：文件所在的目录，即 /home/user/documents。
    base：文件名，即 file.txt。
    ext：文件扩展名，即 .txt。
    name：文件名去除扩展名，即 file。 
*/

const res10 = path.format({ // /home/user/documents\file.txt
    root: '/',
    dir: '/home/user/documents',
    base: 'file.txt',
    ext: '.txt',
    name: 'file'
 })
 console.log("🚀 ~ :70 ~ res10:", res10) // 

 path.posix.format({ // /home/user/documents/file.txt
    root: '/',
    dir: '/home/user/documents',
    base: 'file.txt',
    ext: '.txt',
    name: 'file'
 })
