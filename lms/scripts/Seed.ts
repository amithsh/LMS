const {PrismaClient} = require("@prisma/client")

const database = new PrismaClient()

async function main() {

    try{
         await database.category.createMany({
            data:[
                {name:"computer science"},
                {name:"science"},
                {name:"fitness"},
                {name:"photography"},
                {name:"accounting"},
                {name:"engineering"},
                {name:"filming"}
            ]
         })

         console.log("success")

    }catch(error){
        console.log("error seeding the database", error)
    }finally{
        await database.$disconnect
    }
}

main()