import { useState, useEffect } from "react";
import {
    CheckIcon,
    Combobox,
    Group,
    Pill,
    PillsInput,
    useCombobox,
} from "@mantine/core";

// https://v7.mantine.dev/combobox/?e=MultiSelectCreatable

const MultiSelectCreatable = ({
    defaultVals = [],
    value,
    onChange,
    placeholder = "Search values",
    label,
}) => {
    const combobox = useCombobox({
        onDropdownClose: () => combobox.resetSelectedOption(),
        onDropdownOpen: () => combobox.updateSelectedOptionIndex("active"),
    });

    const [search, setSearch] = useState("");
    const [data, setData] = useState(defaultVals);

    // useEffect(() => {
    //     setData(defaultVals);
    // }, [defaultVals]);

    const exactOptionMatch = data.some((item) => item === search);

    const handleValueSelect = (val) => {
        setSearch("");

        if (val === "$create") {
            setData((current) => [...current, search]);
            onChange([...value, search]);
        } else {
            if (value.includes(val)) {
                onChange(value.filter((v) => v !== val));
            } else {
                onChange([...value, val]);
            }
        }
    };

    const handleValueRemove = (val) => {
        onChange(value.filter((v) => v !== val));
    };

    const values = value.map((item) => (
        <Pill
            key={item}
            withRemoveButton
            onRemove={() => handleValueRemove(item)}
        >
            {item}
        </Pill>
    ));

    const options = data
        .filter((item) =>
            item.toLowerCase().includes(search.trim().toLowerCase())
        )
        .map((item) => (
            <Combobox.Option
                value={item}
                key={item}
                active={value.includes(item)}
            >
                <Group gap="sm" justify="space-between">
                    <span
                        className={
                            value.includes(item) ? "text-neutral-400" : ""
                        }
                    >
                        {item}
                    </span>
                    {value.includes(item) ? <CheckIcon size={12} /> : null}
                </Group>
            </Combobox.Option>
        ));

    return (
        <div>
            {label && (
                <label
                    style={{
                        fontSize: "var(--mantine-font-size-sm)",
                        fontWeight: "500",
                    }}
                >
                    {label}
                </label>
            )}
            <Combobox
                store={combobox}
                onOptionSubmit={handleValueSelect}
                withinPortal={false}
            >
                <Combobox.DropdownTarget>
                    <PillsInput onClick={() => combobox.openDropdown()}>
                        <Pill.Group>
                            {values}

                            <Combobox.EventsTarget>
                                <PillsInput.Field
                                    onFocus={() => combobox.openDropdown()}
                                    onBlur={() => combobox.closeDropdown()}
                                    value={search}
                                    placeholder={placeholder}
                                    onChange={(event) => {
                                        combobox.updateSelectedOptionIndex();
                                        setSearch(event.currentTarget.value);
                                    }}
                                    onKeyDown={(event) => {
                                        if (
                                            event.key === "Backspace" &&
                                            search.length === 0
                                        ) {
                                            event.preventDefault();
                                            handleValueRemove(
                                                value[value.length - 1]
                                            );
                                        }
                                    }}
                                />
                            </Combobox.EventsTarget>
                        </Pill.Group>
                    </PillsInput>
                </Combobox.DropdownTarget>

                <Combobox.Dropdown>
                    <Combobox.Options>
                        {options}

                        {!exactOptionMatch && search.trim().length > 0 && (
                            <Combobox.Option value="$create">
                                Add "{search}"
                            </Combobox.Option>
                        )}

                        {exactOptionMatch &&
                            search.trim().length > 0 &&
                            options.length === 0 && (
                                <Combobox.Empty>Nothing found</Combobox.Empty>
                            )}
                    </Combobox.Options>
                </Combobox.Dropdown>
            </Combobox>
        </div>
    );
};

export default MultiSelectCreatable;
