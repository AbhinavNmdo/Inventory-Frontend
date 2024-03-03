export interface DatatableInterface<DataType = any> {
    current_page: number;
    data: Array<DataType>;
    first_page_url: string;
    last_page_url: string;
    from: number;
    to: number;
    last_page: number;
    prev_page_url: string|null;
    next_page_url: string|null;
    path: string;
    per_page: number;
    total: number;
    links: Array<any>;
}

export interface DatatableReqInterface {
    perPage?: number|null;
    page?: number|null;
    searchParam?: string|null;
    orderBy: OrderByInterface;
    isPaginate: boolean;
}

export interface OrderByInterface {
    column: string;
    order: string;
}

export interface TableInterface {
    tableData?: DatatableInterface,
    tableRequest: DatatableReqInterface,
    getDataFunc: Function,
    colDefs: Array<{
        label: string,
        data: string,
        orderable: boolean,
        render?: Function
    }>,
    actions?: Array<{
        icon: string,
        color: string,
        functionName?: any,
        routerLink?: string
    }>
}