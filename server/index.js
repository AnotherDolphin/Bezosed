import express from 'express'
import cors from 'cors'
import fetch from 'node-fetch'
import {MongoClient} from 'mongodb'

const client = await MongoClient.connect("mongodb://localhost:27017")
const db = client.db('bezosed')

const checkTransactions = async () => {
  // check api for new transactions
  let response = await fetch('https://oaosman84.github.io/statics/mock_transaction_data')
  let updates = await JSON.parse(await response.text())
  let lastTransaction = updates.at(-1)
  let transactionsOnDb = await db.collection('transactions')
  let lastTransactionOnDb = await transactionsOnDb.findOne({}, {sort: {id: -1}})
  if (lastTransactionOnDb == null) lastTransactionOnDb = {id: -1}
  if (lastTransaction.id == lastTransactionOnDb.id) return

  // add updates to db
  let idsToUpdate = lastTransaction.id - lastTransactionOnDb.id
  let bezosed = await db.collection('bezosed').findOne({id: 'list'})
  let bezosedList = bezosed.names

  for (let i of Array(idsToUpdate).keys()) {
    let temp = updates[lastTransactionOnDb.id + 1 + i]
    if(bezosedList.includes(temp.merchant_name)) temp.bezosed = true
    transactionsOnDb.insertOne(temp)
  }
}

checkTransactions()
// poll transaction api every 5 mins
setInterval(async () => {
    checkTransactions()
}, 300000);

const app = express()
app.use(cors())
app.use(express.json())
app.listen(3000);
console.log("Listening on port 3000");

app.get('/transactions', async (req, res, next) => {
  let data = await db.collection('transactions').find().toArray()
  res.send(data)
})

app.put('/reassign',  async (req, res, next) => {
  let company = req.body.company
  let list = await db.collection('bezosed').findOne({id: 'list'})
  let isBezosed = list.names.includes(company) ? true : false
  if (isBezosed) db.collection('bezosed').updateOne({id: 'list'}, {$pull:{names: company}})
  else db.collection('bezosed').updateOne({id: 'list'}, {$push:{names: company}})
  await db.collection('transactions').updateMany({merchant_name: company}, {$set:{bezosed: !isBezosed}})
  res.sendStatus(200)
})