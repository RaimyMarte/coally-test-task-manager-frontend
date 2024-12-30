import { TaskApiResponseInterface, TaskInterface } from "@/interfaces";
import { UpdateTask } from "@/store/api/task/taskApi";
import { toaster } from "@/ui/components/chakra/toaster";
import { isMutationSuccessResponse } from "@/utils";
import { BaseQueryFn, FetchArgs, FetchBaseQueryError, FetchBaseQueryMeta } from "@reduxjs/toolkit/query";
import { TypedMutationTrigger } from "@reduxjs/toolkit/query/react";


export const handleToggleComplete = async (task: TaskInterface, updateTask: TypedMutationTrigger<
    TaskApiResponseInterface,
    UpdateTask,
    BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, {}, FetchBaseQueryMeta>
>) => {
    try {
        const response = await updateTask({
            taskId: task?._id,
            body: {
                title: task?.title,
                description: task?.description,
                completed: !task?.completed,
            },
        });

        if (isMutationSuccessResponse(response)) {
            const { data: respData } = response;

            if (!respData?.isSuccess) {
                toaster.create({
                    title: respData?.title,
                    description: respData?.message,
                    type: "error",
                });
                return;
            }

            toaster.create({
                title: respData?.title,
                description: respData?.message,
                type: "success",
            });
        }
    } catch (error) {
        toaster.create({
            title: "Error",
            description: `Ha ocurrido un error: ${error}`,
            type: "error",
        });
    }
};