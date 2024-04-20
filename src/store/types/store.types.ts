export interface ITask {
  id: string;
  title: string;
  date: string;
  description: string;
  status: "In process" | "Completed" | "On going" | "Canceled";
}

export interface IUserAuth {
  userName: string | null;
  isAuth: boolean;
  userId: string | null;
}
