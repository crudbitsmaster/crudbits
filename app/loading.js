import React from "react"

export default function Loading() {
    return (
        <div className='absolute bg-white top-0 left-0 flex items-center justify-center h-full w-full overflow-hidden'>
            <div className='loader'></div>
        </div>
    )
}