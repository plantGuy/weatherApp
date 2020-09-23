const http - require('https')

const request = https.request(url,(response)=>{
    let data = ''
    response.on('data', (chunk)=>{
        data = data + chunk.toString()
        
        
    })

    response.on('end',()=>{
        const body = JSON.parse(data)
        console.log(data)
    })
})

request.on('error', (error)=>{
    console.log('An error', error)
})


request.end()

module.exports = request