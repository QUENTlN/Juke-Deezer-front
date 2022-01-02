import {User} from "./user.model";

export interface UserList {
    data: User[];
    total: number;
    next: string;
}
