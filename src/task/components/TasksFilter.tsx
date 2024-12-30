import { Radio, RadioGroup } from "@/ui/components/chakra/radio";
import { Stack } from "@chakra-ui/react";
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
        <RadioGroup value={filterValue} onValueChange={(e) => setFilterValue(e.value)}>
            <Stack direction="row" spaceX={4}>
                {taskFilterOptions.map(option => (
                    <Radio key={option.value} value={option.value}>
                        {option.label}
                    </Radio>
                ))}
            </Stack>
        </RadioGroup>
    )
}