import * as React from 'react'
import { Outlet, createRootRoute } from '@tanstack/react-router'

export const Route = createRootRoute({
    component: RootComponent,
})

function RootComponent() {
    return (
        <React.Fragment>
            <Outlet />
            <div className={'fixed bottom-0 left-0 w-full bg-hhg-accent h-6 flex items-center justify-center overflow-hidden select-none'}>
                <div className={'animate-marquee flex items-center gap-x-12 whitespace-nowrap font-bold text-white tracking-widest'}>
                    <div className="flex items-center gap-x-4 uppercase">
                        <span>for unauthorised access call 0x00000000</span>
                        <span>•</span>
                        <span>do not share private key</span>
                        <span>•</span>
                        <span>if not delivered return to localhost:0247</span>
                        <span>•</span>
                    </div>

                    <div className="flex items-center gap-x-4" aria-hidden="true">
                        <span>अनधिकृत पहुँच के लिए 0x00000000 पर कॉल करें</span>
                        <span>•</span>
                        <span>निजी कुंजी साझा न करें</span>
                        <span>•</span>
                        <span>यदि डिलीवरी नहीं हुई तो localhost:0247 पर वापस लौटें</span>
                        <span>•</span>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}
