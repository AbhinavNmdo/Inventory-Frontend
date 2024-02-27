export interface DatatableInterface {
    current_page: number;
    data: Array<any>;
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
    perPage: number;
    page: number;
    searchParam: string|null;
    orderBy: OrderByInterface
}

export interface OrderByInterface {
    column: string;
    order: string;
}