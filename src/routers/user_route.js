const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')
const multer = require('multer')
const {sendWelcomeEmail,sendRemoveEmail} = require('../emails/accounts')

const router = express.Router()

router.post('/users', async (req, res) => {

    const user = new User(req.body)
    try {
        await user.save()
        await sendWelcomeEmail(user.Email,user.Name)
        res.status(201).send(user)
    } catch (e) {
        console.log(e)
        res.status(400).send()
    }
})


router.post('/users/logout', auth, async (req, res) => {
    try {
      
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token != req.token
        })
        await req.user.save()
        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

router.post('/users/logoutall',auth,async(req,res)=>{
    try {
        req.user.tokens =[]
      await  req.user.save()
      res.send()
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/users/me', auth, async (req, res) => {
    res.send(req.user)
})

// router.patch('/users/:id', async (req, res) => {
//     const Updates = Object.keys(req.body)
//     const allowedUpdate = ['Name', 'Age', 'Password', 'Email']
//     const isvalidate = Updates.every((update) => allowedUpdate.includes(update))
//     if (!isvalidate) {
//         return res.status(404).send({ error: 'Invalid Updated!' })
//     }
//     try {
//         if (!user) {
//             res.status(404).send()
//         }

//         //const user = await User.findByIdAndUpdate(_id,req.body,{new:true,runValidators:true})

//         const user = await User.findById(req.params.id)
//         Updates.forEach((update) => {
//             user[update] = req.body[update]
//         })
//         console.log(user)
//         await user.save()

//         res.status(200).send()
//     } catch (e) {
//         res.status(400).send()
//     }
// })

router.post('/users/login', async (req, res) => {
    try {

        const user = await User.findByCredential(req.body.Email, req.body.Password)
        const token = await user.generateTokenAuth()
        res.send({ user, token })

    } catch (e) {
        res.status(400).send()
    }
})
router.patch('/users/me', auth,async (req, res) => {
    const Updates = Object.keys(req.body)
    const allowedUpdate = ['Name', 'Password', 'Email', 'Age']
    const isvaliedate = Updates.every((update) => allowedUpdate.includes(update))
    if (!isvaliedate) {
        console.log(Updates)
        return res.status(400).send({ error: 'Invalid udpateds' })
    }
    try {

        //  const user = await User.findByIdAndUpdate(_id,req.body,{runValidators:true,new:true})
        // const user = await User.findById(req.user._id)
        Updates.forEach((update) => req.user[update] = req.body[update])
        req.user.save()
        res.send(req.user)
    } catch (e) {
        res.status(400).send({ error: 'Something went wrong' })
    }
})

router.delete('/users/me',auth, async (req, res) => {
    const _id = req.user._id
    try {
        // const user = await User.findByIdAndDelete(_id)
        // if (!user) {
        //     res.status(400).send('No user found!')
        // }
        // await res.send(user)
        //same work remove as above

        await req.user.remove()
        sendRemoveEmail(user.Email,user.Name)
        res.send(req.user)
    } catch (e) {
        res.status(500).send(e)
    }


})

const upload = multer({
    limits:{
        fileSize:1000000
    },
    filerFilter(req,file,cd){
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
        return  cb(new Error('Please upload jpg,jpeg or png file'))
        }
        cb(undefined,true)
    }
})

router.post('/users/me/avatar', auth, upload.single('avatar'), async (req,res) => {

    req.user.avatar = req.file.buffer
    req.user.save()
    res.send()

},(error,req,res,next)=>{
    res.status(400).send({error:error.message})
})

router.delete('/users/me/avatar',auth,async(req,res)=>{
    try {
        req.user.avatar = undefined
        await req.user.save()
        res.send(req.user)
    } catch (e) {
        res.status(404).send()
    }
    
})

router.get('/users/:id/avatar',async (req,res) =>{
try {
        const user = await User.findById(req.params.id)

        if(!user || !user.avatar ){
            
            throw new Error()
        }

         res.set('Content-Type','image/jpg')
         res.send(user.avatar)

} catch (e) {
    res.status(404).send()
    
}
})




module.exports = router