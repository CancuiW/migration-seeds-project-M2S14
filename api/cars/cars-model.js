const db=require('./../../data/db-config')

const getAll = () => {
  return db('cars')
}

const getById = (id) => {
  return db('cars').where('id',id).first()
}

const create = async (newItem) => {
  const [newNum]= await db('cars').insert(newItem)
  return await getById(newNum)
}

module.exports={
  getAll,getById,create
}
