interface IProps {
    status: 'ACTIVE' | 'DELETED' | 'DONE' | 'PENDING' | undefined
}

export default function Badge({ status }: IProps) {
    switch (status) {
        case 'ACTIVE':
            return (
                <span className="px-3 py-1 text-xs rounded-md bg-green-500 dark:bg-green-500  dark:text-gray-900">
                    <span>ACTIVE</span>
                </span>
            )
        case 'DELETED':
            return (
                <span className="px-3 py-1 text-xs rounded-md bg-red-500 dark:bg-red-500  dark:text-gray-900">
                    <span>DELETED</span>
                </span>
            )
        case 'DONE':
            return (
                <span className="px-3 py-1 text-xs rounded-md bg-green-500 dark:bg-green-500  dark:text-gray-900">
                    <span>DONE</span>
                </span>
            )
        case 'PENDING':
            return (
                <span className="px-3 py-1 text-xs rounded-md bg-yellow-500 dark:bg-yellow-500  dark:text-gray-900">
                    <span>PENDING</span>
                </span>
            )
        default:
            return (
                <span className="px-3 py-1 text-xs rounded-md bg-gray-400 dark:bg-gray-400 dark:text-gray-900">
                    <span>UNDEFINED</span>
                </span>
            )
    }
}
