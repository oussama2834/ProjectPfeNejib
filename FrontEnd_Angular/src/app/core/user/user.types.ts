export interface User {
    id: string;
    name: string;
    email: string;
    password: string;
    tele: number;
    address: string;
    roles: Role[];
    sexe: string;
    position: string;
    departement: string;
    avatar?: string;
    status?: string;
}

// Added 
export interface Role {
    id: number;
    name : string
}
