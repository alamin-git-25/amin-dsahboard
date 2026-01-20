import React from 'react'
import { RevenueLineChart } from '../../components/ui/ApexLineChart'
import { SalesAreaChart } from '../../components/ui/ApexAreaChart'
import { InventoryBarChart } from '../../components/ui/ApexBarChart'
import { OrderStatusChart } from '../../components/ui/ApexPieChart'
import { ApexCol, ApexGrid } from '../../components/ui/ApexGrid'
import ApexInput from '../../components/ui/ApexInput'
import ApexCard from '../../components/ui/ApexCard'
import { KeySquare, Mail, MousePointer2, Plus, Trash2 } from 'lucide-react'
import ApexSelect from '../../components/ui/ApexSelect'
import ApexDatePicker from '../../components/ui/ApexDatePicker'
import ApexButton from '../../components/ui/ApexButton'
import { useState } from 'react'
import ApexModal from '../../components/ui/ApexModal'
import ApexTable from '../../components/ui/ApexTable'
import i18next from 'i18next';
export default function Dashboard() {
    const [open, setOpen] = useState(false)
    const Columns = [

        {
            title: "SL",
            key: "sl",
            width: 70,
            render: (v, r, i) =>
                new Intl.NumberFormat(i18next.language).format(i + 1)
        },

        { title: "Product", key: "title", sortable: true },

        { title: "Barcode", key: "barcode", sortable: true, width: 110, },


        { title: "Product Cost", key: "cost", sortable: true, align: "right" },

        {
            title: "Avalable Stock",

            align: "right",
            key: "opening_stock",
            sortable: true,

        },

    ];
    const dataSource = [
        {
            id: 1,
            title: "Wireless Mouse",
            barcode: "890123456001",
            cost: 850,
            opening_stock: 120,
        },
        {
            id: 2,
            title: "Mechanical Keyboard",
            barcode: "890123456002",
            cost: 4500,
            opening_stock: 45,
        },
        {
            id: 3,
            title: "USB-C Charger 65W",
            barcode: "890123456003",
            cost: 3200,
            opening_stock: 78,
        },
        {
            id: 4,
            title: "27\" IPS Monitor",
            barcode: "890123456004",
            cost: 28500,
            opening_stock: 16,
        },
        {
            id: 5,
            title: "Bluetooth Headphones",
            barcode: "890123456005",
            cost: 5600,
            opening_stock: 62,
        },
        {
            id: 6,
            title: "External SSD 1TB",
            barcode: "890123456006",
            cost: 11800,
            opening_stock: 24,
        },
        {
            id: 7,
            title: "Webcam Full HD",
            barcode: "890123456007",
            cost: 3900,
            opening_stock: 88,
        },
        {
            id: 8,
            title: "Laptop Cooling Pad",
            barcode: "890123456008",
            cost: 1800,
            opening_stock: 140,
        },
    ];

    return (
        <ApexGrid col={3} clx={"pb-16"}>
            <ApexCol colSpan={3}>
                <SalesAreaChart />

            </ApexCol>
            <RevenueLineChart />
            <InventoryBarChart />
            <OrderStatusChart />
            <ApexCol colSpan={3}>
                <ApexCard title="Inputs">
                    <ApexGrid col={4}>
                        <ApexInput label="Email" Icon={Mail} />
                        <ApexInput Icon={KeySquare} label="Password" type="password" />
                        <ApexSelect Icon={MousePointer2} label="Select" />
                        <ApexDatePicker label="Date Picker" />
                    </ApexGrid>
                </ApexCard>
                <ApexCard title="Buttons">
                    <ApexGrid col={8}>
                        <ApexButton>Primary</ApexButton>
                        <ApexButton variant='secondary'>Secondary</ApexButton>
                        <ApexButton variant='success'>Success</ApexButton>
                        <ApexButton variant='danger'>Danger</ApexButton>
                        <ApexButton variant='outline'>Outline</ApexButton>
                        <ApexButton variant='subtle'>Ghost</ApexButton>
                        <ApexButton Icon={Trash2} variant='primary'>Ghost</ApexButton>
                        <ApexButton action={() => setOpen(true)} Icon={Plus} variant='primary'>Modal</ApexButton>

                    </ApexGrid>
                </ApexCard>
                <ApexCard title="Table">
                    <ApexTable columns={Columns} selectable data={dataSource} />
                </ApexCard>

            </ApexCol>
            <ApexModal onClose={() => setOpen(false)} open={open} title='Modal'>
                <h1> █████╗ ███╗   ███╗██╗███╗   ██╗
                    ██╔══██╗████╗ ████║██║████╗  ██║
                    ███████║██╔████╔██║██║██╔██╗ ██║
                    ██╔══██║██║╚██╔╝██║██║██║╚██╗██║
                    ██║  ██║██║ ╚═╝ ██║██║██║ ╚████║
                    ╚═╝  ╚═╝╚═╝     ╚═╝╚═╝╚═╝  ╚═══╝

                    ██████╗  █████╗ ███████╗██╗  ██╗██████╗  ██████╗  █████╗ ██████╗ ██████╗
                    ██╔══██╗██╔══██╗██╔════╝██║  ██║██╔══██╗██╔═══██╗██╔══██╗██╔══██╗██╔══██╗
                    ██║  ██║███████║███████╗███████║██████╔╝██║   ██║███████║██████╔╝██║  ██║
                    ██║  ██║██╔══██║╚════██║██╔══██║██╔══██╗██║   ██║██╔══██║██╔══██╗██║  ██║
                    ██████╔╝██║  ██║███████║██║  ██║██████╔╝╚██████╔╝██║  ██║██║  ██║██████╔╝
                    ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚═════╝  ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚═════╝ </h1>
            </ApexModal>
        </ApexGrid>
    )
}

