import { useEffect, useId, useState } from "react";
import type { ChangeEvent } from "react";
import type { ParameterConfig } from "../data/lessons";
import { formatNumber } from "../utils/mathHelpers";

type ParameterSliderProps = {
  parameter: ParameterConfig;
  value: number;
  onChange: (key: ParameterConfig["key"], value: number) => void;
};

function ParameterSlider({ parameter, value, onChange }: ParameterSliderProps) {
  const inputId = useId();
  const [draftValue, setDraftValue] = useState(formatNumber(value));
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (!isEditing) {
      setDraftValue(formatNumber(value));
    }
  }, [isEditing, value]);

  const clampValue = (nextValue: number) =>
    Math.min(parameter.max, Math.max(parameter.min, nextValue));

  const commitNumber = (rawValue: string) => {
    const nextValue = Number(rawValue);

    if (!Number.isFinite(nextValue)) {
      setDraftValue(formatNumber(value));
      return;
    }

    const clampedValue = clampValue(nextValue);
    onChange(parameter.key, clampedValue);
    setDraftValue(formatNumber(clampedValue));
  };

  const handleNumberChange = (event: ChangeEvent<HTMLInputElement>) => {
    const nextDraft = event.currentTarget.value;
    setDraftValue(nextDraft);

    if (nextDraft === "" || nextDraft === "-" || nextDraft.endsWith(".")) {
      return;
    }

    const nextValue = Number(nextDraft);
    if (Number.isFinite(nextValue)) {
      onChange(parameter.key, clampValue(nextValue));
    }
  };

  return (
    <div className="parameter-slider">
      <span className="parameter-topline">
        <span>
          <label htmlFor={`${inputId}-range`}>
            <strong>{parameter.label}</strong>
          </label>
          <small>{parameter.description}</small>
        </span>
        <span className="parameter-value" key={value}>
          {formatNumber(value)}
        </span>
      </span>
      <div className="parameter-control-row">
        <input
          id={`${inputId}-range`}
          type="range"
          min={parameter.min}
          max={parameter.max}
          step={parameter.step}
          value={value}
          onChange={(event) => onChange(parameter.key, Number(event.target.value))}
        />
        <label className="parameter-number-label" htmlFor={`${inputId}-number`}>
          <span>ค่า</span>
          <input
            id={`${inputId}-number`}
            className="parameter-number-input"
            type="number"
            inputMode="decimal"
            min={parameter.min}
            max={parameter.max}
            step={parameter.step}
            value={draftValue}
            onBlur={() => {
              setIsEditing(false);
              commitNumber(draftValue);
            }}
            onChange={handleNumberChange}
            onFocus={() => setIsEditing(true)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                commitNumber(event.currentTarget.value);
                event.currentTarget.blur();
              }
            }}
          />
        </label>
      </div>
    </div>
  );
}

export default ParameterSlider;
