export const userNotFound: (id: string, column?: string) => string = (id, column = 'id') => `User with ${column} ${id} does not exist`;
export const taskNotFound: (id: string, column?: string) => string = (id, column = 'id') => `Task with ${column} ${id} does not exist`;
