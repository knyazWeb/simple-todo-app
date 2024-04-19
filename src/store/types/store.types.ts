export interface ITask {
  id: string;
  title: string;
  date: string;
  description: string;
  status: string;
}

export interface IUserAuth {
  userName: string | null;
  isAuth: boolean;
  userId: string | null;
}
