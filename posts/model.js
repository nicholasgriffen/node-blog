const fs = require('fs') 
const uuid = require('uuid')

const db = './backup.data'
const schema = /id: (.*), content: (.*)}/

module.exports = {
    create(body) {
        let created = { id: uuid(), content: body.content }
        try {
            fs.appendFileSync(db, `{id: "${created.id}", content: ${created.content}};`, 'utf8')
            return Promise.resolve(created)
        }
        catch(error) {
            return Promise.reject(error)
        }
    },
    getAll() {
        try {
            let posts = fs.readFileSync(db, 'utf8').split(';')
            return Promise.resolve(posts.map(post => {
                let [, id, content ] = schema.exec(post)
                return { id, content }
            }))
        }
        catch(error) {
            return Promise.reject(error)
        }
    },
    getOne(param) {
        try {
            let posts = fs.readFileSync(db, 'utf8').split(';')
            let position = posts.findIndex('{id: '+ param)
            let [, id, content ] = schema.exec(posts[position])
            return Promise.resolve({ id, content })
        }
        catch(error) {
            return Promise.reject(error)
        }
    },
    update(id, body) {
        try {
            let updated = { id, content: body.content }
            let posts = fs.readFileSync(db, 'utf8').split(';')
            let position = posts.findIndex(`{id: ${id}`)
			
            posts.splice(position, 1)
            posts.push(`{id: "${updated.id}", content: ${updated.content}}`)
            fs.writeFileSync(db, posts.join(';'), 'utf8')
            return Promise.resolve(updated)
        }
        catch(error) {
            return Promise.reject(error)
        }
    },
    delete(id) {
        try {
            let backup = fs.readFileSync(db, 'utf8').split(';')
            let position = backup.findIndex(`{id: ${id}`)
            backup.splice(position, 1)
            fs.writeFileSync(db, backup.join(';'), 'utf8')
            return Promise.resolve(id)
        }
        catch(error) {
            return Promise.reject(error)
        }
    }
}
