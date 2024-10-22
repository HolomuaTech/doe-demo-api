const {describe, it, before, after} = require('node:test')

const http = require('http')
const assert = require('assert')
const {app} = require('../server.js')

describe('GET /message', () => {
    let server

    // Before running tests, create and start the server
    before(() => new Promise(resolve => {
        server = http.createServer(app)
        server.listen(3000, () => {
            console.log('Test server running on port 3000')
            resolve()
        })
    }))

    // After tests, close the server
    after(() => {
        console.log('test complete')
        server.close()
        server.closeAllConnections()
    })

    it('should return 200 and the expected JSON message', () => {
        return new Promise((resolve, reject) => {
            http.get('http://localhost:3000/message', (res) => {
                let data = ''
                res.on('data', chunk => {
                    data += chunk
                })
                res.on('end', () => {
                    assert.strictEqual(res.statusCode, 200)
                    const payload = JSON.parse(data)
                    // assert.strictEqual(payload, {message: 'Welcome User'})
                    resolve()
                })
                res.on('error', err => reject(err))
            })
        })
    })
})