import { MenuItem, TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import "./Input.css"

interface Option {
    id: number;
    title: string;
}

interface Props {
    type: string;
    options: Option[];
}

const InputWithNavigation: React.FC<Props> = ({ type, options }) => {
    const [inputValue, setInputValue] = useState("");
    const [displayOptions, setDisplayoptions] = useState(false);
    const [optionSelected, setOptionSelected] = useState(false);
    const [filteredOptions, setFilteredOptions] = useState(options);
    const [selectedIndex, setSelectedIndex] = useState(-1);

    useEffect(() => {
        const filtered = options.filter((movie) =>
            movie.title.toLowerCase().includes(inputValue.toLowerCase())
        );
        setFilteredOptions(filtered);
        if (inputValue !== "") {
            setDisplayoptions(true);
        } else {
            setDisplayoptions(false);
        }
        setSelectedIndex(-1);
    }, [inputValue]);

    const inputChangeHandler = (
        e: React.ChangeEvent<HTMLInputElement>
    ): void => {
        const newInput = e.target.value;
        if (optionSelected) {
            setOptionSelected(false);
        }
        setInputValue(newInput);
    };

    const keyboardOptionsHandler = (
        event: React.KeyboardEvent<HTMLInputElement>
    ): void => {
        switch (event.key) {
            case "ArrowUp":
                setSelectedIndex((legacyIndex) =>
                    legacyIndex <= 0 ? filteredOptions.length - 1 : legacyIndex - 1
                );
                break;
            case "ArrowDown":
                setSelectedIndex((legacyIndex) =>
                    legacyIndex === filteredOptions.length - 1 ? 0 : legacyIndex + 1
                );
                break;
            case "Enter":
                if (selectedIndex >= 0) {
                    setOptionSelected(true);
                    setDisplayoptions(false);
                    setInputValue(filteredOptions[selectedIndex].title);
                    setSelectedIndex(-1);
                }
                break;
            default:
                break;
        }
    };

    const handleOptionClick = (index: number): void => {
        setOptionSelected(true);
        setInputValue(filteredOptions[index].title);
        setSelectedIndex(index);
        setDisplayoptions(false);
    };

    return (
        <div>
            <div>
                <TextField
                    className="input"
                    type="text"
                    label="Movie"
                    variant="outlined"
                    color="primary"
                    value={inputValue}
                    onChange={inputChangeHandler}
                    onKeyDown={keyboardOptionsHandler}
                />
                {displayOptions === true && optionSelected === false &&
                    filteredOptions.map((option, index) => (
                        <MenuItem
                            className="items"
                            key={option.id}
                            value={option.title}
                            selected={index === selectedIndex}
                            onMouseOver={() => setSelectedIndex(index)}
                            onClick={() => handleOptionClick(index)}
                        >
                            {option.title}
                        </MenuItem>
                    ))}
            </div>
        </div>
    );
};

export default InputWithNavigation;

