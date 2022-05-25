var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
var ProductModel = require('./productschema');
var UserModel=require('./Userschema');
 
// Connecting to database
var query = 'mongodb://localhost:27017/boutique';
    
const db = (query);
mongoose.Promise = global.Promise;
 
mongoose.connect(db, { useNewUrlParser : true,
useUnifiedTopology: true }, function(error) {
    if (error) {
        console.log("Error!" + error);
    }
});

 //ajout d'un produit
 router.post('/save/product', function(req, res) {
    var newProduct = new ProductModel();
            newProduct.Name = req.body.Name;
            newProduct.Description = req.body.Description;
            newProduct.Price = req.body.Price;
            newProduct.Stock= req.body.Stock;
            newProduct.Image = req.body.Image;
            newProduct.UserId = req.body.UserId;
            newProduct.CreatedAt = req.body.CreatedAt;
            //res.setHeader('content-type', 'application/json');
         
            newProduct.save(function(err, data){
           if(err){
               console.log(error);
           }
           else{
               res.send("Data inserted");
           }
       });
    });
 
//ajout d'un Utilisateur
router.post('/user/save', function(req, res) {
        var newUser = new UserModel();
            newUser.username=req.body.username
            newUser.firstname=req.body.firstname
            newUser.lastname =req.body.lastname
            newUser.email =req.body.email
            newUser.password=req.body.password  
         
            newUser.save(function(err, data){
           if(err){
               console.log(error);
           }
           else{
               res.send("User inserted");
           }
       });
    });

   


    ///recuperer les données
    router.get('/product/findall', function(req, res) {
        ProductModel.find(function(err, data) {
            if(err){
                console.log(err);
            }
            else{
                res.send(data);
            }
        });  
     });

     ///recuperer les utilisateurs
    router.get('/user/findall', function(req, res) {
        UserModel.find(function(err, data) {
            if(err){
                console.log(err);
            }
            else{
                res.send(data);
            }
        });  
     });
 
     router.get('liste/user/:id',function(req, res){
        UserModel.findById({ _id: req.params.id},
        function(err, data){
            if(err){
                console.log(err);
            }else{
                console.log(req.params.id);
                res.send(data);
                console.log(data);
            }
        });
    })

  
     //suppression produit
router.delete('/delete/produit:id',function(req, res){
    ProductModel.remove({ _id: req.params.id},
    function(err, data){
        if(err){
            console.log(err);
        }else{
            console.log(req.params.id);
            res.send(data);
            console.log("Supression Reussie!");
        }
    });
})
//suppression user
router.delete('/delete/user:id',function(req, res){
    UserModel.remove({ _id: req.params.id},
    function(err, data){
        if(err){
            console.log(err);
        }else{
            console.log(req.params.id);
            res.send(data);
            console.log("Supression Reussie!");
        }
    });
})

//Affichage produit par id
router.get('/produits/:id',function(req, res){
    ProductModel.findById({ _id: req.params.id},
    function(err, data){
        if(err){
            console.log(err);
        }else{
            console.log(req.params.id);
            res.send(data);
            //console.log("data deleted !");
        }
    });
})

//modification
router.put('/update/produit:id',function(req, res){
    ProductModel.findById({ _id: req.params.id},
    function(err, data){
        if(err){
            console.log(err);
        }else{
            data.Name = req.body.Name;
            data.Description = req.body.Description;
            data.Price = req.body.Price;
            data.Stock = req.body.Stock;
            data.Image = req.body.Image;
            data.UserId = req.body.UserId;
            data.CreatedAt = req.body.CreatedAt;
            data.save(function(err){
               if(err){ res.send(err)}
               res.send('Mise a jour ok !');
            })
            
           
        }
    });
})
//Modification user
router.put('/update/user:id',function(req, res){
    UserModel.findById({ _id: req.params.id},
    function(err, data){
        if(err){
            console.log(err);
        }else{
            data.username=req.body.username
            data.firstname=req.body.firstname
            data.lastname =req.body.lastname
            data.email =req.body.email
            data.password=req.body.passwor
            data.save(function(err){
               if(err){ res.send(err)}
               res.send('Mise a jour ok !');
            })
            
           
        }
    });
})

module.exports = router;