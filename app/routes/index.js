import userRoute from "./user.js"
import EmployRoute from "./employ.js"
import LeadRoute from "./lead.js"
import dashboardRoutes from "./dashboard.js";





const setupRoutes=(app)=>{
    app.use("/user",userRoute);
    app.use("/employ",EmployRoute);
    app.use("/lead",LeadRoute);
app.use("/dashboard", dashboardRoutes);

}

export default setupRoutes;