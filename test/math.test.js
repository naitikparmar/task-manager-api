const { Celcius , Farenhit,sum } = require('../src/test/math')



test('converting celcius to FArenhit ',()=>{
const temp = Farenhit(0)
expect(temp).toBe(32)
//expect(f).toBe(0)
})

test(' Converting Farenhit to celsius',()=>{
    const temp = Celcius(32)
    expect(temp).toBe(0)
})

test('Adding two number ',async () =>{
    const add = await sum(10,12)
    expect(add).toBe(22)
})
test('Adding two num using done()',(done)=>{
    const h = sum(10,12)
    done()
})

// test('Error',()=>{
//     throw new Error('Error found !s')
// })