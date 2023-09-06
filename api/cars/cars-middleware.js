const Cars=require('./cars-model')
const db=require('./../../data/db-config')
const vinValidator=require('vin-validator')

const checkCarId =async (req, res, next) => {
  try{
    const car=await Cars.getById(req.params.id)
    if (car){
      req.car=car
      next()
    }else{
      next({ status: 404,  message: `car with id ${req.params.id} is not found` })
    }

  }catch(err){
    next(err)
  }
  
}

const checkCarPayload = (req, res, next) => {
  const {vin,make,model,mileage}=req.body
  const errM={status:400}
  if (!vin){
    errM.message="vin is missing"
  } else if (!make){
    errM.message = "make is missing"
  } else if (!model) {
    errM.message = "model is missing"
  } else if (!mileage) {
    errM.message = "mileage is missing"
  } 

  if(errM.message){
    next(errM)
  }else{
    next()
  }

  

}

const checkVinNumberValid = (req, res, next) => {
  const vinValid=vinValidator.validate(req.body.vin)
  if(vinValid){
    next()
  }else{
    next({ status: 400, message: `vin ${req.body.vin} is invalid` })
  }
}

const checkVinNumberUnique = async (req, res, next) => {
  try{
    const carCheck = await db('cars').where('vin', req.body.vin).first()
    if (carCheck) {
      next({ status: 400, message: `vin ${req.body.vin} already exists` })
    } else {
      next()
    }

  }catch(err){
    next(err)
  }
  
}

module.exports={
  checkCarId, checkCarPayload, checkVinNumberValid, checkVinNumberUnique
}