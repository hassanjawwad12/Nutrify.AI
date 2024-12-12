"use server";
import {
  createProject,
  deleteProject,
  getProject,
  updateProject,
  createBoard,
  deleteBoard,
  updateBoard,
  createTask,
  updateTask,
  getSubtasks,
  createSubTask,
  updateSubTask,
  deleteTask,
  deleteSubTask,
  postComment,
  swapBoard,
} from "@/config/project-config";
import { revalidatePath } from "next/cache";

export async function addProjectAction(project) {
  await createProject(project);
  revalidatePath("/projects");
}

export const deleteProjectAction = async (id) => {
  await deleteProject(id);
  revalidatePath("/projects");
};

export const editProjectAction = async (id, project) => {
  await updateProject(id, project);
  revalidatePath("/projects");
};

export const viewProjectAction = async (id) => {
  await getProject(id);
  revalidatePath("/projects");
};

// boards
export async function addBoardAction(board) {
  await createBoard(board);

  revalidatePath("/projects");
}

export const editBoardAction = async (id, board) => {
  await updateBoard(id, board);
  revalidatePath("/");
};
export const swapBoardAction = async (data) => {
  await swapBoard(data);
  revalidatePath("/");
};
export const deleteBoardAction = async (id) => {
  await deleteBoard(id);
  revalidatePath("/projects/*");
};

// task
export async function addTaskAction(task) {
  await createTask(task);
  revalidatePath("/projects/*");
}

export const deleteTaskAction = async (id) => {
  await deleteTask(id);
  revalidatePath("/projects/*");
};
export const updateTaskAction = async (taskId, updatedFields) => {
  await updateTask(taskId, updatedFields);
  revalidatePath("/projects/*");
};

// sub task
export async function addSubTaskAction(subtask) {
  await createSubTask(subtask);
  revalidatePath("/projects/*");
}

export const deleteSubTaskAction = async (id) => {
  await deleteSubTask(id);
  revalidatePath("/projects/*");
};
export const updateSubTaskAction = async (subtaskId, updatedFields) => {
  await updateSubTask(subtaskId, updatedFields);
  revalidatePath("/projects/*");
};

// comments
export async function postCommentAction(comment) {
  await postComment(comment);
  revalidatePath("/projects/*");
}
