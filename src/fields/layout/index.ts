import { Field } from "payload";



export const layout: Field = {
    type: "radio",
    name: "layout",
    options: [
        { label: "Container", value: "container" },
        { label: "Full width", value: "full" },
        { label: "Wide container", value: "wide" },
        { label: "Narrow container", value: "narrow" },
    ],
    defaultValue: "container",
}
