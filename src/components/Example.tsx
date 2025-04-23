"use client"
import { useEffect, useState } from "react"

export default function Example() {
    const [isEnded, setIsEnded] = useState(false)

    // create promise that will resolve after 10 seconds
    const promise = new Promise((resolve) => {
        setTimeout(() => {
            resolve("Resolved")
        }, 10000)
    })

    useEffect(() => {
        promise.then((result) => {
            console.log(result)
            setIsEnded(true)
        })
    }, [promise])
    
    if (isEnded) {
        return (
            <div className="p-4 bg-green-100 rounded-lg">
                <h1 className="text-2xl font-bold text-green-800">Example Component Loaded!</h1>
                <p className="text-green-600">This component was loaded dynamically after 10 seconds.</p>
            </div>
        )
    }

    return null
}
