"use client"
import { Box, Stack, Button, Container } from '@mantine/core'
import Cookies from 'js-cookie'
import React, { FC, useState } from 'react'
import { detectIncognito } from "detectincognitojs"
import useSWR from 'swr'

const CookieCounter = () => {
  const cv = Number(Cookies.get("CNT"))
  const [v, setV] = useState(isNaN(cv) ? 0 : cv)
  return <Box>
    <Stack>
      <Box>
        Cookie: {v}
      </Box>
      <Button onClick={() => {
        const nv = v + 1
        setV(nv)
        Cookies.set("CNT", nv.toString(), {
          expires: 7
        })

      }}>Incl</Button>
    </Stack>
  </Box>
}

const LocalStorageCounter = () => {
  const cv = Number(localStorage.getItem("CNT"))
  const [v, setV] = useState(isNaN(cv) ? 0 : cv)
  return <Box>
    <Stack>
      <Box>
        LocalStorage: {v}
      </Box>
      <Button onClick={() => {
        const nv = v + 1
        setV(nv)
        localStorage.setItem("CNT", nv.toString())

      }}>Incl</Button>
    </Stack>
  </Box>
}
const Lcb = () => {
  if (typeof window === 'undefined') {
    return null
  }
  return <LocalStorageCounter />

}
const Incog = () => {
  const incog = useSWR("incog", () => detectIncognito())
  return <Box>
    Incog: {incog.data?.isPrivate ? "Default" : "Private"} ({incog.data?.browserName})
  </Box>
}
export const TestPage: FC<{ ua: string }> = ({ ua }) => {

  return (
    <Box>
      <Container>
        <Stack>
          <Box>UA:{ua}</Box>
          <Incog />
          <CookieCounter />
          <Lcb />
        </Stack>
      </Container>
    </Box>
  )
}
