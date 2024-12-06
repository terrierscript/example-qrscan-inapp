"use server"
import React from 'react'
import { TestPage } from './TestPage'
import { headers } from 'next/headers'

export default async function Home() {
  const head = await headers()
  const ua = head.get("user-agent") ?? "-"
  return <TestPage ua={ua} />
}
