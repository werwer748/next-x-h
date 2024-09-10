import {ReactNode} from "react";

export default async function HomeLayout({children}: { children: ReactNode }) {
    return (
        <div>
            홈 레이아웃
            {children}
        </div>
    )
}
//* RootLayout -> HomeLayout -> Home 의 계층 구조가 된다.