import * as React from 'react';

import { BaseSlider } from "./BaseSlider";
import { math } from "../utils";


export function FractionSlider({defaultValue, options, id, label, updateData, active, setActive}) {
    const updateValue = (newValue) => {
        if (typeof newValue === "number" && newValue > -1 && newValue < options.length) {
            if (id === 'y') {
                updateData({yIndex: newValue});
            } else {
                updateData({index: newValue});
            }
        }
    }

    const handleInputChange = (event) => {
        const input = event.target.value.replace(/[^0-9./]/g, '');
        const result = { newError: true, newInputValue: event.target.value, newSliderInputValue: null };

        try {
            const frac = math.fraction(input);
            let min = math.abs(options[0] - frac);
            let minIndex = 0
            for (let i=1; i<options.length; i++) {
                const curr = math.abs(options[i] - frac)
                if (curr < min) {
                    minIndex = i;
                    min = curr;
                }
            }
            return {
                newError: false,
                newSliderInputValue: minIndex,
                newInputValue: options[minIndex]
            }
        } catch {
            return result;
        }
      }

      return <BaseSlider handleInputChange={handleInputChange}
        updateValue={updateValue} id={id} label={label} options={options.map(o => math.format(o, {fraction: 'ratio'}))}
        defaultValue={defaultValue} active={active} setActive={setActive} />
}