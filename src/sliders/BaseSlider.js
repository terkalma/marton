import * as React from 'react';
import { Slider, Grid, Input, Typography } from "@mui/material";
import useDeepCompareEffect from 'use-deep-compare-effect'


export function BaseSlider({
    defaultValue,
    label,
    id,
    options,
    handleInputChange,
    updateValue,
    active,
    setActive
}) {
    const [sliderInputValue, setSliderInputValue] = React.useState(defaultValue);
    const [inputValue, setInputValue] = React.useState(options[defaultValue]);
    const [error, setError] = React.useState(false);

    useDeepCompareEffect(() => {
        setInputValue(options[sliderInputValue])
    }, [options])

    React.useEffect(() => {
        setSliderInputValue(defaultValue);
        setInputValue(options[defaultValue]);
    }, [defaultValue])

    const valueLabelFormat = (index) => options[index];
    const sliderChange = (_event, newSliderInputValue) => {
        if (typeof newSliderInputValue === 'number' && newSliderInputValue >= 0 && newSliderInputValue < options.length) {
            setSliderInputValue(newSliderInputValue);

            if (inputValue !== options[newSliderInputValue]) {
                setInputValue(options[newSliderInputValue]);
                setActive(id);
                updateValue(newSliderInputValue);
                setError(false);
            }
        }
    };

    const inputChange = (event) => {
        setInputValue(event.target.value);
    }

    const onBlur = (event) => {
        const { newError, newInputValue, newSliderInputValue } = handleInputChange(event);

        setError(newError);
        setInputValue(newInputValue);
        if (typeof newSliderInputValue === "number" && newSliderInputValue !== sliderInputValue) {
            setSliderInputValue(newSliderInputValue);
            setActive(id);
            updateValue(newSliderInputValue);
        }
    }

    return (
        <>
            <Grid item xs={9}>
                <Typography gutterBottom>{label}</Typography>
                <Slider
                    key={`slider-${id}`}
                    value={sliderInputValue}
                    min={0}
                    step={1}
                    max={options.length - 1}
                    marks
                    getAriaValueText={valueLabelFormat}
                    valueLabelFormat={valueLabelFormat}
                    onChange={sliderChange}
                    color={active ? "secondary" : "primary"}
                    valueLabelDisplay="auto"
                />
            </Grid>
            <Grid item xs={2}>
                <Input
                    key={`text-input-${id}`}
                    value={inputValue}
                    size="small"
                    onChange={inputChange}
                    onBlur={onBlur}
                    onSubmit={onBlur}
                    label={label}
                    error={error}
                    inputProps={{type: 'text'}}
                    color={active ? "secondary" : "primary"}
                />
            </Grid>
        </>
    );
}