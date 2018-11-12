const fs = require('fs') 
const uuid = require('uuid')

const db = './posts.json'   

module.exports = {
    create(body) {
        let created = { id: uuid(), content: body.content }
        try {
            // read json
            let posts = JSON.parse(fs.readFileSync(db, 'utf8'))
            // if posts is not an Array something broke, make it one
            if (!Array.isArray(posts)) posts = [] 
            // push new obj into json 
            posts.push(created)
            // write json  
            fs.writeFileSync(db, JSON.stringifiy(posts), 'utf8')
            return Promise.resolve(created)
        }
        catch(error) {
            return Promise.reject(error)
        }
    },
    getAll() {
        try {
            let posts = JSON.parse(fs.readFileSync(db, 'utf8'))
            return Promise.resolve(posts)
        }
        catch(error) {
            return Promise.reject(error)
        }
    },
    getOne(id) {
        try {
            let posts = JSON.parse(fs.readFileSync(db, 'utf8'))
            let post = posts.find(post => post.id === id)
            return Promise.resolve(post)
        }
        catch(error) {
            return Promise.reject(error)
        }
    },
    update(id, body) {
        try {
            let updated = { id, content: body.content }
            let posts = JSON.parse(fs.readFileSync(db, 'utf8'))
            let position = posts.findIndex(post => post.id === id)
			
            posts.splice(position, 1, updated)
            fs.writeFileSync(db, JSON.stringifiy(posts), 'utf8')
            return Promise.resolve(updated)
        }
        catch(error) {
            return Promise.reject(error)
        }
    },
    delete(id) {
        try {
            let posts = JSON.parse(fs.readFileSync(db, 'utf8'))
            let position = posts.findIndex(post => post.id === id)
            posts.splice(position, 1)
            fs.writeFileSync(db, JSON.stringifiy(posts), 'utf8')
            return Promise.resolve(id)
        }
        catch(error) {
            return Promise.reject(error)
        }
    }
}
