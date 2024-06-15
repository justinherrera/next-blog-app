import bcrypt from 'bcrypt';

export default async function comparePassword(password: string, hash: string): Promise<boolean> {
  const isMatch = await bcrypt.compareSync(password, hash)
  return isMatch
}