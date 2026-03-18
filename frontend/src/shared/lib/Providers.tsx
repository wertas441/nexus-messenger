'use client'

import {Provider} from "react-redux";
import {ReactNode} from "react";
import {store} from "@/shared/store/store";

export default function Providers({children}: {children: ReactNode}) {

    return (
        <Provider store={store}>
            {children}
        </Provider>
    )
}
