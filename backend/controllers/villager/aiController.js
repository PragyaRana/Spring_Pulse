const axios = require("axios")
const SpringData = require("../../models/villager/SpringData")

exports.getAIRisk = async(req,res)=>{

 try{

   const springId = req.params.springId

   const data = await SpringData
      .find({springId})
      .sort({date:-1})
      .limit(10)

   const history = data.map(d=>d.flowRate).reverse()

   const predict = await axios.post(
      "http://127.0.0.1:8000/predict",
      {flowHistory:history}
   )

   const health = await axios.post(
      "http://127.0.0.1:8000/health",
      {flowHistory:history}
   )

   res.json({
      predictedFlow: predict.data.predictedFlow,
      riskLevel: predict.data.riskLevel,
      healthScore: health.data.healthScore,
      status: health.data.status
   })

 }catch(err){

   res.status(500).json({error:err.message})

 }

}