﻿export interface User {
    name: string,
    email: string,
    role: string,
    password?: string,
    createdAt?: Date,
}