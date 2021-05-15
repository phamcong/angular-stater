export interface ActionItem {
    label?: string
    key?: string
    icon?: any
    link?: string
    onClick?: ($event?) => void
    disabled?: boolean
}