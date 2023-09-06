// STRETCH
const cars=[
    {
     vin:'1FTEX1C85AFB83192',
     make:'toyota',
     model:'prius',
     mileage:215000,
     title:'clean',
     transmission:'manual' 
    },
    {
        vin: 'KNAFT4A22D5675895',
        make: 'toyota',
        model: 'corolla',
        mileage: 115000,
        title: 'salvage',
       
    },
    {
        vin: 'JH4DA9370PS000721',
        make: 'ford',
        model: 'focus',
        mileage: 15000,
      
      
    }
]

exports.seed=async function(knex){
    await knex('cars').truncate()
    await knex('cars').insert(cars)
}