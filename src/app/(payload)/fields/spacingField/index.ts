import { Field } from "payload";




export const spacingField = ({
    localized = false
}:{
    localized?:boolean
}): Field[] => {
    return [
        {name:"spacing", type:"radio", options: [
            {label:"None", value:"none"},
            {label:"Small", value:"small"},
            {label:"Medium", value:"medium"},
            {label:"Large", value:"large"},
        ], localized}
    ]
}
export const aspectField = ({
    localized = false
}:{
    localized?:boolean
}):Field[] =>{
    return [
        {name:"aspect", type:"select", options: [
            {label:"Auto", value:"auto"},
            {label:"21/9", value:"ultrawide"},
            {label:"3/2", value:"photo"},
            {label:"2/3", value:"poster"},
            {label:"9/16", value:"story"},
            {label:"4/5", value:"insta"},
            {label:"4/3", value:"retro"},
            {label:"16/9", value:"video"},
            {label:"1/1", value:"square"},
            {label:"2.1",value:'wide'}

        ],
    localized:localized,
    defaultValue:"wide"
    }
    ]
}