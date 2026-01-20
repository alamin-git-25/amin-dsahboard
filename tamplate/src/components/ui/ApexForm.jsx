import React from 'react'

export default function ApexForm({ children, action }) {
    return (
        <form onSubmit={action}>
            {children}
        </form>
    )
}
