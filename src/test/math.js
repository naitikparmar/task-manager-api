 const Farenhit =('calculting celcius to farenhit !!',(temp)=>{
return (temp * 1.8) + 32
 })

 const Celcius = ('calculating farenhit to celcius !!',(temp)=>{
     return (temp -32 ) / 1.8
 })

 const sum = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(a + b)
        }, 2000);
    })
}

 module.exports={
     Farenhit,
     Celcius,
     sum
 }