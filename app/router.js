var ObjectID = require('mongodb').ObjectID


module.exports = function (app,db){
    app.get('/notes/',(req,res)=>{
        const id = req.query.id
        const details = {'_id': ObjectID(id)}
       db.collection('notes').findOne(details,(err,item)=>{
        if(err){
            res.send({'error': 'An error has occured'})
        }
        else{
            res.send(item)
        }
       })
    })
    app.delete('/notes/:id',(req,res)=>{
        const id = req.params.id
        const details = {'_id': new ObjectID(id)}
       db.collection('notes').remove(details,(err,item)=>{
        if(err){
            res.send({'error': 'An error has occured'})
        }
        else{
            res.send('Note ' + id+' is deleted');
        }
       })
    })
    app.put('/notes/:id',(req,res)=>{
        const id = req.params.id
        const details = {'_id': new ObjectID(id)}
        const note = {text:req.body.body,title:req.body.title}
       db.collection('notes').update(details,note,(err,item)=>{
        if(err){
            res.send({'error': 'An error has occured'})
        }
        else{
            res.send(item)
        }
       })
    })
    app.post('/notes/',(req,res)=>{
        const note = {text:req.body.body,title:req.body.title}
        db.collection('notes').insert(note,(err,result)=>{
                if(err){
                    res.send({'error': 'An error has occured'})
                }
                else{
                    res.send(result.ops[0])
                }
        })
    })
    // app.get('/notes/all',(req,res)=>{
        
    //   db.collection('notes').find({}).toArray(function(err,result){

    //     if(err)
    //     res.send({'error': 'An error has occured'})
    //     else{
    //         res.send(result)
    //     }
    //   })
       
    // })
    app.get('/notes/all',(req,res)=>{
        
        db.collection('notes').find({}).toArray(function(err,result){
          if(err)
          res.send({'error': 'An error has occured'})
          else{
              res.send(result)
          }
        })
         
      })
}