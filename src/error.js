setTimeout(()=> {
    throw new Error('oops')
}, 300)

process.on('unhandledException', () => {

})

process.on('uncaughtRejection', () => {
    
})