module.exports=[24361,(e,t,r)=>{t.exports=e.x("util",()=>require("util"))},14747,(e,t,r)=>{t.exports=e.x("path",()=>require("path"))},27699,(e,t,r)=>{t.exports=e.x("events",()=>require("events"))},92509,(e,t,r)=>{t.exports=e.x("url",()=>require("url"))},21517,(e,t,r)=>{t.exports=e.x("http",()=>require("http"))},24836,(e,t,r)=>{t.exports=e.x("https",()=>require("https"))},6461,(e,t,r)=>{t.exports=e.x("zlib",()=>require("zlib"))},54799,(e,t,r)=>{t.exports=e.x("crypto",()=>require("crypto"))},86506,e=>{"use strict";var t=e.i(18843);let r=new t.default.Schema({username:{type:String,required:!0},email:{type:String,required:!0,unique:!0},mobile:{type:String,required:!1,unique:!0,sparse:!0},password:{type:String,required:!1},image:{type:String},role:{type:String,default:"user"}},{timestamps:!0}),i=t.default.models.User||t.default.model("User",r);e.s(["User",0,i])},46786,(e,t,r)=>{t.exports=e.x("os",()=>require("os"))},2788,e=>{"use strict";var t=e.i(5509),r=e.i(20688),i=e.i(86506),o=e.i(18843);let s=new o.default.Schema({propertyId:{type:o.default.Schema.Types.ObjectId,ref:"Property",required:!0},recipientEmail:{type:String,required:!0},sentAt:{type:Date,default:Date.now},date:{type:String,required:!0}},{timestamps:!0});s.index({date:1,propertyId:1});let a=o.default.models.EmailNotification||o.default.model("EmailNotification",s),l=t.default.createTransport({service:"gmail",auth:{user:process.env.EMAIL_USER,pass:process.env.EMAIL_PASS}}),n=()=>new Date().toISOString().split("T")[0],p=async e=>{await (0,r.connectToDB)();let t=n();return await a.countDocuments({propertyId:e,date:t})};async function c(e){try{await (0,r.connectToDB)();let t=n(),o=await p(e._id);if(o>=10)return console.log(`⚠️ Daily email limit reached (10) for property ${e._id}`),{success:!1,message:"Daily email limit reached"};let s=await i.User.find({email:{$ne:e.userEmail},mobile:{$not:/^G-/}}).limit(10).lean();if(0===s.length)return console.log("No users found to notify"),{success:!1,message:"No users to notify"};let c=s.slice(0,10-o),d=process.env.NEXT_PUBLIC_BASE_URL||"https://cginfrax.com",u=`${d}/properties/${e._id}`,m="Room"===e.cat?"Room":"PG"===e.cat?"PG":"House"===e.cat?"House":"Plot",g=c.map(async r=>{try{let i=`
          <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f5f5f5;">
            <div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
              <h2 style="color: #1a1a1a; margin-bottom: 20px;">🏠 New ${m} Available in ${e.district}!</h2>
              
              <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #3b82f6;">
                <h3 style="color: #333; margin-top: 0;">${e.title}</h3>
                <p style="color: #666; margin: 10px 0;"><strong>Price:</strong> ₹${e.price?.toLocaleString("en-IN")}</p>
                <p style="color: #666; margin: 10px 0;"><strong>Location:</strong> ${e.address}, ${e.district}</p>
                ${e.desc?`<p style="color: #666; margin: 10px 0;">${e.desc}</p>`:""}
              </div>

              <div style="text-align: center; margin: 30px 0;">
                <a href="${u}" style="background-color: #3b82f6; color: white; padding: 12px 30px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: bold;">
                  View Property Details
                </a>
              </div>

              <p style="color: #999; font-size: 12px; margin-top: 30px; text-align: center;">
                CG INFRAX - Chhattisgarh's Premier Real Estate Platform<br>
                <a href="${d}" style="color: #3b82f6;">Visit Website</a>
              </p>
            </div>
          </div>
        `;return await l.sendMail({from:`"CG INFRAX" <${process.env.EMAIL_USER}>`,to:r.email,subject:`🏠 New ${m} in ${e.district} - ₹${e.price?.toLocaleString("en-IN")}`,html:i}),await a.create({propertyId:e._id,recipientEmail:r.email,date:t}),console.log(`✅ Email sent to ${r.email} for property ${e._id}`),{success:!0,email:r.email}}catch(e){return console.error(`❌ Failed to send email to ${r.email}:`,e),{success:!1,email:r.email,error:e.message}}}),y=(await Promise.all(g)).filter(e=>e.success).length;return{success:!0,message:`Sent ${y} email(s) successfully`,totalSent:y,totalToday:o+y}}catch(e){return console.error("Email notification error:",e),{success:!1,message:e.message}}}e.s(["notifyUsersAboutNewProperty",()=>c],2788)}];

//# sourceMappingURL=%5Broot-of-the-server%5D__cb47a3ce._.js.map