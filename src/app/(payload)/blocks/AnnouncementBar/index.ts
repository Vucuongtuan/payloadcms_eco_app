import { Block } from "payload";
import { createBackgroundColorField } from "../../fields/colorPicker";



export const AnnouncementBar:Block={
    slug:"announcementBar",
    interfaceName:"Announcement Bar",
    fields:[
         createBackgroundColorField({
                    name:"backgroundColor",
                    label:"Background Color",
                }),
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
        {
            name:"title",
            type:"text",
            admin:{
                condition:(_,siblingData)=>siblingData?.options==="static"
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
                condition:(_,siblingData)=>siblingData?.options==="announcement"
            }
        }
    ]
}