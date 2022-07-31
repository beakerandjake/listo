export function DesktopLayout(props) {
    return (
        <>
            {/* <div className="flex flex-col fixed inset-y-0 w-64">
                {props.sidebar}
            </div> */}
            <div className="flex flex-col flex-1">
                {props.children}
            </div>
        </>
    )
}


// export function DesktopLayout(props) {
//     return (
//         <>
//             <div className="flex flex-col fixed inset-y-0 w-64">
//                 {props.sidebar}
//             </div>
//             <div className="pl-64 flex flex-col flex-1">
//                 {props.children}
//             </div>
//         </>
//     )
// }