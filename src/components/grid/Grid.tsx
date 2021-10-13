import React from "react";
import classes from "./grid.module.css";
import { timeout } from "../../helpers/timeout";
import { checkFibonacci } from "../../helpers/checkFibonacci";

interface GridItem {
  id: number;
  value: number;
  col: number;
  row: number;
}

const DELAY_TIME = 200;

export function Grid() {
  const grid = () => {
    const values = Array.from(Array(2500).keys());
    const gridValues: Array<GridItem> = [];
    for (let i = 0; i < values.length; i++) {
      gridValues.push({
        id: i,
        value: 1,
        col: i % 50,
        row: Math.floor(i / 50)
      });
    }
    return gridValues;
  };

  const [gridValues, setGridValues] = React.useState(grid);
  const getFibonacciForRow = sortValue("row");
  const getFibonacciForCol = sortValue("col");

  React.useEffect(() => {
    getFibbonacci(getFibonacciForRow);
    getFibbonacci(getFibonacciForCol);
  }, [gridValues, getFibonacciForRow, getFibonacciForCol]);

  async function changeValue(id: number, col: number, row: number) {
    document.getElementById(`${id}`)!.classList.add(classes.active);
    await timeout(DELAY_TIME);
    document.getElementById(`${id}`)!.classList.remove(classes.active);
    const newGridValues = [...gridValues];
    for (let i = 0; i < newGridValues.length; i++) {
      if (newGridValues[i].col === col || newGridValues[i].row === row) {
        newGridValues[i].value += 1;
      }
    }
    setGridValues(newGridValues);
  }

  function clearFibonacci(ids: Array<number>) {
    setGridValues(prevState => {
      const newState = [...prevState];
      newState.map(i => {
        if (ids.includes(i.id)) {
          i.value = 1;
        }
      });
      return newState;
    });
  }

  async function changeColor(ids: Array<number>, style: string) {
    for (let i = 0; i < ids.length; i++) {
      document.getElementById(`${ids[i]}`)!.classList.add(style);
    }
    await timeout(DELAY_TIME);
    for (let i = 0; i < ids.length; i++) {
      document.getElementById(`${ids[i]}`)!.classList.remove(style);
    }
  }

  function sortValue<Criterion extends keyof GridItem>(criterion: Criterion) {
    const sortedValues = new Map<number, [{ value: number; id: number }]>();

    for (let i = 0; i < gridValues.length; i++) {
      if (!sortedValues.has(gridValues[i][criterion])) {
        sortedValues.set(gridValues[i][criterion], [
          { value: gridValues[i].value, id: gridValues[i].id }
        ]);
      } else {
        sortedValues
          .get(gridValues[i][criterion])!
          .push({ value: gridValues[i].value, id: gridValues[i].id });
      }
    }
    return sortedValues;
  }

  function getFibbonacci(gridValues: any) {
    for (gridValues of gridValues.values()) {
      const FibonacciIds = checkFibonacci(gridValues);
      if (FibonacciIds.length >= 5) {
        changeColor(FibonacciIds, classes.fibonacci);
        clearFibonacci(FibonacciIds);
      }
    }
  }

  return (
    <div className={classes.wrapper}>
      {gridValues.map((i: GridItem, index: number) => (
        <div
          key={index}
          id={`${i.id}`}
          className={classes.item}
          onClick={() => changeValue(i.id, i.col, i.row)}
        >
          {i.value}
        </div>
      ))}
    </div>
  );
}
