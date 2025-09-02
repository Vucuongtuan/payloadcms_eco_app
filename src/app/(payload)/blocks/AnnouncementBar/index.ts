import { Block } from "payload";
import { createBackgroundColorField } from "../../fields/colorPicker";



export const AnnouncementBar:Block={
    slug:"announcementBar",
    interfaceName:"Announcement Bar",
    fields:[
        {
            name:"options",
            type:"select",
            options:[
                {
                    label:"Announcement",
                    value:"announcement"
                },{
                    label:"Static",
                    value:"static"
                }
            ],
            defaultValue:"static"
        },
       createBackgroundColorField({
            name:"backgroundColor",
            label:"Background Color",
        }),
        {
            name:"title",
            type:"text",
            admin:{
                condition:(data)=>data.siblingData.options==="static"
            }
        },
        {
            name:"content",
            type:"array",
            fields:[
               {
                name:"title",
                type:"text",
               }
            ],
            admin:{
                condition:(data)=>data.siblingData.options==="announcement"
            }
        }
    ]
}