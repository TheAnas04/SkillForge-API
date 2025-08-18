import express from 'express'

const app = express();

app.use(express.json());

app.get('/health', (req, res) => {
  res.status(200).json({message: 'ok'});
})

app.listen(3000, ()=>{
  console.log("SkillForge API started...");
})