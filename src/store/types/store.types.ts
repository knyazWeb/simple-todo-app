export interface ITask {
  title: string;
  description: string;
  date: string;
  status: "In process" | "Completed" | "On going" | "Canceled";
}

export interface IUserAuth {
  userName: string | null;
  isAuth: boolean;
  userId: string | null;
}
