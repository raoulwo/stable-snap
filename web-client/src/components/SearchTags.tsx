import * as React from "react"
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { useAppContext } from "@/context/AppContext.tsx";

type SearchTagsProps = {
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
};

const SearchTags: React.FC<SearchTagsProps> = ({ setSearchQuery }) => {
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState("");
    const { searchTags } = useAppContext();
    const searchTagsArray = [...searchTags];//convert Set to Array. Note: Array will never change

    const handleChangedValue = (newSearchQueryValue: string) => {
        setValue(newSearchQueryValue);
        setSearchQuery(newSearchQueryValue);
        console.info("Info: new Value:"+newSearchQueryValue);
    }

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[150px] justify-between"
                >
                    {value || "Search Tag ..."}
                    <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[250px] p-0">
                <Command>
                    <CommandInput placeholder="Search tag..." />
                    <CommandList>
                        <CommandEmpty>No searchtag found.</CommandEmpty>
                        <CommandGroup>
                            {searchTagsArray.map((searchTag) => (
                                <CommandItem
                                    key={searchTag}

                                    onSelect={(currentValue) => {
                                        handleChangedValue(currentValue);
                                        setOpen(false);
                                    }}
                                >
                                    <CheckIcon
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            value === searchTag ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                    {searchTag}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}

export default SearchTags;