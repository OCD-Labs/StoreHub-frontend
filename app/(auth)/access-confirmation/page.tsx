'use client'
import React from 'react'
import { Button } from '@components/ui/Button'

const AccessConfirmation = () => {
  return (
    <div className="flex justify-center items-center m-auto">
      <div className="flex flex-col justify-center items-center">
        <div className="mb-8 text-md">
          Accept Co-ownership Request for <b>Mystore</b> by <b>Uma Victor</b>
        </div>
        <div className="flex gap-4">
          <Button variant="destructive">Decline</Button>
          <Button variant="default">Accept</Button>
        </div>
      </div>
    </div>
  )
}

export default AccessConfirmation
