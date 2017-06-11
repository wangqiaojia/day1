var Mock=require("mockjs");



module.exports=[{
	route:"/app/index",
	handle:function(req,res,next,url){
		var Random=Mock.Random;
		var data=Mock.mock({
			"list|1-6":[{
				"first":"@string(lower,4)",
				"text":Random.cparagraph(1,3)
			}]
		})
		// var data=[
		// 	{
		// 		name:"lili"
		// 	},
		// 	{
		// 		name:"cici"
		// 	},
		// 	{
		// 		name:"xixi"
		// 	}
		// ]
		res.writeHead(200,{"content-Type":"application/json"})
      	res.write(JSON.stringify(data))
      	res.end()
	}
}]