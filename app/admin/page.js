"use client"
import { useRouter } from 'next/navigation'
import React from 'react'

const Admin = () => {
    const router = useRouter()
    router.push("/admin/dashboard")
  return (
    <div>
        
    </div>
  )
}

export default Admin