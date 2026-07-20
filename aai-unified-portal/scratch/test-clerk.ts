import { clerkClient } from '@clerk/nextjs/server'
import * as dotenv from 'dotenv'
import * as path from 'path'

dotenv.config({ path: path.resolve(process.cwd(), '.env') })

async function run() {
  console.log('Secret key in process.env:', JSON.stringify(process.env.CLERK_SECRET_KEY))
  console.log('Publishable key in process.env:', JSON.stringify(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY))
  try {
    const client = await clerkClient()
    const users = await client.users.getUserList({ limit: 10 })
    console.log('Clerk users found:', users.data.length)
    users.data.forEach(u => console.log(' -', u.username, '|', u.publicMetadata))
  } catch (err: any) {
    console.error('Clerk Connection error:', err)
  }
}

run()
