
import bcrypt from "bcrypt"

export default async function encryptPassword(password: string): Promise<string> {
  const saltRounds = 10
  const hash = await bcrypt.hashSync(password, saltRounds)
  return hash
}