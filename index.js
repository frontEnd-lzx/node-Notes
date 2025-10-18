const process = require('node:process')

console.log(process.cwd()) //返回当前的工作目录
console.log(process.argv)  //获取执行进程后面的参数 返回是一个数组 后面我们讲到命令行交互工具的时候会很有用，各种cli脚手架也是使用这种方式接受配置参数例如webpack
console.log(process.arch)  //返回操作系统 CPU 架构 跟之前的os.arch 一样

console.log(process.memoryUsage)
// 用于获取当前进程的内存使用情况。该方法返回一个对象，其中包含了各种内存使用指标，如 rss（Resident Set Size，常驻集大小）、heapTotal（堆区总大小）、heapUsed（已用堆大小）和 external（外部内存使用量）等

// process.exit()  // 将强制进程尽快退出，即使仍有未完全完成的异步操作挂起
// process.kill //与exit类似，kill用来杀死一个进程，接受一个参数进程id可以通过process.pid 获取

console.log(process.env) //用于读取操作系统所有的环境变量，也可以修改和查询环境变量。
// 修改 注意修改并不会真正影响操作系统的变量，而是只在当前线程生效，线程结束便释放。