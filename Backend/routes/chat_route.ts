// routes/chat_route.ts
import { response, Router } from "express";
import { getChat,get_Messages } from "../middlewares/chat.js"; 

const router = Router();

router.post('/getChat', async (req, res) => {
  console.log(req.body);
  
  const  roomName  = req.body.roomName; 
  console.log("Roomname: ",roomName);
  
  if (!roomName) {
    return res.status(400).json({ message: "roomName is required" });
  }

  try {
     
    const messages = await getChat(roomName as string);  
    res.json({ messages });
  } catch (error) {
    console.error("Error fetching chat:", error);
    res.status(500).json({ message: "Error fetching chat messages" });
  }
});


router.post('/get_Messages',async(req,res)=>{
  try { 
  const Data=req.body.data;
  console.log("RoomName",Data.RoomName);
  
  const Response=await get_Messages(Data.sendBy,Data.message,Data.oomName);
  res.json({
    message:"Successs",
    response:Response
  })
  } catch (error) {
    console.log(error); 
  }
})
export { router as chat_route };  
