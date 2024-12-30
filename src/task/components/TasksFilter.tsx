import { SegmentedControl } from "@/ui/components/chakra/segmented-control";
import { Dispatch, SetStateAction } from "react";

interface TasksFilterProps {
    filterValue: string;
    setFilterValue: Dispatch<SetStateAction<string>>;
}

export const TasksFilter = ({ filterValue, setFilterValue }: TasksFilterProps) => {
    const taskFilterOptions = [
        { label: "Todas", value: "all" },
        { label: "Pendientes", value: "false" },
        { label: "Completadas", value: "true" },
    ]

    return (
        <SegmentedControl
            value={filterValue}
            onValueChange={(e) => setFilterValue(e.value)}
            items={taskFilterOptions}
        />
    )
}