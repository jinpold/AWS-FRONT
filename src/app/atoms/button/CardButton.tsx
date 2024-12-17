'use client'

import { IBoards } from "@/app/component/boards/model/board.model";
import { PG } from "@/app/component/common/enums/PG";
import Link from "next/link";



export default function CardButton({id, title, description, img, src}:IBoards){
    return (
        <div className="max-w-sm b-white border items-center border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <Link href="">
            <div className="flex justify-center mt-5">
                {img}
            </div>
        </Link>
        <div className="p-5">
            <Link href="#">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {title}
                </h5>
            </Link>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                {description}
            </p>
            <Link href={src} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-950 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                {title} Read more
            </Link>
        </div>
    </div>
            )
        }