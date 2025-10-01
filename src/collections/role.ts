import { User } from "@/payload-types"
import { Access } from "payload"




type CheckRole = (args: { req: { user: User | null } }) => boolean

export const isAdmin: CheckRole = ({ req: { user } }) => user && user.role === 'admin' ? true : false
export const isEditor: CheckRole = ({ req: { user } }) => user && user.role === 'editor' ? true : false

export const adminOnly: Access = ({ req: { user } }) => {
  return isAdmin({ req: { user } })
}

