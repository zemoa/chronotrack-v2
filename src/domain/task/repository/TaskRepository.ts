export interface TaskRepository {
    findByUser(id: string): Task[]
}