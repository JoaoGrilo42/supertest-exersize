const request = require('supertest')

req = request('https://jsonplaceholder.typicode.com')

describe('Supertests', () => {
    jest.setTimeout(30000)
    it('Test Posts', (done) =>{
        req.get('/posts/1')
        .expect(200)
        .expect({
            "userId": 1,
            "id": 1,
            "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
            "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
          })
        .end(done)
    })

    it('tests albums/1/photos', (done) =>{
        req
        .get('/albums/1/photos')
        .set('Accept', 'application/json')
        .expect((res) => {
            if(res.body.length < 50) throw new Error("invalid result");
        })
        .end(done)
    })

    it('tests users/1/albums', (done) => {
        req
        .post('/users/1/albums')
        .send('{"userId": "1", "title": "blah"}')
        .set('Accept', 'application/json')        
        .expect(201)
        .end(done)
    })
    it('tests users/1/todos', (done) =>{
        req
        .get('/users/1/todos')
        .set('Accept', 'application/json')
        .expect((res) => {
            console.log("try this: " + res.body[0].completed)
            if(res.body[0].completed === true) throw new Error(JSON.stringify(res.body));
        })
        .end(done)
    })

    it('tests users/1/posts', (done) =>{
        req
        .get('/users/1/posts')
        .set('Accept', 'application/json')
        .expect((res) => {
            console.log(res.body[0].body)
            if(res.body[0].body !== 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto') throw new Error(JSON.stringify(res.body));
        })
        .end(done)
    })
})
