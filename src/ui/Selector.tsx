import { Fragment } from "react";
import * as style from "./Selector.css";

type SelectorProps = {
  label: string;
  selected: string | null;
  onSelectionChange: (selection: string) => void;
  options: Array<{ label: string; value: string }>;
};

const Selector = ({
  label,
  selected,
  onSelectionChange,
  options,
}: SelectorProps) => (
  <fieldset aria-label={label} className={style.fieldset}>
    {options.map((option) => (
      <Fragment key={option.value}>
        <input
          className={style.radio}
          type="radio"
          value={option.value}
          id={option.value}
          onChange={(event) => onSelectionChange(event.target.value)}
          checked={option.value === selected}
        />
        <label className={style.label} htmlFor={option.value}>
          {option.label}
        </label>
      </Fragment>
    ))}
  </fieldset>
);

export default Selector;
